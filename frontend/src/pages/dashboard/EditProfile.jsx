import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, MapPin, GraduationCap, Briefcase, Heart, Users, Coffee, Info, Save, Loader2 } from 'lucide-react';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Button from '../../components/common/Button';
import { useTranslation } from '../../context/TranslationContext';
import { useAuthStore } from '../../store/authStore';
import api from '../../services/api';
import toast from 'react-hot-toast';

const EditProfile = () => {
  const { language } = useTranslation();
  const { user, getCurrentUser } = useAuthStore();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    dateOfBirth: '',
    age: '',
    height: '',
    weight: '',
    maritalStatus: '',
    physicalStatus: 'Normal',
    religion: '',
    caste: '',
    subCaste: '',
    gothram: '',
    motherTongue: '',
    languagesKnown: '',
    star: '',
    rasi: '',
    timeOfBirth: '',
    placeOfBirth: '',
    complexion: '',
    bodyType: '',
    country: 'India',
    state: '',
    city: '',
    highestEducation: '',
    occupation: '',
    employedIn: '',
    annualIncome: '',
    fatherName: '',
    fatherOccupation: '',
    motherName: '',
    motherOccupation: '',
    brothers: 0,
    brothersMarried: 0,
    sisters: 0,
    sistersMarried: 0,
    familyType: '',
    familyValues: '',
    familyStatus: '',
    diet: '',
    hobbies: '',
    interests: '',
    aboutMe: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/profiles/me');
        if (response.data.status === 'success' && response.data.data.user.profile) {
          const profile = response.data.data.user.profile;
          // Format date for input
          const dob = profile.dateOfBirth ? new Date(profile.dateOfBirth).toISOString().split('T')[0] : '';

          setFormData({
            ...profile,
            fullName: profile.fullName || response.data.data.user.fullName || '',
            dateOfBirth: dob,
            languagesKnown: Array.isArray(profile.languagesKnown) ? profile.languagesKnown.join(', ') : profile.languagesKnown || '',
          });
        } else {
          setFormData(prev => ({
            ...prev,
            fullName: user?.fullName || '',
          }));
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchProfile();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      // Convert languagesKnown back to array
      const languagesArray = typeof formData.languagesKnown === 'string'
        ? formData.languagesKnown.split(',').map(l => l.trim()).filter(l => l)
        : formData.languagesKnown;

      const submissionData = {
        ...formData,
        languagesKnown: languagesArray
      };

      const response = await api.post('/profiles', submissionData);
      if (response.data.status === 'success') {
        toast.success(language === 'ta' ? 'சுயவிவரம் வெற்றிகரமாக சேமிக்கப்பட்டது!' : 'Profile saved successfully!');
        await getCurrentUser();
        navigate('/dashboard/my-profile');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error saving profile');
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-12 h-12 text-primary-500 animate-spin" />
      </div>
    );
  }

  const sections = [
    {
      id: 'basic',
      title: language === 'ta' ? 'அடிப்படை தகவல்' : 'Basic Information',
      icon: User,
      fields: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
          <Input label={language === 'ta' ? 'முழு பெயர்' : 'Full Name'} name="fullName" value={formData.fullName} onChange={handleChange} required />
          <Select
            label={language === 'ta' ? 'பாலினம்' : 'Gender'}
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            options={[
              { label: language === 'ta' ? 'ஆண்' : 'Male', value: 'Male' },
              { label: language === 'ta' ? 'பெண்' : 'Female', value: 'Female' }
            ]}
          />
          <Input label={language === 'ta' ? 'பிறந்த தேதி' : 'Date of Birth'} name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} required />
          <Input label={language === 'ta' ? 'வயது' : 'Age'} name="age" type="number" value={formData.age} onChange={handleChange} required />
          <Input label={language === 'ta' ? 'உயரம் (எ.கா: 5\'7")' : 'Height (e.g: 5\'7")'} name="height" value={formData.height} onChange={handleChange} required />
          <Input label={language === 'ta' ? 'எடை (கிலோவில்)' : 'Weight (in kg)'} name="weight" type="number" value={formData.weight} onChange={handleChange} />
          <Select
            label={language === 'ta' ? 'திருமண நிலை' : 'Marital Status'}
            name="maritalStatus"
            value={formData.maritalStatus}
            onChange={handleChange}
            required
            options={[
              'Never Married', 'Divorced', 'Widowed', 'Awaiting Divorce'
            ]}
          />
          <Select
            label={language === 'ta' ? 'உடல் நிலை' : 'Physical Status'}
            name="physicalStatus"
            value={formData.physicalStatus}
            onChange={handleChange}
            options={[
              { label: language === 'ta' ? 'சாதாரண' : 'Normal', value: 'Normal' },
              { label: language === 'ta' ? 'மாற்றுத்திறனாளி' : 'Physically Challenged', value: 'Physically Challenged' }
            ]}
          />
          <Select
            label={language === 'ta' ? 'நிறம்' : 'Complexion'}
            name="complexion"
            value={formData.complexion}
            onChange={handleChange}
            options={['Fair', 'Very Fair', 'Wheatish', 'Dark']}
          />
          <Select
            label={language === 'ta' ? 'உடல் அமைப்பு' : 'Body Type'}
            name="bodyType"
            value={formData.bodyType}
            onChange={handleChange}
            options={['Slim', 'Average', 'Athletic', 'Heavy']}
          />
        </div>
      )
    },
    {
      id: 'religious',
      title: language === 'ta' ? 'மதம் மற்றும் ஜாதக விவரங்கள்' : 'Religious & Horoscope Details',
      icon: Heart,
      fields: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
          <Input label={language === 'ta' ? 'மதம்' : 'Religion'} name="religion" value={formData.religion} onChange={handleChange} placeholder="e.g. Hindu" />
          <Input label={language === 'ta' ? 'சாதி' : 'Caste'} name="caste" value={formData.caste} onChange={handleChange} placeholder="e.g. DKV" />
          <Input label={language === 'ta' ? 'உட்சாதி' : 'Sub-Caste'} name="subCaste" value={formData.subCaste} onChange={handleChange} />
          <Input label={language === 'ta' ? 'கோத்திரம்' : 'Gothram'} name="gothram" value={formData.gothram} onChange={handleChange} />
          <Input label={language === 'ta' ? 'தாய்மொழி' : 'Mother Tongue'} name="motherTongue" value={formData.motherTongue} onChange={handleChange} placeholder="e.g. Tamil" />
          <Input label={language === 'ta' ? 'தெரிந்த மொழிகள்' : 'Languages Known'} name="languagesKnown" value={formData.languagesKnown} onChange={handleChange} placeholder="e.g. Tamil, English, Hindi" />
          <Input label={language === 'ta' ? 'நட்சத்திரம்' : 'Star (Nakshatra)'} name="star" value={formData.star} onChange={handleChange} />
          <Input label={language === 'ta' ? 'ராசி' : 'Rasi'} name="rasi" value={formData.rasi} onChange={handleChange} />
          <Input label={language === 'ta' ? 'பிறந்த நேரம்' : 'Time of Birth'} name="timeOfBirth" type="time" value={formData.timeOfBirth} onChange={handleChange} />
          <Input label={language === 'ta' ? 'பிறந்த இடம்' : 'Place of Birth'} name="placeOfBirth" value={formData.placeOfBirth} onChange={handleChange} />
        </div>
      )
    },
    {
      id: 'location',
      title: language === 'ta' ? 'இருப்பிடம்' : 'Location',
      icon: MapPin,
      fields: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
          <Input label={language === 'ta' ? 'நாடு' : 'Country'} name="country" value={formData.country} onChange={handleChange} required />
          <Input label={language === 'ta' ? 'மாநிலம்' : 'State'} name="state" value={formData.state} onChange={handleChange} required placeholder="e.g. Tamil Nadu" />
          <Input label={language === 'ta' ? 'நகரம்' : 'City'} name="city" value={formData.city} onChange={handleChange} required placeholder="e.g. Chennai" />
        </div>
      )
    },
    {
      id: 'education',
      title: language === 'ta' ? 'கல்வி மற்றும் பணி' : 'Education & Profession',
      icon: GraduationCap,
      fields: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
          <Input label={language === 'ta' ? 'உயர்கல்வி' : 'Highest Education'} name="highestEducation" value={formData.highestEducation} onChange={handleChange} required placeholder="e.g. B.E. Computer Science" />
          <Input label={language === 'ta' ? 'வேலை' : 'Occupation'} name="occupation" value={formData.occupation} onChange={handleChange} required placeholder="e.g. Software Engineer" />
          <Select
            label={language === 'ta' ? 'பணிபுரியும் இடம்' : 'Employed In'}
            name="employedIn"
            value={formData.employedIn}
            onChange={handleChange}
            options={['Government', 'Private', 'Business', 'Self Employed', 'Not Working']}
          />
          <Input label={language === 'ta' ? 'ஆண்டு வருமானம்' : 'Annual Income'} name="annualIncome" value={formData.annualIncome} onChange={handleChange} placeholder="e.g. 10 Lakhs" />
        </div>
      )
    },
    {
      id: 'family',
      title: language === 'ta' ? 'குடும்ப விவரங்கள்' : 'Family Details',
      icon: Users,
      fields: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
          <Input label={language === 'ta' ? 'தந்தை பெயர்' : 'Father\'s Name'} name="fatherName" value={formData.fatherName} onChange={handleChange} />
          <Input label={language === 'ta' ? 'தந்தை தொழில்' : 'Father\'s Occupation'} name="fatherOccupation" value={formData.fatherOccupation} onChange={handleChange} />
          <Input label={language === 'ta' ? 'தாய் பெயர்' : 'Mother\'s Name'} name="motherName" value={formData.motherName} onChange={handleChange} />
          <Input label={language === 'ta' ? 'தாய் தொழில்' : 'Mother\'s Occupation'} name="motherOccupation" value={formData.motherOccupation} onChange={handleChange} />
          <Select
            label={language === 'ta' ? 'குடும்ப வகை' : 'Family Type'}
            name="familyType"
            value={formData.familyType}
            onChange={handleChange}
            options={['Joint Family', 'Nuclear Family']}
          />
          <Select
            label={language === 'ta' ? 'குடும்ப மதிப்பீடுகள்' : 'Family Values'}
            name="familyValues"
            value={formData.familyValues}
            onChange={handleChange}
            options={['Traditional', 'Moderate', 'Liberal']}
          />
        </div>
      )
    },
    {
      id: 'lifestyle',
      title: language === 'ta' ? 'வாழ்க்கை முறை' : 'Lifestyle & About Me',
      icon: Coffee,
      fields: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            <Select
              label={language === 'ta' ? 'உணவு முறை' : 'Diet'}
              name="diet"
              value={formData.diet}
              onChange={handleChange}
              options={['Vegetarian', 'Non-Vegetarian', 'Eggetarian']}
            />
            <Input label={language === 'ta' ? 'சுயவிருப்பங்கள்' : 'Hobbies'} name="hobbies" value={formData.hobbies} onChange={handleChange} placeholder="e.g. Reading, Traveling, Cooking" />
            <Input label={language === 'ta' ? 'ஆர்வங்கள்' : 'Interests'} name="interests" value={formData.interests} onChange={handleChange} placeholder="e.g. Photography, Music, Coding" />
          </div>
          <div className="w-full">
            <label className="block text-sm font-bold text-royal-900 mb-2">
              {language === 'ta' ? 'என்னைப்பற்றி' : 'About Me'}
            </label>
            <textarea
              name="aboutMe"
              value={formData.aboutMe}
              onChange={handleChange}
              rows="4"
              className="w-full px-5 py-4 border-2 border-royal-200 rounded-xl focus:border-royal-400 focus:ring-4 focus:ring-royal-500/20 outline-none transition-all duration-300 font-medium text-lg placeholder:text-gray-400"
              placeholder={language === 'ta' ? 'உங்களைப் பற்றிச் சுருக்கமாகச் சொல்லுங்கள்...' : 'Tell us a bit about yourself, your values and what you are looking for...'}
            ></textarea>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-royal-900 mb-2">
            {language === 'ta' ? 'சுயவிவரத்தைப் பூர்த்தி செய்க' : 'Complete Your Profile'}
          </h1>
          <p className="text-gray-600 text-lg">
            {language === 'ta' ? 'சரியான பொருத்தத்தைப் பெற உங்கள் விவரங்களைச் சரியாக நிரப்பவும்' : 'Fill in your details accurately to get the best matches'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {sections.map((section, index) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Card padding="md" className="border-t-4 border-t-royal-500 overflow-visible shadow-sm">
              <div className="flex items-center gap-3 mb-5 pb-3 border-b border-gray-100">
                <div className="w-10 h-10 rounded-lg bg-royal-100 flex items-center justify-center text-royal-600">
                  <section.icon className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-royal-900">{section.title}</h2>
              </div>
              {section.fields}
            </Card>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="pt-10"
        >
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full shadow-2xl shadow-primary-500/30"
            disabled={isLoading}
            loading={isLoading}
            icon={Save}
          >
            {language === 'ta' ? 'சுயவிவரத்தைச் சேமி' : 'Save Profile Details'}
          </Button>
        </motion.div>
      </form>
    </div>
  );
};

export default EditProfile;
