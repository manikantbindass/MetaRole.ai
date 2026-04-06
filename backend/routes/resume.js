/**
 * Resume Routes — upload & parse resume files
 */
const express = require('express');
const multer = require('multer');
const { uploadResume } = require('../controllers/resumeController');

const router = express.Router();

// Configure multer for in-memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowed = ['application/pdf', 'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF, DOC, DOCX, and TXT files are allowed'), false);
    }
  },
});

/**
 * POST /api/upload-resume
 * Accepts a resume file, extracts text, parses with AI
 */
router.post('/upload-resume', upload.single('resume'), uploadResume);

module.exports = router;
