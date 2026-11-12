const mongoose = require('mongoose');

/** Education and course records shown in the Journey section. */
const educationSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: ['education', 'course', 'internship'],
      default: 'education',
      index: true,
    },
    title: { type: String, required: true, trim: true },
    institution: { type: String, required: true, trim: true },
    startDate: { type: Date, default: null },
    endDate: { type: Date, default: null },
    dateDisplay: { type: String, trim: true, default: '' },
    description: { type: String, trim: true, default: '' },
    grade: { type: String, trim: true, default: '' },
    location: { type: String, trim: true, default: '' },
    certificateUrl: { type: String, default: '' },
    order: { type: Number, default: 0, index: true },
    visible: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false }
);

educationSchema.index({ title: 'text', institution: 'text', description: 'text' });

module.exports = mongoose.model('Education', educationSchema);
