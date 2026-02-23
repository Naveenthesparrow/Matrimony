import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUpload } from 'react-icons/fi';
import { useAuthStore } from '../../store/authStore';
import { useTranslation } from '../../context/TranslationContext';
import { verifyOTPCode, sendOTP } from '../../services/firebase';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import api from '../../services/api';
import toast from 'react-hot-toast';

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading } = useAuthStore();
  const { language } = useTranslation();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpVerified, setOtpVerified] = useState(false);
  const [certificateFile, setCertificateFile] = useState(null);
  const [certificatePreview, setCertificatePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isVerifyingOTP, setIsVerifyingOTP] = useState(false);
  const inputRefs = useRef([]);
  const phone = location.state?.phone;
  const fullName = location.state?.fullName;
  const password = location.state?.password;

  // Format phone number for display (e.g., +91 1234567890)
  const formatPhoneDisplay = (phoneNumber) => {
    if (!phoneNumber) return '';

    // Remove all spaces first
    const cleaned = phoneNumber.replace(/\s/g, '');

    // Match pattern: +[country code][rest of number]
    const match = cleaned.match(/^(\+\d{1,3})(\d+)$/);
    if (match) {
      const countryCode = match[1]; // +91
      const number = match[2]; // 1234567890 or 6383935541

      // Format based on country code
      if (countryCode === '+91') {
        // Indian format: +91 XXXXXXXXXX (just space after country code)
        return `${countryCode} ${number}`;
      } else if (countryCode === '+1') {
        // US format: +1 XXXXXXXXXX
        return `${countryCode} ${number}`;
      } else {
        // Generic format: +XX XXXXX...
        return `${countryCode} ${number}`;
      }
    }

    return phoneNumber;
  };

  const handleResendOTP = async () => {
    if (!phone) {
      toast.error('Phone number missing. Please register again.');
      return;
    }

    try {
      toast.loading('Sending OTP...');
      const result = await sendOTP(phone);
      toast.dismiss();

      if (result.success) {
        toast.success(result.message);
        // Reset OTP input
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0].focus();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.dismiss();
      toast.error('Failed to resend OTP');
      console.error(error);
    }
  };

  const hasTriedAutoResend = useRef(false);

  useEffect(() => {
    if (!phone) {
      navigate('/register');
      return;
    }

    // Auto-resend OTP if session is missing (e.g. page refresh)
    if (!window.confirmationResult && !hasTriedAutoResend.current) {
      hasTriedAutoResend.current = true;
      toast.error('Session expired. Sending new OTP...');
      handleResendOTP();
    }
  }, [phone, navigate]);

  const handleChange = (index, value) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join('');

    if (otpString.length !== 6) {
      toast.error('Please enter complete OTP');
      return;
    }

    try {
      setIsVerifyingOTP(true);

      // Verify OTP with Firebase
      const result = await verifyOTPCode(otpString);

      if (result.success) {
        // OTP verified with Firebase
        // Clean phone number (remove everything except digits and +)
        const cleanPhone = phone.replace(/[^\d+]/g, '');

        try {
          // Now create user account in backend with Firebase info
          const registerResponse = await api.post('/auth/register-with-firebase', {
            phone: cleanPhone,
            password,
            fullName,
            firebaseIdToken: result.idToken,
          });

          if (registerResponse.data.status === 'success') {
            toast.success('OTP verified! Now upload your certificate');
            setOtpVerified(true);
          }
        } catch (registerError) {
          // If user already exists (e.g. registration succeeded but upload failed previously)
          const errorMsg = registerError.response?.data?.message || '';
          if (errorMsg.includes('already registered')) {
            console.log('User already registered, attempting login...');

            // Attempt to login to allow certificate upload
            try {
              const loginResponse = await api.post('/auth/login', {
                phone: cleanPhone,
                password
              });

              if (loginResponse.data.status === 'success') {
                toast.success('Verified! Please upload your certificate');
                setOtpVerified(true);
                // Note: We don't save token to store here because we want them to finish upload
                // API interceptor might need token, or we rely on cookie if backend sets it.
                // The `api` service likely handles token if response includes it, or we rely on cookie.
                if (loginResponse.data.token) {
                  // Manually set token if needed, or rely on future calls working if cookie based
                  // For now, assuming api instance or browser handles session.
                }
              }
            } catch (loginError) {
              toast.error('Phone number already registered. Please login.');
              navigate('/login');
            }
          } else {
            throw registerError;
          }
        }
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      toast.error(error.response?.data?.message || error.message || 'Error verifying OTP');
    } finally {
      setIsVerifyingOTP(false);
    }
  };



  const handleCertificateChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 50MB)
      if (file.size > 50 * 1024 * 1024) {
        toast.error(language === 'ta' ? 'கோப்பு 50 MB க்கும் குறைவாக இருக்க வேண்டும்' : 'File must be less than 50MB');
        return;
      }
      // Check file type
      const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        toast.error(language === 'ta' ? 'JPG, PNG அல்லது PDF கோப்பு மட்டுமே அனுமதிக்கப்படுகிறது' : 'Only JPG, PNG or PDF files are allowed');
        return;
      }
      setCertificateFile(file);
      // Show preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => setCertificatePreview(e.target.result);
        reader.readAsDataURL(file);
      } else {
        setCertificatePreview(`📄 ${file.name}`);
      }
    }
  };

  const handleCertificateSubmit = async (e) => {
    e.preventDefault();

    if (!certificateFile) {
      toast.error(language === 'ta' ? 'தயவுசெய்து சாமூக சான்றிதழ் அப்லோட் செய்யவும்' : 'Please upload community certificate');
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('communityCertificate', certificateFile);

      const response = await api.post('/auth/upload-certificate', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success(response.data.message);
      navigate('/dashboard');
    } catch (error) {
      const message = error.response?.data?.message || 'Error uploading certificate';
      toast.error(message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] gradient-bg flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card padding="lg">
          {!otpVerified ? (
            <>
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-3">
                  {language === 'ta' ? 'உங்கள் தொலைபேசி சரிபார்க்கவும்' : 'Verify Your Phone'}
                </h1>
                <p className="text-gray-600 mb-2">
                  {language === 'ta' ? 'நாங்கள் உங்களுக்கு 6-இலக்க OTP அனுப்பியுள்ளோம்' : "We've sent a 6-digit OTP to"}
                </p>
                <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg py-3 px-4 inline-block">
                  <p className="text-primary-600 font-bold text-xl tracking-wide">
                    {formatPhoneDisplay(phone)}
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="flex justify-center gap-3">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-500 transition-all"
                      autoFocus={index === 0}
                    />
                  ))}
                </div>

                <Button
                  type="submit"
                  fullWidth
                  size="lg"
                  loading={isLoading}
                >
                  {language === 'ta' ? 'OTP சரிபார்க்க' : 'Verify OTP'}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600 text-sm mb-2">
                  {language === 'ta' ? 'OTP பெறவில்லையா?' : "Didn't receive the OTP?"}
                </p>
                <button
                  onClick={handleResendOTP}
                  className="text-primary-600 hover:text-primary-700 font-semibold text-sm"
                >
                  {language === 'ta' ? 'OTP மீண்டும் அனுப்பவும்' : 'Resend OTP'}
                </button>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>{language === 'ta' ? 'குறிப்பு' : 'Note'}:</strong> {language === 'ta' ? 'OTP 10 நிமிடங்களுக்கு செல்லுபடியாகும்' : ' OTP is valid for 10 minutes.'}
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {language === 'ta' ? 'சரிபார்க்கப்பட்டது!' : 'Verified!'}
                </h1>
                <p className="text-gray-600">
                  {language === 'ta' ? 'இப்போது உங்கள் சாமூக சான்றிதழ் அப்லோட் செய்யவும்' : 'Now upload your community certificate'}
                </p>
              </div>

              <form onSubmit={handleCertificateSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-royal-900 mb-3">
                    {language === 'ta' ? 'சமூக சான்றிதழ்' : 'Community Certificate'}
                    <span className="text-red-500"> *</span>
                  </label>

                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-royal-500 transition-colors cursor-pointer bg-gray-50 hover:bg-royal-50/30">
                    <input
                      type="file"
                      id="certificate"
                      name="certificate"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleCertificateChange}
                      className="hidden"
                      required
                    />
                    <label htmlFor="certificate" className="cursor-pointer block">
                      {certificatePreview ? (
                        <div className="flex flex-col items-center gap-3">
                          {typeof certificatePreview === 'string' && certificatePreview.startsWith('data:') ? (
                            <img src={certificatePreview} alt="Certificate preview" className="h-32 object-contain rounded" />
                          ) : (
                            <div className="text-4xl">{certificatePreview}</div>
                          )}
                          <p className="text-sm text-gray-600">{certificateFile?.name}</p>
                          <p className="text-xs text-gray-500">
                            {language === 'ta' ? 'மாற்ற கிளிக் செய்யவும்' : 'Click to change'}
                          </p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-3">
                          <FiUpload className="w-8 h-8 text-gray-400" />
                          <div>
                            <p className="font-semibold text-gray-700">
                              {language === 'ta' ? 'சான்றிதழ்ஐ இங்கு வைக்கவும்' : 'Drop certificate here'}
                            </p>
                            <p className="text-sm text-gray-500">
                              {language === 'ta' ? 'அல்லது கிளிக் செய்து தேர்ந்தெடுக்கவும்' : 'or click to browse'}
                            </p>
                          </div>
                          <p className="text-xs text-gray-400">
                            {language === 'ta' ? 'JPG, PNG அல்லது PDF (அதிகபட்சம் 50MB)' : 'JPG, PNG or PDF (Max 50MB)'}
                          </p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>{language === 'ta' ? 'குறிப்பு' : 'Note'}:</strong> {language === 'ta' ? 'உங்கள் சான்றிதழ் நிர்வாகம் மூலம் சரிபார்க்கப்படும். இதற்கு சில மணிநேரம் ஆகலாம்।' : 'Your certificate will be verified by our admin team. This may take a few hours.'}
                  </p>
                </div>

                <Button
                  type="submit"
                  fullWidth
                  size="lg"
                  loading={isUploading}
                >
                  {language === 'ta' ? 'சான்றிதழ் அப்லோட் செய்யவும்' : 'Upload Certificate'}
                </Button>
              </form>
            </>
          )}
        </Card>

        {/* Invisible reCAPTCHA container for Firebase */}
        <div id="recaptcha-container"></div>
      </motion.div>
    </div>
  );
};

export default VerifyOTP;
