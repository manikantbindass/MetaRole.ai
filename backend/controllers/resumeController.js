/**
 * Resume Controller — handle file upload and text extraction
 */
const { extractTextFromBuffer } = require('../services/fileParser');
const { parseResumeWithAI } = require('../services/aiService');
const { logger } = require('../utils/logger');

/**
 * POST /api/upload-resume
 * Extracts text from uploaded resume and parses structured data via AI
 */
async function uploadResume(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'NO_FILE', message: 'No file uploaded' });
    }

    logger.info(`Processing resume: ${req.file.originalname} (${req.file.mimetype})`);

    // Step 1: Extract raw text from file buffer
    const rawText = await extractTextFromBuffer(req.file.buffer, req.file.mimetype);

    if (!rawText || rawText.trim().length < 50) {
      return res.status(422).json({ error: 'PARSE_FAILED', message: 'Could not extract meaningful text from file' });
    }

    // Step 2: Parse structured data with OpenAI
    const parsedData = await parseResumeWithAI(rawText);

    return res.status(200).json({
      success: true,
      data: {
        rawText,
        parsed: parsedData,
        filename: req.file.originalname,
        processedAt: new Date().toISOString(),
      },
    });
  } catch (err) {
    logger.error(`uploadResume error: ${err.message}`);
    return res.status(500).json({ error: 'UPLOAD_ERROR', message: err.message });
  }
}

module.exports = { uploadResume };
