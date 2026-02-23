import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { TranslationProvider } from './context/TranslationContext';

// Layout
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';
import AdminLayout from './layouts/AdminLayout';

// Public pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import VerifyOTP from './pages/auth/VerifyOTP';
import GoogleCallback from './pages/auth/GoogleCallback';
import GoogleOnboarding from './pages/auth/GoogleOnboarding';
import ProfileList from './pages/profiles/ProfileList';
import ProfileDetail from './pages/profiles/ProfileDetail';

// Protected pages
import Dashboard from './pages/dashboard/Dashboard';
import MyProfile from './pages/dashboard/MyProfile';
import EditProfile from './pages/dashboard/EditProfile';
import Interests from './pages/dashboard/Interests';
import Messages from './pages/dashboard/Messages';
import SavedProfiles from './pages/dashboard/SavedProfiles';
import Settings from './pages/dashboard/Settings';
import ProfileGallery from './pages/profiles/ProfileGallery';

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';
import PendingProfiles from './pages/admin/PendingProfiles';
import UserManagement from './pages/admin/UserManagement';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Admin Route Component
const AdminRoute = ({ children }) => {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

import { useEffect } from 'react';

function App() {
  const { isAuthenticated, getCurrentUser } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      getCurrentUser();
    }
  }, [isAuthenticated, getCurrentUser]);

  return (
    <TranslationProvider>
      <Routes>
        {/* Default Route - Start with Register */}
        <Route path="/" element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/register" replace />
        } />

        {/* Public Routes */}
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
        </Route>

        {/* Google OAuth Callback */}
        <Route path="/auth/callback" element={<GoogleCallback />} />
        <Route path="/onboarding" element={
          <ProtectedRoute>
            <GoogleOnboarding />
          </ProtectedRoute>
        } />

        {/* Protected Profile Routes - Require Login */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/profiles" element={<ProfileList />} />
          <Route path="/profiles/:id" element={<ProfileDetail />} />
          <Route path="/profile/:id" element={<ProfileDetail />} />
        </Route>

        {/* Protected User Routes */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/gallery" element={<ProfileGallery />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/interests" element={<Interests />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/saved" element={<SavedProfiles />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        {/* Admin Routes */}
        <Route
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/pending-profiles" element={<PendingProfiles />} />
          <Route path="/admin/users" element={<UserManagement />} />
        </Route>

        {/* 404 Page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </TranslationProvider>
  );
}

export default App;
