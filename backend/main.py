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
        "item": "Onbenutte R&D Belastingvoordelen",
        "subsidy": "WBSO Regeling",
        "amount": -4800,
        "category": "Fiscaal",
        "description": "Afdrachtvermindering voor speur- en ontwikkelingswerk. Verlaagt de loonbelasting en sociale premies voor R&D-medewerkers.",
        "deadline": "30 september 2024",
        "eligibility": [
            "Bedrijven met S&O-activiteiten",
            "Minimaal 500 S&O-uren per jaar",
            "Technisch nieuw product of proces"
        ]
    },
    {
        "id": "sde-2024",
        "item": "Duurzame Energie Investering",
        "subsidy": "SDE++ Subsidie",
        "amount": -3200,
        "category": "Energie",
        "description": "Stimuleringsregeling Duurzame Energieproductie en Klimaattransitie voor hernieuwbare energieprojecten.",
        "deadline": "Doorlopende aanvragen",
        "eligibility": [
            "Energieproductie uit hernieuwbare bronnen",
            "CO2-reducerende projecten",
            "Minimale projectomvang vereist"
        ]
    },
    {
        "id": "stap-2024",
        "item": "Opleidingsbudget Werknemers",
        "subsidy": "STAP Budget",
        "amount": -2800,
        "category": "Personeel",
        "description": "Stimulering Arbeidsmarktpositie - budget voor scholing en ontwikkeling van werknemers.",
        "deadline": "Doorlopende inschrijving",
        "eligibility": [
            "Nederlandse ingezetenen 18+",
            "Geregistreerde opleidingsaanbieders",
            "Maximaal €1.000 per persoon per jaar"
        ]
    },
    {
        "id": "mit-2024",
        "item": "Digitale Transformatie",
        "subsidy": "MIT Regeling",
        "amount": -2100,
        "category": "Digitaal",
        "description": "MKB Innovatiestimulering Regio en Topsectoren - ondersteunt innovatie bij het MKB.",
        "deadline": "April 2024 / September 2024",
        "eligibility": [
            "Midden- en kleinbedrijf (MKB)",
            "Innovatie- of R&D-project",
            "Samenwerking met kennisinstellingen"
        ]
    },
    {
        "id": "dhi-2024",
        "item": "Export Ontwikkeling",
        "subsidy": "DHI Subsidie",
        "amount": -1300,
        "category": "Export",
        "description": "Demonstratieprojecten, Haalbaarheidsstudies en Investeringsvoorbereiding voor internationaal ondernemen.",
        "deadline": "Doorlopende aanvragen",
        "eligibility": [
            "Nederlandse bedrijven met exportambitie",
            "Projecten in opkomende markten",
            "Demonstratie- of haalbaarheidsstudies"
        ]
    },
    {
        "id": "innovatie-2024",
        "item": "Innovatiebox Voordelen",
        "subsidy": "Innovatiebox",
        "amount": -1800,
        "category": "Fiscaal",
        "description": "Verlaagd vennootschapsbelastingtarief (9%) voor winsten uit innovatieve activiteiten.",
        "deadline": "Jaarlijkse belastingaangifte",
        "eligibility": [
            "Octrooien of WBSO-verklaring",
            "Zelfontworpen immateriële activa",
            "Aantoonbare innovatieactiviteiten"
        ]
    },
    {
        "id": "bmkb-2024",
        "item": "MKB Kredietgarantie",
        "subsidy": "BMKB Regeling",
        "amount": -950,
        "category": "Financiering",
        "description": "Borgstelling MKB-kredieten - overheidsgarantie voor bankleningen aan MKB.",
        "deadline": "Doorlopend beschikbaar",
        "eligibility": [
            "MKB-classificatie",
            "Levensvatbaar ondernemingsplan",
            "Banklening aanvraag"
        ]
    },
    {
        "id": "eia-2024",
        "item": "Energie-Investeringsaftrek",
        "subsidy": "EIA Regeling",
        "amount": -2400,
        "category": "Energie",
        "description": "Extra fiscale aftrek voor investeringen in energiebesparende bedrijfsmiddelen en duurzame energie.",
        "deadline": "Binnen 3 maanden na investering",
        "eligibility": [
            "Investering in erkende bedrijfsmiddelen",
            "Minimaal €2.500 per bedrijfsmiddel",
            "Opgenomen in de Energielijst"
        ]
    },
    {
        "id": "mia-vamil-2024",
        "item": "Milieu-Investeringen",
        "subsidy": "MIA/Vamil",
        "amount": -1650,
        "category": "Milieu",
        "description": "Milieu-investeringsaftrek en willekeurige afschrijving voor milieuinvesteringen.",
        "deadline": "Binnen 3 maanden na investering",
        "eligibility": [
            "Investering in milieulijst bedrijfsmiddelen",
            "Nieuwe of eenmalige investeringen",
            "Minimaal €2.500 per bedrijfsmiddel"
        ]
    },
    {
        "id": "tki-2024",
        "item": "Samenwerkingsprojecten",
        "subsidy": "TKI Toeslag",
        "amount": -1200,
        "category": "Innovatie",
        "description": "Topconsortia voor Kennis en Innovatie - stimuleert publiek-private samenwerking.",
        "deadline": "Jaarlijkse ronden",
        "eligibility": [
            "Samenwerking bedrijven en kennisinstellingen",
            "Fundamenteel/industrieel onderzoek",
            "Bijdrage aan nationale topsectoren"
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
