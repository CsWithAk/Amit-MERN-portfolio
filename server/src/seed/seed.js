/**
 * Seed runner — idempotent. Safe to run multiple times.
 * Usage: npm run seed
 * With --force it wipes existing collection data first.
 */
const { connectDB, disconnectDB } = require('../config/db');
const M = require('../models');
const D = require('./seedData');

const force = process.argv.includes('--force');
const isCli = require.main === module;

// Normal seeding is initial-only: existing database documents are preserved.
// Use --force only when an intentional database reset is required.

async function seedCollection(Model, key, rows, doForce = force) {
  if (doForce) await Model.deleteMany({});
  const existing = await Model.countDocuments(key ? key : {});
  if (existing > 0) {
    console.log(`[seed] ${Model.modelName}: ${existing} existing docs found; preserving database content.`);
    return;
  }
  await Model.create(rows);
  console.log(`[seed] ${Model.modelName}: inserted ${rows.length}`);
}

async function seedSingleton(Model, doc, doForce = force) {
  const existing = await Model.findOne({ key: doc.key });
  if (existing && !doForce) {
    console.log(`[seed] ${Model.modelName}: exists, skipping.`);
    return existing;
  }
  if (doForce && existing) await Model.deleteMany({ key: doc.key });
  const created = await Model.create(doc);
  console.log(`[seed] ${Model.modelName}: seeded.`);
  return created;
}

async function seedCertifications(rows, doForce = force) {
  if (doForce) await M.Certification.deleteMany({});
  let inserted = 0;
  for (const row of rows) {
    const exists = await M.Certification.findOne({ title: row.title, issuer: row.issuer });
    if (!exists) {
      await M.Certification.create(row);
      inserted += 1;
    }
  }
  console.log(`[seed] Certification: inserted ${inserted} new records`);
}

async function seedNavigation(rows, doForce = force) {
  if (doForce) {
    await M.NavigationItem.deleteMany({});
    await M.NavigationItem.create(rows);
    console.log(`[seed] NavigationItem: inserted ${rows.length}`);
    return;
  }

  const hasExperience = await M.NavigationItem.exists({ sectionKey: 'experience' });
  const hasCertifications = await M.NavigationItem.exists({ sectionKey: 'certifications' });
  const needsMigration = !hasExperience || !hasCertifications;

  if (needsMigration) {
    await M.NavigationItem.updateMany(
      { sectionKey: { $in: ['publications', 'faq', 'contact'] }, order: { $gte: 6 } },
      { $inc: { order: 2 } }
    );
  }

  for (const row of rows) {
    const exists = await M.NavigationItem.exists({ sectionKey: row.sectionKey });
    if (!exists) await M.NavigationItem.create(row);
  }
  console.log('[seed] NavigationItem: ensured Experience and Certifications links');
}

async function seedAll({ force: doForce = false } = {}) {
  await seedSingleton(M.Profile, D.PROFILE, doForce);
  await seedSingleton(M.About, D.ABOUT, doForce);
  await seedSingleton(M.SiteSettings, D.SITE_SETTINGS, doForce);

  await seedCollection(M.Education, {}, D.EDUCATION, doForce);
  await seedCollection(M.Experience, {}, D.EXPERIENCE, doForce);
  await seedCollection(M.Skill, {}, D.SKILLS, doForce);
  await seedCollection(M.Project, {}, D.PROJECTS, doForce);
  await seedCollection(M.Publication, {}, D.PUBLICATIONS, doForce);
  await seedCertifications(D.CERTIFICATIONS, doForce);
  await seedCollection(M.FAQ, {}, D.FAQS, doForce);
  await seedCollection(M.TeamMember, {}, D.TEAM, doForce);
  await seedCollection(M.SocialLink, {}, D.SOCIAL_LINKS, doForce);
  await seedNavigation(D.NAVIGATION, doForce);

  // Academic profiles are stored as SocialLink entries keyed by icon.
  if (doForce) {
    await M.SocialLink.deleteMany({ icon: { $in: D.ACADEMIC_PROFILES.map((a) => a.icon) } });
  }
  for (const a of D.ACADEMIC_PROFILES) {
    const exists = await M.SocialLink.findOne({ icon: a.icon });
    if (!exists) await M.SocialLink.create({ ...a, visible: true });
  }
}

async function run() {
  await connectDB();
  console.log('[seed] Starting content migration...');

  await seedSingleton(M.Profile, D.PROFILE);
  await seedSingleton(M.About, D.ABOUT);
  await seedSingleton(M.SiteSettings, D.SITE_SETTINGS);

  await seedCollection(M.Education, {}, D.EDUCATION);
  await seedCollection(M.Experience, {}, D.EXPERIENCE);
  await seedCollection(M.Skill, {}, D.SKILLS);
  await seedCollection(M.Project, {}, D.PROJECTS);
  await seedCollection(M.Publication, {}, D.PUBLICATIONS);
  await seedCertifications(D.CERTIFICATIONS);
  await seedCollection(M.FAQ, {}, D.FAQS);
  await seedCollection(M.TeamMember, {}, D.TEAM);
  await seedCollection(M.SocialLink, {}, D.SOCIAL_LINKS);
  await seedNavigation(D.NAVIGATION);

  // Academic profiles are stored as SocialLink entries with an 'academic' marker in order range.
  if (force) {
    await M.SocialLink.deleteMany({ icon: { $in: D.ACADEMIC_PROFILES.map((a) => a.icon) } });
  }
  for (const a of D.ACADEMIC_PROFILES) {
    const exists = await M.SocialLink.findOne({ icon: a.icon });
    if (!exists) {
      await M.SocialLink.create({ ...a, visible: true });
      console.log(`[seed] Academic profile: ${a.platform}`);
    }
  }

  console.log('[seed] Done. Original portfolio content has been migrated.');
  await disconnectDB();
}

module.exports = { seedAll };

if (isCli) {
  run().catch(async (err) => {
    console.error('[seed] Failed:', err.message);
    await disconnectDB().catch(() => {});
    process.exit(1);
  });
}
