module.exports = {
  profile: {
    fullName: 'Alex Vance',
    brandName: 'ALEX.DEV',
    roleTitle: 'Senior Full-Stack Architect & AI Systems Engineer',
    heroHeadline1: 'Engineering',
    heroHeadlineGradient1: 'Next-Gen SaaS',
    heroHeadline2: 'Intelligent Systems',
    heroHeadlineGradient2: 'Intelligent Systems',
    roles: JSON.stringify([
      'Senior Full-Stack Architect',
      'AI Systems & Multi-Agent Engineer',
      'UI/UX Design Systems Specialist',
      'Cloud Native Infrastructure Lead'
    ]),
    bio: 'Architect with 5+ years of experience designing ultra-scalable full-stack web applications, zero-latency multi-agent AI tools, and sleek digital interfaces.',
    aboutText: 'Specialized in high-performance web systems, distributed microservices, vector search engine integration, and zero-downtime cloud deployments.',
    profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
    resumeUrl: 'https://example.com/resume.pdf',
    email: 'admin@developer.io',
    location: 'San Francisco, CA • Global Remote',
    availability: 'Available for Senior Roles & Enterprise Consulting',
    githubUrl: 'https://github.com',
    linkedinUrl: 'https://linkedin.com',
    twitterUrl: 'https://twitter.com',
    yearsExperience: 5,
    shippedProjects: 35,
    uptimePercentage: 99.9,
    activeUsers: '100k+',
    themeConfig: JSON.stringify({ bgColor: '#050816', accentColor: '#8b5cf6' }),
    seoMetadata: JSON.stringify({ title: 'Developer Portfolio', description: 'My professional dynamic portfolio website' }),
    bannerImage: ''
  },
  skills: [
    { id: 'skill-1', name: 'React 18 / 19', level: 98, category: 'Frontend', icon: 'Atom', color: '#61DAFB', description: 'Expert in Server Components, Concurrent Mode, custom hooks, state optimization, and micro-frontends.' },
    { id: 'skill-2', name: 'TypeScript', level: 96, category: 'Frontend', icon: 'Code2', color: '#3178C6', description: 'Strict typing, advanced generics, conditional types, AST transformers, and monorepo architectures.' },
    { id: 'skill-3', name: 'Next.js & Vite', level: 95, category: 'Frontend', icon: 'Zap', color: '#FFFFFF', description: 'App router, SSR/SSG/ISR optimization, edge middleware, and custom Vite plugin build chains.' },
    { id: 'skill-4', name: 'Tailwind CSS & Styling', level: 98, category: 'Frontend', icon: 'Palette', color: '#06B6D4', description: 'Custom design systems, CSS variables, glassmorphism, responsive animations, and Awwwards-grade UI/UX.' },
    { id: 'skill-5', name: 'Framer Motion & WebGL', level: 92, category: 'Frontend', icon: 'Sparkles', color: '#EC4899', description: 'Spring physics, 3D card tilt, gesture animations, HTML5 Canvas shaders, and 60fps micro-interactions.' },
    { id: 'skill-6', name: 'Node.js & Express / NestJS', level: 95, category: 'Backend', icon: 'Server', color: '#339933', description: 'High-throughput REST & GraphQL APIs, event loop optimization, cluster workers, and stream processing.' },
    { id: 'skill-7', name: 'Go (Golang)', level: 90, category: 'Backend', icon: 'Cpu', color: '#00ADD8', description: 'Microservices, goroutine concurrency pipelines, high-performance gRPC servers, and low-memory proxies.' },
    { id: 'skill-8', name: 'Python & FastAPI', level: 92, category: 'Backend', icon: 'Terminal', color: '#3776AB', description: 'Async WebSockets, AI model serving, Pydantic schemas, and distributed Celery background workers.' },
    { id: 'skill-9', name: 'PostgreSQL & Redis', level: 94, category: 'Backend', icon: 'Database', color: '#4169E1', description: 'Complex index tuning, JSONB queries, distributed caching, pub-sub messaging, and vector search.' }
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'Neural Vector Search Optimizer',
      subtitle: 'AI Latency & Fine-Tuning Service',
      description: 'Zero-latency vector embedding search accelerator built with Go and Rust.',
      longDescription: 'A high-performance microservice that optimizes cosine similarity search operations on pinecone and qdrant indexes, decreasing response times by 40% using custom SIMD acceleration.',
      category: 'AI Platforms',
      coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      images: JSON.stringify(['https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80']),
      tags: JSON.stringify(['Go', 'Rust', 'Pinecone', 'Qdrant', 'gRPC']),
      stats: JSON.stringify({ performance: 99, seo: 98, bestPractices: 100, accessibility: 100 }),
      features: JSON.stringify(['Sub-10ms similarity queries', 'Dynamic vector caching', 'Quantized model compression']),
      architectureDiagram: JSON.stringify({ nodes: [], connections: [] }),
      databaseDiagram: JSON.stringify({ tables: [] }),
      workflowDiagram: JSON.stringify({ steps: [] }),
      liveUrl: 'https://demo.vercel.app',
      githubUrl: 'https://github.com/developer/repo',
      featured: 1,
      status: 'published'
    }
  ],
  experiences: [
    {
      id: 'exp-1',
      role: 'Principal Systems Architect',
      company: 'Enterprise AI Lab',
      period: '2023 - Present',
      location: 'San Francisco, CA',
      description: 'Lead engineering team building distributed multi-agent pipeline and high-concurrency event stream routers.',
      highlights: JSON.stringify([
        'Designed real-time message bus handling 100k+ messages/sec',
        'Decreased cloud infrastructure budget by 35% through container scaling'
      ]),
      techStack: JSON.stringify(['Next.js', 'Go', 'Kubernetes', 'FastAPI']),
      logo: '🚀'
    }
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'B.S. in Computer Science',
      field: 'Computer Science',
      institution: 'Stanford University',
      period: '2016 - 2020',
      location: 'Stanford, CA',
      grade: '3.94 GPA',
      description: 'Specialized in Operating Systems and Distributed Computing systems.',
      highlights: JSON.stringify(['President of AI Research group', 'Dean Honor roll list'])
    }
  ],
  certifications: [
    {
      id: 'cert-1',
      title: 'AWS Certified Solutions Architect – Professional',
      issuer: 'Amazon Web Services',
      issueDate: '2023',
      credentialId: 'AWS-PSA-98241',
      credentialUrl: 'https://aws.amazon.com',
      fileUrl: ''
    }
  ],
  achievements: [
    {
      id: 'ach-1',
      title: '1st Place Winner - Global AI Hackathon',
      organization: 'TechCrunch',
      date: '2024',
      description: 'Developed an autonomous multi-agent debugging client.',
      metric: '1st out of 450 teams',
      icon: 'Trophy'
    }
  ]
};
