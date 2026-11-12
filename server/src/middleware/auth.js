const jwt = require('jsonwebtoken');
const env = require('../config/env');
const { failure } = require('../utils/apiResponse');

/**
 * Protect admin routes. Reads the JWT from an HTTP-only cookie.
 * Returns a generic 401 on any failure (no sensitive detail leaked).
 */
function requireAuth(req, res, next) {
  const token = req.cookies && req.cookies['amit_token'];

  if (!token) {
    return failure(res, 'Unauthorized', 401, 'AUTH_REQUIRED');
  }

  try {
    const payload = jwt.verify(token, env.jwtSecret);
    req.user = { username: payload.sub, role: 'admin' };
    return next();
  } catch {
    return failure(res, 'Session expired or invalid', 401, 'AUTH_INVALID');
  }
}

module.exports = { requireAuth };
