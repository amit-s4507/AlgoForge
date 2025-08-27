@echo off
echo ========================================
echo AlgoForge CloudFront CDN Setup Script
echo ========================================

REM Configuration variables (modify these)
set BUCKET_NAME=algoforge-app-amit-s4507
set DISTRIBUTION_COMMENT="AlgoForge DSA Platform CDN"
set PRICE_CLASS=PriceClass_100

echo Setting up CloudFront distribution for S3 bucket: %BUCKET_NAME%

REM Create CloudFront distribution configuration
echo Creating CloudFront distribution...
aws cloudfront create-distribution --distribution-config "{
  \"CallerReference\": \"algoforge-%date:~-4,4%%date:~-10,2%%date:~-7,2%-%time:~0,2%%time:~3,2%%time:~6,2%\",
  \"Comment\": \"%DISTRIBUTION_COMMENT%\",
  \"DefaultCacheBehavior\": {
    \"TargetOriginId\": \"S3-%BUCKET_NAME%\",
    \"ViewerProtocolPolicy\": \"redirect-to-https\",
    \"MinTTL\": 0,
    \"ForwardedValues\": {
      \"QueryString\": false,
      \"Cookies\": {
        \"Forward\": \"none\"
      }
    },
    \"TrustedSigners\": {
      \"Enabled\": false,
      \"Quantity\": 0
    }
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
  \"PriceClass\": \"%PRICE_CLASS%\",
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
echo CloudFront Distribution Created!
echo ========================================
echo Check cloudfront-output.json for distribution details
echo Note: CloudFront deployment takes 15-20 minutes to complete
echo ========================================

pause