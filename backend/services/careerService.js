/**
 * Career Service — predict career paths with AI probability scoring
 */
const OpenAI = require('openai');
const { logger } = require('../utils/logger');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * Predict career paths based on current skills and experience
 * Returns ranked roles with probability, salary range, and roadmap
 */
async function predictCareerPaths(skills, experience, currentRole) {
  const prompt = `You are a career advisor AI. Based on the following developer profile, predict the best career paths.

Current skills: ${skills.join(', ')}
Years of experience: ${experience}
Current role: ${currentRole || 'Not specified'}

Return JSON with this schema:
{
  "predictions": [
    {
      "role": string,
      "probability": number (0-100),
      "timelineMonths": number,
      "salaryRange": { "min": number, "max": number, "currency": "USD" },
      "requiredSkills": string[],
      "missingSkills": string[],
      "roadmap": string[],
      "companies": string[],
      "demandLevel": "very-high"|"high"|"medium"|"low"
    }
  ],
  "recommendedPath": string,
  "marketInsights": string,
  "estimatedGrowth": string
}`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
      response_format: { type: 'json_object' },
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (err) {
    logger.error(`predictCareerPaths error: ${err.message}`);
    throw new Error('Career prediction failed');
  }
}

module.exports = { predictCareerPaths };
