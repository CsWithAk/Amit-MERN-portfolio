const multer = require('multer');
const asyncHandler = require('../utils/asyncHandler');
const { success, failure } = require('../utils/apiResponse');
const { uploadBuffer, isCloudinaryConfigured } = require('../config/cloudinary');

// Keep files in memory, then push to Cloudinary (or base64 fallback).
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024 }, // 8MB
  fileFilter: (req, file, cb) => {
    if (/^image\/(png|jpe?g|webp|gif)$/.test(file.mimetype) || file.mimetype === 'application/pdf') {
      return cb(null, true);
    }
    cb(new Error('Unsupported file type'));
  },
});

/** POST /api/admin/upload — multipart field name: "file" */
const uploadAsset = asyncHandler(async (req, res) => {
  if (!req.file) return failure(res, 'No file provided', 400, 'NO_FILE');
  const folder = (req.query.folder || 'portfolio').replace(/[^a-z0-9_-]/gi, '');
  const resourceType = req.file.mimetype === 'application/pdf' ? 'raw' : 'auto';
  const url = await uploadBuffer(req.file.buffer, { folder, resourceType });
  return success(res, { url, cloudinary: isCloudinaryConfigured() }, 'Uploaded', 201);
});

module.exports = { upload, uploadAsset };
