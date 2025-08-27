# AlgoForge Deployment Guide

## Option 1: AWS S3 + CloudFront (Production Ready)
After configuring AWS CLI, run:
```bash
./deploy-aws.bat
```
This will:
- Deploy to S3 for hosting
- Set up CloudFront CDN for global distribution
- Provide HTTPS and DDoS protection
- Cache content at 400+ global edge locations

For detailed CloudFront setup, see: `CLOUDFRONT-SETUP.md`

## Option 2: CloudFront Only (If S3 already exists)
```bash
./setup-cloudfront.bat
```
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