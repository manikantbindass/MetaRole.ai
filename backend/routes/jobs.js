/**
 * Jobs Routes — job matching based on skills
 */
const express = require('express');
const { body } = require('express-validator');
const { jobMatch } = require('../controllers/jobsController');

const router = express.Router();

/**
 * POST /api/job-match
 * Body: { skills: string[], experience: number, preferredRoles?: string[], location?: string }
 */
router.post('/job-match', [
  body('skills').isArray({ min: 1 }).withMessage('skills must be a non-empty array'),
  body('experience').isNumeric(),
], jobMatch);

module.exports = router;
