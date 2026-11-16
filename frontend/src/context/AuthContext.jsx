import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('implexcart_token'));
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('signin'); // 'signin' | 'signup'
  const [authToast, setAuthToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setAuthToast({ message, type });
    setTimeout(() => {
      setAuthToast(null);
    }, 4000);
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const res = await api.getMe();
          if (res.success && res.user) {
            setUser(res.user);
          } else {
            logout();
          }
        } catch (e) {
          console.error('Error restoring session:', e);
          logout();
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, [token]);

  const login = async (email, password) => {
    try {
      const res = await api.login(email, password);
      if (res.success && res.token) {
        localStorage.setItem('implexcart_token', res.token);
        setToken(res.token);
        setUser(res.user);
        setIsAuthModalOpen(false);
        showToast(`Welcome back, ${res.user.name}!`, 'success');
        return { success: true };
      }
      return { success: false, error: res.error || 'Login failed.' };
    } catch (err) {
      return { success: false, error: 'Network error during login.' };
    }
  };

  const register = async (name, email, password, phone = '') => {
    try {
      const res = await api.register(name, email, password, phone);
      if (res.success && res.token) {
        localStorage.setItem('implexcart_token', res.token);
        setToken(res.token);
        setUser(res.user);
        setIsAuthModalOpen(false);
        showToast(`Account created! Welcome to Implex Cart, ${res.user.name}.`, 'success');
        return { success: true };
      }
      return { success: false, error: res.error || 'Registration failed.' };
    } catch (err) {
      return { success: false, error: 'Network error during registration.' };
    }
  };

  const logout = () => {
    localStorage.removeItem('implexcart_token');
    setToken(null);
    setUser(null);
    showToast('You have been signed out.', 'info');
  };

  const openAuthModal = (mode = 'signin', reason = '') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
    if (reason) {
      showToast(reason, 'warning');
    }
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout,
        isAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        openAuthModal,
        closeAuthModal,
        authToast,
        showToast
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
