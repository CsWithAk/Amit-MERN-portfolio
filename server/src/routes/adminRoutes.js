const express = require('express');
const { requireAuth } = require('../middleware/auth');
const crud = require('../controllers/crudFactory');
const settings = require('../controllers/settingsController');
const dashboard = require('../controllers/dashboardController');
const msg = require('../controllers/messageController');
const upload = require('../controllers/uploadController');
const M = require('../models');

const router = express.Router();

// Every admin route requires an authenticated session.
router.use(requireAuth);

// Dashboard
router.get('/dashboard', dashboard.overview);

// Singleton editors
router.put('/profile', settings.updateProfile);
router.put('/about', settings.updateAbout);
router.put('/settings', settings.updateSettings);
router.get('/settings', async (req, res) => res.json({ success: true, data: await M.SiteSettings.findOne({ key: 'settings' }) }));

// Upload (Cloudinary or base64 fallback)
router.post('/upload', upload.upload.single('file'), upload.uploadAsset);

// Contact messages
router.get('/messages', msg.list);
router.get('/messages/:id', msg.getOne);
router.put('/messages/:id', msg.markRead);
router.post('/messages/:id/reply', msg.reply);
router.delete('/messages/:id', msg.remove);

// Generic CRUD modules
const register = (path, model, opts) => {
  const h = crud({ model, publicOnly: true, ...opts });
  router.get(path, h.list);
  router.get(`${path}/:id`, h.getOne);
  router.post(path, h.create);
  router.put(`${path}/:id`, h.update);
  router.delete(`${path}/:id`, h.remove);
};

register('/education', M.Education, { searchFields: ['title', 'institution', 'description'] });
register('/skills', M.Skill, { searchFields: ['name', 'category'] });
register('/projects', M.Project, { searchFields: ['title', 'description', 'technologies'] });
register('/experience', M.Experience, { searchFields: ['position', 'organization', 'description'] });
register('/publications', M.Publication, { searchFields: ['title', 'authors', 'abstract'] });
register('/certifications', M.Certification, { searchFields: ['title', 'issuer', 'description'] });
register('/achievements', M.Achievement, { searchFields: ['title', 'description', 'issuer'] });
register('/faqs', M.FAQ, { searchFields: ['question', 'answer'], defaultSort: 'order' });
register('/team', M.TeamMember, { searchFields: ['name', 'designation', 'biography'] });
register('/social-links', M.SocialLink, { searchFields: ['platform', 'url'], defaultSort: 'order' });
register('/navigation', M.NavigationItem, { searchFields: ['label'], defaultSort: 'order' });

module.exports = router;
