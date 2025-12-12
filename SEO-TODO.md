# SEO Action Items

Quick checklist of things to do to make your site SEO-ready.

---

## 🚨 Critical (Do Before Launch)

- [ ] **Create default OG image** (1200x630px)
  - Save as `/public/og-image.png`
  - Should include HOLLYFRANK branding
  - Use bold, readable text
  - High contrast design

- [ ] **Create favicon**
  - Save as `/public/favicon.png` (512x512px)
  - Also create `/public/apple-touch-icon.png` (180x180px)
  - Should be recognizable at small sizes

- [ ] **Create logo image**
  - Save as `/public/logo.png` (200x200px or larger)
  - Used in structured data
  - PNG with transparent background preferred

- [ ] **Update social media handles** in `SEOHead.tsx`
  - Line 27: `twitterHandle: '@hollyfrank'` - Replace with your actual Twitter handle
  - Line 159: Add your real social media URLs to the `sameAs` array

- [ ] **Update domain** in `SEOHead.tsx`
  - Line 24: `siteUrl: 'https://hollyfrank.com'` - Replace with your actual domain
  - Or update when you know the final domain

- [ ] **Test link sharing**
  - Share homepage on Twitter - does it look good?
  - Share a blog post on LinkedIn - does image show?
  - Use [OpenGraph.xyz](https://www.opengraph.xyz/) to preview

---

## ⚡ High Priority (Do This Week)

- [ ] **Create OG images for existing blog posts**
  - Design template in Canva/Figma
  - Create one for each published post
  - Upload via admin panel

- [ ] **Optimize all blog post metadata**
  - Check each post has 150-160 char description
  - Verify titles are 50-60 characters
  - Add 5-10 keywords per post
  - Ensure tags are relevant

- [ ] **Set up Google Search Console**
  1. Go to [search.google.com/search-console](https://search.google.com/search-console)
  2. Add your domain
  3. Verify ownership (HTML tag or DNS)
  4. Submit homepage for indexing

- [ ] **Add Google Analytics** (optional but recommended)
  1. Create GA4 property
  2. Add tracking code to `index.html`
  3. Set up basic goals/events

- [ ] **Verify structured data**
  - Test homepage: [Google Rich Results Test](https://search.google.com/test/rich-results)
  - Test a blog post URL
  - Fix any errors/warnings

---

## 📝 Medium Priority (This Month)

- [ ] **Create custom 404 page** with good UX
  - Help users find what they're looking for
  - Link to popular content
  - Search functionality (future)

- [ ] **Add robots.txt**
  ```
  User-agent: *
  Disallow: /admin
  Allow: /

  Sitemap: https://hollyfrank.com/sitemap.xml
  ```

- [ ] **Generate sitemap.xml**
  - List all pages and blog posts
  - Include last modified dates
  - Submit to Google Search Console
  - Update weekly when new content is added

- [ ] **Build internal linking structure**
  - Link related posts to each other
  - Add "Related Posts" section (future feature)
  - Link from homepage to top content
  - Create topic clusters

- [ ] **Optimize images**
  - Compress all images (use TinyPNG or similar)
  - Add descriptive alt text to all images
  - Lazy load images (future enhancement)
  - Use WebP format where possible

---

## 🎯 Low Priority (Ongoing)

- [ ] **Submit to other search engines**
  - Bing Webmaster Tools
  - Yandex Webmaster
  - DuckDuckGo (no submission needed, uses Bing)

- [ ] **Build backlinks**
  - Share posts on social media
  - Comment on related blogs
  - Guest post opportunities
  - Directory submissions (relevant ones only)

- [ ] **Monitor and improve**
  - Check Search Console weekly
  - Review top-performing content
  - Update old posts with new info
  - Fix broken links
  - Improve low-performing pages

- [ ] **Create content calendar**
  - Plan topics in advance
  - Aim for consistent publishing schedule
  - Mix different content types
  - Cover trending topics in your niche

---

## 🛠️ Tools You'll Need

### Free Tools
- **[Canva](https://canva.com)** - Create OG images
- **[TinyPNG](https://tinypng.com)** - Compress images
- **[Google Search Console](https://search.google.com/search-console)** - Monitor SEO
- **[Google Analytics](https://analytics.google.com)** - Track visitors
- **[OpenGraph.xyz](https://www.opengraph.xyz/)** - Preview OG tags
- **[PageSpeed Insights](https://pagespeed.web.dev/)** - Check site speed

### Paid Tools (Optional)
- **Ahrefs or SEMrush** - Advanced SEO analysis
- **Cloudinary** - Image hosting and optimization
- **Fathom or Plausible** - Privacy-friendly analytics

---

## 📊 Success Metrics

Track these to measure SEO improvement:

### Week 1-4 (Indexing Phase)
- [ ] Site indexed by Google
- [ ] Top 3 blog posts indexed
- [ ] No critical errors in Search Console
- [ ] OG images showing correctly on social media

### Month 2-3 (Growth Phase)
- [ ] 100+ impressions/week in Google Search
- [ ] At least 1 keyword in top 100
- [ ] 50+ page views/week from organic search
- [ ] Average position improving week over week

### Month 4-6 (Optimization Phase)
- [ ] 1000+ impressions/month
- [ ] 3+ keywords in top 50
- [ ] 3%+ click-through rate
- [ ] Growing organic traffic month over month

---

## Quick Wins (Do in Next 30 Minutes)

Start here if you're overwhelmed:

1. **Create basic OG image** using Canva template
2. **Upload to `/public/og-image.png`**
3. **Test sharing homepage** on Twitter
4. **Add meta description** to top blog post
5. **Submit site** to Google Search Console

---

## Notes

- Don't try to do everything at once
- Focus on content quality first, SEO second
- Be patient - SEO takes 3-6 months to show results
- Consistency > perfection

---

*Last Updated: December 11, 2025*
