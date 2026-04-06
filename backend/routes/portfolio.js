/**
 * Portfolio Routes — generate portfolio website content
 */
const express = require('express');
const { body } = require('express-validator');
const { generatePortfolio } = require('../controllers/portfolioController');

const router = express.Router();

/**
 * POST /api/generate-portfolio
 * Body: { userData: object, style?: string }
 */
router.post('/generate-portfolio', [
  body('userData').notEmpty().withMessage('userData is required'),
], generatePortfolio);

module.exports = router;
