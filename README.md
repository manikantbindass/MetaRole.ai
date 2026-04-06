```
███╗   ███╗███████╗████████╗ █████╗ ██████╗  ██████╗ ██╗     ███████╗       █████╗ ██╗
████╗ ████║██╔════╝╚══██╔══╝██╔══██╗██╔══██╗██╔═══██╗██║     ██╔════╝      ██╔══██╗██║
██╔████╔██║█████╗     ██║   ███████║██████╔╝██║   ██║██║     █████╗        ███████║██║
██║╚██╔╝██║██╔══╝     ██║   ██╔══██║██╔══██╗██║   ██║██║     ██╔══╝        ██╔══██║██║
██║ ╚═╝ ██║███████╗   ██║   ██║  ██║██║  ██║╚██████╔╝███████╗███████╗      ██║  ██║██║
╚═╝     ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚══════╝      ╚═╝  ╚═╝╚═╝
```

<div align="center">

# ⚡ MetaRole AI — Your AI Career Co-Pilot

> _"The system knows your potential before you do."_

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge&logo=vercel)](https://meta-role-ai.vercel.app)

**🚀 Live Deployment:** https://meta-role-ai.vercel.app
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4-412991?style=for-the-badge&logo=openai)](https://openai.com)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=for-the-badge&logo=postgresql)](https://postgresql.org)
[![License: AGPL-3.0](https://img.shields.io/badge/License-AGPL--3.0-33ff00?style=for-the-badge)](LICENSE)

```
> SYSTEM BOOT... [ ████████████████████ ] 100%
> AI CORE ONLINE.
> CAREER CO-PILOT READY.
> INITIALIZING YOUR FUTURE...
```

</div>

---

## 🖥️ SYSTEM OVERVIEW

MetaRole AI is a **production-grade AI SaaS platform** that acts as your personal career co-pilot. It parses your resume, graphs your skill network, identifies gaps, predicts optimal career paths, and generates tailored resumes & portfolios — all through a cyberpunk terminal UI.

```
┌─────────────────────────────────────────────────────────────┐
│  INPUT                    PROCESS               OUTPUT       │
│  ───────                  ───────               ──────       │
│  📄 Resume         →   🧠 AI Parser    →   📊 Skill Graph   │
│  🐙 GitHub         →   🔍 Gap Analyzer →   🗺️  Career Path  │
│  💬 Chat Input     →   🎯 Predictor   →   📝 Resume Draft  │
│                        🤖 Generator   →   🌐 Portfolio     │
│                        🔎 Job Matcher →   💼 Job Matches   │
└─────────────────────────────────────────────────────────────┘
```

---

## ⚡ CORE FEATURES

| # | Feature | Description | Status |
|---|---------|-------------|--------|
| 01 | 📄 **Resume Parser** | AI-powered extraction of skills, experience, projects via GPT-4 | ✅ Ready |
| 02 | 🕸️ **Skill Graph** | D3.js force-directed visualization of your skill network | ✅ Ready |
| 03 | 🔍 **Gap Analyzer** | Compare your stack vs. target role requirements | ✅ Ready |
| 04 | 🎯 **Career Predictor** | ML-powered role suggestions with confidence scores | ✅ Ready |
| 05 | ✍️ **Resume Generator** | Tailored, ATS-optimized resume per job description | ✅ Ready |
| 06 | 🌐 **Portfolio Generator** | Auto-generated portfolio website from your data | ✅ Ready |
| 07 | 💼 **Job Matcher** | Semantic job search & intelligent match scoring | ✅ Ready |
| 08 | 📊 **Career Dashboard** | Real-time analytics, progress tracking, goal setting | ✅ Ready |

---

## 🏗️ ARCHITECTURE

```
                    ┌──────────────────────────────────────┐
                    │         METAROLE AI SYSTEM           │
                    └──────────────────────────────────────┘
                                      │
              ┌───────────────────────┼───────────────────────┐
              ▼                       ▼                       ▼
   ┌─────────────────┐    ┌─────────────────────┐   ┌──────────────────┐
   │   FRONTEND      │    │     BACKEND (API)    │   │   AI ENGINE      │
   │  Next.js 14     │◄──►│    FastAPI (Python)  │◄─►│  Python + GPT-4  │
   │  App Router     │    │    REST Endpoints    │   │  LangChain       │
   │  Tailwind CSS   │    │    JWT Auth          │   │  FAISS VectorDB  │
   │  Framer Motion  │    │    PostgreSQL ORM    │   │  resume_parser   │
   │  shadcn/ui      │    │    Redis Cache       │   │  skill_gap       │
   └─────────────────┘    └─────────────────────┘   │  career_predict  │
            │                       │                │  resume_gen      │
            │                       │                └──────────────────┘
            ▼                       ▼
   ┌─────────────────┐    ┌──────────────────────┐
   │    Vercel CDN   │    │   PostgreSQL 16       │
   │    (Frontend)   │    │   + FAISS Vector DB   │
   └─────────────────┘    └──────────────────────┘
```

---

## 🛠️ TECH STACK

### Frontend
```
• Next.js 14       — App Router, Server Components, SSR
• Tailwind CSS     — Utility-first styling
• Framer Motion    — Page & component animations
• shadcn/ui        — Headless component system
• D3.js            — Skill graph visualization
• JetBrains Mono   — Terminal monospace font
```

### Backend
```
• FastAPI           — High-performance async API
• SQLAlchemy        — ORM for PostgreSQL
• Alembic           — Database migrations
• Redis             — Session & response caching
• Pydantic v2       — Request/response validation
• Uvicorn           — ASGI server
```

### AI Engine
```
• OpenAI GPT-4      — Resume parsing, generation, gap analysis
• LangChain         — Chain orchestration & memory
• FAISS             — Local vector similarity search
• sentence-transformers — Semantic embeddings
• pdfplumber        — PDF text extraction
```

### Infrastructure
```
• Vercel            — Frontend deployment (Edge Network)
• Railway / Render  — Backend deployment
• PostgreSQL 16     — Primary relational database
• Docker            — Containerized services
• GitHub Actions    — CI/CD pipeline
```

---

## 📂 PROJECT STRUCTURE

```
MetaRole.ai/
│
├── 📁 frontend/                    # Next.js 14 App
│   ├── app/
│   │   ├── layout.tsx              # Root layout with terminal theme
│   │   ├── page.tsx                # Landing page
│   │   ├── dashboard/
│   │   │   └── page.tsx            # Career dashboard
│   │   ├── upload/
│   │   │   └── page.tsx            # Resume upload
│   │   └── analyze/
│   │       └── page.tsx            # AI analysis results
│   ├── components/
│   │   ├── ui/                     # shadcn base components
│   │   ├── terminal/               # Terminal UI components
│   │   │   ├── TerminalWindow.tsx
│   │   │   ├── TypewriterText.tsx
│   │   │   └── BlinkingCursor.tsx
│   │   ├── graphs/
│   │   │   └── SkillGraph.tsx      # D3 force graph
│   │   └── layout/
│   │       ├── Header.tsx
│   │       └── Sidebar.tsx
│   ├── styles/
│   │   └── globals.css             # Terminal design tokens
│   ├── animations/
│   │   ├── typewriter.ts
│   │   ├── glitch.ts
│   │   └── scanline.ts
│   ├── lib/
│   │   └── api.ts                  # API client
│   ├── package.json
│   ├── tailwind.config.ts
│   └── next.config.ts
│
├── 📁 backend/                     # FastAPI backend
│   ├── main.py                     # App entry point
│   ├── routes/
│   │   ├── resume.py               # /upload-resume, /analyze-skills
│   │   ├── career.py               # /predict-career
│   │   ├── generate.py             # /generate-resume, /generate-portfolio
│   │   └── jobs.py                 # /job-match
│   ├── controllers/
│   │   ├── resume_controller.py
│   │   ├── career_controller.py
│   │   └── job_controller.py
│   ├── services/
│   │   ├── openai_service.py
│   │   ├── vector_service.py
│   │   └── job_service.py
│   ├── models/
│   │   ├── user.py
│   │   ├── resume.py
│   │   └── career.py
│   ├── database.py
│   ├── config.py
│   └── requirements.txt
│
├── 📁 ai-engine/                   # AI/ML modules
│   ├── resume_parser.py            # PDF/DOCX parser + GPT extraction
│   ├── skill_gap.py                # Skill gap analyzer
│   ├── career_predictor.py         # Career path predictor
│   └── resume_generator.py        # Tailored resume generator
│
├── 📁 database/
│   ├── schema.sql                  # Initial DB schema
│   └── migrations/
│
├── 📁 docs/
│   ├── api.md                      # Full API documentation
│   └── architecture.md
│
├── 📁 .github/
│   └── workflows/
│       └── ci.yml                  # GitHub Actions CI/CD
│
├── .env.example
├── setup.md
├── docker-compose.yml
└── README.md
```

---

## 🚀 QUICK START

```bash
# Clone the repository
git clone https://github.com/manikantbindass/MetaRole.ai
cd MetaRole.ai

# Configure environment
cp .env.example .env
# Edit .env with your API keys

# Start backend
cd backend && pip install -r requirements.txt && uvicorn main:app --reload

# Start frontend (new terminal)
cd frontend && npm install && npm run dev

# Visit
open http://localhost:3000
```

For full setup instructions, see [setup.md](setup.md).

---

## 🔌 API DOCUMENTATION

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/upload-resume` | Upload PDF/DOCX resume for parsing |
| `POST` | `/analyze-skills` | Extract and analyze skill graph from resume |
| `POST` | `/predict-career` | Predict career paths with probability scores |
| `POST` | `/generate-resume` | Generate tailored resume for a job description |
| `POST` | `/generate-portfolio` | Auto-generate portfolio website HTML |
| `POST` | `/job-match` | Find and rank job listings by profile match |
| `GET`  | `/health` | Service health check |

Full API docs auto-generated at `/docs` (Swagger UI) when backend is running.

---

## 🔐 ENVIRONMENT VARIABLES

See [.env.example](.env.example) for the complete list.

| Variable | Description |
|----------|-------------|
| `OPENAI_API_KEY` | OpenAI GPT-4 API key |
| `DATABASE_URL` | PostgreSQL connection string |
| `PINECONE_API_KEY` | (Optional) Pinecone vector DB key |
| `CLERK_SECRET_KEY` | Clerk authentication secret |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key |
| `REDIS_URL` | Redis cache connection string |
| `JWT_SECRET` | JWT signing secret |

---

## 🗺️ FUTURE SCOPE

```
[ ROADMAP v2.0 ]
  ├── 🎙️  Voice resume input (Whisper API)
  ├── 🤝  LinkedIn integration (auto-sync)
  ├── 📧  Auto job application via email
  ├── 🧑‍🤝‍🧑  Mentor matching network
  ├── 📱  React Native mobile app
  ├── 🌍  Multi-language resume support
  └── 🏆  Gamified skill progression system
```

---

## 🤝 CONTRIBUTING

```bash
# Fork the repo, then:
git checkout -b feature/your-feature-name
git commit -m 'feat: add your feature'
git push origin feature/your-feature-name
# Open a Pull Request
```

Please follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

---

## 📜 LICENSE

AGPL-3.0 License — See [LICENSE](LICENSE) for details.

---

<div align="center">

```
> SESSION END.
> CAREER PATH OPTIMIZED.
> GOOD LUCK, OPERATOR.
```

**Built with ⚡ by [manikantbindass](https://github.com/manikantbindass)**

</div>
