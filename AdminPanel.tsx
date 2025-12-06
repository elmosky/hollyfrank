import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import {
  Plus, Edit2, Trash2, Save, X, Eye, EyeOff, Calendar,
  Tag, FileText, Link as LinkIcon, Image as ImageIcon, LogOut,
  CheckCircle, AlertCircle, Loader
} from 'lucide-react';
import type { BlogPost } from './supabaseClient';

interface AdminPanelProps {
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onClose }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [session, setSession] = useState<any>(null);

  // Auth state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setSession(session);
    if (session) {
      fetchPosts();
    } else {
      setLoading(false);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        setSession(data.session);
        fetchPosts();
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        showMessage('success', 'Account created! Please check your email to verify.');
      }
    } catch (error: any) {
      showMessage('error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setPosts([]);
  };

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error: any) {
      showMessage('error', 'Failed to fetch posts: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  const handleSave = async () => {
    if (!editingPost) return;

    setSaving(true);
    try {
      // Generate slug from title if not exists
      const slug = editingPost.slug || editingPost.title.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      const postData = {
        ...editingPost,
        slug,
        updated_at: new Date().toISOString()
      };

      if (isCreating) {
        const { error } = await supabase
          .from('blog_posts')
          .insert([postData]);

        if (error) throw error;
        showMessage('success', 'Post created successfully!');
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', editingPost.id);

        if (error) throw error;
        showMessage('success', 'Post updated successfully!');
      }

      setEditingPost(null);
      setIsCreating(false);
      fetchPosts();
    } catch (error: any) {
      showMessage('error', 'Failed to save: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      showMessage('success', 'Post deleted successfully!');
      fetchPosts();
    } catch (error: any) {
      showMessage('error', 'Failed to delete: ' + error.message);
    }
  };

  const handleCreate = () => {
    setIsCreating(true);
    setEditingPost({
      id: crypto.randomUUID(),
      title: '',
      slug: '',
      date: new Date().toISOString().split('T')[0],
      summary: '',
      content: '',
      tags: [],
      published: false
    });
  };

  const togglePublish = async (post: BlogPost) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({ published: !post.published })
        .eq('id', post.id);

      if (error) throw error;
      showMessage('success', `Post ${!post.published ? 'published' : 'unpublished'}!`);
      fetchPosts();
    } catch (error: any) {
      showMessage('error', 'Failed to update: ' + error.message);
    }
  };

  // Auth Screen
  if (!session) {
    return (
      <div className="fixed inset-0 bg-slate-950 z-[100] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-slate-900 rounded-2xl border border-slate-800 p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-white">Admin Login</h2>
            <button onClick={onClose} className="text-slate-400 hover:text-white">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-6 py-3 rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? 'Loading...' : isLogin ? 'Sign In' : 'Sign Up'}
            </button>

            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="w-full text-sm text-slate-400 hover:text-white"
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Editor Screen
  if (editingPost) {
    return (
      <div className="fixed inset-0 bg-slate-950 z-[100] overflow-y-auto">
        <div className="min-h-screen p-6">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-white">
                {isCreating ? 'Create New Post' : 'Edit Post'}
              </h2>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setEditingPost(null);
                    setIsCreating(false);
                  }}
                  className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Form */}
            <div className="bg-slate-900 rounded-xl border border-slate-800 p-8 space-y-6">
              {/* Title & Slug */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    <FileText size={16} className="inline mr-2" />
                    Title
                  </label>
                  <input
                    type="text"
                    value={editingPost.title}
                    onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                    placeholder="Post title..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    <LinkIcon size={16} className="inline mr-2" />
                    Slug (URL)
                  </label>
                  <input
                    type="text"
                    value={editingPost.slug}
                    onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 font-mono text-sm"
                    placeholder="post-slug"
                  />
                </div>
              </div>

              {/* Date & Published */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    <Calendar size={16} className="inline mr-2" />
                    Date
                  </label>
                  <input
                    type="date"
                    value={editingPost.date}
                    onChange={(e) => setEditingPost({ ...editingPost, date: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-3 cursor-pointer bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 w-full hover:border-slate-600 transition-colors">
                    <input
                      type="checkbox"
                      checked={editingPost.published}
                      onChange={(e) => setEditingPost({ ...editingPost, published: e.target.checked })}
                      className="w-5 h-5 rounded border-slate-600 text-cyan-500 focus:ring-cyan-500"
                    />
                    <span className="text-white font-medium">Published</span>
                    {editingPost.published ? <Eye size={16} className="text-cyan-500" /> : <EyeOff size={16} className="text-slate-500" />}
                  </label>
                </div>
              </div>

              {/* Summary */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Summary</label>
                <textarea
                  value={editingPost.summary}
                  onChange={(e) => setEditingPost({ ...editingPost, summary: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 resize-none"
                  rows={3}
                  placeholder="Brief summary of the post..."
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  <Tag size={16} className="inline mr-2" />
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={editingPost.tags?.join(', ') || ''}
                  onChange={(e) => setEditingPost({
                    ...editingPost,
                    tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean)
                  })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                  placeholder="Design, Technology, Future"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Content (HTML)</label>
                <textarea
                  value={editingPost.content}
                  onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 resize-none font-mono text-sm"
                  rows={20}
                  placeholder="<p>Your content here...</p>"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-4 border-t border-slate-800">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-6 py-3 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <>
                      <Loader size={20} className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={20} />
                      Save Post
                    </>
                  )}
                </button>
                <button
                  onClick={() => {
                    setEditingPost(null);
                    setIsCreating(false);
                  }}
                  className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Admin Panel
  return (
    <div className="fixed inset-0 bg-slate-950 z-[100] overflow-y-auto">
      <div className="min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Content Management</h2>
              <p className="text-slate-400">Manage your blog posts and content</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleSignOut}
                className="px-4 py-2 text-slate-400 hover:text-white transition-colors flex items-center gap-2"
              >
                <LogOut size={20} />
                Sign Out
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          {/* Message */}
          {message && (
            <div className={`mb-6 p-4 rounded-lg border flex items-center gap-3 ${
              message.type === 'success'
                ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400'
                : 'bg-red-500/10 border-red-500/50 text-red-400'
            }`}>
              {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
              {message.text}
            </div>
          )}

          {/* Create Button */}
          <div className="mb-6">
            <button
              onClick={handleCreate}
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
            >
              <Plus size={20} />
              Create New Post
            </button>
          </div>

          {/* Posts List */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader size={40} className="animate-spin text-cyan-500" />
            </div>
          ) : (
            <div className="grid gap-4">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-bold text-white">{post.title}</h3>
                        {post.published ? (
                          <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-full flex items-center gap-1">
                            <Eye size={12} /> Published
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-slate-700 text-slate-400 text-xs rounded-full flex items-center gap-1">
                            <EyeOff size={12} /> Draft
                          </span>
                        )}
                      </div>
                      <p className="text-slate-400 mb-3">{post.summary}</p>
                      <div className="flex items-center gap-4 text-sm text-slate-500">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Tag size={14} />
                          {post.tags?.join(', ')}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => togglePublish(post)}
                        className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white"
                        title={post.published ? 'Unpublish' : 'Publish'}
                      >
                        {post.published ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                      <button
                        onClick={() => setEditingPost(post)}
                        className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-cyan-400 hover:text-cyan-300"
                      >
                        <Edit2 size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-red-400 hover:text-red-300"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
