const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    designation: { type: String, trim: true, default: '' },
    image: { type: String, default: '' },
    biography: { type: String, trim: true, default: '' },
    social: [
      {
        platform: { type: String, trim: true, default: '' },
        url: { type: String, default: '' },
      },
    ],
    order: { type: Number, default: 0, index: true },
    visible: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false }
);

teamMemberSchema.index({ name: 'text', designation: 'text' });

module.exports = mongoose.model('TeamMember', teamMemberSchema);
