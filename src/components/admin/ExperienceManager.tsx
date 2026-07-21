import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Plus, Trash2, Edit3, Save, X, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ExperienceItem } from '../../types';
import { soundFX } from '../../utils/soundFX';

export const ExperienceManager: React.FC = () => {
  const { experiences, addExperience, updateExperience, deleteExperience } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState<ExperienceItem | null>(null);

  const [formData, setFormData] = useState<Partial<ExperienceItem>>({
    role: '',
    company: '',
    period: '',
    location: '',
    description: '',
    highlights: [],
    techStack: [],
    logo: '💼'
  });

  const [highlightsInput, setHighlightsInput] = useState('');
  const [techStackInput, setTechStackInput] = useState('');

  const handleOpenAdd = () => {
    soundFX.playClick();
    setEditingExp(null);
    setFormData({
      role: '',
      company: '',
      period: '',
      location: 'San Francisco, CA',
      description: '',
      highlights: [],
      techStack: [],
      logo: '💼'
    });
    setHighlightsInput('');
    setTechStackInput('');
    setModalOpen(true);
  };

  const handleOpenEdit = (exp: ExperienceItem) => {
    soundFX.playClick();
    setEditingExp(exp);
    setFormData({ ...exp });
    setHighlightsInput((exp.highlights || []).join('\n'));
    setTechStackInput((exp.techStack || []).join(', '));
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this experience entry?')) {
      soundFX.playClick();
      deleteExperience(id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFX.playClick();

    const highlights = highlightsInput
      .split('\n')
      .map((h) => h.trim())
      .filter((h) => h.length > 0);

    const techStack = techStackInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const payload: ExperienceItem = {
      id: editingExp ? editingExp.id : `exp-${Date.now()}`,
      role: formData.role || 'Senior Software Engineer',
      company: formData.company || 'Tech Enterprise',
      period: formData.period || '2023 - Present',
      location: formData.location || 'Remote',
      description: formData.description || '',
      highlights,
      techStack,
      logo: formData.logo || '💼'
    };

    if (editingExp) {
      updateExperience(payload);
    } else {
      addExperience(payload);
    }

    soundFX.playSwoosh();
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-card rounded-3xl p-6 border border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-accent-cyan/20 border border-accent-cyan/40 flex items-center justify-center text-accent-cyan shadow-glow-blue">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Experience & Work History Manager</h3>
            <p className="text-xs text-slate-400">
              Add, edit, or remove professional work history, roles, key achievements, and technologies.
            </p>
          </div>
        </div>

        <button
          onClick={handleOpenAdd}
          onMouseEnter={() => soundFX.playHover()}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple text-white text-xs font-bold shadow-glow-purple cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Position</span>
        </button>
      </div>

      {/* Experience List */}
      <div className="space-y-4">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="glass-card rounded-2xl p-6 border border-white/10 flex flex-col md:flex-row items-start justify-between gap-6 hover:border-accent-purple/40 transition-all"
          >
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xl">{exp.logo || '💼'}</span>
                <h4 className="text-lg font-bold text-white">{exp.role}</h4>
                <span className="text-xs font-semibold text-accent-violet">@ {exp.company}</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                <span className="text-accent-cyan">{exp.period}</span>
                <span>•</span>
                <span>{exp.location}</span>
              </div>
              <p className="text-xs text-slate-300">{exp.description}</p>
              
              {exp.highlights && exp.highlights.length > 0 && (
                <div className="pt-2 space-y-1">
                  {exp.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-400">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleOpenEdit(exp)}
                className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-accent-cyan text-accent-cyan cursor-pointer"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(exp.id)}
                className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/30 hover:bg-rose-500/20 text-rose-400 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass-panel max-w-2xl w-full rounded-3xl p-8 border border-white/15 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="text-lg font-bold text-white">
                  {editingExp ? 'Edit Position Entry' : 'Add New Position'}
                </h3>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">JOB TITLE / ROLE *</label>
                    <input
                      type="text"
                      required
                      value={formData.role || ''}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#050816] border border-white/10 text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">COMPANY *</label>
                    <input
                      type="text"
                      required
                      value={formData.company || ''}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#050816] border border-white/10 text-white text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">PERIOD (e.g. 2022 - 2024)</label>
                    <input
                      type="text"
                      value={formData.period || ''}
                      onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#050816] border border-white/10 text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">LOCATION</label>
                    <input
                      type="text"
                      value={formData.location || ''}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#050816] border border-white/10 text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">EMOJI / ICON</label>
                    <input
                      type="text"
                      value={formData.logo || ''}
                      onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#050816] border border-white/10 text-white text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">DESCRIPTION</label>
                  <textarea
                    rows={3}
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#050816] border border-white/10 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">KEY ACHIEVEMENTS (ONE PER LINE)</label>
                  <textarea
                    rows={3}
                    value={highlightsInput}
                    onChange={(e) => setHighlightsInput(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#050816] border border-white/10 text-white text-sm font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">TECH STACK (COMMA SEPARATED)</label>
                  <input
                    type="text"
                    value={techStackInput}
                    onChange={(e) => setTechStackInput(e.target.value)}
                    placeholder="React, TypeScript, Node.js, AWS"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#050816] border border-white/10 text-white text-sm"
                  />
                </div>

                <div className="pt-4 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl bg-white/5 text-slate-300 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple text-white text-xs font-bold shadow-glow-purple"
                  >
                    Save Entry
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
