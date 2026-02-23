const express = require('express');
const router = express.Router();
const { protect, requirePhoneVerified, requireApprovedProfile } = require('../middleware/auth.middleware');
const profileController = require('../controllers/profile.controller');

// Profile routes
router.post('/', protect, requirePhoneVerified, profileController.upsertProfile);
router.get('/me', protect, profileController.getMyProfile);
router.put('/me', protect, profileController.upsertProfile);

// Get all profiles (Regular users need approval, admins bypass via middleware update)
router.get('/', protect, requireApprovedProfile, profileController.getProfiles);

// Get specific profile
router.get('/:id', protect, requireApprovedProfile, profileController.getProfileById);

module.exports = router;
