import { Router } from 'express';
import { uploadResume } from '../controllers/resumeController.js';

const router = Router();

router.post('/upload-resume', uploadResume);

export default router;
