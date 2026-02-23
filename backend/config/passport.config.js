const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User.model');

const hasValidGoogleCreds = () => {
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

const googleCallbackUrl = process.env.GOOGLE_CALLBACK_URL;

// Only configure Google OAuth if credentials are provided
if (hasValidGoogleCreds()) {
  // Configure Google OAuth Strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: googleCallbackUrl,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Check if user already exists
          let user = await User.findOne({ googleId: profile.id });

          if (user) {
            // User exists, return user
            return done(null, user);
          }

          // Check if user with same email exists
          if (profile.emails && profile.emails.length > 0) {
            user = await User.findOne({ email: profile.emails[0].value });
            
            if (user) {
              // Link Google account to existing user
              user.googleId = profile.id;
              user.isEmailVerified = true;
              user.isPhoneVerified = true; // Auto-verify for Google OAuth users
              await user.save();
              return done(null, user);
            }
          }

          // Create new user
          const newUser = await User.create({
            googleId: profile.id,
            email: profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null,
            fullName: profile.displayName,
            isEmailVerified: true,
            isPhoneVerified: true, // Auto-verify for Google OAuth users
            authProvider: 'google',
          });

          return done(null, newUser);
        } catch (error) {
          console.error('Google OAuth error:', error);
          return done(error, null);
        }
      }
    )
  );

  console.log('✅ Google OAuth configured');
} else {
  console.log('⚠️ Google OAuth not configured (missing credentials)');
}

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
