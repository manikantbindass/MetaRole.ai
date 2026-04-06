/**
 * MetaRole AI — Skills Controller
 * Skill analysis, gap detection, career path prediction
 */
const aiService = require('../services/aiService');
const { successResponse, errorResponse } = require('../utils/response');

/**
 * POST /api/analyze-skills
 * Returns skill graph nodes, proficiency levels, and category breakdown
 */
exports.analyzeSkills = async (req, res) => {
  try {
    const { skills, experience = [], projects = [] } = req.body;

    if (!skills || !Array.isArray(skills) || skills.length === 0) {
      return res.status(400).json(errorResponse('skills array is required'));
    }

    const analysis = await aiService.analyzeSkills({ skills, experience, projects });

    return res.status(200).json(
      successResponse('Skills analyzed', { analysis })
    );
  } catch (err) {
    console.error('[analyzeSkills]', err);
    return res.status(500).json(errorResponse(err.message));
  }
};

/**
 * POST /api/predict-career
 * Returns predicted career paths with confidence scores and roadmap steps
 */
exports.predictCareer = async (req, res) => {
  try {
    const { skills, experience = [], targetRole } = req.body;

    if (!skills || skills.length === 0) {
      return res.status(400).json(errorResponse('skills array is required'));
    }

    const prediction = await aiService.predictCareer({ skills, experience, targetRole });

    return res.status(200).json(
      successResponse('Career paths predicted', { prediction })
    );
  } catch (err) {
    console.error('[predictCareer]', err);
    return res.status(500).json(errorResponse(err.message));
  }
};

/**
 * POST /api/skill-gap
 * Returns missing skills, priority order, and learning resources
 */
exports.getSkillGap = async (req, res) => {
  try {
    const { currentSkills, targetRole } = req.body;

    if (!currentSkills || !targetRole) {
      return res.status(400).json(errorResponse('currentSkills and targetRole are required'));
    }

    const gapAnalysis = await aiService.getSkillGap({ currentSkills, targetRole });

    return res.status(200).json(
      successResponse('Skill gap analyzed', { gapAnalysis })
    );
  } catch (err) {
    console.error('[getSkillGap]', err);
    return res.status(500).json(errorResponse(err.message));
  }
};
