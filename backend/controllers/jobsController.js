/**
 * MetaRole AI — Jobs Controller
 * AI-powered job matching and application insights
 */
const aiService = require('../services/aiService');
const jobService = require('../services/jobService');
const { successResponse, errorResponse } = require('../utils/response');

/**
 * POST /api/job-match
 * Returns ranked job listings matched to user skills and target roles
 */
exports.matchJobs = async (req, res) => {
  try {
    const { skills, targetRoles = [], location, remote = false } = req.body;

    if (!skills || skills.length === 0) {
      return res.status(400).json(errorResponse('skills array is required'));
    }

    const matches = await jobService.matchJobs({ skills, targetRoles, location, remote });

    return res.status(200).json(
      successResponse('Jobs matched', { matches })
    );
  } catch (err) {
    console.error('[matchJobs]', err);
    return res.status(500).json(errorResponse(err.message));
  }
};

/**
 * GET /api/jobs/trending
 * Returns trending roles + skill demand data
 */
exports.getTrendingJobs = async (req, res) => {
  try {
    const trending = await jobService.getTrending();
    return res.status(200).json(successResponse('Trending jobs fetched', { trending }));
  } catch (err) {
    console.error('[getTrendingJobs]', err);
    return res.status(500).json(errorResponse(err.message));
  }
};

/**
 * POST /api/jobs/apply-insights
 * Returns AI-generated application tips and cover letter draft
 */
exports.getApplyInsights = async (req, res) => {
  try {
    const { jobId, resumeData, coverLetter } = req.body;

    if (!jobId || !resumeData) {
      return res.status(400).json(errorResponse('jobId and resumeData are required'));
    }

    const insights = await aiService.generateApplyInsights({ jobId, resumeData, coverLetter });

    return res.status(200).json(successResponse('Application insights ready', { insights }));
  } catch (err) {
    console.error('[getApplyInsights]', err);
    return res.status(500).json(errorResponse(err.message));
  }
};
