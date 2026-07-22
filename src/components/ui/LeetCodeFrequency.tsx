import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Flame, Trophy, ExternalLink, Zap, Award, Target, CheckCircle2, Clock, Activity, Calendar } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { soundFX } from '../../utils/soundFX';

export const LeetCodeFrequency: React.FC = () => {
  const { profile, codingProfiles } = useApp();

  // Retrieve synced database profile item for LeetCode
  const leetcodeProfileItem = codingProfiles.find(p => p.platform === 'leetcode');
  const stats = leetcodeProfileItem?.stats || {};

  const username = leetcodeProfileItem?.username || profile.leetcodeUsername || 'alex_codes';
  const profileUrl = leetcodeProfileItem?.profileUrl || profile.leetcodeUrl || `https://leetcode.com/u/${username}`;
  
  const totalSolved = stats.totalSolved ?? profile.leetcodeTotalSolved ?? 850;
  const easy = stats.easySolved ?? profile.leetcodeEasySolved ?? 310;
  const medium = stats.mediumSolved ?? profile.leetcodeMediumSolved ?? 420;
  const hard = stats.hardSolved ?? profile.leetcodeHardSolved ?? 120;
  const ranking = stats.ranking || profile.leetcodeGlobalRanking || 'Top 1.2%';
  const rating = stats.contestRating || profile.leetcodeContestRating || 2150;
  const streak = stats.streakDays || profile.leetcodeStreakDays || 145;
  const acceptance = stats.acceptanceRate || profile.leetcodeAcceptanceRate || 68.4;
  const totalSubs = stats.totalSubmissions || 1240;
  const badgesCount = stats.badgesCount || (stats.badges ? stats.badges.length : 5);

  const lastSyncTime = leetcodeProfileItem?.lastSyncTime
    ? new Date(leetcodeProfileItem.lastSyncTime).toLocaleString()
    : 'Synchronized Daily';

  const recentAcList = stats.recentSubmissions || [
    { title: 'LRU Cache', slug: 'lru-cache', timestamp: new Date().toISOString() },
    { title: 'Trapping Rain Water', slug: 'trapping-rain-water', timestamp: new Date(Date.now() - 86400000).toISOString() },
    { title: 'Course Schedule II', slug: 'course-schedule-ii', timestamp: new Date(Date.now() - 172800000).toISOString() }
  ];

  // Process submissionCalendar timestamp map into a 140-day activity frequency matrix
  const activityDays = React.useMemo(() => {
    const calendarMap = stats.submissionCalendar || {};
    const keys = Object.keys(calendarMap);

    if (keys.length > 0) {
      const nowSec = Math.floor(Date.now() / 1000);
      const oneDaySec = 86400;
      const days = [];

      for (let i = 139; i >= 0; i--) {
        const dayStart = nowSec - (i * oneDaySec);
        const dayEnd = dayStart + oneDaySec;

        let count = 0;
        for (const tsStr of keys) {
          const ts = Number(tsStr);
          if (ts >= dayStart && ts < dayEnd) {
            count += Number(calendarMap[tsStr]);
          }
        }

        let level = 0;
        if (count >= 10) level = 4;
        else if (count >= 5) level = 3;
        else if (count >= 2) level = 2;
        else if (count >= 1) level = 1;

        days.push({ level, count });
      }
      return days;
    }

    // Fallback pseudo activity matrix if no calendar map yet
    return Array.from({ length: 140 }).map((_, i) => {
      const pseudoRandom = (i * 17 + (i % 5) * 31) % 100;
      let level = 0;
      let count = 0;
      if (pseudoRandom > 85) { level = 4; count = 12; }
      else if (pseudoRandom > 60) { level = 3; count = 6; }
      else if (pseudoRandom > 35) { level = 2; count = 3; }
      else if (pseudoRandom > 15) { level = 1; count = 1; }
      return { level, count };
    });
  }, [stats.submissionCalendar]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 relative overflow-hidden group shadow-2xl space-y-8"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl group-hover:bg-amber-500/20 transition-all duration-500 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-purple/10 rounded-full blur-3xl group-hover:bg-accent-cyan/20 transition-all duration-500 pointer-events-none" />

      {/* Card Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/20 via-accent-purple/20 to-accent-cyan/20 p-[1px] shadow-glow-purple">
            <div className="w-full h-full bg-[#0B1026] rounded-[15px] flex items-center justify-center text-amber-400">
              <Code2 className="w-6 h-6 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-extrabold text-white tracking-tight">LeetCode Activity & Frequency</h3>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 font-mono text-[11px] font-semibold flex items-center gap-1">
                <Trophy className="w-3 h-3" /> Knight / Guardian
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono text-slate-400 mt-1">
              <span>Auto-Synced Database Service</span>
              <span className="flex items-center gap-1 text-emerald-400">
                <Clock className="w-3 h-3" /> Last Synced: {lastSyncTime}
              </span>
            </div>
          </div>
        </div>

        {/* Profile Link CTA */}
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => soundFX.playHover()}
          onClick={() => soundFX.playClick()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass-card border border-white/15 text-accent-cyan hover:text-white font-mono text-xs font-semibold hover:border-accent-cyan transition-all cursor-pointer shadow-glow-cyan"
        >
          <span>@{username}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Metrics Row: Total Solved & Easy/Medium/Hard Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Total Problems Solved Ring / Card (Span 4) */}
        <div className="md:col-span-4 p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span>TOTAL PROBLEMS SOLVED</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>

          <div className="flex items-baseline gap-2 my-2">
            <span className="text-4xl sm:text-5xl font-extrabold font-mono text-white text-gradient-cyan-blue tracking-tight">
              {totalSolved}
            </span>
            <span className="text-xs font-mono text-slate-400">/ 3,300+</span>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/10 text-xs font-mono">
            <div className="flex items-center gap-1.5 text-amber-400">
              <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>{streak} Days Streak</span>
            </div>
            <div className="flex items-center gap-1.5 text-accent-cyan">
              <Target className="w-4 h-4" />
              <span>{acceptance}% Acc.</span>
            </div>
          </div>
        </div>

        {/* Easy, Medium, Hard Category Breakdown (Span 8) */}
        <div className="md:col-span-8 space-y-3.5 justify-center flex flex-col">
          
          {/* Easy Bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" /> Easy
              </span>
              <span className="text-slate-300 font-bold">{easy} <span className="text-slate-500 font-normal">solved</span></span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden relative">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${Math.min(100, (easy / (totalSolved || 1)) * 100 * 2.2)}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]"
              />
            </div>
          </div>

          {/* Medium Bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-amber-400 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" /> Medium
              </span>
              <span className="text-slate-300 font-bold">{medium} <span className="text-slate-500 font-normal">solved</span></span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden relative">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${Math.min(100, (medium / (totalSolved || 1)) * 100 * 1.8)}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
                className="h-full rounded-full bg-amber-400 shadow-[0_0_10px_#fbbf24]"
              />
            </div>
          </div>

          {/* Hard Bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-rose-400 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-400" /> Hard
              </span>
              <span className="text-slate-300 font-bold">{hard} <span className="text-slate-500 font-normal">solved</span></span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden relative">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${Math.min(100, (hard / (totalSolved || 1)) * 100 * 2.5)}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
                className="h-full rounded-full bg-rose-500 shadow-[0_0_10px_#f43f5e]"
              />
            </div>
          </div>

        </div>

      </div>

      {/* GitHub-Style LeetCode Submission Frequency Heatmap Matrix */}
      <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-slate-300">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <span className="font-bold text-white uppercase tracking-wider">LeetCode Submission Frequency Heatmap</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            <span>Global Rank: <strong className="text-white">{ranking}</strong></span>
            <span>Contest Rating: <strong className="text-amber-400">{rating}</strong></span>
            <span>Badges: <strong className="text-accent-pink">{badgesCount}</strong></span>
          </div>
        </div>

        {/* Heatmap Grid */}
        <div className="grid grid-cols-20 sm:grid-cols-28 md:grid-cols-35 gap-1.5 py-2">
          {activityDays.map((day, idx) => {
            const bgClasses = [
              'bg-white/5 border-transparent',
              'bg-emerald-950/60 border-emerald-800/40 text-emerald-400',
              'bg-emerald-700/60 border-emerald-600/50 shadow-[0_0_4px_#059669]',
              'bg-emerald-500/80 border-emerald-400 shadow-[0_0_8px_#10b981]',
              'bg-emerald-400 border-white shadow-[0_0_12px_#34d399]'
            ];

            return (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.4, zIndex: 10 }}
                className={`h-3.5 sm:h-4 rounded-sm border transition-all duration-200 ${bgClasses[day.level]} cursor-pointer`}
                title={`Day ${idx + 1}: ${day.count > 0 ? `${day.count} submissions` : 'Rest Day'}`}
              />
            );
          })}
        </div>

        {/* Legend Footer */}
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-white/10">
          <span>140-Day Activity Window</span>
          <div className="flex items-center gap-2">
            <span>Less</span>
            <div className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 rounded-sm bg-white/5" />
              <div className="w-2.5 h-2.5 rounded-sm bg-emerald-950/80 border border-emerald-800/40" />
              <div className="w-2.5 h-2.5 rounded-sm bg-emerald-700/80" />
              <div className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
              <div className="w-2.5 h-2.5 rounded-sm bg-emerald-400 shadow-[0_0_6px_#34d399]" />
            </div>
            <span>More</span>
          </div>
        </div>
      </div>

      {/* Recent Submissions & Activity Highlights Footer */}
      {recentAcList.length > 0 && (
        <div className="pt-4 border-t border-white/10">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-300 font-bold uppercase tracking-wider mb-3">
            <Activity className="w-4 h-4 text-accent-cyan" />
            <span>Recently Solved Problems</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {recentAcList.slice(0, 3).map((sub: any, i: number) => (
              <a
                key={i}
                href={sub.slug ? `https://leetcode.com/problems/${sub.slug}/` : profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-accent-cyan/40 transition-all flex items-center justify-between group"
              >
                <div className="truncate pr-2">
                  <div className="text-xs font-bold text-white group-hover:text-accent-cyan transition-colors truncate">
                    {sub.title}
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                    {sub.timestamp ? new Date(sub.timestamp).toLocaleDateString() : 'Recent'}
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-accent-cyan flex-shrink-0" />
              </a>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};
