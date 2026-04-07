# ⚙️ MetaRole AI — Setup Guide

```
> INITIALIZING SETUP SEQUENCE...
> ESTIMATED TIME: 15 MINUTES
> OPERATOR CLEARANCE: REQUIRED
```

---

## Prerequisites

Before you begin, ensure you have:

- [ ] **Node.js** >= 18.17.0
- [ ] **Python** >= 3.11
- [ ] **PostgreSQL** >= 15
- [ ] **Git** >= 2.40
- [ ] **OpenAI API Key** — [Get one here](https://platform.openai.com/api-keys)

---

## Step 1 — Clone the Repository

```bash
git clone https://github.com/manikantbindass/MetaRole.ai
cd MetaRole.ai
```

---

## Step 2 — Configure Environment Variables

```bash
cp .env.example .env
```

Open `.env` and fill in the required values:

```env
# REQUIRED
OPENAI_API_KEY=sk-...your_key_here
DATABASE_URL=postgresql://user:password@localhost:5432/metarole
JWT_SECRET=your_super_secret_jwt_string_here

# OPTIONAL (for Pinecone instead of FAISS)
PINECONE_API_KEY=your_pinecone_key
PINECONE_INDEX=metarole-skills

# OPTIONAL (for Clerk Auth)
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...

# OPTIONAL (for Redis caching)
REDIS_URL=redis://localhost:6379
```

---

## Step 3 — Setup PostgreSQL Database

```bash
# Create database
psql -U postgres -c "CREATE DATABASE metarole;"

# Run schema
psql -U postgres -d metarole -f database/schema.sql
```

---

## Step 4 — Setup Backend (FastAPI)

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate   # Linux/Mac
# OR
venv\Scripts\activate      # Windows

# Install dependencies
pip install -r requirements.txt

# Start the server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Backend will be available at: `http://localhost:8000`
Swagger docs: `http://localhost:8000/docs`

---

## Step 5 — Setup Frontend (Next.js)

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will be available at: `http://localhost:3000`

---

## Step 6 — (Optional) Run with Docker

```bash
# Build and start all services
docker compose up --build

# Services:
# Frontend  → http://localhost:3000
# Backend   → http://localhost:8000
# PostgreSQL → localhost:5432
```

---

## Deployment

### Unified Deployment → Vercel (Recommended)

1. Connect your GitHub repo to [Vercel](https://vercel.com).
2. Vercel will auto-detect the `vercel.json` and `api/` folder.
3. Ensure the **Root Directory** in Vercel settings is set to the repository root (not the `frontend` folder).
4. Add your **Environment Variables** in the Vercel dashboard:
   - `OPENAI_API_KEY`
   - `NEXT_PUBLIC_API_URL` (leave empty for same-origin relative calls)

---

## Verification

```bash
# Check unified health endpoint (deployed)
curl https://your-app.vercel.app/api/health
# Expected: {"status": "ok", "service": "MetaRole AI (Python/FastAPI)"}
```

---

## Common Issues

| Issue | Fix |
|-------|-----|
| `ModuleNotFoundError` | Run `pip install -r requirements.txt` inside venv |
| `EADDRINUSE :3000` | Kill process: `npx kill-port 3000` |
| DB connection refused | Ensure PostgreSQL is running: `sudo service postgresql start` |
| OpenAI rate limit | Add delays or upgrade your OpenAI plan tier |

---

```
> SETUP COMPLETE.
> ALL SYSTEMS NOMINAL.
> WELCOME TO METAROLE AI.
```
