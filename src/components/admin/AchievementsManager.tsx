import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Plus, Trash2, Edit3, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AchievementItem } from '../../types';
import { soundFX } from '../../utils/soundFX';

export const AchievementsManager: React.FC = () => {
  const { achievements, addAchievement, updateAchievement, deleteAchievement } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAch, setEditingAch] = useState<AchievementItem | null>(null);
  const [formData, setFormData] = useState<Partial<AchievementItem>>({});

  const handleOpenAdd = () => {
    soundFX.playClick();
    setEditingAch(null);
    setFormData({
      title: '',
      organization: 'Hackathon Org',
      date: '2024',
      description: '',
      metric: '1st Place',
      icon: 'Trophy'
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (ach: AchievementItem) => {
    soundFX.playClick();
    setEditingAch(ach);
    setFormData({ ...ach });
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFX.playClick();

    const payload: AchievementItem = {
      id: editingAch ? editingAch.id : `ach-${Date.now()}`,
      title: formData.title || '1st Place Winner',
      organization: formData.organization || 'Global Hackathon',
      date: formData.date || '2024',
      description: formData.description || '',
      metric: formData.metric || 'Winner',
      icon: formData.icon || 'Trophy'
    };

    if (editingAch) {
      updateAchievement(payload);
    } else {
      addAchievement(payload);
    }

    soundFX.playSwoosh();
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-3xl p-6 border border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-accent-pink/20 border border-accent-pink/40 flex items-center justify-center text-accent-pink shadow-glow-pink">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Achievements & Awards Manager</h3>
            <p className="text-xs text-slate-400">Manage hackathon victories, honors, open source recognitions, and metrics.</p>
          </div>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-accent-pink to-accent-violet text-white text-xs font-bold shadow-glow-pink cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Achievement</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievements.map((ach) => (
          <div key={ach.id} className="glass-card rounded-2xl p-6 border border-white/10 flex justify-between gap-4 hover:border-accent-pink/40 transition-all">
            <div className="space-y-2">
              <span className="text-[11px] font-mono text-accent-cyan">{ach.organization} • {ach.date}</span>
              <h4 className="text-lg font-bold text-white">{ach.title}</h4>
              <p className="text-xs text-slate-300">{ach.description}</p>
              {ach.metric && (
                <div className="inline-block px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
                  {ach.metric}
                </div>
              )}
            </div>

            <div className="flex items-center gap-1.5">
              <button onClick={() => handleOpenEdit(ach)} className="p-2 rounded-lg text-accent-cyan hover:bg-white/5">
                <Edit3 className="w-4 h-4" />
              </button>
              <button onClick={() => deleteAchievement(ach.id)} className="p-2 rounded-lg text-rose-400 hover:bg-white/5">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="glass-panel max-w-md w-full rounded-3xl p-6 border border-white/15 space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-white/10">
                <h3 className="text-base font-bold text-white">{editingAch ? 'Edit Achievement' : 'Add Achievement'}</h3>
                <button onClick={() => setModalOpen(false)}><X className="w-4 h-4 text-slate-400" /></button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">ACHIEVEMENT TITLE *</label>
                  <input type="text" required value={formData.title || ''} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-3 py-2 bg-[#050816] border border-white/10 rounded-xl text-white text-xs" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">ORGANIZATION</label>
                    <input type="text" value={formData.organization || ''} onChange={(e) => setFormData({ ...formData, organization: e.target.value })} className="w-full px-3 py-2 bg-[#050816] border border-white/10 rounded-xl text-white text-xs" />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">DATE / YEAR</label>
                    <input type="text" value={formData.date || ''} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="w-full px-3 py-2 bg-[#050816] border border-white/10 rounded-xl text-white text-xs" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">METRIC / HIGHLIGHT BADGE</label>
                  <input type="text" value={formData.metric || ''} onChange={(e) => setFormData({ ...formData, metric: e.target.value })} placeholder="e.g. 1st Place / 10k+ Stars" className="w-full px-3 py-2 bg-[#050816] border border-white/10 rounded-xl text-white text-xs" />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">DESCRIPTION</label>
                  <textarea rows={3} value={formData.description || ''} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-3 py-2 bg-[#050816] border border-white/10 rounded-xl text-white text-xs" />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 bg-white/5 text-xs rounded-xl">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-accent-pink text-white text-xs rounded-xl font-bold">Save</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
