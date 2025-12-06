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