/**
 * File Parser Utility
 * Extracts plain text from PDF, DOCX, and TXT buffers
 */
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

/**
 * Extract text from a file buffer based on MIME type
 * @param {Buffer} buffer - File buffer
 * @param {string} mimetype - MIME type of the file
 * @returns {Promise<string>} - Extracted plain text
 */
async function extractTextFromBuffer(buffer, mimetype) {
  if (mimetype === 'application/pdf') {
    const data = await pdfParse(buffer);
    return data.text;
  }

  if (mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  }

  if (mimetype === 'text/plain') {
    return buffer.toString('utf-8');
  }

  throw new Error(`Unsupported file type: ${mimetype}`);
}

module.exports = { extractTextFromBuffer };
