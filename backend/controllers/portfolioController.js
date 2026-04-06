/**
 * Portfolio Controller — generate portfolio website content
 */
const { validationResult } = require('express-validator');
const { generatePortfolioContent } = require('../services/portfolioService');
const { logger } = require('../utils/logger');

/**
 * POST /api/generate-portfolio
 * Returns portfolio sections, bio, project highlights
 */
async function generatePortfolio(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { userData, style } = req.body;
    const portfolio = await generatePortfolioContent(userData, style || 'terminal');

    return res.status(200).json({ success: true, data: portfolio });
  } catch (err) {
    logger.error(`generatePortfolio error: ${err.message}`);
    return res.status(500).json({ error: 'PORTFOLIO_ERROR', message: err.message });
  }
}

module.exports = { generatePortfolio };
