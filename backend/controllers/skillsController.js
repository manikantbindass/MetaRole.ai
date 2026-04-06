/**
 * Skills Analysis Controller
 * Processes parsed resume data to build a structured skill graph
 */
const { callOpenAI } = require('../services/openaiService');

/**
 * POST /analyze-skills
 * Body: { parsedResume: Object }
 */
async function analyzeSkills(req, res) {
  try {
    const { parsedResume } = req.body;

    if (!parsedResume) {
      return res.status(400).json({ error: 'parsedResume is required' });
    }

    const prompt = `
Analyze these skills from the resume and return a structured JSON skill graph.

RESUME DATA:
${JSON.stringify(parsedResume, null, 2)}

Return a JSON object with this exact structure:
{
  "technical": [{ "name": string, "level": "beginner|intermediate|advanced|expert", "category": string, "yearsExp": number }],
  "soft": [{ "name": string, "level": string }],
  "domains": [string],
  "topSkills": [string],
  "experienceYears": number,
  "seniorityLevel": "junior|mid|senior|lead"
}

Only return valid JSON, no explanation.
`;

    const rawResponse = await callOpenAI(prompt, { max_tokens: 1500 });
    let skillGraph;
    try {
      const jsonMatch = rawResponse.match(/\{[\s\S]*\}/);
      skillGraph = JSON.parse(jsonMatch ? jsonMatch[0] : rawResponse);
    } catch {
      skillGraph = { technical: [], soft: [], domains: [], topSkills: [], experienceYears: 0, seniorityLevel: 'mid' };
    }

    return res.status(200).json({ success: true, data: skillGraph });
  } catch (err) {
    console.error('[skillsController] Error:', err.message);
    return res.status(500).json({ error: 'Failed to analyze skills', details: err.message });
  }
}

module.exports = { analyzeSkills };
