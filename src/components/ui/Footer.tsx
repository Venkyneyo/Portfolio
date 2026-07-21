import React from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowUp, Code2, Heart } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from './SocialIcons';
import { useApp } from '../../context/AppContext';
import { soundFX } from '../../utils/soundFX';

export const Footer: React.FC = () => {
  const { profile } = useApp();

  const scrollToTop = () => {
    soundFX.playSwoosh();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socials = [
    { name: 'GitHub', icon: GithubIcon, href: profile.githubUrl || 'https://github.com', color: 'hover:text-accent-cyan' },
    { name: 'LinkedIn', icon: LinkedinIcon, href: profile.linkedinUrl || 'https://linkedin.com', color: 'hover:text-accent-blue' },
    { name: 'Twitter', icon: TwitterIcon, href: profile.twitterUrl || 'https://twitter.com', color: 'hover:text-accent-violet' },
    { name: 'Email', icon: Mail, href: `mailto:${profile.email}`, color: 'hover:text-accent-pink' },
  ];

  return (
    <footer className="relative border-t border-white/10 bg-[#050816] pt-16 pb-12 overflow-hidden z-10">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[40rem] h-40 bg-accent-blue/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-white/10">
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-blue via-accent-purple to-accent-pink p-[1px]">
                <div className="w-full h-full bg-[#0B1026] rounded-[7px] flex items-center justify-center">
                  <Code2 className="w-4 h-4 text-accent-cyan" />
                </div>
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white uppercase">
                {profile.brandName || profile.fullName}
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm">
              {profile.bio}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={() => soundFX.playHover()}
                  onClick={() => soundFX.playClick()}
                  className={`p-3 rounded-xl glass-card border border-white/10 text-slate-300 ${social.color} transition-all duration-300 shadow-md cursor-pointer`}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              );
            })}
          </div>

          <motion.button
            onClick={scrollToTop}
            onMouseEnter={() => soundFX.playHover()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass-card border border-accent-purple/30 text-accent-cyan hover:text-white hover:border-accent-purple transition-all duration-300 cursor-pointer shadow-glow-purple"
          >
            <span className="text-xs font-semibold tracking-wide">Back to Top</span>
            <ArrowUp className="w-4 h-4 text-accent-pink animate-bounce" />
          </motion.button>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} {profile.fullName}. Managed dynamically via Admin Cockpit.</p>
          <div className="flex items-center gap-1.5 text-slate-400">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-accent-pink fill-accent-pink animate-pulse" />
            <span>& Dynamic Database Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
