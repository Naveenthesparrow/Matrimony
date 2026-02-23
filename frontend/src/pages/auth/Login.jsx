import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiLock } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import { useTranslation } from '../../context/TranslationContext';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';
import PhoneInputField from '../../components/common/PhoneInputField';

const Login = () => {
  const navigate = useNavigate();
  const { login, googleLogin, isLoading } = useAuthStore();
  const { t, language } = useTranslation();
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
  });
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.phone, formData.password);
      navigate('/dashboard');
    } catch (error) {
      // Error handled by store
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
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {t.auth?.login?.title || "Welcome Back"}
            </h1>
            <p className="text-gray-600">
              {t.auth?.login?.subtitle || "Login to your account"}
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <PhoneInputField
              label={language === 'ta' ? 'தொலைபேசி எண்' : 'Phone Number'}
              name="phone"
              placeholder={language === 'ta' ? 'உங்கள் தொலைபேசி எண்ணை உள்ளிடவும்' : 'Enter your phone number'}
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            
            <Input
              label={t.auth?.login?.password || "Password"}
              name="password"
              type="password"
              placeholder={t.auth?.login?.password || "Enter your password"}
              icon={FiLock}
              required
              value={formData.password}
              onChange={handleChange}
            />
            
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="rounded text-primary-600 mr-2" />
                <span className="text-sm text-gray-600">{t.auth?.login?.rememberMe || "Remember me"}</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                {t.auth?.login?.forgotPassword || "Forgot Password?"}
              </Link>
            </div>
            
            <Button
              type="submit"
              fullWidth
              size="lg"
              loading={isLoading}
            >
              {language === 'ta' ? 'உள்நுழைய' : 'Login'}
            </Button>
          </form>
          
          <div className="my-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">
                  {language === 'ta' ? 'அல்லது' : 'Or continue with'}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={googleLogin}
            type="button"
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all"
          >
            <FcGoogle className="w-6 h-6" />
            {language === 'ta' ? 'Google மூலம் உள்நுழைய' : 'Sign in with Google'}
          </button>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {language === 'ta' ? 'கணக்கு இல்லையா?' : "Don't have an account?"}{' '}
              <Link to="/register" className="text-primary-600 hover:text-primary-700 font-semibold">
                {language === 'ta' ? 'இப்போது பதிவு செய்யுங்கள்' : 'Register Now'}
              </Link>
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
