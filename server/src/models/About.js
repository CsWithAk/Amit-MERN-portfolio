const mongoose = require('mongoose');

/** Singleton document — About section content. */
const aboutSchema = new mongoose.Schema(
  {
    key: { type: String, default: 'about', unique: true, index: true },
    heading: { type: String, trim: true, default: 'About Me' },
    subtitle: { type: String, trim: true, default: '' },
    biography: [{ type: String, trim: true }],
    interests: [{ type: String, trim: true }],
    statistics: [
      {
        label: { type: String, trim: true, required: true },
        value: { type: Number, default: 0 },
        suffix: { type: String, trim: true, default: '' },
      },
    ],
    images: [{ type: String }],
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model('About', aboutSchema);
