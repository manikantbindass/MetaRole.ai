/**
 * MetaRole AI — Resume Service
 * Handles file reading and text extraction from PDF/DOCX/TXT
 */
const pdfParse = require('pdf-parse');

/**
 * extractText — Extract raw text from uploaded file buffer
 * @param {Express.Multer.File} file
 * @returns {Promise<string>}
 */
exports.extractText = async (file) => {
  const ext = file.originalname.split('.').pop().toLowerCase();

  switch (ext) {
    case 'pdf': {
      const data = await pdfParse(file.buffer);
      return data.text;
    }
    case 'txt': {
      return file.buffer.toString('utf-8');
    }
    case 'docx':
    case 'doc': {
      // For DOCX, extract raw text from XML parts
      // In production, use mammoth: const { value } = await mammoth.extractRawText({ buffer: file.buffer });
      // Stub for now:
      return file.buffer.toString('utf-8').replace(/<[^>]*>/g, ' ').trim();
    }
    default:
      throw new Error(`Unsupported file type: .${ext}`);
  }
};
