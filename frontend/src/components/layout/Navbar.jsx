import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X, User, Heart, LogOut, Settings, Globe, UserPlus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import { useTranslation } from '../../context/TranslationContext';
import Button from '../common/Button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const { language, toggleLanguage, t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsProfileOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? 'bg-white shadow-lg border-b border-gray-100'
        : 'bg-white/95 backdrop-blur-sm'
      }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20 gap-8 lg:gap-12">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group flex-shrink-0">
            <motion.div
              className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-500 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <Heart className="w-6 h-6 text-white" fill="currentColor" />
            </motion.div>
            <div className="hidden sm:block">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 whitespace-nowrap">
                DKV<span className="text-primary-600">Matrimony</span>
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8 flex-shrink-0">
            <Link
              to="/profiles"
              className="text-gray-700 hover:text-primary-600 font-medium text-base transition-colors whitespace-nowrap"
            >
              {t.common.browseProfiles}
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-primary-600 font-medium text-base transition-colors whitespace-nowrap"
            >
              {t.footer.about}
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-primary-600 font-medium text-base transition-colors whitespace-nowrap"
            >
              {t.footer.contact}
            </Link>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all text-gray-700 font-medium whitespace-nowrap"
            >
              <Globe className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm">{language === 'en' ? 'தமிழ்' : 'EN'}</span>
            </button>

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-primary-50 hover:bg-primary-100 transition-all"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-500 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-sm">
                    {user?.profile?.fullName?.[0] || user?.phone?.[0] || 'U'}
                  </div>
                  <span className="font-semibold text-gray-700">{user?.profile?.fullName?.split(' ')[0] || 'User'}</span>
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-3 w-64 bg-white border border-gray-200 rounded-xl shadow-xl py-2 overflow-hidden"
                    >
                      <Link
                        to="/dashboard"
                        className="flex items-center space-x-3 px-5 py-3 text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <Heart className="w-5 h-5 text-primary-600" />
                        <span>{t.common.dashboard}</span>
                      </Link>
                      {user?.role === 'admin' && (
                        <Link
                          to="/admin"
                          className="flex items-center space-x-3 px-5 py-3 text-gray-700 hover:bg-gray-50 transition-colors font-medium border-t border-gray-100"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <Settings className="w-5 h-5 text-primary-600" />
                          <span>Admin Panel</span>
                        </Link>
                      )}
                      <Link
                        to="/my-profile"
                        className="flex items-center space-x-3 px-5 py-3 text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <User className="w-5 h-5 text-primary-600" />
                        <span>{t.profile.myProfile}</span>
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center space-x-3 px-5 py-3 text-gray-700 hover:bg-gray-50 transition-colors border-t border-gray-100 font-medium"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <Settings className="w-5 h-5 text-primary-600" />
                        <span>{t.common.settings}</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-5 py-3 text-red-600 hover:bg-red-50 transition-colors border-t border-gray-100 font-medium"
                      >
                        <LogOut className="w-5 h-5" />
                        <span>{t.common.logoutBtn}</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login">
                  <button className="px-6 py-3 text-gray-700 font-semibold rounded-lg border-2 border-gray-200 hover:bg-gray-50 transition-all">
                    {t.common.loginBtn}
                  </button>
                </Link>
                <Link to="/register">
                  <button className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2">
                    <UserPlus className="w-5 h-5" />
                    {t.common.registerBtn}
                  </button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Language Toggle */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all"
            >
              <Globe className="w-5 h-5 text-gray-700" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t-2 border-royal-200 overflow-hidden"
            >
              <div className="px-4 py-6 space-y-3 backdrop-blur-xl bg-white/95">
                <Link
                  to="/profiles"
                  className="block px-5 py-3 text-gray-700 hover:bg-royal-50 hover:text-royal-700 rounded-xl transition-colors font-semibold text-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t.common.browseProfiles}
                </Link>
                <Link
                  to="/about"
                  className="block px-5 py-3 text-gray-700 hover:bg-royal-50 hover:text-royal-700 rounded-xl transition-colors font-semibold text-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t.footer.about}
                </Link>
                <Link
                  to="/contact"
                  className="block px-5 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors font-medium text-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t.footer.contact}
                </Link>

                <div className="pt-4 border-t border-gray-200 space-y-3">
                  {isAuthenticated ? (
                    <>
                      <Link
                        to="/dashboard"
                        className="block px-5 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors font-medium text-lg"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div className="flex items-center gap-3">
                          <Heart className="w-5 h-5 text-primary-600" />
                          {t.common.dashboard}
                        </div>
                      </Link>
                      {user?.role === 'admin' && (
                        <Link
                          to="/admin"
                          className="block px-5 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors font-medium text-lg"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <div className="flex items-center gap-3">
                            <Settings className="w-5 h-5 text-primary-600" />
                            Admin Panel
                          </div>
                        </Link>
                      )}
                      <Link
                        to="/my-profile"
                        className="block px-5 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors font-medium text-lg"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div className="flex items-center gap-3">
                          <User className="w-5 h-5 text-primary-600" />
                          {t.profile.myProfile}
                        </div>
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMenuOpen(false);
                        }}
                        className="w-full text-left px-5 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium text-lg"
                      >
                        <div className="flex items-center gap-3">
                          <LogOut className="w-5 h-5" />
                          {t.common.logoutBtn}
                        </div>
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/login">
                        <button className="w-full px-5 py-3 text-gray-700 font-semibold rounded-lg border-2 border-gray-200 hover:bg-gray-50 transition-all text-lg">
                          {t.common.loginBtn}
                        </button>
                      </Link>
                      <Link to="/register">
                        <button className="w-full px-5 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all text-lg flex items-center justify-center gap-2">
                          <UserPlus className="w-5 h-5" />
                          {t.common.registerBtn}
                        </button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
