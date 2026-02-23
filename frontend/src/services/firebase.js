import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAleSm81gc3ImldIO3r2ILHh1_BKH_U6BU",
  authDomain: "dkv-matrimony-e488c.firebaseapp.com",
  projectId: "dkv-matrimony-e488c",
  storageBucket: "dkv-matrimony-e488c.firebasestorage.app",
  messagingSenderId: "170111665714",
  appId: "1:170111665714:web:8d2fb9c7e735c1e2ac9e2b",
  measurementId: "G-K1XP0PJ71X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Set auth language to English
auth.languageCode = 'en';

// For development, disable app verification
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  try {
    // @ts-ignore - accessing private property for testing
    auth.settings.appVerificationDisabledForTesting = true;
  } catch (e) {
    console.log('Could not disable app verification:', e);
  }
}

let confirmationResultGlobal = null;
let recaptchaVerifier = null;

// Initialize RecaptchaVerifier
const getRecaptchaVerifier = () => {
  if (!recaptchaVerifier) {
    try {
      // Create invisible recaptcha
      recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: (response) => {
          console.log('reCAPTCHA solved');
        },
        'expired-callback': () => {
          console.log('reCAPTCHA expired');
        }
      });
    } catch (error) {
      console.error('Error creating RecaptchaVerifier:', error);
    }
  }
  return recaptchaVerifier;
};

// Send OTP to phone
export const sendOTP = async (phoneNumber) => {
  try {
    // Clean and validate phone number
    let formattedPhone = phoneNumber.trim();
    
    // Ensure phone number starts with +
    if (!formattedPhone.startsWith('+')) {
      return {
        success: false,
        message: 'Phone number must start with country code (e.g., +1 555-0100)',
      };
    }
    
    // Remove any spaces from phone number
    formattedPhone = formattedPhone.replace(/\s+/g, '');
    
    console.log('Sending OTP to:', formattedPhone);

    // Get or create recaptcha verifier
    const verifier = getRecaptchaVerifier();
    
    // For testing on localhost, use Firebase testing phone numbers
    // Format: +1 555-0100 to +1 555-0199 (US testing numbers)
    // These numbers must be configured in Firebase Console
    
    const confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, verifier);

    // Store confirmation result globally
    confirmationResultGlobal = confirmationResult;
    window.confirmationResult = confirmationResult;
    
    console.log('OTP sent successfully');
    
    return {
      success: true,
      message: `OTP sent to ${formattedPhone}. ${window.location.hostname === 'localhost' ? 'Use testing code: 123456' : ''}`,
    };
  } catch (error) {
    console.error('Send OTP error:', error);
    
    // Reset recaptcha on error
    if (recaptchaVerifier) {
      recaptchaVerifier.clear();
      recaptchaVerifier = null;
    }
    
    // For development, provide helpful message
    if (window.location.hostname === 'localhost') {
      return {
        success: false,
        message: 'For local testing, use Firebase testing numbers: +1 555-0100 to +1 555-0199 with OTP code 123456. Make sure these are configured in Firebase Console.',
      };
    }
    
    return {
      success: false,
      message: error.message || 'Failed to send OTP. Check the phone number format (e.g., +1 5550100).',
    };
  }
};

// Verify OTP
export const verifyOTPCode = async (code) => {
  try {
    const confirmationResult = confirmationResultGlobal || window.confirmationResult;
    
    if (!confirmationResult) {
      throw new Error('No confirmation result found. Please send OTP first.');
    }

    const result = await confirmationResult.confirm(code);
    
    console.log('OTP verified successfully');
    
    return {
      success: true,
      user: result.user,
      idToken: await result.user.getIdToken(),
      message: 'Phone verified successfully',
    };
  } catch (error) {
    console.error('Verify OTP error:', error);
    return {
      success: false,
      message: error.message || 'Invalid OTP. Please try again.',
    };
  }
};

// Sign out
export const signOutUser = async () => {
  try {
    await auth.signOut();
    window.confirmationResult = null;
    confirmationResultGlobal = null;
  } catch (error) {
    console.error('Sign out error:', error);
  }
};

export { auth };
export default app;
