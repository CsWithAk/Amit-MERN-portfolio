const cloudinary = require('cloudinary').v2;
const env = require('./env');

const configured = Boolean(
  env.cloudinary.cloud_name && env.cloudinary.api_key && env.cloudinary.api_secret
);

if (configured) {
  cloudinary.config(env.cloudinary);
}

function isCloudinaryConfigured() {
  return configured;
}

/**
 * Upload a buffer to Cloudinary. Falls back to a base64 data URL when
 * Cloudinary credentials are not configured so uploads still work locally.
 */
function uploadBuffer(buffer, { folder = 'portfolio', resourceType = 'auto' } = {}) {
  if (!configured) {
    return Promise.resolve(`data:image/*;base64,${buffer.toString('base64')}`);
  }
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: resourceType },
      (err, result) => {
        if (err) return reject(err);
        resolve(result.secure_url);
      }
    );
    stream.end(buffer);
  });
}

module.exports = { cloudinary, uploadBuffer, isCloudinaryConfigured };
