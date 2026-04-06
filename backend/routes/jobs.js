import { Router } from 'express';
import { jobMatch } from '../controllers/jobController.js';

const router = Router();

router.get('/job-match', jobMatch);

export default router;
