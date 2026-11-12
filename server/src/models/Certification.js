const mongoose = require('mongoose');

const certificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    issuer: { type: String, required: true, trim: true },
    date: { type: Date, default: null },
    dateDisplay: { type: String, trim: true, default: '' },
    description: { type: String, trim: true, default: '' },
    imageUrl: { type: String, default: '' },
    certificateUrl: { type: String, default: '' },
    verificationUrl: { type: String, default: '' },
    order: { type: Number, default: 0, index: true },
    visible: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false }
);

certificationSchema.index({ title: 'text', issuer: 'text' });

module.exports = mongoose.model('Certification', certificationSchema);
