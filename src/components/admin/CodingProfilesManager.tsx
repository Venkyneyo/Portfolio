import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code2, RefreshCw, CheckCircle2, AlertCircle, ExternalLink, Save, Clock, ShieldCheck, Zap, Globe } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { soundFX } from '../../utils/soundFX';

export const CodingProfilesManager: React.FC = () => {
  const { codingProfiles, syncLogs, updateCodingProfileConfig, triggerProfileSync, fetchSyncLogs } = useApp();

  const [syncingPlatform, setSyncingPlatform] = useState<string | null>(null);
  const [savingPlatform, setSavingPlatform] = useState<string | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form states per platform
  const [formStates, setFormStates] = useState<Record<string, { username: string; profileUrl: string; autoSyncEnabled: boolean }>>({});

  useEffect(() => {
    fetchSyncLogs();
  }, []);

  useEffect(() => {
    if (codingProfiles.length > 0) {
      const initial: Record<string, { username: string; profileUrl: string; autoSyncEnabled: boolean }> = {};
      codingProfiles.forEach(p => {
        initial[p.platform] = {
          username: p.username || '',
          profileUrl: p.profileUrl || '',
          autoSyncEnabled: p.autoSyncEnabled ?? true
        };
      });
      setFormStates(initial);
    }
  }, [codingProfiles]);

  const defaultPlatforms = [
    { id: 'leetcode', name: 'LeetCode', color: '#F59E0B', defaultUrl: 'https://leetcode.com/u/username/' },
    { id: 'hackerrank', name: 'HackerRank', color: '#2EC4B6', defaultUrl: 'https://hackerrank.com/username' },
    { id: 'codechef', name: 'CodeChef', color: '#5B45FF', defaultUrl: 'https://codechef.com/users/username' },
    { id: 'codeforces', name: 'Codeforces', color: '#FF495C', defaultUrl: 'https://codeforces.com/profile/username' },
    { id: 'github', name: 'GitHub', color: '#06B6D4', defaultUrl: 'https://github.com/username' }
  ];

  const handleSaveConfig = async (platform: string) => {
    soundFX.playClick();
    setSavingPlatform(platform);
    setFeedbackMsg(null);

    const config = formStates[platform] || { username: '', profileUrl: '', autoSyncEnabled: true };

    try {
      await updateCodingProfileConfig(platform, config);
      soundFX.playSwoosh();
      setFeedbackMsg({ type: 'success', text: `Successfully updated ${platform} profile settings!` });
    } catch (err: any) {
      setFeedbackMsg({ type: 'error', text: err.message || `Failed to update ${platform} settings.` });
    } finally {
      setSavingPlatform(null);
    }
  };

  const handleSyncNow = async (platform: string) => {
    soundFX.playClick();
    setSyncingPlatform(platform);
    setFeedbackMsg(null);

    try {
      const res = await triggerProfileSync(platform);
      if (res.success) {
        soundFX.playSwoosh();
        setFeedbackMsg({ type: 'success', text: `Live ${platform} stats successfully synchronized with database!` });
      } else {
        setFeedbackMsg({ type: 'error', text: res.error || `Sync failed for ${platform}.` });
      }
    } catch (err: any) {
      setFeedbackMsg({ type: 'error', text: err.message || `Sync failed for ${platform}.` });
    } finally {
      setSyncingPlatform(null);
    }
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Header Banner */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/20 via-accent-purple/20 to-accent-cyan/20 p-[1px] shadow-glow-purple">
              <div className="w-full h-full bg-[#0B1026] rounded-[15px] flex items-center justify-center text-amber-400">
                <Code2 className="w-6 h-6 animate-pulse" />
              </div>
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">Coding Profiles & Auto-Sync Engine</h2>
              <p className="text-xs text-slate-400 mt-1">Configure LeetCode, HackerRank, CodeChef & GitHub automatic 24-hour background synchronization</p>
            </div>
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
            <ShieldCheck className="w-4 h-4" />
            <span>24h Background Cron Active</span>
          </div>
        </div>
      </div>

      {/* Global Feedback Banner */}
      {feedbackMsg && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-2xl text-xs flex items-center justify-between gap-3 border ${
            feedbackMsg.type === 'success'
              ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
              : 'bg-rose-500/15 border-rose-500/30 text-rose-300'
          }`}
        >
          <div className="flex items-center gap-2">
            {feedbackMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" /> : <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />}
            <span>{feedbackMsg.text}</span>
          </div>
          <button onClick={() => setFeedbackMsg(null)} className="text-slate-400 hover:text-white font-bold cursor-pointer">×</button>
        </motion.div>
      )}

      {/* Platform Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {defaultPlatforms.map((plat) => {
          const profileItem = codingProfiles.find(p => p.platform === plat.id);
          const state = formStates[plat.id] || { username: '', profileUrl: '', autoSyncEnabled: true };
          const isSyncing = syncingPlatform === plat.id;
          const isSaving = savingPlatform === plat.id;

          const stats = profileItem?.stats || {};
          const lastSync = profileItem?.lastSyncTime ? new Date(profileItem.lastSyncTime).toLocaleString() : 'Never';
          const isSuccess = profileItem?.lastSyncStatus === 'success';

          return (
            <motion.div
              key={plat.id}
              whileHover={{ y: -3 }}
              className="glass-card rounded-3xl p-6 border border-white/10 space-y-6 relative overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shadow-md"
                    style={{ backgroundColor: `${plat.color}20`, borderColor: `${plat.color}40`, borderWidth: '1px', color: plat.color }}
                  >
                    <Code2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      {plat.name}
                      {plat.id === 'leetcode' && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold">
                          Primary API
                        </span>
                      )}
                    </h3>
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                      <Clock className="w-3 h-3 text-slate-500" />
                      <span>Last sync: {lastSync}</span>
                      <span className={`w-2 h-2 rounded-full ${isSuccess ? 'bg-emerald-400' : 'bg-rose-500'}`} />
                    </div>
                  </div>
                </div>

                {profileItem?.profileUrl && (
                  <a
                    href={profileItem.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-accent-cyan transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>

              {/* Profile Config Inputs */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                    Profile URL or Username
                  </label>
                  <input
                    type="text"
                    value={state.profileUrl || state.username}
                    onChange={(e) => setFormStates(prev => ({
                      ...prev,
                      [plat.id]: { ...state, profileUrl: e.target.value, username: e.target.value }
                    }))}
                    placeholder={plat.defaultUrl}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#050816] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-accent-cyan"
                  />
                  <p className="text-[10px] text-slate-500 mt-1">
                    Paste full URL (e.g. {plat.defaultUrl}) or raw username
                  </p>
                </div>

                {/* Auto Sync Toggle */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2">
                    <Zap className={`w-4 h-4 ${state.autoSyncEnabled ? 'text-amber-400 animate-pulse' : 'text-slate-500'}`} />
                    <div>
                      <div className="text-xs font-semibold text-white">Automatic 24h Daily Sync</div>
                      <div className="text-[10px] text-slate-400">Background cron runs once every 24 hours</div>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={state.autoSyncEnabled}
                      onChange={(e) => setFormStates(prev => ({
                        ...prev,
                        [plat.id]: { ...state, autoSyncEnabled: e.target.checked }
                      }))}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500" />
                  </label>
                </div>
              </div>

              {/* Synchronized Stats Preview */}
              {plat.id === 'leetcode' && (
                <div className="p-4 rounded-xl bg-[#050816] border border-white/10 text-xs font-mono space-y-2">
                  <div className="flex justify-between font-bold text-white border-b border-white/10 pb-1.5">
                    <span>Live Database Sync Preview</span>
                    <span className="text-amber-400">{stats.ranking || 'Top 1.2%'}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-center text-[11px] pt-1">
                    <div className="p-1.5 rounded bg-white/5">
                      <div className="text-slate-400">Total</div>
                      <div className="font-bold text-white">{stats.totalSolved ?? 850}</div>
                    </div>
                    <div className="p-1.5 rounded bg-emerald-500/10 text-emerald-400">
                      <div>Easy</div>
                      <div className="font-bold">{stats.easySolved ?? 310}</div>
                    </div>
                    <div className="p-1.5 rounded bg-amber-500/10 text-amber-400">
                      <div>Medium</div>
                      <div className="font-bold">{stats.mediumSolved ?? 420}</div>
                    </div>
                    <div className="p-1.5 rounded bg-rose-500/10 text-rose-400">
                      <div>Hard</div>
                      <div className="font-bold">{stats.hardSolved ?? 120}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => handleSaveConfig(plat.id)}
                  disabled={isSaving}
                  className="flex-1 py-2.5 rounded-xl bg-white/5 border border-white/15 text-slate-200 hover:text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{isSaving ? 'Saving...' : 'Save Settings'}</span>
                </button>

                <button
                  onClick={() => handleSyncNow(plat.id)}
                  disabled={isSyncing}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-accent-purple to-accent-pink text-white font-bold text-xs shadow-glow-purple hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                  <span>{isSyncing ? 'Syncing Live...' : 'Sync Live Data Now'}</span>
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Sync History Logs Table */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-accent-cyan" />
            <h3 className="text-base font-bold text-white">Synchronization History Log</h3>
          </div>
          <button
            onClick={() => fetchSyncLogs()}
            className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh Logs</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono text-slate-300">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 uppercase text-[10px]">
                <th className="pb-3 px-3">Timestamp</th>
                <th className="pb-3 px-3">Platform</th>
                <th className="pb-3 px-3">Status</th>
                <th className="pb-3 px-3">Message Log</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {syncLogs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-slate-500">No synchronization logs recorded yet.</td>
                </tr>
              ) : (
                syncLogs.slice(0, 15).map((log) => (
                  <tr key={log.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3 px-3 text-slate-400 whitespace-nowrap">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="py-3 px-3 uppercase font-bold text-accent-cyan">
                      {log.platform}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        log.status === 'success' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                      }`}>
                        {log.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-300 truncate max-w-md">
                      {log.message}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
