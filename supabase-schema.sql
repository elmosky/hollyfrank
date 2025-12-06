-- HOLLYFRANK Database Schema
-- Run this SQL in your Supabase SQL Editor to create the necessary tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Work Items Table (Projects and Featured Posts)
CREATE TABLE IF NOT EXISTS work_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('project', 'blog')),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  subtext TEXT NOT NULL,
  description TEXT NOT NULL,
  content TEXT,
  tags TEXT[] DEFAULT '{}',
  image TEXT,
  link TEXT,
  date DATE,
  published BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_date ON blog_posts(date DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_work_items_published ON work_items(published);
CREATE INDEX IF NOT EXISTS idx_work_items_type ON work_items(type);
CREATE INDEX IF NOT EXISTS idx_work_items_slug ON work_items(slug);

-- Create a function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to auto-update updated_at
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_work_items_updated_at BEFORE UPDATE ON work_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE work_items ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access to published content
CREATE POLICY "Allow public read access to published blog posts"
  ON blog_posts FOR SELECT
  USING (published = true);

CREATE POLICY "Allow public read access to published work items"
  ON work_items FOR SELECT
  USING (published = true);

-- Create policies for authenticated users (admin) to manage all content
CREATE POLICY "Allow authenticated users full access to blog posts"
  ON blog_posts FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users full access to work items"
  ON work_items FOR ALL
  USING (auth.role() = 'authenticated');

-- Insert sample data (your existing blog posts)
INSERT INTO blog_posts (id, title, slug, date, summary, content, tags, published) VALUES
  ('a1b2c3d4-e5f6-4890-abcd-ef1234567890',
   'Drawing The Geopolitical Boundaries Around AI',
   'geopolitics-ai',
   '2025-11-06',
   'The US-China truce on tariffs left one issue untouched: export controls on AI chips. This reveals the deeper stakes behind America''s strategy for compute dominance.',
   '<p class="lead text-xl md:text-2xl text-slate-300 font-light leading-relaxed mb-12">In late October 2025, Trump and Xi agreed to a one-year truce on tariffs and rare-earths, but left one issue untouched: US export controls on AI chips.</p>

<p>Within days, Trump signaled he''d allow limited Nvidia sales to China before reversing course. The episode reveals the deeper stakes behind America''s AI strategy: how to balance short-term technological leverage against long-term industrial strength in the race for <a href="#">compute dominance</a>.</p>

<h2>The Compute Advantage</h2>
<p>AI progress has been <a href="#">driven</a> by three inputs: data, algorithms, and compute. Unlike data or algorithms, state-of-the-art compute is virtually <a href="#">monopolized</a> by the West. It exists as a stack of hardware, software, and infrastructure concentrated in a handful of chokepoints controlled by the US and its allies. This control is crucial for America, as <a href="#">compute</a> has reliably accelerated AI performance and is increasingly vital for deployment.</p>

<h3>Compute Drives Performance</h3>
<p>In 2019, reinforcement learning co-founder <a href="#">Rich Sutton</a> articulated what he called <a href="#">the bitter lesson</a> of AI research. He argued that AI systems that learn independently through massive amounts of compute consistently outperform alternative methods.</p>

<p>A 2024 <a href="#">Epoch AI</a> study confirmed Sutton''s prescient observation, finding 60-95% of recent AI performance gains had come from scaling compute and data rather than algorithmic breakthroughs. Accordingly, since 2015, training compute requirements have doubled approximately every <a href="#">six months</a>, establishing a clear formula: more compute enables researchers to train larger models with more parameters, which in turn delivers better performance across all benchmarks and real-world tasks.</p>

<h2>The Strategic Choke Point</h2>
<p>This rapid oscillation in policy highlights a fundamental tension in Western strategy. The semiconductor supply chain is not just a market; it is the central nervous system of the 21st-century economy. Control over high-end compute is the modern equivalent of control over oil shipping lanes.</p>

<blockquote>The "Compute Divide" is widening. While consumer AI models are becoming ubiquitous, the frontier models required for national security require clusters of compute that are becoming increasingly difficult to assemble.</blockquote>

<p>As we look toward 2026, the question isn''t just about who designs the best chips, but who controls the lithography, the packaging, and the raw interconnects that make massive clusters possible.</p>

<h2>Industrial Sovereignty</h2>
<p>The restrictions are forcing China to accelerate its domestic semiconductor capabilities. While this causes short-term pain for Chinese tech giants, it creates a long-term strategic rival that is completely decoupled from Western supply chains. The "choke point" strategy has a shelf life.</p>',
   ARRAY['Deep Dive', 'Hardware', 'Policy'],
   true
  );

INSERT INTO blog_posts (id, title, slug, date, summary, content, tags, published) VALUES
  ('b2c3d4e5-f6a7-4901-bcde-fa2345678901',
   'The Singularity of Self',
   'singularity-self',
   '2025-11-12',
   'When ''I'' becomes a network: An exploration of digital identity and the dissolution of the ego in a hyper-connected age.',
   '<p class="lead text-xl md:text-2xl text-slate-300 font-light leading-relaxed mb-12">The modern concept of "self" is undergoing a radical fragmentation. We are no longer singular entities but distributed networks of data, interactions, and digital footprints.</p>

<p>As we offload more of our cognition to algorithms and our memory to the cloud, the boundary between the biological individual and the digital extension blurs. This isn''t just a philosophical curiosity; it''s a fundamental shift in how we must design interfaces.</p>

<h2>The Networked Ego</h2>
<p>We are designing for the "Networked Self" — a user who exists in multiple states simultaneously. The user is no longer a static point of origin for action, but a node in a continuous flow of information.</p>

<p>Consider the "feed." It is not content we consume; it is a reflection of our digital shadow, curated by algorithms that know our preferences better than we do. In this loop, who is the author of the experience? The user who clicks, or the algorithm that predicts the click?</p>

<h2>Designing for Fluidity</h2>
<p>When we design for the future, we must stop designing for users as static points and start designing for users as dynamic flows. Interfaces must become fluid, adapting not just to screen size, but to context, intent, and cognitive load. The "Self" is no longer a noun; it is a verb.</p>

<h2>The End of Privacy?</h2>
<p>If the self is a network, then privacy is not about hiding information, but about controlling the flow. The challenge for the next decade will be building tools that allow us to manage our distributed selves without losing the cohesion of our identity.</p>',
   ARRAY['Philosophy', 'Identity', 'Future'],
   true
  );

INSERT INTO blog_posts (id, title, slug, date, summary, content, tags, published) VALUES
  ('c3d4e5f6-a7b8-4012-cdef-ab3456789012',
   'The Silent Interface',
   'silent-interface',
   '2025-10-15',
   'Why the best UI is no UI at all. Moving beyond screens into the era of ambient computing and neural inputs.',
   '<p class="lead text-xl md:text-2xl text-slate-300 font-light leading-relaxed mb-12">For forty years, we have been trapped behind glass. The screen has been our primary window into the digital world. But the screen is a barrier. It demands attention, it requires focus, and it separates us from our environment.</p>

<p>The next era of interface design is silent. It is ambient. It is there when you need it and invisible when you don''t. With the rise of high-fidelity voice models and neural wristbands, we are approaching the end of the "Point and Click" era.</p>

<h2>Ambient Computing</h2>
<p>Imagine a workspace where the OS doesn''t live on a monitor, but exists as a layer of intelligence over your physical desk. Information is projected only when relevant. Controls appear only when your hand moves to interact with them.</p>

<p>This requires a shift in design thinking from "Visual Hierarchy" to "Contextual Relevance." We are not arranging pixels; we are choreographing attention.</p>

<h2>Neural Inputs</h2>
<p>The keyboard is a bandwidth bottleneck. We think faster than we can type. Neural interfaces, even non-invasive ones like EMG wristbands, promise to remove this friction, allowing us to interact with digital systems at the speed of thought.</p>',
   ARRAY['Design', 'Future', 'HCI'],
   true
  );
