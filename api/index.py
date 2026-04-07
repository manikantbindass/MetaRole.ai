import os
import uuid
import json
from typing import Dict, List, Optional
from fastapi import FastAPI, HTTPException, Body, Query
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory "session" store
# NOTE: Vercel Functions are stateless. This will only persist for the lifetime of a warm instance.
# For production, use Redis or a Database.
sessions: Dict[str, dict] = {}

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def get_chat_response(prompt: str, system: str = "You are MetaRole AI, a cyberpunk career co-pilot."):
    """Helper to call OpenAI GPT-4o-mini."""
    if os.getenv("MOCK_AI") == "true":
        return get_mock_response(prompt)
    
    try:
        response = client.chat.completions.create(
            model=os.getenv("OPENAI_MODEL", "gpt-4o-mini"),
            messages=[
                {"role": "system", "content": system},
                {"role": "user", "content": prompt}
            ]
        )
        return response.choices[0].message.content
    except Exception as e:
        print(f"[OpenAI Error] {e}")
        return get_mock_response(prompt)

def get_mock_response(prompt: str):
    """Fallback mock responses."""
    p = prompt.lower()
    if "predict" in p or "career" in p:
        return json.dumps([
            {"role": "Senior AI Architect", "probability": 0.92},
            {"role": "Web3 Lead Developer", "probability": 0.85},
            {"role": "Cybersecurity Consultant", "probability": 0.76}
        ])
    if "skill" in p and "graph" in p:
        return json.dumps({
            "skills": ["Python", "JavaScript", "FastAPI", "Next.js", "Docker", "React"],
            "graph": {
                "nodes": [{"id": "Python", "group": 1}, {"id": "FastAPI", "group": 1}],
                "edges": [{"source": "Python", "target": "FastAPI"}]
            }
        })
    if "job" in p and "match" in p:
        return json.dumps({
            "jobs": [
                {"id": "j1", "title": "AI Engineer", "company": "Neuralink", "score": 98, "location": "Remote"},
                {"id": "j2", "title": "Senior Dev", "company": "SpaceX", "score": 85, "location": "Boca Chica"}
            ]
        })
    return "MOCK_RESPONSE: MetaRole AI is processing your request."

@app.get("/api/health")
async def health():
    return {"status": "ok", "service": "MetaRole AI (Python/FastAPI)"}

@app.post("/api/upload-resume")
async def upload_resume(data: dict = Body(...)):
    content = data.get("content")
    if not content:
        raise HTTPException(status_code=400, detail="content is required")
    
    analysis_id = str(uuid.uuid4())
    sessions[analysis_id] = {"raw": content, "skills": [], "predictions": []}
    return {"analysisId": analysis_id}

@app.get("/api/analyze-skills")
async def analyze_skills(analysisId: str = Query(...)):
    sess = sessions.get(analysisId)
    if not sess:
        # For demo purposes, if not found, create a dummy session
        sess = {"raw": "Dummy resume content", "skills": [], "predictions": []}
        sessions[analysisId] = sess

    prompt = f"Extract a list of technical skills and a graph adjacency list for D3.js from this resume: {sess['raw']}. Return ONLY JSON with {{ 'skills': [string], 'graph': {{ 'nodes': [], 'edges': [] }} }}."
    
    res = get_chat_response(prompt)
    try:
        # Extract JSON from potential markdown code blocks
        if "```json" in res:
            res = res.split("```json")[1].split("```")[0].strip()
        data = json.loads(res)
        sess["skills"] = data.get("skills", [])
        return data
    except:
        return {"skills": ["Error parsing skills"], "graph": {"nodes": [], "edges": []}}

@app.get("/api/predict-career")
async def predict_career(analysisId: str = Query(...)):
    sess = sessions.get(analysisId)
    if not sess:
        raise HTTPException(status_code=404, detail="Session not found")

    prompt = f"Based on these skills: {json.dumps(sess.get('skills', []))}, predict 3 likely career paths with probabilities. Return ONLY JSON array of {{ 'role': string, 'probability': float }}."
    
    res = get_chat_response(prompt)
    try:
        if "```json" in res:
            res = res.split("```json")[1].split("```")[0].strip()
        predictions = json.loads(res)
        sess["predictions"] = predictions
        return {"predictions": predictions}
    except:
        return {"predictions": [{"role": "Generalist", "probability": 1.0}]}

@app.post("/api/generate-resume")
async def generate_resume(data: dict = Body(...)):
    analysis_id = data.get("analysisId")
    job_title = data.get("jobTitle", "Target Role")
    sess = sessions.get(analysis_id)
    if not sess:
         raise HTTPException(status_code=404, detail="Session not found")

    prompt = f"Using this resume text: {sess['raw']} and skills: {json.dumps(sess['skills'])}, generate a concise ATS-friendly resume for the role: {job_title}."
    resume = get_chat_response(prompt)
    return {"resume": resume}

@app.post("/api/generate-portfolio")
async def generate_portfolio(data: dict = Body(...)):
    analysis_id = data.get("analysisId")
    sess = sessions.get(analysis_id)
    if not sess:
         raise HTTPException(status_code=404, detail="Session not found")

    prompt = f"Generate a minimal hacker-terminal style single-page HTML portfolio for this user based on their resume: {sess['raw']}. Use only standard CSS/HTML."
    html = get_chat_response(prompt)
    return {"html": html}

@app.get("/api/job-match")
async def job_match(analysisId: str = Query(...)):
    sess = sessions.get(analysisId)
    if not sess:
         raise HTTPException(status_code=404, detail="Session not found")

    prompt = f"Find 3 job matches for this profile: {json.dumps(sess.get('skills', []))}. Return ONLY JSON with 'jobs' key containing array of {{ id, title, company, score, location }}."
    res = get_chat_response(prompt)
    try:
        if "```json" in res:
            res = res.split("```json")[1].split("```")[0].strip()
        return json.loads(res)
    except:
        return {"jobs": []}

# Boilerplate for local running
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
