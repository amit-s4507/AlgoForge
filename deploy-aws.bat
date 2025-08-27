@echo off
echo ========================================
echo AlgoForge AWS S3 + CloudFront Deployment
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
echo S3 Deployment Complete!
echo ========================================
echo Your S3 website is available at:
echo http://%BUCKET_NAME%.s3-website-us-east-1.amazonaws.com
echo ========================================

echo.
echo Setting up CloudFront CDN for global distribution...
echo This will take 15-20 minutes to deploy globally.
echo.

REM Create CloudFront distribution
echo Creating CloudFront distribution...
aws cloudfront create-distribution --distribution-config "{
  \"CallerReference\": \"algoforge-%date:~-4,4%%date:~-10,2%%date:~-7,2%-%time:~0,2%%time:~3,2%%time:~6,2%\",
  \"Comment\": \"AlgoForge DSA Platform CDN\",
  \"DefaultCacheBehavior\": {
    \"TargetOriginId\": \"S3-%BUCKET_NAME%\",
    \"ViewerProtocolPolicy\": \"redirect-to-https\",
    \"MinTTL\": 0,
    \"DefaultTTL\": 86400,
    \"MaxTTL\": 31536000,
    \"ForwardedValues\": {
      \"QueryString\": false,
      \"Cookies\": {
        \"Forward\": \"none\"
      }
    },
    \"TrustedSigners\": {
      \"Enabled\": false,
      \"Quantity\": 0
    },
    \"Compress\": true
  },
  \"Origins\": {
    \"Quantity\": 1,
    \"Items\": [
      {
        \"Id\": \"S3-%BUCKET_NAME%\",
        \"DomainName\": \"%BUCKET_NAME%.s3-website-us-east-1.amazonaws.com\",
        \"CustomOriginConfig\": {
          \"HTTPPort\": 80,
          \"HTTPSPort\": 443,
          \"OriginProtocolPolicy\": \"http-only\"
        }
      }
    ]
  },
  \"Enabled\": true,
  \"PriceClass\": \"PriceClass_100\",
  \"DefaultRootObject\": \"index.html\",
  \"CustomErrorResponses\": {
    \"Quantity\": 1,
    \"Items\": [
      {
        \"ErrorCode\": 404,
        \"ResponsePagePath\": \"/index.html\",
        \"ResponseCode\": \"200\",
        \"ErrorCachingMinTTL\": 300
      }
    ]
  }
}" > cloudfront-output.json

echo ========================================
echo Full AWS Deployment Complete!
echo ========================================
echo S3 Website: http://%BUCKET_NAME%.s3-website-us-east-1.amazonaws.com
echo CloudFront: Check cloudfront-output.json for CDN URL
echo Note: CloudFront takes 15-20 minutes to deploy globally
echo ========================================

pause