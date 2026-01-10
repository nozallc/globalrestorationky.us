# CLOUDFLARE PAGES DEPLOYMENT GUIDE
**Global Restoration LLC - globalrestorationky.us**

---

## QUICK START (5 Minutes)

### Step 1: Connect GitHub Repository (One-Time Setup)

1. Go to [Cloudflare Pages Dashboard](https://dash.cloudflare.com/)
2. Click **Create a project** → **Connect to Git**
3. Select **GitHub** as your git provider
4. Authorize Cloudflare to access your GitHub account
5. Select repository: `globalrestorationky.us`
6. Click **Begin setup**

### Step 2: Configure Build Settings

| Setting | Value |
|---------|-------|
| **Production branch** | `main` |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Node.js Version** | `20.x` |

**Environment Variables:**
- None required (all configuration in code)

### Step 3: Deploy

1. Click **Save and Deploy**
2. Cloudflare builds and deploys automatically (~2-3 minutes)
3. Your site is live at: `https://globalrestorationky.us.pages.dev`

### Step 4: Connect Custom Domain

1. In Cloudflare Pages project settings
2. Click **Custom domains**
3. Add: `www.globalrestorationky.us`
4. Follow DNS configuration instructions

---

## DNS CONFIGURATION (If Using Cloudflare for DNS)

```
Record Type: CNAME
Name: www
Value: globalrestorationky.us.cdn.cloudflare.net
TTL: Auto
Proxy Status: Orange (Cloudflare proxy enabled)
```

If domain is registered elsewhere:
```
CNAME Record:
Name: www
Value: globalrestorationky.us.pages.dev
TTL: 3600 (or provider default)
```

---

## BUILD VERIFICATION

After deployment, verify build succeeds:

```bash
npm install
npm run build
```

Expected output:
```
32 page(s) built in 1.61s
[build] Complete!
```

---

## MONITORING & TROUBLESHOOTING

### Check Build Logs
1. Cloudflare Pages Dashboard → Project
2. **Deployments** tab
3. Click latest deployment
4. View **Build log** for errors

### Common Issues

**Issue:** Build fails with "npm not found"
- **Solution:** Ensure `package.json` is in root directory
- **Verify:** `npm --version` runs locally

**Issue:** Form submissions not working
- **Solution:** Verify Formspree endpoint is correct
- **Endpoint:** `https://formspree.io/f/mjkpryoz`
- **Test:** Submit form on `/request-inspection` page

**Issue:** Images not loading after deployment
- **Solution:** Ensure public assets are in `public/` folder
- **Verify:** `ls -la public/` shows all image files

**Issue:** Mobile navigation broken
- **Solution:** Check hamburger menu CSS in `src/styles/theme.css`
- **Verify:** Floating CTA pill visible on mobile devices

### Check Site Health

After deployment, verify:

```
✅ Homepage loads: https://www.globalrestorationky.us
✅ Services page: https://www.globalrestorationky.us/services
✅ Form works: https://www.globalrestorationky.us/request-inspection
✅ Mobile nav: Hamburger menu appears on mobile
✅ Links work: Click 3-5 internal links
```

---

## PRODUCTION SETTINGS (Recommended)

### SSL/TLS Configuration
```
SSL/TLS Encryption Mode: Full (or Flexible)
Minimum TLS Version: TLS 1.2
Always Use HTTPS: On
HSTS: On (recommended)
  Max Age: 31536000 (1 year)
  Include Subdomains: On
```

### Security Rules
```
Bot Management: Challenge (Medium)
DDoS Protection: High
Web Application Firewall: Enabled
Security Level: Medium or High
```

### Caching Rules
```
Browser Cache TTL: 30 minutes (default)
Cache Rule: Match all → Cache everything
Respect Cache Headers: On
```

### Analytics & Monitoring
```
Enable: Cloudflare Analytics
Track: Page views, requests, traffic sources
Monitor: Error rates, slow pages
```

---

## ROLLBACK INSTRUCTIONS

If issues occur after deployment:

### Option 1: Rollback via Cloudflare Pages
1. Deployments tab
2. Click previous successful deployment
3. Click **Rollback to this deployment**
4. Confirm rollback

### Option 2: Rollback via Git
```bash
git revert HEAD~1  # Revert to previous commit
git push origin main
# Cloudflare auto-deploys from main branch
```

---

## PERFORMANCE MONITORING

### Monitor Key Metrics
1. **Page Load Time:** Target < 2.5s
2. **First Contentful Paint (FCP):** Target < 1.8s
3. **Largest Contentful Paint (LCP):** Target < 2.5s
4. **Cumulative Layout Shift (CLS):** Target < 0.1
5. **Time to Interactive (TTI):** Target < 3.5s

### Use Tools
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [WebPageTest](https://www.webpagetest.org/)
- Cloudflare Analytics Dashboard
- Chrome DevTools (Lighthouse)

### Check Crawl Errors
1. Google Search Console
2. Coverage tab
3. Look for 404, 5xx errors
4. Submit URLs manually if needed

---

## FORM SUBMISSION TROUBLESHOOTING

### Test Form Submission
1. Go to `/request-inspection`
2. Fill out form:
   - First name: Test
   - Last name: User
   - Phone: 555-0123
   - Email: test@example.com
   - Address: 123 Main St
   - City: Lexington
   - Issue type: Roof leak
   - Details: Test submission
3. Click **Submit**

### Expected Response
```
✅ Form submits successfully
✅ Page redirects to success URL (via Formspree)
✅ Confirmation email sent to form-configured address
✅ Email contains all form data
```

### If Form Fails
1. Check Formspree status: https://formspree.io/
2. Verify endpoint: `https://formspree.io/f/mjkpryoz`
3. Check Cloudflare security rules (may block form)
4. Review browser console for errors

---

## REGULAR MAINTENANCE

### Weekly
```
☐ Check Cloudflare Analytics for traffic patterns
☐ Verify no form submission errors
☐ Scan Google Search Console for indexing issues
```

### Monthly
```
☐ Run PageSpeed Insights audit
☐ Check broken links via automated tool
☐ Review error logs in Cloudflare dashboard
☐ Verify all CTAs route to /request-inspection
```

### Quarterly
```
☐ Update Formspree confirmation email
☐ Review traffic sources and lead attribution
☐ Check for security updates in dependencies
☐ Audit mobile experience across devices
```

---

## SUPPORT & ESCALATION

### Cloudflare Support
- [Cloudflare Status](https://www.cloudflarestatus.com/) — Check service health
- [Support Dashboard](https://dash.cloudflare.com/support) — Contact support
- [Community Forums](https://community.cloudflare.com/) — Get help from community

### Formspree Support
- [Formspree Documentation](https://formspree.io/docs/)
- [Status Page](https://status.formspree.io/)
- [Email Support](support@formspree.io)

### Site-Specific Support
- Repository: Check commit history for recent changes
- Build logs: Cloudflare Pages Deployments tab
- Local test: `npm run build && npm run preview`

---

## AUTOMATED DEPLOYMENTS

Cloudflare Pages automatically deploys on every push to `main` branch:

```
Git Push → GitHub Webhook → Cloudflare Build → Deploy
Typical time: 2-5 minutes
```

To prevent automatic deployment:
1. Push to different branch (e.g., `staging`)
2. Create Pull Request for review
3. Merge to `main` when ready to deploy

---

## SUMMARY

| Item | Value |
|------|-------|
| **Build Command** | `npm run build` |
| **Output Dir** | `dist` |
| **Node Version** | 20.x |
| **Deploy Time** | ~2-3 minutes |
| **Custom Domain** | www.globalrestorationky.us |
| **Form Endpoint** | https://formspree.io/f/mjkpryoz |
| **Pages** | 32 pre-rendered |
| **Size** | ~5-10MB (cached by CDN) |

---

**Deployment Status:** ✅ READY FOR CLOUDFLARE PAGES

All configuration verified and tested. Deploy with confidence!
