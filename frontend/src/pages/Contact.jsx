import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock } from 'lucide-react';
import { useState } from 'react';
import Button from '../components/common/Button';
import { useTranslation } from '../context/TranslationContext';

const Contact = () => {
  const { t, language } = useTranslation();
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', form);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-rose-50 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-100 text-rose-700 mb-6">
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm font-semibold">{language === 'ta' ? 'நாங்கள் உங்களுக்கு உதவ இருக்கிறோம்' : "We're Here to Help"}</span>
          </div>
          <h1 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
              {t.contact.title}
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t.contact.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800">{t.contact.getInTouch}</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow-md border border-gray-100">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-white">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">{t.contact.emailLabel}</h3>
                  <p className="text-gray-600">support@dkvmatrimony.com</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow-md border border-gray-100">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-white">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">{t.contact.phone}</h3>
                  <p className="text-gray-600">+91 98765 43210</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow-md border border-gray-100">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-white">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">{t.contact.address}</h3>
                  <p className="text-gray-600">{language === 'ta' ? 'தமிழ்நாடு, இந்தியா' : 'Tamil Nadu, India'}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow-md border border-gray-100">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-white">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">{language === 'ta' ? 'பணி நேரம்' : 'Working Hours'}</h3>
                  <p className="text-gray-600">{language === 'ta' ? 'திங்கள் - சனி: காலை 9:00 - மாலை 6:00' : 'Mon - Sat: 9:00 AM - 6:00 PM'}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.contact.name}</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition"
                  placeholder={t.contact.name}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.contact.email}</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition"
                  placeholder={t.contact.email}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.contact.subject}</label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition"
                  placeholder={t.contact.subject}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.contact.message}</label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition resize-none"
                  placeholder={t.contact.message}
                />
              </div>
              
              <Button variant="primary" size="lg" className="w-full">
                <Send className="w-5 h-5 mr-2" />
                {t.contact.sendBtn}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
