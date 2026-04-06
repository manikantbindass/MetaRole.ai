"""
MetaRole AI — Skill Gap Analyzer
Compares user skills against target role requirements using vector similarity.
Builds skill graph with proficiency levels and generates learning roadmap.
"""
import json
from typing import Optional
import numpy as np

from openai import OpenAI
from config import OPENAI_API_KEY, OPENAI_MODEL, EMBEDDING_MODEL

client = OpenAI(api_key=OPENAI_API_KEY)


# Role skill requirements database (can be replaced with Pinecone in production)
ROLE_REQUIREMENTS = {
    "Frontend Developer": [
        "React", "TypeScript", "CSS", "HTML", "JavaScript",
        "Next.js", "Webpack", "Testing", "Accessibility", "Performance Optimization"
    ],
    "Backend Developer": [
        "Node.js", "Python", "Databases", "REST API", "Authentication",
        "Caching", "Message Queues", "Docker", "AWS", "System Design"
    ],
    "Full Stack Developer": [
        "React", "Node.js", "TypeScript", "PostgreSQL", "Docker",
        "REST API", "Authentication", "CI/CD", "Git", "System Design"
    ],
    "DevOps Engineer": [
        "Docker", "Kubernetes", "CI/CD", "Terraform", "AWS",
        "Linux", "Bash", "Monitoring", "Security", "Networking"
    ],
    "AI/ML Engineer": [
        "Python", "PyTorch", "TensorFlow", "Machine Learning", "Deep Learning",
        "NLP", "Computer Vision", "MLOps", "Statistics", "Data Engineering"
    ],
    "Blockchain Developer": [
        "Solidity", "Web3.js", "Ethers.js", "Smart Contracts", "DeFi",
        "Testing (Hardhat)", "IPFS", "React", "TypeScript", "Security Auditing"
    ],
}


def cosine_similarity(a: list, b: list) -> float:
    """Compute cosine similarity between two vectors."""
    a_arr = np.array(a)
    b_arr = np.array(b)
    return float(np.dot(a_arr, b_arr) / (np.linalg.norm(a_arr) * np.linalg.norm(b_arr) + 1e-10))


def get_embedding(text: str) -> list:
    """Get OpenAI text embedding."""
    response = client.embeddings.create(input=text, model=EMBEDDING_MODEL)
    return response.data[0].embedding


def analyze_skill_gap(
    user_skills: list[str],
    target_role: str,
    experience_years: float = 0
) -> dict:
    """
    Analyze skill gaps between user skills and target role requirements.
    Args:
        user_skills: List of skills from resume
        target_role: Target job role
        experience_years: Years of experience
    Returns:
        Comprehensive skill gap analysis
    """
    role_skills = ROLE_REQUIREMENTS.get(
        target_role,
        ROLE_REQUIREMENTS["Full Stack Developer"]
    )

    user_set = set(s.lower() for s in user_skills)
    role_set = set(s.lower() for s in role_skills)

    matched = [s for s in role_skills if s.lower() in user_set]
    missing = [s for s in role_skills if s.lower() not in user_set]
    extra = [s for s in user_skills if s.lower() not in role_set]

    # Use GPT-4 for deep analysis
    prompt = f"""
Perform a detailed skill gap analysis.

User skills: {json.dumps(user_skills)}
Target role: {target_role}
Required skills: {json.dumps(role_skills)}
Matched skills: {json.dumps(matched)}
Missing skills: {json.dumps(missing)}
Extra skills: {json.dumps(extra)}
Experience: {experience_years} years

Return JSON:
{{
  "overallMatch": number (0-100),
  "readinessLevel": "not-ready" | "partially-ready" | "mostly-ready" | "ready",
  "skillGraph": [
    {{
      "name": string,
      "category": string,
      "userLevel": number (0-100),
      "requiredLevel": number (0-100),
      "gap": number,
      "priority": "critical" | "high" | "medium" | "low"
    }}
  ],
  "learningPlan": [
    {{
      "skill": string,
      "resources": [string],
      "estimatedWeeks": number,
      "priority": string
    }}
  ],
  "strengths": [string],
  "quickWins": [string],
  "timeline": string
}}"""

    response = client.chat.completions.create(
        model=OPENAI_MODEL,
        messages=[{"role": "user", "content": prompt}],
        temperature=0.2,
        response_format={"type": "json_object"},
    )

    analysis = json.loads(response.choices[0].message.content)
    analysis["matched"] = matched
    analysis["missing"] = missing
    analysis["extra"] = extra
    return analysis


if __name__ == "__main__":
    sample_skills = ["React", "JavaScript", "Node.js", "MongoDB", "Git", "HTML", "CSS"]
    result = analyze_skill_gap(sample_skills, "Full Stack Developer", 1.5)
    print(json.dumps(result, indent=2))
