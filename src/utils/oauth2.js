// OAuth2 implementation for real authentication providers
// This file contains the actual OAuth2 flow implementations

export const OAUTH_CONFIG = {
  google: {
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
    redirectUri: import.meta.env.VITE_GOOGLE_REDIRECT_URI || 'http://localhost:3000/auth/callback',
    scope: 'openid email profile',
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
    userInfoUrl: 'https://www.googleapis.com/oauth2/v2/userinfo'
  },
  github: {
    clientId: import.meta.env.VITE_GITHUB_CLIENT_ID || '',
    redirectUri: import.meta.env.VITE_GITHUB_REDIRECT_URI || 'http://localhost:3000/auth/callback',
    scope: 'user:email',
    authUrl: 'https://github.com/login/oauth/authorize',
    tokenUrl: 'https://github.com/login/oauth/access_token',
    userInfoUrl: 'https://api.github.com/user'
  }
};

export class OAuth2Provider {
  constructor(provider) {
    this.config = OAUTH_CONFIG[provider];
    this.provider = provider;
  }

  // Generate OAuth2 authorization URL
  getAuthUrl(state = null) {
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      redirect_uri: this.config.redirectUri,
      scope: this.config.scope,
      response_type: 'code',
      ...(state && { state })
    });

    return `${this.config.authUrl}?${params.toString()}`;
  }

  // Exchange authorization code for access token
  async exchangeCodeForToken(code) {
    const response = await fetch(this.config.tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: new URLSearchParams({
        client_id: this.config.clientId,
        client_secret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET || import.meta.env.VITE_GITHUB_CLIENT_SECRET || '',
        code,
        redirect_uri: this.config.redirectUri,
        grant_type: 'authorization_code'
      })
    });

    if (!response.ok) {
      throw new Error('Failed to exchange code for token');
    }

    return await response.json();
  }

  // Get user information using access token
  async getUserInfo(accessToken) {
    const response = await fetch(this.config.userInfoUrl, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to get user info');
    }

    const userData = await response.json();
    
    // Normalize user data across providers
    return this.normalizeUserData(userData);
  }

  // Normalize user data to consistent format
  normalizeUserData(userData) {
    if (this.provider === 'google') {
      return {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        avatar: userData.picture,
        provider: 'google'
      };
    } else if (this.provider === 'github') {
      return {
        id: userData.id.toString(),
        name: userData.name || userData.login,
        email: userData.email,
        avatar: userData.avatar_url,
        provider: 'github'
      };
    }
    
    return userData;
  }

  // Complete OAuth2 flow
  async authenticate() {
    // Generate state for CSRF protection
    const state = Math.random().toString(36).substring(7);
    localStorage.setItem('oauth_state', state);

    // Redirect to OAuth provider
    window.location.href = this.getAuthUrl(state);
  }

  // Handle OAuth2 callback
  async handleCallback(urlParams) {
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    const storedState = localStorage.getItem('oauth_state');

    // Verify state parameter
    if (state !== storedState) {
      throw new Error('Invalid state parameter');
    }

    // Clean up state
    localStorage.removeItem('oauth_state');

    if (!code) {
      throw new Error('Authorization code not found');
    }

    // Exchange code for token
    const tokenData = await this.exchangeCodeForToken(code);
    
    // Get user info
    const userInfo = await this.getUserInfo(tokenData.access_token);

    return {
      user: userInfo,
      token: tokenData.access_token,
      refreshToken: tokenData.refresh_token
    };
  }
}

// Utility function to handle OAuth2 callback
export const handleOAuthCallback = async (provider) => {
  const urlParams = new URLSearchParams(window.location.search);
  const oauthProvider = new OAuth2Provider(provider);
  
  try {
    const result = await oauthProvider.handleCallback(urlParams);
    
    // Store user data and token
    localStorage.setItem('algoforge_user', JSON.stringify(result.user));
    localStorage.setItem('algoforge_token', result.token);
    if (result.refreshToken) {
      localStorage.setItem('algoforge_refresh_token', result.refreshToken);
    }
    
    // Clean up URL and redirect to home
    window.history.replaceState({}, document.title, '/');
    window.location.href = '/';
    
    return { success: true, user: result.user };
  } catch (error) {
    console.error('OAuth callback error:', error);
    return { success: false, error: error.message };
  }
};

// Check if we're on the callback URL and handle it
export const checkAndHandleCallback = async () => {
  if (window.location.pathname === '/auth/callback') {
    const provider = localStorage.getItem('oauth_provider') || 'google';
    const result = await handleOAuthCallback(provider);
    return result;
  }
  return null;
};

// Environment variables needed for OAuth2:
// REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
// REACT_APP_GOOGLE_CLIENT_SECRET=your_google_client_secret
// REACT_APP_GITHUB_CLIENT_ID=your_github_client_id
// REACT_APP_GITHUB_CLIENT_SECRET=your_github_client_secret
