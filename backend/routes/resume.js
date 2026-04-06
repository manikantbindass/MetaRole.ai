/**
 * Resume Routes
 * POST /upload-resume   - Upload & parse resume
 * POST /generate-resume  - AI-generate tailored resume
 */
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadResume } = require('../controllers/resumeController');
const { generateResume } = require('../controllers/generateController');

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowed = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error('Only PDF, DOCX, and TXT files are allowed'));
  }
});

router.post('/upload-resume', upload.single('resume'), uploadResume);
router.post('/generate-resume', generateResume);

module.exports = router;
