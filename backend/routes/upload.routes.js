const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');
const { upload } = require('../utils/upload.utils');

// Upload routes
router.post('/profile-photo', protect, upload.single('photo'), (req, res) => {
  res.json({ message: 'Upload profile photo endpoint' });
});

router.post('/photos', protect, upload.array('photos', 5), (req, res) => {
  res.json({ message: 'Upload multiple photos endpoint' });
});

module.exports = router;
