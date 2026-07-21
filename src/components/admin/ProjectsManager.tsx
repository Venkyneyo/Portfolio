import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Edit3, Star, ExternalLink, Sparkles, X, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Project, ProjectCategory } from '../../types';
import { soundFX } from '../../utils/soundFX';

export const ProjectsManager: React.FC = () => {
  const { projects, addProject, updateProject, deleteProject } = useApp();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newCategory, setNewCategory] = useState<ProjectCategory>('Full-Stack SaaS');
  const [newDesc, setNewDesc] = useState('');
  const [newCover, setNewCover] = useState('');
  const [newTags, setNewTags] = useState('');
  const [newLive, setNewLive] = useState('');
  const [newGithub, setNewGithub] = useState('');

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    soundFX.playClick();

    const created: Project = {
      id: `proj-${Date.now()}`,
      title: newTitle || 'New SaaS Application',
      subtitle: newSubtitle || 'Enterprise Cloud & AI Service',
      description: newDesc || 'High-performance cloud application built with modern architecture.',
      longDescription: newDesc || 'Comprehensive SaaS solution with real-time telemetry, scalable microservices, and sleek UI.',
      category: newCategory,
      coverImage: newCover || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      images: [
        newCover || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'
      ],
      tags: newTags ? newTags.split(',').map((t) => t.trim()) : ['React', 'TypeScript', 'Node.js', 'TailwindCSS'],
      stats: {
        performance: 99,
        seo: 100,
        bestPractices: 98,
        accessibility: 100,
      },
      features: ['Real-time telemetry engine', 'Sub-millisecond API responses', 'Automated CI/CD pipeline'],
      architectureDiagram: {
        nodes: [
          { id: '1', label: 'Web Client', subtext: 'React + Vite', type: 'client' },
          { id: '2', label: 'API Gateway', subtext: 'Node / Go Server', type: 'api' },
        ],
        connections: [{ from: '1', to: '2', label: 'HTTPS' }],
      },
      databaseDiagram: {
        tables: [{ name: 'records', columns: ['id (UUID)', 'payload (JSONB)'] }],
      },
      workflowDiagram: {
        steps: [{ step: 1, title: 'Input Ingestion', description: 'Process payload via Edge Gateway.' }],
      },
      liveUrl: newLive || 'https://demo.vercel.app',
      githubUrl: newGithub || 'https://github.com/developer/repo',
      featured: true,
    };

    addProject(created);
    setIsAddModalOpen(false);
    setNewTitle('');
    setNewSubtitle('');
    setNewDesc('');
    setNewCover('');
    setNewTags('');
    setNewLive('');
    setNewGithub('');
    soundFX.playSwoosh();
  };

  const toggleFeatured = (project: Project) => {
    soundFX.playClick();
    updateProject({ ...project, featured: !project.featured });
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header & Add Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-card rounded-3xl p-6 border border-white/10">
        <div>
          <h3 className="text-lg font-bold text-white">Manage Portfolio Projects</h3>
          <p className="text-xs text-slate-400">Add, edit, toggle featured badges, or remove portfolio apps in real-time.</p>
        </div>
        <button
          onClick={() => {
            soundFX.playClick();
            setIsAddModalOpen(true);
          }}
          onMouseEnter={() => soundFX.playHover()}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple text-white font-bold text-xs shadow-glow-purple transition-all hover:scale-105 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Projects Table */}
      <div className="glass-card rounded-3xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/5 font-mono text-xs text-slate-400">
                <th className="py-4 px-6">Project Title & Category</th>
                <th className="py-4 px-6">Tags & Tech Stack</th>
                <th className="py-4 px-6">Lighthouse Score</th>
                <th className="py-4 px-6">Featured</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs text-slate-300">
              {projects.map((proj) => (
                <tr key={proj.id} className="hover:bg-white/5 transition-colors">
                  
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img src={proj.coverImage} alt={proj.title} className="w-12 h-12 rounded-xl object-cover border border-white/10" />
                      <div>
                        <div className="font-bold text-white text-sm">{proj.title}</div>
                        <span className="text-[10px] font-mono text-accent-cyan">{proj.category}</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-6">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {proj.tags.slice(0, 3).map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[10px]">
                          {t}
                        </span>
                      ))}
                      {proj.tags.length > 3 && (
                        <span className="px-1.5 py-0.5 rounded bg-white/5 font-mono text-[10px]">+{proj.tags.length - 3}</span>
                      )}
                    </div>
                  </td>

                  <td className="py-4 px-6">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-400 font-mono font-bold">
                      {proj.stats.performance}% Perf
                    </span>
                  </td>

                  <td className="py-4 px-6">
                    <button
                      onClick={() => toggleFeatured(proj)}
                      className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                        proj.featured ? 'bg-amber-400/20 border-amber-400/50 text-amber-300' : 'bg-white/5 border-white/10 text-slate-500'
                      }`}
                    >
                      <Star className="w-4 h-4 fill-current" />
                    </button>
                  </td>

                  <td className="py-4 px-6 text-right space-x-2">
                    <button
                      onClick={() => {
                        soundFX.playClick();
                        deleteProject(proj.id);
                      }}
                      className="p-2 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-400 hover:bg-rose-500 hover:text-white transition-all cursor-pointer"
                      title="Delete Project"
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

      {/* Add Project Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-xl glass-panel rounded-3xl p-6 border border-white/20 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent-cyan" />
                <span>Add Portfolio SaaS Project</span>
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-mono">PROJECT TITLE *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Apex Analytics Engine"
                  className="w-full px-3 py-2 rounded-xl bg-[#050816] border border-white/10 text-white focus:outline-none focus:border-accent-cyan"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 mb-1 font-mono">SUBTITLE</label>
                  <input
                    type="text"
                    value={newSubtitle}
                    onChange={(e) => setNewSubtitle(e.target.value)}
                    placeholder="Real-time Stream Engine"
                    className="w-full px-3 py-2 rounded-xl bg-[#050816] border border-white/10 text-white focus:outline-none focus:border-accent-cyan"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-mono">CATEGORY *</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as ProjectCategory)}
                    className="w-full px-3 py-2 rounded-xl bg-[#050816] border border-white/10 text-white focus:outline-none focus:border-accent-cyan"
                  >
                    <option value="Full-Stack SaaS">Full-Stack SaaS</option>
                    <option value="AI Platforms">AI Platforms</option>
                    <option value="Cloud Architecture">Cloud Architecture</option>
                    <option value="Mobile & Web3">Mobile & Web3</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-mono">DESCRIPTION</label>
                <textarea
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Short description of the project..."
                  className="w-full px-3 py-2 rounded-xl bg-[#050816] border border-white/10 text-white focus:outline-none focus:border-accent-cyan resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-mono">COVER IMAGE URL</label>
                <input
                  type="text"
                  value={newCover}
                  onChange={(e) => setNewCover(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full px-3 py-2 rounded-xl bg-[#050816] border border-white/10 text-white focus:outline-none focus:border-accent-cyan"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-mono">TAGS (COMMA SEPARATED)</label>
                <input
                  type="text"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  placeholder="React, TypeScript, Node.js, Redis"
                  className="w-full px-3 py-2 rounded-xl bg-[#050816] border border-white/10 text-white focus:outline-none focus:border-accent-cyan"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-accent-blue to-accent-pink text-white font-bold"
                >
                  Publish Project
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

    </div>
  );
};
