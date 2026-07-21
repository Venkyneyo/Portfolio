import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Code2, Server, Bot, Cloud } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Skill } from '../../types';
import { soundFX } from '../../utils/soundFX';

export const Skills: React.FC = () => {
  const { skills } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Frontend', 'Backend', 'AI & ML', 'Cloud & DevOps'];

  const filteredSkills =
    activeCategory === 'All'
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Frontend':
        return Code2;
      case 'Backend':
        return Server;
      case 'AI & ML':
        return Bot;
      case 'Cloud & DevOps':
        return Cloud;
      default:
        return Sparkles;
    }
  };

  return (
    <section id="skills" className="relative py-24 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-accent-blue/30 text-accent-cyan text-xs font-semibold uppercase tracking-wider mb-4 shadow-glow-blue"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Technical Mastery</span>
          </motion.div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Skills & <span className="text-gradient-blue-purple">Technology Stack</span>
          </h2>
          <p className="text-slate-400 text-base">
            Comprehensive proficiency in core languages, modern web frameworks, cloud infrastructure, and AI engineering.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-14">
          {categories.map((cat) => {
            const Icon = getCategoryIcon(cat);
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  soundFX.playClick();
                  setActiveCategory(cat);
                }}
                onMouseEnter={() => soundFX.playHover()}
                className={`relative px-5 py-2.5 rounded-xl font-medium text-xs sm:text-sm tracking-wide transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'text-white shadow-glow-purple'
                    : 'text-slate-400 hover:text-white glass-card border border-white/10 hover:border-white/20'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeSkillTab"
                    className="absolute inset-0 bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink rounded-xl -z-10"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <Icon className="w-4 h-4" />
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Cards Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill: Skill) => (
              <motion.div
                key={skill.id || skill.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -6, scale: 1.02 }}
                onMouseEnter={() => soundFX.playHover()}
                className="glass-card rounded-2xl p-6 border border-white/10 flex flex-col justify-between group cursor-pointer relative overflow-hidden"
              >
                {/* Glow Accent */}
                <div
                  className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl opacity-10 group-hover:opacity-30 transition-opacity"
                  style={{ backgroundColor: skill.color || '#3b82f6' }}
                />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-sm shadow-md"
                        style={{
                          backgroundColor: `${skill.color || '#3b82f6'}20`,
                          borderColor: `${skill.color || '#3b82f6'}50`,
                          borderWidth: '1px',
                          color: skill.color || '#3b82f6',
                        }}
                      >
                        {skill.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white group-hover:text-accent-cyan transition-colors">
                          {skill.name}
                        </h4>
                        <span className="text-[11px] font-mono text-slate-400">{skill.category}</span>
                      </div>
                    </div>

                    {/* Percentage Score Badge */}
                    <div className="font-mono text-sm font-bold text-slate-200 bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg">
                      {skill.level}%
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-6">
                    {skill.description}
                  </p>
                </div>

                {/* Animated Skill Progress Bar */}
                <div className="space-y-1.5 pt-4 border-t border-white/10">
                  <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${skill.color || '#3b82f6'}, #3b82f6)`,
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};
