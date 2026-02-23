import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { FiGrid, FiUsers, FiCheckCircle, FiBarChart, FiLogOut, FiGlobe } from 'react-icons/fi';
import { useTranslation } from '../context/TranslationContext';
import { Heart } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const { language, toggleLanguage } = useTranslation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navigation = [
    { name: 'Dashboard', to: '/admin', icon: FiGrid },
    { name: 'Pending Profiles', to: '/admin/pending-profiles', icon: FiCheckCircle },
    { name: 'User Management', to: '/admin/users', icon: FiUsers },
    { name: 'Analytics', to: '/admin/analytics', icon: FiBarChart },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 text-gray-900">
      <div className="flex">
        {/* Sidebar */}
        <aside className="fixed lg:sticky top-0 h-screen w-72 bg-white border-r border-gray-200 z-40 transition-all duration-150">
          <div className="pt-6 pl-6 pb-6 flex flex-col h-full">
            <div className="flex-shrink-0 pr-6">
              <Link to="/" className="flex items-center space-x-3 mb-10 group">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-500 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-100 group-hover:scale-105 transition-transform duration-150">
                  <Heart className="w-6 h-6 text-white" fill="currentColor" />
                </div>
                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">
                  Admin&nbsp;<span className="text-primary-600">Panel</span>
                </h1>
              </Link>
            </div>

            <nav className="flex-1 space-y-2.5 overflow-y-auto custom-scrollbar pr-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.to;

                return (
                  <Link
                    key={item.name}
                    to={item.to}
                    className={`
                    flex items-center space-x-3.5 px-3.5 py-3 rounded-2xl
                    transition-all duration-100 group
                    ${isActive
                        ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-md shadow-primary-200/50'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-primary-600'
                      }
                  `}
                  >
                    <div className={`
                    p-2 rounded-xl transition-colors
                    ${isActive ? 'bg-white/20' : 'bg-gray-100 group-hover:bg-primary-50'}
                  `}>
                      <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-primary-600'}`} />
                    </div>
                    <span className="font-semibold tracking-wide">{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto pt-6 border-t border-gray-100 pr-6 space-y-3">
              <button
                onClick={toggleLanguage}
                className="w-full flex items-center space-x-4 px-4 py-3.5 rounded-2xl text-gray-700 hover:bg-gray-50 transition-all duration-100 group"
              >
                <div className="p-2 rounded-xl bg-gray-100 group-hover:bg-primary-50 transition-colors">
                  <FiGlobe className="w-5 h-5 text-gray-500 group-hover:text-primary-600" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="font-semibold tracking-wide text-sm">
                    {language === 'ta' ? 'தமிழ்' : 'English'}
                  </span>
                  <span className="text-xs text-gray-400">
                    {language === 'ta' ? 'Switch to English' : 'தமிழில் மாற்றவும்'}
                  </span>
                </div>
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-4 px-4 py-3.5 rounded-2xl text-red-600 hover:bg-red-50 transition-all duration-100 group"
              >
                <div className="p-2 rounded-xl bg-red-100 group-hover:bg-red-200 transition-colors">
                  <FiLogOut className="w-5 h-5 text-red-600" />
                </div>
                <span className="font-semibold tracking-wide">Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
