# Claude AI Context & Project Guide

This document provides context for Claude Code (or other AI assistants) working on the HOLLYFRANK blog platform. It contains essential information about the project structure, conventions, and common workflows.

---

## Project Overview

**HOLLYFRANK** is a modern blog and portfolio platform for showcasing thought leadership and creative works. It features:
- Blog posts (referred to as "Thoughts")
- Portfolio items/case studies (referred to as "Works")
- Admin panel for content management
- Rich text editing with visual and code modes
- Image upload and management
- SEO optimization features

**Tech Stack:**
- React 19.2.0 with TypeScript
- Vite for development and building
- Supabase for backend (database + storage + auth)
- TipTap for rich text editing
- Tailwind CSS for styling
- Lucide React for icons

---

## Architecture & File Structure

### Key Files

| File | Purpose |
|------|---------|
| `App.tsx` | Main application component, routing, view management |
| `AdminPanel.tsx` | Content management interface for blog posts and works |
| `types.ts` | TypeScript interfaces and enums |
| `supabaseClient.ts` | Supabase connection configuration |
| `RichTextEditor.tsx` | Visual HTML editor component (TipTap) |
| `ImageUpload.tsx` | Image upload component with Supabase Storage |
| `SEOHead.tsx` | SEO meta tags component |

### Database Schema

**Table: `blog_posts`**
- `id` (text, primary key)
- `title` (text)
- `slug` (text)
- `date` (text/date)
- `summary` (text)
- `content` (text, HTML)
- `tags` (text array)
- `published` (boolean)
- `featured_image` (text, URL)
- SEO fields: `meta_title`, `meta_description`, `og_image`, `og_title`, `og_description`, `twitter_*`, `canonical_url`, `robots`, `keywords`
- Timestamps: `created_at`, `updated_at`

**Table: `work_items`**
- `id` (text, primary key)
- `type` (text: 'project' or 'blog')
- `title` (text)
- `slug` (text)
- `subtext` (text)
- `description` (text)
- `content` (text, HTML)
- `tags` (text array)
- `image` (text, URL)
- `date` (text/date)
- `link` (text, URL)
- `published` (boolean)
- `display_order` (integer)
- Timestamps: `created_at`, `updated_at`

**Storage Bucket: `blog-images`**
- Stores uploaded images
- Public access enabled
- Organized by folders (optional)

---

## Development Workflow

### Local Development
```bash
npm run dev          # Start dev server at http://localhost:3000
npm run build        # Production build
npm run preview      # Preview production build
```

### Deployment
1. Make changes locally
2. Test at `http://localhost:3000`
3. Commit to git
4. Push to GitHub
5. Vercel automatically deploys from GitHub

### Accessing Admin Panel
- Press `Ctrl+Shift+A` (or `Cmd+Shift+A` on Mac)
- Or click the settings icon in bottom-right corner
- Login required (Supabase authentication)

---

## Code Conventions

### Component Structure
- Functional components with TypeScript
- Props interfaces defined inline or in `types.ts`
- Hooks at the top of components
- Event handlers prefixed with `handle*`

### Styling
- Tailwind CSS utility classes
- Dark theme with slate base colors
- Accent colors: cyan (#22d3ee) and purple (#a855f7)
- Responsive: mobile-first approach

### State Management
- React `useState` for local state
- Supabase for persistent data
- No external state management library (Redux, Zustand, etc.)

### Naming Conventions
- Components: PascalCase (`BlogList`, `AdminPanel`)
- Functions: camelCase (`fetchBlogPosts`, `handleSave`)
- Constants: UPPER_SNAKE_CASE (`BLOG_POSTS`, `SELECTED_WORKS`)
- Types/Interfaces: PascalCase (`BlogPost`, `WorkItem`)

---

## Common Tasks

### Adding a New Blog Post
1. Open admin panel (`Ctrl+Shift+A`)
2. Go to "Blog Posts" tab
3. Click "Create New Post"
4. Fill in title, summary, content (use visual or code editor)
5. Add tags, upload featured image
6. Toggle "Published" when ready
7. Click "Save Post"

### Adding a New Work/Case Study
1. Open admin panel (`Ctrl+Shift+A`)
2. Go to "Works" tab
3. Click "Create New Work"
4. Select type (Project or Blog Feature)
5. Fill in all fields
6. Upload project image
7. Toggle "Published" when ready
8. Click "Save Work"

### Modifying Navigation
- Edit `Navbar` component in `App.tsx`
- Current menu items: THOUGHTS, WORKS, CONNECT
- Views are managed via `ViewState` enum

### Adding New View/Page
1. Add new state to `ViewState` enum in `types.ts`
2. Create component for the view
3. Add case in `renderView()` function in `App.tsx`
4. Add navigation button in `Navbar` component

### Updating SEO Defaults
- Edit `SEOHead.tsx` for default meta tags
- Update per-post SEO in admin panel

---

## Important Context for AI Assistants

### When Making Changes
1. **Always read files before editing** - Don't assume structure
2. **Preserve existing styling** - Match Tailwind patterns
3. **Test locally** - Changes hot-reload at localhost:3000
4. **Update CHANGELOG.md** - Document all significant changes
5. **Maintain TypeScript types** - Update `types.ts` when needed

### Content Philosophy
- "Thoughts" = Blog posts (ideas, essays, deep dives)
- "Works" = Portfolio items (projects, case studies)
- Professional, futuristic aesthetic
- Focus on technology, design, and philosophy

### Database Considerations
- Always filter by `published: true` on frontend
- Admin panel shows all items (published + drafts)
- Use fallback hardcoded data if Supabase unavailable
- Slugs auto-generated from titles if not provided

### Known Limitations
- No user comments system (intentional)
- No search functionality (future enhancement)
- No pagination on blog list (future enhancement)
- Admin panel is single-user (Supabase auth)

---

## Supabase Configuration

### Environment Variables Needed
```env
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Storage Policies
- `blog-images` bucket should have public read access
- Upload policy restricted to authenticated users

### Authentication
- Email/password authentication enabled
- Sign up for first admin user
- Subsequent logins via admin panel

---

## Future Enhancements (TODO)

- [ ] Search functionality for blog posts
- [ ] Pagination for blog list
- [ ] Related posts section
- [ ] Post view analytics
- [ ] RSS feed generation
- [ ] Newsletter integration (currently static form)
- [ ] Comments system (if desired)
- [ ] Multi-author support
- [ ] Draft preview URLs
- [ ] Scheduled publishing

---

## Helpful Commands for AI

### Check what's running
```bash
ps aux | grep vite              # Check if dev server is running
lsof -i :3000                   # Check what's using port 3000
```

### Database queries (via Supabase client)
```typescript
// Fetch all published posts
const { data } = await supabase
  .from('blog_posts')
  .select('*')
  .eq('published', true)
  .order('date', { ascending: false });

// Fetch all works
const { data } = await supabase
  .from('work_items')
  .select('*')
  .eq('published', true)
  .order('display_order', { ascending: true });
```

### Quick debugging
- Check browser console for errors
- Check Vite dev server output for build errors
- Verify Supabase connection in Network tab

---

## Contact & Ownership

**Project Owner:** Holly Frank
**Primary AI Assistant:** Claude (Anthropic)
**Created:** December 2025
**Last Updated:** December 11, 2025

---

*This document should be updated whenever significant architectural changes are made to the project.*
