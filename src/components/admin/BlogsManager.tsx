import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Plus, Trash2, Edit3, X, Sparkles, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { soundFX } from '../../utils/soundFX';
import { uploadService } from '../../utils/uploadService';
import { supabase } from '../../utils/supabaseClient';

interface BlogItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  tags: string[];
  publishedAt: string;
  status: 'published' | 'draft';
}

export const BlogsManager: React.FC = () => {
  const { blogs, addBlog, updateBlog, deleteBlog } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogItem | null>(null);
  
  const [formData, setFormData] = useState<Partial<BlogItem>>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    coverImage: '',
    tags: [],
    status: 'published'
  });

  const [tagsInput, setTagsInput] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleOpenAdd = () => {
    soundFX.playClick();
    setEditingBlog(null);
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      coverImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500&auto=format&fit=crop&q=80',
      tags: [],
      status: 'published'
    });
    setTagsInput('');
    setUploadError(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (blog: BlogItem) => {
    soundFX.playClick();
    setEditingBlog(blog);
    setFormData({ ...blog });
    setTagsInput((blog.tags || []).join(', '));
    setUploadError(null);
    setModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!supabase) {
      setUploadError('Database not connected. File uploads are disabled.');
      return;
    }

    soundFX.playClick();
    setUploading(true);
    setUploadError(null);

    try {
      const publicUrl = await uploadService.uploadFile(file, 'blogs');
      setFormData((prev) => ({ ...prev, coverImage: publicUrl }));
      soundFX.playSwoosh();
    } catch (err: any) {
      setUploadError(err.message || 'Image upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    soundFX.playClick();

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const payload: BlogItem = {
      id: editingBlog ? editingBlog.id : `blog-${Date.now()}`,
      title: formData.title || 'Untitled Post',
      slug: formData.slug || `post-${Date.now()}`,
      excerpt: formData.excerpt || '',
      content: formData.content || '',
      coverImage: formData.coverImage || '',
      tags,
      publishedAt: editingBlog ? editingBlog.publishedAt : new Date().toISOString(),
      status: formData.status || 'published'
    };

    if (editingBlog) {
      await updateBlog(payload);
    } else {
      await addBlog(payload);
    }

    soundFX.playSwoosh();
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-3xl p-6 border border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-accent-purple/20 border border-accent-purple/40 flex items-center justify-center text-accent-violet shadow-glow-purple">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Blogs & Articles Manager</h3>
            <p className="text-xs text-slate-400">Write articles, design cover cards, manage drafts, and configure tags.</p>
          </div>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple text-white text-xs font-bold shadow-glow-purple cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Write Article</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogs.map((blog) => (
          <div key={blog.id} className="glass-card rounded-2xl p-5 border border-white/10 flex flex-col justify-between gap-4">
            <div className="space-y-3">
              {blog.coverImage && (
                <img src={blog.coverImage} alt={blog.title} className="w-full h-36 object-cover rounded-xl border border-white/5" />
              )}
              <div className="flex items-center justify-between">
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                  blog.status === 'published' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                }`}>
                  {blog.status.toUpperCase()}
                </span>
                <span className="text-[10px] font-mono text-slate-400">{new Date(blog.publishedAt).toLocaleDateString()}</span>
              </div>
              <h4 className="text-base font-bold text-white leading-snug">{blog.title}</h4>
              <p className="text-xs text-slate-300 line-clamp-2">{blog.excerpt}</p>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-white/5">
              <button onClick={() => handleOpenEdit(blog)} className="p-2 rounded-lg text-accent-cyan hover:bg-white/5">
                <Edit3 className="w-4 h-4" />
              </button>
              <button onClick={() => deleteBlog(blog.id)} className="p-2 rounded-lg text-rose-400 hover:bg-white/5">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="glass-panel max-w-2xl w-full rounded-3xl p-8 border border-white/15 space-y-6 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <h3 className="text-lg font-bold text-white">{editingBlog ? 'Edit Blog Post' : 'Compose Blog Post'}</h3>
                <button onClick={() => setModalOpen(false)}><X className="w-5 h-5 text-slate-400" /></button>
              </div>

              {uploadError && (
                <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>{uploadError}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">POST TITLE *</label>
                    <input type="text" required value={formData.title || ''} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-2.5 bg-[#050816] border border-white/10 rounded-xl text-white text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">URL SLUG (e.g. react-19-guide) *</label>
                    <input type="text" required value={formData.slug || ''} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} className="w-full px-4 py-2.5 bg-[#050816] border border-white/10 rounded-xl text-white text-sm" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-2">COVER IMAGE</label>
                    <div className="flex gap-4 items-center">
                      <div className="flex-1">
                        <input type="text" value={formData.coverImage || ''} onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })} className="w-full px-3 py-1.5 bg-[#050816] border border-white/10 rounded-xl text-white text-xs mb-2" />
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="block w-full text-xs text-slate-400 file:mr-4 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:bg-accent-purple/20 file:text-accent-violet file:cursor-pointer" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">STATUS</label>
                    <select
                      value={formData.status || 'published'}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as BlogItem['status'] })}
                      className="w-full px-4 py-2.5 bg-[#050816] border border-white/10 rounded-xl text-white text-sm"
                    >
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">EXCERPT (SHORT SUMMARY) *</label>
                  <textarea rows={2} required value={formData.excerpt || ''} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} className="w-full px-4 py-2.5 bg-[#050816] border border-white/10 rounded-xl text-white text-sm" />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">CONTENT (MARKDOWN OR TEXT) *</label>
                  <textarea rows={6} required value={formData.content || ''} onChange={(e) => setFormData({ ...formData, content: e.target.value })} className="w-full px-4 py-2.5 bg-[#050816] border border-white/10 rounded-xl text-white text-sm font-mono" />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">TAGS (COMMA SEPARATED)</label>
                  <input type="text" value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} placeholder="React, Coding, Web Development" className="w-full px-4 py-2.5 bg-[#050816] border border-white/10 rounded-xl text-white text-sm" />
                </div>

                <div className="pt-4 flex justify-end gap-3">
                  <button type="button" onClick={() => setModalOpen(false)} className="px-5 py-2.5 bg-white/5 rounded-xl text-slate-300 text-xs">Cancel</button>
                  <button type="submit" className="px-6 py-2.5 bg-gradient-to-r from-accent-blue to-accent-purple text-white text-xs font-bold rounded-xl shadow-glow-purple">Publish Post</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
