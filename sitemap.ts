import { supabase } from './supabaseClient';

interface SitemapURL {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

const SITE_URL = 'https://hollyfrank.com';

export async function generateSitemap(): Promise<string> {
  const urls: SitemapURL[] = [];

  // Add homepage
  urls.push({
    loc: SITE_URL,
    changefreq: 'weekly',
    priority: 1.0,
    lastmod: new Date().toISOString().split('T')[0],
  });

  // Add static pages
  urls.push(
    {
      loc: `${SITE_URL}/blog`,
      changefreq: 'daily',
      priority: 0.9,
    },
    {
      loc: `${SITE_URL}/portfolio`,
      changefreq: 'weekly',
      priority: 0.8,
    },
    {
      loc: `${SITE_URL}/contact`,
      changefreq: 'monthly',
      priority: 0.7,
    }
  );

  try {
    // Fetch published blog posts from Supabase
    const { data: posts } = await supabase
      .from('blog_posts')
      .select('slug, updated_at, date')
      .eq('published', true)
      .order('date', { ascending: false });

    if (posts) {
      posts.forEach((post) => {
        urls.push({
          loc: `${SITE_URL}/blog/${post.slug}`,
          lastmod: post.updated_at || post.date,
          changefreq: 'monthly',
          priority: 0.8,
        });
      });
    }

    // Fetch published work items
    const { data: workItems } = await supabase
      .from('work_items')
      .select('slug, updated_at, type')
      .eq('published', true);

    if (workItems) {
      workItems.forEach((item) => {
        urls.push({
          loc: `${SITE_URL}/${item.type === 'project' ? 'projects' : 'blog'}/${item.slug}`,
          lastmod: item.updated_at,
          changefreq: 'monthly',
          priority: item.type === 'project' ? 0.7 : 0.8,
        });
      });
    }
  } catch (error) {
    console.error('Error fetching sitemap data:', error);
  }

  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
    ${url.priority !== undefined ? `<priority>${url.priority}</priority>` : ''}
  </url>`
  )
  .join('\n')}
</urlset>`;

  return xml;
}

// Function to download sitemap (for manual generation)
export async function downloadSitemap() {
  const xml = await generateSitemap();
  const blob = new Blob([xml], { type: 'application/xml' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'sitemap.xml';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}

// Generate robots.txt content
export function generateRobotsTxt(): string {
  return `User-agent: *
Allow: /
Disallow: /admin

Sitemap: ${SITE_URL}/sitemap.xml
`;
}
