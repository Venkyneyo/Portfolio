import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Volume2, VolumeX, MousePointer, ShieldCheck, Menu, X, Sparkles, Code2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { soundFX } from '../../utils/soundFX';

export const Navbar: React.FC = () => {
  const { soundEnabled, toggleSound, customCursorEnabled, toggleCursor, toggleAdmin, isAdminOpen, profile } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'education', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Credentials', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Top Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-accent-blue via-accent-violet to-accent-pink z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Floating Glass Navbar */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? 'glass-nav py-3 shadow-2xl' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <a
              href="#hero"
              onMouseEnter={() => soundFX.playHover()}
              onClick={() => soundFX.playClick()}
              className="flex items-center gap-2 group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-blue via-accent-purple to-accent-pink p-[1px] shadow-glow-purple group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full bg-[#0B1026] rounded-[11px] flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-accent-cyan group-hover:rotate-12 transition-transform duration-300" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg tracking-tight text-white group-hover:text-accent-cyan transition-colors uppercase">
                  {profile.brandName || profile.fullName}
                </span>
                <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase truncate max-w-[140px]">
                  {profile.roleTitle || profile.fullName}
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-md">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onMouseEnter={() => soundFX.playHover()}
                    onClick={() => soundFX.playClick()}
                    className={`relative px-4 py-1.5 text-sm font-medium transition-colors duration-200 rounded-full ${
                      isActive ? 'text-white font-semibold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute inset-0 bg-gradient-to-r from-accent-blue/30 to-accent-purple/30 rounded-full border border-accent-blue/40 -z-10 shadow-glow-blue"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    {link.name}
                  </a>
                );
              })}
            </nav>

            {/* Quick Settings & Admin CTA */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Sound Toggle */}
              <button
                onClick={toggleSound}
                onMouseEnter={() => soundFX.playHover()}
                title={soundEnabled ? 'Disable UI Audio' : 'Enable UI Audio'}
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-accent-purple/40 text-slate-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-accent-cyan" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
              </button>

              {/* Cursor Glow Toggle */}
              <button
                onClick={toggleCursor}
                onMouseEnter={() => soundFX.playHover()}
                title={customCursorEnabled ? 'Disable Neon Cursor' : 'Enable Neon Cursor'}
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-accent-purple/40 text-slate-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
              >
                <MousePointer className={`w-4 h-4 ${customCursorEnabled ? 'text-accent-pink' : 'text-slate-500'}`} />
              </button>

              {/* Admin Dashboard Switcher */}
              <button
                onClick={toggleAdmin}
                onMouseEnter={() => soundFX.playHover()}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-xs tracking-wide transition-all shadow-lg cursor-pointer ${
                  isAdminOpen
                    ? 'bg-gradient-to-r from-accent-pink to-accent-violet text-white shadow-glow-pink'
                    : 'bg-white/5 border border-accent-purple/40 text-accent-cyan hover:bg-accent-purple/20 hover:border-accent-purple shadow-glow-purple'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{isAdminOpen ? 'Back to Portfolio' : 'Admin Cockpit'}</span>
                <Sparkles className="w-3 h-3 animate-pulse text-amber-300" />
              </button>
            </div>

            {/* Mobile Menu Trigger */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={toggleAdmin}
                className="p-2 rounded-lg bg-accent-purple/20 border border-accent-purple/40 text-accent-cyan text-xs font-semibold flex items-center gap-1"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Admin</span>
              </button>
              <button
                onClick={() => {
                  soundFX.playClick();
                  setMobileMenuOpen(!mobileMenuOpen);
                }}
                className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-200"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-panel border-b border-white/10 px-6 py-6 mt-2"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => {
                    soundFX.playClick();
                    setMobileMenuOpen(false);
                  }}
                  className="text-slate-300 hover:text-accent-cyan text-base font-medium py-1"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-slate-400">Audio FX</span>
                <button
                  onClick={toggleSound}
                  className="px-3 py-1.5 rounded-lg bg-white/5 text-xs text-accent-cyan flex items-center gap-1.5"
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  <span>{soundEnabled ? 'ON' : 'OFF'}</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </motion.header>
    </>
  );
};
