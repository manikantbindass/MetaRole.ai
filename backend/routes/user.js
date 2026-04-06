/**
 * MetaRole AI — User Routes
 * Profile, progress tracking, saved jobs/careers
 */
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/**
 * GET /api/user/profile
 * Returns authenticated user profile + career progress
 */
router.get('/user/profile', userController.getProfile);

/**
 * PUT /api/user/profile
 * Body: { name, github, linkedin, targetRole }
 */
router.put('/user/profile', userController.updateProfile);

/**
 * GET /api/user/progress
 * Returns skill progress over time (chart data)
 */
router.get('/user/progress', userController.getProgress);

/**
 * POST /api/user/save-job
 * Body: { jobId, jobTitle, company }
 */
router.post('/user/save-job', userController.saveJob);

/**
 * GET /api/user/saved-jobs
 */
router.get('/user/saved-jobs', userController.getSavedJobs);

module.exports = router;
