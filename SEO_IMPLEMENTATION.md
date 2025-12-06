# SEO Implementation Guide

## Overview

Your HOLLYFRANK site now has comprehensive SEO features including:
- ✅ **Dynamic Meta Tags** (title, description, OG, Twitter Cards)
- ✅ **XML Sitemap Generation**
- ✅ **Canonical URL Handling**
- ✅ **Database Schema for SEO Fields**
- ✅ **Robots.txt Support**

---

## 1. Database Schema Enhancement

### Run the SEO Migration

In your Supabase SQL Editor, run `supabase-seo-migration.sql`:

```sql
-- This adds SEO fields to your blog_posts table:
- meta_title
- meta_description
- og_image, og_title, og_description
- twitter_card_type, twitter_title, twitter_description, twitter_image
- canonical_url
- robots
- keywords[]
```

### Site Settings Table

A new `site_settings` table stores global SEO configuration:
- Site name
- Default OG image
- Twitter handle
- Default robots directive

---

## 2. SEO Component Usage

### Automatic SEO on Blog Posts

The `SEOHead` component is already integrated into blog post pages. It automatically:

- Sets the page title with pattern: `{post.title} | HOLLYFRANK`
- Generates meta descriptions from post summary
- Creates Open Graph tags for social sharing
- Adds Twitter Card markup
- Sets canonical URLs
- Manages robots directives

### Manual SEO Usage

You can use the SEO component anywhere in your app:

```tsx
import SEOHead from './SEOHead';

<SEOHead
  title="Custom Page Title"
  description="Page description for SEO"
  canonical="https://hollyfrank.com/custom-page"
  ogImage="/images/og-custom.png"
  keywords={['tech', 'design', 'future']}
/>
```

---

## 3. XML Sitemap Generation

### Auto-Generated Sitemap

The `sitemap.ts` module generates XML sitemaps automatically from your Supabase content.

**Features:**
- Includes homepage, blog, portfolio, contact pages
- Fetches all published blog posts with their slugs
- Adds lastmod dates for better crawling
- Sets priority and changefreq for each URL type

### Generate Sitemap

**Option 1: Manual Download (In Browser)**
```typescript
import { downloadSitemap } from './sitemap';

// Call this function to download sitemap.xml
downloadSitemap();
```

**Option 2: API Endpoint (Recommended for Production)**

Create an API route at `/api/sitemap.xml` that:
```typescript
import { generateSitemap } from './sitemap';

export async function GET() {
  const xml = await generateSitemap();
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
```

### Submitting to Search Engines

Once deployed:
1. Submit `https://hollyfrank.com/sitemap.xml` to Google Search Console
2. Submit to Bing Webmaster Tools
3. Reference in robots.txt (see below)

---

## 4. Robots.txt

### Generate Robots.txt

Use the included function:

```typescript
import { generateRobotsTxt } from './sitemap';

const robotsTxt = generateRobotsTxt();
```

**Output:**
```
User-agent: *
Allow: /
Disallow: /admin

Sitemap: https://hollyfrank.com/sitemap.xml
```

### Deployment

Create a `public/robots.txt` file with this content, or serve it dynamically.

---

## 5. Canonical URLs

### How It Works

- Canonical URLs prevent duplicate content issues
- Automatically strips query parameters and hash fragments
- Can be customized per post via `canonical_url` field

### Default Behavior

```typescript
// Automatically generates from current URL
canonical: window.location.href.split('?')[0].split('#')[0]
```

### Custom Canonical (in Database)

Set `canonical_url` field in Supabase for specific posts:
```sql
UPDATE blog_posts
SET canonical_url = 'https://hollyfrank.com/blog/preferred-url'
WHERE slug = 'duplicate-post';
```

---

## 6. Managing SEO Fields in Admin Panel

### Database Fields Available

For each blog post, you can now set:

**Basic SEO:**
- `meta_title` - Custom title (overrides post title)
- `meta_description` - Custom description (overrides summary)
- `keywords` - Array of keywords
- `robots` - e.g., "index, follow" or "noindex"

**Open Graph (Facebook, LinkedIn):**
- `og_title`
- `og_description`
- `og_image` - URL to OG image (1200x630px recommended)

**Twitter Cards:**
- `twitter_title`
- `twitter_description`
- `twitter_image`
- `twitter_card_type` - "summary" or "summary_large_image"

**Advanced:**
- `canonical_url` - Override automatic canonical

### Updating via Admin Panel

**Option 1: Direct Supabase**
1. Go to Supabase dashboard → Table Editor → blog_posts
2. Edit any post and fill in SEO fields

**Option 2: Extend Admin Panel UI**
Add SEO fields to `AdminPanel.tsx` editor form (around line 260):

```tsx
{/* SEO Section */}
<div className="border-t border-slate-800 pt-6">
  <h3 className="text-lg font-bold text-white mb-4">SEO Settings</h3>

  <div>
    <label className="block text-sm font-medium text-slate-300 mb-2">
      Meta Title (Optional - defaults to post title)
    </label>
    <input
      type="text"
      value={editingPost.meta_title || ''}
      onChange={(e) => setEditingPost({ ...editingPost, meta_title: e.target.value })}
      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
      placeholder="Custom SEO title..."
    />
  </div>

  {/* Add more SEO fields as needed */}
</div>
```

---

## 7. Testing Your SEO

### Tools to Test

1. **Meta Tags:**
   - View page source in browser
   - Use browser DevTools → Elements → `<head>`

2. **Open Graph:**
   - [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
   - [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

3. **Twitter Cards:**
   - [Twitter Card Validator](https://cards-dev.twitter.com/validator)

4. **General SEO:**
   - [Google Rich Results Test](https://search.google.com/test/rich-results)
   - Lighthouse audit in Chrome DevTools

### Example Test

Open a blog post and view source. You should see:

```html
<head>
  <title>Your Post Title | HOLLYFRANK</title>
  <meta name="description" content="Your post summary...">
  <meta property="og:title" content="Your Post Title">
  <meta property="og:description" content="Your post summary...">
  <meta property="og:image" content="https://hollyfrank.com/og-image.png">
  <meta property="og:type" content="article">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="canonical" href="https://hollyfrank.com/blog/post-slug">
</head>
```

---

## 8. Best Practices

### Meta Titles
- Keep under 60 characters
- Include primary keyword
- Make it compelling for clicks

### Meta Descriptions
- 150-160 characters optimal
- Include call-to-action
- Summarize the content value

### OG Images
- 1200x630px (Facebook/LinkedIn optimal)
- Include branded elements
- Text should be readable at small sizes

### Keywords
- 5-10 relevant keywords
- Don't keyword stuff
- Focus on user intent

### Canonical URLs
- Always use absolute URLs
- Ensure HTTPS
- Match exactly (trailing slashes matter)

---

## 9. Production Checklist

Before going live:

- [ ] Run SEO migration SQL in Supabase
- [ ] Set global SEO settings in `site_settings` table
- [ ] Create default OG image at `/public/og-image.png`
- [ ] Generate and deploy `sitemap.xml`
- [ ] Deploy `robots.txt`
- [ ] Test all meta tags with debugging tools
- [ ] Submit sitemap to Google Search Console
- [ ] Verify canonical URLs are working
- [ ] Check mobile-friendliness
- [ ] Test page speed (aim for <3s load time)

---

## 10. Future Enhancements

Consider adding:

- **Structured Data (JSON-LD)** for rich snippets
- **Breadcrumb navigation** for better UX and SEO
- **Auto-generate OG images** from post titles
- **SEO audit dashboard** in admin panel
- **Schema.org markup** for articles
- **AMP pages** for mobile performance
- **Internationalization** (hreflang tags)

---

## Need Help?

- Supabase docs: https://supabase.com/docs
- Open Graph Protocol: https://ogp.me/
- Twitter Cards: https://developer.twitter.com/en/docs/twitter-for-websites/cards
- Google SEO Guide: https://developers.google.com/search/docs
