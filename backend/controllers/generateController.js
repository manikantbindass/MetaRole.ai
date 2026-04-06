/**
 * AI Resume Generator Controller
 * Generates a tailored resume for a specific job description
 */
const { callOpenAI } = require('../services/openaiService');

/**
 * POST /generate-resume
 * Body: { profile: Object, jobDescription: string, targetRole: string }
 */
async function generateResume(req, res) {
  try {
    const { profile, jobDescription, targetRole } = req.body;

    if (!profile || !targetRole) {
      return res.status(400).json({ error: 'profile and targetRole are required' });
    }

    const prompt = `
You are an expert resume writer. Given the candidate profile and target job, generate a polished, ATS-optimized resume in Markdown format.

CANDIDATE PROFILE:
${JSON.stringify(profile, null, 2)}

TARGET ROLE: ${targetRole}

JOB DESCRIPTION:
${jobDescription || 'Not provided'}

Generate a complete, professional resume. Include: Summary, Skills, Experience, Projects, Education, Certifications.
Tailor every bullet point to the job description. Use strong action verbs. Be specific and quantify achievements.
Format: Markdown with clear sections.
`;

    const resume = await callOpenAI(prompt, { max_tokens: 2000 });

    return res.status(200).json({
      success: true,
      data: { resume, targetRole }
    });
  } catch (err) {
    console.error('[generateController] Error:', err.message);
    return res.status(500).json({ error: 'Failed to generate resume', details: err.message });
  }
}

module.exports = { generateResume };
