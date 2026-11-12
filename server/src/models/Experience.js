const mongoose = require('mongoose');

/** Internships, work experience and achievements. */
const experienceSchema = new mongoose.Schema(
  {
    position: { type: String, required: true, trim: true },
    organization: { type: String, required: true, trim: true },
    employmentType: {
      type: String,
      enum: ['internship', 'full-time', 'part-time', 'freelance', 'work', 'other'],
      default: 'internship',
      index: true,
    },
    startDate: { type: Date, default: null },
    endDate: { type: Date, default: null },
    dateDisplay: { type: String, trim: true, default: '' },
    location: { type: String, trim: true, default: '' },
    description: { type: String, trim: true, default: '' },
    skills: [{ type: String, trim: true }],
    certificateUrl: { type: String, default: '' },
    order: { type: Number, default: 0, index: true },
    visible: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false }
);

experienceSchema.index({ position: 'text', organization: 'text', description: 'text' });

module.exports = mongoose.model('Experience', experienceSchema);
