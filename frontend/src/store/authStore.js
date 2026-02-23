import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../services/api';
import toast from 'react-hot-toast';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      // Set user data
      setUser: (user, token) => {
        set({ user, token, isAuthenticated: true });
      },

      // Register
      register: async (userData) => {
        set({ isLoading: true });
        try {
          const response = await api.post('/auth/register', userData);
          toast.success(response.data.message);
          return response.data;
        } catch (error) {
          const message = error.response?.data?.message || 'Registration failed';
          toast.error(message);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      // Verify OTP
      verifyOTP: async (phone, otp) => {
        set({ isLoading: true });
        try {
          const response = await api.post('/auth/verify-otp', { phone, otp });
          const { token, data } = response.data;
          set({ 
            user: data.user, 
            token, 
            isAuthenticated: true 
          });
          toast.success('Phone verified successfully!');
          return response.data;
        } catch (error) {
          const message = error.response?.data?.message || 'OTP verification failed';
          toast.error(message);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      // Login
      login: async (phone, password) => {
        set({ isLoading: true });
        try {
          const response = await api.post('/auth/login', { phone, password });
          const { token, data } = response.data;
          set({ 
            user: data.user, 
            token, 
            isAuthenticated: true 
          });
          toast.success('Login successful!');
          return response.data;
        } catch (error) {
          const message = error.response?.data?.message || 'Login failed';
          toast.error(message);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      // Logout
      logout: async () => {
        try {
          await api.post('/auth/logout');
        } catch (error) {
          console.error('Logout error:', error);
        } finally {
          set({ 
            user: null, 
            token: null, 
            isAuthenticated: false 
          });
          toast.success('Logged out successfully');
        }
      },

      // Get current user
      getCurrentUser: async () => {
        const { token } = get();
        if (!token) return;

        try {
          const response = await api.get('/auth/me');
          set({ user: response.data.data.user });
        } catch (error) {
          console.error('Get user error:', error);
          set({ user: null, token: null, isAuthenticated: false });
        }
      },

      // Update user
      updateUser: (userData) => {
        set((state) => ({
          user: { ...state.user, ...userData }
        }));
      },

      // Google OAuth
      googleLogin: () => {
        window.location.href = `${import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000'}/api/auth/google`;
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
