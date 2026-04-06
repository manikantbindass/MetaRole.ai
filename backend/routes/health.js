/**
 * Health check route
 */
const express = require('express');
const router = express.Router();

router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'MetaRole AI Backend',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

module.exports = router;
