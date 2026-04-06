/**
 * Portfolio Service — generate portfolio content and structure
 */
const OpenAI = require('openai');
const { logger } = require('../utils/logger');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function generatePortfolioContent(userData, style = 'terminal') {
  const prompt = `You are a portfolio website content generator. Create compelling portfolio content.

User data: ${JSON.stringify(userData)}
Style: ${style}

Return JSON:
{
  "hero": { "tagline": string, "headline": string, "description": string },
  "about": string,
  "skills": [{ "name": string, "level": number }],
  "projects": [{ "title": string, "description": string, "tech": string[], "highlights": string[], "demoUrl": string, "githubUrl": string }],
  "experience": [{ "company": string, "role": string, "period": string, "highlights": string[] }],
  "contact": { "email": string, "github": string, "linkedin": string },
  "seoMeta": { "title": string, "description": string, "keywords": string[] }
}`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.5,
      response_format: { type: 'json_object' },
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (err) {
    logger.error(`generatePortfolioContent error: ${err.message}`);
    throw new Error('Portfolio generation failed');
  }
}

module.exports = { generatePortfolioContent };
