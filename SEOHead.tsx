import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  robots?: string;
  keywords?: string[];
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

const DEFAULT_SEO = {
  siteName: 'HOLLYFRANK',
  siteUrl: 'https://hollyfrank.com',
  defaultDescription: 'A thought and design studio exploring what\'s possible in a post-internet world',
  defaultImage: '/og-image.png',
};

const setMetaTag = (name: string, content: string, isProperty = false) => {
  const attribute = isProperty ? 'property' : 'name';
  let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }
  element.content = content;
};

const setLinkTag = (rel: string, href: string) => {
  let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;

  if (!element) {
    element = document.createElement('link');
    element.rel = rel;
    document.head.appendChild(element);
  }
  element.href = href;
};

const addStructuredData = (type: string, data: any) => {
  let scriptElement = document.querySelector('script[type="application/ld+json"]');

  if (!scriptElement) {
    scriptElement = document.createElement('script');
    scriptElement.type = 'application/ld+json';
    document.head.appendChild(scriptElement);
  }

  scriptElement.textContent = JSON.stringify(data);
};

export const SEOHead: React.FC<SEOProps> = ({
  title,
  description = DEFAULT_SEO.defaultDescription,
  canonical,
  ogImage = DEFAULT_SEO.defaultImage,
  ogTitle,
  ogDescription,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  twitterTitle,
  twitterDescription,
  twitterImage,
  robots = 'index, follow',
  keywords = [],
  author = 'HOLLYFRANK',
  publishedTime,
  modifiedTime,
}) => {
  useEffect(() => {
    const pageTitle = title ? `${title} | ${DEFAULT_SEO.siteName}` : DEFAULT_SEO.siteName;
    const canonicalUrl = canonical || window.location.href.split('?')[0].split('#')[0];
    const fullOgImage = ogImage.startsWith('http') ? ogImage : `${DEFAULT_SEO.siteUrl}${ogImage}`;
    const fullTwitterImage = twitterImage?.startsWith('http') ? twitterImage : `${DEFAULT_SEO.siteUrl}${twitterImage || ogImage}`;

    // Set title
    document.title = pageTitle;

    // Basic meta tags
    setMetaTag('description', description);
    if (keywords.length > 0) setMetaTag('keywords', keywords.join(', '));
    setMetaTag('author', author);
    setMetaTag('robots', robots);

    // Canonical
    setLinkTag('canonical', canonicalUrl);

    // Open Graph
    setMetaTag('og:type', ogType, true);
    setMetaTag('og:url', canonicalUrl, true);
    setMetaTag('og:title', ogTitle || title || DEFAULT_SEO.siteName, true);
    setMetaTag('og:description', ogDescription || description, true);
    setMetaTag('og:image', fullOgImage, true);
    setMetaTag('og:site_name', DEFAULT_SEO.siteName, true);

    if (publishedTime) setMetaTag('article:published_time', publishedTime, true);
    if (modifiedTime) setMetaTag('article:modified_time', modifiedTime, true);

    // Twitter Card - Removed (no social media accounts currently)

    // Structured Data (JSON-LD)
    if (ogType === 'article' && publishedTime) {
      // Blog post structured data
      addStructuredData('BlogPosting', {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: title,
        description: description,
        image: fullOgImage,
        datePublished: publishedTime,
        dateModified: modifiedTime || publishedTime,
        author: {
          '@type': 'Person',
          name: author,
        },
        publisher: {
          '@type': 'Organization',
          name: DEFAULT_SEO.siteName,
          logo: {
            '@type': 'ImageObject',
            url: `${DEFAULT_SEO.siteUrl}/logo.png`,
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': canonicalUrl,
        },
      });
    } else {
      // Website/Organization structured data
      addStructuredData('Organization', {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: DEFAULT_SEO.siteName,
        url: DEFAULT_SEO.siteUrl,
        logo: `${DEFAULT_SEO.siteUrl}/logo.png`,
        description: DEFAULT_SEO.defaultDescription,
      });
    }
  }, [title, description, canonical, ogImage, ogTitle, ogDescription, ogType, twitterCard, twitterTitle, twitterDescription, twitterImage, robots, keywords, author, publishedTime, modifiedTime]);

  return null;
};

export default SEOHead;
