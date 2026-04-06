/**
 * Resume Upload Controller
 * Handles file upload, calls Python AI engine for parsing
 */
const { callAIEngine } = require('../services/aiEngineService');
const { extractTextFromBuffer } = require('../utils/fileParser');

/**
 * POST /upload-resume
 * Accepts multipart/form-data with field 'resume'
 */
async function uploadResume(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Extract raw text from PDF/DOCX/TXT buffer
    const rawText = await extractTextFromBuffer(req.file.buffer, req.file.mimetype);

    // Call Python AI engine resume parser
    const parsed = await callAIEngine('parse_resume', { text: rawText });

    return res.status(200).json({
      success: true,
      data: {
        name: parsed.name || '',
        email: parsed.email || '',
        phone: parsed.phone || '',
        summary: parsed.summary || '',
        skills: parsed.skills || [],
        experience: parsed.experience || [],
        education: parsed.education || [],
        projects: parsed.projects || [],
        certifications: parsed.certifications || [],
        rawText
      }
    });
  } catch (err) {
    console.error('[resumeController] Error:', err.message);
    return res.status(500).json({ error: 'Failed to parse resume', details: err.message });
  }
}

module.exports = { uploadResume };
