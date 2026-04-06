/**
 * Resume Generator Controller — AI-tailored resume creation
 */
const { validationResult } = require('express-validator');
const { generateTailoredResume } = require('../services/resumeGeneratorService');
const { logger } = require('../utils/logger');

/**
 * POST /api/generate-resume
 * Returns a tailored resume (markdown + structured JSON)
 */
async function generateResume(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { userData, targetRole, jobDescription } = req.body;
    const resume = await generateTailoredResume(userData, targetRole, jobDescription);

    return res.status(200).json({ success: true, data: resume });
  } catch (err) {
    logger.error(`generateResume error: ${err.message}`);
    return res.status(500).json({ error: 'GENERATION_ERROR', message: err.message });
  }
}

module.exports = { generateResume };
