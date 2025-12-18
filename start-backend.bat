@echo off
echo.
echo ========================================
echo   Liquidity AI - Backend Server
echo ========================================
echo.

cd backend

:: Check if virtual environment exists
if not exist "venv" (
    echo Creating Python virtual environment...
    python -m venv venv
)

:: Activate virtual environment
call venv\Scripts\activate

:: Install dependencies
echo Installing backend dependencies...
pip install -r requirements.txt

echo.
echo Starting FastAPI backend...
echo.
echo API will be available at: http://localhost:8000
echo API Docs at: http://localhost:8000/docs
echo.
echo Press Ctrl+C to stop the server
echo.

uvicorn main:app --reload --port 8000
