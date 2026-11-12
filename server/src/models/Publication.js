const mongoose = require('mongoose');

const publicationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    authors: { type: String, trim: true, default: '' },
    publication: { type: String, trim: true, default: '' }, // journal / conference / venue
    type: {
      type: String,
      enum: ['Research Paper', 'Review Paper', 'Conference', 'Journal', 'Book Chapter', 'Other'],
      default: 'Research Paper',
      index: true,
    },
    date: { type: Date, default: null },
    yearDisplay: { type: String, trim: true, default: '' },
    abstract: { type: String, trim: true, default: '' },
    doi: { type: String, trim: true, default: '' },
    researchGateUrl: { type: String, default: '' },
    scholarUrl: { type: String, default: '' },
    pdfUrl: { type: String, default: '' },
    order: { type: Number, default: 0, index: true },
    visible: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false }
);

publicationSchema.index({ title: 'text', authors: 'text', abstract: 'text' });

module.exports = mongoose.model('Publication', publicationSchema);
