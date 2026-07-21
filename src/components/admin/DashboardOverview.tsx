import React from 'react';
import { motion } from 'framer-motion';
import { Users, Eye, TrendingUp, Mail, FolderKanban, ArrowUpRight, Sparkles, Activity, ShieldCheck } from 'lucide-react';
import { mockAnalyticsData } from '../../data/dashboardData';
import { StatCounter } from '../ui/StatCounter';
import { useApp } from '../../context/AppContext';
import { soundFX } from '../../utils/soundFX';

interface Props {
  onNavigate: (tab: 'analytics' | 'projects' | 'messages' | 'techstack') => void;
}

export const DashboardOverview: React.FC<Props> = ({ onNavigate }) => {
  const { projects, messages } = useApp();

  return (
    <div className="space-y-6">
      
      {/* Top Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <motion.div
          whileHover={{ y: -4 }}
          onMouseEnter={() => soundFX.playHover()}
          className="glass-card rounded-2xl p-5 border border-white/10 flex items-center justify-between group cursor-pointer"
          onClick={() => onNavigate('analytics')}
        >
          <div>
            <span className="text-xs font-mono text-slate-400">Total Page Views</span>
            <div className="text-2xl font-extrabold text-white text-gradient-blue-purple mt-1">
              <StatCounter value={mockAnalyticsData.pageViews} />
            </div>
            <div className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 mt-2">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+24.8% vs last week</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-accent-blue/20 border border-accent-blue/40 flex items-center justify-center text-accent-cyan shadow-glow-blue">
            <Eye className="w-6 h-6" />
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -4 }}
          onMouseEnter={() => soundFX.playHover()}
          className="glass-card rounded-2xl p-5 border border-white/10 flex items-center justify-between group cursor-pointer"
          onClick={() => onNavigate('analytics')}
        >
          <div>
            <span className="text-xs font-mono text-slate-400">Unique Visitors</span>
            <div className="text-2xl font-extrabold text-white text-gradient-cyan-blue mt-1">
              <StatCounter value={mockAnalyticsData.uniqueVisitors} />
            </div>
            <div className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 mt-2">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+18.4% growth</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-accent-purple/20 border border-accent-purple/40 flex items-center justify-center text-accent-violet shadow-glow-purple">
            <Users className="w-6 h-6" />
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -4 }}
          onMouseEnter={() => soundFX.playHover()}
          className="glass-card rounded-2xl p-5 border border-white/10 flex items-center justify-between group cursor-pointer"
          onClick={() => onNavigate('messages')}
        >
          <div>
            <span className="text-xs font-mono text-slate-400">Inbound Messages</span>
            <div className="text-2xl font-extrabold text-white text-gradient-purple-pink mt-1">
              <StatCounter value={messages.length} />
            </div>
            <div className="inline-flex items-center gap-1 text-[11px] font-mono text-accent-pink mt-2">
              <span>{messages.filter((m) => m.status === 'unread').length} Unread</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-accent-pink/20 border border-accent-pink/40 flex items-center justify-center text-accent-pink shadow-glow-pink">
            <Mail className="w-6 h-6" />
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -4 }}
          onMouseEnter={() => soundFX.playHover()}
          className="glass-card rounded-2xl p-5 border border-white/10 flex items-center justify-between group cursor-pointer"
          onClick={() => onNavigate('projects')}
        >
          <div>
            <span className="text-xs font-mono text-slate-400">Active Portfolio Projects</span>
            <div className="text-2xl font-extrabold text-white text-gradient-blue-purple mt-1">
              <StatCounter value={projects.length} />
            </div>
            <div className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 mt-2">
              <span>100% Online & Deployed</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-accent-cyan/20 border border-accent-cyan/40 flex items-center justify-center text-accent-cyan shadow-glow-cyan">
            <FolderKanban className="w-6 h-6" />
          </div>
        </motion.div>

      </div>

      {/* Main Grid: Activity & Telemetry Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Quick Actions & Live Telemetry Stream */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Quick Action Dock */}
          <div className="glass-card rounded-3xl p-6 border border-white/10">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-accent-cyan" />
              <span>Admin Quick Actions</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => {
                  soundFX.playClick();
                  onNavigate('projects');
                }}
                className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-accent-purple/50 text-left transition-all hover:scale-105 cursor-pointer group"
              >
                <FolderKanban className="w-5 h-5 text-accent-cyan mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-xs font-bold text-white">Manage Projects</div>
                <div className="text-[10px] text-slate-400">Add or edit portfolio apps</div>
              </button>

              <button
                onClick={() => {
                  soundFX.playClick();
                  onNavigate('messages');
                }}
                className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-accent-pink/50 text-left transition-all hover:scale-105 cursor-pointer group"
              >
                <Mail className="w-5 h-5 text-accent-pink mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-xs font-bold text-white">View Inbound Messages</div>
                <div className="text-[10px] text-slate-400">Review recruiter inquiries</div>
              </button>

              <button
                onClick={() => {
                  soundFX.playClick();
                  onNavigate('analytics');
                }}
                className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-accent-blue/50 text-left transition-all hover:scale-105 cursor-pointer group"
              >
                <Activity className="w-5 h-5 text-accent-blue mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-xs font-bold text-white">Full Analytics</div>
                <div className="text-[10px] text-slate-400">Deep telemetry analysis</div>
              </button>
            </div>
          </div>

          {/* Traffic Preview Bar Chart */}
          <div className="glass-card rounded-3xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-sm font-bold text-white">Weekly Traffic Telemetry</h3>
                <p className="text-xs text-slate-400">Daily pageviews across desktop & mobile</p>
              </div>
              <button
                onClick={() => onNavigate('analytics')}
                className="text-xs font-mono text-accent-cyan flex items-center gap-1 hover:underline cursor-pointer"
              >
                <span>Full Telemetry</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Bar chart representation */}
            <div className="h-48 flex items-end justify-between gap-3 pt-6 border-b border-white/10 px-2">
              {mockAnalyticsData.dailyTraffic.map((d) => {
                const max = 30000;
                const heightPercent = Math.min((d.views / max) * 100, 100);
                return (
                  <div key={d.date} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                    <div className="w-full bg-white/5 rounded-t-xl h-full flex items-end overflow-hidden">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${heightPercent}%` }}
                        transition={{ duration: 0.8 }}
                        className="w-full bg-gradient-to-t from-accent-blue via-accent-purple to-accent-pink rounded-t-xl group-hover:brightness-125 transition-all"
                      />
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">{d.date}</span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column: Recent Activity Feed */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-card rounded-3xl p-6 border border-white/10 h-full">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-accent-pink" />
              <span>Real-Time Audit Feed</span>
            </h3>

            <div className="space-y-4 font-mono text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 animate-pulse" />
                <div>
                  <div className="text-slate-200 font-sans font-semibold">Recruiter View: Stripe Platform Team</div>
                  <div className="text-[10px] text-slate-400">San Francisco, CA • 10m ago</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-accent-cyan mt-1.5" />
                <div>
                  <div className="text-slate-200 font-sans font-semibold">Nexus AI Architecture Modal Opened</div>
                  <div className="text-[10px] text-slate-400">Direct Visit • 42m ago</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-accent-purple mt-1.5" />
                <div>
                  <div className="text-slate-200 font-sans font-semibold">Source Code Link Clicked (AetherDEX)</div>
                  <div className="text-[10px] text-slate-400">GitHub Referral • 2h ago</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-amber-400 mt-1.5" />
                <div>
                  <div className="text-slate-200 font-sans font-semibold">System Backup Completed</div>
                  <div className="text-[10px] text-slate-400">Automated Cron • 6h ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
