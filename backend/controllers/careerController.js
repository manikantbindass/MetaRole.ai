/**
 * Career Prediction Controller
 * Predicts most suitable career paths based on user skill profile
 */
const { callOpenAI } = require('../services/openaiService');

const CAREER_PATHS = [
  'Full Stack Engineer', 'Backend Engineer', 'Frontend Engineer',
  'DevOps Engineer', 'Cloud Architect', 'AI/ML Engineer',
  'Data Scientist', 'Data Engineer', 'Mobile Developer',
  'Blockchain Developer', 'Security Engineer', 'Platform Engineer',
  'Product Manager', 'Solutions Architect', 'Site Reliability Engineer'
];

/**
 * GET /career-paths
 */
async function getCareerPaths(req, res) {
  return res.status(200).json({ success: true, data: CAREER_PATHS });
}

/**
 * POST /predict-career
 * Body: { skillGraph: Object, experience?: string, preferences?: string }
 */
async function predictCareer(req, res) {
  try {
    const { skillGraph, experience, preferences } = req.body;

    if (!skillGraph) {
      return res.status(400).json({ error: 'skillGraph is required' });
    }

    const prompt = `
Based on this skill profile, predict the most suitable career paths with probability scores.

SKILL PROFILE:
${JSON.stringify(skillGraph, null, 2)}

EXPERIENCE: ${experience || 'Not specified'}
PREFERENCES: ${preferences || 'Not specified'}

Return JSON:
{
  "predictions": [
    {
      "role": string,
      "probability": number (0-100),
      "salaryRange": { "min": number, "max": number, "currency": "USD" },
      "demandLevel": "very-high|high|medium|low",
      "matchedSkills": [string],
      "growthPotential": string,
      "timelineToReady": string
    }
  ],
  "primaryRecommendation": string,
  "careerTrajectory": string,
  "industryFit": [string]
}

Return top 5 predictions sorted by probability. Only valid JSON.
`;

    const rawResponse = await callOpenAI(prompt, { max_tokens: 2000 });
    let predictions;
    try {
      const jsonMatch = rawResponse.match(/\{[\s\S]*\}/);
      predictions = JSON.parse(jsonMatch ? jsonMatch[0] : rawResponse);
    } catch {
      predictions = { predictions: [], primaryRecommendation: '', careerTrajectory: '', industryFit: [] };
    }

    return res.status(200).json({ success: true, data: predictions });
  } catch (err) {
    console.error('[careerController] Error:', err.message);
    return res.status(500).json({ error: 'Career prediction failed', details: err.message });
  }
}

module.exports = { predictCareer, getCareerPaths };
