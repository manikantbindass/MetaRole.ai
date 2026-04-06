/**
 * Jobs Controller — AI-powered job matching
 */
const { validationResult } = require('express-validator');
const { matchJobs } = require('../services/jobMatchService');
const { logger } = require('../utils/logger');

/**
 * POST /api/job-match
 * Returns ranked job matches with compatibility score
 */
async function jobMatch(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { skills, experience, preferredRoles, location } = req.body;
    const matches = await matchJobs(skills, experience, preferredRoles, location);

    return res.status(200).json({ success: true, data: matches });
  } catch (err) {
    logger.error(`jobMatch error: ${err.message}`);
    return res.status(500).json({ error: 'MATCH_ERROR', message: err.message });
  }
}

module.exports = { jobMatch };
