import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiLock, FiUser } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import { useTranslation } from '../../context/TranslationContext';
import { sendOTP } from '../../services/firebase';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';
import PhoneInputField from '../../components/common/PhoneInputField';
import toast from 'react-hot-toast';

const Register = () => {
  const navigate = useNavigate();
  const { googleLogin } = useAuthStore();
  const { language } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoadingOTP, setIsLoadingOTP] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    password: '',
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (value) => {
    setFormData(prev => ({ ...prev, phone: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const fullNameTrimmed = formData.fullName.trim();
    const phoneTrimmed = formData.phone.trim();
    const passwordTrimmed = formData.password.trim();
    
    if (!fullNameTrimmed) {
      toast.error(language === 'ta' ? 'தயவுசெய்து உங்கள் பெயரை உள்ளிடவும்' : 'Please enter your full name');
      return;
    }
    
    if (!phoneTrimmed) {
      toast.error(language === 'ta' ? 'தயவுசெய்து தொலைபேசி எண்ணை உள்ளிடவும்' : 'Please enter your phone number');
      return;
    }
    
    if (phoneTrimmed.length < 10) {
      toast.error(language === 'ta' ? 'তৈধ তொலைபேసী సंख्या மदद करा' : 'Please enter a valid phone number');
      return;
    }
    
    if (!passwordTrimmed || passwordTrimmed.length < 6) {
      toast.error(language === 'ta' ? 'कुञ्जपद कम से कम 6 वर्ण होनी चाहिए' : 'Password must be at least 6 characters');
      return;
    }
    
    try {
      setIsLoadingOTP(true);
      toast.loading('Sending OTP...');
      
      // Send OTP via Firebase
      const result = await sendOTP(phoneTrimmed);
      
      toast.dismiss();
      
      if (result.success) {
        toast.success(result.message);
        // Navigate to OTP verification page
        navigate('/verify-otp', {
          state: {
            phone: phoneTrimmed,
            fullName: fullNameTrimmed,
            password: passwordTrimmed,
          },
        });
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.dismiss();
      toast.error(error.message || 'Error sending OTP');
    } finally {
      setIsLoadingOTP(false);
    }
  };
  
  return (
    <div className="min-h-[calc(100vh-4rem)] gradient-bg py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl mx-auto"
      >
        <Card padding="lg">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {language === 'ta' ? 'உங்கள் கணக்கை உருவாக்கவும்' : 'Create Your Account'}
            </h1>
            <p className="text-gray-600">
              {language === 'ta' ? 'எங்கள் சமூகத்தில் சேரவும்' : 'Join our matrimony community'}
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label={language === 'ta' ? 'முழு பெயர்' : 'Full Name'}
              name="fullName"
              type="text"
              placeholder={language === 'ta' ? 'உங்கள் முழு பெயர்' : 'Your full name'}
              icon={FiUser}
              required
              value={formData.fullName}
              onChange={handleChange}
            />
            
            <PhoneInputField
              label={language === 'ta' ? 'தொலைபேசி எண்' : 'Phone Number'}
              name="phone"
              placeholder={language === 'ta' ? 'உங்கள் தொலைபேசி எண்ணை உள்ளிடவும்' : 'Enter your phone number (e.g., +1 555-0100)'}
              required
              value={formData.phone}
              onChange={(e) => handlePhoneChange(e.target.value)}
            />
            
            <Input
              label={language === 'ta' ? 'கடவுச்சொல்' : 'Password'}
              name="password"
              type="password"
              placeholder={language === 'ta' ? 'குறைந்தது 6 எழுத்துக்கள்' : 'Min. 6 characters'}
              icon={FiLock}
              required
              value={formData.password}
              onChange={handleChange}
            />
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>{language === 'ta' ? 'குறிப்பு' : 'Note'}:</strong> {language === 'ta' ? 'பதிவு செய்த பிறகு உங்கள் தொலைபேசி எண்ணுக்கு OTP அனுப்பப்படும். பின்னர் சமூக சான்றிதழ் அப்லோட் செய்ய வேண்டும்' : 'After registration, OTP will be sent to your phone. Then you will upload your community certificate.'}
              </p>
            </div>
            
            <Button
              type="submit"
              fullWidth
              size="lg"
              loading={isLoadingOTP}
            >
              {language === 'ta' ? 'கணக்கை உருவாக்கு' : 'Create Account'}
            </Button>
          </form>
          
          <div className="my-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  {language === 'ta' ? 'அல்லது' : 'Or'}
                </span>
              </div>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            fullWidth
            size="lg"
            onClick={googleLogin}
            className="flex items-center justify-center gap-2"
          >
            <FcGoogle className="text-xl" />
            {language === 'ta' ? 'Google உடன் பதிவு செய்யவும்' : 'Sign up with Google'}
          </Button>

          <p className="text-center text-gray-600 mt-6">
            {language === 'ta' ? 'ஏற்கனவே உள்ளீடு செய்தீர்களா?' : 'Already have an account?'}{' '}
            <Link to="/login" className="text-primary-600 hover:text-primary-700 font-semibold">
              {language === 'ta' ? 'உள்ளீடு செய்யவும்' : 'Sign in'}
            </Link>
          </p>
        </Card>
        
        {/* Invisible reCAPTCHA container for Firebase */}
        <div id="recaptcha-container"></div>
      </motion.div>
    </div>
  );
};

export default Register;
