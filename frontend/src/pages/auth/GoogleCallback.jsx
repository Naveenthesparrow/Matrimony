import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import Loader from '../../components/common/Loader';
import api from '../../services/api';

const GoogleCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setUser } = useAuthStore();

  useEffect(() => {
    const handleCallback = async () => {
      const token = searchParams.get('token');
      const error = searchParams.get('error');

      if (error) {
        console.error('Google auth error:', error);
        navigate('/login?error=auth_failed');
        return;
      }

      if (!token) {
        navigate('/login');
        return;
      }

      try {
        // Set token and fetch user data
        const response = await api.get('/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const user = response.data.data.user;
        setUser(user, token);

        // Check if onboarding is needed (phone and certificate)
        const hasPhone = !!user.phone;
        const hasCertificate = !!user.communityCertificate?.url;

        if (!hasPhone || !hasCertificate) {
          navigate('/onboarding');
        } else {
          // Navigate to dashboard
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/login?error=auth_failed');
      }
    };

    handleCallback();
  }, [searchParams, navigate, setUser]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Loader />
        <p className="mt-4 text-gray-600">Completing sign in...</p>
      </div>
    </div>
  );
};

export default GoogleCallback;
