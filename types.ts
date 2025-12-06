export interface BlogPost {
  id: string;
  title: string;
  date: string;
  summary: string;
  content: string;
  tags: string[];
  published?: boolean;
  slug?: string;
  created_at?: string;
  updated_at?: string;
  // SEO fields
  meta_title?: string;
  meta_description?: string;
  og_image?: string;
  og_title?: string;
  og_description?: string;
  twitter_card_type?: string;
  twitter_title?: string;
  twitter_description?: string;
  twitter_image?: string;
  canonical_url?: string;
  robots?: string;
  keywords?: string[];
}

export type WorkType = 'project' | 'blog';

export interface WorkItem {
  id: string;
  type: WorkType;
  title: string;
  subtext: string;
  description: string; // Used for project overview or blog summary
  content?: string; // Used for full blog content or detailed project case study
  tags: string[];
  image: string;
  date?: string; // Specific to blog
  link?: string; // External link for projects
}

export enum ViewState {
  HOME = 'HOME',
  BLOG = 'BLOG',
  PORTFOLIO = 'PORTFOLIO',
  CONTACT = 'CONTACT',
  POST_DETAIL = 'POST_DETAIL',
  PROJECT_DETAIL = 'PROJECT_DETAIL'
}