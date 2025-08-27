import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export function OAuthCallback() {
  const { handleOAuthCallback } = useAuth();
  const [status, setStatus] = useState('processing');
  const [error, setError] = useState(null);

  useEffect(() => {
    const processCallback = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const provider = localStorage.getItem('oauth_provider') || 'google';
        
        // Check for error in URL params (OAuth provider sent error)
        const error = urlParams.get('error');
        if (error) {
          setError(`Authentication failed: ${error}`);
          setStatus('error');
          // Redirect to home after showing error
          setTimeout(() => {
            window.location.href = '/';
          }, 3000);
          return;
        }

        // Check for authorization code
        const code = urlParams.get('code');
        if (!code) {
          setError('No authorization code received');
          setStatus('error');
          setTimeout(() => {
            window.location.href = '/';
          }, 3000);
          return;
        }

        // Process the OAuth callback
        const result = await handleOAuthCallback(provider);
        
        if (result.success) {
          setStatus('success');
          // Redirect to home after successful authentication
          setTimeout(() => {
            window.location.href = '/';
          }, 1500);
        } else {
          setError(result.error || 'Authentication failed');
          setStatus('error');
          setTimeout(() => {
            window.location.href = '/';
          }, 3000);
        }
      } catch (err) {
        console.error('Callback processing error:', err);
        setError(err.message || 'An unexpected error occurred');
        setStatus('error');
        setTimeout(() => {
          window.location.href = '/';
        }, 3000);
      }
    };

    processCallback();
  }, [handleOAuthCallback]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 rounded-xl p-8 shadow-2xl border border-gray-700 max-w-md w-full mx-4">
        <div className="text-center">
          {status === 'processing' && (
            <>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <h2 className="text-xl font-semibold text-gray-100 mb-2">Processing Authentication...</h2>
              <p className="text-gray-400">Please wait while we complete your sign-in.</p>
            </>
          )}
          
          {status === 'success' && (
            <>
              <div className="text-green-500 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-100 mb-2">Authentication Successful!</h2>
              <p className="text-gray-400">Redirecting you to the application...</p>
            </>
          )}
          
          {status === 'error' && (
            <>
              <div className="text-red-500 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-100 mb-2">Authentication Failed</h2>
              <p className="text-red-400 mb-4">{error}</p>
              <p className="text-gray-400 text-sm">Redirecting you back to the home page...</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}