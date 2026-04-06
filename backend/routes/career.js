import { Router } from 'express';
import {
  predictCareer,
  generateResume,
  generatePortfolio,
} from '../controllers/careerController.js';

const router = Router();

router.get('/predict-career', predictCareer);
router.post('/generate-resume', generateResume);
router.post('/generate-portfolio', generatePortfolio);

export default router;
