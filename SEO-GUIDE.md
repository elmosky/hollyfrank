# SEO & Metadata Best Practices Guide

This guide explains how to optimize your HOLLYFRANK site for search engines and social media sharing.

---

## Table of Contents

1. [Overview](#overview)
2. [What's Already Implemented](#whats-already-implemented)
3. [How to Optimize Each Page](#how-to-optimize-each-page)
4. [Social Media Sharing](#social-media-sharing)
5. [Creating OG Images](#creating-og-images)
6. [Testing Your SEO](#testing-your-seo)
7. [Best Practices Checklist](#best-practices-checklist)
8. [Common Issues & Fixes](#common-issues--fixes)

---

## Overview

SEO (Search Engine Optimization) helps your content:
- **Rank higher in Google** and other search engines
- **Look good when shared** on social media (Twitter, LinkedIn, Facebook)
- **Get more clicks** with compelling titles and descriptions
- **Appear in rich results** like featured snippets and knowledge panels

---

## What's Already Implemented

### ✅ Base SEO Setup

Your site already has:

1. **Meta Tags in index.html**
   - Primary meta tags (title, description, keywords)
   - Open Graph tags for Facebook/LinkedIn
   - Twitter Card tags
   - Canonical URLs
   - Theme color for mobile browsers

2. **Dynamic SEO Component (`SEOHead.tsx`)**
   - Automatically updates meta tags per page
   - Structured data (JSON-LD) for rich results
   - Blog post markup for articles
   - Organization markup for homepage

3. **Blog Post SEO Fields**
   - Title, description, keywords
   - Featured images
   - OG images (social sharing)
   - Twitter card customization
   - Canonical URLs
   - Robots directives
   - Publish/modified dates

---

## How to Optimize Each Page

### Homepage

**Already optimized in App.tsx:**
```tsx
<SEOHead
  title="HOLLYFRANK - Moving Thought Forward"
  description="A thought and design studio exploring what's possible in a post-internet world..."
  keywords={['design', 'technology', 'AI', 'future', 'innovation']}
  ogType="website"
/>
```

**To customize:**
- Update the title to match your brand
- Write a compelling 150-160 character description
- Add relevant keywords (10-15 max)

### Blog Posts

Each blog post automatically gets SEO via the `PostDetail` component. In the admin panel:

1. **Title** (50-60 characters)
   - Use your main keyword
   - Make it compelling/clickable
   - Example: "Drawing The Geopolitical Boundaries Around AI"

2. **Meta Description** (150-160 characters)
   - Summarize the post's value
   - Include a call-to-action
   - Example: "The US-China truce on tariffs left one issue untouched: export controls on AI chips. This reveals the deeper stakes behind America's strategy."

3. **Keywords** (5-10 relevant terms)
   - Main topic keywords
   - Related concepts
   - Example: "AI, Policy, Geopolitics, Hardware, Chips"

4. **Featured Image**
   - Minimum 1200x630px (OG image standard)
   - Use descriptive alt text
   - Keep file size under 1MB
   - High contrast, readable text if overlaid

5. **Slug (URL)**
   - Short, descriptive
   - Use hyphens, not underscores
   - Include main keyword
   - Example: `geopolitics-ai` not `drawing-the-geopolitical-boundaries-around-ai`

### Works/Portfolio Items

Same SEO principles apply:
- Clear, keyword-rich titles
- Compelling descriptions
- High-quality images
- Relevant tags

---

## Social Media Sharing

When someone shares your link on social media, platforms read your **Open Graph** and **Twitter Card** tags.

### What Shows Up

**On Twitter:**
- Large image (1200x628px recommended)
- Title (70 characters max)
- Description (200 characters max)
- Your site name

**On Facebook/LinkedIn:**
- Image (1200x630px recommended)
- Title (60 characters max)
- Description (155 characters max)
- Domain name

### Customizing Per Post

In the admin panel, you can set:

1. **OG Image** - Custom image for social sharing
2. **OG Title** - Different from page title (more social-friendly)
3. **OG Description** - Tailored for social audiences
4. **Twitter Card Type**:
   - `summary` - Small square image
   - `summary_large_image` - Large rectangular image (recommended)

### Example

For a technical post:
- **Page Title:** "The Compute Advantage in AI Development"
- **OG Title:** "Why AI Chips Are the New Oil: The Compute Race Explained"
- **OG Description:** "Inside the US-China battle for AI supremacy and why controlling compute is controlling the future."

---

## Creating OG Images

### Ideal Specifications

- **Size:** 1200 x 630 pixels
- **Format:** PNG or JPG
- **File size:** Under 1MB (ideally under 300KB)
- **Safe zone:** Keep text/logos 100px from edges

### Design Tips

1. **Bold, simple design**
   - Large, readable text (min 60px font size)
   - High contrast colors
   - Avoid clutter

2. **Include branding**
   - Your logo/site name
   - Consistent color scheme
   - Recognizable style

3. **Make it informative**
   - Post title or key takeaway
   - Eye-catching visual element
   - No more than 2-3 text elements

### Tools to Create OG Images

**Free:**
- [Canva](https://canva.com) - Templates + drag-and-drop
- [Figma](https://figma.com) - More design control
- [OG Image Playground](https://og-playground.vercel.app) - Code-based

**Automated:**
- Cloudinary dynamic images
- Vercel OG Image generation
- Screenshot APIs (Microlink, Urlbox)

### Image Upload

1. Create your OG image (1200x630px)
2. In admin panel, use "Featured Image" uploader
3. Image automatically uploads to Supabase Storage
4. URL is saved and used for social sharing

---

## Testing Your SEO

### Before Publishing

**1. Use SEO Preview Tools:**

- **[OpenGraph.xyz](https://www.opengraph.xyz/)** - Preview OG tags
- **[Twitter Card Validator](https://cards-dev.twitter.com/validator)** - Preview Twitter cards
- **[LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)** - Preview LinkedIn shares
- **[Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)** - Preview Facebook shares

**2. Check in Browser DevTools:**
```javascript
// In console, run:
document.querySelectorAll('meta[property^="og:"]')
document.querySelectorAll('meta[name^="twitter:"]')
```

**3. Verify Structured Data:**
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- Paste your page URL
- Check for errors/warnings

### After Publishing

**1. Google Search Console**
- Submit sitemap (future feature)
- Monitor indexing status
- Check search performance
- Fix coverage issues

**2. Analytics**
- Track page views
- Monitor referral sources
- Check social traffic
- Analyze bounce rates

---

## Best Practices Checklist

### Every Blog Post Should Have:

- [ ] **Unique, descriptive title** (50-60 chars)
- [ ] **Compelling meta description** (150-160 chars)
- [ ] **5-10 relevant keywords**
- [ ] **Featured image** (1200x630px minimum)
- [ ] **Custom OG image** (if different from featured)
- [ ] **Clean URL slug** with main keyword
- [ ] **Proper headings** (H1 for title, H2s for sections)
- [ ] **Internal links** to other posts
- [ ] **Alt text on all images**
- [ ] **Mobile-friendly** (already handled by design)

### Homepage Should Have:

- [ ] **Clear value proposition** in description
- [ ] **Branded OG image**
- [ ] **Accurate site name**
- [ ] **Social media links** in structured data
- [ ] **Contact information**

### Technical SEO:

- [ ] **HTTPS enabled** (Vercel handles this)
- [ ] **Fast page load** (< 3 seconds)
- [ ] **Mobile responsive** (already handled)
- [ ] **No broken links**
- [ ] **Canonical URLs set**
- [ ] **Robots.txt** (future enhancement)
- [ ] **Sitemap.xml** (future enhancement)

---

## Common Issues & Fixes

### Issue: Social media shows wrong image

**Cause:** Cached old OG tags

**Fix:**
1. Update OG image URL in admin panel
2. Use Facebook/Twitter debugger to refresh cache
3. Wait 24-48 hours for full propagation

### Issue: Google not indexing pages

**Cause:** Site too new, or no sitemap

**Fix:**
1. Submit site to Google Search Console
2. Request indexing for important pages
3. Build internal links between posts
4. Share on social media (crawlers follow links)

### Issue: OG image not displaying

**Cause:** Image too large or wrong format

**Fix:**
1. Ensure image is under 1MB
2. Use PNG or JPG format
3. Check image URL is publicly accessible
4. Verify dimensions are 1200x630px or similar ratio

### Issue: Duplicate content

**Cause:** Same content accessible via multiple URLs

**Fix:**
1. Use canonical URLs (already implemented)
2. Set one version as primary
3. Use 301 redirects if needed

### Issue: Poor click-through rate

**Cause:** Uncompelling title/description

**Fix:**
1. Add numbers ("5 Ways...", "10 Tips...")
2. Use power words ("Ultimate", "Essential", "Proven")
3. Create curiosity ("What Nobody Tells You About...")
4. Include year ("...in 2025")
5. A/B test different variations

---

## Advanced Tips

### 1. Optimize for Featured Snippets

Structure content to answer questions:
- Use clear H2 headings as questions
- Provide concise answers (40-60 words)
- Use lists and tables
- Define terms clearly

### 2. Build Topic Clusters

Group related content:
- Main "pillar" post on broad topic
- Supporting posts on specific subtopics
- Internal links between related posts
- Helps Google understand expertise

### 3. Update Old Content

Keep content fresh:
- Add new sections to top posts
- Update statistics and examples
- Refresh publication dates
- Improve outdated images

### 4. Monitor Competitors

Learn from others:
- See what ranks for your keywords
- Analyze their OG images
- Note their content structure
- Find content gaps

---

## Quick Reference: Meta Tag Limits

| Tag | Optimal Length | Max Before Truncation |
|-----|----------------|----------------------|
| Page Title | 50-60 chars | 70 chars |
| Meta Description | 150-160 chars | 160 chars |
| OG Title | 60-90 chars | 100 chars |
| OG Description | 150-200 chars | 200 chars |
| Twitter Title | 60-70 chars | 70 chars |
| Twitter Description | 150-200 chars | 200 chars |
| Image Alt Text | 100-125 chars | No limit (but be concise) |

---

## Resources

### Official Documentation
- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [Schema.org](https://schema.org/)

### Tools
- **SEO Analysis:** [Ahrefs](https://ahrefs.com), [SEMrush](https://semrush.com), [Moz](https://moz.com)
- **Keyword Research:** [Google Keyword Planner](https://ads.google.com/home/tools/keyword-planner/), [AnswerThePublic](https://answerthepublic.com/)
- **Page Speed:** [PageSpeed Insights](https://pagespeed.web.dev/), [GTmetrix](https://gtmetrix.com/)
- **OG Image Checker:** [OpenGraph.xyz](https://www.opengraph.xyz/)

---

## Next Steps

### Immediate (Do Now)

1. **Create a default OG image** (1200x630px) for your site
2. **Upload to `/public/og-image.png`**
3. **Test homepage sharing** on Twitter/LinkedIn
4. **Create OG images for top 3 blog posts**

### Short-term (This Week)

5. **Submit site to Google Search Console**
6. **Verify all meta descriptions are 150-160 chars**
7. **Add keywords to all published posts**
8. **Check all images have alt text**

### Long-term (This Month)

9. **Create sitemap.xml** (future enhancement)
10. **Set up analytics** tracking
11. **Build internal linking** between posts
12. **Create content calendar** for consistent publishing

---

## Need Help?

If you're unsure about any SEO implementation:

1. Check this guide first
2. Test in preview tools
3. Ask Claude Code for specific help
4. Consult Google Search Console docs

Remember: **SEO is a long game**. Focus on creating great content first, then optimize the technical details. Consistency beats perfection.

---

*Last Updated: December 11, 2025*
