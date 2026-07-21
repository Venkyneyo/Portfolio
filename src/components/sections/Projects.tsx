import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Sparkles, Layers, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from '../ui/SocialIcons';
import { useApp } from '../../context/AppContext';
import { Project, ProjectCategory } from '../../types';
import { soundFX } from '../../utils/soundFX';

export const Projects: React.FC = () => {
  const { projects, openProjectModal } = useApp();
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');

  const categories: ProjectCategory[] = [
    'All',
    'AI Platforms',
    'Full-Stack SaaS',
    'Cloud Architecture',
    'Mobile & Web3',
  ];

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="relative py-24 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-accent-pink/30 text-accent-pink text-xs font-semibold uppercase tracking-wider mb-4 shadow-glow-pink"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Featured Portfolio Works</span>
          </motion.div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Production-Ready <span className="text-gradient-purple-pink">SaaS & Enterprise Apps</span>
          </h2>
          <p className="text-slate-400 text-base">
            Click on any project to explore interactive architecture diagrams, database schemas, Lighthouse scores, and live demo links.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-14">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  soundFX.playClick();
                  setActiveCategory(cat);
                }}
                onMouseEnter={() => soundFX.playHover()}
                className={`relative px-5 py-2.5 rounded-xl font-medium text-xs sm:text-sm tracking-wide transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'text-white shadow-glow-pink'
                    : 'text-slate-400 hover:text-white glass-card border border-white/10 hover:border-white/20'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeProjectTab"
                    className="absolute inset-0 bg-gradient-to-r from-accent-purple via-accent-violet to-accent-pink rounded-xl -z-10"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project: Project) => (
              <ProjectCard key={project.id} project={project} onOpenModal={openProjectModal} />
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};

interface ProjectCardProps {
  project: Project;
  onOpenModal: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenModal }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotateX(-y / 25);
    setRotateY(x / 25);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      className="perspective-1000"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ rotateX, rotateY }}
        transition={{ type: 'spring', stiffness: 250, damping: 20 }}
        onClick={() => onOpenModal(project)}
        onMouseEnter={() => soundFX.playHover()}
        className="glass-card rounded-3xl border border-white/10 overflow-hidden transform-style-3d group cursor-pointer hover:border-accent-purple/50 transition-all duration-300 shadow-2xl relative"
      >
        <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink opacity-0 group-hover:opacity-30 blur-md transition-opacity pointer-events-none -z-10" />

        <div className="relative h-64 overflow-hidden bg-slate-900">
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1026] via-[#0B1026]/60 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

          <div className="absolute top-4 left-4 z-10">
            <span className="px-3.5 py-1.5 rounded-full bg-[#050816]/80 backdrop-blur-md border border-white/15 text-accent-cyan text-xs font-semibold shadow-lg">
              {project.category}
            </span>
          </div>

          {project.featured && (
            <div className="absolute top-4 right-4 z-10 flex items-center gap-1 px-3 py-1.5 rounded-full bg-accent-pink/80 backdrop-blur-md text-white text-xs font-bold shadow-glow-pink">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Featured</span>
            </div>
          )}

          <div className="absolute inset-x-0 bottom-4 px-6 z-20 transform translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-accent-cyan bg-[#050816]/90 backdrop-blur-md border border-accent-cyan/40 px-3.5 py-2 rounded-xl shadow-glow-cyan">
              <Layers className="w-4 h-4" /> Deep Dive & Architecture
            </span>

            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Launch Live Project"
                onClick={() => soundFX.playSwoosh()}
                className="p-2.5 rounded-xl bg-accent-blue hover:bg-blue-600 text-white shadow-glow-blue transition-all"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="View Source Code"
                onClick={() => soundFX.playClick()}
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all flex items-center justify-center"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-white group-hover:text-accent-cyan transition-colors flex items-center gap-2">
              <span>{project.title}</span>
              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-accent-pink" />
            </h3>
          </div>
          <p className="text-xs font-mono text-accent-violet mb-3">{project.subtitle}</p>
          <p className="text-slate-300 text-xs leading-relaxed mb-5 line-clamp-2">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 5).map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300 group-hover:border-accent-purple/30 transition-colors"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 5 && (
              <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-mono text-slate-400">
                +{project.tags.length - 5}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
