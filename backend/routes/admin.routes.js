const express = require('express');
const router = express.Router();
const { protect, restrictTo } = require('../middleware/auth.middleware');
const adminController = require('../controllers/admin.controller');

// Admin routes
router.get('/dashboard', protect, restrictTo('admin'), adminController.getDashboardStats);

router.get('/profiles/pending', protect, restrictTo('admin'), adminController.getPendingProfiles);

router.put('/profiles/:id/approve', protect, restrictTo('admin'), adminController.approveProfile);

router.put('/profiles/:id/reject', protect, restrictTo('admin'), adminController.rejectProfile);

router.get('/users', protect, restrictTo('admin'), adminController.getAllUsers);

router.put('/users/:id/block', protect, restrictTo('admin'), adminController.toggleBlockUser);

module.exports = router;
