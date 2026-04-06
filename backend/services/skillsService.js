/**
 * Skills Service — skill graph + gap analysis using OpenAI
 */
const OpenAI = require('openai');
const { logger } = require('../utils/logger');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * Analyze skills from resume text + GitHub activity
 * Returns categorized skills, proficiency scores, and gap analysis
 */
async function analyzeSkillsWithAI(resumeText, githubSkills = []) {
  const prompt = `Analyze the following resume text and GitHub skills. Return a comprehensive skill analysis as JSON.

Resume text:
${resumeText.substring(0, 6000)}

GitHub detected skills: ${githubSkills.join(', ')}

Return JSON with this schema:
{
  "skillGraph": [
    { "name": string, "category": "frontend"|"backend"|"devops"|"ai-ml"|"database"|"mobile"|"other",
      "proficiency": number (0-100), "yearsOfExperience": number, "trending": boolean }
  ],
  "topSkills": string[],
  "skillsByCategory": { [category]: string[] },
  "gapAnalysis": {
    "currentLevel": "junior"|"mid"|"senior"|"lead",
    "missingSkills": [{ "skill": string, "importance": "critical"|"high"|"medium", "learningTime": string }],
    "recommendedLearningPath": string[]
  },
  "overallScore": number (0-100)
}`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.2,
      response_format: { type: 'json_object' },
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (err) {
    logger.error(`analyzeSkillsWithAI error: ${err.message}`);
    throw new Error('Skill analysis failed');
  }
}

module.exports = { analyzeSkillsWithAI };
