import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit3, Star, ExternalLink, Sparkles, X, Upload, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Project, ProjectCategory } from '../../types';
import { soundFX } from '../../utils/soundFX';
import { uploadService } from '../../utils/uploadService';
import { supabase } from '../../utils/supabaseClient';

export const ProjectsManager: React.FC = () => {
  const { projects, addProject, updateProject, deleteProject } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProj, setEditingProj] = useState<Project | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    subtitle: '',
    category: 'Full-Stack SaaS',
    description: '',
    longDescription: '',
    coverImage: '',
    images: [],
    demoVideo: '',
    liveUrl: '',
    githubUrl: '',
    featured: false,
    tags: []
  });

  const [tagsInput, setTagsInput] = useState('');
  const [screenshotsInput, setScreenshotsInput] = useState('');
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleOpenAdd = () => {
    soundFX.playClick();
    setEditingProj(null);
    setFormData({
      title: '',
      subtitle: '',
      category: 'Full-Stack SaaS',
      description: '',
      longDescription: '',
      coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      images: [],
      demoVideo: '',
      liveUrl: 'https://demo.vercel.app',
      githubUrl: 'https://github.com',
      featured: false,
      tags: []
    });
    setTagsInput('');
    setScreenshotsInput('');
    setUploadError(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (proj: Project) => {
    soundFX.playClick();
    setEditingProj(proj);
    setFormData({ ...proj });
    setTagsInput((proj.tags || []).join(', '));
    setScreenshotsInput((proj.images || []).join('\n'));
    setUploadError(null);
    setModalOpen(true);
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!supabase) {
      setUploadError('Database client not configured. Cloud upload is offline.');
      return;
    }

    soundFX.playClick();
    setUploadingCover(true);
    setUploadError(null);

    try {
      const publicUrl = await uploadService.uploadFile(file, 'projects/covers');
      setFormData((prev) => ({ ...prev, coverImage: publicUrl }));
      soundFX.playSwoosh();
    } catch (err: any) {
      setUploadError(err.message || 'Cover upload failed.');
    } finally {
      setUploadingCover(false);
    }
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!supabase) {
      setUploadError('Database client not configured. Cloud upload is offline.');
      return;
    }

    soundFX.playClick();
    setUploadingVideo(true);
    setUploadError(null);

    try {
      const publicUrl = await uploadService.uploadFile(file, 'projects/videos');
      setFormData((prev) => ({ ...prev, demoVideo: publicUrl }));
      soundFX.playSwoosh();
    } catch (err: any) {
      setUploadError(err.message || 'Video upload failed.');
    } finally {
      setUploadingVideo(false);
    }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (!supabase) {
      setUploadError('Database client not configured. Cloud upload is offline.');
      return;
    }

    soundFX.playClick();
    setUploadingGallery(true);
    setUploadError(null);

    try {
      const uploadedUrls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const url = await uploadService.uploadFile(files[i], 'projects/gallery');
        uploadedUrls.push(url);
      }
      const existingImages = formData.images || [];
      const updatedImages = [...existingImages, ...uploadedUrls];
      setFormData((prev) => ({ ...prev, images: updatedImages }));
      setScreenshotsInput(updatedImages.join('\n'));
      soundFX.playSwoosh();
    } catch (err: any) {
      setUploadError(err.message || 'Gallery upload failed.');
    } finally {
      setUploadingGallery(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    soundFX.playClick();

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const images = screenshotsInput
      .split('\n')
      .map((img) => img.trim())
      .filter((img) => img.length > 0);

    const payload: Project = {
      id: editingProj ? editingProj.id : `proj-${Date.now()}`,
      title: formData.title || 'Untitled App',
      subtitle: formData.subtitle || '',
      category: (formData.category as ProjectCategory) || 'Full-Stack SaaS',
      description: formData.description || '',
      longDescription: formData.longDescription || formData.description || '',
      coverImage: formData.coverImage || '',
      images: images.length > 0 ? images : [formData.coverImage || ''],
      demoVideo: formData.demoVideo || '',
      liveUrl: formData.liveUrl || '',
      githubUrl: formData.githubUrl || '',
      featured: !!formData.featured,
      tags,
      stats: formData.stats || { performance: 99, seo: 100, bestPractices: 98, accessibility: 100 },
      features: formData.features || ['Dynamic state', 'Clean layout', 'Zero latency integration'],
      architectureDiagram: formData.architectureDiagram || { nodes: [], connections: [] },
      databaseDiagram: formData.databaseDiagram || { tables: [] },
      workflowDiagram: formData.workflowDiagram || { steps: [] }
    };

    if (editingProj) {
      await updateProject(payload);
    } else {
      await addProject(payload);
    }

    soundFX.playSwoosh();
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-card rounded-3xl p-6 border border-white/10">
        <div>
          <h3 className="text-lg font-bold text-white">Manage Portfolio Projects</h3>
          <p className="text-xs text-slate-400">Add, edit, delete, and manage cloud assets for your showcase applications.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple text-white font-bold text-xs shadow-glow-purple cursor-pointer animate-pulse"
        >
          <Plus className="w-4 h-4" />
          <span>Add SaaS Project</span>
        </button>
      </div>

      {/* Projects Table */}
      <div className="glass-card rounded-3xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/5 font-mono text-xs text-slate-400">
                <th className="py-4 px-6">Project Title & Category</th>
                <th className="py-4 px-6">Live & GitHub Links</th>
                <th className="py-4 px-6">Featured</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs text-slate-300">
              {projects.map((proj) => (
                <tr key={proj.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      {proj.coverImage && (
                        <img src={proj.coverImage} alt={proj.title} className="w-12 h-12 rounded-xl object-cover border border-white/10" />
                      )}
                      <div>
                        <div className="font-bold text-white text-sm">{proj.title}</div>
                        <span className="text-[10px] font-mono text-accent-cyan">{proj.category}</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-6 space-y-1">
                    {proj.liveUrl && (
                      <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-accent-cyan hover:underline">
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live Site</span>
                      </a>
                    )}
                    {proj.githubUrl && (
                      <span className="text-[10px] text-slate-400 font-mono truncate max-w-[150px] block">
                        {proj.githubUrl.replace('https://', '')}
                      </span>
                    )}
                  </td>

                  <td className="py-4 px-6">
                    <button
                      onClick={() => updateProject({ ...proj, featured: !proj.featured })}
                      className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                        proj.featured ? 'bg-amber-400/20 border-amber-400/50 text-amber-300' : 'bg-white/5 border-white/10 text-slate-500'
                      }`}
                    >
                      <Star className="w-4 h-4 fill-current" />
                    </button>
                  </td>

                  <td className="py-4 px-6 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEdit(proj)}
                      className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-accent-cyan text-accent-cyan cursor-pointer"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('Delete this project?')) deleteProject(proj.id);
                      }}
                      className="p-2 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-400 hover:bg-rose-500 hover:text-white transition-all cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit / Add Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="glass-panel max-w-2xl w-full rounded-3xl p-8 border border-white/15 space-y-6 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <h3 className="text-lg font-bold text-white">{editingProj ? 'Edit Showcase Project' : 'Add Showcase Project'}</h3>
                <button onClick={() => setModalOpen(false)}><X className="w-5 h-5 text-slate-400" /></button>
              </div>

              {uploadError && (
                <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>{uploadError}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 mb-1 font-mono">PROJECT TITLE *</label>
                    <input type="text" required value={formData.title || ''} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-3 py-2 bg-[#050816] border border-white/10 rounded-xl text-white text-xs" />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1 font-mono">SUBTITLE</label>
                    <input type="text" value={formData.subtitle || ''} onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })} className="w-full px-3 py-2 bg-[#050816] border border-white/10 rounded-xl text-white text-xs" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-slate-300 mb-1 font-mono">CATEGORY *</label>
                    <select
                      value={formData.category || 'Full-Stack SaaS'}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as ProjectCategory })}
                      className="w-full px-3 py-2 bg-[#050816] border border-white/10 rounded-xl text-white text-xs"
                    >
                      <option value="Full-Stack SaaS">Full-Stack SaaS</option>
                      <option value="AI Platforms">AI Platforms</option>
                      <option value="Cloud Architecture">Cloud Architecture</option>
                      <option value="Mobile & Web3">Mobile & Web3</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1 font-mono">DEPLOYMENT / LIVE URL</label>
                    <input type="text" value={formData.liveUrl || ''} onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })} className="w-full px-3 py-2 bg-[#050816] border border-white/10 rounded-xl text-white text-xs" />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1 font-mono">GITHUB REPO URL</label>
                    <input type="text" value={formData.githubUrl || ''} onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })} className="w-full px-3 py-2 bg-[#050816] border border-white/10 rounded-xl text-white text-xs" />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-mono font-bold text-accent-cyan uppercase">Media & Upload Assets</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                    {/* Cover */}
                    <div>
                      <label className="block text-slate-400 mb-1">COVER SCREENSHOT</label>
                      <input type="text" value={formData.coverImage || ''} onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })} className="w-full px-2 py-1 bg-[#050816] border border-white/10 rounded-lg text-white text-[10px] mb-2" />
                      <input type="file" accept="image/*" onChange={handleCoverUpload} className="block w-full text-[10px] text-slate-400 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:bg-accent-blue/20 file:text-accent-cyan" />
                    </div>
                    {/* Video */}
                    <div>
                      <label className="block text-slate-400 mb-1">DEMO VIDEO</label>
                      <input type="text" value={formData.demoVideo || ''} onChange={(e) => setFormData({ ...formData, demoVideo: e.target.value })} className="w-full px-2 py-1 bg-[#050816] border border-white/10 rounded-lg text-white text-[10px] mb-2" />
                      <input type="file" accept="video/*" onChange={handleVideoUpload} className="block w-full text-[10px] text-slate-400 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:bg-accent-pink/20 file:text-accent-pink" />
                    </div>
                    {/* Multiple Gallery Upload */}
                    <div>
                      <label className="block text-slate-400 mb-1">ADD GALLERY SCREENSHOTS</label>
                      <input type="file" multiple accept="image/*" onChange={handleGalleryUpload} className="block w-full text-[10px] text-slate-400 file:mr-2 file:py-1.5 file:px-2 file:rounded file:border-0 file:bg-accent-purple/20 file:text-accent-purple cursor-pointer" />
                      <span className="text-[9px] text-slate-500 mt-2 block">({(formData.images || []).length} screenshots uploaded)</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 mb-1 font-mono">EXCERPT (SHORT DETAIL)</label>
                    <textarea rows={2} value={formData.description || ''} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-3 py-2 bg-[#050816] border border-white/10 rounded-xl text-white text-xs resize-none" />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1 font-mono">LONG DESCRIPTION</label>
                    <textarea rows={2} value={formData.longDescription || ''} onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })} className="w-full px-3 py-2 bg-[#050816] border border-white/10 rounded-xl text-white text-xs resize-none" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 mb-1 font-mono">TAGS (COMMA SEPARATED)</label>
                    <input type="text" value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} placeholder="React, Go, PostgreSQL, AWS" className="w-full px-3 py-2 bg-[#050816] border border-white/10 rounded-xl text-white text-xs" />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1 font-mono">SCREENSHOT URLS (ONE PER LINE)</label>
                    <textarea rows={2} value={screenshotsInput} onChange={(e) => setScreenshotsInput(e.target.value)} className="w-full px-3 py-2 bg-[#050816] border border-white/10 rounded-xl text-white text-xs font-mono resize-none" />
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
                  <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 bg-white/5 rounded-xl text-slate-300 hover:text-white">Cancel</button>
                  <button type="submit" className="px-5 py-2 bg-gradient-to-r from-accent-blue to-accent-purple text-white font-bold rounded-xl shadow-glow-purple">Save Showcase</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
