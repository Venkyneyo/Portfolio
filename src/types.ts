export type ProjectCategory = 'All' | 'Full-Stack SaaS' | 'AI Platforms' | 'Cloud Architecture' | 'Mobile & Web3';

export interface ProfileSettings {
  fullName: string;
  brandName: string;
  roleTitle: string;
  heroHeadline1: string;
  heroHeadlineGradient1: string;
  heroHeadline2: string;
  heroHeadlineGradient2: string;
  roles: string[];
  bio: string;
  aboutText: string;
  profileImage: string;
  resumeUrl: string;
  email: string;
  location: string;
  availability: string;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
  yearsExperience: number;
  shippedProjects: number;
  uptimePercentage: number;
  activeUsers: string;
}

export interface ProjectStats {
  performance: number;
  seo: number;
  bestPractices: number;
  accessibility: number;
  codeCoverage?: string;
  githubStars?: number;
  activeUsers?: string;
}

export interface ProjectDiagram {
  nodes: { id: string; label: string; subtext?: string; type: 'client' | 'api' | 'service' | 'cache' | 'db' | 'queue' }[];
  connections: { from: string; to: string; label: string }[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  category: ProjectCategory;
  coverImage: string;
  images: string[];
  tags: string[];
  stats: ProjectStats;
  features: string[];
  architectureDiagram: ProjectDiagram;
  databaseDiagram: {
    tables: { name: string; columns: string[] }[];
  };
  workflowDiagram: {
    steps: { step: number; title: string; description: string }[];
  };
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 0-100 percentage
  category: 'Frontend' | 'Backend' | 'AI & ML' | 'Cloud & DevOps';
  icon: string;
  color: string;
  description: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
  techStack: string[];
  logo: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  field: string;
  institution: string;
  period: string;
  location: string;
  grade?: string;
  description: string;
  highlights: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl: string;
  badgeImage?: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
  metric?: string;
  icon?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  text: string;
  rating: number;
}

export interface MessageItem {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: 'unread' | 'read' | 'replied';
  priority: 'high' | 'medium' | 'low';
}

export interface AnalyticsData {
  pageViews: number;
  uniqueVisitors: number;
  conversionRate: number;
  avgDuration: string;
  dailyTraffic: { date: string; views: number; visitors: number }[];
  trafficSources: { source: string; percentage: number; color: string }[];
  deviceBreakdown: { device: string; percentage: number }[];
}

export interface DatabaseState {
  version: string;
  updatedAt: string;
  profile: ProfileSettings;
  skills: Skill[];
  projects: Project[];
  experiences: ExperienceItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
  achievements: AchievementItem[];
  testimonials: Testimonial[];
  messages: MessageItem[];
}
