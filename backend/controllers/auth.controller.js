const User = require('../models/User.model');
const Profile = require('../models/Profile.model');
const { sendTokenResponse } = require('../utils/jwt.utils');
const { sendSMSOTP, validatePhoneNumber, formatPhoneNumber } = require('../utils/sms.utils');
const { sendOTPEmail, sendWelcomeEmail } = require('../utils/email.utils');
const { AppError } = require('../middleware/validation.middleware');

// Temporary storage for pending registrations (in production, use Redis)
const pendingRegistrations = new Map();

// @desc    Google OAuth callback
// @route   GET /api/auth/google/callback
// @access  Public
exports.googleAuthCallback = async (req, res) => {
  try {
    // User is authenticated via Passport, redirect to frontend with token
    const jwt = require('jsonwebtoken');
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE || '7d',
    });

    // Redirect to frontend with token
    res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}`);
  } catch (error) {
    console.error('Google auth callback error:', error);
    res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`);
  }
};

// @desc    Register new user (send OTP only, don't create account yet)
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res, next) => {
  try {
    const { phone: rawPhone, email, password, fullName } = req.body;
    const phone = formatPhoneNumber(rawPhone);

    // Validate phone number
    if (!validatePhoneNumber(phone)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid phone number format',
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({
        status: 'error',
        message: 'Phone number already registered',
      });
    }

    if (email) {
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({
          status: 'error',
          message: 'Email already registered',
        });
      }
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Store registration data temporarily (will create user after OTP verification)
    pendingRegistrations.set(phone, {
      phone,
      email,
      password,
      fullName,
      otp,
      otpExpiry,
      createdAt: new Date(),
    });

    // Auto-cleanup after 15 minutes
    setTimeout(() => {
      pendingRegistrations.delete(phone);
    }, 15 * 60 * 1000);

    // Send OTP via SMS
    await sendSMSOTP(phone, otp);

    // If email provided, send OTP via email too
    if (email) {
      await sendOTPEmail(email, otp, fullName);
    }

    res.status(200).json({
      status: 'success',
      message: 'OTP sent successfully. Please verify to complete registration.',
      data: {
        phone,
      },
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error during registration',
    });
  }
};

// @desc    Verify OTP and create user account
// @route   POST /api/auth/verify-otp
// @access  Public
exports.verifyOTP = async (req, res, next) => {
  try {
    const { phone, otp } = req.body;

    // Check if there's a pending registration
    const pendingReg = pendingRegistrations.get(phone);

    if (pendingReg) {
      // New registration flow: verify OTP and create user
      if (pendingReg.otp !== otp) {
        return res.status(400).json({
          status: 'error',
          message: 'Invalid OTP',
        });
      }

      if (new Date() > pendingReg.otpExpiry) {
        pendingRegistrations.delete(phone);
        return res.status(400).json({
          status: 'error',
          message: 'OTP expired. Please register again.',
        });
      }

      // OTP is valid, now create the user account
      const user = await User.create({
        phone: pendingReg.phone,
        email: pendingReg.email,
        password: pendingReg.password,
        fullName: pendingReg.fullName,
        isPhoneVerified: true,
      });

      // Create an initial empty profile for the user
      try {
        const profile = await Profile.create({
          user: user._id,
          fullName: user.fullName,
          phone: user.phone,
          gender: 'Male', // Default values that can be updated later
          dateOfBirth: new Date('1990-01-01'),
          age: 30,
          height: "5'5\"",
          maritalStatus: 'Never Married',
          country: 'India',
          state: 'Tamil Nadu',
          city: 'Chennai',
          highestEducation: 'Degree',
          occupation: 'Software Engineer',
        });

        user.profile = profile._id;
        await user.save();
      } catch (profileError) {
        console.error('Error creating profile during OTP verification:', profileError);
      }

      // Remove from pending registrations
      pendingRegistrations.delete(phone);

      // Send welcome email if email exists
      if (user.email) {
        await sendWelcomeEmail(user.email, user.fullName);
      }

      // Send token response
      sendTokenResponse(user, 201, res, 'Account created successfully');

    } else {
      // Existing user trying to verify (for resend OTP flow)
      const user = await User.findOne({ phone });

      if (!user) {
        return res.status(404).json({
          status: 'error',
          message: 'No pending registration found. Please register first.',
        });
      }

      // Verify OTP
      if (!user.verifyOTP(otp)) {
        return res.status(400).json({
          status: 'error',
          message: 'Invalid or expired OTP',
        });
      }

      // Mark phone as verified
      user.isPhoneVerified = true;
      user.otp = undefined;
      user.otpExpiry = undefined;
      await user.save();

      // Send token response
      sendTokenResponse(user, 200, res, 'Phone verified successfully');
    }

  } catch (error) {
    console.error('OTP verification error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error verifying OTP',
    });
  }
};

// @desc    Register with Firebase OTP verification
// @route   POST /api/auth/register-with-firebase
// @access  Public
exports.registerWithFirebase = async (req, res, next) => {
  try {
    const { phone: rawPhone, password, fullName, firebaseIdToken } = req.body;
    const phone = formatPhoneNumber(rawPhone);

    console.log('Firebase registration request:', {
      phone,
      hasPassword: !!password,
      hasFullName: !!fullName,
      hasToken: !!firebaseIdToken
    });

    // Validate inputs
    if (!phone || !password || !fullName || !firebaseIdToken) {
      console.log('Missing fields:', { phone: !phone, password: !password, fullName: !fullName, firebaseIdToken: !firebaseIdToken });
      return res.status(400).json({
        status: 'error',
        message: 'Missing required fields',
      });
    }

    // Validate phone number
    if (!validatePhoneNumber(phone)) {
      console.log('Invalid phone format:', phone);
      return res.status(400).json({
        status: 'error',
        message: 'Invalid phone number format',
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({
        status: 'error',
        message: 'Phone number already registered',
      });
    }

    // Create user account after Firebase OTP verification
    const user = await User.create({
      phone,
      password,
      fullName,
      isPhoneVerified: true, // Phone already verified by Firebase
      authProvider: 'phone',
    });

    console.log('User created successfully:', user.phone);

    // Create an initial empty profile for the user
    try {
      const profile = await Profile.create({
        user: user._id,
        fullName: fullName,
        phone: phone,
        gender: 'Male', // Default values that can be updated later
        dateOfBirth: new Date('1990-01-01'),
        age: 30,
        height: "5'5\"",
        maritalStatus: 'Never Married',
        country: 'India',
        state: 'Tamil Nadu',
        city: 'Chennai',
        highestEducation: 'Degree',
        occupation: 'Software Engineer',
      });

      user.profile = profile._id;
      await user.save();
      console.log('Initial profile created for:', user.phone);
    } catch (profileError) {
      console.error('Error creating profile during Firebase registration:', profileError);
      // We don't fail registration if profile creation fails, but it's good to know
    }

    // Send token response
    sendTokenResponse(user, 201, res, 'Account created successfully. Please upload your certificate.');

  } catch (error) {
    console.error('Firebase registration error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Error creating account',
    });
  }
};

// @desc    Resend OTP
// @route   POST /api/auth/resend-otp
// @access  Public
exports.resendOTP = async (req, res, next) => {
  try {
    const { phone } = req.body;
    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
    }

    if (user.isPhoneVerified) {
      return res.status(400).json({
        status: 'error',
        message: 'Phone already verified',
      });
    }

    // Generate new OTP
    const otp = user.generateOTP();
    await user.save();

    // Send OTP
    await sendSMSOTP(phone, otp);

    res.status(200).json({
      status: 'success',
      message: 'OTP sent successfully',
    });

  } catch (error) {
    console.error('Resend OTP error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error resending OTP',
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  try {
    const { phone: rawPhone, password } = req.body;
    const phone = formatPhoneNumber(rawPhone);

    // Check if phone and password provided
    if (!phone || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide phone and password',
      });
    }

    // Find user
    const user = await User.findOne({ phone }).select('+password');

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid phone or password',
      });
    }

    // Check if phone is verified
    if (!user.isPhoneVerified) {
      return res.status(403).json({
        status: 'error',
        message: 'Please verify your phone number first',
      });
    }

    // Check if account is active
    if (!user.isActive || user.isBlocked) {
      return res.status(403).json({
        status: 'error',
        message: 'Your account has been deactivated or blocked',
      });
    }

    // Update last login
    user.lastLogin = Date.now();
    user.loginCount += 1;
    await user.save();

    // Send token response
    sendTokenResponse(user, 200, res, 'Login successful');

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error during login',
    });
  }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
exports.logout = async (req, res) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    status: 'success',
    message: 'Logged out successfully',
  });
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('profile');

    res.status(200).json({
      status: 'success',
      data: { user },
    });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error fetching user data',
    });
  }
};

// @desc    Update password
// @route   PUT /api/auth/update-password
// @access  Private
exports.updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id).select('+password');

    // Check current password
    if (!(await user.comparePassword(currentPassword))) {
      return res.status(401).json({
        status: 'error',
        message: 'Current password is incorrect',
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    sendTokenResponse(user, 200, res, 'Password updated successfully');

  } catch (error) {
    console.error('Update password error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error updating password',
    });
  }
};

// @desc    Upload community certificate after OTP verification
// @route   POST /api/auth/upload-certificate
// @access  Private (Protected - user must be authenticated)
exports.uploadCertificate = async (req, res, next) => {
  try {
    const file = req.file;
    const userId = req.user._id;

    // Validate certificate file
    if (!file) {
      return res.status(400).json({
        status: 'error',
        message: 'Certificate file is required',
      });
    }

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
    }

    // Check if phone is verified
    if (!user.isPhoneVerified) {
      return res.status(403).json({
        status: 'error',
        message: 'Please verify your phone number first',
      });
    }

    // Upload certificate to Cloudinary
    const { uploadCertificateToCloudinary } = require('../utils/upload.utils');
    let certificateData = null;
    try {
      certificateData = await uploadCertificateToCloudinary(
        file.buffer,
        file.originalname,
        'certificates'
      );
    } catch (uploadError) {
      return res.status(500).json({
        status: 'error',
        message: 'Error uploading certificate',
      });
    }

    // Update user with certificate
    user.communityCertificate = {
      filename: file.originalname,
      url: certificateData.url,
      uploadedAt: new Date(),
      verified: false,
    };

    await user.save();

    res.status(200).json({
      status: 'success',
      message: 'Certificate uploaded successfully. It will be verified by our team.',
      data: {
        certificate: user.communityCertificate,
      },
    });
  } catch (error) {
    console.error('Upload certificate error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error uploading certificate',
    });
  }
};
// @desc    Complete Google onboarding (save phone and certificate)
// @route   POST /api/auth/onboarding
// @access  Private
exports.completeGoogleOnboarding = async (req, res, next) => {
  try {
    const { phone: rawPhone } = req.body;
    const file = req.file;
    const userId = req.user._id;

    if (!rawPhone || !file) {
      return res.status(400).json({
        status: 'error',
        message: 'Phone number and certificate file are required',
      });
    }

    const phone = formatPhoneNumber(rawPhone);

    // Validate phone number
    if (!validatePhoneNumber(phone)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid phone number format',
      });
    }

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
    }

    // Check if phone is already taken by ANOTHER user
    const existingUser = await User.findOne({ phone, _id: { $ne: userId } });
    if (existingUser) {
      return res.status(400).json({
        status: 'error',
        message: 'Phone number already registered with another account',
      });
    }

    // Upload certificate to Cloudinary
    const { uploadCertificateToCloudinary } = require('../utils/upload.utils');
    let certificateData = null;
    try {
      certificateData = await uploadCertificateToCloudinary(
        file.buffer,
        file.originalname,
        'certificates'
      );
    } catch (uploadError) {
      console.error('Cloudinary upload error:', uploadError);
      return res.status(500).json({
        status: 'error',
        message: 'Error uploading certificate',
      });
    }

    // Update user
    user.phone = phone;
    user.isPhoneVerified = true; // No OTP check needed as per user request
    user.communityCertificate = {
      filename: file.originalname,
      url: certificateData.url,
      uploadedAt: new Date(),
      verified: false,
    };

    await user.save();

    // Update Profile as well
    if (user.profile) {
      const Profile = require('../models/Profile.model');
      await Profile.findByIdAndUpdate(user.profile, { phone });
    }

    res.status(200).json({
      status: 'success',
      message: 'Onboarding completed successfully',
      data: {
        user: await User.findById(userId).populate('profile'),
      },
    });
  } catch (error) {
    console.error('Complete onboarding error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error completing onboarding',
    });
  }
};
