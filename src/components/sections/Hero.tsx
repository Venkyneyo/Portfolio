import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal, Sparkles, Download, Cpu, Globe } from 'lucide-react';
import { StatCounter } from '../ui/StatCounter';
import { useApp } from '../../context/AppContext';
import { soundFX } from '../../utils/soundFX';

export const Hero: React.FC = () => {
  const { profile } = useApp();
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = profile.roles && profile.roles.length > 0 ? profile.roles : ['Software Engineer'];

  // Typing Effect Engine
  useEffect(() => {
    const currentRole = roles[roleIndex % roles.length];
    let timer: ReturnType<typeof setTimeout>;

    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }, 35);
    } else {
      timer = setTimeout(() => {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
        if (displayText === currentRole) {
          timer = setTimeout(() => setIsDeleting(true), 2000);
        }
      }, 70);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex, roles]);

  // 3D Tilt Card Motion Logic
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotateX(-y / 15);
    setRotateY(x / 15);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-card border border-accent-cyan/30 mb-6 shadow-glow-cyan"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-xs font-semibold tracking-wide text-slate-200">
                {profile.availability || 'Available for Hire & Consulting'}
              </span>
            </motion.div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
              {profile.heroHeadline1 || 'Engineering'} <br />
              <span className="text-gradient-blue-purple drop-shadow-lg">
                {profile.heroHeadlineGradient1 || 'Next-Gen SaaS'}
              </span>{' '}
              & <br />
              <span className="text-gradient-cyan-blue">
                {profile.heroHeadline2 || 'Intelligent Systems'}
              </span>
            </h1>

            {/* Kinetic Typing Line */}
            <div className="h-10 flex items-center gap-2 font-mono text-base sm:text-xl text-accent-cyan mb-8">
              <Terminal className="w-5 h-5 text-accent-pink animate-pulse" />
              <span>{displayText}</span>
              <span className="w-2 h-5 bg-accent-cyan animate-pulse inline-block" />
            </div>

            {/* Description Subtext */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mb-10">
              {profile.bio}
            </p>

            {/* Magnetic CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-12">
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => soundFX.playHover()}
                onClick={() => soundFX.playClick()}
                className="flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink text-white font-bold text-sm shadow-glow-purple transition-all duration-300 cursor-pointer group"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.a>

              {profile.resumeUrl && (
                <motion.a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={() => soundFX.playHover()}
                  onClick={() => soundFX.playClick()}
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl glass-card border border-white/15 text-slate-200 hover:text-white font-semibold text-sm hover:border-accent-cyan/50 transition-all duration-300 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-accent-cyan" />
                  <span>Resume</span>
                </motion.a>
              )}
            </div>

            {/* Stats Counter Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-white/10 w-full">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white text-gradient-blue-purple">
                  <StatCounter value={profile.yearsExperience || 0} suffix="+" />
                </div>
                <div className="text-xs text-slate-400 font-medium mt-1">Years Experience</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white text-gradient-cyan-blue">
                  <StatCounter value={profile.shippedProjects || 0} suffix="+" />
                </div>
                <div className="text-xs text-slate-400 font-medium mt-1">Shipped Projects</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white text-gradient-purple-pink">
                  <StatCounter value={profile.uptimePercentage || 99.9} suffix="%" />
                </div>
                <div className="text-xs text-slate-400 font-medium mt-1">Uptime & Coverage</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white text-gradient-blue-purple">
                  <StatCounter
                    value={parseInt(profile.activeUsers) || 100}
                    suffix={(profile.activeUsers || '100k+').replace(/^[0-9]+/, '') || 'k+'}
                  />
                </div>
                <div className="text-xs text-slate-400 font-medium mt-1">Active End Users</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Profile Image & 3D Interactive Card Visualizer */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col items-center justify-center perspective-1000 gap-6"
          >
            {/* Profile Avatar Frame */}
            {profile.profileImage && (
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="relative w-44 h-44 rounded-3xl p-[2px] bg-gradient-to-br from-accent-blue via-accent-purple to-accent-pink shadow-glow-purple"
              >
                <img
                  src={profile.profileImage}
                  alt={profile.fullName}
                  className="w-full h-full object-cover rounded-[22px] border border-slate-900"
                />
              </motion.div>
            )}

            <motion.div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              animate={{ rotateX, rotateY }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="relative w-full max-w-md glass-card rounded-3xl p-6 border border-white/15 shadow-2xl transform-style-3d cursor-pointer group"
            >
              {/* Glowing Top Bar */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-xs font-mono text-slate-400">system_kernel.ts</span>
              </div>

              {/* Code Visual Snippet Card */}
              <div className="space-y-4 font-mono text-xs text-slate-300">
                <div className="p-4 rounded-xl bg-[#050816]/90 border border-accent-blue/30 shadow-inner space-y-2">
                  <div className="flex items-center justify-between text-accent-pink">
                    <span>const profileConfig = &#123;</span>
                    <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
                  </div>
                  <div className="pl-4 text-slate-400">
                    engineer: <span className="text-accent-cyan">'{profile.fullName}'</span>,
                  </div>
                  <div className="pl-4 text-slate-400">
                    role: <span className="text-accent-violet">'{profile.roleTitle}'</span>,
                  </div>
                  <div className="pl-4 text-slate-400">
                    status: <span className="text-emerald-400">'Active & Verified'</span>,
                  </div>
                  <div className="text-accent-pink">&#125;;</div>
                </div>

                {/* Micro Live Metrics */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                    <Cpu className="w-5 h-5 text-accent-blue" />
                    <div>
                      <div className="text-[10px] text-slate-400">Location</div>
                      <div className="text-xs font-bold text-white truncate max-w-[120px]">{profile.location}</div>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                    <Globe className="w-5 h-5 text-accent-cyan" />
                    <div>
                      <div className="text-[10px] text-slate-400">Global Edge CDN</div>
                      <div className="text-xs font-bold text-white">Active</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Glowing Card Highlight */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink opacity-20 group-hover:opacity-40 blur-xl transition-opacity -z-10" />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
