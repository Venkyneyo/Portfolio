import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  DatabaseState,
  ProfileSettings,
  Project,
  Skill,
  ExperienceItem,
  EducationItem,
  CertificationItem,
  AchievementItem,
  MessageItem
} from '../types';
import { storageService } from '../utils/storageService';
import { soundFX } from '../utils/soundFX';

interface AppContextType {
  soundEnabled: boolean;
  toggleSound: () => void;
  customCursorEnabled: boolean;
  toggleCursor: () => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  toggleAdmin: () => void;
  selectedProject: Project | null;
  openProjectModal: (project: Project) => void;
  closeProjectModal: () => void;

  // Reactive Database Collections
  db: DatabaseState;
  profile: ProfileSettings;
  projects: Project[];
  skills: Skill[];
  experiences: ExperienceItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
  achievements: AchievementItem[];
  messages: MessageItem[];

  // Profile CRUD
  updateProfile: (updated: Partial<ProfileSettings>) => void;

  // Projects CRUD
  addProject: (project: Project) => void;
  updateProject: (project: Project) => void;
  deleteProject: (id: string) => void;

  // Skills CRUD
  addSkill: (skill: Skill) => void;
  updateSkill: (skill: Skill) => void;
  deleteSkill: (id: string) => void;

  // Experience CRUD
  addExperience: (exp: ExperienceItem) => void;
  updateExperience: (exp: ExperienceItem) => void;
  deleteExperience: (id: string) => void;

  // Education CRUD
  addEducation: (edu: EducationItem) => void;
  updateEducation: (edu: EducationItem) => void;
  deleteEducation: (id: string) => void;

  // Certifications CRUD
  addCertification: (cert: CertificationItem) => void;
  updateCertification: (cert: CertificationItem) => void;
  deleteCertification: (id: string) => void;

  // Achievements CRUD
  addAchievement: (ach: AchievementItem) => void;
  updateAchievement: (ach: AchievementItem) => void;
  deleteAchievement: (id: string) => void;

  // Messages CRUD
  markMessageRead: (id: string) => void;
  deleteMessage: (id: string) => void;

  // DB Backup Tools
  exportDatabase: () => void;
  importDatabase: (importedDb: DatabaseState) => void;
  resetDatabase: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [customCursorEnabled, setCustomCursorEnabled] = useState<boolean>(true);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Initialize DB from persistent storage
  const [db, setDb] = useState<DatabaseState>(() => storageService.loadDatabase());

  // Save DB automatically on change
  useEffect(() => {
    storageService.saveDatabase(db);
  }, [db]);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundFX.setEnabled(next);
    if (next) soundFX.playClick();
  };

  const toggleCursor = () => {
    soundFX.playClick();
    setCustomCursorEnabled((prev) => !prev);
  };

  const toggleAdmin = () => {
    soundFX.playSwoosh();
    setIsAdminOpen((prev) => !prev);
  };

  const openProjectModal = (project: Project) => {
    soundFX.playSwoosh();
    setSelectedProject(project);
  };

  const closeProjectModal = () => {
    soundFX.playClick();
    setSelectedProject(null);
  };

  // --- Profile CRUD ---
  const updateProfile = (updated: Partial<ProfileSettings>) => {
    setDb((prev) => ({
      ...prev,
      profile: { ...prev.profile, ...updated }
    }));
  };

  // --- Projects CRUD ---
  const addProject = (project: Project) => {
    setDb((prev) => ({
      ...prev,
      projects: [project, ...prev.projects]
    }));
  };

  const updateProject = (updated: Project) => {
    setDb((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === updated.id ? updated : p))
    }));
  };

  const deleteProject = (id: string) => {
    setDb((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id)
    }));
  };

  // --- Skills CRUD ---
  const addSkill = (skill: Skill) => {
    setDb((prev) => ({
      ...prev,
      skills: [...prev.skills, skill]
    }));
  };

  const updateSkill = (updated: Skill) => {
    setDb((prev) => ({
      ...prev,
      skills: prev.skills.map((s) => (s.id === updated.id ? updated : s))
    }));
  };

  const deleteSkill = (id: string) => {
    setDb((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s.id !== id)
    }));
  };

  // --- Experience CRUD ---
  const addExperience = (exp: ExperienceItem) => {
    setDb((prev) => ({
      ...prev,
      experiences: [exp, ...prev.experiences]
    }));
  };

  const updateExperience = (updated: ExperienceItem) => {
    setDb((prev) => ({
      ...prev,
      experiences: prev.experiences.map((e) => (e.id === updated.id ? updated : e))
    }));
  };

  const deleteExperience = (id: string) => {
    setDb((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((e) => e.id !== id)
    }));
  };

  // --- Education CRUD ---
  const addEducation = (edu: EducationItem) => {
    setDb((prev) => ({
      ...prev,
      education: [edu, ...prev.education]
    }));
  };

  const updateEducation = (updated: EducationItem) => {
    setDb((prev) => ({
      ...prev,
      education: prev.education.map((e) => (e.id === updated.id ? updated : e))
    }));
  };

  const deleteEducation = (id: string) => {
    setDb((prev) => ({
      ...prev,
      education: prev.education.filter((e) => e.id !== id)
    }));
  };

  // --- Certifications CRUD ---
  const addCertification = (cert: CertificationItem) => {
    setDb((prev) => ({
      ...prev,
      certifications: [cert, ...prev.certifications]
    }));
  };

  const updateCertification = (updated: CertificationItem) => {
    setDb((prev) => ({
      ...prev,
      certifications: prev.certifications.map((c) => (c.id === updated.id ? updated : c))
    }));
  };

  const deleteCertification = (id: string) => {
    setDb((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((c) => c.id !== id)
    }));
  };

  // --- Achievements CRUD ---
  const addAchievement = (ach: AchievementItem) => {
    setDb((prev) => ({
      ...prev,
      achievements: [ach, ...prev.achievements]
    }));
  };

  const updateAchievement = (updated: AchievementItem) => {
    setDb((prev) => ({
      ...prev,
      achievements: prev.achievements.map((a) => (a.id === updated.id ? updated : a))
    }));
  };

  const deleteAchievement = (id: string) => {
    setDb((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((a) => a.id !== id)
    }));
  };

  // --- Messages CRUD ---
  const markMessageRead = (id: string) => {
    setDb((prev) => ({
      ...prev,
      messages: prev.messages.map((m) => (m.id === id ? { ...m, status: 'read' as const } : m))
    }));
  };

  const deleteMessage = (id: string) => {
    setDb((prev) => ({
      ...prev,
      messages: prev.messages.filter((m) => m.id !== id)
    }));
  };

  // --- Database Backup & Restore ---
  const exportDatabase = () => {
    storageService.exportJSON(db);
  };

  const importDatabase = (importedDb: DatabaseState) => {
    setDb(importedDb);
    storageService.saveDatabase(importedDb);
  };

  const resetDatabase = () => {
    const defaults = storageService.resetDefaults();
    setDb(defaults);
  };

  useEffect(() => {
    if (customCursorEnabled) {
      document.body.classList.add('custom-cursor-active');
    } else {
      document.body.classList.remove('custom-cursor-active');
    }
  }, [customCursorEnabled]);

  return (
    <AppContext.Provider
      value={{
        soundEnabled,
        toggleSound,
        customCursorEnabled,
        toggleCursor,
        isAdminOpen,
        setIsAdminOpen,
        toggleAdmin,
        selectedProject,
        openProjectModal,
        closeProjectModal,
        db,
        profile: db.profile,
        projects: db.projects,
        skills: db.skills,
        experiences: db.experiences,
        education: db.education,
        certifications: db.certifications,
        achievements: db.achievements,
        messages: db.messages,
        updateProfile,
        addProject,
        updateProject,
        deleteProject,
        addSkill,
        updateSkill,
        deleteSkill,
        addExperience,
        updateExperience,
        deleteExperience,
        addEducation,
        updateEducation,
        deleteEducation,
        addCertification,
        updateCertification,
        deleteCertification,
        addAchievement,
        updateAchievement,
        deleteAchievement,
        markMessageRead,
        deleteMessage,
        exportDatabase,
        importDatabase,
        resetDatabase
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
