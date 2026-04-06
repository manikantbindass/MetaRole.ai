from typing import List, Dict


def compute_skill_gap(
    candidate_skills: List[str], target_skills: List[str]
) -> Dict[str, List[str]]:
    missing = [s for s in target_skills if s not in candidate_skills]
    return {"have": candidate_skills, "missing": missing}
