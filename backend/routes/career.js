/**
 * Career Routes
 * POST /predict-career  - Predict career paths based on skills
 * GET  /career-paths    - List all available career paths
 */
const express = require('express');
const router = express.Router();
const { predictCareer, getCareerPaths } = require('../controllers/careerController');

router.post('/predict-career', predictCareer);
router.get('/career-paths', getCareerPaths);

module.exports = router;
