const mongoose = require('mongoose');

const navigationItemSchema = new mongoose.Schema(
  {
    label: { type: String, required: true, trim: true },
    target: { type: String, trim: true, default: '' }, // section anchor id or route
    sectionKey: { type: String, trim: true, default: '' },
    external: { type: Boolean, default: false },
    enabled: { type: Boolean, default: true },
    order: { type: Number, default: 0, index: true },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model('NavigationItem', navigationItemSchema);
