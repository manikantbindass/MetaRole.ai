"""
MetaRole AI — Resume Parser
Extracts structured data from PDF/DOCX/TXT resume files using OpenAI GPT-4.
"""
import json
import re
from pathlib import Path
from typing import Optional

try:
    import pdfplumber
except ImportError:
    pdfplumber = None

try:
    from docx import Document as DocxDocument
except ImportError:
    DocxDocument = None

from openai import OpenAI
from config import OPENAI_API_KEY, OPENAI_MODEL, MAX_RESUME_CHARS

client = OpenAI(api_key=OPENAI_API_KEY)


# ─── Text Extraction ──────────────────────────────────────────────────
def extract_text_from_pdf(path: str) -> str:
    """Extract text from PDF using pdfplumber."""
    if pdfplumber is None:
        raise ImportError("pdfplumber is not installed")
    text_pages = []
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            text = page.extract_text()
            if text:
                text_pages.append(text)
    return "\n".join(text_pages)


def extract_text_from_docx(path: str) -> str:
    """Extract text from DOCX using python-docx."""
    if DocxDocument is None:
        raise ImportError("python-docx is not installed")
    doc = DocxDocument(path)
    return "\n".join(para.text for para in doc.paragraphs if para.text.strip())


def extract_text_from_file(path: str) -> str:
    """Route file to correct extractor based on extension."""
    ext = Path(path).suffix.lower()
    if ext == ".pdf":
        return extract_text_from_pdf(path)
    elif ext in (".docx", ".doc"):
        return extract_text_from_docx(path)
    elif ext == ".txt":
        return Path(path).read_text(encoding="utf-8")
    else:
        raise ValueError(f"Unsupported file type: {ext}")


# ─── AI Parsing ──────────────────────────────────────────────────────────
SYSTEM_PROMPT = """
You are a precision resume parser. Extract ALL information from the resume text.
Return ONLY valid JSON. No markdown, no explanations.

JSON Schema:
{
  "personal": {
    "name": string,
    "email": string,
    "phone": string,
    "location": string,
    "linkedin": string,
    "github": string,
    "portfolio": string
  },
  "summary": string,
  "skills": {
    "technical": [string],
    "frameworks": [string],
    "databases": [string],
    "cloud": [string],
    "tools": [string],
    "soft": [string]
  },
  "experience": [{
    "company": string,
    "role": string,
    "location": string,
    "startDate": string,
    "endDate": string,
    "isCurrent": boolean,
    "description": [string],
    "technologies": [string],
    "impact": [string]
  }],
  "education": [{
    "institution": string,
    "degree": string,
    "field": string,
    "startYear": string,
    "endYear": string,
    "gpa": string,
    "achievements": [string]
  }],
  "projects": [{
    "name": string,
    "description": string,
    "technologies": [string],
    "url": string,
    "githubUrl": string,
    "impact": string
  }],
  "certifications": [{
    "name": string,
    "issuer": string,
    "year": string,
    "url": string
  }],
  "achievements": [string],
  "languages": [{ "language": string, "proficiency": string }],
  "totalExperienceYears": number
}
"""


def parse_resume(raw_text: str) -> dict:
    """
    Parse resume text into structured JSON using GPT-4.
    Args:
        raw_text: Plain text extracted from resume file
    Returns:
        Structured resume data as dict
    """
    truncated = raw_text[:MAX_RESUME_CHARS]

    response = client.chat.completions.create(
        model=OPENAI_MODEL,
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": f"Parse this resume:\n\n{truncated}"},
        ],
        temperature=0.05,
        response_format={"type": "json_object"},
    )

    content = response.choices[0].message.content
    return json.loads(content)


def parse_resume_file(file_path: str) -> dict:
    """
    Full pipeline: file → text → structured JSON
    Args:
        file_path: Path to resume file
    Returns:
        Structured resume data
    """
    raw_text = extract_text_from_file(file_path)
    if len(raw_text.strip()) < 50:
        raise ValueError("Insufficient text extracted from file")
    return parse_resume(raw_text)


if __name__ == "__main__":
    import sys
    if len(sys.argv) < 2:
        print("Usage: python resume_parser.py <path/to/resume.pdf>")
        sys.exit(1)

    result = parse_resume_file(sys.argv[1])
    print(json.dumps(result, indent=2))
