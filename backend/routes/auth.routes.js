const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const passport = require('passport');
const authController = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');
const { validate } = require('../middleware/validation.middleware');
const { authLimiter, otpLimiter } = require('../middleware/rateLimiter.middleware');
const { certificateUpload } = require('../utils/upload.utils');

const isGoogleConfigured = () => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (!clientId || !clientSecret) return false;
  const invalidValues = [
    'your-google-client-id-here.apps.googleusercontent.com',
    'your-google-client-secret-here',
  ];
  if (invalidValues.includes(clientId) || invalidValues.includes(clientSecret)) {
    return false;
  }
  return true;
};

const requireGoogleConfig = (req, res, next) => {
  if (!isGoogleConfigured()) {
    return res.status(503).json({
      status: 'error',
      message: 'Google OAuth is not configured on the server',
    });
  }
  return next();
};

// Validation rules
const registerValidation = [
  body('fullName')
    .notEmpty().withMessage('Full name is required')
    .trim(),
  body('phone')
    .notEmpty().withMessage('Phone number is required')
    .matches(/^\+\d{1,3}\d{4,14}$/).withMessage('Invalid phone number format'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  body('email').optional().isEmail().withMessage('Invalid email format'),
];

const loginValidation = [
  body('phone').notEmpty().withMessage('Phone number is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

const otpValidation = [
  body('phone').notEmpty().withMessage('Phone number is required'),
  body('otp')
    .isLength({ min: 6, max: 6 })
    .withMessage('OTP must be 6 digits'),
];

// Routes
router.post('/register', authLimiter, certificateUpload.single('communityCertificate'), registerValidation, validate, authController.register);
router.post('/register-with-firebase', authLimiter, authController.registerWithFirebase);
router.post('/login', authLimiter, loginValidation, validate, authController.login);
router.post('/logout', protect, authController.logout);
router.get('/me', protect, authController.getMe);
router.put('/update-password', protect, authController.updatePassword);
// Certificate upload (after OTP verification)
router.post('/upload-certificate', protect, certificateUpload.single('communityCertificate'), authController.uploadCertificate);
// Google OAuth routes
router.get('/google', requireGoogleConfig, passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback',
  requireGoogleConfig,
  passport.authenticate('google', {
    failureRedirect: `${process.env.FRONTEND_URL}/login?error=auth_failed`,
    session: false
  }),
  authController.googleAuthCallback
);

// Onboarding route for Google users
router.post('/onboarding', protect, certificateUpload.single('communityCertificate'), authController.completeGoogleOnboarding);

module.exports = router;
