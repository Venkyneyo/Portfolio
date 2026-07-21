import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2 } from 'lucide-react';
import { AppProvider, useApp } from './context/AppContext';
import { CanvasBackground } from './components/background/CanvasBackground';
import { CustomCursor } from './components/ui/CustomCursor';
import { Navbar } from './components/ui/Navbar';
import { Footer } from './components/ui/Footer';
import { ProjectModal } from './components/ui/ProjectModal';
import { Hero } from './components/sections/Hero';
import { BentoAbout } from './components/sections/BentoAbout';
import { Skills } from './components/sections/Skills';
import { Projects } from './components/sections/Projects';
import { Experience } from './components/sections/Experience';
import { EducationCertifications } from './components/sections/EducationCertifications';
import { Testimonials } from './components/sections/Testimonials';
import { Contact } from './components/sections/Contact';
import { AdminLayout } from './components/admin/AdminLayout';

const MainAppContent: React.FC = () => {
  const { isAdminOpen, profile } = useApp();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // Initial Loading Screen Animation Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 400);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* 1. Initial Loading Screen */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-[#050816] flex flex-col items-center justify-center p-6 text-center"
          >
            {/* Animated Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-blue via-accent-purple to-accent-pink p-[1px] shadow-glow-purple mb-8"
            >
              <div className="w-full h-full bg-[#0B1026] rounded-[15px] flex items-center justify-center">
                <Code2 className="w-8 h-8 text-accent-cyan animate-pulse" />
              </div>
            </motion.div>

            {/* Title */}
            <h2 className="text-2xl font-extrabold text-white tracking-tight mb-2 uppercase">
              {profile.brandName || profile.fullName || 'PORTFOLIO'}
            </h2>
            <p className="text-xs font-mono text-slate-400 mb-8 tracking-widest uppercase">
              Initializing Kernel & Shader Engine...
            </p>

            {/* Progress Bar Container */}
            <div className="w-64 h-2 rounded-full bg-white/10 overflow-hidden relative mb-4">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink shadow-glow-purple"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Percentage Indicator */}
            <span className="font-mono text-sm font-bold text-accent-cyan">
              {progress}%
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Admin Dashboard View vs Public Portfolio View */}
      {isAdminOpen ? (
        <AdminLayout />
      ) : (
        <div className="relative min-h-screen bg-[#050816] text-slate-100 overflow-x-hidden selection:bg-accent-purple/30 selection:text-accent-cyan">
          
          {/* Custom Cursor Tracer */}
          <CustomCursor />

          {/* Interactive Background Engine */}
          <CanvasBackground />

          {/* Sticky Navigation Bar */}
          <Navbar />

          {/* Public Portfolio Sections */}
          <main className="relative z-10">
            <Hero />
            <BentoAbout />
            <Skills />
            <Projects />
            <Experience />
            <EducationCertifications />
            <Testimonials />
            <Contact />
          </main>

          {/* Detailed Project Deep-Dive Modal */}
          <ProjectModal />

          {/* Footer */}
          <Footer />

        </div>
      )}
    </>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}

export default App;
