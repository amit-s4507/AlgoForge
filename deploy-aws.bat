@echo off
echo ========================================
echo AlgoForge AWS S3 Deployment Script
echo ========================================

REM Set your bucket name (change this to your preferred bucket name)
set BUCKET_NAME=algoforge-app-amit-s4507

echo Creating S3 bucket: %BUCKET_NAME%
aws s3 mb s3://%BUCKET_NAME% --region us-east-1

echo Uploading files to S3...
aws s3 sync dist/ s3://%BUCKET_NAME% --delete

echo Configuring S3 bucket for static website hosting...
aws s3 website s3://%BUCKET_NAME% --index-document index.html --error-document index.html

echo Setting bucket policy for public access...
aws s3api put-bucket-policy --bucket %BUCKET_NAME% --policy "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Sid\":\"PublicReadGetObject\",\"Effect\":\"Allow\",\"Principal\":\"*\",\"Action\":\"s3:GetObject\",\"Resource\":\"arn:aws:s3:::%BUCKET_NAME%/*\"}]}"

echo ========================================
echo Deployment Complete!
echo ========================================
echo Your website is now available at:
echo http://%BUCKET_NAME%.s3-website-us-east-1.amazonaws.com
echo ========================================

pause