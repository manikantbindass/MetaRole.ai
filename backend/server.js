/**
 * MetaRole AI — Express Backend Server
 * Production-ready with security, logging, rate-limiting
 */
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const { logger } = require('./utils/logger');

// Route imports
const resumeRoutes = require('./routes/resume');
const skillsRoutes = require('./routes/skills');
const careerRoutes = require('./routes/career');
const jobsRoutes = require('./routes/jobs');
const portfolioRoutes = require('./routes/portfolio');
const healthRoutes = require('./routes/health');

const app = express();
const PORT = process.env.PORT || 8000;

// ─── Security & Middleware ───────────────────────────────────────────────────
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(compression());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// HTTP request logger
app.use(morgan('combined', { stream: { write: (msg) => logger.info(msg.trim()) } }));

// ─── Rate Limiting ───────────────────────────────────────────────────────────
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please try again later.' },
});

const aiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10,
  message: { error: 'AI endpoint rate limit exceeded.' },
});

app.use('/api/', globalLimiter);
app.use('/api/analyze-skills', aiLimiter);
app.use('/api/predict-career', aiLimiter);
app.use('/api/generate-resume', aiLimiter);
app.use('/api/generate-portfolio', aiLimiter);

// ─── Routes ──────────────────────────────────────────────────────────────────
app.use('/api', healthRoutes);
app.use('/api', resumeRoutes);
app.use('/api', skillsRoutes);
app.use('/api', careerRoutes);
app.use('/api', jobsRoutes);
app.use('/api', portfolioRoutes);

// ─── 404 Handler ─────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    error: 'NOT_FOUND',
    message: `Route ${req.originalUrl} not found`,
    timestamp: new Date().toISOString(),
  });
});

// ─── Global Error Handler ────────────────────────────────────────────────────
app.use((err, req, res, _next) => {
  logger.error(`Unhandled error: ${err.message}`, { stack: err.stack });
  res.status(err.status || 500).json({
    error: err.code || 'INTERNAL_SERVER_ERROR',
    message: process.env.NODE_ENV === 'production' ? 'An unexpected error occurred' : err.message,
    timestamp: new Date().toISOString(),
  });
});

// ─── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  logger.info(`⚡ MetaRole AI Backend running on port ${PORT}`);
  logger.info(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
