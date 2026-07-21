import React, { createContext, useContext, useState, useEffect } from 'react';
import { User as SupabaseUser } from '@supabase/supabase-js';
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
import { supabase } from '../utils/supabaseClient';
import { storageService } from '../utils/storageService';
import { soundFX } from '../utils/soundFX';
import { initialDatabase } from '../data/initialDatabase';

interface BlogItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  tags: string[];
  publishedAt: string;
  status: 'published' | 'draft';
}

interface NavigationItem {
  id: string;
  label: string;
  path: string;
  orderIndex: number;
}

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

  // Authentication State
  adminUser: SupabaseUser | null;
  checkingAuth: boolean;
  loginAdmin: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logoutAdmin: () => Promise<void>;

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
  blogs: BlogItem[];
  navigationItems: NavigationItem[];

  // Profile CRUD
  updateProfile: (updated: Partial<ProfileSettings>) => Promise<void>;

  // Projects CRUD
  addProject: (project: Project) => Promise<void>;
  updateProject: (project: Project) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;

  // Skills CRUD
  addSkill: (skill: Skill) => Promise<void>;
  updateSkill: (skill: Skill) => Promise<void>;
  deleteSkill: (id: string) => Promise<void>;

  // Experience CRUD
  addExperience: (exp: ExperienceItem) => Promise<void>;
  updateExperience: (exp: ExperienceItem) => Promise<void>;
  deleteExperience: (id: string) => Promise<void>;

  // Education CRUD
  addEducation: (edu: EducationItem) => Promise<void>;
  updateEducation: (edu: EducationItem) => Promise<void>;
  deleteEducation: (id: string) => Promise<void>;

  // Certifications CRUD
  addCertification: (cert: CertificationItem) => Promise<void>;
  updateCertification: (cert: CertificationItem) => Promise<void>;
  deleteCertification: (id: string) => Promise<void>;

  // Achievements CRUD
  addAchievement: (ach: AchievementItem) => Promise<void>;
  updateAchievement: (ach: AchievementItem) => Promise<void>;
  deleteAchievement: (id: string) => Promise<void>;

  // Blogs CRUD
  addBlog: (blog: BlogItem) => Promise<void>;
  updateBlog: (blog: BlogItem) => Promise<void>;
  deleteBlog: (id: string) => Promise<void>;

  // Navigation CRUD
  saveNavigationItems: (items: NavigationItem[]) => Promise<void>;

  // Messages CRUD
  submitContactMessage: (msg: Omit<MessageItem, 'id' | 'date' | 'status' | 'priority'>) => Promise<void>;
  markMessageRead: (id: string) => Promise<void>;
  deleteMessage: (id: string) => Promise<void>;

  // Database Utilities
  exportDatabase: () => void;
  importDatabase: (importedDb: DatabaseState) => Promise<void>;
  resetDatabase: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [customCursorEnabled, setCustomCursorEnabled] = useState<boolean>(true);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Authentication State
  const [adminUser, setAdminUser] = useState<SupabaseUser | null>(null);
  const [checkingAuth, setCheckingAuth] = useState<boolean>(true);

  // Live Database Collections
  const [db, setDb] = useState<DatabaseState>(() => storageService.loadDatabase());
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [navigationItems, setNavigationItems] = useState<NavigationItem[]>([
    { id: 'nav-1', label: 'About', path: '#about', orderIndex: 0 },
    { id: 'nav-2', label: 'Skills', path: '#skills', orderIndex: 1 },
    { id: 'nav-3', label: 'Projects', path: '#projects', orderIndex: 2 },
    { id: 'nav-4', label: 'Experience', path: '#experience', orderIndex: 3 },
    { id: 'nav-5', label: 'Credentials', path: '#education', orderIndex: 4 },
    { id: 'nav-6', label: 'Contact', path: '#contact', orderIndex: 5 },
  ]);

  // Check auth session
  useEffect(() => {
    if (!supabase) {
      setCheckingAuth(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setAdminUser(session?.user ?? null);
      setCheckingAuth(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setAdminUser(session?.user ?? null);
      setCheckingAuth(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch Database from Supabase on start
  useEffect(() => {
    const fetchSupabaseDatabase = async () => {
      if (!supabase) return;

      try {
        // Fetch Profile
        const { data: profileData, error: profileErr } = await supabase.from('profile').select('*').limit(1).maybeSingle();
        if (profileErr) throw profileErr;

        // Fetch Skills
        const { data: skillsData, error: skillsErr } = await supabase.from('skills').select('*').order('level', { ascending: false });
        if (skillsErr) throw skillsErr;

        // Fetch Projects
        const { data: projectsData, error: projErr } = await supabase.from('projects').select('*').order('featured', { ascending: false });
        if (projErr) throw projErr;

        // Fetch Experience
        const { data: expData, error: expErr } = await supabase.from('experience').select('*').order('period', { ascending: false });
        if (expErr) throw expErr;

        // Fetch Education
        const { data: eduData, error: eduErr } = await supabase.from('education').select('*').order('period', { ascending: false });
        if (eduErr) throw eduErr;

        // Fetch Certifications
        const { data: certData, error: certErr } = await supabase.from('certifications').select('*').order('issue_date', { ascending: false });
        if (certErr) throw certErr;

        // Fetch Achievements
        const { data: achData, error: achErr } = await supabase.from('achievements').select('*').order('date', { ascending: false });
        if (achErr) throw achErr;

        // Fetch Messages
        const { data: msgData, error: msgErr } = await supabase.from('messages').select('*').order('date', { ascending: false });
        if (msgErr) throw msgErr;

        // Fetch Blogs
        const { data: blogData, error: blogErr } = await supabase.from('blogs').select('*').order('published_at', { ascending: false });
        if (blogErr) throw blogErr;

        // Fetch Navigation
        const { data: navData, error: navErr } = await supabase.from('navigation').select('*').order('order_index', { ascending: true });
        if (navErr) throw navErr;

        // Map and Seed if DB is empty
        let activeProfile = profileData;
        if (!activeProfile) {
          // Auto-seed profile on Supabase if empty
          const { data: inserted, error: insertErr } = await supabase.from('profile').insert([initialDatabase.profile]).select().single();
          if (!insertErr) activeProfile = inserted;
        }

        setDb({
          version: '1.0.0',
          updatedAt: new Date().toISOString(),
          profile: activeProfile || initialDatabase.profile,
          skills: skillsData || [],
          projects: projectsData || [],
          experiences: expData || [],
          education: eduData || [],
          certifications: certData || [],
          achievements: achData || [],
          testimonials: initialDatabase.testimonials,
          messages: msgData || []
        });

        if (blogData) setBlogs(blogData);
        if (navData && navData.length > 0) setNavigationItems(navData);

      } catch (err) {
        console.error('Supabase fetch failed, continuing in offline fallback mode:', err);
      }
    };

    fetchSupabaseDatabase();
  }, [adminUser]);

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

  // Auth Operations
  const loginAdmin = async (email: string, password: string) => {
    if (!supabase) return { success: false, error: 'Database client not connected.' };
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      setAdminUser(data.user);
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message || 'Authentication failed.' };
    }
  };

  const logoutAdmin = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setAdminUser(null);
  };

  // --- Profile CRUD ---
  const updateProfile = async (updated: Partial<ProfileSettings>) => {
    const updatedProfile = { ...db.profile, ...updated };
    setDb((prev) => ({ ...prev, profile: updatedProfile }));

    if (supabase && adminUser) {
      await supabase.from('profile').update(updated).eq('email', db.profile.email);
    }
  };

  // --- Projects CRUD ---
  const addProject = async (project: Project) => {
    setDb((prev) => ({ ...prev, projects: [project, ...prev.projects] }));
    if (supabase && adminUser) {
      await supabase.from('projects').insert([project]);
    }
  };

  const updateProject = async (updated: Project) => {
    setDb((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === updated.id ? updated : p))
    }));
    if (supabase && adminUser) {
      await supabase.from('projects').update(updated).eq('id', updated.id);
    }
  };

  const deleteProject = async (id: string) => {
    setDb((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id)
    }));
    if (supabase && adminUser) {
      await supabase.from('projects').delete().eq('id', id);
    }
  };

  // --- Skills CRUD ---
  const addSkill = async (skill: Skill) => {
    setDb((prev) => ({ ...prev, skills: [...prev.skills, skill] }));
    if (supabase && adminUser) {
      await supabase.from('skills').insert([skill]);
    }
  };

  const updateSkill = async (updated: Skill) => {
    setDb((prev) => ({
      ...prev,
      skills: prev.skills.map((s) => (s.id === updated.id ? updated : s))
    }));
    if (supabase && adminUser) {
      await supabase.from('skills').update(updated).eq('id', updated.id);
    }
  };

  const deleteSkill = async (id: string) => {
    setDb((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s.id !== id)
    }));
    if (supabase && adminUser) {
      await supabase.from('skills').delete().eq('id', id);
    }
  };

  // --- Experience CRUD ---
  const addExperience = async (exp: ExperienceItem) => {
    setDb((prev) => ({ ...prev, experiences: [exp, ...prev.experiences] }));
    if (supabase && adminUser) {
      await supabase.from('experience').insert([exp]);
    }
  };

  const updateExperience = async (updated: ExperienceItem) => {
    setDb((prev) => ({
      ...prev,
      experiences: prev.experiences.map((e) => (e.id === updated.id ? updated : e))
    }));
    if (supabase && adminUser) {
      await supabase.from('experience').update(updated).eq('id', updated.id);
    }
  };

  const deleteExperience = async (id: string) => {
    setDb((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((e) => e.id !== id)
    }));
    if (supabase && adminUser) {
      await supabase.from('experience').delete().eq('id', id);
    }
  };

  // --- Education CRUD ---
  const addEducation = async (edu: EducationItem) => {
    setDb((prev) => ({ ...prev, education: [edu, ...prev.education] }));
    if (supabase && adminUser) {
      await supabase.from('education').insert([edu]);
    }
  };

  const updateEducation = async (updated: EducationItem) => {
    setDb((prev) => ({
      ...prev,
      education: prev.education.map((e) => (e.id === updated.id ? updated : e))
    }));
    if (supabase && adminUser) {
      await supabase.from('education').update(updated).eq('id', updated.id);
    }
  };

  const deleteEducation = async (id: string) => {
    setDb((prev) => ({
      ...prev,
      education: prev.education.filter((e) => e.id !== id)
    }));
    if (supabase && adminUser) {
      await supabase.from('education').delete().eq('id', id);
    }
  };

  // --- Certifications CRUD ---
  const addCertification = async (cert: CertificationItem) => {
    setDb((prev) => ({ ...prev, certifications: [cert, ...prev.certifications] }));
    if (supabase && adminUser) {
      await supabase.from('certifications').insert([cert]);
    }
  };

  const updateCertification = async (updated: CertificationItem) => {
    setDb((prev) => ({
      ...prev,
      certifications: prev.certifications.map((c) => (c.id === updated.id ? updated : c))
    }));
    if (supabase && adminUser) {
      await supabase.from('certifications').update(updated).eq('id', updated.id);
    }
  };

  const deleteCertification = async (id: string) => {
    setDb((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((c) => c.id !== id)
    }));
    if (supabase && adminUser) {
      await supabase.from('certifications').delete().eq('id', id);
    }
  };

  // --- Achievements CRUD ---
  const addAchievement = async (ach: AchievementItem) => {
    setDb((prev) => ({ ...prev, achievements: [ach, ...prev.achievements] }));
    if (supabase && adminUser) {
      await supabase.from('achievements').insert([ach]);
    }
  };

  const updateAchievement = async (updated: AchievementItem) => {
    setDb((prev) => ({
      ...prev,
      achievements: prev.achievements.map((a) => (a.id === updated.id ? updated : a))
    }));
    if (supabase && adminUser) {
      await supabase.from('achievements').update(updated).eq('id', updated.id);
    }
  };

  const deleteAchievement = async (id: string) => {
    setDb((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((a) => a.id !== id)
    }));
    if (supabase && adminUser) {
      await supabase.from('achievements').delete().eq('id', id);
    }
  };

  // --- Blogs CRUD ---
  const addBlog = async (blog: BlogItem) => {
    setBlogs((prev) => [blog, ...prev]);
    if (supabase && adminUser) {
      await supabase.from('blogs').insert([blog]);
    }
  };

  const updateBlog = async (updated: BlogItem) => {
    setBlogs((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
    if (supabase && adminUser) {
      await supabase.from('blogs').update(updated).eq('id', updated.id);
    }
  };

  const deleteBlog = async (id: string) => {
    setBlogs((prev) => prev.filter((b) => b.id !== id));
    if (supabase && adminUser) {
      await supabase.from('blogs').delete().eq('id', id);
    }
  };

  // --- Navigation CRUD ---
  const saveNavigationItems = async (items: NavigationItem[]) => {
    setNavigationItems(items);
    if (supabase && adminUser) {
      await supabase.from('navigation').delete().neq('id', 'null');
      await supabase.from('navigation').insert(items);
    }
  };

  // --- Messages CRUD ---
  const submitContactMessage = async (msg: Omit<MessageItem, 'id' | 'date' | 'status' | 'priority'>) => {
    const payload: MessageItem = {
      ...msg,
      id: `msg-${Date.now()}`,
      date: new Date().toISOString(),
      status: 'unread',
      priority: 'medium'
    };
    setDb((prev) => ({ ...prev, messages: [payload, ...prev.messages] }));
    if (supabase) {
      await supabase.from('messages').insert([payload]);
    }
  };

  const markMessageRead = async (id: string) => {
    setDb((prev) => ({
      ...prev,
      messages: prev.messages.map((m) => (m.id === id ? { ...m, status: 'read' as const } : m))
    }));
    if (supabase && adminUser) {
      await supabase.from('messages').update({ status: 'read' }).eq('id', id);
    }
  };

  const deleteMessage = async (id: string) => {
    setDb((prev) => ({
      ...prev,
      messages: prev.messages.filter((m) => m.id !== id)
    }));
    if (supabase && adminUser) {
      await supabase.from('messages').delete().eq('id', id);
    }
  };

  // --- Database utilities ---
  const exportDatabase = () => {
    storageService.exportJSON(db);
  };

  const importDatabase = async (importedDb: DatabaseState) => {
    setDb(importedDb);
    storageService.saveDatabase(importedDb);

    if (supabase && adminUser) {
      // Direct restoration on Supabase tables
      await supabase.from('profile').delete().neq('email', 'null');
      await supabase.from('profile').insert([importedDb.profile]);
      
      await supabase.from('skills').delete().neq('id', 'null');
      await supabase.from('skills').insert(importedDb.skills);

      await supabase.from('projects').delete().neq('id', 'null');
      await supabase.from('projects').insert(importedDb.projects);

      await supabase.from('experience').delete().neq('id', 'null');
      await supabase.from('experience').insert(importedDb.experiences);

      await supabase.from('education').delete().neq('id', 'null');
      await supabase.from('education').insert(importedDb.education);

      await supabase.from('certifications').delete().neq('id', 'null');
      await supabase.from('certifications').insert(importedDb.certifications);

      await supabase.from('achievements').delete().neq('id', 'null');
      await supabase.from('achievements').insert(importedDb.achievements);
    }
  };

  const resetDatabase = async () => {
    const defaults = storageService.resetDefaults();
    setDb(defaults);

    if (supabase && adminUser) {
      await importDatabase(defaults);
    }
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
        adminUser,
        checkingAuth,
        loginAdmin,
        logoutAdmin,
        db,
        profile: db.profile,
        projects: db.projects,
        skills: db.skills,
        experiences: db.experiences,
        education: db.education,
        certifications: db.certifications,
        achievements: db.achievements,
        messages: db.messages,
        blogs,
        navigationItems,
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
        addBlog,
        updateBlog,
        deleteBlog,
        saveNavigationItems,
        submitContactMessage,
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
