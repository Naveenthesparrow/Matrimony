import { motion } from 'framer-motion';
import { Heart, Zap, Shield, Users, CheckCircle, Star, Award, Clock, Sparkles, TrendingUp, UserCheck, Award as Medal, Users2, Globe2, Crown, BadgeCheck, Lock, Search, ArrowRight, Play, Quote, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import { useTranslation } from '../context/TranslationContext';

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Royal Hero Section with Banner */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Royal Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-royal-800 to-royal-900"></div>
          
          {/* Floating orbs */}
          <div className="absolute top-20 left-10 w-96 h-96 bg-royal-500/30 rounded-full mix-blend-overlay filter blur-3xl animate-blob"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-gold-400/20 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-primary-500/30 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-4000"></div>
          
          {/* Royal pattern overlay */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="container-royal relative z-10 py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white space-y-8"
            >
              {/* Premium Badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-gold-500/20 to-gold-400/20 backdrop-blur-xl border-2 border-gold-400/30 shadow-glow-gold"
              >
                <Crown className="w-6 h-6 text-gold-400" fill="currentColor" />
                <span className="font-bold text-gold-300 text-lg">Premium Matrimony Service</span>
              </motion.div>

              {/* Main Heading */}
              <div className="space-y-6">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-6xl md:text-7xl lg:text-8xl font-black leading-tight"
                >
                  <span className="text-white drop-shadow-2xl">Find Your</span>
                  <br />
                  <span className="bg-gradient-to-r from-gold-300 via-gold-400 to-gold-200 bg-clip-text text-transparent drop-shadow-2xl">Perfect Match</span>
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl md:text-3xl text-royal-100 font-light leading-relaxed"
                >
                  {t.home.hero.subtitle}
                </motion.p>
              </div>

              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex gap-3 p-2 bg-white/10 backdrop-blur-2xl rounded-2xl border-2 border-white/20"
              >
                <input
                  type="text"
                  placeholder="Search by Profile ID, Name..."
                  className="flex-1 px-6 py-4 bg-transparent text-white placeholder:text-royal-200 text-lg outline-none"
                />
                <button className="px-8 py-4 bg-gradient-to-r from-gold-400 to-gold-600 text-royal-900 rounded-xl font-bold text-lg hover:shadow-glow-gold transition-all duration-300 flex items-center gap-2 hover:scale-105">
                  <Search className="w-6 h-6" />
                  Search
                </button>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-6"
              >
                <Link to="/register">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-10 py-5 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 text-royal-900 rounded-2xl font-black text-xl shadow-glow-gold hover:shadow-2xl transition-all duration-500 flex items-center gap-3"
                  >
                    {t.home.hero.ctaJoin}
                    <ArrowRight className="w-6 h-6" />
                  </motion.button>
                </Link>
                <Link to="/profiles">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-10 py-5 bg-white/10 backdrop-blur-xl text-white border-2 border-white/30 rounded-2xl font-bold text-xl hover:bg-white/20 transition-all duration-500 flex items-center gap-3"
                  >
                    {t.home.hero.ctaBrowse}
                    <Play className="w-6 h-6" />
                  </motion.button>
                </Link>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-8 pt-8"
              >
                {[
                  { icon: BadgeCheck, number: '10K+', label: 'Verified', color: 'from-trust-400 to-trust-600' },
                  { icon: Crown, number: '5K+', label: 'Success', color: 'from-gold-400 to-gold-600' },
                  { icon: Shield, number: '100%', label: 'Secure', color: 'from-royal-400 to-royal-600' },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-luxury`}>
                      <stat.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <div className="text-3xl font-black text-white">{stat.number}</div>
                      <div className="text-sm text-royal-200 font-medium">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Banner */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative hidden lg:block"
            >
              {/* Main image placeholder with elegant design */}
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-gold-400/50 to-royal-500/50 rounded-3xl blur-2xl"></div>
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-luxury border-4 border-white/20 backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5">
                  {/* Elegant pattern overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center space-y-6 p-12">
                      <Crown className="w-32 h-32 text-gold-400 mx-auto opacity-40" fill="currentColor" />
                      <h3 className="text-4xl font-black text-white">Trusted by</h3>
                      <h2 className="text-6xl font-black gradient-text-gold">10,000+</h2>
                      <p className="text-2xl text-royal-100 font-semibold">Families</p>
                    </div>
                  </div>
                  
                  {/* Floating success badges */}
                  <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute top-10 right-10 px-6 py-4 bg-white/10 backdrop-blur-2xl rounded-2xl border-2 border-white/20"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-trust-400 to-trust-600 flex items-center justify-center">
                        <CheckCircle className="w-7 h-7 text-white" />
                      </div>
                      <div className="text-white">
                        <div className="font-black text-2xl">100%</div>
                        <div className="text-sm opacity-80">Verified</div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, 20, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute bottom-10 left-10 px-6 py-4 bg-white/10 backdrop-blur-2xl rounded-2xl border-2 border-white/20"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
                        <Star className="w-7 h-7 text-white" fill="currentColor" />
                      </div>
                      <div className="text-white">
                        <div className="font-black text-2xl">4.9/5</div>
                        <div className="text-sm opacity-80">Rating</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-8 h-12 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-gold-400"
            ></motion.div>
          </div>
        </motion.div>
      </section>

      {/* Features Section - Elegant Cards */}
      <section className="py-24 md:py-32 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
                {t.home.features.title}
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t.home.features.subtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: Shield, 
                title: t.home.features.verified.title, 
                desc: t.home.features.verified.desc,
                gradient: 'from-rose-500 to-pink-500'
              },
              { 
                icon: Heart, 
                title: t.home.features.trusted.title, 
                desc: t.home.features.trusted.desc,
                gradient: 'from-pink-500 to-purple-500'
              },
              { 
                icon: Zap, 
                title: t.home.features.smart.title, 
                desc: t.home.features.smart.desc,
                gradient: 'from-purple-500 to-indigo-500'
              },
              { 
                icon: Users, 
                title: t.home.features.support.title, 
                desc: t.home.features.support.desc,
                gradient: 'from-indigo-500 to-blue-500'
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-rose-100 to-purple-100 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative p-8 bg-white rounded-3xl shadow-xl border border-gray-100 hover:border-transparent transition-all duration-300">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Modern Timeline */}
      <section className="py-24 md:py-32 px-4 bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
                {t.home.howItWorks.title}
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t.home.howItWorks.subtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: t.home.howItWorks.step1.title, icon: Users, desc: t.home.howItWorks.step1.desc, color: 'rose' },
              { step: '02', title: t.home.howItWorks.step2.title, icon: Shield, desc: t.home.howItWorks.step2.desc, color: 'pink' },
              { step: '03', title: t.home.howItWorks.step3.title, icon: Heart, desc: t.home.howItWorks.step3.desc, color: 'purple' },
              { step: '04', title: t.home.howItWorks.step4.title, icon: Star, desc: t.home.howItWorks.step4.desc, color: 'indigo' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative"
              >
                <div className="text-center bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 relative overflow-hidden group">
                  {/* Step Number */}
                  <div className="absolute top-6 right-6 text-6xl font-bold text-gray-100 group-hover:text-gray-200 transition-colors">
                    {item.step}
                  </div>
                  
                  {/* Icon */}
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br from-${item.color}-400 to-${item.color}-600 flex items-center justify-center mx-auto mb-6 shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 relative z-10`}>
                    <item.icon className="w-10 h-10 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 text-gray-800 relative z-10">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed relative z-10">{item.desc}</p>
                </div>
                
                {/* Connecting Line */}
                {i < 3 && (
                  <div className={`hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-${item.color}-300 to-${item.color}-200 transform -translate-y-1/2 z-0`}>
                    <div className={`absolute right-0 w-2 h-2 rounded-full bg-${item.color}-400 transform translate-x-1/2 -translate-y-1/2`}></div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats - Premium Design */}
      <section className="py-20 md:py-28 px-4 bg-gradient-to-br from-rose-600 via-pink-600 to-purple-700 text-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-4">Our Success Speaks</h2>
            <p className="text-xl text-rose-100">Trusted by thousands of families across India</p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: t.home.hero.verifiedMembers.split(' ')[0], label: t.home.stats.activeMembers, icon: Users },
              { number: t.home.hero.successStories.split(' ')[0], label: t.home.stats.successStories, icon: Heart },
              { number: '98%', label: t.home.stats.verified, icon: Award },
              { number: '24/7', label: t.home.stats.support, icon: Clock },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: 'spring', stiffness: 100 }}
                className="text-center p-8 bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <stat.icon className="w-12 h-12 mx-auto mb-4 opacity-90" />
                <div className="text-5xl md:text-6xl font-bold mb-2">{stat.number}</div>
                <div className="text-rose-100 text-lg">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Elegant Design */}
      <section className="py-24 md:py-32 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-[3rem] overflow-hidden shadow-2xl"
          >
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600"></div>
            
            {/* Decorative Circles */}
            <div className="absolute inset-0">
              <div className="absolute top-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 left-10 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 text-center p-12 md:p-20 text-white">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
                className="inline-block mb-6"
              >
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto border-2 border-white/30">
                  <Heart className="w-10 h-10" fill="currentColor" />
                </div>
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
              >
                {t.home.cta.title}
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-xl md:text-2xl mb-10 opacity-90 max-w-2xl mx-auto leading-relaxed"
              >
                {t.home.cta.subtitle}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <Link to="/register">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}
                    whileTap={{ scale: 0.95 }}
                    className="px-12 py-5 bg-white text-rose-600 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-300"
                  >
                    {t.home.cta.button}
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
