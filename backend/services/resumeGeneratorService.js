/**
 * Resume Generator Service — create tailored resumes with AI
 */
const OpenAI = require('openai');
const { logger } = require('../utils/logger');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * Generate a tailored resume optimized for a specific role/job description
 */
async function generateTailoredResume(userData, targetRole, jobDescription) {
  const prompt = `You are an expert resume writer. Create a production-quality ATS-optimized resume.

User data: ${JSON.stringify(userData)}
Target role: ${targetRole}
Job description: ${jobDescription || 'Not provided — use general best practices for the role'}

Return JSON:
{
  "markdown": string (full resume in markdown format),
  "sections": {
    "summary": string,
    "skills": string[],
    "experience": [{ "company": string, "role": string, "duration": string, "bullets": string[] }],
    "education": [{ "institution": string, "degree": string, "year": string }],
    "projects": [{ "name": string, "description": string, "technologies": string[] }]
  },
  "keywords": string[],
  "atsScore": number (0-100),
  "improvements": string[]
}`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.4,
      response_format: { type: 'json_object' },
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (err) {
    logger.error(`generateTailoredResume error: ${err.message}`);
    throw new Error('Resume generation failed');
  }
}

module.exports = { generateTailoredResume };
