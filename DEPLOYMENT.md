# AlgoForge Deployment Guide

## Option 1: AWS S3 + CloudFront (Recommended)
After configuring AWS CLI, run:
```bash
./deploy-aws.bat
```

## Option 2: Vercel (Easiest)
```bash
npm install -g vercel
vercel --prod
```

## Option 3: Netlify (Drag & Drop)
1. Go to https://netlify.com
2. Drag and drop the `dist` folder
3. Your site will be live instantly!

## Option 4: GitHub Pages
```bash
npm install -g gh-pages
npm run build
npx gh-pages -d dist
```

## Option 5: Surge.sh (Simple)
```bash
npm install -g surge
cd dist
surge
```

## Environment Variables for Production
Create `.env.production`:
```
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_GITHUB_CLIENT_ID=your_github_client_id
```

## AWS CloudFront Setup (Optional)
For global CDN and custom domain:
1. Create CloudFront distribution
2. Origin: Your S3 bucket website endpoint
3. Configure custom domain (if you have one)