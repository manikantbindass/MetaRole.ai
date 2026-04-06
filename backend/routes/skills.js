import { Router } from 'express';
import { analyzeSkills } from '../controllers/skillController.js';

const router = Router();

router.get('/analyze-skills', analyzeSkills);

export default router;
