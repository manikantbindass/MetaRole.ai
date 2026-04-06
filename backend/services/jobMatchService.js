/**
 * Job Match Service — AI-powered job recommendation engine
 */
const OpenAI = require('openai');
const { logger } = require('../utils/logger');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * Match jobs to user profile using AI scoring
 */
async function matchJobs(skills, experience, preferredRoles = [], location = 'Remote') {
  const prompt = `You are a job matching AI. Recommend the best job opportunities for this developer profile.

Skills: ${skills.join(', ')}
Experience: ${experience} years
Preferred roles: ${preferredRoles.join(', ') || 'Any'}
Location preference: ${location}

Return JSON:
{
  "matches": [
    {
      "title": string,
      "company": string,
      "location": string,
      "type": "full-time"|"contract"|"remote",
      "salary": string,
      "matchScore": number (0-100),
      "requiredSkills": string[],
      "matchedSkills": string[],
      "missingSkills": string[],
      "applyUrl": string,
      "description": string,
      "postedDate": string,
      "applicationTips": string[]
    }
  ],
  "totalMatches": number,
  "averageMatchScore": number,
  "topIndustries": string[]
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
    logger.error(`matchJobs error: ${err.message}`);
    throw new Error('Job matching failed');
  }
}

module.exports = { matchJobs };
