# Supabase Setup Guide for HOLLYFRANK

This guide will walk you through setting up Supabase for your blog management system.

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/log in
2. Click **"New Project"**
3. Fill in your project details:
   - **Project Name**: HOLLYFRANK Blog
   - **Database Password**: (choose a strong password)
   - **Region**: Choose closest to you
4. Click **"Create new project"** and wait for it to initialize (~2 minutes)

## Step 2: Run the Database Schema

1. In your Supabase dashboard, go to the **SQL Editor** (left sidebar)
2. Click **"New query"**
3. Copy the entire contents of `supabase-schema.sql` from this project
4. Paste it into the SQL editor
5. Click **"Run"** to create all tables, indexes, and sample data

## Step 3: Get Your API Keys

1. In Supabase dashboard, go to **Settings** (gear icon) → **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (under "Project API keys")

## Step 4: Configure Your .env.local File

1. Open `.env.local` in your project
2. Replace the placeholders with your actual values:

```env
GEMINI_API_KEY=your-actual-gemini-key

# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

3. Save the file
4. Restart your dev server:
   ```bash
   npm run dev
   ```

## Step 5: Set Up Authentication (Admin Access)

### Create an Admin User

1. In Supabase dashboard, go to **Authentication** → **Users**
2. Click **"Add user"** → **"Create new user"**
3. Fill in:
   - **Email**: your-admin-email@example.com
   - **Password**: (choose a strong password)
   - **Auto Confirm User**: ✅ Check this box
4. Click **"Create user"**

### Access the Admin Panel

You can access the admin panel in two ways:

1. **Keyboard Shortcut**: Press `Ctrl+Shift+A` (or `Cmd+Shift+A` on Mac)
2. **Admin Button**: Click the small settings icon in the bottom-right corner (subtle/hidden)

## Step 6: Test Everything

1. Open your app at `http://localhost:3001`
2. Press `Ctrl+Shift+A` to open the admin panel
3. Log in with your admin credentials
4. You should see your blog posts from the sample data
5. Try:
   - Creating a new post
   - Editing an existing post
   - Publishing/unpublishing posts
   - Deleting a test post

## Features Overview

### Admin Panel Features

- ✅ **Create, Edit, Delete** blog posts
- ✅ **Publish/Unpublish** control
- ✅ **Rich HTML editor** for content
- ✅ **Tag management**
- ✅ **Slug/URL customization**
- ✅ **Draft mode** - unpublished posts don't show on the site
- ✅ **Real-time updates** - changes reflect immediately

### Blog Design Improvements

- ✨ **Enhanced typography** - Larger, more readable fonts
- 🎨 **Better spacing** - Improved line height and paragraph spacing
- 🔗 **Beautiful links** - Styled underlines and hover effects
- 💡 **Highlighted quotes** - Eye-catching blockquote design
- 📌 **Styled bullets** - Custom arrow bullets for lists
- ✏️ **Better emphasis** - Highlighted strong/bold text
- 📱 **Mobile-friendly** - Responsive design throughout

### Database Structure

Your Supabase database now has:

- `blog_posts` table - All your blog content
- `work_items` table - Projects and featured work
- Row Level Security (RLS) policies:
  - Public can read **published** content only
  - Authenticated users can manage everything
- Auto-updating timestamps
- Indexed for performance

## Troubleshooting

### "Failed to fetch posts" error
- Check that your `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are correct
- Make sure you ran the SQL schema
- Check browser console for detailed errors

### Admin panel won't open
- Try using the keyboard shortcut: `Ctrl+Shift+A`
- Check that the admin button appears in bottom-right corner
- Verify you're using a modern browser

### Can't log in to admin
- Verify you created a user in Supabase Authentication
- Make sure you checked "Auto Confirm User" when creating the user
- Check that your email/password are correct

### Posts not showing on the site
- Make sure posts are marked as **Published** in the admin panel
- Check that the `published` field is `true` in Supabase
- Refresh the page or clear your browser cache

## Security Notes

⚠️ **Important Security Information**:

1. **Never commit `.env.local`** to version control (already in .gitignore)
2. **RLS is enabled** - only published content is public
3. **Admin requires authentication** - create users in Supabase dashboard only
4. **Use strong passwords** for admin accounts
5. **HTTPS in production** - Always deploy with SSL/TLS

## Next Steps

Now that everything is set up, you can:

1. ✍️ **Write new blog posts** through the admin panel
2. 🎨 **Customize the design** further in `App.tsx`
3. 📧 **Connect newsletter signup** to an email service
4. 🚀 **Deploy to production** (Vercel, Netlify, etc.)
5. 📊 **Add analytics** to track readers
6. 🔍 **Add search functionality** for blog posts

## Support

If you encounter any issues:
1. Check the browser console for errors
2. Review Supabase logs in the dashboard
3. Verify all environment variables are set correctly
4. Make sure the database schema was applied successfully

Happy blogging! 🎉
