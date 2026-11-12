const mongoose = require('mongoose');

/** Singleton document — the public hero / identity information. */
const profileSchema = new mongoose.Schema(
  {
    key: { type: String, default: 'profile', unique: true, index: true },
    name: { type: String, required: true, trim: true, default: 'Amit Kumar' },
    logoText: { type: String, trim: true, default: 'CsWithAk' },
    designation: { type: String, trim: true, default: '' },
    roles: [{ type: String, trim: true }], // animated typed roles
    tagline: { type: String, trim: true, default: '' },
    heroIntro: { type: String, trim: true, default: '' },
    image: { type: String, default: '' },
    resumeUrl: { type: String, default: '' },
    companyUrl: { type: String, default: '' },
    companyLabel: { type: String, default: 'My Company' },
    email: { type: String, trim: true, lowercase: true, default: '' },
    phone: { type: String, trim: true, default: '' },
    location: { type: String, trim: true, default: '' },
    availability: { type: String, trim: true, default: '' },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model('Profile', profileSchema);
