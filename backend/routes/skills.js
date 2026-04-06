/**
 * Skills Routes — analyze skills extracted from resume
 */
const express = require('express');
const { body } = require('express-validator');
const { analyzeSkills } = require('../controllers/skillsController');

const router = express.Router();

/**
 * POST /api/analyze-skills
 * Body: { resumeText: string, githubUsername?: string }
 */
router.post('/analyze-skills', [
  body('resumeText').notEmpty().withMessage('resumeText is required'),
  body('githubUsername').optional().isString(),
], analyzeSkills);

module.exports = router;
