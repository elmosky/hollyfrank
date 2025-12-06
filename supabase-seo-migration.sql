-- SEO Enhancement Migration
-- Add SEO fields to existing blog_posts table

-- Add SEO columns to blog_posts
ALTER TABLE blog_posts
ADD COLUMN IF NOT EXISTS meta_title TEXT,
ADD COLUMN IF NOT EXISTS meta_description TEXT,
ADD COLUMN IF NOT EXISTS og_image TEXT,
ADD COLUMN IF NOT EXISTS og_title TEXT,
ADD COLUMN IF NOT EXISTS og_description TEXT,
ADD COLUMN IF NOT EXISTS twitter_card_type TEXT DEFAULT 'summary_large_image',
ADD COLUMN IF NOT EXISTS twitter_title TEXT,
ADD COLUMN IF NOT EXISTS twitter_description TEXT,
ADD COLUMN IF NOT EXISTS twitter_image TEXT,
ADD COLUMN IF NOT EXISTS canonical_url TEXT,
ADD COLUMN IF NOT EXISTS robots TEXT DEFAULT 'index, follow',
ADD COLUMN IF NOT EXISTS keywords TEXT[];

-- Add SEO columns to work_items
ALTER TABLE work_items
ADD COLUMN IF NOT EXISTS meta_title TEXT,
ADD COLUMN IF NOT EXISTS meta_description TEXT,
ADD COLUMN IF NOT EXISTS og_image TEXT,
ADD COLUMN IF NOT EXISTS og_title TEXT,
ADD COLUMN IF NOT EXISTS og_description TEXT,
ADD COLUMN IF NOT EXISTS canonical_url TEXT,
ADD COLUMN IF NOT EXISTS robots TEXT DEFAULT 'index, follow';

-- Create site_settings table for global SEO
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable RLS on site_settings
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Allow public read for site settings
CREATE POLICY "Allow public read access to site settings"
  ON site_settings FOR SELECT
  USING (true);

-- Allow authenticated users to manage site settings
CREATE POLICY "Allow authenticated users to manage site settings"
  ON site_settings FOR ALL
  USING (auth.role() = 'authenticated');

-- Insert default site settings
INSERT INTO site_settings (key, value) VALUES
  ('global_seo', '{
    "site_name": "HOLLYFRANK",
    "site_description": "A thought and design studio exploring what''s possible in a post-internet world",
    "site_url": "https://hollyfrank.com",
    "default_og_image": "/og-image.png",
    "twitter_handle": "@hollyfrank",
    "default_robots": "index, follow"
  }'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- Update existing blog posts with default SEO values
UPDATE blog_posts
SET
  meta_title = title,
  meta_description = summary,
  robots = 'index, follow'
WHERE meta_title IS NULL;
