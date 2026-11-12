const mongoose = require('mongoose');

/** Technical skills grouped by category. */
const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true, index: true },
    icon: { type: String, trim: true, default: '' },
    proficiency: { type: Number, min: 0, max: 100, default: 50 },
    order: { type: Number, default: 0, index: true },
    visible: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false }
);

skillSchema.index({ name: 'text', category: 'text' });

module.exports = mongoose.model('Skill', skillSchema);
