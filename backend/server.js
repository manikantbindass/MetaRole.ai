import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import resumeRoutes from './routes/resume.js';
import skillsRoutes from './routes/skills.js';
import careerRoutes from './routes/career.js';
import jobsRoutes from './routes/jobs.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '2mb' }));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'MetaRole AI backend' });
});

app.use('/api', resumeRoutes);
app.use('/api', skillsRoutes);
app.use('/api', careerRoutes);
app.use('/api', jobsRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`MetaRole backend running on :${port}`);
});
