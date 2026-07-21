import { DatabaseState } from '../types';
import { projectsData } from './projectsData';
import { skillsData } from './skillsData';
import { experienceData } from './experienceData';
import { testimonialsData } from './testimonialsData';
import { mockMessages } from './dashboardData';

export const initialDatabase: DatabaseState = {
  version: '1.0.0',
  updatedAt: new Date().toISOString(),
  profile: {
    fullName: 'Alex Vance',
    brandName: 'ALEX.DEV',
    roleTitle: 'Senior Full-Stack Architect & AI Systems Engineer',
    heroHeadline1: 'Engineering',
    heroHeadlineGradient1: 'Next-Gen SaaS',
    heroHeadline2: 'Intelligent Systems',
    heroHeadlineGradient2: 'Intelligent Systems',
    roles: [
      'Senior Full-Stack Architect',
      'AI Systems & Multi-Agent Engineer',
      'UI/UX Design Systems Specialist',
      'Cloud Native Infrastructure Lead'
    ],
    bio: 'Architect with 5+ years of experience designing ultra-scalable full-stack web applications, zero-latency multi-agent AI tools, and sleek digital interfaces.',
    aboutText: 'Specialized in high-performance web systems, distributed microservices, vector search engine integration, and zero-downtime cloud deployments.',
    profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
    resumeUrl: 'https://example.com/resume.pdf',
    email: 'alex@developer.io',
    location: 'San Francisco, CA • Global Remote',
    availability: 'Available for Senior Roles & Enterprise Consulting',
    githubUrl: 'https://github.com',
    linkedinUrl: 'https://linkedin.com',
    twitterUrl: 'https://twitter.com',
    yearsExperience: 5,
    shippedProjects: 35,
    uptimePercentage: 99.9,
    activeUsers: '100k+'
  },
  skills: skillsData.map((s, idx) => ({ ...s, id: `skill-${idx + 1}` })),
  projects: projectsData,
  experiences: experienceData,
  education: [
    {
      id: 'edu-1',
      degree: 'B.S. in Computer Science & Artificial Intelligence',
      field: 'Computer Science',
      institution: 'Stanford University',
      period: '2016 - 2020',
      location: 'Stanford, CA',
      grade: '3.94 GPA',
      description: 'Specialized in Distributed Systems, Operating Systems, Machine Learning, and Computer Vision.',
      highlights: [
        'President of Stanford AI & Robotics Club',
        'Published research paper on Neural Vector Search Optimization',
        'Dean\'s Honor List (All Semesters)'
      ]
    }
  ],
  certifications: [
    {
      id: 'cert-1',
      title: 'AWS Certified Solutions Architect – Professional',
      issuer: 'Amazon Web Services',
      issueDate: '2023',
      credentialId: 'AWS-PSA-98241',
      credentialUrl: 'https://aws.amazon.com/verification',
      badgeImage: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=300&auto=format&fit=crop&q=80'
    },
    {
      id: 'cert-2',
      title: 'Certified Kubernetes Administrator (CKA)',
      issuer: 'Cloud Native Computing Foundation',
      issueDate: '2022',
      credentialId: 'LF-CKA-40291',
      credentialUrl: 'https://cncf.io/verification',
      badgeImage: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=300&auto=format&fit=crop&q=80'
    }
  ],
  achievements: [
    {
      id: 'ach-1',
      title: '1st Place Winner - Global AI Hackathon 2024',
      organization: 'TechCrunch Disrupt',
      date: '2024',
      description: 'Built a zero-latency multi-agent LLM debugging tool used by 12,000+ developers.',
      metric: '1st Place out of 450+ teams',
      icon: 'Trophy'
    },
    {
      id: 'ach-2',
      title: 'Open Source Contributor of the Year',
      organization: 'React & Next.js Ecosystem',
      date: '2023',
      description: 'Authored performance extensions for state synchronization and vector indexing.',
      metric: '10,000+ GitHub Stars',
      icon: 'Award'
    }
  ],
  testimonials: testimonialsData,
  messages: mockMessages
};
