/**
 * Career Controller — predict career paths with probability scores
 */
const { validationResult } = require('express-validator');
const { predictCareerPaths } = require('../services/careerService');
const { logger } = require('../utils/logger');

/**
 * POST /api/predict-career
 * Returns ranked career paths with probability, timeline, and skill requirements
 */
async function predictCareer(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { skills, experience, currentRole } = req.body;
    const predictions = await predictCareerPaths(skills, experience, currentRole);

    return res.status(200).json({ success: true, data: predictions });
  } catch (err) {
    logger.error(`predictCareer error: ${err.message}`);
    return res.status(500).json({ error: 'PREDICTION_ERROR', message: err.message });
  }
}

module.exports = { predictCareer };
