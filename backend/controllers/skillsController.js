/**
 * Skills Controller — skill graph generation and gap analysis
 */
const { validationResult } = require('express-validator');
const { analyzeSkillsWithAI } = require('../services/skillsService');
const { fetchGitHubSkills } = require('../services/githubService');
const { logger } = require('../utils/logger');

/**
 * POST /api/analyze-skills
 * Returns skill graph, proficiency levels, and gap analysis
 */
async function analyzeSkills(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { resumeText, githubUsername } = req.body;

    // Optionally enrich skills from GitHub activity
    let githubSkills = [];
    if (githubUsername) {
      try {
        githubSkills = await fetchGitHubSkills(githubUsername);
      } catch (ghErr) {
        logger.warn(`GitHub fetch failed for ${githubUsername}: ${ghErr.message}`);
      }
    }

    const result = await analyzeSkillsWithAI(resumeText, githubSkills);

    return res.status(200).json({ success: true, data: result });
  } catch (err) {
    logger.error(`analyzeSkills error: ${err.message}`);
    return res.status(500).json({ error: 'ANALYSIS_ERROR', message: err.message });
  }
}

module.exports = { analyzeSkills };
