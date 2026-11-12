const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, lowercase: true, unique: true, index: true },
    description: { type: String, trim: true, default: '' },
    problem: { type: String, trim: true, default: '' },
    solution: { type: String, trim: true, default: '' },
    keyChallenges: { type: String, trim: true, default: '' },
    caseStudy: { type: String, trim: true, default: '' },
    systemDesign: {
      architectureImage: { type: String, default: '' },
      workflowImage: { type: String, default: '' },
      deploymentImage: { type: String, default: '' },
      dbSchemaImage: { type: String, default: '' },
    },
    image: { type: String, default: '' },
    technologies: [{ type: String, trim: true }],
    category: { type: String, trim: true, default: 'General', index: true },
    githubUrl: { type: String, default: '' },
    liveUrl: { type: String, default: '' },
    featured: { type: Boolean, default: false, index: true },
    order: { type: Number, default: 0, index: true },
    visible: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false }
);

projectSchema.index({ title: 'text', description: 'text', technologies: 'text' });

function slugify(s) {
  return String(s)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
projectSchema.pre('validate', function next(done) {
  if (!this.slug && this.title) this.slug = slugify(this.title);
  done();
});

module.exports = mongoose.model('Project', projectSchema);
module.exports.slugify = slugify;
