const express = require('express');
const router = express.Router();
const { protect, requireApprovedProfile } = require('../middleware/auth.middleware');

// Match routes
router.get('/', protect, requireApprovedProfile, (req, res) => {
  res.json({ message: 'Get matches endpoint' });
});

router.get('/suggestions', protect, requireApprovedProfile, (req, res) => {
  res.json({ message: 'Get match suggestions endpoint' });
});

module.exports = router;
