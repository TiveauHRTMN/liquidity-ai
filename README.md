# 💧 Liquidity AI

AI-powered capital leakage detection and subsidy recovery platform.

![Liquidity AI](https://img.shields.io/badge/Liquidity-AI-red?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-blue?style=flat-square)
![FastAPI](https://img.shields.io/badge/FastAPI-0.109-green?style=flat-square)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-cyan?style=flat-square)

## ✨ Features

- 🎨 **Glassmorphism Design** - Dark Glass Citadel aesthetic
- 📤 **Document Upload** - Drag & drop PDF, Excel, CSV
- 🤖 **AI Analysis** - Simulated subsidy detection
- 📊 **Dashboard** - Real-time capital leakage display
- 📧 **Email Alerts** - Subsidy notification subscriptions
- 📥 **Export** - CSV download of analysis results

## 🚀 Quick Start

### Frontend Only (Demo Mode)
```bash
npm install
npm run dev
```

### Full Stack
```bash
# Terminal 1 - Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

# Terminal 2 - Frontend
npm install
npm run dev
```

## 🌐 Deploy to Production

### Frontend → Vercel
1. Push to GitHub
2. Connect repo to [Vercel](https://vercel.com)
3. Set environment variable: `VITE_API_URL` = your backend URL
4. Deploy!

### Backend → Railway
1. Push `backend/` to GitHub
2. Create new project on [Railway](https://railway.app)
3. Connect to repo, select `backend` directory
4. Set environment: `CORS_ORIGINS` = your Vercel URL
5. Deploy!

## 📁 Structure

```
├── src/                  # React frontend
│   ├── components/       # UI components
│   └── services/         # API client
├── backend/              # FastAPI backend
│   ├── main.py          # API endpoints
│   └── Dockerfile       # Container config
└── vercel.json          # Vercel config
```

## 🔑 Environment Variables

### Frontend (.env.local)
```
VITE_API_URL=https://your-backend.railway.app
```

### Backend
```
CORS_ORIGINS=https://your-frontend.vercel.app
PORT=8000
```

## 📄 License

MIT © 2024
