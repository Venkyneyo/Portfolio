import { ExperienceItem } from '../types';

export const experienceData: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Principal Full-Stack Architect',
    company: 'Apex Cloud Technologies',
    period: '2023 - Present',
    location: 'San Francisco, CA (Hybrid)',
    description: 'Leading architectural design and frontend/backend engineering for next-gen multi-agent AI SaaS platform serving 500+ enterprise clients.',
    highlights: [
      'Architected multi-tenant micro-frontend web app reducing page load time by 62%',
      'Designed real-time Redis vector search caching layer cutting LLM API costs by $35,000/month',
      'Mentored 14 cross-functional engineers across Web, Cloud, and AI operations teams'
    ],
    techStack: ['React', 'TypeScript', 'Node.js', 'Go', 'Kubernetes', 'FastAPI', 'Redis Vector'],
    logo: '⚡'
  },
  {
    id: 'exp-2',
    role: 'Senior Staff Frontend Engineer',
    company: 'Veloce Digital Systems',
    period: '2021 - 2023',
    location: 'New York, NY (Remote)',
    description: 'Directed core UI design system development, WebGL performance optimizations, and reactive data tables for high-frequency trading platform.',
    highlights: [
      'Engineered custom canvas chart visualizer processing 100,000 ticker updates/second at 60 FPS',
      'Spearheaded migration to Tailwind CSS and Framer Motion, elevating user conversion by 44%',
      'Achieved 100/100 Lighthouse performance metrics across all primary landing pages'
    ],
    techStack: ['React', 'TypeScript', 'Next.js', 'Framer Motion', 'TailwindCSS', 'WebGL'],
    logo: '🚀'
  },
  {
    id: 'exp-3',
    role: 'Full-Stack Software Engineer',
    company: 'Quantum Byte Labs',
    period: '2019 - 2021',
    location: 'Austin, TX',
    description: 'Built scalable backend microservices in Go & Node.js along with responsive web dashboards for cloud storage management.',
    highlights: [
      'Developed automated OAuth2 SSO and RBAC authentication service handling 2M+ logins daily',
      'Implemented automated CI/CD deployment pipelines reducing release cycle time from 3 days to 15 mins'
    ],
    techStack: ['React', 'Node.js', 'Go', 'PostgreSQL', 'Docker', 'AWS Lambda'],
    logo: '🌐'
  }
];
