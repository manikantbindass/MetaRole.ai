/**
 * MetaRole AI — Resume Controller
 * Orchestrates resume upload, AI parsing, generation, and portfolio creation
 */
const resumeService = require('../services/resumeService');
const aiService = require('../services/aiService');
const { successResponse, errorResponse } = require('../utils/response');

/**
 * POST /api/upload-resume
 * Parses an uploaded resume file using AI and returns structured data
 */
exports.uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json(errorResponse('No file uploaded'));
    }

    // Extract text from uploaded file buffer
    const rawText = await resumeService.extractText(req.file);

    // Send to AI engine for structured parsing
    const parsedData = await aiService.parseResume(rawText);

    return res.status(200).json(
      successResponse('Resume parsed successfully', { parsedData })
    );
  } catch (err) {
    console.error('[uploadResume]', err);
    return res.status(500).json(errorResponse(err.message));
  }
};

/**
 * POST /api/generate-resume
 * Generates an ATS-optimized resume tailored to a specific job
 */
exports.generateResume = async (req, res) => {
  try {
    const { parsedData, targetJobTitle, jobDescription } = req.body;

    if (!parsedData || !targetJobTitle) {
      return res.status(400).json(errorResponse('parsedData and targetJobTitle are required'));
    }

    const generatedResume = await aiService.generateResume({
      parsedData,
      targetJobTitle,
      jobDescription: jobDescription || '',
    });

    return res.status(200).json(
      successResponse('Resume generated successfully', { resume: generatedResume })
    );
  } catch (err) {
    console.error('[generateResume]', err);
    return res.status(500).json(errorResponse(err.message));
  }
};

/**
 * POST /api/generate-portfolio
 * Generates a portfolio website config/HTML based on parsed resume data
 */
exports.generatePortfolio = async (req, res) => {
  try {
    const { parsedData, theme = 'terminal' } = req.body;

    if (!parsedData) {
      return res.status(400).json(errorResponse('parsedData is required'));
    }

    const portfolio = await aiService.generatePortfolio({ parsedData, theme });

    return res.status(200).json(
      successResponse('Portfolio generated successfully', { portfolio })
    );
  } catch (err) {
    console.error('[generatePortfolio]', err);
    return res.status(500).json(errorResponse(err.message));
  }
};
