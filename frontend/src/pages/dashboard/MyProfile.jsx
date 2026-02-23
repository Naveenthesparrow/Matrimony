import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User, MapPin, GraduationCap, Briefcase,
  Heart, Users, Coffee, Edit3, CheckCircle,
  AlertCircle, Clock, ShieldCheck, Info
} from 'lucide-react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import { useTranslation } from '../../context/TranslationContext';
import { useAuthStore } from '../../store/authStore';

const MyProfile = () => {
  const { language } = useTranslation();
  const { user } = useAuthStore();

  const profile = user?.profile || {};
  const certificate = user?.communityCertificate;
  const isVerified = certificate?.verified;
  const hasUploaded = !!certificate?.url;
  const certificateStatus = isVerified ? (language === 'ta' ? 'சரிபார்க்கப்பட்டது' : 'Verified') : (hasUploaded ? (language === 'ta' ? 'பரிசீலனையில் உள்ளது' : 'Under Review') : (language === 'ta' ? 'பதிவேற்றப்படவில்லை' : 'Pending Upload'));

  const completeness = profile.profileCompleteness || 0;

  const detailSections = [
    {
      title: language === 'ta' ? 'அடிப்படை விவரங்கள்' : 'Basic Details',
      icon: User,
      details: [
        { label: language === 'ta' ? 'வயது' : 'Age', value: profile.age },
        { label: language === 'ta' ? 'உயரம்' : 'Height', value: profile.height },
        { label: language === 'ta' ? 'திருமண நிலை' : 'Marital Status', value: profile.maritalStatus },
        { label: language === 'ta' ? 'உடல் நிலை' : 'Physical Status', value: profile.physicalStatus },
      ]
    },
    {
      title: language === 'ta' ? 'இருப்பிடம்' : 'Location',
      icon: MapPin,
      details: [
        { label: language === 'ta' ? 'நாடு' : 'Country', value: profile.country },
        { label: language === 'ta' ? 'மாநிலம்' : 'State', value: profile.state },
        { label: language === 'ta' ? 'நகரம்' : 'City', value: profile.city },
      ]
    },
    {
      title: language === 'ta' ? 'கல்வி மற்றும் பணி' : 'Education & Career',
      icon: GraduationCap,
      details: [
        { label: language === 'ta' ? 'படிப்பு' : 'Highest Education', value: profile.highestEducation },
        { label: language === 'ta' ? 'வேலை' : 'Occupation', value: profile.occupation },
        { label: language === 'ta' ? 'நிறுவனம்' : 'Employed In', value: profile.employedIn },
        { label: language === 'ta' ? 'ஆண்டு வருமானம்' : 'Annual Income', value: profile.annualIncome },
      ]
    },
    {
      title: language === 'ta' ? 'குடும்பம்' : 'Family',
      icon: Users,
      details: [
        { label: language === 'ta' ? 'தந்தை' : 'Father', value: profile.fatherName },
        { label: language === 'ta' ? 'தாய்' : 'Mother', value: profile.motherName },
        { label: language === 'ta' ? 'வகை' : 'Family Type', value: profile.familyType },
        { label: language === 'ta' ? 'மதிப்பீடுகள்' : 'Family Values', value: profile.familyValues },
      ]
    },
    {
      title: language === 'ta' ? 'மதம் மற்றும் கலாச்சாரம்' : 'Religious & Cultural',
      icon: Heart,
      details: [
        { label: language === 'ta' ? 'மதம்' : 'Religion', value: profile.religion },
        { label: language === 'ta' ? 'சாதி' : 'Caste', value: profile.caste },
        { label: language === 'ta' ? 'உட்சாதி' : 'Sub-Caste', value: profile.subCaste },
        { label: language === 'ta' ? 'கோத்திரம்' : 'Gothram', value: profile.gothram },
        { label: language === 'ta' ? 'தாய்மொழி' : 'Mother Tongue', value: profile.motherTongue },
        { label: language === 'ta' ? 'நட்சத்திரம்' : 'Star', value: profile.star },
        { label: language === 'ta' ? 'ராசி' : 'Rasi', value: profile.rasi },
      ]
    },
    {
      title: language === 'ta' ? 'பிறப்பு விவரங்கள்' : 'Birth Details',
      icon: Clock,
      details: [
        { label: language === 'ta' ? 'பிறந்த நேரம்' : 'Time of Birth', value: profile.timeOfBirth },
        { label: language === 'ta' ? 'பிறந்த இடம்' : 'Place of Birth', value: profile.placeOfBirth },
      ]
    },
    {
      title: language === 'ta' ? 'வாழ்க்கை முறை மற்றும் தோற்றம்' : 'Lifestyle & Appearance',
      icon: Coffee,
      details: [
        { label: language === 'ta' ? 'உணவு' : 'Diet', value: profile.diet },
        { label: language === 'ta' ? 'புகைப்பிடித்தல்' : 'Smoking', value: profile.smoking },
        { label: language === 'ta' ? 'மது அருந்துதல்' : 'Drinking', value: profile.drinking },
        { label: language === 'ta' ? 'நிறம்' : 'Complexion', value: profile.complexion },
        { label: language === 'ta' ? 'உடல் அமைப்பு' : 'Body Type', value: profile.bodyType },
      ]
    },
    {
      title: language === 'ta' ? 'சுயவிருப்பங்கள்' : 'Hobbies & Interests',
      icon: Heart,
      details: [
        { label: language === 'ta' ? 'சுயவிருப்பங்கள்' : 'Hobbies', value: profile.hobbies },
        { label: language === 'ta' ? 'ஆர்வங்கள்' : 'Interests', value: profile.interests },
      ]
    }
  ];

  return (
    <div className="max-w-5xl mx-auto pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-royal-900 mb-2">
            {language === 'ta' ? 'என் சுயவிவரம்' : 'My Profile'}
          </h1>
          <p className="text-gray-600 text-lg">
            {language === 'ta' ? 'உங்கள் தகவல்களைப் பார்த்து நிர்வகிக்கவும்' : 'Manage your personal information and profile settings'}
          </p>
        </div>
        <Link to="/edit-profile">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-xl font-bold shadow-lg shadow-rose-200 hover:shadow-xl hover:from-rose-600 hover:to-pink-700 transition-all">
              <Edit3 className="w-5 h-5" />
              {language === 'ta' ? 'சுயவிவரத்தைத் திருத்து' : 'Edit Profile'}
            </button>
          </motion.div>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Summary & Status */}
        <div className="lg:col-span-1 space-y-8">
          <Card padding="none" className="overflow-hidden">
            <div className="bg-gradient-to-br from-royal-600 to-royal-800 p-8 text-center text-white">
              <div className="w-32 h-32 mx-auto bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-4xl font-bold border-4 border-white/30 mb-4 shadow-xl">
                {user?.fullName?.charAt(0) || 'U'}
              </div>
              <h2 className="text-2xl font-bold mb-1">{user?.fullName}</h2>
              <p className="text-royal-100 text-sm mb-4">{user?.phone}</p>
              <div className="flex flex-wrap justify-center gap-2">
                <Badge variant={user?.isProfileApproved ? 'success' : 'warning'}>
                  {user?.isProfileApproved ? 'Verified Member' : 'Pending Approval'}
                </Badge>
              </div>
            </div>

            <div className="p-6 bg-white">
              <div className="mb-6">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm font-bold text-gray-700">{language === 'ta' ? 'சுயவிவரப் பூர்த்தி' : 'Profile Completeness'}</span>
                  <span className="text-2xl font-black text-royal-600">{completeness}%</span>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${completeness}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full rounded-full ${completeness > 80 ? 'bg-green-500' : completeness > 50 ? 'bg-royal-500' : 'bg-orange-500'}`}
                  />
                </div>
                {completeness < 100 && (
                  <p className="mt-3 text-xs text-gray-500 italic">
                    {language === 'ta' ? 'அதிக பொருத்தங்களைப் பெற உங்கள் சுயவிவரத்தை 100% பூர்த்தி செய்யுங்கள்' : 'Complete your profile to 100% to get 5x more matches!'}
                  </p>
                )}
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3 text-gray-700">
                  <div className={`p-2 rounded-lg ${isVerified ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {isVerified ? <ShieldCheck className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="text-sm font-bold">{language === 'ta' ? 'சமூக சான்றிதழ்' : 'Community Certificate'}</p>
                    <p className="text-xs text-gray-500">{isVerified ? 'Verified & Secured' : 'Action Required'}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Detailed Status Box */}
          <Card className="bg-royal-50/50 border-royal-100">
            <h3 className="font-bold text-royal-900 mb-4 flex items-center gap-2">
              <Info className="w-5 h-5" />
              {language === 'ta' ? 'அறிவிப்புகள்' : 'Quick Tips'}
            </h3>
            <ul className="space-y-3 text-sm text-royal-800">
              <li className="flex gap-2">
                <span className="min-w-4 h-4 rounded-full bg-royal-200 text-royal-700 flex items-center justify-center text-[10px] mt-0.5">1</span>
                {language === 'ta' ? 'உங்கள் புகைப்படத்தைப் பதிவேற்றவும்' : 'Add a clear profile photo to get noticed.'}
              </li>
              <li className="flex gap-2">
                <span className="min-w-4 h-4 rounded-full bg-royal-200 text-royal-700 flex items-center justify-center text-[10px] mt-0.5">2</span>
                {language === 'ta' ? 'வாழ்க்கைத் துணையின் எதிர்பார்ப்புகளை நிரப்பவும்' : 'Be specific in your about me section.'}
              </li>
            </ul>
          </Card>
        </div>

        {/* Right Column: Details Grid */}
        <div className="lg:col-span-2 space-y-8">
          {/* About Me Section */}
          <Card padding="lg">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Heart className="w-6 h-6 text-royal-500" />
              {language === 'ta' ? 'என்னைப்பற்றி' : 'About Me'}
            </h3>
            <p className="text-gray-700 leading-relaxed italic">
              {profile.aboutMe || (language === 'ta' ? 'இன்னும் தகவல்கள் சேர்க்கப்படவில்லை...' : 'No description provided yet. Click "Edit Profile" to add one.')}
            </p>
          </Card>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {detailSections.map((section, idx) => (
              <Card key={idx} padding="lg" className="hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-royal-600">
                    <section.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{section.title}</h3>
                </div>
                <div className="space-y-4">
                  {section.details.map((detail, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                      <span className="text-gray-500 text-sm">{detail.label}</span>
                      <span className="font-bold text-gray-900">{detail.value || '—'}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          {/* Certificate Preview (Compact) */}
          <Card padding="lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-green-500" />
                {language === 'ta' ? 'சமூக சான்றிதழ்' : 'Community Certificate'}
              </h3>
              <Badge variant={isVerified ? 'success' : (hasUploaded ? 'warning' : 'danger')}>
                {certificateStatus}
              </Badge>
            </div>

            {hasUploaded ? (
              <div className="bg-gray-50 rounded-2xl p-4 flex items-center justify-between border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-trust-500" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{certificate.filename}</p>
                    <p className="text-xs text-gray-500">Uploaded on {new Date(certificate.uploadedAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <a
                  href={certificate.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-royal-600 font-bold hover:bg-white rounded-lg transition-colors"
                >
                  {language === 'ta' ? 'பார்க்க' : 'View File'}
                </a>
              </div>
            ) : (
              <div className="p-8 text-center border-2 border-dashed border-gray-200 rounded-2xl">
                <AlertCircle className="w-10 h-10 text-orange-400 mx-auto mb-3" />
                <p className="text-gray-600 mb-4">{language === 'ta' ? 'சான்றிதழ் பதிவேற்றப்படவில்லை' : 'No certificate uploaded yet'}</p>
                <Link to="/onboarding">
                  <Button variant="outline" size="sm">Upload Now</Button>
                </Link>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
