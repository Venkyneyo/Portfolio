import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Trophy, Sparkles, ExternalLink, CheckCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { soundFX } from '../../utils/soundFX';

export const EducationCertifications: React.FC = () => {
  const { education, certifications, achievements } = useApp();

  return (
    <section id="education" className="relative py-24 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-accent-purple/30 text-accent-pink text-xs font-semibold uppercase tracking-wider mb-4 shadow-glow-pink"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Credentials & Recognition</span>
          </motion.div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Education, <span className="text-gradient-purple-pink">Certifications</span> & Awards
          </h2>
          <p className="text-slate-400 text-base">
            Academic degrees, professional industry certifications, and hackathon accomplishments.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Column 1: Education */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-accent-blue/20 border border-accent-blue/40 flex items-center justify-center text-accent-cyan shadow-glow-blue">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Education</h3>
                <span className="text-xs font-mono text-slate-400">Degrees & Academics</span>
              </div>
            </div>

            <div className="space-y-4">
              {education.map((edu) => (
                <motion.div
                  key={edu.id}
                  whileHover={{ y: -4 }}
                  onMouseEnter={() => soundFX.playHover()}
                  className="glass-card rounded-2xl p-6 border border-white/10 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-md bg-accent-blue/15 text-accent-cyan text-[11px] font-mono font-semibold">
                      {edu.period}
                    </span>
                    {edu.grade && (
                      <span className="text-xs font-mono font-bold text-emerald-400">
                        {edu.grade}
                      </span>
                    )}
                  </div>
                  <h4 className="text-base font-bold text-white leading-snug">{edu.degree}</h4>
                  <div className="text-xs font-semibold text-accent-violet">{edu.institution} • {edu.location}</div>
                  <p className="text-xs text-slate-300 leading-relaxed">{edu.description}</p>
                  
                  {edu.highlights && edu.highlights.length > 0 && (
                    <div className="pt-2 space-y-1">
                      {edu.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-[11px] text-slate-400">
                          <CheckCircle className="w-3 h-3 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Column 2: Certifications */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-accent-purple/20 border border-accent-purple/40 flex items-center justify-center text-accent-violet shadow-glow-purple">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Certifications</h3>
                <span className="text-xs font-mono text-slate-400">Industry Credentials</span>
              </div>
            </div>

            <div className="space-y-4">
              {certifications.map((cert) => (
                <motion.div
                  key={cert.id}
                  whileHover={{ y: -4 }}
                  onMouseEnter={() => soundFX.playHover()}
                  className="glass-card rounded-2xl p-6 border border-white/10 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-accent-pink">{cert.issuer}</span>
                    <span className="text-[11px] font-mono text-slate-400">{cert.issueDate}</span>
                  </div>
                  <h4 className="text-base font-bold text-white leading-snug">{cert.title}</h4>
                  {cert.credentialId && (
                    <div className="text-[11px] font-mono text-slate-400">ID: {cert.credentialId}</div>
                  )}
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-accent-cyan hover:underline font-semibold pt-1"
                    >
                      <span>Verify Credential</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Column 3: Achievements & Honors */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-accent-pink/20 border border-accent-pink/40 flex items-center justify-center text-accent-pink shadow-glow-pink">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Achievements</h3>
                <span className="text-xs font-mono text-slate-400">Awards & Metrics</span>
              </div>
            </div>

            <div className="space-y-4">
              {achievements.map((ach) => (
                <motion.div
                  key={ach.id}
                  whileHover={{ y: -4 }}
                  onMouseEnter={() => soundFX.playHover()}
                  className="glass-card rounded-2xl p-6 border border-white/10 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-accent-cyan">{ach.organization}</span>
                    <span className="text-[11px] font-mono text-slate-400">{ach.date}</span>
                  </div>
                  <h4 className="text-base font-bold text-white leading-snug">{ach.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{ach.description}</p>
                  {ach.metric && (
                    <div className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
                      {ach.metric}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
