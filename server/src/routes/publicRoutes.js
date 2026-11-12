const express = require('express');
const P = require('../controllers/publicController');
const msg = require('../controllers/messageController');
const { contactLimiter } = require('../middleware/rateLimit');

const router = express.Router();

router.get('/profile', P.profile);
router.get('/about', P.about);
router.get('/education', P.education);
router.get('/journey', P.journey);
router.get('/skills', P.skills);
router.get('/projects', P.projects);
router.get('/projects/:slug', P.projectBySlug);
router.get('/experience', P.experience);
router.get('/publications', P.publications);
router.get('/certifications', P.certifications);
router.get('/achievements', P.achievements);
router.get('/faqs', P.faqs);
router.get('/team', P.team);
router.get('/social-links', P.socialLinks);
router.get('/navigation', P.navigation);
router.get('/settings', P.settings);

router.post('/contact', contactLimiter, msg.submit);

module.exports = router;
