from typing import List


def generate_resume_text(name: str, skills: List[str], summary: str) -> str:
    skills_str = ", ".join(skills)
    return f"""{name.upper()}
-----------------------
SUMMARY
{summary}

SKILLS
{skills_str}
"""
