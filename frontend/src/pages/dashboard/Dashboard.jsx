import { useState, useEffect } from 'react';
import { FiUsers, FiHeart, FiMail, FiEye, FiMapPin, FiBriefcase, FiLoader } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { useTranslation } from '../../context/TranslationContext';
import { useAuthStore } from '../../store/authStore';
import api from '../../services/api';
import Skeleton from '../../components/common/Skeleton';

const Dashboard = () => {
  const { language } = useTranslation();
  const { user } = useAuthStore();
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const stats = [
    { label: language === 'ta' ? 'சுயவிவர பார்வைகள்' : 'Profile Views', value: '0', icon: FiEye, color: 'blue' },
    { label: language === 'ta' ? 'பற்றப்பட்ட ஆர்வங்கள்' : 'Interests Received', value: '0', icon: FiHeart, color: 'red' },
    { label: language === 'ta' ? 'பொருத்தங்கள்' : 'Matches', value: '0', icon: FiUsers, color: 'purple' },
  ];

  useEffect(() => {
    const fetchSuggestions = async () => {
      // Robust check: explicitly check for false or missing approval
      if (!user) return;

      if (user.role !== 'admin' && user.isProfileApproved !== true) {
        console.log('Skipping suggestions fetch: User not approved or not admin');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        console.log('Fetching suggestions for:', user.role, 'Approved:', user.isProfileApproved);
        const response = await api.get('/profiles?limit=4');
        if (response.data.status === 'success') {
          setSuggestions(response.data.data.profiles);
        }
      } catch (error) {
        // Silently handle 403 if it still happens somehow
        if (error.response?.status === 403) {
          console.warn('Dashboard suggestions fetch blocked by 403');
          setSuggestions([]);
        } else {
          console.error('Error fetching suggestions:', error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (user && user._id) {
      fetchSuggestions();
    }
  }, [user?._id, user?.isProfileApproved]); // Use specific fields to avoid unnecessary re-runs

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {language === 'ta' ? `வணக்கம், ${user?.fullName || 'பயனர்'}!` : `Welcome back, ${user?.fullName || 'User'}!`}
        </h1>
        <p className="text-gray-600">{language === 'ta' ? 'உங்கள் மணவாழ்க்கை தேடல் இங்கே தொடங்குகிறது' : "Your matrimony journey starts here"}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} padding="md" className="hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 bg-${stat.color}-50 rounded-xl flex items-center justify-center text-${stat.color}-600`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {language === 'ta' ? 'பரிந்துரைக்கப்பட்ட பொருத்தங்கள்' : 'Suggested Matches'}
          </h2>
          <Link to="/profiles" className="text-rose-600 font-semibold hover:underline">
            {language === 'ta' ? 'அனைத்தையும் காண்க' : 'View All'} →
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} padding="none" className="overflow-hidden">
                <Skeleton className="h-56 w-full" />
                <div className="p-4 space-y-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </Card>
            ))}
          </div>
        ) : !user?.isProfileApproved && user?.role !== 'admin' ? (
          <Card padding="lg" className="text-center border-2 border-dashed border-rose-200 bg-rose-50/30">
            <div className="max-w-md mx-auto py-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {language === 'ta' ? 'சுயவிவரங்களைக் காண சரிபார்க்கவும்' : 'Verify to see matches'}
              </h3>
              <p className="text-gray-600 mb-6">
                {language === 'ta' ? 'புகைப்படங்களுடன் கூடிய வரன்களைக் காண உங்கள் கணக்கு அதிகாரப்பூர்வமாக சரிபார்க்கப்பட வேண்டும்.' : 'Your account needs to be verified by admin before you can see suggested matches and photos.'}
              </p>
              {user?.communityCertificate?.url && !user?.isProfileApproved && (
                <div className="mb-6 p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-700 text-sm font-medium animate-pulse">
                  {language === 'ta' ? 'உங்கள் ஆவணங்கள் தற்போது நிர்வாகியால் பரிசீலனையில் உள்ளன.' : 'Your documents are currently under review by our admin team.'}
                </div>
              )}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/my-profile">
                  <Button variant={user?.communityCertificate?.url ? "success" : "secondary"}>
                    {user?.communityCertificate?.url
                      ? (language === 'ta' ? 'சரிபார்ப்பு நிலுவையில் உள்ளது' : 'Verification Pending...')
                      : (language === 'ta' ? 'நிலையைச் சரிபார்க்கவும்' : 'Check Verification Status')}
                  </Button>
                </Link>
                <Link to="/edit-profile">
                  <Button variant="primary">
                    {language === 'ta' ? 'சுயவிவரத்தைப் பூர்த்தி செய்க' : 'Complete Profile'}
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        ) : suggestions.length === 0 ? (
          <Card padding="lg" className="text-center">
            <p className="text-gray-500 py-8">
              {language === 'ta' ? 'தற்போது பரிந்துரைகள் எதுவும் இல்லை' : 'No matches found yet. Try updating your preferences.'}
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {suggestions.map((item) => (
              <Card key={item._id} padding="none" className="overflow-hidden hover:shadow-xl transition-all group">
                <div className="relative">
                  <img
                    src={`${item.profile?.profilePhoto || 'https://images.unsplash.com/photo-1511367461989-f85a21fda167'}?w=400&q=80`}
                    alt={item.fullName}
                    loading="lazy"
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-150"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <p className="text-white font-bold text-lg">{item.fullName}</p>
                    <p className="text-white/80 text-sm">{item.profile?.age} {language === 'ta' ? 'வயது' : 'yrs'}, {item.profile?.height}</p>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FiMapPin className="text-rose-500 shrink-0" />
                    <span className="truncate">{item.profile?.city}, {item.profile?.state}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FiBriefcase className="text-rose-500 shrink-0" />
                    <span className="truncate">{item.profile?.occupation}</span>
                  </div>
                  <Link to={`/profiles/${item._id}`}>
                    <button className="w-full mt-2 py-2 bg-rose-50 text-rose-600 font-bold rounded-lg hover:bg-rose-100 transition-colors duration-100">
                      {language === 'ta' ? 'சுயவிவரத்தைப் பார்க்க' : 'View Profile'}
                    </button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card padding="lg">
          <h2 className="text-xl font-bold text-gray-900 mb-4">{language === 'ta' ? 'சமீபத்திய செயல்பாடு' : 'Recent Activity'}</h2>
          <div className="space-y-4">
            <p className="text-gray-500 text-sm italic">{language === 'ta' ? 'ஏதும் இல்லை' : 'No recent activity to show yet'}</p>
          </div>
        </Card>

        <Card padding="lg">
          <h2 className="text-xl font-bold text-gray-900 mb-4">{language === 'ta' ? 'முயற்சிகள்' : 'Profile Status'}</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <span className="text-gray-600">{language === 'ta' ? 'சுயவிவரம் முடிந்தது' : 'Profile Completion'}</span>
              <span className="font-bold text-rose-600">80%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <span className="text-gray-600">{language === 'ta' ? 'சரிபார்ப்பு நிலை' : 'Verification Status'}</span>
              <span className={`font-bold ${user?.isProfileApproved ? 'text-green-600' : 'text-amber-600'}`}>
                {user?.isProfileApproved ? (language === 'ta' ? 'சரிபார்க்கப்பட்டது' : 'Verified') : (language === 'ta' ? 'நிலுவையில் உள்ளது' : 'Pending')}
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
