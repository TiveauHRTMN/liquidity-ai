"""
Liquidity AI - FastAPI Backend
Handles document upload, AI analysis simulation, and subsidy detection.
Production-ready with environment variable configuration.
"""

from fastapi import FastAPI, UploadFile, File, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import asyncio
import uuid
from datetime import datetime
import random
import os

app = FastAPI(
    title="Liquidity AI API",
    description="Backend API for capital leakage detection and subsidy recovery",
    version="1.0.0"
)

# CORS configuration - use environment variable or defaults
cors_origins_str = os.getenv("CORS_ORIGINS", "http://localhost:5173,http://localhost:3000")
cors_origins = [origin.strip() for origin in cors_origins_str.split(",")]

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================================================================
# DATA MODELS
# ============================================================================

class SubsidyItem(BaseModel):
    id: str
    item: str
    subsidy: str
    amount: float
    category: str
    description: Optional[str] = None
    deadline: Optional[str] = None
    eligibility: Optional[List[str]] = None

class BenchmarkData(BaseModel):
    you: int
    competitors: int
    industryAverage: int

class AnalysisResult(BaseModel):
    sessionId: str
    totalLeakage: float
    subsidies: List[SubsidyItem]
    benchmark: BenchmarkData
    analyzedAt: str
    documentCount: int

class EmailAlertRequest(BaseModel):
    email: str
    sessionId: str
    alertTypes: List[str] = ["weekly_summary", "new_subsidies"]

class EmailAlertResponse(BaseModel):
    success: bool
    message: str
    alertId: Optional[str] = None

# ============================================================================
# IN-MEMORY STORAGE (Replace with database in production)
# ============================================================================

analysis_sessions = {}
email_alerts = {}

# ============================================================================
# SUBSIDY DATABASE (Simulated)
# ============================================================================

SUBSIDY_DATABASE = [
    {
        "id": "wbso-2024",
        "item": "Unused R&D Tax Credits",
        "subsidy": "WBSO Subsidy",
        "amount": -4800,
        "category": "Tax",
        "description": "Tax credit for research and development activities. Reduces wage tax and social contributions for R&D employees.",
        "deadline": "September 30, 2024",
        "eligibility": [
            "Companies performing R&D activities",
            "Minimum 500 R&D hours per year",
            "Technical novelty requirement"
        ]
    },
    {
        "id": "sde-2024",
        "item": "Energy Efficiency Program",
        "subsidy": "SDE++ Grant",
        "amount": -3200,
        "category": "Energy",
        "description": "Stimulation of Sustainable Energy Production and Climate Transition subsidy for renewable energy projects.",
        "deadline": "Rolling applications",
        "eligibility": [
            "Energy production from renewable sources",
            "CO2 reduction projects",
            "Minimum project size requirements"
        ]
    },
    {
        "id": "stap-2024",
        "item": "Employee Training Budget",
        "subsidy": "STAP Budget",
        "amount": -2800,
        "category": "HR",
        "description": "Stimulation of Labour Market Position budget for employee training and development.",
        "deadline": "Continuous enrollment",
        "eligibility": [
            "Dutch residents aged 18+",
            "Registered training providers",
            "Maximum €1,000 per person per year"
        ]
    },
    {
        "id": "mit-2024",
        "item": "Digital Transformation",
        "subsidy": "MIT Scheme",
        "amount": -2100,
        "category": "Digital",
        "description": "SME Innovation Stimulus for Regional and Top Sectors - supports innovation in SMEs.",
        "deadline": "April 2024 / September 2024",
        "eligibility": [
            "Small and medium enterprises (SME)",
            "Innovation or R&D project",
            "Collaboration with research institutions"
        ]
    },
    {
        "id": "dhi-2024",
        "item": "Export Development",
        "subsidy": "DHI Subsidy",
        "amount": -1300,
        "category": "Export",
        "description": "Demonstration Projects, Feasibility Studies and Investment Preparation for international business.",
        "deadline": "Ongoing applications",
        "eligibility": [
            "Dutch companies with export ambitions",
            "Projects in emerging markets",
            "Demonstration or feasibility activities"
        ]
    },
    {
        "id": "innovatie-2024",
        "item": "Innovation Box Benefits",
        "subsidy": "Innovatiebox",
        "amount": -1800,
        "category": "Tax",
        "description": "Reduced corporate tax rate (9%) for profits from innovative activities.",
        "deadline": "Annual tax filing",
        "eligibility": [
            "Patents or WBSO certificate",
            "Self-developed intangible assets",
            "Demonstrable innovation activities"
        ]
    },
    {
        "id": "mkb-2024",
        "item": "SME Loan Guarantee",
        "subsidy": "BMKB Regeling",
        "amount": -950,
        "category": "Finance",
        "description": "SME Credit Guarantee Scheme - government guarantee for bank loans.",
        "deadline": "Continuous availability",
        "eligibility": [
            "SME classification",
            "Viable business plan",
            "Bank loan application"
        ]
    }
]

# ============================================================================
# API ENDPOINTS
# ============================================================================

@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "status": "online",
        "service": "Liquidity AI API",
        "version": "1.0.0",
        "timestamp": datetime.now().isoformat()
    }


@app.post("/api/upload")
async def upload_documents(files: List[UploadFile] = File(...)):
    """
    Upload financial documents for analysis.
    Accepts PDF, Excel, and CSV files.
    """
    session_id = str(uuid.uuid4())
    uploaded_files = []
    
    allowed_extensions = {".pdf", ".xlsx", ".xls", ".csv"}
    
    for file in files:
        # Validate file extension
        ext = "." + file.filename.split(".")[-1].lower() if "." in file.filename else ""
        if ext not in allowed_extensions:
            raise HTTPException(
                status_code=400, 
                detail=f"File type {ext} not supported. Allowed: {', '.join(allowed_extensions)}"
            )
        
        # Read file content (in production, save to storage)
        content = await file.read()
        uploaded_files.append({
            "filename": file.filename,
            "size": len(content),
            "type": file.content_type
        })
    
    # Store session info
    analysis_sessions[session_id] = {
        "files": uploaded_files,
        "status": "uploaded",
        "created_at": datetime.now().isoformat()
    }
    
    return {
        "sessionId": session_id,
        "filesUploaded": len(uploaded_files),
        "files": uploaded_files,
        "message": "Documents uploaded successfully. Ready for analysis."
    }


@app.post("/api/analyze/{session_id}")
async def analyze_documents(session_id: str, background_tasks: BackgroundTasks):
    """
    Trigger AI analysis on uploaded documents.
    Returns immediately with analysis ID, actual processing happens in background.
    """
    if session_id not in analysis_sessions:
        raise HTTPException(status_code=404, detail="Session not found")
    
    session = analysis_sessions[session_id]
    session["status"] = "analyzing"
    
    # Simulate AI processing time (in production, this would be actual ML processing)
    await asyncio.sleep(0.5)  # Quick initial response
    
    # Generate analysis results (simulated)
    num_subsidies = random.randint(4, 7)
    selected_subsidies = random.sample(SUBSIDY_DATABASE, min(num_subsidies, len(SUBSIDY_DATABASE)))
    
    # Randomize amounts slightly for realism
    for subsidy in selected_subsidies:
        variance = random.uniform(0.8, 1.2)
        subsidy["amount"] = round(subsidy["amount"] * variance, 0)
    
    total_leakage = sum(s["amount"] for s in selected_subsidies)
    
    result = AnalysisResult(
        sessionId=session_id,
        totalLeakage=total_leakage,
        subsidies=[SubsidyItem(**s) for s in selected_subsidies],
        benchmark=BenchmarkData(
            you=random.randint(18, 28),
            competitors=random.randint(60, 75),
            industryAverage=random.randint(55, 70)
        ),
        analyzedAt=datetime.now().isoformat(),
        documentCount=len(session["files"])
    )
    
    # Store result
    session["status"] = "completed"
    session["result"] = result.model_dump()
    
    return result


@app.get("/api/results/{session_id}")
async def get_results(session_id: str):
    """
    Retrieve analysis results for a session.
    """
    if session_id not in analysis_sessions:
        raise HTTPException(status_code=404, detail="Session not found")
    
    session = analysis_sessions[session_id]
    
    if session["status"] != "completed":
        return {
            "sessionId": session_id,
            "status": session["status"],
            "message": "Analysis still in progress"
        }
    
    return session["result"]


@app.get("/api/subsidies")
async def list_subsidies():
    """
    Get the full list of available subsidies in the database.
    """
    return {
        "count": len(SUBSIDY_DATABASE),
        "subsidies": SUBSIDY_DATABASE
    }


@app.get("/api/subsidy/{subsidy_id}")
async def get_subsidy_details(subsidy_id: str):
    """
    Get detailed information about a specific subsidy.
    """
    for subsidy in SUBSIDY_DATABASE:
        if subsidy["id"] == subsidy_id:
            return subsidy
    
    raise HTTPException(status_code=404, detail="Subsidy not found")


@app.post("/api/alerts/email", response_model=EmailAlertResponse)
async def setup_email_alert(request: EmailAlertRequest):
    """
    Set up email alerts for subsidy updates.
    In production, this would integrate with an email service (SendGrid, Mailgun, etc.)
    """
    alert_id = str(uuid.uuid4())
    
    # Store alert configuration
    email_alerts[alert_id] = {
        "email": request.email,
        "sessionId": request.sessionId,
        "alertTypes": request.alertTypes,
        "createdAt": datetime.now().isoformat(),
        "active": True
    }
    
    # In production: Send confirmation email via SMTP/SendGrid/etc.
    # Example with SendGrid:
    # sendgrid_api_key = os.getenv("SENDGRID_API_KEY")
    # if sendgrid_api_key:
    #     # Send confirmation email
    #     pass
    
    return EmailAlertResponse(
        success=True,
        message=f"Email alerts configured for {request.email}",
        alertId=alert_id
    )


@app.delete("/api/alerts/{alert_id}")
async def cancel_email_alert(alert_id: str):
    """
    Cancel an email alert subscription.
    """
    if alert_id not in email_alerts:
        raise HTTPException(status_code=404, detail="Alert not found")
    
    email_alerts[alert_id]["active"] = False
    
    return {"success": True, "message": "Alert cancelled successfully"}


@app.get("/api/benchmark")
async def get_benchmark():
    """
    Get industry benchmark data for subsidy utilization.
    """
    return {
        "industryAverage": 65,
        "topPerformers": 85,
        "bottomPerformers": 20,
        "sectors": {
            "Technology": 72,
            "Manufacturing": 58,
            "Healthcare": 61,
            "Retail": 45,
            "Services": 52
        },
        "trending": [
            {"name": "SDE++", "growth": "+15%"},
            {"name": "WBSO", "growth": "+8%"},
            {"name": "MIT", "growth": "+12%"}
        ]
    }


# ============================================================================
# STARTUP EVENT
# ============================================================================

@app.on_event("startup")
async def startup_event():
    print("🚀 Liquidity AI Backend starting...")
    print(f"📡 CORS enabled for: {cors_origins}")
    print("✅ API ready")
    print("📚 Docs available at /docs")


if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
