"""
MetaRole AI — Career Path Predictor
Predicts career trajectories with probability scores, salary ranges,
and step-by-step roadmaps based on user skill profile.
"""
import json
from dataclasses import dataclass
from typing import Optional

from openai import OpenAI
from config import OPENAI_API_KEY, OPENAI_MODEL

client = OpenAI(api_key=OPENAI_API_KEY)


@dataclass
class UserProfile:
    """User career profile for prediction."""
    skills: list[str]
    experience_years: float
    current_role: Optional[str] = None
    education: Optional[str] = None
    interests: Optional[list[str]] = None


SYSTEM_PROMPT = """
You are an expert tech career advisor with deep knowledge of the job market.
Analyze developer profiles and predict their optimal career paths.
Be specific, data-driven, and actionable.
Always return valid JSON.
"""


def predict_career_paths(profile: UserProfile) -> dict:
    """
    Predict career paths with probability scores and roadmaps.
    Args:
        profile: User career profile
    Returns:
        Career predictions with detailed roadmaps
    """
    user_prompt = f"""
Analyze this developer profile and predict their top 5 career paths.

Profile:
- Current skills: {json.dumps(profile.skills)}
- Years of experience: {profile.experience_years}
- Current role: {profile.current_role or 'N/A'}
- Education: {profile.education or 'N/A'}
- Interests: {json.dumps(profile.interests or [])}

Return JSON:
{{
  "predictions": [
    {{
      "rank": number,
      "role": string,
      "probability": number (0-100),
      "timelineMonths": number,
      "salaryRange": {{ "min": number, "max": number, "currency": "USD", "type": "annual" }},
      "requiredSkills": [string],
      "missingSkills": [string],
      "roadmap": [
        {{ "phase": string, "duration": string, "actions": [string], "milestones": [string] }}
      ],
      "companies": [string],
      "industries": [string],
      "demandTrend": "rising" | "stable" | "declining",
      "demandScore": number (0-100),
      "whyGoodFit": string,
      "challenges": [string]
    }}
  ],
  "topRecommendation": string,
  "marketInsights": {{
    "hotSkills2024": [string],
    "emergingRoles": [string],
    "salaryTrends": string
  }},
  "personalizedAdvice": string
}}"""

    response = client.chat.completions.create(
        model=OPENAI_MODEL,
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_prompt},
        ],
        temperature=0.3,
        response_format={"type": "json_object"},
    )

    return json.loads(response.choices[0].message.content)


if __name__ == "__main__":
    profile = UserProfile(
        skills=["JavaScript", "React", "Node.js", "Solidity", "Python", "Docker", "MongoDB"],
        experience_years=2,
        current_role="Junior Full Stack Developer",
        education="B.Tech Computer Science",
        interests=["Blockchain", "AI/ML", "Open Source"],
    )
    result = predict_career_paths(profile)
    print(json.dumps(result, indent=2))
