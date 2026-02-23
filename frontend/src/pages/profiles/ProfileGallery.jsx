import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, MapPin, Briefcase, Camera, Lock, Filter, Grid, List as ListIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Skeleton from '../../components/common/Skeleton';
import { useTranslation } from '../../context/TranslationContext';
import { useAuthStore } from '../../store/authStore';
import api from '../../services/api';
import toast from 'react-hot-toast';

const ProfileGallery = () => {
    const { t, language } = useTranslation();
    const { user } = useAuthStore();
    const navigate = useNavigate();
    const [profiles, setProfiles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [genderFilter, setGenderFilter] = useState('all');
    const [viewMode, setViewMode] = useState('grid'); // grid or list

    useEffect(() => {
        // Restricted Access Check
        if (user && !user.isProfileApproved && user.role !== 'admin') {
            toast.error(language === 'ta' ? 'கேலரியைக் காண உங்கள் கணக்கு அதிகாரப்பூர்வமாக சரிபார்க்கப்பட வேண்டும்.' : 'Verify your profile to access the Photo Gallery.');
            navigate('/dashboard/my-profile');
            return;
        }

        const fetchProfiles = async () => {
            try {
                setIsLoading(true);
                // Fetch more for gallery
                const response = await api.get('/profiles?limit=40');
                if (response.data.status === 'success') {
                    setProfiles(response.data.data.profiles);
                }
            } catch (error) {
                console.error('Error fetching gallery profiles:', error);
                toast.error('Failed to load profiles');
            } finally {
                setIsLoading(false);
            }
        };

        if (user) {
            fetchProfiles();
        }
    }, [user, navigate, language]);

    const filteredProfiles = profiles.filter(p => {
        if (genderFilter === 'all') return true;
        return p.profile?.gender?.toLowerCase() === genderFilter.toLowerCase();
    });

    return (
        <div className="space-y-8 pb-20">
            {/* Header & Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 border-l-4 border-rose-600 pl-4 mb-2">
                        {language === 'ta' ? 'புகைப்பட கேலரி' : 'Photo Gallery'}
                    </h1>
                    <p className="text-gray-600">{language === 'ta' ? 'அனைத்து மணப்பெண் மற்றும் மணமகன்களின் புகைப்படங்கள்' : 'Browse verified brides and grooms'}</p>
                </div>

                <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
                    <button
                        onClick={() => setGenderFilter('all')}
                        className={`px-4 py-2 rounded-xl font-bold transition-all ${genderFilter === 'all' ? 'bg-rose-100 text-rose-600 shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                        {language === 'ta' ? 'அனைத்தும்' : 'All'}
                    </button>
                    <button
                        onClick={() => setGenderFilter('female')}
                        className={`px-4 py-2 rounded-xl font-bold transition-all ${genderFilter === 'female' ? 'bg-rose-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                        {language === 'ta' ? 'மணப்பெண்கள்' : 'Brides'}
                    </button>
                    <button
                        onClick={() => setGenderFilter('male')}
                        className={`px-4 py-2 rounded-xl font-bold transition-all ${genderFilter === 'male' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                        {language === 'ta' ? 'மணமகன்கள்' : 'Grooms'}
                    </button>
                </div>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                        <Card key={i} padding="none" className="overflow-hidden aspect-[3/4]">
                            <Skeleton className="h-full w-full" />
                        </Card>
                    ))}
                </div>
            ) : filteredProfiles.length === 0 ? (
                <Card className="text-center py-20 bg-rose-50/20 border-2 border-dashed border-rose-100">
                    <Camera className="w-16 h-16 text-rose-200 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{language === 'ta' ? 'சுயவிவரங்கள் எதுவும் கிடைக்கவில்லை' : 'No profiles found'}</h3>
                    <p className="text-gray-500">{language === 'ta' ? 'பிற பிரிவுகளைச் சரிபார்க்கவும்' : 'Try adjusting your filters to see more results.'}</p>
                </Card>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    <AnimatePresence mode='popLayout'>
                        {filteredProfiles.map((profile) => (
                            <motion.div
                                key={profile._id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.15 }}
                                className="group cursor-pointer"
                            >
                                <Link to={`/profiles/${profile._id}`}>
                                    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all border-2 border-white group-hover:border-rose-300">
                                        <img
                                            src={`${(profile.profile?.profilePhoto || profile.profilePhoto || 'https://images.unsplash.com/photo-1511367461989-f85a21fda167').split('?')[0]}?w=500&q=80`}
                                            alt={profile.fullName}
                                            loading="lazy"
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />

                                        {/* Overlay Info */}
                                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                                            <h4 className="text-white font-bold truncate">{profile.fullName}</h4>
                                            <p className="text-white/80 text-xs flex items-center gap-1">
                                                <MapPin className="w-3 h-3" />
                                                {profile.profile?.city}
                                            </p>
                                            <div className="flex gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Badge size="sm" variant="success" className="bg-white/20 backdrop-blur-md text-white border-0 text-[10px]">
                                                    {profile.profile?.age} Yrs
                                                </Badge>
                                            </div>
                                        </div>

                                        {/* Quick Like Button */}
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                toast.success('Heart added!');
                                            }}
                                            className="absolute top-3 right-3 p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-rose-500 transition-colors"
                                        >
                                            <Heart className="w-4 h-4" />
                                        </button>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}

            {/* Premium banner removed */}
        </div>
    );
};

export default ProfileGallery;
