# 🌐 CloudFront CDN Setup Guide for AlgoForge

## 🎯 What is CloudFront?
Amazon CloudFront is a global content delivery network (CDN) that speeds up your website by caching content at edge locations worldwide, reducing latency for users globally.

## 🚀 Benefits of Using CloudFront

### ⚡ **Performance Benefits**
- **Global Edge Locations**: 400+ edge locations worldwide
- **Faster Load Times**: Reduced latency for international users
- **Caching**: Static assets cached at edge locations
- **Compression**: Automatic GZIP compression

### 🔒 **Security Benefits**
- **DDoS Protection**: Built-in protection against attacks
- **SSL/TLS**: Free SSL certificates via AWS Certificate Manager
- **Origin Shield**: Additional caching layer for origin protection
- **WAF Integration**: Web Application Firewall support

### 💰 **Cost Benefits**
- **Reduced Origin Load**: Less bandwidth usage on S3
- **Pay-as-you-go**: Only pay for what you use
- **Free Tier**: 1TB data transfer out per month for first year

## 🛠️ CloudFront Setup Options

### Option 1: Automated Setup (Recommended)
Run the provided script:
```bash
./setup-cloudfront.bat
```

### Option 2: Manual Setup via AWS Console

#### Step 1: Access CloudFront Console
1. Go to [AWS CloudFront Console](https://console.aws.amazon.com/cloudfront/)
2. Click **Create Distribution**

#### Step 2: Configure Origin Settings
- **Origin Domain**: `algoforge-app-amit-s4507.s3-website-us-east-1.amazonaws.com`
- **Protocol**: HTTP only (S3 website endpoints don't support HTTPS)
- **Origin Path**: Leave empty
- **Origin ID**: `S3-algoforge-app-amit-s4507`

#### Step 3: Configure Default Cache Behavior
- **Viewer Protocol Policy**: Redirect HTTP to HTTPS
- **Allowed HTTP Methods**: GET, HEAD
- **Cache Based on Selected Request Headers**: None
- **Object Caching**: Use Origin Cache Headers
- **Forward Cookies**: None
- **Query String Forwarding**: None
- **Smooth Streaming**: No
- **Restrict Viewer Access**: No

#### Step 4: Configure Distribution Settings
- **Price Class**: Use Only U.S., Canada and Europe (cheaper option)
- **AWS WAF Web ACL**: None
- **Alternate Domain Names (CNAMEs)**: Leave empty (or add your custom domain)
- **SSL Certificate**: Default CloudFront Certificate
- **Default Root Object**: `index.html`
- **Logging**: Off (or configure if needed)
- **IPv6**: Enabled
- **Comment**: `AlgoForge DSA Platform CDN`
- **Distribution State**: Enabled

#### Step 5: Configure Custom Error Pages
Add custom error response:
- **HTTP Error Code**: 404
- **Error Caching Minimum TTL**: 300
- **Customize Error Response**: Yes
- **Response Page Path**: `/index.html`
- **HTTP Response Code**: 200

#### Step 6: Create Distribution
Click **Create Distribution** and wait 15-20 minutes for deployment.

### Option 3: AWS CLI Setup

```bash
# Create distribution using AWS CLI
aws cloudfront create-distribution --distribution-config file://cloudfront-config.json

# Check distribution status
aws cloudfront list-distributions

# Get distribution details
aws cloudfront get-distribution --id YOUR_DISTRIBUTION_ID
```

## 📋 CloudFront Configuration JSON

```json
{
  "CallerReference": "algoforge-cloudfront-2024",
  "Comment": "AlgoForge DSA Platform CDN",
  "DefaultCacheBehavior": {
    "TargetOriginId": "S3-algoforge-app-amit-s4507",
    "ViewerProtocolPolicy": "redirect-to-https",
    "MinTTL": 0,
    "DefaultTTL": 86400,
    "MaxTTL": 31536000,
    "ForwardedValues": {
      "QueryString": false,
      "Cookies": {
        "Forward": "none"
      },
      "Headers": {
        "Quantity": 0
      }
    },
    "TrustedSigners": {
      "Enabled": false,
      "Quantity": 0
    },
    "Compress": true
  },
  "Origins": {
    "Quantity": 1,
    "Items": [
      {
        "Id": "S3-algoforge-app-amit-s4507",
        "DomainName": "algoforge-app-amit-s4507.s3-website-us-east-1.amazonaws.com",
        "CustomOriginConfig": {
          "HTTPPort": 80,
          "HTTPSPort": 443,
          "OriginProtocolPolicy": "http-only",
          "OriginSslProtocols": {
            "Quantity": 1,
            "Items": ["TLSv1.2"]
          }
        }
      }
    ]
  },
  "Enabled": true,
  "PriceClass": "PriceClass_100",
  "DefaultRootObject": "index.html",
  "CustomErrorResponses": {
    "Quantity": 1,
    "Items": [
      {
        "ErrorCode": 404,
        "ResponsePagePath": "/index.html",
        "ResponseCode": "200",
        "ErrorCachingMinTTL": 300
      }
    ]
  }
}
```

## 🎯 Post-Setup Configuration

### 1. **Update DNS (If Using Custom Domain)**
```bash
# Create CNAME record pointing to CloudFront distribution
example.com -> d1234567890.cloudfront.net
```

### 2. **SSL Certificate (For Custom Domain)**
- Request certificate via AWS Certificate Manager
- Add certificate to CloudFront distribution
- Validate domain ownership

### 3. **Caching Optimization**
```bash
# Set cache headers for different file types
Cache-Control: max-age=31536000 # For CSS/JS/images
Cache-Control: max-age=0 # For HTML files
```

### 4. **Monitor Performance**
- Use CloudWatch for monitoring
- Check CloudFront reports for usage statistics
- Monitor cache hit ratios

## 🔧 Troubleshooting

### Common Issues:
1. **403 Forbidden Error**
   - Check S3 bucket policy allows public read
   - Verify origin domain name is correct

2. **404 Errors for SPA Routes**
   - Ensure custom error page is configured
   - Set 404 errors to return index.html with 200 status

3. **Slow Initial Load**
   - CloudFront needs time to cache content
   - First requests to each edge location will be slower

4. **Cache Not Updating**
   - Create invalidation for updated files
   - Use versioned file names for better cache control

## 💡 Best Practices

### 🚀 **Performance Optimization**
- Enable GZIP compression
- Set appropriate cache headers
- Use versioned file names
- Optimize images and assets

### 🔒 **Security Optimization**
- Enable HTTPS redirect
- Configure security headers
- Use Origin Access Control (OAC)
- Consider AWS WAF for additional protection

### 💰 **Cost Optimization**
- Choose appropriate price class
- Monitor usage with CloudWatch
- Use appropriate TTL values
- Consider regional edge caches

## 📊 Expected Results

After CloudFront setup:
- **Global Performance**: 40-60% faster load times internationally
- **Availability**: 99.99% uptime SLA
- **Security**: DDoS protection and SSL encryption
- **Scalability**: Handle traffic spikes automatically

## 🌐 Final URLs Structure

```
Production URLs:
├── S3 Website: http://algoforge-app-amit-s4507.s3-website-us-east-1.amazonaws.com
├── CloudFront: https://d1234567890.cloudfront.net (generated after setup)
├── Custom Domain: https://your-domain.com (optional)
└── Vercel Backup: https://dsa-sheet-qlaabee2n-amits-projects-552f728d.vercel.app
```

This setup provides you with a professional, scalable, and globally distributed deployment for AlgoForge! 🚀