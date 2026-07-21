import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Plus, Trash2, Edit3, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Skill } from '../../types';
import { soundFX } from '../../utils/soundFX';

export const TechStackManager: React.FC = () => {
  const { skills, addSkill, updateSkill, deleteSkill } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);

  const [formData, setFormData] = useState<Partial<Skill>>({
    name: '',
    level: 90,
    category: 'Frontend',
    icon: 'Code2',
    color: '#06B6D4',
    description: ''
  });

  const handleOpenAdd = () => {
    soundFX.playClick();
    setEditingSkill(null);
    setFormData({
      name: '',
      level: 90,
      category: 'Frontend',
      icon: 'Code2',
      color: '#06B6D4',
      description: ''
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (skill: Skill) => {
    soundFX.playClick();
    setEditingSkill(skill);
    setFormData({ ...skill });
    setModalOpen(true);
  };

  const handleLevelSlider = (skill: Skill, newLevel: number) => {
    updateSkill({ ...skill, level: newLevel });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFX.playClick();

    const payload: Skill = {
      id: editingSkill ? editingSkill.id : `skill-${Date.now()}`,
      name: formData.name || 'New Skill',
      level: Number(formData.level) || 85,
      category: (formData.category as Skill['category']) || 'Frontend',
      icon: formData.icon || 'Code2',
      color: formData.color || '#3b82f6',
      description: formData.description || ''
    };

    if (editingSkill) {
      updateSkill(payload);
    } else {
      addSkill(payload);
    }

    soundFX.playSwoosh();
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-card rounded-3xl p-6 border border-white/10">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-accent-cyan" />
            <span>Tech Stack & Skill Manager</span>
          </h3>
          <p className="text-xs text-slate-400">Add, update, or remove skills and adjust proficiency percentages live.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          onMouseEnter={() => soundFX.playHover()}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink text-white font-bold text-xs shadow-glow-purple cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Skill</span>
        </button>
      </div>

      {/* Grid of Sliders & Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skills.map((skill) => (
          <div key={skill.id || skill.name} className="glass-card rounded-2xl p-5 border border-white/10 space-y-3 relative group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: skill.color || '#3b82f6' }} />
                <span className="font-bold text-white text-sm">{skill.name}</span>
                <span className="text-[10px] font-mono text-slate-400">({skill.category})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-accent-cyan bg-white/5 px-2.5 py-1 rounded-lg">
                  {skill.level}%
                </span>
                <button onClick={() => handleOpenEdit(skill)} className="p-1 rounded-lg text-slate-400 hover:text-white">
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => deleteSkill(skill.id)} className="p-1 rounded-lg text-rose-400 hover:bg-white/5">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <input
              type="range"
              min={10}
              max={100}
              value={skill.level}
              onChange={(e) => handleLevelSlider(skill, parseInt(e.target.value))}
              className="w-full accent-accent-purple cursor-pointer"
            />
            <p className="text-[11px] text-slate-400 leading-normal">{skill.description}</p>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="glass-panel max-w-md w-full rounded-3xl p-6 border border-white/15 space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-white/10">
                <h3 className="text-base font-bold text-white">{editingSkill ? 'Edit Skill' : 'Add New Skill'}</h3>
                <button onClick={() => setModalOpen(false)}><X className="w-4 h-4 text-slate-400" /></button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">SKILL NAME *</label>
                  <input type="text" required value={formData.name || ''} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-3 py-2 bg-[#050816] border border-white/10 rounded-xl text-white text-xs" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">CATEGORY</label>
                    <select
                      value={formData.category || 'Frontend'}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as Skill['category'] })}
                      className="w-full px-3 py-2 bg-[#050816] border border-white/10 rounded-xl text-white text-xs"
                    >
                      <option value="Frontend">Frontend</option>
                      <option value="Backend">Backend</option>
                      <option value="AI & ML">AI & ML</option>
                      <option value="Cloud & DevOps">Cloud & DevOps</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">PROFICIENCY %</label>
                    <input type="number" min={10} max={100} value={formData.level || 90} onChange={(e) => setFormData({ ...formData, level: Number(e.target.value) })} className="w-full px-3 py-2 bg-[#050816] border border-white/10 rounded-xl text-white text-xs" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">ACCENT COLOR (HEX)</label>
                  <input type="text" value={formData.color || '#06B6D4'} onChange={(e) => setFormData({ ...formData, color: e.target.value })} className="w-full px-3 py-2 bg-[#050816] border border-white/10 rounded-xl text-white text-xs" />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">DESCRIPTION</label>
                  <textarea rows={3} value={formData.description || ''} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-3 py-2 bg-[#050816] border border-white/10 rounded-xl text-white text-xs" />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 bg-white/5 text-xs rounded-xl">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-accent-blue text-white text-xs rounded-xl font-bold">Save Skill</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
