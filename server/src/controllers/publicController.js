const asyncHandler = require('../utils/asyncHandler');
const { success } = require('../utils/apiResponse');
const M = require('../models');

/** All public reads return only visible/published content. */

const profile = asyncHandler(async (req, res) => {
  const data = await M.Profile.findOne({ key: 'profile' });
  return success(res, data);
});

const about = asyncHandler(async (req, res) => {
  const data = await M.About.findOne({ key: 'about' });
  return success(res, data);
});

const education = asyncHandler(async (req, res) => {
  const items = await M.Education.find({ visible: true }).sort('order createdAt');
  return success(res, items);
});

const skills = asyncHandler(async (req, res) => {
  const items = await M.Skill.find({ visible: true }).sort('order name');
  // group by category
  const groups = {};
  for (const s of items) {
    (groups[s.category] ||= []).push(s);
  }
  return success(res, { items, groups });
});

const projects = asyncHandler(async (req, res) => {
  const items = await M.Project.find({ visible: true }).sort('order -featured createdAt');
  const categories = [...new Set(items.map((p) => p.category))];
  return success(res, { items, categories });
});

const projectBySlug = asyncHandler(async (req, res) => {
  const item = await M.Project.findOne({ slug: req.params.slug, visible: true });
  return success(res, item);
});

const experience = asyncHandler(async (req, res) => {
  const items = await M.Experience.find({ visible: true }).sort('order -startDate');
  return success(res, items);
});

const publications = asyncHandler(async (req, res) => {
  const items = await M.Publication.find({ visible: true }).sort('order -date');
  return success(res, items);
});

const certifications = asyncHandler(async (req, res) => {
  const items = await M.Certification.find({ visible: true }).sort('order -date');
  return success(res, items);
});

const achievements = asyncHandler(async (req, res) => {
  const items = await M.Achievement.find({ visible: true }).sort('order -date');
  return success(res, items);
});

const faqs = asyncHandler(async (req, res) => {
  const items = await M.FAQ.find({ visible: true }).sort('order createdAt');
  return success(res, items);
});

const team = asyncHandler(async (req, res) => {
  const items = await M.TeamMember.find({ visible: true }).sort('order');
  return success(res, items);
});

const socialLinks = asyncHandler(async (req, res) => {
  const items = await M.SocialLink.find({ visible: true }).sort('order');
  return success(res, items);
});

const navigation = asyncHandler(async (req, res) => {
  // Team has been retired from the public portfolio. This also handles stale
  // navigation records in an already-deployed database.
  const items = await M.NavigationItem.find({ enabled: true, sectionKey: { $ne: 'team' } }).sort('order');
  return success(res, items);
});

const settings = asyncHandler(async (req, res) => {
  const data = await M.SiteSettings.findOne({ key: 'settings' });
  return success(res, data);
});

const journey = asyncHandler(async (req, res) => {
  const items = await M.Education.find({ visible: true, category: 'education' }).sort('order createdAt');
  return success(res, items);
});

module.exports = {
  profile,
  about,
  education,
  journey,
  skills,
  projects,
  projectBySlug,
  experience,
  publications,
  certifications,
  achievements,
  faqs,
  team,
  socialLinks,
  navigation,
  settings,
};
