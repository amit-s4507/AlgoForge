import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';

export function EmailPasswordAuth({ onSubmit, onToggleMode, isLogin = true }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Name validation for signup
    if (!isLogin && !formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    // Confirm password validation for signup
    if (!isLogin) {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const result = await onSubmit({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        type: isLogin ? 'login' : 'signup'
      });

      if (!result.success) {
        setErrors({ submit: result.error });
      }
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!isLogin && (
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-3 text-sm outline-none placeholder:text-gray-500 focus:border-white/20"
              placeholder="Enter your full name"
            />
          </div>
          {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-3 text-sm outline-none placeholder:text-gray-500 focus:border-white/20"
            placeholder="Enter your email"
          />
        </div>
        {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-10 text-sm outline-none placeholder:text-gray-500 focus:border-white/20"
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password}</p>}
      </div>

      {!isLogin && (
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-10 text-sm outline-none placeholder:text-gray-500 focus:border-white/20"
              placeholder="Confirm your password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.confirmPassword && <p className="mt-1 text-xs text-red-400">{errors.confirmPassword}</p>}
        </div>
      )}

      {errors.submit && (
        <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-3">
          <p className="text-sm text-red-400">{errors.submit}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-emerald-600 py-3 text-sm font-medium text-white hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
      </button>

      <div className="text-center">
        <button
          type="button"
          onClick={onToggleMode}
          className="text-sm text-gray-400 hover:text-gray-300 transition-colors"
        >
          {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
        </button>
      </div>
    </form>
  );
}