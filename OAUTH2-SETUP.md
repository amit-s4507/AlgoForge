# 🔐 OAuth2 Setup Guide for AlgoForge

## 🎯 Overview
This guide will help you set up Google and GitHub OAuth2 authentication for your AlgoForge deployment.

## 🚀 Quick Fix for Your Current Issues

### 1. **Set Up Google OAuth2**

#### Step 1: Google Cloud Console Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Navigate to **APIs & Services** > **Credentials**
4. Click **Create Credentials** > **OAuth 2.0 Client IDs**

#### Step 2: Configure OAuth2 Client
- **Application type**: Web application
- **Name**: AlgoForge
- **Authorized JavaScript origins**: 
  - `https://dsa-sheet-tau.vercel.app`
  - `http://localhost:3000` (for development)
- **Authorized redirect URIs**:
  - `https://dsa-sheet-tau.vercel.app/auth/callback`
  - `http://localhost:3000/auth/callback` (for development)

#### Step 3: Get Credentials
- Copy the **Client ID** and **Client Secret**

### 2. **Set Up GitHub OAuth2**

#### Step 1: GitHub App Setup
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click **New OAuth App**

#### Step 2: Configure OAuth App
- **Application name**: AlgoForge DSA Platform
- **Homepage URL**: `https://dsa-sheet-tau.vercel.app`
- **Authorization callback URL**: `https://dsa-sheet-tau.vercel.app/auth/callback`
- **Application description**: DSA learning platform with progress tracking

#### Step 3: Get Credentials
- Copy the **Client ID** and **Client Secret**

### 3. **Configure Vercel Environment Variables**

#### Option A: Vercel Dashboard (Recommended)
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your `dsa-sheet-tau` project
3. Go to **Settings** > **Environment Variables**
4. Add the following variables:

```
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
VITE_GOOGLE_CLIENT_SECRET=your_google_client_secret_here
VITE_GOOGLE_REDIRECT_URI=https://dsa-sheet-tau.vercel.app/auth/callback

VITE_GITHUB_CLIENT_ID=your_github_client_id_here
VITE_GITHUB_CLIENT_SECRET=your_github_client_secret_here
VITE_GITHUB_REDIRECT_URI=https://dsa-sheet-tau.vercel.app/auth/callback
```

#### Option B: Vercel CLI
```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Set environment variables
vercel env add VITE_GOOGLE_CLIENT_ID
vercel env add VITE_GOOGLE_CLIENT_SECRET
vercel env add VITE_GOOGLE_REDIRECT_URI
vercel env add VITE_GITHUB_CLIENT_ID
vercel env add VITE_GITHUB_CLIENT_SECRET
vercel env add VITE_GITHUB_REDIRECT_URI
```

### 4. **Redeploy Your Application**
After setting environment variables, redeploy your application:
```bash
vercel --prod
```

## 🔧 Local Development Setup

### 1. Create `.env.local` file
```env
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_GOOGLE_CLIENT_SECRET=your_google_client_secret
VITE_GOOGLE_REDIRECT_URI=http://localhost:3000/auth/callback

VITE_GITHUB_CLIENT_ID=your_github_client_id
VITE_GITHUB_CLIENT_SECRET=your_github_client_secret
VITE_GITHUB_REDIRECT_URI=http://localhost:3000/auth/callback
```

### 2. Restart Development Server
```bash
npm run dev
```

## 🛠️ Troubleshooting

### Common Issues:

#### 1. **"OAuth2 credentials not configured" Error**
- **Cause**: Environment variables not set in Vercel
- **Solution**: Add environment variables in Vercel dashboard and redeploy

#### 2. **"Redirect URI Mismatch" Error**
- **Cause**: OAuth app redirect URI doesn't match actual callback URL
- **Solution**: Update OAuth app settings to include correct callback URL

#### 3. **"This site can't be reached" After OAuth**
- **Cause**: OAuth callback not handled properly
- **Solution**: Ensure OAuth app callback URL is exactly `https://dsa-sheet-tau.vercel.app/auth/callback`

#### 4. **"Invalid state parameter" Error**
- **Cause**: CSRF protection failure or localStorage issues
- **Solution**: Clear browser storage and try again

### Debug Steps:

1. **Check Environment Variables**
   ```bash
   # In development
   console.log(import.meta.env.VITE_GOOGLE_CLIENT_ID);
   ```

2. **Verify OAuth App Configuration**
   - Double-check redirect URIs in Google/GitHub settings
   - Ensure URLs exactly match your deployment URL

3. **Test Callback URL**
   - Manually visit: `https://dsa-sheet-tau.vercel.app/auth/callback`
   - Should show the OAuth callback handler page

## 📋 Security Best Practices

### 1. **Environment Variables**
- Never commit `.env` files to git
- Use different credentials for development and production
- Regularly rotate client secrets

### 2. **OAuth Configuration**
- Limit redirect URIs to only necessary domains
- Use HTTPS in production
- Implement proper CSRF protection

### 3. **Error Handling**
- Don't expose sensitive information in error messages
- Log OAuth errors for debugging
- Provide user-friendly error messages

## 🎯 Final Checklist

Before going live, ensure:

- [ ] Google OAuth2 app configured with correct redirect URI
- [ ] GitHub OAuth2 app configured with correct redirect URI
- [ ] All environment variables set in Vercel
- [ ] Application redeployed after setting environment variables
- [ ] OAuth callback URL accessible: `https://dsa-sheet-tau.vercel.app/auth/callback`
- [ ] Test Google and GitHub login flows
- [ ] Error handling working properly

## 🔗 Useful Links

- [Google OAuth2 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [GitHub OAuth Apps Documentation](https://docs.github.com/en/developers/apps/building-oauth-apps)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

## 🆘 Need Help?

If you're still experiencing issues:

1. Check browser console for detailed error messages
2. Verify OAuth app configurations in Google/GitHub
3. Ensure environment variables are properly set in Vercel
4. Test the callback URL directly in your browser

The OAuth2 setup is complete once all authentication flows work without errors! 🎉