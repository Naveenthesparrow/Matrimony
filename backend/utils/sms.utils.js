const axios = require('axios');

// Fast2SMS API Configuration
const FAST2SMS_API_KEY = process.env.FAST2SMS_API_KEY;
const FAST2SMS_URL = 'https://www.fast2sms.com/dev/bulkV2';

// Send SMS OTP
exports.sendSMSOTP = async (phone, otp) => {
  try {
    if (!FAST2SMS_API_KEY) {
      console.log('Fast2SMS not configured. OTP:', otp);
      return true; // Return true in development
    }

    // Remove + and extract 10-digit number for Indian phones
    let phoneNumber = phone.replace(/\D/g, '');

    // If starts with 91, remove it to get 10 digits
    if (phoneNumber.startsWith('91') && phoneNumber.length > 10) {
      phoneNumber = phoneNumber.substring(2);
    }

    // Take last 10 digits
    if (phoneNumber.length > 10) {
      phoneNumber = phoneNumber.slice(-10);
    }

    // Send SMS via Fast2SMS
    const response = await axios.get(FAST2SMS_URL, {
      params: {
        authorization: FAST2SMS_API_KEY,
        variables_values: otp,
        route: 'otp',
        numbers: phoneNumber,
      },
    });

    if (response.data && response.data.return) {
      console.log('SMS sent successfully via Fast2SMS:', phoneNumber);
      return true;
    } else {
      console.error('Fast2SMS response:', response.data);
      return false;
    }
  } catch (error) {
    console.error('SMS send error:', error.response?.data || error.message);
    // In development, we don't want to fail on SMS errors
    if (process.env.NODE_ENV === 'development') {
      console.log('Development mode - OTP:', otp);
      return true;
    }
    return false;
  }
};

// Format phone number
exports.formatPhoneNumber = (phone) => {
  if (!phone) return '';

  // Remove all non-digit and non-plus characters
  let cleaned = phone.replace(/[^\d+]/g, '');

  // If it doesn't start with +, add +91 (default for India)
  if (!cleaned.startsWith('+')) {
    // If it starts with 91 and has 12 digits, it likely already has country code
    if (cleaned.startsWith('91') && cleaned.length === 12) {
      cleaned = '+' + cleaned;
    } else {
      cleaned = '+91' + cleaned;
    }
  }

  return cleaned;
};

// Validate phone number
exports.validatePhoneNumber = (phone) => {
  if (!phone) return false;

  // Clean phone number: remove all non-digit and non-plus characters (like spaces, hyphens, parentheses)
  const cleaned = phone.replace(/[^\d+]/g, '');

  // Accept international format: +[country code][number]
  // Example: +919876543210 or +14155552671 or +15550100
  const internationalRegex = /^\+\d{1,3}\d{3,14}$/;

  if (internationalRegex.test(cleaned)) {
    return true;
  }

  // Also accept 10-digit Indian format for backward compatibility
  const phoneRegex = /^[6-9]\d{9}$/;
  const digitsOnly = cleaned.replace(/\D/g, '');

  // Check if it's a valid 10-digit Indian number
  if (digitsOnly.length === 10 && phoneRegex.test(digitsOnly)) {
    return true;
  }

  // Check if it has country code 91 (India)
  if (digitsOnly.length === 12 && digitsOnly.startsWith('91')) {
    return phoneRegex.test(digitsOnly.substring(2));
  }

  return false;
};
