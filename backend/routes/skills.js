/**
 * Skills Routes
 * POST /analyze-skills   - Analyze skills from parsed resume
 * POST /skill-gap        - Identify skill gaps for a target role
 */
const express = require('express');
const router = express.Router();
const { analyzeSkills } = require('../controllers/skillsController');
const { skillGap } = require('../controllers/skillGapController');

router.post('/analyze-skills', analyzeSkills);
router.post('/skill-gap', skillGap);

module.exports = router;
