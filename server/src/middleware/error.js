const { failure } = require('../utils/apiResponse');
const env = require('../config/env');

/** 404 handler for unmatched routes. */
function notFound(req, res) {
  failure(res, `Route not found: ${req.method} ${req.originalUrl}`, 404, 'NOT_FOUND');
}

/** Central error handler. Never leaks stack traces or secrets in production. */
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  // Mongoose validation errors -> 422
  if (err.name === 'ValidationError') {
    const fields = {};
    for (const k of Object.keys(err.errors || {})) fields[k] = err.errors[k].message;
    return failure(res, 'Validation failed', 422, 'VALIDATION');
  }

  // Duplicate key -> 409
  if (err.code === 11000) {
    return failure(res, 'A record with that unique value already exists', 409, 'DUPLICATE');
  }

  // Malformed ObjectId -> 400
  if (err.name === 'CastError') {
    return failure(res, 'Invalid identifier', 400, 'BAD_ID');
  }

  const status = err.status || 500;
  if (!env.isProd && err.stack) console.error(err.stack);
  return failure(res, err.message || 'Something went wrong', status, err.code);
}

module.exports = { notFound, errorHandler };
