/**
 * MetaRole AI — Skills Routes
 * Skill analysis, gap detection, career prediction
 */
const express = require('express');
const router = express.Router();
const skillsController = require('../controllers/skillsController');

/**
 * POST /api/analyze-skills
 * Body: { skills: string[], experience: object[], projects: object[] }
 */
router.post('/analyze-skills', skillsController.analyzeSkills);

/**
 * POST /api/predict-career
 * Body: { skills: string[], experience: object[], targetRole?: string }
 */
router.post('/predict-career', skillsController.predictCareer);

/**
 * POST /api/skill-gap
 * Body: { currentSkills: string[], targetRole: string }
 */
router.post('/skill-gap', skillsController.getSkillGap);

module.exports = router;
