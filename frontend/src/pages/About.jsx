import { motion } from 'framer-motion';
import { Heart, Shield, Users, Award, Target, Eye, CheckCircle } from 'lucide-react';
import { useTranslation } from '../context/TranslationContext';

const About = () => {
  const { t, language } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-rose-50 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-100 text-rose-700 mb-6">
            <Heart className="w-4 h-4" fill="currentColor" />
            <span className="text-sm font-semibold">{language === 'ta' ? 'நம்பகமான திருமண சேவை' : 'Trusted Matrimony Service'}</span>
          </div>
          <h1 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
              {t.about.title}
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t.about.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-gray-100"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-rose-100 flex items-center justify-center">
              <Target className="w-6 h-6 text-rose-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">{t.about.mission.title}</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            {t.about.mission.desc}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-gray-100"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center">
              <Eye className="w-6 h-6 text-pink-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">{t.about.vision.title}</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            {t.about.vision.desc}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-rose-100 flex items-center justify-center">
              <Award className="w-6 h-6 text-rose-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">{t.about.values.title}</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 bg-rose-50 rounded-xl">
              <CheckCircle className="w-6 h-6 text-rose-600 flex-shrink-0" />
              <span className="text-gray-700">{t.about.values.trust}</span>
            </div>
            <div className="flex items-start gap-3 p-4 bg-pink-50 rounded-xl">
              <Shield className="w-6 h-6 text-pink-600 flex-shrink-0" />
              <span className="text-gray-700">{t.about.values.privacy}</span>
            </div>
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
              <Award className="w-6 h-6 text-gray-600 flex-shrink-0" />
              <span className="text-gray-700">{t.about.values.quality}</span>
            </div>
            <div className="flex items-start gap-3 p-4 bg-rose-50 rounded-xl">
              <Users className="w-6 h-6 text-rose-600 flex-shrink-0" />
              <span className="text-gray-700">{t.about.values.support}</span>
            </div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-gradient-to-r from-rose-500 via-pink-600 to-purple-600 rounded-3xl p-8 text-white"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-rose-100 text-sm">{language === 'ta' ? 'செயலில் உள்ள உறுப்பினர்கள்' : 'Active Members'}</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">5K+</div>
              <div className="text-rose-100 text-sm">{language === 'ta' ? 'வெற்றிக் கதைகள்' : 'Success Stories'}</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-rose-100 text-sm">{language === 'ta' ? 'சரிபார்க்கப்பட்ட சுயவிவரங்கள்' : 'Verified Profiles'}</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-rose-100 text-sm">{language === 'ta' ? 'அனுபவ ஆண்டுகள்' : 'Years Experience'}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
