/**
 * Job Matching Routes
 * POST /job-match          - Match jobs to user skill profile
 * POST /generate-portfolio - Generate portfolio website code
 */
const express = require('express');
const router = express.Router();
const { jobMatch } = require('../controllers/jobController');
const { generatePortfolio } = require('../controllers/portfolioController');

router.post('/job-match', jobMatch);
router.post('/generate-portfolio', generatePortfolio);

module.exports = router;
