const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const env = require('../config/env');
const asyncHandler = require('../utils/asyncHandler');
const { success, failure } = require('../utils/apiResponse');

const COOKIE_NAME = 'amit_token';

function cookieOptions(maxAgeMs) {
  return {
    httpOnly: true,
    secure: env.isProd,
    sameSite: env.isProd ? 'none' : 'lax',
    maxAge: maxAgeMs,
    path: '/',
  };
}

// function cookieOptions(maxAgeMs) {
//   return {
//     httpOnly: true,
//     secure: env.isProd,          // Secure only over HTTPS in production
//     sameSite: 'lax',
//     maxAge: maxAgeMs,
//     path: '/',
//   };
// }

/**
 * POST /api/auth/login
 * Compares the submitted username against the env-configured admin,
 * verifies the password with bcrypt, and issues a JWT in an HTTP-only cookie.
 * No registration / public user creation exists anywhere in this app.
 */
const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body || {};

  // Generic error for any credential failure (no enumeration).
  const genericFail = () => failure(res, 'Invalid username or password', 401, 'BAD_CREDENTIALS');

  if (!env.adminUsername || !env.adminPasswordHash) {
    return failure(res, 'Admin credentials are not configured on the server', 500, 'NOT_CONFIGURED');
  }

  const userOk = typeof username === 'string' && username === env.adminUsername;
  const passOk = userOk && typeof password === 'string'
    ? await bcrypt.compare(password, env.adminPasswordHash)
    : false;

  if (!userOk || !passOk) {
    // Burn a bcrypt hash compare when user is invalid to equalize timing.
    if (!userOk) await bcrypt.compare(password || '', env.adminPasswordHash);
    return genericFail();
  }

  const token = jwt.sign({ sub: env.adminUsername, role: 'admin' }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn,
  });

  res.cookie(COOKIE_NAME, token, cookieOptions(msFromExpiry(env.jwtExpiresIn)));
  return success(res, { authenticated: true, username: env.adminUsername }, 'Logged in');
});

/** POST /api/auth/logout */
const logout = asyncHandler(async (req, res) => {
  // res.clearCookie(COOKIE_NAME, { path: '/' });
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    secure: env.isProd,
    sameSite: env.isProd ? 'none' : 'lax',
    path: '/',
  });
  return success(res, null, 'Logged out');
});



/** GET /api/auth/me — session check used by the protected-route guard. */
const me = asyncHandler(async (req, res) => {
  const token = req.cookies && req.cookies[COOKIE_NAME];
  if (!token) return success(res, { authenticated: false });
  try {
    const payload = jwt.verify(token, env.jwtSecret);
    return success(res, { authenticated: true, username: payload.sub });
  } catch {
    return success(res, { authenticated: false });
  }
});

function msFromExpiry(exp) {
  const match = /^(\d+)([smhd])$/.exec(String(exp).trim());
  if (!match) return 24 * 60 * 60 * 1000;
  const n = parseInt(match[1], 10);
  const unit = { s: 1000, m: 60000, h: 3600000, d: 86400000 }[match[2]];
  return n * unit;
}

module.exports = { login, logout, me, COOKIE_NAME };
