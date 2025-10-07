# Security Policy

## 🔒 Security Features

This portfolio website implements comprehensive security best practices:

### Frontend Security
- ✅ **Input Validation**: All form inputs validated with Zod schema
- ✅ **XSS Protection**: HTML/script tags sanitized from user inputs
- ✅ **Content Security Policy**: Strict CSP headers prevent injection attacks
- ✅ **Secure Headers**: X-Frame-Options, X-Content-Type-Options, Referrer-Policy
- ✅ **HTTPS Enforcement**: Automatic HTTP to HTTPS redirection
- ✅ **Cross-Origin Policies**: COEP, COOP, CORP headers implemented

### Server Security
- ✅ **Directory Listing Disabled**: Prevents directory enumeration
- ✅ **Sensitive File Protection**: Source files and configs blocked
- ✅ **Asset Integrity**: Hashed filenames prevent tampering
- ✅ **Rate Limiting**: DDoS protection on API endpoints (Nginx)
- ✅ **Compression**: Gzip enabled with security considerations

### Data Security
- ✅ **No Sensitive Data Storage**: Static site with no backend data
- ✅ **Form Validation**: Client-side validation with length limits
- ✅ **Character Restrictions**: Regex validation prevents malicious input
- ✅ **No Inline Scripts**: All JavaScript in external files

## 🛡️ OWASP Top 10 Compliance

1. **Injection** ✅ - Input sanitization and CSP prevent injection attacks
2. **Broken Authentication** ✅ - No authentication system (static site)
3. **Sensitive Data Exposure** ✅ - No sensitive data stored or transmitted
4. **XML External Entities** ✅ - No XML processing
5. **Broken Access Control** ✅ - Proper file permissions and restrictions
6. **Security Misconfiguration** ✅ - Hardened Apache/Nginx configs
7. **Cross-Site Scripting (XSS)** ✅ - CSP and input sanitization
8. **Insecure Deserialization** ✅ - No serialization used
9. **Using Components with Known Vulnerabilities** ✅ - Regular dependency audits
10. **Insufficient Logging & Monitoring** ✅ - Server-level logging enabled

## 🐛 Reporting Security Vulnerabilities

We take security seriously. If you discover a vulnerability:

### Please DO:
- ✅ Email security details to: **security@hectorgranero.com**
- ✅ Provide detailed reproduction steps
- ✅ Allow 48 hours for initial response
- ✅ Give us time to fix before public disclosure

### Please DON'T:
- ❌ Publicly disclose the vulnerability before we've addressed it
- ❌ Access or modify user data beyond what's needed for proof-of-concept
- ❌ Perform attacks that degrade service quality (DoS/DDoS)

### Response Timeline:
- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Fix Timeline**: Based on severity (critical: 24-48h, high: 7 days, medium: 30 days)

## 🔍 Security Audit History

| Date | Type | Findings | Status |
|------|------|----------|--------|
| 2025-10-07 | Initial Implementation | - | Baseline security established |

## 📋 Security Checklist for Deployment

Before deploying, verify:

- [ ] HTTPS certificate installed and valid
- [ ] HTTP to HTTPS redirect working
- [ ] Security headers present (test with securityheaders.com)
- [ ] CSP policy not causing console errors
- [ ] Directory listing disabled
- [ ] Sensitive files not accessible (.htaccess, .env, configs)
- [ ] Source maps not served in production
- [ ] File permissions correct (644 files, 755 dirs)
- [ ] robots.txt and security.txt accessible
- [ ] Form validation working correctly
- [ ] No console errors or warnings
- [ ] All dependencies up to date (npm audit)

## 🔐 Security Tools & Resources

### Automated Scanners
- [Mozilla Observatory](https://observatory.mozilla.org/) - Security header analysis
- [Security Headers](https://securityheaders.com/) - HTTP header scanner
- [SSL Labs](https://www.ssllabs.com/ssltest/) - SSL/TLS configuration test
- [OWASP ZAP](https://www.zaproxy.org/) - Vulnerability scanner

### Manual Testing
```bash
# Check security headers
curl -I https://yourdomain.com

# Test CSP
# Open browser DevTools console and check for violations

# Audit dependencies
npm audit

# Check for outdated packages
npm outdated
```

## 📚 Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Content Security Policy Guide](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [Security Best Practices for Web Developers](https://web.dev/secure/)

## 📞 Contact

- **Security Email**: security@hectorgranero.com
- **General Contact**: hello@hectorgranero.com
- **Response Time**: 48 hours

## 📄 License

This security policy applies to the Héctor Granero portfolio website and is subject to periodic updates.

---

**Last Updated**: 2025-10-07  
**Version**: 1.0.0
