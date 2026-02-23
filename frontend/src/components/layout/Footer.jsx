import { Link } from 'react-router-dom';
import { 
  FiHeart, FiMail, FiPhone, FiMapPin, 
  FiFacebook, FiTwitter, FiInstagram, FiLinkedin 
} from 'react-icons/fi';
import { useTranslation } from '../../context/TranslationContext';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-900 to-rose-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-rose-500 to-pink-600 rounded-lg flex items-center justify-center">
                <FiHeart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">{t.common.appName}</h3>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              {t.home.hero.subtitle}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-rose-500 transition-colors">
                <FiFacebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-rose-500 transition-colors">
                <FiTwitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-rose-500 transition-colors">
                <FiInstagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-rose-500 transition-colors">
                <FiLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">{t.footer.quickLinks}</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/profiles" className="text-sm hover:text-rose-500 transition-colors">
                  {t.common.browseProfiles}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm hover:text-rose-500 transition-colors">
                  {t.footer.about}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-rose-500 transition-colors">
                  {t.footer.contact}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">{t.footer.support}</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-sm hover:text-rose-500 transition-colors">
                  {t.footer.help}
                </Link>
              </li>
              <li>
                <Link to="/safety" className="text-sm hover:text-rose-500 transition-colors">
                  {t.footer.safety}
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm hover:text-rose-500 transition-colors">
                  {t.footer.faq}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm hover:text-rose-500 transition-colors">
                  {t.footer.privacy}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm hover:text-rose-500 transition-colors">
                  {t.footer.terms}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">{t.footer.contact}</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <FiMail className="w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{t.footer.email || "support@dkvmatrimony.com"}</span>
              </li>
              <li className="flex items-start space-x-3">
                <FiPhone className="w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{t.footer.phone || "+91 98765 43210"}</span>
              </li>
              <li className="flex items-start space-x-3">
                <FiMapPin className="w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{t.footer.address || "Tamil Nadu, India"}</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © {currentYear} {t.common.appName}. {t.footer.copyright}
            </p>
            <p className="text-sm text-gray-400">
              {t.footer.madeWith}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
