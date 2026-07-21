import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  User,
  FolderKanban,
  Cpu,
  Briefcase,
  GraduationCap,
  Trophy,
  MessageSquare,
  Database,
  ArrowLeft,
  Bell,
  Search,
  Sparkles,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { soundFX } from '../../utils/soundFX';
import { DashboardOverview } from './DashboardOverview';
import { ProfileEditor } from './ProfileEditor';
import { ProjectsManager } from './ProjectsManager';
import { TechStackManager } from './TechStackManager';
import { ExperienceManager } from './ExperienceManager';
import { EducationManager } from './EducationManager';
import { AchievementsManager } from './AchievementsManager';
import { MessagesInbox } from './MessagesInbox';
import { DatabaseBackup } from './DatabaseBackup';

export const AdminLayout: React.FC = () => {
  const { toggleAdmin, messages, profile } = useApp();
  const [activeTab, setActiveTab] = useState<
    'overview' | 'profile' | 'projects' | 'techstack' | 'experience' | 'education' | 'achievements' | 'messages' | 'backup'
  >('overview');
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const unreadMessagesCount = messages.filter((m) => m.status === 'unread').length;

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'profile', label: 'Profile & Bio Editor', icon: User },
    { id: 'projects', label: 'Projects Manager', icon: FolderKanban },
    { id: 'techstack', label: 'Skills & Tech Stack', icon: Cpu },
    { id: 'experience', label: 'Work History', icon: Briefcase },
    { id: 'education', label: 'Education & Certs', icon: GraduationCap },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'messages', label: 'Messages Inbox', icon: MessageSquare, badge: unreadMessagesCount },
    { id: 'backup', label: 'Database & JSON Backup', icon: Database },
  ];

  const initials = (profile.fullName || 'Dev')
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen bg-[#050816] text-slate-100 flex flex-col md:flex-row relative z-30 font-sans">
      
      {/* Glassmorphic Sidebar */}
      <aside className="w-full md:w-64 glass-panel border-r border-white/10 p-6 flex flex-col justify-between flex-shrink-0">
        <div>
          {/* Admin Header / Brand */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-pink via-accent-purple to-accent-blue p-[1px] shadow-glow-pink">
                <div className="w-full h-full bg-[#0B1026] rounded-[10px] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-accent-cyan" />
                </div>
              </div>
              <div>
                <h1 className="font-extrabold text-sm text-white tracking-tight">ADMIN COCKPIT</h1>
                <span className="text-[10px] font-mono text-accent-pink tracking-widest uppercase">CMS Engine Live</span>
              </div>
            </div>
          </div>

          {/* Sidebar Nav Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    soundFX.playClick();
                    setActiveTab(item.id as typeof activeTab);
                  }}
                  onMouseEnter={() => soundFX.playHover()}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-xs transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-accent-blue/20 to-accent-purple/20 border border-accent-purple/40 text-white shadow-glow-purple'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-accent-cyan' : 'text-slate-400'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-accent-pink text-white text-[10px] font-bold shadow-glow-pink">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Back to Public Site */}
        <div className="pt-6 border-t border-white/10 mt-6">
          <button
            onClick={toggleAdmin}
            onMouseEnter={() => soundFX.playHover()}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl glass-card border border-white/15 text-accent-cyan hover:text-white font-semibold text-xs transition-all cursor-pointer shadow-glow-cyan"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Live Portfolio</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Content Workspace */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#050816] overflow-y-auto">
        
        {/* Top Header Bar */}
        <header className="sticky top-0 z-20 glass-nav border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-white tracking-tight capitalize">
              {activeTab === 'overview' && 'System Performance & Control Center'}
              {activeTab === 'profile' && 'Profile & Personal Identity Editor'}
              {activeTab === 'projects' && 'Portfolio Projects Management'}
              {activeTab === 'techstack' && 'Skills & Technology Stack Editor'}
              {activeTab === 'experience' && 'Work History & Career Timeline'}
              {activeTab === 'education' && 'Education & Industry Certifications'}
              {activeTab === 'achievements' && 'Achievements & Awards Manager'}
              {activeTab === 'messages' && 'Inbound Contact Messages Inbox'}
              {activeTab === 'backup' && 'Database Storage & JSON Backup'}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Search Simulator Bar */}
            <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-slate-400">
              <Search className="w-3.5 h-3.5" />
              <span>Cmd + K search</span>
            </div>

            {/* Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => {
                  soundFX.playClick();
                  setNotificationsOpen(!notificationsOpen);
                }}
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-accent-purple text-slate-300 hover:text-white transition-all cursor-pointer relative"
              >
                <Bell className="w-4 h-4 text-accent-cyan" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent-pink animate-pulse" />
              </button>

              {notificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-80 glass-panel rounded-2xl p-4 border border-white/15 shadow-2xl z-50 text-xs space-y-3"
                >
                  <div className="flex items-center justify-between font-bold text-white border-b border-white/10 pb-2">
                    <span>Notifications</span>
                    <span className="text-[10px] text-accent-cyan">Live Storage Ready</span>
                  </div>
                  <div className="space-y-2">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-white">Database Auto-Save Engaged</div>
                        <div className="text-[10px] text-slate-400">Persistent storage active</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Admin Avatar Badge */}
            <div className="flex items-center gap-2.5 pl-4 border-l border-white/10">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-accent-blue to-accent-pink p-[1px]">
                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-xs font-bold text-white uppercase">
                  {initials}
                </div>
              </div>
              <div className="hidden lg:flex flex-col">
                <span className="text-xs font-bold text-white leading-tight">{profile.fullName}</span>
                <span className="text-[10px] font-mono text-emerald-400">CMS Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* View Switcher Container */}
        <div className="p-6 space-y-6">
          {activeTab === 'overview' && <DashboardOverview onNavigate={(tab) => setActiveTab(tab as typeof activeTab)} />}
          {activeTab === 'profile' && <ProfileEditor />}
          {activeTab === 'projects' && <ProjectsManager />}
          {activeTab === 'techstack' && <TechStackManager />}
          {activeTab === 'experience' && <ExperienceManager />}
          {activeTab === 'education' && <EducationManager />}
          {activeTab === 'achievements' && <AchievementsManager />}
          {activeTab === 'messages' && <MessagesInbox />}
          {activeTab === 'backup' && <DatabaseBackup />}
        </div>

      </main>
    </div>
  );
};
