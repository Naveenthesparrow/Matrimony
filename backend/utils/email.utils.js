const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

// Send OTP email
exports.sendOTPEmail = async (email, otp, name = 'User') => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Verify Your Email - DKV Matrimony',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .otp-box { background: white; border: 2px dashed #667eea; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px; }
            .otp-code { font-size: 32px; font-weight: bold; color: #667eea; letter-spacing: 5px; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>DKV Matrimony</h1>
              <p>Trusted Matrimony for Devendra Kula Vellalar Community</p>
            </div>
            <div class="content">
              <h2>Hello ${name},</h2>
              <p>Thank you for joining DKV Matrimony! Please verify your email address using the OTP below:</p>
              <div class="otp-box">
                <div class="otp-code">${otp}</div>
              </div>
              <p><strong>This OTP is valid for 10 minutes.</strong></p>
              <p>If you didn't request this verification, please ignore this email.</p>
              <div class="footer">
                <p>© 2026 DKV Matrimony. All rights reserved.</p>
                <p>This is an automated email. Please do not reply.</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    };
    
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Email send error:', error);
    return false;
  }
};

// Send welcome email
exports.sendWelcomeEmail = async (email, name) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Welcome to DKV Matrimony!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to DKV Matrimony!</h1>
            </div>
            <div class="content">
              <h2>Hello ${name},</h2>
              <p>We're excited to have you join our trusted matrimony platform for the Devendra Kula Vellalar Community!</p>
              <p>Your profile is currently under review. Once approved by our team, you'll be able to:</p>
              <ul>
                <li>Browse verified profiles</li>
                <li>Send and receive interests</li>
                <li>Connect with potential matches</li>
                <li>Use our secure messaging system</li>
              </ul>
              <p>Please complete your profile to increase your chances of finding the perfect match.</p>
              <a href="${process.env.FRONTEND_URL}/dashboard" class="button">Complete Your Profile</a>
              <p>If you have any questions, feel free to contact our support team.</p>
              <p>Best wishes in your search!</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };
    
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Email send error:', error);
    return false;
  }
};

// Send profile approval email
exports.sendProfileApprovalEmail = async (email, name, approved) => {
  try {
    const transporter = createTransporter();
    
    const status = approved ? 'Approved' : 'Rejected';
    const message = approved
      ? 'Congratulations! Your profile has been approved. You can now start connecting with other members.'
      : 'Unfortunately, your profile could not be approved. Please contact support for more information.';
    
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `Profile ${status} - DKV Matrimony`,
      html: `
        <!DOCTYPE html>
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2>Hello ${name},</h2>
            <p>${message}</p>
            ${approved ? `<a href="${process.env.FRONTEND_URL}/profiles" style="display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0;">Browse Profiles</a>` : ''}
            <p>Thank you,<br>DKV Matrimony Team</p>
          </div>
        </body>
        </html>
      `,
    };
    
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Email send error:', error);
    return false;
  }
};
