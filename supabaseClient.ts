import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if Supabase is configured
const isSupabaseConfigured =
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== 'your-project-url.supabase.co' &&
  supabaseUrl.includes('supabase.co');

// Create a mock client for when Supabase isn't configured
const mockSupabase = {
  from: () => ({
    select: () => Promise.resolve({ data: null, error: null }),
    insert: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
    update: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
    delete: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
    eq: function() { return this; },
    order: function() { return this; },
  }),
  auth: {
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    signInWithPassword: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
    signUp: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
    signOut: () => Promise.resolve({ error: null }),
  }
} as any;

// Create a safe client that won't break the app if credentials aren't set
export const supabase: SupabaseClient = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      }
    })
  : mockSupabase;

export const isSupabaseEnabled = isSupabaseConfigured;

// Database types
export interface BlogPost {
  id: string;
  title: string;
  date: string;
  summary: string;
  content: string;
  tags: string[];
  created_at?: string;
  updated_at?: string;
  published: boolean;
  slug?: string;
}

export interface WorkItem {
  id: string;
  type: 'project' | 'blog';
  title: string;
  subtext: string;
  description: string;
  content?: string;
  tags: string[];
  image?: string;
  link?: string;
  date?: string;
  created_at?: string;
  updated_at?: string;
  published: boolean;
}
