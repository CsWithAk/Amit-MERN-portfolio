const mongoose = require('mongoose');

const contactMessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    subject: { type: String, trim: true, default: '' },
    message: { type: String, required: true, trim: true },
    read: { type: Boolean, default: false, index: true },
    ip: { type: String, default: '' },

    // Delivery status of the SendGrid notification/confirmation emails.
    // Tracked separately from the saved message so a failed email never
    // means a lost submission.
    notified: { type: Boolean, default: false },
    confirmed: { type: Boolean, default: false },

    // Admin replies sent back to the visitor via SendGrid.
    replied: { type: Boolean, default: false, index: true },
    repliedAt: { type: Date, default: null },
    replies: [
      {
        body: { type: String, required: true },
        subject: { type: String, default: '' },
        sentAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

contactMessageSchema.index({ name: 'text', email: 'text', subject: 'text', message: 'text' });

module.exports = mongoose.model('ContactMessage', contactMessageSchema);
