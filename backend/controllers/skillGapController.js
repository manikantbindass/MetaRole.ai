/**
 * Skill Gap Analysis Controller
 * Compares user skills against job requirements and identifies gaps
 */
const { callOpenAI } = require('../services/openaiService');

/**
 * POST /skill-gap
 * Body: { userSkills: Object, targetRole: string, jobDescription?: string }
 */
async function skillGap(req, res) {
  try {
    const { userSkills, targetRole, jobDescription } = req.body;

    if (!userSkills || !targetRole) {
      return res.status(400).json({ error: 'userSkills and targetRole are required' });
    }

    const prompt = `
Perform a skill gap analysis for this candidate targeting a "${targetRole}" role.

CURRENT SKILLS:
${JSON.stringify(userSkills, null, 2)}

JOB DESCRIPTION:
${jobDescription || 'Standard ' + targetRole + ' role requirements'}

Return JSON with this structure:
{
  "presentSkills": [{ "skill": string, "relevance": "high|medium|low" }],
  "missingSkills": [{ "skill": string, "priority": "critical|important|nice-to-have", "timeToLearn": string, "resources": [string] }],
  "skillMatchScore": number,
  "readinessLevel": "ready|almost-ready|needs-work|significant-gap",
  "recommendations": [string],
  "learningPath": [{ "week": number, "focus": string, "skills": [string] }]
}

Only return valid JSON.
`;

    const rawResponse = await callOpenAI(prompt, { max_tokens: 2000 });
    let gapAnalysis;
    try {
      const jsonMatch = rawResponse.match(/\{[\s\S]*\}/);
      gapAnalysis = JSON.parse(jsonMatch ? jsonMatch[0] : rawResponse);
    } catch {
      gapAnalysis = { presentSkills: [], missingSkills: [], skillMatchScore: 0, readinessLevel: 'needs-work', recommendations: [], learningPath: [] };
    }

    return res.status(200).json({ success: true, data: gapAnalysis });
  } catch (err) {
    console.error('[skillGapController] Error:', err.message);
    return res.status(500).json({ error: 'Skill gap analysis failed', details: err.message });
  }
}

module.exports = { skillGap };
