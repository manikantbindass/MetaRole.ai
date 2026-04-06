from typing import List


def parse_resume(text: str) -> List[str]:
    """
    Super-light placeholder parser.
    In a real system, you'd use NLP + pattern matching.
    """
    if not text:
        return []
    candidates = ["python", "javascript", "react", "node", "docker", "kubernetes"]
    text_lower = text.lower()
    return [s for s in candidates if s in text_lower]
