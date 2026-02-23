import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Heart, MapPin, Briefcase, GraduationCap, User, Star, CheckCircle, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { useTranslation } from '../../context/TranslationContext';
import { useAuthStore } from '../../store/authStore';
import api from '../../services/api';
import Skeleton from '../../components/common/Skeleton';

const ProfileList = () => {
  const { t, language } = useTranslation();
  const { user } = useAuthStore();
  const [filters, setFilters] = useState({
    gender: '',
    minAge: '',
    maxAge: '',
    location: '',
  });
  const [savedProfiles, setSavedProfiles] = useState([]);
  const [realProfiles, setRealProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch real profiles
  useEffect(() => {
    const fetchProfiles = async () => {
      // Only fetch if user is approved or admin
      if (!user?.isProfileApproved && user?.role !== 'admin') {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await api.get('/profiles?limit=50');
        if (response.data.status === 'success') {
          setRealProfiles(response.data.data.profiles);
        }
      } catch (error) {
        console.error('Error fetching profiles:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchProfiles();
    }
  }, [user]);

  // Dummy profiles data with realistic information as fallback
  const dummyProfiles = [
    // ... (rest of the detailed profiles array)
    {
      id: 1,
      name: language === 'ta' ? 'பிரியா தேவி' : 'Priya Devi',
      age: 26,
      height: "5'4\"",
      location: language === 'ta' ? 'சென்னை, தமிழ்நாடு' : 'Chennai, Tamil Nadu',
      education: language === 'ta' ? 'எம்.பி.ஏ, அண்ணா பல்கலைக்கழகம்' : 'MBA, Anna University',
      occupation: language === 'ta' ? 'மென்பொருள் பொறியாளர்' : 'Software Engineer',
      company: 'TCS',
      about: language === 'ta' ? 'பாரம்பரிய மதிப்புகளுடன் குடும்ப சார்ந்த பெண். சமையலையும் வாசிப்பதையும் விரும்புகிறார்.' : 'Family-oriented girl with traditional values. Loves cooking and reading.',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      verified: true,
      religion: language === 'ta' ? 'இந்து' : 'Hindu',
      caste: language === 'ta' ? 'தேவேந்திர குல வெள்ளாளர்' : 'Devendra Kula Vellalar',
      motherTongue: language === 'ta' ? 'தமிழ்' : 'Tamil',
    },
    {
      id: 2,
      name: language === 'ta' ? 'கார்த்திக் ராஜா' : 'Karthik Raja',
      age: 29,
      height: "5'10\"",
      location: language === 'ta' ? 'மதுரை, தமிழ்நாடு' : 'Madurai, Tamil Nadu',
      education: language === 'ta' ? 'பி.டெக், ஐஐடி மெட்ராஸ்' : 'B.Tech, IIT Madras',
      occupation: language === 'ta' ? 'தரவு விஞ்ஞானி' : 'Data Scientist',
      company: 'Amazon',
      about: language === 'ta' ? 'தொழில்நுட்பம் மற்றும் இசையில் ஆர்வமுள்ளவர். ஒத்த மதிப்புகளைப் பகிர்ந்து கொள்ளும் வாழ்க்கைத் துணையைத் தேடுகிறார்.' : 'Passionate about technology and music. Looking for a life partner who shares similar values.',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      verified: true,
      religion: language === 'ta' ? 'இந்து' : 'Hindu',
      caste: language === 'ta' ? 'தேவேந்திர குல வெள்ளாளர்' : 'Devendra Kula Vellalar',
      motherTongue: language === 'ta' ? 'தமிழ்' : 'Tamil',
    },
    {
      id: 3,
      name: language === 'ta' ? 'லட்சுமி பிரியா' : 'Lakshmi Priya',
      age: 24,
      height: "5'3\"",
      location: language === 'ta' ? 'கோயம்புத்தூர், தமிழ்நாடு' : 'Coimbatore, Tamil Nadu',
      education: language === 'ta' ? 'எம்.பி.பி.எஸ், மெட்ராஸ் மருத்துவக் கல்லூரி' : 'MBBS, Madras Medical College',
      occupation: language === 'ta' ? 'மருத்துவர்' : 'Doctor',
      company: language === 'ta' ? 'அப்பல்லோ மருத்துவமனைகள்' : 'Apollo Hospitals',
      about: language === 'ta' ? 'அக்கறையுள்ள இயல்புடன் அர்ப்பணிப்புள்ள மருத்துவ நிபுணர். குடும்ப பாரம்பரியங்களை மதிக்கிறார்.' : 'Dedicated medical professional with a caring nature. Values family traditions.',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      verified: true,
      religion: language === 'ta' ? 'இந்து' : 'Hindu',
      caste: language === 'ta' ? 'தேவேந்திர குல வெள்ளாளர்' : 'Devendra Kula Vellalar',
      motherTongue: language === 'ta' ? 'தமிழ்' : 'Tamil',
    },
    {
      id: 4,
      name: language === 'ta' ? 'செந்தில் குமார்' : 'Senthil Kumar',
      age: 31,
      height: "5'11\"",
      location: language === 'ta' ? 'திருநெல்வேலி, தமிழ்நாடு' : 'Tirunelveli, Tamil Nadu',
      education: language === 'ta' ? 'எம்.எஸ், அமெரிக்கா' : 'MS, USA',
      occupation: language === 'ta' ? 'தயாரிப்பு மேலாளர்' : 'Product Manager',
      company: 'Google',
      about: language === 'ta' ? 'கலிபோர்னியாவில் பணிபுரியும் வெளிநாட்டு இந்தியர். பாரம்பரிய மதிப்புகள் மற்றும் நவீன கண்ணோட்டம் கொண்ட துணையைத் தேடுகிறார்.' : 'NRI working in California. Looking for a partner with traditional values and modern outlook.',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
      verified: true,
      religion: language === 'ta' ? 'இந்து' : 'Hindu',
      caste: language === 'ta' ? 'தேவேந்திர குல வெள்ளாளர்' : 'Devendra Kula Vellalar',
      motherTongue: language === 'ta' ? 'தமிழ்' : 'Tamil',
    },
    {
      id: 5,
      name: language === 'ta' ? 'மீனாட்சி' : 'Meenakshi',
      age: 27,
      height: "5'5\"",
      location: language === 'ta' ? 'சேலம், தமிழ்நாடு' : 'Salem, Tamil Nadu',
      education: language === 'ta' ? 'சி.ஏ, ஐசிஏஐ' : 'CA, ICAI',
      occupation: language === 'ta' ? 'பட்டயக் கணக்காளர்' : 'Chartered Accountant',
      company: 'Deloitte',
      about: language === 'ta' ? 'வேலை-வாழ்க்கை சமநிலையில் நம்பிக்கை கொண்ட சுதந்திரமான தொழில் வல்லுநர். பயணம் செய்வதை விரும்புகிறார்.' : 'Independent professional who believes in work-life balance. Loves traveling.',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
      verified: true,
      religion: language === 'ta' ? 'இந்து' : 'Hindu',
      caste: language === 'ta' ? 'தேவேந்திர குல வெள்ளாளர்' : 'Devendra Kula Vellalar',
      motherTongue: language === 'ta' ? 'தமிழ்' : 'Tamil',
    },
    {
      id: 6,
      name: language === 'ta' ? 'முருகன்' : 'Murugan',
      age: 28,
      height: "5'9\"",
      location: language === 'ta' ? 'திருச்சி, தமிழ்நாடு' : 'Trichy, Tamil Nadu',
      education: language === 'ta' ? 'பி.இ., பி.எஸ்.ஜி டெக்' : 'B.E., PSG Tech',
      occupation: language === 'ta' ? 'சிவில் பொறியாளர்' : 'Civil Engineer',
      company: 'L&T',
      about: language === 'ta' ? 'கூட்டுக் குடும்பத்தைச் சேர்ந்த எளிமையான மற்றும் நேர்மையான நபர். பெரியவர்களையும் பாரம்பரியங்களையும் மதிக்கிறார்.' : 'Simple and honest person from a joint family. Respects elders and traditions.',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      verified: true,
      religion: language === 'ta' ? 'இந்து' : 'Hindu',
      caste: language === 'ta' ? 'தேவேந்திர குல வெள்ளாளர்' : 'Devendra Kula Vellalar',
      motherTongue: language === 'ta' ? 'தமிழ்' : 'Tamil',
    },
    {
      id: 7,
      name: language === 'ta' ? 'திவ்யா லட்சுமி' : 'Divya Lakshmi',
      age: 25,
      height: "5'4\"",
      location: language === 'ta' ? 'ஈரோடு, தமிழ்நாடு' : 'Erode, Tamil Nadu',
      education: language === 'ta' ? 'எம்.எஸ்சி., கணினி அறிவியல்' : 'M.Sc., Computer Science',
      occupation: language === 'ta' ? 'யூஎக்ஸ் வடிவமைப்பாளர்' : 'UX Designer',
      company: 'Zoho',
      about: language === 'ta' ? 'வடிவமைப்பில் கவனம் செலுத்தும் படைப்பாற்றல் நிபுணர். ஓவியம் வரைவதையும் கர்நாடக இசையையும் ரசிக்கிறார்.' : 'Creative professional with an eye for design. Enjoys painting and classical music.',
      photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
      verified: true,
      religion: language === 'ta' ? 'இந்து' : 'Hindu',
      caste: language === 'ta' ? 'தேவேந்திர குல வெள்ளாளர்' : 'Devendra Kula Vellalar',
      motherTongue: language === 'ta' ? 'தமிழ்' : 'Tamil',
    },
    {
      id: 8,
      name: language === 'ta' ? 'அருண் பிரசாத்' : 'Arun Prasad',
      age: 30,
      height: "6'0\"",
      location: language === 'ta' ? 'தஞ்சாவூர், தமிழ்நாடு' : 'Thanjavur, Tamil Nadu',
      education: language === 'ta' ? 'எம்.பி.ஏ, ஐஐஎம் பெங்களூர்' : 'MBA, IIM Bangalore',
      occupation: language === 'ta' ? 'முதலீட்டு வங்கியாளர்' : 'Investment Banker',
      company: language === 'ta' ? 'எச்டிஎஃப்சி வங்கி' : 'HDFC Bank',
      about: language === 'ta' ? 'கர்நாடக இசையில் ஆர்வமுள்ள நிதி நிபுணர். படித்த துணையைத் தேடுகிறார்.' : 'Finance professional with a passion for classical music. Looking for an educated partner.',
      photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
      verified: true,
      religion: language === 'ta' ? 'இந்து' : 'Hindu',
      caste: language === 'ta' ? 'தேவேந்திர குல வெள்ளாளர்' : 'Devendra Kula Vellalar',
    },
  ];

  const toggleSave = (id) => {
    setSavedProfiles(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const [displayProfiles, setDisplayProfiles] = useState([]);

  // Filter profiles whenever realProfiles, filters, or language changes
  useEffect(() => {
    let sourceData = realProfiles.length > 0 ? realProfiles.map(u => ({
      id: u._id,
      name: u.fullName || u.profile?.fullName || (language === 'ta' ? 'பெயர் இல்லை' : 'No Name'),
      age: parseInt(u.profile?.age) || 0,
      gender: u.profile?.gender || '',
      height: u.profile?.height || 'N/A',
      location: u.profile?.city ? `${u.profile.city}, ${u.profile.state}` : (language === 'ta' ? 'குறிப்பிடப்படவில்லை' : 'Not specified'),
      education: u.profile?.highestEducation || 'N/A',
      occupation: u.profile?.occupation || 'N/A',
      company: u.profile?.company || '',
      photo: u.profile?.profilePhoto || 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400',
      verified: u.isProfileApproved || u.communityCertificate?.verified,
      premium: u.isPremium || false,
      caste: u.profile?.caste || (language === 'ta' ? 'சமூகம்' : 'Community'),
    })) : dummyProfiles;

    const filtered = sourceData.filter(profile => {
      const matchGender = !filters.gender ||
        (filters.gender === 'bride' && profile.gender === 'Female') ||
        (filters.gender === 'groom' && profile.gender === 'Male');

      const matchMinAge = !filters.minAge || profile.age >= parseInt(filters.minAge);
      const matchMaxAge = !filters.maxAge || profile.age <= parseInt(filters.maxAge);
      const matchLocation = !filters.location ||
        profile.location.toLowerCase().includes(filters.location.toLowerCase());

      return matchGender && matchMinAge && matchMaxAge && matchLocation;
    });

    setDisplayProfiles(filtered);
  }, [realProfiles, filters, language, dummyProfiles]);

  return (
    <div className="min-h-screen bg-gray-50/50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {language === 'ta' ? 'சுயவிவரங்களைப் பார்க்க' : 'Browse Profiles'}
          </h1>
          <p className="text-gray-600">{language === 'ta' ? 'உங்களுக்கான சரியான வாழ்க்கைத் துணையைத் தேடுங்கள்' : 'Discover your perfect match from our verified profiles'}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Filters Sidebar - Collapsible on mobile, fixed on desktop */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 sticky top-24">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
                <Filter className="w-5 h-5 text-rose-600" />
                <h2 className="text-lg font-bold text-gray-900">{language === 'ta' ? 'வடிகட்டிகள்' : 'Filter Profiles'}</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{language === 'ta' ? 'பாலினம்' : 'I\'m looking for'}</label>
                  <select
                    value={filters.gender}
                    onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all"
                  >
                    <option value="">{language === 'ta' ? 'எல்லாம்' : 'All Profiles'}</option>
                    <option value="bride">{language === 'ta' ? 'மணப்பெண்' : 'Bride (Female)'}</option>
                    <option value="groom">{language === 'ta' ? 'மணமகன்' : 'Groom (Male)'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{language === 'ta' ? 'வயது வரம்பு' : 'Age Range'}</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minAge}
                      onChange={(e) => setFilters({ ...filters, minAge: e.target.value })}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:ring-2 focus:ring-rose-500 outline-none transition-all"
                    />
                    <span className="text-gray-400">-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxAge}
                      onChange={(e) => setFilters({ ...filters, maxAge: e.target.value })}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:ring-2 focus:ring-rose-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{language === 'ta' ? 'இடம்' : 'Location'}</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder={language === 'ta' ? 'நகரம்' : 'City, State'}
                      value={filters.location}
                      onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:ring-2 focus:ring-rose-500 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Active filters summary could go here */}

                <button
                  onClick={() => setFilters({ gender: '', minAge: '', maxAge: '', location: '' })}
                  className="w-full py-2.5 text-sm font-semibold text-rose-600 bg-rose-50 rounded-lg hover:bg-rose-100 transition-colors"
                >
                  {language === 'ta' ? 'அனைத்து வடிகட்டிகளையும் அழி' : 'Reset All Filters'}
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-9">
            {(!user?.isProfileApproved && user?.role !== 'admin') ? (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
                <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-rose-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {language === 'ta' ? 'சுயவிவரங்களை அணுகச் சரிபார்க்கவும்' : 'Profile Access Restricted'}
                </h2>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">
                  {language === 'ta' ? 'முழு விவரங்களையும் புகைப்படங்களையும் பார்க்க உங்கள் கணக்கை சரிபார்க்கவும்.' : 'Please verify your community certificate to unlock full profile access and connect with matches.'}
                </p>
                <Link to="/dashboard/my-profile">
                  <Button variant="primary">
                    {language === 'ta' ? 'நிலையைச் சரிபார்க்கவும்' : 'Check Verification Status'}
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                  <span className="font-semibold text-gray-700">
                    {language === 'ta' ? 'காட்டுகிறது' : 'Showing'} <span className="text-rose-600">{displayProfiles.length}</span> {language === 'ta' ? 'சுயவிவரங்கள்' : 'Profiles'}
                  </span>
                  <div className="flex gap-2">
                    {/* Placeholder for Sort dropdown if needed later */}
                  </div>
                </div>

                {isLoading ? (
                  <div className="space-y-6">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col md:flex-row gap-6">
                        <Skeleton className="w-full md:w-64 h-64 rounded-lg" />
                        <div className="flex-1 space-y-4 py-2">
                          <Skeleton className="h-8 w-1/2" />
                          <div className="grid grid-cols-2 gap-4">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                          </div>
                          <Skeleton className="h-20 w-full" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {displayProfiles.map((profile) => (
                      <motion.div
                        key={profile.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className="bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-200 overflow-hidden transition-all duration-300 group md:h-72"
                      >
                        <div className="flex flex-col md:flex-row h-full">
                          {/* Left: Photo Section */}
                          <div className="md:w-72 md:min-w-[18rem] relative bg-gray-100 h-64 md:h-full">
                            <Link to={`/profile/${profile.id}`}>
                              <img
                                src={`${(profile.profilePhoto || profile.photo || 'https://images.unsplash.com/photo-1511367461989-f85a21fda167').split('?')[0]}?w=600&q=80`}
                                alt={profile.name}
                                className="w-full h-64 md:h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                loading="lazy"
                              />
                            </Link>
                            {/* Overlay Gradient on mobile only */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden" />

                            {/* Verified Badge */}
                            {profile.verified && (
                              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md shadow-sm flex items-center gap-1.5">
                                <CheckCircle className="w-3.5 h-3.5 text-blue-500 fill-blue-500" />
                                <span className="text-xs font-bold text-gray-800 tracking-wide uppercase">Verified</span>
                              </div>
                            )}

                            {/* Membership Badge (Desktop) */}
                            {profile.premium && (
                              <div className="hidden md:flex absolute top-3 right-3 bg-amber-100 text-amber-800 px-2 py-1 rounded-md text-xs font-bold items-center gap-1">
                                <Star className="w-3 h-3 fill-current" /> Premium
                              </div>
                            )}
                          </div>

                          {/* Middle: Content Section */}
                          <div className="flex-1 p-5 md:p-6 flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-start mb-4">
                                <div>
                                  <Link to={`/profile/${profile.id}`} className="group-hover:text-rose-600 transition-colors">
                                    <h3 className="text-2xl font-bold text-gray-800 leading-tight mb-1">{profile.name}</h3>
                                  </Link>
                                  <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <span>ID: <span className="font-mono font-medium text-gray-700">DKV{profile.id.toString().slice(-4).padStart(4, '0')}</span></span>
                                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                    <span className="text-green-600 font-medium flex items-center gap-1">
                                      <span className="w-2 h-2 rounded-full bg-green-500"></span> Online now
                                    </span>
                                  </div>
                                </div>
                                {/* Mobile Action Actions (Heart) */}
                                <button className="md:hidden p-2 bg-rose-50 text-rose-600 rounded-full">
                                  <Heart className="w-5 h-5" />
                                </button>
                              </div>

                              <div className="grid grid-cols-2 gap-y-3 gap-x-8 mb-6">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center shrink-0">
                                    <User className="w-4 h-4 text-rose-500" />
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Age / Height</p>
                                    <p className="text-sm font-medium text-gray-900">{profile.age} Yrs, {profile.height}</p>
                                  </div>
                                </div>

                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center shrink-0">
                                    <Star className="w-4 h-4 text-rose-500" />
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Religion</p>
                                    <p className="text-sm font-medium text-gray-900">{profile.caste}</p>
                                  </div>
                                </div>

                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center shrink-0">
                                    <MapPin className="w-4 h-4 text-rose-500" />
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Location</p>
                                    <p className="text-sm font-medium text-gray-900 truncate max-w-[120px]">{profile.location}</p>
                                  </div>
                                </div>

                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center shrink-0">
                                    <Briefcase className="w-4 h-4 text-rose-500" />
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Profession</p>
                                    <p className="text-sm font-medium text-gray-900 truncate max-w-[120px]">{profile.occupation}</p>
                                  </div>
                                </div>
                              </div>

                              {/* Divider */}
                              <div className="h-px bg-gray-100 my-4" />

                              {/* Action Buttons Row */}
                              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                <Link to={`/profile/${profile.id}`} className="flex-1">
                                  <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-white border-2 border-rose-500 text-rose-600 rounded-lg font-bold hover:bg-rose-50 transition-colors">
                                    View Profile
                                  </button>
                                </Link>
                                <button
                                  onClick={() => toggleSave(profile.id)}
                                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-lg font-bold hover:from-rose-600 hover:to-pink-700 shadow-lg shadow-rose-200 transition-all transform active:scale-95"
                                >
                                  <Heart className={`w-4 h-4 ${savedProfiles.includes(profile.id) ? 'fill-current' : ''}`} />
                                  {savedProfiles.includes(profile.id) ? 'Interest Sent' : 'Send Interest'}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileList;
