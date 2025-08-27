import React, { createContext, useContext, useState, useEffect } from 'react';
import { OAuth2Provider, checkAndHandleCallback } from '../utils/oauth2';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Check if we're on the callback URL and handle OAuth callback
        const callbackResult = await checkAndHandleCallback();
        
        if (callbackResult && callbackResult.success) {
          setUser(callbackResult.user);
          setLoading(false);
          return;
        }
        
        // Check for existing session on app load
        const savedUser = localStorage.getItem('algoforge_user');
        if (savedUser) {
          try {
            setUser(JSON.parse(savedUser));
          } catch (error) {
            console.error('Error parsing saved user:', error);
            localStorage.removeItem('algoforge_user');
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (provider = 'google') => {
    try {
      setLoading(true);
      
      // Check if OAuth2 credentials are configured
      const config = provider === 'google' 
        ? { clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID }
        : { clientId: import.meta.env.VITE_GITHUB_CLIENT_ID };
      

      
      if (!config.clientId || config.clientId === '') {
        setLoading(false);
        return { success: false, error: 'OAuth2 credentials not configured. Please check your .env file.' };
      }
      
      // Store the provider for callback handling
      localStorage.setItem('oauth_provider', provider);
      
      // Create OAuth2 provider instance and start authentication
      const oauthProvider = new OAuth2Provider(provider);
      await oauthProvider.authenticate();
      
      // The authenticate method will redirect to OAuth provider
      // The callback will be handled by the AuthCallback component
      return { success: true, redirecting: true };
    } catch (error) {
      console.error('Login error:', error);
      setLoading(false);
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('algoforge_user');
    localStorage.removeItem('algoforge_token');
    localStorage.removeItem('algoforge_refresh_token');
    localStorage.removeItem('oauth_provider');
  };

  // Method to handle OAuth callback
  const handleOAuthCallback = async (provider) => {
    try {
      setLoading(true);
      
      const oauthProvider = new OAuth2Provider(provider);
      const urlParams = new URLSearchParams(window.location.search);
      const result = await oauthProvider.handleCallback(urlParams);
      
      // Store user data and token
      setUser(result.user);
      localStorage.setItem('algoforge_user', JSON.stringify(result.user));
      localStorage.setItem('algoforge_token', result.token);
      if (result.refreshToken) {
        localStorage.setItem('algoforge_refresh_token', result.refreshToken);
      }
      
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
      
      return { success: true, user: result.user };
    } catch (error) {
      console.error('OAuth callback error:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user,
    handleOAuthCallback
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
