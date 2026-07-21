import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Sparkles, CheckCircle2, Database, Workflow, Layers } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { useApp } from '../../context/AppContext';
import { soundFX } from '../../utils/soundFX';

export const ProjectModal: React.FC = () => {
  const { selectedProject, closeProjectModal } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'database' | 'workflow'>('overview');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!selectedProject) return null;

  const project = selectedProject;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto backdrop-blur-xl bg-black/80">
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeProjectModal}
          className="fixed inset-0"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 40 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-5xl glass-panel rounded-3xl border border-white/20 overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col"
        >
          <button
            onClick={closeProjectModal}
            onMouseEnter={() => soundFX.playHover()}
            className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-[#050816]/80 border border-white/15 text-slate-300 hover:text-white hover:border-accent-pink transition-all cursor-pointer shadow-lg"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-950 flex-shrink-0">
            <img
              src={project.images[activeImageIndex] || project.coverImage}
              alt={project.title}
              className="w-full h-full object-cover transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1026] via-[#0B1026]/40 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              <div>
                <span className="px-3 py-1 rounded-full bg-accent-purple/30 border border-accent-purple/50 text-accent-cyan text-xs font-mono mb-2 inline-block shadow-glow-purple">
                  {project.category}
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {project.title}
                </h2>
                <p className="text-xs sm:text-sm font-mono text-accent-pink mt-1">{project.subtitle}</p>
              </div>

              {project.images.length > 1 && (
                <div className="flex items-center gap-2 bg-[#050816]/80 p-1.5 rounded-2xl border border-white/10 backdrop-blur-md">
                  {project.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        soundFX.playClick();
                        setActiveImageIndex(idx);
                      }}
                      className={`w-10 h-10 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        activeImageIndex === idx ? 'border-accent-cyan scale-105 shadow-glow-cyan' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 px-6 pt-4 border-b border-white/10 bg-[#0B1026]/80 flex-shrink-0 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview & Features', icon: Sparkles },
              { id: 'architecture', label: 'System Architecture', icon: Layers },
              { id: 'database', label: 'Database Schema', icon: Database },
              { id: 'workflow', label: 'Workflow Flowchart', icon: Workflow },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    soundFX.playClick();
                    setActiveTab(tab.id as typeof activeTab);
                  }}
                  onMouseEnter={() => soundFX.playHover()}
                  className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'border-accent-cyan text-accent-cyan'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">

            {activeTab === 'overview' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                
                <div>
                  <h3 className="text-xs font-mono tracking-wider text-slate-400 uppercase mb-4">
                    Performance Telemetry & Audit Scores
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <ScoreRing label="Performance" score={project.stats.performance} color="#3B82F6" />
                    <ScoreRing label="SEO Rank" score={project.stats.seo} color="#8B5CF6" />
                    <ScoreRing label="Best Practices" score={project.stats.bestPractices} color="#06B6D4" />
                    <ScoreRing label="Accessibility" score={project.stats.accessibility} color="#EC4899" />
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-mono tracking-wider text-slate-400 uppercase mb-3">
                    Project Architecture & Deep-Dive
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed bg-white/5 p-5 rounded-2xl border border-white/10">
                    {project.longDescription}
                  </p>
                </div>

                <div>
                  <h3 className="text-xs font-mono tracking-wider text-slate-400 uppercase mb-4">
                    Core Technical Features
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {project.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10">
                        <CheckCircle2 className="w-5 h-5 text-accent-cyan flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-slate-200 leading-normal">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-mono tracking-wider text-slate-400 uppercase mb-3">
                    Engineered With
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 rounded-xl bg-accent-purple/15 border border-accent-purple/30 text-accent-cyan text-xs font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

              </motion.div>
            )}

            {activeTab === 'architecture' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <h3 className="text-xs font-mono tracking-wider text-slate-400 uppercase">
                  End-to-End System Node Topology
                </h3>
                <div className="p-6 rounded-2xl bg-[#050816] border border-accent-blue/30 space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {project.architectureDiagram.nodes.map((node) => (
                      <div
                        key={node.id}
                        className="p-4 rounded-xl glass-card border border-white/15 hover:border-accent-cyan transition-colors"
                      >
                        <div className="text-xs font-mono text-accent-pink uppercase mb-1">{node.type}</div>
                        <div className="text-sm font-bold text-white">{node.label}</div>
                        {node.subtext && <div className="text-xs text-slate-400 mt-1">{node.subtext}</div>}
                      </div>
                    ))}
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <h4 className="text-xs font-mono text-accent-cyan mb-2">Inter-Service Connections & Data Protocol</h4>
                    <div className="space-y-2">
                      {project.architectureDiagram.connections.map((conn, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs text-slate-300 font-mono">
                          <span>Node #{conn.from} → Node #{conn.to}</span>
                          <span className="px-2 py-0.5 rounded bg-accent-purple/20 text-accent-violet">{conn.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'database' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <h3 className="text-xs font-mono tracking-wider text-slate-400 uppercase">
                  PostgreSQL & Distributed Ledger Data Model
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.databaseDiagram.tables.map((table, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-[#050816] border border-white/15">
                      <div className="flex items-center gap-2 text-sm font-bold text-accent-cyan border-b border-white/10 pb-2 mb-3">
                        <Database className="w-4 h-4" />
                        <span>table: {table.name}</span>
                      </div>
                      <ul className="space-y-1.5 font-mono text-xs text-slate-300">
                        {table.columns.map((col, cIdx) => (
                          <li key={cIdx} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent-pink" />
                            <span>{col}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'workflow' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <h3 className="text-xs font-mono tracking-wider text-slate-400 uppercase">
                  Sequential Execution Flow
                </h3>
                <div className="space-y-4">
                  {project.workflowDiagram.steps.map((s) => (
                    <div key={s.step} className="flex items-start gap-4 p-4 rounded-xl glass-card border border-white/10">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center font-bold text-white text-xs shadow-glow-blue flex-shrink-0">
                        {s.step}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white mb-1">{s.title}</h4>
                        <p className="text-xs text-slate-300">{s.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

          </div>

          <div className="p-6 border-t border-white/10 bg-[#0B1026] flex flex-col sm:flex-row items-center justify-between gap-4 flex-shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Deployed Version: <span className="font-mono text-white">v2.4.0-release</span></span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFX.playClick()}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-xl glass-card border border-white/15 text-slate-200 hover:text-white font-semibold text-xs transition-all"
              >
                <GithubIcon className="w-4 h-4" />
                <span>💻 View Source Code</span>
              </a>

              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFX.playSwoosh()}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink text-white font-bold text-xs shadow-glow-purple hover:scale-105 transition-all cursor-pointer"
              >
                <ExternalLink className="w-4 h-4" />
                <span>🚀 Launch Live Project</span>
              </a>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const ScoreRing: React.FC<{ label: string; score: number; color: string }> = ({ label, score, color }) => {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center">
      <div className="relative w-16 h-16 mb-2 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="32"
            cy="32"
            r={radius}
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="5"
            fill="transparent"
          />
          <circle
            cx="32"
            cy="32"
            r={radius}
            stroke={color}
            strokeWidth="5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>
        <span className="absolute font-mono text-sm font-extrabold text-white">{score}</span>
      </div>
      <span className="text-[11px] font-mono text-slate-300">{label}</span>
    </div>
  );
};
