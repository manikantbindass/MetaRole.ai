/**
 * MetaRole AI — User Controller
 * Profile management and career progress tracking
 */
const { successResponse, errorResponse } = require('../utils/response');

// In production, replace these stubs with real DB queries via Prisma/pg

exports.getProfile = async (req, res) => {
  try {
    // TODO: fetch from PostgreSQL using req.user.id (from Clerk JWT middleware)
    const mockProfile = {
      id: 'demo-user-001',
      name: 'Demo User',
      email: 'demo@metarole.ai',
      github: 'https://github.com/demo',
      linkedin: 'https://linkedin.com/in/demo',
      targetRole: 'Full Stack Engineer',
      skills: ['JavaScript', 'React', 'Node.js', 'Python', 'PostgreSQL'],
      careerScore: 78,
      completedMilestones: 5,
    };
    return res.status(200).json(successResponse('Profile fetched', { profile: mockProfile }));
  } catch (err) {
    return res.status(500).json(errorResponse(err.message));
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, github, linkedin, targetRole } = req.body;
    // TODO: UPDATE users SET ... WHERE id = req.user.id
    return res.status(200).json(successResponse('Profile updated', { name, github, linkedin, targetRole }));
  } catch (err) {
    return res.status(500).json(errorResponse(err.message));
  }
};

exports.getProgress = async (req, res) => {
  try {
    // TODO: fetch skill_progress table grouped by week
    const mockProgress = [
      { week: 'Week 1', score: 45, skills: 8 },
      { week: 'Week 2', score: 52, skills: 11 },
      { week: 'Week 3', score: 61, skills: 14 },
      { week: 'Week 4', score: 70, skills: 17 },
      { week: 'Week 5', score: 78, skills: 22 },
    ];
    return res.status(200).json(successResponse('Progress fetched', { progress: mockProgress }));
  } catch (err) {
    return res.status(500).json(errorResponse(err.message));
  }
};

exports.saveJob = async (req, res) => {
  try {
    const { jobId, jobTitle, company } = req.body;
    // TODO: INSERT INTO saved_jobs ...
    return res.status(201).json(successResponse('Job saved', { jobId, jobTitle, company }));
  } catch (err) {
    return res.status(500).json(errorResponse(err.message));
  }
};

exports.getSavedJobs = async (req, res) => {
  try {
    // TODO: SELECT * FROM saved_jobs WHERE user_id = req.user.id
    return res.status(200).json(successResponse('Saved jobs fetched', { jobs: [] }));
  } catch (err) {
    return res.status(500).json(errorResponse(err.message));
  }
};
