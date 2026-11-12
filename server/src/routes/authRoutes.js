const express = require('express');
const auth = require('../controllers/authController');
const { loginLimiter } = require('../middleware/rateLimit');

const router = express.Router();

// Only login / logout / session-check exist. There is NO registration route.
router.post('/login', loginLimiter, auth.login);
router.post('/logout', auth.logout);
router.get('/me', auth.me);

module.exports = router;
