import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, Globe, Menu, Plus, Trash2, ArrowUp, ArrowDown, Save, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { soundFX } from '../../utils/soundFX';

interface NavigationItem {
  id: string;
  label: string;
  path: string;
  orderIndex: number;
}

export const SystemSettings: React.FC = () => {
  const { profile, updateProfile, navigationItems, saveNavigationItems } = useApp();

  // Theme Config State
  const defaultTheme = { bgColor: '#050816', accentColor: '#8b5cf6' };
  const [themeConfig, setThemeConfig] = useState(profile.theme_config || defaultTheme);
  const [bannerImage, setBannerImage] = useState(profile.banner_image || '');

  // SEO Config State
  const defaultSEO = { title: 'Developer Portfolio', description: 'My professional dynamic portfolio website' };
  const [seoMetadata, setSeoMetadata] = useState(profile.seo_metadata || defaultSEO);

  // Navigation Items State
  const [localNavItems, setLocalNavItems] = useState<NavigationItem[]>([...navigationItems]);
  const [newLinkLabel, setNewLinkLabel] = useState('');
  const [newLinkPath, setNewLinkPath] = useState('');

  const [savedSuccess, setSavedSuccess] = useState(false);

  // --- Save Theme & SEO settings ---
  const handleSaveSystem = async (e: React.FormEvent) => {
    e.preventDefault();
    soundFX.playClick();

    await updateProfile({
      theme_config: themeConfig,
      seo_metadata: seoMetadata,
      banner_image: bannerImage
    });

    setSavedSuccess(true);
    soundFX.playSwoosh();
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  // --- Navigation operations ---
  const handleAddNav = () => {
    if (!newLinkLabel || !newLinkPath) return;
    soundFX.playClick();

    const newItem: NavigationItem = {
      id: `nav-${Date.now()}`,
      label: newLinkLabel,
      path: newLinkPath,
      orderIndex: localNavItems.length
    };

    const updated = [...localNavItems, newItem];
    setLocalNavItems(updated);
    setNewLinkLabel('');
    setNewLinkPath('');
  };

  const handleRemoveNav = (id: string) => {
    soundFX.playClick();
    const updated = localNavItems.filter((item) => item.id !== id);
    setLocalNavItems(updated);
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    soundFX.playClick();
    const newItems = [...localNavItems];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newItems.length) return;

    // Swap items
    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;

    // Reassign orderIndex values
    const updated = newItems.map((item, idx) => ({ ...item, orderIndex: idx }));
    setLocalNavItems(updated);
  };

  const handleSaveNav = async () => {
    soundFX.playSwoosh();
    await saveNavigationItems(localNavItems);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Save Success Pill */}
      {savedSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2.5 max-w-md mx-auto"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>System & Navigation Customizations saved successfully!</span>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column: Theme & SEO Editor */}
        <div className="space-y-6">
          <form onSubmit={handleSaveSystem} className="glass-card rounded-3xl p-8 border border-white/10 space-y-6">
            
            {/* Theme Branding */}
            <div>
              <h4 className="text-sm font-bold text-accent-cyan uppercase tracking-wider mb-4 flex items-center gap-2">
                <Palette className="w-4 h-4" /> Theme Color Branding & Banner
              </h4>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-2">PORTFOLIO BG COLOR</label>
                  <input
                    type="color"
                    value={themeConfig.bgColor}
                    onChange={(e) => setThemeConfig({ ...themeConfig, bgColor: e.target.value })}
                    className="w-full h-11 bg-transparent border-0 cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-2">ACCENT HIGHLIGHT COLOR</label>
                  <input
                    type="color"
                    value={themeConfig.accentColor}
                    onChange={(e) => setThemeConfig({ ...themeConfig, accentColor: e.target.value })}
                    className="w-full h-11 bg-transparent border-0 cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-2">HOMEPAGE HERO BANNER URL</label>
                <input
                  type="text"
                  value={bannerImage}
                  onChange={(e) => setBannerImage(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full px-4 py-2.5 bg-[#050816] border border-white/10 rounded-xl text-white text-xs"
                />
              </div>
            </div>

            {/* SEO Settings */}
            <div className="pt-6 border-t border-white/10">
              <h4 className="text-sm font-bold text-accent-purple uppercase tracking-wider mb-4 flex items-center gap-2">
                <Globe className="w-4 h-4" /> Search Engine Optimization (SEO)
              </h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-2">GLOBAL BROWSER PAGE TITLE</label>
                  <input
                    type="text"
                    value={seoMetadata.title}
                    onChange={(e) => setSeoMetadata({ ...seoMetadata, title: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#050816] border border-white/10 rounded-xl text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-2">META DESCRIPTION TAG</label>
                  <textarea
                    rows={3}
                    value={seoMetadata.description}
                    onChange={(e) => setSeoMetadata({ ...seoMetadata, description: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#050816] border border-white/10 rounded-xl text-white text-xs"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple text-white text-xs font-bold shadow-glow-purple cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Theme & SEO</span>
              </button>
            </div>

          </form>
        </div>

        {/* Right Column: Navigation Menu Items Manager */}
        <div className="space-y-6">
          <div className="glass-card rounded-3xl p-8 border border-white/10 space-y-6">
            <h4 className="text-sm font-bold text-accent-pink uppercase tracking-wider mb-2 flex items-center gap-2">
              <Menu className="w-4 h-4" /> Navigation Bar Links Manager
            </h4>
            <p className="text-xs text-slate-400">Add, reorder, or delete custom items appearing on the main website navigation header.</p>

            {/* Link List */}
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {localNavItems.map((item, index) => (
                <div key={item.id} className="p-3.5 rounded-xl bg-[#050816] border border-white/10 flex items-center justify-between text-xs">
                  <div className="flex flex-col">
                    <span className="font-bold text-white">{item.label}</span>
                    <span className="font-mono text-[10px] text-slate-400">{item.path}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => moveItem(index, 'up')}
                      disabled={index === 0}
                      className="p-1.5 rounded-md hover:bg-white/5 text-slate-400 disabled:opacity-30"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => moveItem(index, 'down')}
                      disabled={index === localNavItems.length - 1}
                      className="p-1.5 rounded-md hover:bg-white/5 text-slate-400 disabled:opacity-30"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleRemoveNav(item.id)}
                      className="p-1.5 rounded-md text-rose-400 hover:bg-rose-500/10"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add New Link Card */}
            <div className="p-4 rounded-xl bg-[#050816]/50 border border-white/5 space-y-3">
              <h5 className="text-xs font-bold text-white">Create Custom Menu Link</h5>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Label (e.g. Services)"
                  value={newLinkLabel}
                  onChange={(e) => setNewLinkLabel(e.target.value)}
                  className="w-full px-3 py-2 bg-[#050816] border border-white/10 rounded-xl text-white text-xs"
                />
                <input
                  type="text"
                  placeholder="Path (e.g. #services)"
                  value={newLinkPath}
                  onChange={(e) => setNewLinkPath(e.target.value)}
                  className="w-full px-3 py-2 bg-[#050816] border border-white/10 rounded-xl text-white text-xs"
                />
              </div>
              <button
                type="button"
                onClick={handleAddNav}
                className="w-full py-2 bg-accent-pink/20 hover:bg-accent-pink/30 text-accent-pink text-xs font-bold rounded-xl"
              >
                Insert Link Item
              </button>
            </div>

            <div className="flex justify-end pt-4 border-t border-white/10">
              <button
                onClick={handleSaveNav}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-accent-blue to-accent-pink text-white text-xs font-bold shadow-glow-purple cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Navigation Ordering</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
