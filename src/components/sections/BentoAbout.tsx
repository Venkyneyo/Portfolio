import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, GitBranch, Shield, Zap, Layers, Sparkles, Code, Cpu } from 'lucide-react';
import { soundFX } from '../../utils/soundFX';
import { useApp } from '../../context/AppContext';

export const BentoAbout: React.FC = () => {
  const { profile, skills } = useApp();
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const topSkillsList = skills.slice(0, 8).map(s => s.name).join(', ');

  return (
    <section id="about" className="relative py-24 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-accent-purple/30 text-accent-cyan text-xs font-semibold uppercase tracking-wider mb-4 shadow-glow-purple"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Architecture & Philosophy</span>
          </motion.div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Crafting Digital Systems with <span className="text-gradient-purple-pink">Obsessive Quality</span>
          </h2>
          <p className="text-slate-400 text-base">
            {profile.aboutText || profile.bio}
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Core Engineering Philosophy (Span 2) */}
          <motion.div
            whileHover={{ y: -5 }}
            onMouseEnter={() => soundFX.playHover()}
            className="md:col-span-2 glass-card rounded-3xl p-8 border border-white/10 flex flex-col justify-between relative overflow-hidden group cursor-pointer"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-blue/10 rounded-full blur-3xl group-hover:bg-accent-purple/20 transition-all duration-500" />
            <div>
              <div className="w-12 h-12 rounded-2xl bg-accent-blue/20 border border-accent-blue/40 flex items-center justify-center text-accent-cyan mb-6 shadow-glow-blue">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-accent-cyan transition-colors">
                Sub-50ms Latency & High Concurrency
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                {profile.aboutText}
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono text-slate-400 pt-4 border-t border-white/10">
              <span className="flex items-center gap-1 text-emerald-400">
                <Shield className="w-3.5 h-3.5" /> Zero Downtime
              </span>
              <span className="flex items-center gap-1 text-accent-cyan">
                <Cpu className="w-3.5 h-3.5" /> High Throughput
              </span>
            </div>
          </motion.div>

          {/* Card 2: Live Local Time Clock Widget */}
          <motion.div
            whileHover={{ y: -5 }}
            onMouseEnter={() => soundFX.playHover()}
            className="glass-card rounded-3xl p-6 border border-white/10 flex flex-col justify-between relative overflow-hidden group cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">LOCATION & TIME</span>
              <Clock className="w-4 h-4 text-accent-pink animate-spin-slow" />
            </div>
            <div className="my-6">
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white text-gradient-cyan-blue tracking-tight">
                {time || '12:00:00 PM'}
              </div>
              <p className="text-xs text-slate-400 mt-2 truncate">{profile.location}</p>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available Globally</span>
            </div>
          </motion.div>

          {/* Card 3: Modern Tech Stack Highlights */}
          <motion.div
            whileHover={{ y: -5 }}
            onMouseEnter={() => soundFX.playHover()}
            className="glass-card rounded-3xl p-6 border border-white/10 flex flex-col justify-between group cursor-pointer"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-accent-purple/20 border border-accent-purple/40 flex items-center justify-center text-accent-violet mb-4 shadow-glow-purple">
                <Layers className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Modern Stack</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {topSkillsList || 'TypeScript, React, Node.js, Python, Go, Cloud Native Tools'}
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-white/10 text-xs font-mono text-accent-pink">
              Dynamic Stack Engine
            </div>
          </motion.div>

          {/* Card 4: GitHub Activity Mock Widget (Span 2) */}
          <motion.div
            whileHover={{ y: -5 }}
            onMouseEnter={() => soundFX.playHover()}
            className="md:col-span-2 glass-card rounded-3xl p-6 border border-white/10 flex flex-col justify-between group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <GitBranch className="w-5 h-5 text-accent-cyan" />
                <span className="text-sm font-bold text-white">GitHub Contribution Frequency</span>
              </div>
              <span className="text-xs font-mono text-emerald-400">Continuous Integration</span>
            </div>

            {/* Heatmap Grid Visual */}
            <div className="grid grid-cols-12 gap-1.5 py-4">
              {Array.from({ length: 48 }).map((_, i) => {
                const intensity = Math.floor(Math.random() * 4);
                const bgColors = [
                  'bg-white/5',
                  'bg-accent-blue/30',
                  'bg-accent-purple/60',
                  'bg-accent-cyan shadow-[0_0_8px_#06b6d4]'
                ];
                return (
                  <div
                    key={i}
                    className={`h-4 rounded-sm ${bgColors[intensity]} hover:scale-125 transition-transform`}
                  />
                );
              })}
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-white/10 font-mono">
              <span>Less Activity</span>
              <div className="flex items-center gap-1">
                <div className="w-2.5 h-2.5 rounded-sm bg-white/5" />
                <div className="w-2.5 h-2.5 rounded-sm bg-accent-blue/30" />
                <div className="w-2.5 h-2.5 rounded-sm bg-accent-purple/60" />
                <div className="w-2.5 h-2.5 rounded-sm bg-accent-cyan" />
              </div>
              <span>High Activity</span>
            </div>
          </motion.div>

          {/* Card 5: AI & Multi-Agent Systems */}
          <motion.div
            whileHover={{ y: -5 }}
            onMouseEnter={() => soundFX.playHover()}
            className="md:col-span-2 glass-card rounded-3xl p-6 border border-white/10 flex flex-col justify-between group cursor-pointer"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-accent-pink/20 border border-accent-pink/40 flex items-center justify-center text-accent-pink mb-4 shadow-glow-pink">
                <Code className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Autonomous Systems & Engineering</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Specialized in multi-agent tool calling, vector database embeddings, and custom semantic search indexing for enterprise platforms.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-white/10 flex items-center gap-2 text-xs font-mono text-accent-cyan">
              <span>Managed via Admin Cockpit</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
