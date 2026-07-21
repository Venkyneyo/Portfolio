import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, MapPin, Globe, Sparkles, Save, CheckCircle2, Image, FileText } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { soundFX } from '../../utils/soundFX';

export const ProfileEditor: React.FC = () => {
  const { profile, updateProfile } = useApp();
  const [formData, setFormData] = useState({ ...profile });
  const [rolesInput, setRolesInput] = useState((profile.roles || []).join('\n'));
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFX.playClick();

    const updatedRoles = rolesInput
      .split('\n')
      .map((r) => r.trim())
      .filter((r) => r.length > 0);

    updateProfile({
      ...formData,
      roles: updatedRoles
    });

    setSavedSuccess(true);
    soundFX.playSwoosh();
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-card rounded-3xl p-6 border border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-accent-blue/20 border border-accent-blue/40 flex items-center justify-center text-accent-cyan shadow-glow-blue">
            <User className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Profile & Identity Manager</h3>
            <p className="text-xs text-slate-400">
              Update personal info, headline, kinetic roles, bio, image URL, resume, and social links in real time.
            </p>
          </div>
        </div>

        {savedSuccess && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-semibold"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Profile Saved & Live!</span>
          </motion.div>
        )}
      </div>

      {/* Editor Form */}
      <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-8 border border-white/10 space-y-8">
        
        {/* Section 1: Basic Identity */}
        <div>
          <h4 className="text-sm font-bold text-accent-cyan uppercase tracking-wider mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> Identity & Title
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-2">FULL NAME *</label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#050816] border border-white/10 text-white text-sm focus:outline-none focus:border-accent-cyan"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-2">BRAND NAME / HEADER LOGO *</label>
              <input
                type="text"
                required
                value={formData.brandName}
                onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#050816] border border-white/10 text-white text-sm focus:outline-none focus:border-accent-cyan"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-2">PRIMARY ROLE TITLE *</label>
              <input
                type="text"
                required
                value={formData.roleTitle}
                onChange={(e) => setFormData({ ...formData, roleTitle: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#050816] border border-white/10 text-white text-sm focus:outline-none focus:border-accent-cyan"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Headlines & Kinetic Roles */}
        <div className="pt-6 border-t border-white/10">
          <h4 className="text-sm font-bold text-accent-purple uppercase tracking-wider mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> Hero Headlines & Rotating Roles
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-2">HEADLINE PREFIX 1</label>
              <input
                type="text"
                value={formData.heroHeadline1}
                onChange={(e) => setFormData({ ...formData, heroHeadline1: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#050816] border border-white/10 text-white text-sm focus:outline-none focus:border-accent-purple"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-2">GRADIENT HEADLINE 1</label>
              <input
                type="text"
                value={formData.heroHeadlineGradient1}
                onChange={(e) => setFormData({ ...formData, heroHeadlineGradient1: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#050816] border border-white/10 text-white text-sm focus:outline-none focus:border-accent-purple"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-2">HEADLINE ENDING 2</label>
              <input
                type="text"
                value={formData.heroHeadline2}
                onChange={(e) => setFormData({ ...formData, heroHeadline2: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#050816] border border-white/10 text-white text-sm focus:outline-none focus:border-accent-purple"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-2">ROTATING KINETIC ROLES (ONE PER LINE)</label>
            <textarea
              rows={4}
              value={rolesInput}
              onChange={(e) => setRolesInput(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#050816] border border-white/10 text-white text-sm font-mono focus:outline-none focus:border-accent-purple"
            />
          </div>
        </div>

        {/* Section 3: Bio & Profile Image */}
        <div className="pt-6 border-t border-white/10">
          <h4 className="text-sm font-bold text-accent-pink uppercase tracking-wider mb-4 flex items-center gap-2">
            <Image className="w-4 h-4" /> Bio & Media Assets
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-2">PROFILE IMAGE URL</label>
              <input
                type="text"
                value={formData.profileImage}
                onChange={(e) => setFormData({ ...formData, profileImage: e.target.value })}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-4 py-3 rounded-xl bg-[#050816] border border-white/10 text-white text-sm focus:outline-none focus:border-accent-pink"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-2">RESUME / CV DOCUMENT URL</label>
              <input
                type="text"
                value={formData.resumeUrl}
                onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
                placeholder="https://example.com/resume.pdf"
                className="w-full px-4 py-3 rounded-xl bg-[#050816] border border-white/10 text-white text-sm focus:outline-none focus:border-accent-pink"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-2">HERO BIO SUBTEXT</label>
              <textarea
                rows={3}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#050816] border border-white/10 text-white text-sm focus:outline-none focus:border-accent-pink"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-2">ABOUT PHILOSOPHY TEXT</label>
              <textarea
                rows={3}
                value={formData.aboutText}
                onChange={(e) => setFormData({ ...formData, aboutText: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#050816] border border-white/10 text-white text-sm focus:outline-none focus:border-accent-pink"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Contact & Social URLs */}
        <div className="pt-6 border-t border-white/10">
          <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Globe className="w-4 h-4" /> Contact & Social Networks
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-2">EMAIL ADDRESS</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#050816] border border-white/10 text-white text-sm focus:outline-none focus:border-emerald-400"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-2">LOCATION</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#050816] border border-white/10 text-white text-sm focus:outline-none focus:border-emerald-400"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-2">AVAILABILITY BADGE</label>
              <input
                type="text"
                value={formData.availability}
                onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#050816] border border-white/10 text-white text-sm focus:outline-none focus:border-emerald-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-2">GITHUB URL</label>
              <input
                type="text"
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#050816] border border-white/10 text-white text-sm focus:outline-none focus:border-emerald-400"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-2">LINKEDIN URL</label>
              <input
                type="text"
                value={formData.linkedinUrl}
                onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#050816] border border-white/10 text-white text-sm focus:outline-none focus:border-emerald-400"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-2">TWITTER / X URL</label>
              <input
                type="text"
                value={formData.twitterUrl}
                onChange={(e) => setFormData({ ...formData, twitterUrl: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#050816] border border-white/10 text-white text-sm focus:outline-none focus:border-emerald-400"
              />
            </div>
          </div>
        </div>

        {/* Section 5: Key Metrics & Stats */}
        <div className="pt-6 border-t border-white/10">
          <h4 className="text-sm font-bold text-accent-cyan uppercase tracking-wider mb-4 flex items-center gap-2">
            <FileText className="w-4 h-4" /> Hero Highlight Metrics
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-2">YEARS EXPERIENCE</label>
              <input
                type="number"
                value={formData.yearsExperience}
                onChange={(e) => setFormData({ ...formData, yearsExperience: Number(e.target.value) })}
                className="w-full px-4 py-3 rounded-xl bg-[#050816] border border-white/10 text-white text-sm focus:outline-none focus:border-accent-cyan"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-2">SHIPPED PROJECTS</label>
              <input
                type="number"
                value={formData.shippedProjects}
                onChange={(e) => setFormData({ ...formData, shippedProjects: Number(e.target.value) })}
                className="w-full px-4 py-3 rounded-xl bg-[#050816] border border-white/10 text-white text-sm focus:outline-none focus:border-accent-cyan"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-2">UPTIME %</label>
              <input
                type="number"
                step="0.1"
                value={formData.uptimePercentage}
                onChange={(e) => setFormData({ ...formData, uptimePercentage: Number(e.target.value) })}
                className="w-full px-4 py-3 rounded-xl bg-[#050816] border border-white/10 text-white text-sm focus:outline-none focus:border-accent-cyan"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-2">ACTIVE USERS</label>
              <input
                type="text"
                value={formData.activeUsers}
                onChange={(e) => setFormData({ ...formData, activeUsers: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#050816] border border-white/10 text-white text-sm focus:outline-none focus:border-accent-cyan"
              />
            </div>
          </div>
        </div>

        {/* Submit Action Button */}
        <div className="pt-6 border-t border-white/10 flex justify-end">
          <button
            type="submit"
            onMouseEnter={() => soundFX.playHover()}
            className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink text-white font-bold text-sm shadow-glow-purple hover:opacity-95 transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile Settings</span>
          </button>
        </div>

      </form>
    </div>
  );
};
