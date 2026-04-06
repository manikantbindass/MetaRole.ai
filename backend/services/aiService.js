/**
 * AI Service — OpenAI-powered resume parsing
 * Extracts structured data: skills, experience, education, projects
 */
const OpenAI = require('openai');
const { logger } = require('../utils/logger');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * Parse resume text into structured JSON using GPT-4
 * @param {string} rawText — plain text extracted from resume file
 * @returns {object} structured resume data
 */
async function parseResumeWithAI(rawText) {
  const systemPrompt = `You are an expert resume parser. Extract structured data from the resume text.
Return ONLY valid JSON with this exact schema:
{
  "name": string,
  "email": string,
  "phone": string,
  "location": string,
  "summary": string,
  "skills": { "technical": string[], "soft": string[], "tools": string[] },
  "experience": [{ "company": string, "role": string, "duration": string, "description": string[], "technologies": string[] }],
  "education": [{ "institution": string, "degree": string, "field": string, "year": string, "gpa": string }],
  "projects": [{ "name": string, "description": string, "technologies": string[], "url": string }],
  "certifications": [{ "name": string, "issuer": string, "year": string }],
  "totalExperienceYears": number
}`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Parse this resume:\n\n${rawText.substring(0, 8000)}` },
      ],
      temperature: 0.1,
      response_format: { type: 'json_object' },
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (err) {
    logger.error(`parseResumeWithAI error: ${err.message}`);
    throw new Error('AI resume parsing failed');
  }
}

module.exports = { parseResumeWithAI };
