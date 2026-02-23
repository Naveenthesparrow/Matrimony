import { motion } from 'framer-motion';
import { Heart, Shield, Users, CheckCircle, Star, Clock, UserCheck, Search, ArrowRight, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import { useTranslation } from '../context/TranslationContext';

const Home = () => {
  const { t, language } = useTranslation();

  const features = [
    { icon: Shield, title: t.home?.features?.verified?.title || "100% Verified Profiles", desc: t.home?.features?.verified?.desc || "All profiles are manually verified for authenticity" },
    { icon: UserCheck, title: t.home?.features?.trusted?.title || "Personalized Matching", desc: t.home?.features?.trusted?.desc || "Smart algorithm matches based on preferences" },
    { icon: Heart, title: t.home?.features?.privacy?.title || "Privacy Protected", desc: t.home?.features?.privacy?.desc || "Your data is secure and private" },
    { icon: Users, title: t.home?.features?.support?.title || "Family Values", desc: t.home?.features?.support?.desc || "Focus on traditional family values" },
  ];

  const stats = [
    { number: "10K+", label: language === 'ta' ? 'செயலில் உள்ள உறுப்பினர்கள்' : 'Active Members' },
    { number: "5K+", label: language === 'ta' ? 'வெற்றிக் கதைகள்' : 'Success Stories' },
    { number: "98%", label: language === 'ta' ? 'சரிபார்க்கப்பட்ட சுயவிவரங்கள்' : 'Verified Profiles' },
    { number: "15+", label: language === 'ta' ? 'அனுபவ ஆண்டுகள்' : 'Years Experience' },
  ];

  const testimonials = [
    { name: language === 'ta' ? 'பிரியா & ராஜ்' : 'Priya & Raj', text: language === 'ta' ? 'இந்த அற்புதமான தளத்தின் மூலம் நாங்கள் ஒருவரை ஒருவர் கண்டுபிடித்தோம். எங்கள் குடும்பங்கள் மிகவும் மகிழ்ச்சியாக உள்ளன!' : "We found each other through this amazing platform. Our families are very happy!", image: "👰🤵" },
    { name: language === 'ta' ? 'அஞ்சலி & விக்ரம்' : 'Anjali & Vikram', text: language === 'ta' ? 'பொருத்தம் சரியாக இருந்தது. எங்கள் வாழ்க்கைத் துணையைக் கண்டுபிடித்ததற்கு நன்றியுள்ளவர்களாக இருக்கிறோம்.' : "The matchmaking was perfect. We're grateful for finding our life partner.", image: "💑" },
    { name: language === 'ta' ? 'மீரா & அருண்' : 'Meera & Arun', text: language === 'ta' ? 'தொழில்முறை, நம்பகத்தன்மை, மற்றும் குடும்ப சார்ந்த. மிகவும் பரிந்துரைக்கப்படுகிறது!' : "Professional, trustworthy, and family-oriented. Highly recommended!", image: "❤️" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-orange-50">
      
      {/* Hero Section - Clean and Simple */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50 opacity-70"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                {t.home?.hero?.title || "Find Your Perfect Match"}
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
                {t.home?.hero?.subtitle || "Trusted by thousands of families to find meaningful relationships"}
              </p>
            </motion.div>

            {/* Search Box */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <select className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                    <option>{language === 'ta' ? 'வயது' : 'Age'}</option>
                    <option>18-25</option>
                    <option>26-30</option>
                    <option>31-35</option>
                    <option>36+</option>
                  </select>
                  <select className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                    <option>{language === 'ta' ? 'மதம்' : 'Religion'}</option>
                    <option>{language === 'ta' ? 'இந்து' : 'Hindu'}</option>
                    <option>{language === 'ta' ? 'முஸ்லிம்' : 'Muslim'}</option>
                    <option>{language === 'ta' ? 'கிறிஸ்தவர்' : 'Christian'}</option>
                    <option>{language === 'ta' ? 'மற்றவை' : 'Other'}</option>
                  </select>
                  <select className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                    <option>{language === 'ta' ? 'இடம்' : 'Location'}</option>
                    <option>{language === 'ta' ? 'சென்னை' : 'Chennai'}</option>
                    <option>{language === 'ta' ? 'மும்பை' : 'Mumbai'}</option>
                    <option>{language === 'ta' ? 'டெல்லி' : 'Delhi'}</option>
                    <option>{language === 'ta' ? 'பெங்களூர்' : 'Bangalore'}</option>
                  </select>
                </div>
                <Link to="/profiles">
                  <button className="w-full bg-gradient-to-r from-primary-600 to-primary-500 text-white py-4 rounded-xl font-semibold text-lg hover:from-primary-700 hover:to-primary-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
                    <Search className="w-5 h-5" />
                    {language === 'ta' ? 'சுயவிவரங்களைத் தேடு' : 'Search Profiles'}
                  </button>
                </Link>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link to="/register">
                <button className="px-8 py-4 bg-secondary-500 text-white rounded-xl font-semibold text-lg hover:bg-secondary-600 transition-all duration-300 shadow-md hover:shadow-lg">
                  {t.common?.registerBtn || "Register Free"}
                </button>
              </Link>
              <Link to="/about">
                <button className="px-8 py-4 bg-white text-gray-700 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-300 border-2 border-gray-200 shadow-md">
                  {language === 'ta' ? 'மேலும் அறிய' : 'Learn More'}
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-pink-500 via-pink-600 to-purple-600">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-white font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t.home?.features?.title || "Why Choose Us"}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t.home?.features?.subtitle || "We provide a safe, reliable, and family-oriented platform for finding your life partner"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center mb-6">
                  <feature.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-b from-white to-primary-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t.home?.howItWorks?.title || "How It Works"}</h2>
            <p className="text-xl text-gray-600">{t.home?.howItWorks?.subtitle || "Simple steps to find your perfect match"}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { step: "1", title: t.home?.howItWorks?.step1?.title || "Register Free", desc: t.home?.howItWorks?.step1?.desc || "Create your profile in minutes with basic details" },
              { step: "2", title: t.home?.howItWorks?.step2?.title || "Find Matches", desc: t.home?.howItWorks?.step2?.desc || "Browse verified profiles that match your preferences" },
              { step: "3", title: t.home?.howItWorks?.step3?.title || "Connect", desc: t.home?.howItWorks?.step3?.desc || "Connect with matches and start your journey together" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-lg">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{language === 'ta' ? 'வெற்றிக் கதைகள்' : 'Success Stories'}</h2>
            <p className="text-xl text-gray-600">{language === 'ta' ? 'உண்மையான ஜோடிகள், உண்மையான மகிழ்ச்சி' : 'Real couples, real happiness'}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-8 shadow-lg border border-primary-100"
              >
                <div className="text-6xl mb-4 text-center">{testimonial.image}</div>
                <div className="flex items-center gap-1 mb-4 justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent-400 text-accent-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <p className="text-primary-600 font-bold text-center">- {testimonial.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-500">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t.home?.cta?.title || "Ready to Find Your Life Partner?"}
            </h2>
            <p className="text-xl text-white/90 mb-8">
              {t.home?.cta?.subtitle || "Join thousands of happy couples who found their match through our platform"}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/register">
                <button className="px-10 py-5 bg-white text-primary-600 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center gap-2">
                  {language === 'ta' ? 'இலவசமாக தொடங்குங்கள்' : 'Get Started Free'}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link to="/contact">
                <button className="px-10 py-5 bg-transparent text-white border-2 border-white rounded-xl font-bold text-lg hover:bg-white/10 transition-all duration-300 flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  {t.common?.contact || "Contact Us"}
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Home;
