const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  // Authentication
  phone: {
    type: String,
    required: function () {
      return this.authProvider === 'local' || this.authProvider === 'phone';
    },
    unique: true,
    trim: true,
  },
  fullName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    minlength: 6,
  },

  // Google OAuth
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  authProvider: {
    type: String,
    enum: ['local', 'google', 'phone'],
    default: 'local',
  },

  // Verification status
  isPhoneVerified: {
    type: Boolean,
    default: false,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  isProfileApproved: {
    type: Boolean,
    default: false,
  },

  // User role
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },

  // Account status
  isActive: {
    type: Boolean,
    default: true,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },

  // Community Certificate
  communityCertificate: {
    filename: String,
    url: String,
    uploadedAt: Date,
    verified: {
      type: Boolean,
      default: false,
    },
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },

  // OTP for verification
  otp: String,
  otpExpiry: Date,

  // Profile reference
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
  },

  // Tracking
  lastLogin: {
    type: Date,
  },
  loginCount: {
    type: Number,
    default: 0,
  },

}, {
  timestamps: true,
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Generate OTP
userSchema.methods.generateOTP = function () {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  this.otp = otp;
  this.otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes
  return otp;
};

// Verify OTP
userSchema.methods.verifyOTP = function (otp) {
  if (this.otp !== otp) {
    return false;
  }
  if (Date.now() > this.otpExpiry) {
    return false;
  }
  return true;
};

module.exports = mongoose.model('User', userSchema);
