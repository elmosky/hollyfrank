# Changelog

All notable changes to the HOLLYFRANK blog platform will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [Unreleased]

### Changed - 2025-12-11

#### Blog Post Template Improvements
- **H2 headings**: Increased to 4xl, extrabold, white gradient, cyan border bottom
- **H3 headings**: Bold, cyan color for better visual hierarchy
- **Lead paragraphs**: Added `.lead` class with larger text, left border accent
- **Body text**: Optimized line-height and spacing (1.85)
- **Blockquotes**: Larger text (1.5rem), white color, enhanced shadows
- **Lists**: Added background boxes, improved bullets with cyan arrows
- **Images**: Larger margins (my-16), rounded corners, borders, ring effects
- **Spacing**: More breathing room between all elements

#### Content Updates
- Expanded "The Singularity of Self" article from ~500 to ~1500 words
- Added 2 full-width images with proper alt text
- Added comprehensive sections: Networked Ego, Designing for Fluidity, Privacy
- Added H3 subsections: Fragmentation Problem, Context as Core, Flow Control
- Added lists, blockquotes, and numbered principles
- Made content more actionable with builder guidelines

### Changed - 2025-12-11

#### File Organization
- Created `/public/` folder for static assets
- Moved `og-image.png` and `favicon.png` to `/public/` folder
- Fixed incorrectly named image files (were in root with wrong names)

#### Social Media Cleanup
- Removed all Twitter/social media references from codebase
- Removed Twitter meta tags from `index.html`
- Removed Twitter Card generation from `SEOHead.tsx`
- Removed social media icons (Twitter, LinkedIn) from blog post share section
- Kept Copy Link button for sharing functionality
- Removed unused icon imports (Github, Twitter, Linkedin) from `App.tsx`
- Removed social media links from structured data (JSON-LD)

#### Configuration Updates
- Confirmed domain configuration as `hollyfrank.com` in SEOHead.tsx
- Verified OG image paths point to `/public/og-image.png`

#### Content Updates
- Removed "Aether OS" work from hardcoded SELECTED_WORKS array
- Reduced to 2 default works: CoinCentral and The Singularity of Self

### Added - 2025-12-11

#### Documentation
- Created `CLAUDE.md` - Comprehensive guide for AI assistants working on the project
- Created `SEO-GUIDE.md` - Complete SEO and metadata best practices guide
- Created `CHANGELOG.md` - This file for tracking all project changes

#### SEO Enhancements
- Enhanced `index.html` with comprehensive meta tags:
  - Open Graph tags for Facebook/LinkedIn sharing
  - Twitter Card tags for Twitter sharing
  - Theme color for mobile browsers
  - Preconnect hints for performance
  - Canonical URL support
- Added structured data (JSON-LD) to `SEOHead` component:
  - BlogPosting schema for blog posts
  - Organization schema for homepage
  - Automatic schema selection based on page type
- Added `SEOHead` component to homepage for better discoverability
- Optimized meta descriptions and keywords

#### Works/Case Studies Management
- Added database integration for works/case studies from Supabase `work_items` table
- Works now dynamically load from database instead of hardcoded data
- Added fallback to hardcoded data if database connection fails
- Works editor in admin panel now uses RichTextEditor component (visual + code modes)
- Added `display_order` field support for organizing works

#### Type System Updates
- Extended `WorkItem` interface with database fields:
  - `slug` - URL-friendly identifier
  - `published` - Publication status
  - `display_order` - Manual sorting order
  - `created_at` - Creation timestamp
  - `updated_at` - Last update timestamp

### Changed - 2025-12-11

#### Branding Updates
- Renamed "Case Study" labels to "Works" throughout the UI
- Updated project detail page badge from "Case Study" to "Work"
- Updated portfolio grid card badges

#### Admin Panel Improvements
- Works editor now uses consistent RichTextEditor component
- Added visual/code toggle for works content editing
- Fixed ReactQuill import issue in works editor
- Admin panel now refreshes both blog posts and works on close

#### Navigation & Organization
- Thoughts menu → Blog posts only
- Works menu → Case studies/projects only
- Clear separation between blog content and portfolio work

---

## [2025-12-10] - Initial SEO Implementation

### Added
- Comprehensive SEO features with meta tags support
- Open Graph tags for social media sharing
- Twitter Card support
- Canonical URL support
- Robots meta tag configuration
- Keywords support
- `SEOHead` component for managing all SEO metadata

---

## [Initial Release] - 2025-12-09

### Added
- HOLLYFRANK blog platform with modern design
- Scroll-reveal hero section with animated brain visual
- Blog post management with Supabase integration
- Admin panel with authentication (Ctrl+Shift+A to access)
- Rich text editor for blog content
- Image upload functionality
- Portfolio/works grid display
- Contact form
- Newsletter signup form
- Responsive design for mobile and desktop
- Dark theme with cyan/purple accent colors
- Automatic deployment via GitHub → Vercel integration
