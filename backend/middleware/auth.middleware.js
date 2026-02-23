const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

// Protect routes - verify JWT token
exports.protect = async (req, res, next) => {
  try {
    let token;

    // Check for token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    // Check for token in cookies
    else if (req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'Not authorized. Please login to access this resource.',
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from token
    const user = await User.findById(decoded.id).select('-password -otp -otpExpiry');

    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'User no longer exists.',
      });
    }

    // Check if user is active
    if (!user.isActive || user.isBlocked) {
      return res.status(403).json({
        status: 'error',
        message: 'Your account has been deactivated or blocked.',
      });
    }

    // Attach user to request
    req.user = user;
    next();

  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid token. Please login again.',
      });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        status: 'error',
        message: 'Token expired. Please login again.',
      });
    }
    return res.status(500).json({
      status: 'error',
      message: 'Authentication error.',
    });
  }
};

// Restrict to specific roles
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: 'error',
        message: 'You do not have permission to perform this action.',
      });
    }
    next();
  };
};

// Check if user has verified phone
exports.requirePhoneVerified = (req, res, next) => {
  if (req.user.role === 'admin' || req.user.isPhoneVerified) {
    return next();
  }
  return res.status(403).json({
    status: 'error',
    message: 'Please verify your phone number first.',
  });
};

// Check if profile is approved
exports.requireApprovedProfile = (req, res, next) => {
  if (req.user.role === 'admin' || req.user.isProfileApproved) {
    return next();
  }
  return res.status(403).json({
    status: 'error',
    message: 'Your profile is pending admin approval.',
  });
};

