from typing import List, Dict


def predict_roles(skills: List[str]) -> List[Dict]:
    base = [
        {"role": "Full-Stack Engineer", "probability": 0.8},
        {"role": "DevOps Engineer", "probability": 0.6},
        {"role": "AI Engineer", "probability": 0.5},
    ]
    return base
