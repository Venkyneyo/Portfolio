import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, Sparkles } from 'lucide-react';
import { testimonialsData } from '../../data/testimonialsData';
import { soundFX } from '../../utils/soundFX';

export const Testimonials: React.FC = () => {
  return (
    <section className="relative py-24 z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-accent-purple/30 text-accent-violet text-xs font-semibold uppercase tracking-wider mb-4 shadow-glow-purple"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Endorsements & Feedback</span>
          </motion.div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Recommended by <span className="text-gradient-purple-pink">Engineering Leaders</span>
          </h2>
          <p className="text-slate-400 text-base">
            What executives, co-founders, and product leaders say about working together.
          </p>
        </div>
      </div>

      {/* Marquee Row */}
      <div className="relative w-full overflow-hidden flex gap-6 py-4">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
          className="flex gap-6 flex-shrink-0"
        >
          {[...testimonialsData, ...testimonialsData].map((t, idx) => (
            <div
              key={`${t.id}-${idx}`}
              onMouseEnter={() => soundFX.playHover()}
              className="w-80 sm:w-96 glass-card rounded-3xl p-6 border border-white/10 flex flex-col justify-between flex-shrink-0 group hover:border-accent-purple/40 transition-all duration-300 shadow-xl cursor-pointer"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-4 text-amber-400">
                  {Array.from({ length: t.rating }).map((_, rIdx) => (
                    <Star key={rIdx} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 italic">
                  "{t.text}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-accent-cyan shadow-glow-cyan"
                />
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-accent-cyan transition-colors">
                    {t.name}
                  </h4>
                  <p className="text-[11px] text-slate-400">{t.role} • {t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

    </section>
  );
};
