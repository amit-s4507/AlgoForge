import React, { useState } from 'react';
import { X, Github, Mail } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { EmailPasswordAuth } from './EmailPasswordAuth';

export function LoginModal({ onClose }) {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [authMode, setAuthMode] = useState('oauth'); // 'oauth' or 'email'
  const [isLoginMode, setIsLoginMode] = useState(true); // true for login, false for signup

  const handleOAuthLogin = async (provider) => {
    setLoading(true);
    try {
      const result = await login(provider);
      if (result.success) {
        if (result.redirecting) {
          // The user will be redirected to OAuth provider
          // No need to close modal as page will redirect
        } else {
          onClose();
        }
      } else {
        alert('Login failed: ' + result.error);
        setLoading(false);
      }
    } catch (error) {
      alert('Login failed: ' + error.message);
      setLoading(false);
    }
  };

  const handleEmailPasswordAuth = async (authData) => {
    // In a real application, this would connect to your backend
    // For now, we'll simulate authentication
    
    if (authData.type === 'signup') {
      // Simulate user creation
      const newUser = {
        id: Date.now().toString(),
        name: authData.name,
        email: authData.email,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(authData.name)}&background=6366f1&color=fff`,
        provider: 'email'
      };
      
      // Store user data (in real app, this would be handled by backend)
      localStorage.setItem('algoforge_user', JSON.stringify(newUser));
      
      // Simulate successful signup
      window.location.reload(); // Refresh to update auth state
      return { success: true };
    } else {
      // Simulate login validation
      // In real app, this would validate credentials against backend
      
      // For demo purposes, accept any email/password combination
      const simulatedUser = {
        id: 'email_user',
        name: authData.email.split('@')[0],
        email: authData.email,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(authData.email.split('@')[0])}&background=6366f1&color=fff`,
        provider: 'email'
      };
      
      localStorage.setItem('algoforge_user', JSON.stringify(simulatedUser));
      window.location.reload();
      return { success: true };
    }
  };

  return (
    <div className="fixed inset-0 z-30 grid place-items-center bg-black/60 p-3">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#0f1117] shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
          <div className="text-sm font-semibold tracking-tight">Sign in to AlgoForge</div>
          <button onClick={onClose} className="rounded-xl border border-white/10 p-1.5 hover:border-white/20">
            <X className="h-4 w-4"/>
          </button>
        </div>
        <div className="p-6">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-500 to-emerald-500"/>
            <h2 className="text-lg font-semibold text-gray-100">
              {authMode === 'oauth' 
                ? 'Welcome to AlgoForge' 
                : isLoginMode 
                  ? 'Sign in to your account' 
                  : 'Create your account'
              }
            </h2>
            <p className="text-sm text-gray-400">
              {authMode === 'oauth' 
                ? 'Sign in to sync your progress across devices'
                : isLoginMode
                  ? 'Enter your credentials to access your account'
                  : 'Join AlgoForge to track your DSA journey'
              }
            </p>
          </div>
          
          {authMode === 'oauth' ? (
            /* OAuth2 Authentication */
            <>
              <div className="space-y-3">
                <button
                  onClick={() => handleOAuthLogin('google')}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-medium text-gray-100 hover:bg-white/10 disabled:opacity-50"
                >
                  <Mail className="h-5 w-5"/>
                  Continue with Google
                </button>
                
                <button
                  onClick={() => handleOAuthLogin('github')}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-medium text-gray-100 hover:bg-white/10 disabled:opacity-50"
                >
                  <Github className="h-5 w-5"/>
                  Continue with GitHub
                </button>
              </div>
              
              <div className="my-6 flex items-center">
                <div className="flex-1 h-px bg-white/10" />
                <span className="px-3 text-xs text-gray-400">or</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>
              
              <button
                onClick={() => setAuthMode('email')}
                className="w-full flex items-center justify-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 py-3 text-sm font-medium text-emerald-400 hover:bg-emerald-500/20"
              >
                <Mail className="h-5 w-5"/>
                Continue with Email
              </button>
            </>
          ) : (
            /* Email/Password Authentication */
            <>
              <EmailPasswordAuth
                onSubmit={handleEmailPasswordAuth}
                onToggleMode={() => setIsLoginMode(!isLoginMode)}
                isLogin={isLoginMode}
              />
              
              <div className="mt-6 pt-4 border-t border-white/10">
                <button
                  onClick={() => setAuthMode('oauth')}
                  className="w-full text-center text-sm text-gray-400 hover:text-gray-300 transition-colors"
                >
                  ← Back to social login
                </button>
              </div>
            </>
          )}
          
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              By signing in, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
