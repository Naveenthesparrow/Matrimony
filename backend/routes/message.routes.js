const express = require('express');
const router = express.Router();
const { protect, requireApprovedProfile } = require('../middleware/auth.middleware');
const { messageLimiter } = require('../middleware/rateLimiter.middleware');

// Message routes
router.post('/', protect, requireApprovedProfile, messageLimiter, (req, res) => {
  res.json({ message: 'Send message endpoint' });
});

router.get('/conversations', protect, (req, res) => {
  res.json({ message: 'Get conversations endpoint' });
});

router.get('/conversation/:userId', protect, (req, res) => {
  res.json({ message: 'Get conversation with user endpoint' });
});

module.exports = router;
