const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true, default: '' },
    issuer: { type: String, trim: true, default: '' },
    date: { type: Date, default: null },
    yearDisplay: { type: String, trim: true, default: '' },
    icon: { type: String, trim: true, default: '' },
    order: { type: Number, default: 0, index: true },
    visible: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false }
);

achievementSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Achievement', achievementSchema);
