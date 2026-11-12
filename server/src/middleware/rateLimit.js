const rateLimit = require('express-rate-limit');
const env = require('../config/env');

/** Strict limiter for the login endpoint to blunt brute-force attempts. */
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: env.isProd ? 10 : 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many login attempts. Please try again later.' },
});

/** General limiter for the public contact form. */
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: env.isProd ? 30 : 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many submissions. Please try again later.' },
});

module.exports = { loginLimiter, contactLimiter };
