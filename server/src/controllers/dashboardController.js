const asyncHandler = require('../utils/asyncHandler');
const { success } = require('../utils/apiResponse');
const M = require('../models');

/** GET /api/admin/dashboard — counts + recent messages + quick shortcuts payload. */
const overview = asyncHandler(async (req, res) => {
  const [
    projects,
    skills,
    education,
    experiences,
    publications,
    certifications,
    achievements,
    team,
    totalMessages,
    unreadMessages,
    recentMessages,
  ] = await Promise.all([
    M.Project.countDocuments({}),
    M.Skill.countDocuments({}),
    M.Education.countDocuments({}),
    M.Experience.countDocuments({}),
    M.Publication.countDocuments({}),
    M.Certification.countDocuments({}),
    M.Achievement.countDocuments({}),
    M.TeamMember.countDocuments({}),
    M.ContactMessage.countDocuments({}),
    M.ContactMessage.countDocuments({ read: false }),
    M.ContactMessage.find({}).sort('-createdAt').limit(5).select('name email subject read createdAt'),
  ]);

  return success(res, {
    counts: {
      projects,
      skills,
      education,
      experiences,
      publications,
      certifications,
      achievements,
      team,
      messages: totalMessages,
      unreadMessages,
    },
    recentMessages,
  });
});

module.exports = { overview };
