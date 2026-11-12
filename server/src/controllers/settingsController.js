const asyncHandler = require('../utils/asyncHandler');
const { success } = require('../utils/apiResponse');
const M = require('../models');

/** Singleton update helper — avoids creating duplicate documents. */
async function upsertSingleton(Model, key, body) {
  let doc = await Model.findOne({ key });
  if (!doc) {
    doc = new Model({ key });
  }
  const allowed = Object.keys(doc.schema.obj).filter((k) => k !== 'key' && k !== '_id');
  for (const field of allowed) {
    if (body[field] !== undefined) doc[field] = body[field];
  }
  await doc.save();
  return doc;
}

const updateProfile = asyncHandler(async (req, res) => {
  const doc = await upsertSingleton(M.Profile, 'profile', req.body);
  return success(res, doc, 'Profile saved');
});

const updateAbout = asyncHandler(async (req, res) => {
  const doc = await upsertSingleton(M.About, 'about', req.body);
  return success(res, doc, 'About saved');
});

const updateSettings = asyncHandler(async (req, res) => {
  const doc = await upsertSingleton(M.SiteSettings, 'settings', req.body);
  return success(res, doc, 'Settings saved');
});

module.exports = { updateProfile, updateAbout, updateSettings };
