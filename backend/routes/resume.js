/**
 * MetaRole AI — Resume Routes
 * Handles resume upload, parsing, and generation endpoints
 */
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const resumeController = require('../controllers/resumeController');

// Multer config — store in memory, max 5MB, PDF/DOCX only
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ['.pdf', '.docx', '.doc', '.txt'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) return cb(null, true);
    cb(new Error('Only PDF, DOCX, DOC, TXT files allowed'));
  },
});

/**
 * POST /api/upload-resume
 * Accepts multipart/form-data with "resume" file field
 */
router.post('/upload-resume', upload.single('resume'), resumeController.uploadResume);

/**
 * POST /api/generate-resume
 * Body: { parsedData, targetJobTitle, jobDescription }
 */
router.post('/generate-resume', resumeController.generateResume);

/**
 * POST /api/generate-portfolio
 * Body: { parsedData, theme }
 */
router.post('/generate-portfolio', resumeController.generatePortfolio);

module.exports = router;
