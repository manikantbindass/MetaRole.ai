/**
 * MetaRole AI — AI Service
 * Wraps OpenAI API calls for all AI features
 * Uses GPT-4o for parsing/generation, text-embedding-3-small for vector search
 */
const OpenAI = require('openai');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * parseResume — Extract structured data from raw resume text
 * @param {string} rawText
 * @returns {object} { name, email, phone, skills, experience, education, projects, summary }
 */
exports.parseResume = async (rawText) => {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    response_format: { type: 'json_object' },
    messages: [
      {
        role: 'system',
        content: `You are an expert resume parser. Extract structured data from the resume text.
        Return valid JSON with fields: name, email, phone, summary, skills (array), 
        experience (array of {company, role, duration, description}), 
        education (array of {institution, degree, year}), 
        projects (array of {name, tech, description}), 
        certifications (array), github, linkedin.`,
      },
      { role: 'user', content: rawText },
    ],
    temperature: 0.1,
  });

  return JSON.parse(completion.choices[0].message.content);
};

/**
 * analyzeSkills — Build skill graph with proficiency and categories
 */
exports.analyzeSkills = async ({ skills, experience, projects }) => {
  const prompt = `Given these skills: ${skills.join(', ')}, experience: ${JSON.stringify(experience)}, projects: ${JSON.stringify(projects)}, 
  analyze and return JSON with: 
  skillGraph (nodes with id, label, category, proficiency 0-100, color), 
  categories (array of category totals), 
  topSkills (top 5 with score), 
  weakAreas (skills to improve).`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: 'You are a skills analysis expert. Return structured JSON.' },
      { role: 'user', content: prompt },
    ],
    temperature: 0.2,
  });

  return JSON.parse(completion.choices[0].message.content);
};

/**
 * predictCareer — Predict career paths with probability scores
 */
exports.predictCareer = async ({ skills, experience, targetRole }) => {
  const prompt = `Skills: ${skills.join(', ')}. Experience: ${JSON.stringify(experience)}. Target: ${targetRole || 'any'}.
  Predict top 3 career paths. Return JSON: 
  paths (array of {role, probability, timelineMonths, requiredSkills, description, salaryRange, demandLevel}), 
  primaryPath, roadmap (array of milestones with steps and duration).`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: 'You are a career prediction AI. Return structured JSON.' },
      { role: 'user', content: prompt },
    ],
    temperature: 0.3,
  });

  return JSON.parse(completion.choices[0].message.content);
};

/**
 * getSkillGap — Compare current skills with role requirements
 */
exports.getSkillGap = async ({ currentSkills, targetRole }) => {
  const prompt = `Current skills: ${currentSkills.join(', ')}. Target role: ${targetRole}.
  Return JSON: missingSkills (array of {skill, priority, learningTime, resources}), 
  matchScore (0-100), recommendation, quickWins (array).`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: 'You are a skill gap analysis expert.' },
      { role: 'user', content: prompt },
    ],
    temperature: 0.2,
  });

  return JSON.parse(completion.choices[0].message.content);
};

/**
 * generateResume — Generate ATS-optimized resume JSON/Markdown
 */
exports.generateResume = async ({ parsedData, targetJobTitle, jobDescription }) => {
  const prompt = `Rewrite this resume for the role "${targetJobTitle}".
Job Description: ${jobDescription}
Original Data: ${JSON.stringify(parsedData)}

Return JSON: {markdown (full resume in markdown), atsScore (0-100), improvements (array of changes made), keywords (array used)}`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: 'You are an expert resume writer specializing in ATS optimization.' },
      { role: 'user', content: prompt },
    ],
    temperature: 0.4,
  });

  return JSON.parse(completion.choices[0].message.content);
};

/**
 * generatePortfolio — Generate portfolio website config
 */
exports.generatePortfolio = async ({ parsedData, theme }) => {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    response_format: { type: 'json_object' },
    messages: [
      {
        role: 'system',
        content: 'Generate a portfolio website configuration. Return JSON with sections, hero, projects, about, contact, colors, seoMeta.',
      },
      {
        role: 'user',
        content: `Create portfolio config for: ${JSON.stringify(parsedData)}. Theme: ${theme}.`,
      },
    ],
    temperature: 0.5,
  });

  return JSON.parse(completion.choices[0].message.content);
};

/**
 * generateApplyInsights — Cover letter + application tips for a specific job
 */
exports.generateApplyInsights = async ({ jobId, resumeData, coverLetter }) => {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    response_format: { type: 'json_object' },
    messages: [
      {
        role: 'system',
        content: 'Generate application insights. Return JSON with coverLetterDraft, tips, matchScore, keywordsToHighlight.',
      },
      {
        role: 'user',
        content: `Job ID: ${jobId}. Resume: ${JSON.stringify(resumeData)}. Existing cover letter: ${coverLetter || 'none'}.`,
      },
    ],
    temperature: 0.5,
  });

  return JSON.parse(completion.choices[0].message.content);
};
