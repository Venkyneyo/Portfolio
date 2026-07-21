import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, Sparkles, CheckCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { soundFX } from '../../utils/soundFX';

export const Experience: React.FC = () => {
  const { experiences } = useApp();

  return (
    <section id="experience" className="relative py-24 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-accent-cyan/30 text-accent-cyan text-xs font-semibold uppercase tracking-wider mb-4 shadow-glow-cyan"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Career Journey</span>
          </motion.div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Professional Experience & <span className="text-gradient-cyan-blue">Track Record</span>
          </h2>
          <p className="text-slate-400 text-base">
            Demonstrated engineering leadership driving high-impact technical initiatives across fast-growing tech companies.
          </p>
        </div>

        {/* Timeline Roadmap Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Glowing Line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-blue via-accent-purple to-accent-pink -translate-x-1/2 shadow-glow-purple" />

          <div className="space-y-12">
            {experiences.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  onMouseEnter={() => soundFX.playHover()}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Center Node */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#0B1026] border-2 border-accent-cyan flex items-center justify-center text-accent-cyan z-20 shadow-glow-cyan">
                    <span className="text-sm">{item.logo || '💼'}</span>
                  </div>

                  {/* Experience Card */}
                  <div className={`w-full sm:w-[calc(50%-2.5rem)] pl-12 sm:pl-0 ${isEven ? 'sm:text-right' : 'sm:text-left'}`}>
                    <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-accent-purple/40 transition-all duration-300 shadow-xl group cursor-pointer">
                      
                      <div className={`flex flex-wrap items-center gap-2 mb-2 ${isEven ? 'sm:justify-end' : 'sm:justify-start'}`}>
                        <span className="px-3 py-1 rounded-full bg-accent-blue/15 border border-accent-blue/30 text-accent-cyan text-xs font-mono font-semibold">
                          {item.period}
                        </span>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {item.location}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-white group-hover:text-accent-cyan transition-colors mb-1">
                        {item.role}
                      </h3>
                      <h4 className="text-sm font-semibold text-accent-violet mb-4">
                        {item.company}
                      </h4>

                      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                        {item.description}
                      </p>

                      {/* Key Achievements */}
                      {item.highlights && item.highlights.length > 0 && (
                        <div className="space-y-2 mb-6 text-left">
                          {item.highlights.map((h, hIdx) => (
                            <div key={hIdx} className="flex items-start gap-2 text-xs text-slate-300">
                              <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                              <span>{h}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Tech Stack Chips */}
                      {item.techStack && item.techStack.length > 0 && (
                        <div className={`flex flex-wrap gap-1.5 ${isEven ? 'sm:justify-end' : 'sm:justify-start'}`}>
                          {item.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-mono text-slate-400"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
