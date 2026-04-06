/**
 * Career Routes — predict career paths and generate resume
 */
const express = require('express');
const { body } = require('express-validator');
const { predictCareer } = require('../controllers/careerController');
const { generateResume } = require('../controllers/resumeGeneratorController');

const router = express.Router();

/**
 * POST /api/predict-career
 * Body: { skills: string[], experience: number, currentRole?: string }
 */
router.post('/predict-career', [
  body('skills').isArray({ min: 1 }).withMessage('skills must be a non-empty array'),
  body('experience').isNumeric().withMessage('experience must be a number'),
], predictCareer);

/**
 * POST /api/generate-resume
 * Body: { userData: object, targetRole: string, jobDescription?: string }
 */
router.post('/generate-resume', [
  body('userData').notEmpty().withMessage('userData is required'),
  body('targetRole').notEmpty().withMessage('targetRole is required'),
], generateResume);

module.exports = router;
