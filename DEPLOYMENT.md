# Secure Deployment Guide - Héctor Granero Portfolio

## 🔒 Security Overview

This portfolio implements OWASP Top 10 security best practices for static sites:
- ✅ HTTPS enforcement with automatic redirection
- ✅ Content Security Policy (CSP) headers
- ✅ XSS protection via input validation and sanitization
- ✅ Directory listing disabled
- ✅ Sensitive file access restrictions
- ✅ Asset hashing for cache-busting and integrity
- ✅ Lazy loading for performance and security
- ✅ Security headers (X-Frame-Options, X-Content-Type-Options, etc.)
- ✅ Cross-origin isolation policies
- ✅ Rate limiting configuration

## 📦 Build for Production

```bash
# Install dependencies
npm install

# Build optimized production bundle
npm run build

# The build outputs to /dist with hashed filenames
```

## 🚀 Deployment Options

### Option 1: Shared Hosting (Apache)

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Upload files**:
   - Upload entire `/dist` folder contents to your hosting `public_html` or `www` directory
   - Upload `public/.htaccess` to the same directory

3. **Set file permissions** (via FTP/SSH):
   ```bash
   find . -type f -exec chmod 644 {} \;
   find . -type d -exec chmod 755 {} \;
   chmod 600 .htaccess
   ```

4. **Verify Apache modules** (required):
   - `mod_rewrite` - For SPA routing and HTTPS redirect
   - `mod_headers` - For security headers
   - `mod_deflate` - For compression (optional but recommended)

5. **SSL Certificate**:
   - Most hosting providers offer free Let's Encrypt SSL
   - Enable SSL in your hosting control panel
   - The `.htaccess` file will automatically redirect HTTP to HTTPS

### Option 2: VPS/Dedicated Server (Nginx)

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Upload to server**:
   ```bash
   rsync -avz dist/ user@yourserver:/var/www/portfolio/dist/
   ```

3. **Configure Nginx**:
   ```bash
   # Copy the nginx config
   sudo cp public/nginx.conf /etc/nginx/sites-available/portfolio
   
   # Edit the config with your domain
   sudo nano /etc/nginx/sites-available/portfolio
   
   # Enable the site
   sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
   
   # Test configuration
   sudo nginx -t
   
   # Reload Nginx
   sudo systemctl reload nginx
   ```

4. **Install SSL Certificate** (Let's Encrypt):
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
   ```

5. **Set file permissions**:
   ```bash
   sudo chown -R www-data:www-data /var/www/portfolio/dist
   sudo find /var/www/portfolio/dist -type f -exec chmod 644 {} \;
   sudo find /var/www/portfolio/dist -type d -exec chmod 755 {} \;
   ```

### Option 3: Cloud Platforms (Netlify/Vercel)

These platforms handle security headers automatically, but you can add custom headers:

**Netlify** - Create `netlify.toml`:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

**Vercel** - Create `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    }
  ]
}
```

## 🛡️ Security Checklist Post-Deployment

- [ ] Site accessible via HTTPS only
- [ ] HTTP automatically redirects to HTTPS
- [ ] Security headers present (check with [securityheaders.com](https://securityheaders.com))
- [ ] No directory listing enabled
- [ ] `.htaccess` or config files not publicly accessible
- [ ] Source maps (.map files) not served in production
- [ ] Content Security Policy working without console errors
- [ ] Forms validate and sanitize inputs
- [ ] `security.txt` accessible at `/.well-known/security.txt`
- [ ] `robots.txt` accessible and configured
- [ ] File permissions set correctly (644 for files, 755 for directories)

## 🔍 Security Testing

### Test Security Headers
```bash
curl -I https://yourdomain.com
```

### Test CSP
Open browser console and check for CSP violations

### Scan with Security Tools
- [Mozilla Observatory](https://observatory.mozilla.org/)
- [Security Headers](https://securityheaders.com/)
- [SSL Labs](https://www.ssllabs.com/ssltest/)

## 📝 File Structure After Deployment

```
public_html/
├── index.html                 # Main entry (no-cache)
├── .htaccess                  # Apache security config (chmod 600)
├── robots.txt                 # SEO/crawler rules
├── .well-known/
│   └── security.txt          # Security contact
├── assets/
│   ├── index-[hash].js       # Hashed JS (1 year cache)
│   ├── index-[hash].css      # Hashed CSS (1 year cache)
│   └── *.{png,svg,woff2}     # Hashed assets (1 year cache)
└── [other static files]
```

## 🔐 Additional Security Measures

### 1. Environment-Specific Configuration
Never commit sensitive data. Use environment variables for API keys.

### 2. Regular Updates
```bash
npm audit
npm update
```

### 3. Monitor Access Logs
```bash
# Apache
tail -f /var/log/apache2/access.log

# Nginx
tail -f /var/log/nginx/access.log
```

### 4. Enable Firewall (VPS)
```bash
sudo ufw enable
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 22/tcp  # SSH
```

### 5. Rate Limiting (Nginx)
Already configured in `nginx.conf` for API endpoints

## 🆘 Troubleshooting

### Issue: HTTPS redirect not working
- **Apache**: Enable `mod_rewrite`: `sudo a2enmod rewrite`
- **Nginx**: Check redirect rules in config

### Issue: Security headers not appearing
- **Apache**: Enable `mod_headers`: `sudo a2enmod headers`
- **Nginx**: Ensure headers are in the correct server block

### Issue: SPA routes return 404
- **Apache**: Verify `.htaccess` uploaded and `mod_rewrite` enabled
- **Nginx**: Check `try_files` directive in config

### Issue: Assets not loading (CSP errors)
- Check browser console for CSP violations
- Adjust `Content-Security-Policy` in headers or meta tags

## 📞 Support

For security vulnerabilities, contact: security@hectorgranero.com

---

**Last Updated**: 2025-10-07  
**Version**: 1.0.0
