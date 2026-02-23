import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Heart, MapPin, Briefcase, GraduationCap, User, Star, CheckCircle,
  Calendar, Ruler, Users, Phone, Mail, MessageCircle, ArrowLeft,
  Home, Globe, BookOpen, Award, Loader2, Info, Clock, Coffee
} from 'lucide-react';
import { useTranslation } from '../../context/TranslationContext';
import { useAuthStore } from '../../store/authStore';
import api from '../../services/api';
import Button from '../../components/common/Button';

const ProfileDetail = () => {
  const { id } = useParams();
  const { t, language } = useTranslation();
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('about');
  const [isInterestSent, setIsInterestSent] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [realProfile, setRealProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch real profile from API
  useEffect(() => {
    const fetchProfile = async () => {
      // Only fetch if user is approved or admin
      if (!user?.isProfileApproved && user?.role !== 'admin') {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await api.get(`/profiles/${id}`);
        if (response.data.status === 'success') {
          setRealProfile(response.data.data.user);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id && isNaN(id) && user) { // It's a MongoDB ID and user is loaded
      fetchProfile();
    } else if (user) {
      setIsLoading(false); // It's a dummy ID or user is loaded but ID invalid
    }
  }, [id, user]);

  // Dummy profiles data
  const allProfiles = {
    // ... (rest of the detailed profiles array)
    1: {
      id: 1,
      name: language === 'ta' ? 'பிரியா தேவி' : 'Priya Devi',
      age: 26,
      height: "5'4\"",
      weight: '54 kg',
      location: 'Chennai, Tamil Nadu',
      education: 'MBA, Anna University',
      occupation: 'Software Engineer',
      company: 'TCS',
      salary: '12 LPA',
      about: 'I am a family-oriented girl with traditional values and modern outlook. I believe in maintaining a balance between career and family. I enjoy cooking traditional Tamil cuisine, reading novels, and practicing yoga. Looking for a well-educated, caring life partner who respects family values.',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600',
      verified: true,
      religion: 'Hindu',
      caste: 'Devendra Kula Vellalar',
      subCaste: 'Pallar',
      motherTongue: 'Tamil',
      maritalStatus: 'Never Married',
      familyType: 'Joint Family',
      familyStatus: 'Middle Class',
      fatherOccupation: 'Retired Government Employee',
      motherOccupation: 'Homemaker',
      siblings: '1 Brother (Married), 1 Sister (Unmarried)',
      nativePlace: 'Tirunelveli',
      gothram: 'Bharadwaja',
      dosham: 'No',
      star: 'Rohini',
      rasi: 'Rishabam',
      hobbies: ['Cooking', 'Reading', 'Yoga', 'Carnatic Music'],
      languages: ['Tamil', 'English', 'Hindi'],
      diet: 'Vegetarian',
      smoke: 'No',
      drink: 'No',
      expectations: 'Looking for a well-educated professional who is family-oriented, respects elders, and has good values. Should be settled in India or abroad.',
      photos: [
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600',
        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600',
      ],
    },
    2: {
      id: 2,
      name: language === 'ta' ? 'கார்த்திக் ராஜா' : 'Karthik Raja',
      age: 29,
      height: "5'10\"",
      weight: '72 kg',
      location: 'Madurai, Tamil Nadu',
      education: 'B.Tech, IIT Madras',
      occupation: 'Data Scientist',
      company: 'Amazon',
      salary: '25 LPA',
      about: 'I am passionate about technology, data science, and music. I believe in continuous learning and growth. I play the violin and enjoy Tamil literature. Looking for a life partner who can be my best friend and supports my dreams.',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600',
      verified: true,
      religion: 'Hindu',
      caste: 'Devendra Kula Vellalar',
      subCaste: 'Pallar',
      motherTongue: 'Tamil',
      maritalStatus: 'Never Married',
      familyType: 'Nuclear Family',
      familyStatus: 'Upper Middle Class',
      fatherOccupation: 'Business Owner',
      motherOccupation: 'School Teacher',
      siblings: '1 Sister (Married)',
      nativePlace: 'Madurai',
      gothram: 'Kashyapa',
      dosham: 'No',
      star: 'Ashwini',
      rasi: 'Mesham',
      hobbies: ['Violin', 'Reading', 'Trekking', 'Photography'],
      languages: ['Tamil', 'English'],
      diet: 'Non-Vegetarian',
      smoke: 'No',
      drink: 'Occasionally',
      expectations: 'Looking for an educated, understanding partner who values both career and family. Open to working professionals.',
      photos: [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600',
      ],
    },
    3: {
      id: 3,
      name: language === 'ta' ? 'லட்சுமி பிரியா' : 'Lakshmi Priya',
      age: 24,
      height: "5'3\"",
      weight: '50 kg',
      location: 'Coimbatore, Tamil Nadu',
      education: 'MBBS, Madras Medical College',
      occupation: 'Doctor',
      company: 'Apollo Hospitals',
      salary: '15 LPA',
      about: 'Dedicated medical professional with a caring nature. I value family traditions and believe in helping others. Looking for someone who understands the demands of the medical profession.',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600',
      verified: true,
      religion: 'Hindu',
      caste: 'Devendra Kula Vellalar',
      subCaste: 'Pallar',
      motherTongue: 'Tamil',
      maritalStatus: 'Never Married',
      familyType: 'Joint Family',
      familyStatus: 'Upper Middle Class',
      fatherOccupation: 'Doctor',
      motherOccupation: 'Professor',
      siblings: '1 Brother (Unmarried)',
      nativePlace: 'Coimbatore',
      gothram: 'Vasishta',
      dosham: 'No',
      star: 'Magam',
      rasi: 'Simmam',
      hobbies: ['Bharatanatyam', 'Painting', 'Cooking'],
      languages: ['Tamil', 'English', 'Malayalam'],
      diet: 'Vegetarian',
      smoke: 'No',
      drink: 'No',
      expectations: 'Looking for a well-educated professional with good family background. Preferably from medical or engineering field.',
      photos: [
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600',
      ],
    },
    4: {
      id: 4,
      name: language === 'ta' ? 'செந்தில் குமார்' : 'Senthil Kumar',
      age: 31,
      height: "5'11\"",
      weight: '78 kg',
      location: 'Tirunelveli, Tamil Nadu',
      education: 'MS, USA',
      occupation: 'Product Manager',
      company: 'Google',
      salary: '50 LPA',
      about: 'NRI working in California. I maintain strong connections with my roots and visit India every year. Looking for a partner with traditional values who is open to settling abroad.',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600',
      verified: true,
      religion: 'Hindu',
      caste: 'Devendra Kula Vellalar',
      subCaste: 'Pallar',
      motherTongue: 'Tamil',
      maritalStatus: 'Never Married',
      familyType: 'Nuclear Family',
      familyStatus: 'Affluent',
      fatherOccupation: 'Retired Bank Manager',
      motherOccupation: 'Homemaker',
      siblings: '2 Sisters (Both Married)',
      nativePlace: 'Tirunelveli',
      gothram: 'Bharadwaja',
      dosham: 'No',
      star: 'Mrigashira',
      rasi: 'Mithunam',
      hobbies: ['Cricket', 'Travel', 'Tamil Cinema', 'Stock Trading'],
      languages: ['Tamil', 'English', 'Hindi'],
      diet: 'Non-Vegetarian',
      smoke: 'No',
      drink: 'Socially',
      expectations: 'Looking for an educated bride willing to relocate to USA. Should have good family values and adaptable nature.',
      photos: [
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600',
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600',
      ],
    },
    5: {
      id: 5,
      name: language === 'ta' ? 'மீனாட்சி' : 'Meenakshi',
      age: 27,
      height: "5'5\"",
      weight: '55 kg',
      location: 'Salem, Tamil Nadu',
      education: 'CA, ICAI',
      occupation: 'Chartered Accountant',
      company: 'Deloitte',
      salary: '18 LPA',
      about: 'Independent professional who believes in work-life balance. I love traveling and exploring new places. Family is very important to me and I am looking for someone with similar priorities.',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600',
      verified: true,
      premium: false,
      religion: 'Hindu',
      caste: 'Devendra Kula Vellalar',
      subCaste: 'Pallar',
      motherTongue: 'Tamil',
      maritalStatus: 'Never Married',
      familyType: 'Nuclear Family',
      familyStatus: 'Middle Class',
      fatherOccupation: 'Businessman',
      motherOccupation: 'Homemaker',
      siblings: '1 Brother (Unmarried)',
      nativePlace: 'Salem',
      gothram: 'Atri',
      dosham: 'No',
      star: 'Swati',
      rasi: 'Thulam',
      hobbies: ['Travel', 'Photography', 'Swimming', 'Movies'],
      languages: ['Tamil', 'English', 'Telugu'],
      diet: 'Eggetarian',
      smoke: 'No',
      drink: 'No',
      expectations: 'Looking for a professional with good career. Open to grooms from any city in India.',
      photos: [
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600',
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600',
      ],
    },
    6: {
      id: 6,
      name: language === 'ta' ? 'முருகன்' : 'Murugan',
      age: 28,
      height: "5'9\"",
      weight: '70 kg',
      location: 'Trichy, Tamil Nadu',
      education: 'B.E., PSG Tech',
      occupation: 'Civil Engineer',
      company: 'L&T',
      salary: '10 LPA',
      about: 'Simple and honest person from a joint family. I respect elders and believe in maintaining traditions. Looking for a homely girl who values family relationships.',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600',
      verified: true,
      premium: false,
      religion: 'Hindu',
      caste: 'Devendra Kula Vellalar',
      subCaste: 'Pallar',
      motherTongue: 'Tamil',
      maritalStatus: 'Never Married',
      familyType: 'Joint Family',
      familyStatus: 'Middle Class',
      fatherOccupation: 'Farmer',
      motherOccupation: 'Homemaker',
      siblings: '2 Brothers (1 Married, 1 Unmarried)',
      nativePlace: 'Trichy',
      gothram: 'Gautama',
      dosham: 'Slight',
      star: 'Visakam',
      rasi: 'Vrischikam',
      hobbies: ['Temple Visits', 'Cricket', 'Agriculture'],
      languages: ['Tamil', 'English'],
      diet: 'Non-Vegetarian',
      smoke: 'No',
      drink: 'No',
      expectations: 'Looking for a simple, homely girl with good family background. Education and working status not mandatory.',
      photos: [
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600',
      ],
    },
    7: {
      id: 7,
      name: language === 'ta' ? 'திவ்யா லட்சுமி' : 'Divya Lakshmi',
      age: 25,
      height: "5'4\"",
      weight: '52 kg',
      location: 'Erode, Tamil Nadu',
      education: 'M.Sc., Computer Science',
      occupation: 'UX Designer',
      company: 'Zoho',
      salary: '14 LPA',
      about: 'Creative professional with an eye for design. I enjoy painting and listening to classical music. Looking for someone who appreciates art and creativity.',
      photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600',
      verified: true,
      premium: true,
      religion: 'Hindu',
      caste: 'Devendra Kula Vellalar',
      subCaste: 'Pallar',
      motherTongue: 'Tamil',
      maritalStatus: 'Never Married',
      familyType: 'Nuclear Family',
      familyStatus: 'Middle Class',
      fatherOccupation: 'Government Employee',
      motherOccupation: 'Bank Employee',
      siblings: '1 Sister (Unmarried)',
      nativePlace: 'Erode',
      gothram: 'Kashyapa',
      dosham: 'No',
      star: 'Revati',
      rasi: 'Meenam',
      hobbies: ['Painting', 'Carnatic Music', 'Interior Design', 'Reading'],
      languages: ['Tamil', 'English', 'Kannada'],
      diet: 'Vegetarian',
      smoke: 'No',
      drink: 'No',
      expectations: 'Looking for a creative, open-minded partner. Preferably from IT or creative field.',
      photos: [
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600',
        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600',
      ],
    },
    8: {
      id: 8,
      name: language === 'ta' ? 'அருண் பிரசாத்' : 'Arun Prasad',
      age: 30,
      height: "6'0\"",
      weight: '75 kg',
      location: 'Thanjavur, Tamil Nadu',
      education: 'MBA, IIM Bangalore',
      occupation: 'Investment Banker',
      company: 'HDFC Bank',
      salary: '35 LPA',
      about: 'Finance professional with a passion for classical music. I play the mridangam and have performed at various events. Looking for an educated partner who shares my love for music and culture.',
      photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600',
      verified: true,
      premium: true,
      religion: 'Hindu',
      caste: 'Devendra Kula Vellalar',
      subCaste: 'Pallar',
      motherTongue: 'Tamil',
      maritalStatus: 'Never Married',
      familyType: 'Joint Family',
      familyStatus: 'Affluent',
      fatherOccupation: 'Businessman',
      motherOccupation: 'Classical Music Teacher',
      siblings: '1 Brother (Married)',
      nativePlace: 'Thanjavur',
      gothram: 'Vasishta',
      dosham: 'No',
      star: 'Thiruvonam',
      rasi: 'Makaram',
      hobbies: ['Mridangam', 'Finance', 'Cricket', 'Chess'],
      languages: ['Tamil', 'English', 'Hindi'],
      diet: 'Vegetarian',
      smoke: 'No',
      drink: 'Occasionally',
      expectations: 'Looking for an educated bride with interest in arts and culture. Should be family-oriented with good values.',
      photos: [
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600',
      ],
    },
  };

  const profile = realProfile ? {
    id: realProfile._id,
    name: realProfile.fullName || realProfile.profile?.fullName,
    age: realProfile.profile?.age,
    height: realProfile.profile?.height,
    weight: realProfile.profile?.weight,
    location: realProfile.profile?.city ? `${realProfile.profile.city}, ${realProfile.profile.state}` : 'N/A',
    education: realProfile.profile?.highestEducation,
    occupation: realProfile.profile?.occupation,
    company: realProfile.profile?.company,
    salary: realProfile.profile?.annualIncome,
    about: realProfile.profile?.aboutMe,
    photo: realProfile.profile?.profilePhoto || 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=600',
    verified: realProfile.isProfileApproved || realProfile.communityCertificate?.verified,
    premium: realProfile.isPremium,
    religion: realProfile.profile?.religion,
    caste: realProfile.profile?.caste,
    subCaste: realProfile.profile?.subCaste,
    motherTongue: realProfile.profile?.motherTongue,
    maritalStatus: realProfile.profile?.maritalStatus,
    familyType: realProfile.profile?.familyType,
    familyStatus: realProfile.profile?.familyStatus || 'N/A',
    fatherOccupation: realProfile.profile?.fatherOccupation,
    motherOccupation: realProfile.profile?.motherOccupation,
    siblings: realProfile.profile?.siblings || 'N/A',
    nativePlace: realProfile.profile?.city,
    gothram: realProfile.profile?.gothram,
    dosham: realProfile.profile?.dosham || 'No',
    star: realProfile.profile?.star,
    rasi: realProfile.profile?.rasi,
    hobbies: realProfile.profile?.hobbies ? (typeof realProfile.profile.hobbies === 'string' ? realProfile.profile.hobbies.split(',').map(h => h.trim()) : realProfile.profile.hobbies) : [],
    languages: realProfile.profile?.languagesKnown || [],
    diet: realProfile.profile?.diet,
    smoke: realProfile.profile?.smoking || 'No',
    drink: realProfile.profile?.drinking || 'No',
    complexion: realProfile.profile?.complexion,
    bodyType: realProfile.profile?.bodyType,
    expectations: realProfile.profile?.partnerPreferences?.description || 'No preferences specified.',
    photos: [realProfile.profile?.profilePhoto].filter(p => p),
  } : allProfiles[id];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-rose-500 animate-spin mb-4" />
        <p className="text-gray-500 font-medium">{language === 'ta' ? 'சுயவிவரத்தை ஏற்றுகிறது...' : 'Loading profile...'}</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{language === 'ta' ? 'சுயவிவரம் காணவில்லை' : 'Profile Not Found'}</h2>
          <Link to="/profiles" className="text-rose-600 hover:underline">
            {language === 'ta' ? 'சுயவிவரங்களுக்கு திரும்புக' : 'Back to Profiles'}
          </Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'about', label: t.profile?.about || 'About' },
    { id: 'family', label: t.profile?.family || 'Family' },
    { id: 'lifestyle', label: language === 'ta' ? 'வாழ்க்கை முறை' : 'Lifestyle' },
    { id: 'horoscope', label: t.profile?.horoscope || 'Horoscope' },
    { id: 'expectations', label: t.profile?.partnerPreferences || 'Partner Preferences' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-rose-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link to="/profiles" className="inline-flex items-center gap-2 text-rose-600 hover:text-rose-700 mb-6">
          <ArrowLeft className="w-5 h-5" />
          <span>{language === 'ta' ? 'சுயவிவரங்களுக்கு திரும்புக' : 'Back to Profiles'}</span>
        </Link>

        {/* Main Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden"
        >
          {/* Header Section */}
          <div className="md:flex">
            {/* Photo Section */}
            <div className="md:w-2/5 relative">
              <img
                src={`${(realProfile?.profilePhoto || profile.photo).split('?')[0]}?w=800&q=85`}
                alt={realProfile?.fullName || profile.name}
                loading="eager"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                {profile.verified && (
                  <span className="px-4 py-2 bg-rose-500 text-white text-sm font-semibold rounded-full flex items-center gap-1 shadow-lg">
                    <CheckCircle className="w-4 h-4" /> Verified
                  </span>
                )}
                {profile.premium && (
                  <span className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-semibold rounded-full flex items-center gap-1 shadow-lg">
                    <Star className="w-4 h-4" fill="currentColor" /> Premium
                  </span>
                )}
              </div>
            </div>

            {/* Basic Info Section */}
            <div className="md:w-3/5 p-8 relative">
              {!user?.isProfileApproved && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center p-8 text-center">
                  <div className="max-w-xs">
                    <Star className="w-12 h-12 text-rose-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {language === 'ta' ? 'விவரங்களைப் பார்க்கச் சரிபார்க்கவும்' : 'Verification Required'}
                    </h3>
                    <p className="text-gray-600 text-sm mb-6">
                      {language === 'ta' ? 'முழு விவரங்களையும் புகைப்படங்களையும் பார்க்க உங்கள் சமூக சான்றிதழ் சரிபார்க்கப்பட வேண்டும்.' : 'Please verify your community certificate to view full details and contact information.'}
                    </p>
                    <Link to="/dashboard/my-profile">
                      <Button variant="primary" size="sm">
                        {language === 'ta' ? 'நிலையைச் சரிபார்க்கவும்' : 'Check Status'}
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">{profile.name}</h1>
                  <p className="text-gray-500">{profile.age} years, {profile.height}</p>
                </div>
                <button
                  onClick={() => setIsSaved(!isSaved)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${isSaved
                    ? 'bg-red-50 border-red-200'
                    : 'bg-gray-50 border-gray-200 hover:border-rose-300'
                    }`}
                >
                  <Heart className={`w-6 h-6 ${isSaved ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-rose-100 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-rose-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">{t.profile?.location || "Location"}</p>
                    <p className="font-medium text-gray-800">{profile.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-rose-100 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-rose-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">{t.profile?.education || "Education"}</p>
                    <p className="font-medium text-gray-800">{profile.education}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-rose-100 flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-rose-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">{t.profile?.occupation || "Occupation"}</p>
                    <p className="font-medium text-gray-800">{profile.occupation}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-rose-100 flex items-center justify-center">
                    <Award className="w-5 h-5 text-rose-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">{t.profile?.caste || "Caste"}</p>
                    <p className="font-medium text-gray-800">{profile.caste}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => setIsInterestSent(true)}
                  disabled={isInterestSent}
                  className={`flex-1 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${isInterestSent
                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-rose-500 to-pink-600 text-white hover:from-rose-600 hover:to-pink-700 shadow-lg shadow-rose-200'
                    }`}
                >
                  <Heart className="w-5 h-5" />
                  {isInterestSent ? (t.interests?.interestSent || 'Interest Sent') : (t.interests?.sendInterest || 'Send Interest')}
                </button>
                <button className="flex-1 py-3 border-2 border-rose-500 text-rose-600 rounded-xl font-semibold hover:bg-rose-50 transition-all flex items-center justify-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  {t.messages?.sendMessage || "Message"}
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className={`border-t border-gray-100 ${!user?.isProfileApproved ? 'opacity-50 pointer-events-none grayscale' : ''}`}>
            <div className="flex overflow-x-auto">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-8 py-4 font-semibold transition-all duration-150 whitespace-nowrap ${activeTab === tab.id
                    ? 'text-rose-600 border-b-2 border-rose-600 bg-rose-50'
                    : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className={`p-8 ${!user?.isProfileApproved ? 'opacity-20 blur-sm pointer-events-none select-none' : ''}`}>
            {activeTab === 'about' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3">{t.profile?.aboutMe || "About Me"}</h3>
                  <p className="text-gray-600 leading-relaxed">{profile.about}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <User className="w-5 h-5 text-rose-600" />
                      {t.profile?.basicDetails || "Basic Details"}
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-500">{t.profile?.age || "Age"}</span>
                        <span className="font-medium">{profile.age} {t.profile?.years || "years"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">{t.profile?.height || "Height"}</span>
                        <span className="font-medium">{profile.height}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">{t.profile?.weight || "Weight"}</span>
                        <span className="font-medium">{profile.weight}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">{t.profile?.maritalStatus || "Marital Status"}</span>
                        <span className="font-medium">{profile.maritalStatus}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">{t.profile?.motherTongue || "Mother Tongue"}</span>
                        <span className="font-medium">{profile.motherTongue}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">{t.profile?.diet || "Diet"}</span>
                        <span className="font-medium">{profile.diet}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-rose-600" />
                      {t.profile?.professionalDetails || "Professional Details"}
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-500">{t.profile?.education || "Education"}</span>
                        <span className="font-medium">{profile.education}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">{t.profile?.occupation || "Occupation"}</span>
                        <span className="font-medium">{profile.occupation}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">{t.profile?.company || "Company"}</span>
                        <span className="font-medium">{profile.company}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">{t.profile?.income || "Annual Income"}</span>
                        <span className="font-medium">{profile.salary}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">{t.profile?.hobbiesInterests || "Hobbies & Interests"}</h4>
                  <div className="flex flex-wrap gap-2">
                    {profile.hobbies.map((hobby, i) => (
                      <span key={i} className="px-4 py-2 bg-rose-100 text-rose-700 rounded-full text-sm font-medium">
                        {hobby}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">{t.profile?.languagesKnown || "Languages Known"}</h4>
                  <div className="flex flex-wrap gap-2">
                    {profile.languages.map((lang, i) => (
                      <span key={i} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'family' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <Home className="w-5 h-5 text-rose-600" />
                      Family Information
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Family Type</span>
                        <span className="font-medium">{profile.familyType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Family Status</span>
                        <span className="font-medium">{profile.familyStatus}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Native Place</span>
                        <span className="font-medium">{profile.nativePlace}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5 text-rose-600" />
                      Family Members
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Father's Occupation</span>
                        <span className="font-medium">{profile.fatherOccupation}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Mother's Occupation</span>
                        <span className="font-medium">{profile.motherOccupation}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Siblings</span>
                        <span className="font-medium text-right text-sm">{profile.siblings}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'lifestyle' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <Coffee className="w-5 h-5 text-rose-600" />
                      Lifestyle Habits
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Diet</span>
                        <span className="font-medium">{profile.diet}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Smoking</span>
                        <span className="font-medium">{profile.smoke}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Drinking</span>
                        <span className="font-medium">{profile.drink}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <User className="w-5 h-5 text-rose-600" />
                      Appearance
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Complexion</span>
                        <span className="font-medium">{profile.complexion || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Body Type</span>
                        <span className="font-medium">{profile.bodyType || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Hobbies & Interests</h4>
                  <div className="flex flex-wrap gap-2">
                    {profile.hobbies.length > 0 ? profile.hobbies.map((hobby, i) => (
                      <span key={i} className="px-4 py-2 bg-rose-100 text-rose-700 rounded-full text-sm font-medium">
                        {hobby}
                      </span>
                    )) : (
                      <span className="text-gray-400 italic">No hobbies listed</span>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'horoscope' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="bg-gray-50 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                      <Star className="w-5 h-5 text-rose-600" />
                      Religious & horoscope Details
                    </h4>
                  </div>
                  <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                    <div className="space-y-4">
                      <div className="flex justify-between pb-2 border-b border-gray-100">
                        <span className="text-gray-500">Religion</span>
                        <span className="font-bold text-gray-800">{profile.religion}</span>
                      </div>
                      <div className="flex justify-between pb-2 border-b border-gray-100">
                        <span className="text-gray-500">Caste / Sub-Caste</span>
                        <span className="font-bold text-gray-800">{profile.caste} {profile.subCaste ? `/ ${profile.subCaste}` : ''}</span>
                      </div>
                      <div className="flex justify-between pb-2 border-b border-gray-100">
                        <span className="text-gray-500">Gothram</span>
                        <span className="font-bold text-gray-800">{profile.gothram}</span>
                      </div>
                      <div className="flex justify-between pb-2 border-b border-gray-100">
                        <span className="text-gray-500">Mother Tongue</span>
                        <span className="font-bold text-gray-800">{profile.motherTongue}</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between pb-2 border-b border-gray-100">
                        <span className="text-gray-500">Star / Nakshatra</span>
                        <span className="font-bold text-gray-800">{profile.star}</span>
                      </div>
                      <div className="flex justify-between pb-2 border-b border-gray-100">
                        <span className="text-gray-500">Rasi / Moon Sign</span>
                        <span className="font-bold text-gray-800">{profile.rasi}</span>
                      </div>
                      <div className="flex justify-between pb-2 border-b border-gray-100">
                        <span className="text-gray-500">Place of Birth</span>
                        <span className="font-bold text-gray-800">{profile.nativePlace || profile.location}</span>
                      </div>
                      <div className="flex justify-between pb-2 border-b border-gray-100">
                        <span className="text-gray-500">Time of Birth</span>
                        <span className="font-bold text-gray-800">{profile.timeOfBirth || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'expectations' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-6">
                  <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-rose-600" />
                    Partner Preferences
                  </h4>
                  <p className="text-gray-600 leading-relaxed">{profile.expectations}</p>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Photo Gallery */}
        {profile.photos && profile.photos.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`mt-8 bg-white rounded-3xl shadow-xl p-8 ${!user?.isProfileApproved ? 'opacity-50 blur-md pointer-events-none select-none' : ''}`}
          >
            <h3 className="text-xl font-bold text-gray-800 mb-6">Photo Gallery</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {profile.photos.map((photo, i) => (
                <img
                  key={i}
                  src={photo}
                  alt={`${profile.name} ${i + 1}`}
                  className="w-full h-48 object-cover rounded-xl hover:opacity-90 transition-opacity cursor-pointer"
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Similar Profiles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`mt-8 bg-white rounded-3xl shadow-xl p-8 ${!user?.isProfileApproved ? 'opacity-50 blur-md pointer-events-none select-none' : ''}`}
        >
          <h3 className="text-xl font-bold text-gray-800 mb-6">Similar Profiles</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.values(allProfiles)
              .filter(p => p.id !== profile.id)
              .slice(0, 4)
              .map(p => (
                <Link key={p.id} to={`/profile/${p.id}`} className="group">
                  <div className="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-all">
                    <img
                      src={p.photo}
                      alt={p.name}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-800">{p.name}</h4>
                      <p className="text-sm text-gray-500">{p.age} yrs, {p.location.split(',')[0]}</p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfileDetail;
