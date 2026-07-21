import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Sparkles, CheckCircle2, MapPin, Download } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '../ui/SocialIcons';
import { useApp } from '../../context/AppContext';
import { soundFX } from '../../utils/soundFX';

export const Contact: React.FC = () => {
  const { profile, submitContactMessage } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFX.playClick();
    setIsSubmitting(true);

    submitContactMessage({
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message
    })
      .then(() => {
        setIsSubmitting(false);
        setSubmitted(true);
        soundFX.playSwoosh();

        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });

        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      })
      .catch((err) => {
        console.error('Failed to submit message:', err);
        setIsSubmitting(false);
      });
  };

  return (
    <section id="contact" className="relative py-24 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-accent-pink/30 text-accent-pink text-xs font-semibold uppercase tracking-wider mb-4 shadow-glow-pink"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Initiate Collaboration</span>
          </motion.div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Let's Build Something <span className="text-gradient-purple-pink">Exceptional</span>
          </h2>
          <p className="text-slate-400 text-base">
            Have a project in mind, senior architectural opening, or consulting inquiry? Send a direct message below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          
          <div className="lg:col-span-5 space-y-6">
            
            <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-6">
              <h3 className="text-xl font-bold text-white mb-2">Direct Channels</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Feel free to reach out via email or connect directly on social platforms. Response time within 2-4 hours.
              </p>

              <div className="space-y-4">
                <a
                  href={`mailto:${profile.email}`}
                  onMouseEnter={() => soundFX.playHover()}
                  onClick={() => soundFX.playClick()}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-accent-cyan transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent-blue/20 flex items-center justify-center text-accent-cyan shadow-glow-blue">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400">EMAIL ADDRESS</div>
                    <div className="text-sm font-bold text-white group-hover:text-accent-cyan transition-colors">
                      {profile.email}
                    </div>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="w-10 h-10 rounded-xl bg-accent-purple/20 flex items-center justify-center text-accent-violet shadow-glow-purple">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400">LOCATION & AVAILABILITY</div>
                    <div className="text-sm font-bold text-white">{profile.location}</div>
                  </div>
                </div>

                {profile.resumeUrl && (
                  <a
                    href={profile.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => soundFX.playHover()}
                    onClick={() => soundFX.playClick()}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-accent-pink transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-accent-pink/20 flex items-center justify-center text-accent-pink shadow-glow-pink">
                      <Download className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[11px] font-mono text-slate-400">OFFICIAL RESUME / CV</div>
                      <div className="text-sm font-bold text-white group-hover:text-accent-pink transition-colors">
                        Download PDF Document
                      </div>
                    </div>
                  </a>
                )}
              </div>
            </div>

            <div className="glass-card rounded-3xl p-6 border border-white/10">
              <h4 className="text-sm font-bold text-white mb-4">Connect on Networks</h4>
              <div className="grid grid-cols-3 gap-3">
                {profile.githubUrl && (
                  <a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => soundFX.playHover()}
                    onClick={() => soundFX.playClick()}
                    className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-accent-purple/50 text-slate-300 hover:text-white transition-all"
                  >
                    <GithubIcon className="w-5 h-5 mb-1 text-accent-cyan" />
                    <span className="text-[11px] font-mono">GitHub</span>
                  </a>
                )}
                {profile.linkedinUrl && (
                  <a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => soundFX.playHover()}
                    onClick={() => soundFX.playClick()}
                    className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-accent-blue/50 text-slate-300 hover:text-white transition-all"
                  >
                    <LinkedinIcon className="w-5 h-5 mb-1 text-accent-blue" />
                    <span className="text-[11px] font-mono">LinkedIn</span>
                  </a>
                )}
                {profile.twitterUrl && (
                  <a
                    href={profile.twitterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => soundFX.playHover()}
                    onClick={() => soundFX.playClick()}
                    className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-accent-pink/50 text-slate-300 hover:text-white transition-all"
                  >
                    <TwitterIcon className="w-5 h-5 mb-1 text-accent-pink" />
                    <span className="text-[11px] font-mono">Twitter</span>
                  </a>
                )}
              </div>
            </div>

          </div>

          <div className="lg:col-span-7">
            <div className="glass-card rounded-3xl p-8 border border-white/15 shadow-2xl relative">
              
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 flex flex-col items-center text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shadow-glow-cyan">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Message Transmitted Successfully!</h3>
                  <p className="text-slate-300 text-sm max-w-md">
                    Thank you for reaching out. Your inquiry has been received into the queue and will be replied to shortly.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-2">YOUR NAME *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Sarah Connor"
                        className="w-full px-4 py-3 rounded-xl bg-[#050816]/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan transition-all text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-2">EMAIL ADDRESS *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="sarah@enterprise.io"
                        className="w-full px-4 py-3 rounded-xl bg-[#050816]/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan transition-all text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-2">SUBJECT / PROJECT TYPE *</label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Lead AI Engineer Role / Multi-Tenant SaaS Architecture"
                      className="w-full px-4 py-3 rounded-xl bg-[#050816]/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan transition-all text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-2">MESSAGE *</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your requirements, timeline, or position details..."
                      className="w-full px-4 py-3 rounded-xl bg-[#050816]/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan transition-all text-sm resize-none"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onMouseEnter={() => soundFX.playHover()}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink text-white font-bold text-sm tracking-wide shadow-glow-purple hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
