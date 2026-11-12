const mongoose = require('mongoose');

const socialLinkSchema = new mongoose.Schema(
  {
    platform: { type: String, required: true, trim: true },
    url: { type: String, required: true, default: '' },
    icon: { type: String, trim: true, default: '' },
    visible: { type: Boolean, default: true },
    order: { type: Number, default: 0, index: true },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model('SocialLink', socialLinkSchema);
