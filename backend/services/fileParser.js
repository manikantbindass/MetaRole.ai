/**
 * File Parser Service — extract text from PDF, DOCX, TXT
 */
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const { logger } = require('../utils/logger');

/**
 * Extract plain text from uploaded file buffer
 * @param {Buffer} buffer — file buffer from multer
 * @param {string} mimeType — file MIME type
 * @returns {string} extracted text
 */
async function extractTextFromBuffer(buffer, mimeType) {
  logger.info(`Extracting text from ${mimeType}`);

  if (mimeType === 'application/pdf') {
    const data = await pdfParse(buffer);
    return data.text;
  }

  if (mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      mimeType === 'application/msword') {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  }

  if (mimeType === 'text/plain') {
    return buffer.toString('utf-8');
  }

  throw new Error(`Unsupported file type: ${mimeType}`);
}

module.exports = { extractTextFromBuffer };
