/**
 * MetaRole AI — Jobs Routes
 * Job matching and intelligent job suggestions
 */
const express = require('express');
const router = express.Router();
const jobsController = require('../controllers/jobsController');

/**
 * POST /api/job-match
 * Body: { skills: string[], targetRoles: string[], location?: string, remote?: boolean }
 */
router.post('/job-match', jobsController.matchJobs);

/**
 * GET /api/jobs/trending
 * Returns trending job roles based on skill demand data
 */
router.get('/jobs/trending', jobsController.getTrendingJobs);

/**
 * POST /api/jobs/apply-insights
 * Body: { jobId, resumeData, coverLetter? }
 * Returns AI insights and application tips for a specific job
 */
router.post('/jobs/apply-insights', jobsController.getApplyInsights);

module.exports = router;
