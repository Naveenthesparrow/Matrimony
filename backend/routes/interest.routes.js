const express = require('express');
const router = express.Router();
const { protect, requireApprovedProfile } = require('../middleware/auth.middleware');

// Interest routes
router.post('/', protect, requireApprovedProfile, (req, res) => {
  res.json({ message: 'Send interest endpoint' });
});

router.get('/sent', protect, (req, res) => {
  res.json({ message: 'Get sent interests endpoint' });
});

router.get('/received', protect, (req, res) => {
  res.json({ message: 'Get received interests endpoint' });
});

router.put('/:id/accept', protect, (req, res) => {
  res.json({ message: 'Accept interest endpoint' });
});

router.put('/:id/reject', protect, (req, res) => {
  res.json({ message: 'Reject interest endpoint' });
});

module.exports = router;
