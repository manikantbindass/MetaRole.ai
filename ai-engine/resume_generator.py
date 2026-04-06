"""
MetaRole AI — AI Resume Generator
Generates tailored, ATS-optimized resumes for specific job roles
using GPT-4 with LangChain prompt templates.
"""
import json
from typing import Optional

from openai import OpenAI
from config import OPENAI_API_KEY, OPENAI_MODEL

client = OpenAI(api_key=OPENAI_API_KEY)


SYSTEM_PROMPT = """
You are a professional resume writer and career coach.
You specialize in creating compelling, ATS-optimized resumes for tech professionals.
Your resumes are:
- Action-verb led bullet points with quantified impact
- Tailored to the specific job description and role
- ATS-friendly (no tables, graphics, or complex formatting)
- Optimized with relevant keywords from the job description
Always return valid JSON.
"""


def generate_tailored_resume(
    user_data: dict,
    target_role: str,
    job_description: Optional[str] = None
) -> dict:
    """
    Generate an ATS-optimized resume tailored to a specific role.
    Args:
        user_data: Structured user data (from resume parser)
        target_role: Target job title
        job_description: Optional job posting text for keyword extraction
    Returns:
        Generated resume in multiple formats
    """
    user_prompt = f"""
Create a professional, ATS-optimized resume for this candidate.

User Profile: {json.dumps(user_data, indent=2)}
Target Role: {target_role}
Job Description: {job_description or 'Not provided — optimize for the role generally'}

Return JSON:
{{
  "contactSection": {{
    "name": string,
    "email": string,
    "phone": string,
    "location": string,
    "linkedin": string,
    "github": string,
    "portfolio": string
  }},
  "summary": string (2-3 powerful sentences),
  "coreSkills": [string] (top 12-15 for the role),
  "experience": [
    {{
      "company": string,
      "role": string,
      "duration": string,
      "location": string,
      "bullets": [string] (3-5 action-led, quantified bullets)
    }}
  ],
  "education": [
    {{
      "institution": string,
      "degree": string,
      "year": string,
      "highlights": [string]
    }}
  ],
  "projects": [
    {{
      "name": string,
      "technologies": [string],
      "description": string,
      "impact": string,
      "url": string
    }}
  ],
  "certifications": [{{ "name": string, "issuer": string, "year": string }}],
  "keywords": [string] (extracted from job description),
  "atsScore": number (0-100),
  "improvements": [string],
  "markdownVersion": string (full resume in clean markdown format)
}}"""

    response = client.chat.completions.create(
        model=OPENAI_MODEL,
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_prompt},
        ],
        temperature=0.35,
        response_format={"type": "json_object"},
    )

    return json.loads(response.choices[0].message.content)


if __name__ == "__main__":
    sample_user = {
        "personal": {"name": "Rahul Kumar", "email": "rahul@example.com"},
        "skills": {"technical": ["JavaScript", "React", "Node.js", "Python", "Solidity"]},
        "experience": [
            {
                "company": "StartupX",
                "role": "Full Stack Developer",
                "startDate": "Jan 2023",
                "endDate": "Present",
                "description": ["Built React frontend", "Developed REST APIs"]
            }
        ]
    }
    result = generate_tailored_resume(sample_user, "Senior Full Stack Developer")
    print(json.dumps(result, indent=2))
