import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, Upload, CheckCircle, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../services/api';
import { useAuthStore } from '../../store/authStore';
import { useTranslation } from '../../context/TranslationContext';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';

const GoogleOnboarding = () => {
    const navigate = useNavigate();
    const { user, token, setUser } = useAuthStore();
    const { language } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [phone, setPhone] = useState('');
    const [certificate, setCertificate] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCertificate(file);
            if (file.type.startsWith('image/')) {
                setPreviewUrl(URL.createObjectURL(file));
            } else {
                setPreviewUrl(null);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate phone number (exactly 10 digits)
        const digitsOnly = phone.replace(/\D/g, '');
        if (digitsOnly.length !== 10) {
            toast.error(language === 'ta' ? 'சரியான தொலைபேசி எண்ணை உள்ளிடுக (10 இலக்கங்கள்)' : 'Please enter a correct 10-digit phone number');
            return;
        }

        if (!certificate) {
            toast.error(language === 'ta' ? 'சான்றிதழைப் பதிவேற்றவும்' : 'Please upload your certificate');
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append('phone', digitsOnly);
        formData.append('communityCertificate', certificate);

        try {
            const response = await api.post('/auth/onboarding', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.status === 'success') {
                const updatedUser = response.data.data.user;
                setUser(updatedUser, token);
                toast.success(language === 'ta' ? 'பதிவு வெற்றிகரமாக முடிந்தது' : 'Onboarding completed successfully');
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Onboarding error:', error);
            toast.error(error.response?.data?.message || 'Error completing onboarding');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    {language === 'ta' ? 'பதிவை முடிக்கவும்' : 'Complete Your Profile'}
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    {language === 'ta' ? 'தொடர உங்கள் தொலைபேசி எண் மற்றும் சான்றிதழைப் பதிவேற்றவும்' : 'Please provide your phone number and community certificate to continue'}
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <Card>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 tracking-wide">
                                {language === 'ta' ? 'தொலைபேசி எண் (10 இலக்கங்கள் மட்டும்)' : 'Phone Number (10 digits only)'}
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-transform group-focus-within:scale-110 duration-200">
                                    <Phone className="h-5 w-5 text-gray-400 group-focus-within:text-primary-500" />
                                </div>
                                <input
                                    type="text"
                                    id="phone"
                                    value={phone}
                                    onChange={(e) => {
                                        const val = e.target.value.replace(/\D/g, '');
                                        if (val.length <= 10) setPhone(val);
                                    }}
                                    className="block w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-primary-100 focus:border-primary-500 focus:bg-white transition-all duration-200 sm:text-sm font-medium"
                                    placeholder="9876543210"
                                    maxLength={10}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700 tracking-wide">
                                {language === 'ta' ? 'சமூக சான்றிதழ்' : 'Community Certificate'}
                            </label>
                            <label
                                htmlFor="certificate"
                                className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-100 border-dashed rounded-2xl bg-gray-50/50 hover:bg-gray-100 hover:border-primary-300 transition-all duration-300 group cursor-pointer block"
                            >
                                <input
                                    id="certificate"
                                    name="certificate"
                                    type="file"
                                    className="sr-only"
                                    onChange={handleFileChange}
                                    accept=".jpg,.jpeg,.png,.pdf"
                                    required
                                />
                                <div className="space-y-4 text-center">
                                    <div className="flex justify-center">
                                        {previewUrl ? (
                                            <div className="relative group/preview">
                                                <img src={previewUrl} alt="Preview" className="h-32 w-32 object-cover rounded-xl shadow-md border-2 border-white ring-1 ring-gray-200" />
                                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/preview:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                                                    <CheckCircle className="h-8 w-8 text-white" />
                                                </div>
                                            </div>
                                        ) : certificate ? (
                                            <div className="p-4 bg-green-50 rounded-2xl border border-green-100">
                                                <CheckCircle className="h-10 w-10 text-green-500" />
                                            </div>
                                        ) : (
                                            <div className="p-4 bg-gray-100 rounded-2xl group-hover:bg-primary-50 transition-colors duration-300">
                                                <Upload className="h-10 w-10 text-gray-400 group-hover:text-primary-500 transition-colors duration-300" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-col items-center space-y-1">
                                        <div className="flex items-baseline justify-center">
                                            <span className="text-sm font-bold text-primary-600 hover:text-primary-500 transition-colors">
                                                {language === 'ta' ? 'கோப்பைத் தேர்ந்தெடுக்கவும்' : 'Select a file'}
                                            </span>
                                            <span className="text-sm pl-2 font-medium text-gray-600">
                                                {language === 'ta' ? 'அல்லது பதிவேற்றவும்' : 'or upload'}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-500 font-medium">PNG, JPG, PDF</p>
                                    </div>
                                    {certificate && !previewUrl && (
                                        <p className="text-sm text-gray-700 font-bold bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100 inline-block">
                                            {certificate.name}
                                        </p>
                                    )}
                                </div>
                            </label>
                        </div>

                        <div className="pt-2">
                            <Button
                                type="submit"
                                variant="primary"
                                className="w-full py-4 text-lg rounded-2xl shadow-lg shadow-primary-200 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                                isLoading={loading}
                            >
                                {language === 'ta' ? 'சமர்ப்பிக்கவும்' : 'Complete Registration'}
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default GoogleOnboarding;
