import { Skill } from '../types';

export const skillsData: Skill[] = [
  // Frontend
  {
    id: 'skill-1',
    name: 'React 18 / 19',
    level: 98,
    category: 'Frontend',
    icon: 'Atom',
    color: '#61DAFB',
    description: 'Expert in Server Components, Concurrent Mode, custom hooks, state optimization, and micro-frontends.'
  },
  {
    id: 'skill-2',
    name: 'TypeScript',
    level: 96,
    category: 'Frontend',
    icon: 'Code2',
    color: '#3178C6',
    description: 'Strict typing, advanced generics, conditional types, AST transformers, and monorepo architectures.'
  },
  {
    id: 'skill-3',
    name: 'Next.js & Vite',
    level: 95,
    category: 'Frontend',
    icon: 'Zap',
    color: '#FFFFFF',
    description: 'App router, SSR/SSG/ISR optimization, edge middleware, and custom Vite plugin build chains.'
  },
  {
    id: 'skill-4',
    name: 'Tailwind CSS & Styling',
    level: 98,
    category: 'Frontend',
    icon: 'Palette',
    color: '#06B6D4',
    description: 'Custom design systems, CSS variables, glassmorphism, responsive animations, and Awwwards-grade UI/UX.'
  },
  {
    id: 'skill-5',
    name: 'Framer Motion & WebGL',
    level: 92,
    category: 'Frontend',
    icon: 'Sparkles',
    color: '#EC4899',
    description: 'Spring physics, 3D card tilt, gesture animations, HTML5 Canvas shaders, and 60fps micro-interactions.'
  },

  // Backend
  {
    id: 'skill-6',
    name: 'Node.js & Express / NestJS',
    level: 95,
    category: 'Backend',
    icon: 'Server',
    color: '#339933',
    description: 'High-throughput REST & GraphQL APIs, event loop optimization, cluster workers, and stream processing.'
  },
  {
    id: 'skill-7',
    name: 'Go (Golang)',
    level: 90,
    category: 'Backend',
    icon: 'Cpu',
    color: '#00ADD8',
    description: 'Microservices, goroutine concurrency pipelines, high-performance gRPC servers, and low-memory proxies.'
  },
  {
    id: 'skill-8',
    name: 'Python & FastAPI',
    level: 92,
    category: 'Backend',
    icon: 'Terminal',
    color: '#3776AB',
    description: 'Async WebSockets, AI model serving, Pydantic schemas, and distributed Celery background workers.'
  },
  {
    id: 'skill-9',
    name: 'PostgreSQL & Redis',
    level: 94,
    category: 'Backend',
    icon: 'Database',
    color: '#4169E1',
    description: 'Complex index tuning, JSONB queries, distributed caching, pub-sub messaging, and vector search.'
  },

  // AI & Machine Learning
  {
    id: 'skill-10',
    name: 'LLM Orchestration & RAG',
    level: 93,
    category: 'AI & ML',
    icon: 'Bot',
    color: '#8B5CF6',
    description: 'LangChain, LlamaIndex, prompt routing, semantic vector search (Pinecone, Qdrant), and fine-tuning.'
  },
  {
    id: 'skill-11',
    name: 'PyTorch & Transformers',
    level: 85,
    category: 'AI & ML',
    icon: 'Brain',
    color: '#EE4C2C',
    description: 'Custom embeddings, HuggingFace transformers, model quantization, and ONNX Runtime deployment.'
  },
  {
    id: 'skill-12',
    name: 'Vector DBs & Embeddings',
    level: 92,
    category: 'AI & ML',
    icon: 'Layers',
    color: '#A855F7',
    description: 'HNSW indexing, cosine distance search, multi-modal embeddings, and hybrid sparse-dense retrieval.'
  },

  // Cloud & DevOps
  {
    id: 'skill-13',
    name: 'Docker & Kubernetes',
    level: 94,
    category: 'Cloud & DevOps',
    icon: 'Container',
    color: '#2496ED',
    description: 'Multi-stage container builds, Helm charts, ingress controllers, horizontal pod autoscaling, and Istio service mesh.'
  },
  {
    id: 'skill-14',
    name: 'AWS & Cloudflare Edge',
    level: 92,
    category: 'Cloud & DevOps',
    icon: 'Cloud',
    color: '#FF9900',
    description: 'ECS/EKS, Lambda Serverless, S3 CDN, Cloudflare Workers KV, and zero-trust Cloudflare Tunnels.'
  },
  {
    id: 'skill-15',
    name: 'CI/CD & Terraform',
    level: 90,
    category: 'Cloud & DevOps',
    icon: 'Workflow',
    color: '#844FBA',
    description: 'GitHub Actions, automated security scanning, blue-green deployments, and Infrastructure-as-Code.'
  }
];
