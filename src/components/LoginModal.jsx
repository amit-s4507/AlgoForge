import React, { useState } from 'react';
import { X, Github, Mail } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function LoginModal({ onClose }) {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (provider) => {
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
            <h2 className="text-lg font-semibold text-gray-100">Welcome to AlgoForge</h2>
            <p className="text-sm text-gray-400">Sign in to sync your progress across devices</p>
          </div>
          
          <div className="space-y-3">
            <button
              onClick={() => handleLogin('google')}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-medium text-gray-100 hover:bg-white/10 disabled:opacity-50"
            >
              <Mail className="h-5 w-5"/>
              Continue with Google
            </button>
            
            <button
              onClick={() => handleLogin('github')}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-medium text-gray-100 hover:bg-white/10 disabled:opacity-50"
            >
              <Github className="h-5 w-5"/>
              Continue with GitHub
            </button>
          </div>
          
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
