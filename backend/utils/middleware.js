/**
 * MetaRole AI — Middleware
 * Rate limiting, request logging, auth stubs
 */
const rateLimit = require('express-rate-limit');

/**
 * API Rate Limiter — 100 requests per 15 minutes per IP
 */
exports.apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests, please try again later.' },
});

/**
 * Request Logger — logs method, path, and response time
 */
exports.requestLogger = (req, res, next) => {
  const start = Date.now();
  const { method, path } = req;

  res.on('finish', () => {
    const duration = Date.now() - start;
    const status = res.statusCode;
    const color = status >= 500 ? '\x1b[31m' : status >= 400 ? '\x1b[33m' : '\x1b[32m';
    console.log(`${color}[${method}] ${path} ${status} — ${duration}ms\x1b[0m`);
  });

  next();
};

/**
 * Auth Guard — verifies Clerk JWT token (stub)
 * In production, replace with Clerk's express middleware:
 * const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');
 */
exports.authGuard = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // For demo/dev: allow unauthenticated access
    // In production: return 401
    req.user = { id: 'demo-user-001', email: 'demo@metarole.ai' };
    return next();
  }

  // TODO: Verify JWT with Clerk SDK
  req.user = { id: 'demo-user-001', email: 'demo@metarole.ai' };
  next();
};
