import { Project } from '../types';

export const projectsData: Project[] = [
  {
    id: 'nexus-ai',
    title: 'Nexus AI - Enterprise Multi-Modal Agent Platform',
    subtitle: 'Autonomous AI Workflow Orchestrator & LLM Router',
    description: 'Next-generation AI operations engine with low-latency LLM routing, real-time agent memory, dynamic vector indexes, and custom tool calling.',
    longDescription: 'Nexus AI is a state-of-the-art SaaS platform designed for enterprise AI deployment. Built from the ground up for high throughput and sub-50ms token latency, Nexus features dynamic fallback routing across Claude, OpenAI, and Llama 3 models, integrated vector database caching (Pinecone & Redis), and interactive visual canvas graph orchestration.',
    category: 'AI Platforms',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80'
    ],
    tags: ['React', 'TypeScript', 'Node.js', 'Python', 'FastAPI', 'TailwindCSS', 'Redis', 'Pinecone', 'WebSockets'],
    stats: {
      performance: 99,
      seo: 100,
      bestPractices: 98,
      accessibility: 100,
      codeCoverage: '96.8%',
      githubStars: 1420,
      activeUsers: '42,000+'
    },
    features: [
      'Visual Drag-and-Drop Node Graph Builder for multi-agent workflows',
      'Real-time streaming agent response output via Server-Sent Events (SSE)',
      'Sub-50ms semantic cache lookups using Redis Vector Search',
      'Enterprise RBAC, audit logging, and encrypted API key vaults',
      'Built-in analytics dashboard monitoring token burn rates and API latency distribution'
    ],
    architectureDiagram: {
      nodes: [
        { id: '1', label: 'React Client', subtext: 'Vite + WebSockets', type: 'client' },
        { id: '2', label: 'Edge API Gateway', subtext: 'Cloudflare Workers', type: 'api' },
        { id: '3', label: 'Agent Engine', subtext: 'FastAPI + Python', type: 'service' },
        { id: '4', label: 'Semantic Cache', subtext: 'Redis Stack', type: 'cache' },
        { id: '5', label: 'Vector Storage', subtext: 'Pinecone / Qdrant', type: 'db' },
        { id: '6', label: 'Async Queue', subtext: 'RabbitMQ Engine', type: 'queue' }
      ],
      connections: [
        { from: '1', to: '2', label: 'HTTPS / WSS' },
        { from: '2', to: '3', label: 'gRPC' },
        { from: '3', to: '4', label: 'Vector Query' },
        { from: '3', to: '5', label: 'KNN Search' },
        { from: '3', to: '6', label: 'Publish Task' }
      ]
    },
    databaseDiagram: {
      tables: [
        { name: 'users', columns: ['id (UUID)', 'email (VARCHAR)', 'role (ENUM)', 'created_at (TIMESTAMP)'] },
        { name: 'agent_sessions', columns: ['id (UUID)', 'user_id (FK)', 'model_config (JSONB)', 'status (STRING)'] },
        { name: 'vector_embeddings', columns: ['id (UUID)', 'session_id (FK)', 'vector (VECTOR(1536))', 'payload (JSONB)'] },
        { name: 'token_ledger', columns: ['id (UUID)', 'session_id (FK)', 'tokens_used (INT)', 'cost_usd (DECIMAL)'] }
      ]
    },
    workflowDiagram: {
      steps: [
        { step: 1, title: 'User Input Stream', description: 'User submits text or document prompt via web client.' },
        { step: 2, title: 'Semantic Vector Match', description: 'Check Redis cache for identical embeddings with similarity score > 0.95.' },
        { step: 3, title: 'Agent Graph Execution', description: 'If cache miss, execute multi-step tool reasoning pipeline with LLM router.' },
        { step: 4, title: 'Streamed Delivery', description: 'Stream response back in real-time while updating vector index in background.' }
      ]
    },
    liveUrl: 'https://nexus-ai-demo.vercel.app',
    githubUrl: 'https://github.com/developer/nexus-ai-platform',
    featured: true
  },
  {
    id: 'hyper-cloud',
    title: 'HyperCloud - Infrastructure Automation & Mesh Platform',
    subtitle: 'Zero-Trust Multi-Cloud Kubernetes & Edge Control Plane',
    description: 'High-availability cloud topology visualizer and infrastructure automation tool with live metrics telemetry, automated fallback, and eBPF network security monitoring.',
    longDescription: 'HyperCloud empowers DevOps teams to visualize, orchestrate, and audit cloud infrastructure across AWS, GCP, Azure, and bare metal clusters. Featuring interactive topology maps, automatic terraform drift detection, and single-click zero-downtime deployments.',
    category: 'Cloud Architecture',
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1200&q=80'
    ],
    tags: ['React', 'TypeScript', 'Go', 'Kubernetes', 'Terraform', 'gRPC', 'Prometheus', 'GraphQL', 'TailwindCSS'],
    stats: {
      performance: 98,
      seo: 99,
      bestPractices: 100,
      accessibility: 98,
      codeCoverage: '98.2%',
      githubStars: 2150,
      activeUsers: '18,500+'
    },
    features: [
      '3D Interactive Infrastructure Mesh Graph rendering thousands of microservice nodes',
      'Automated Infrastructure-as-Code generation from visual topology editor',
      'Real-time metric telemetry ingestion using Prometheus & Grafana integrations',
      'Zero-Trust eBPF kernel security monitoring with automated anomaly alerts'
    ],
    architectureDiagram: {
      nodes: [
        { id: '1', label: 'Cloud Console', subtext: 'React + WebGL Canvas', type: 'client' },
        { id: '2', label: 'Control Plane', subtext: 'Go + gRPC Gateway', type: 'api' },
        { id: '3', label: 'Telemetry Daemon', subtext: 'eBPF Probe Daemon', type: 'service' },
        { id: '4', label: 'Time-Series DB', subtext: 'TimescaleDB / Prometheus', type: 'db' }
      ],
      connections: [
        { from: '1', to: '2', label: 'gRPC-Web' },
        { from: '2', to: '3', label: 'mTLS Sync' },
        { from: '3', to: '4', label: 'Stream Metrics' }
      ]
    },
    databaseDiagram: {
      tables: [
        { name: 'clusters', columns: ['id (UUID)', 'name (STRING)', 'provider (ENUM)', 'status (STRING)'] },
        { name: 'node_telemetry', columns: ['cluster_id (FK)', 'cpu_usage (FLOAT)', 'memory_mb (INT)', 'time (TIMESTAMPTZ)'] }
      ]
    },
    workflowDiagram: {
      steps: [
        { step: 1, title: 'Cluster Discovery', description: 'Probe target Kubernetes API endpoints for pod states.' },
        { step: 2, title: 'Mesh Layout Computation', description: 'Compute 3D force-directed layout for network connections.' },
        { step: 3, title: 'Health Assessment', description: 'Evaluate Prometheus rule conditions and trigger auto-scaling if CPU > 85%.' }
      ]
    },
    liveUrl: 'https://hypercloud-mesh.vercel.app',
    githubUrl: 'https://github.com/developer/hypercloud-mesh',
    featured: true
  },
  {
    id: 'strata-pay',
    title: 'StrataPay - Next-Gen FinTech & Billing Engine',
    subtitle: 'Sub-Millisecond Payment Gateway & Usage Subscription Engine',
    description: 'Ultra-fast global payment billing infrastructure built for high-concurrency transaction processing, multi-currency settlement, and fraud detection.',
    longDescription: 'StrataPay processes millions of micro-transactions per second with zero downtime. Built using Rust for high safety and efficiency, StrataPay features automatic currency exchange rate locking, smart routing to minimize decline rates, and an interactive billing analytics dashboard.',
    category: 'Full-Stack SaaS',
    coverImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80'
    ],
    tags: ['React', 'TypeScript', 'Rust', 'PostgreSQL', 'Kafka', 'Redis', 'Stripe API', 'TailwindCSS'],
    stats: {
      performance: 100,
      seo: 98,
      bestPractices: 100,
      accessibility: 99,
      codeCoverage: '99.4%',
      githubStars: 890,
      activeUsers: '120,000+'
    },
    features: [
      'Sub-millisecond payment authorization routing engine',
      'Automated invoice generation and tax compliance for 140+ countries',
      'Real-time fraud scoring using lightweight ML inference rules',
      'PCI-DSS Compliant client tokenization SDK'
    ],
    architectureDiagram: {
      nodes: [
        { id: '1', label: 'Checkout Widget', subtext: 'React SDK', type: 'client' },
        { id: '2', label: 'Payment Core', subtext: 'Rust + Actix Web', type: 'api' },
        { id: '3', label: 'Event Bus', subtext: 'Apache Kafka', type: 'queue' },
        { id: '4', label: 'Ledger DB', subtext: 'CockroachDB (Distributed)', type: 'db' }
      ],
      connections: [
        { from: '1', to: '2', label: 'Encrypted HTTPS' },
        { from: '2', to: '3', label: 'Produce Event' },
        { from: '3', to: '4', label: 'ACID Transaction Write' }
      ]
    },
    databaseDiagram: {
      tables: [
        { name: 'ledger_accounts', columns: ['id (UUID)', 'currency (CHAR3)', 'balance_cents (BIGINT)'] },
        { name: 'transactions', columns: ['id (UUID)', 'amount_cents (BIGINT)', 'status (ENUM)', 'created_at (TIMESTAMPTZ)'] }
      ]
    },
    workflowDiagram: {
      steps: [
        { step: 1, title: 'Tokenization', description: 'Tokenize payment method on client side using Web Crypto API.' },
        { step: 2, title: 'Fraud Verification', description: 'Evaluate IP, device fingerprint, and velocity rules in Rust microservice.' },
        { step: 3, title: 'Settlement & Ledger', description: 'Commit transaction to distributed CockroachDB ledger and emit event to Kafka.' }
      ]
    },
    liveUrl: 'https://stratapay-fintech.vercel.app',
    githubUrl: 'https://github.com/developer/stratapay-core',
    featured: true
  },
  {
    id: 'aether-dex',
    title: 'AetherDEX - Non-Custodial Decentralized Exchange',
    subtitle: 'Automated Market Maker & Cross-Chain Liquidity Protocol',
    description: 'High-frequency Web3 trading interface with sub-second swap execution, concentrated liquidity pools, and interactive candlestick charting.',
    longDescription: 'AetherDEX combines decentralized security with centralized exchange performance. Featuring zero-slippage routing algorithms, L2 gas abstraction, and a responsive glassmorphic trading cockpit.',
    category: 'Mobile & Web3',
    coverImage: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?auto=format&fit=crop&w=1200&q=80'
    ],
    tags: ['React', 'Solidity', 'Ethers.js', 'Wagmi', 'TailwindCSS', 'GraphQL', 'The Graph'],
    stats: {
      performance: 97,
      seo: 99,
      bestPractices: 98,
      accessibility: 97,
      codeCoverage: '94.5%',
      githubStars: 1780,
      activeUsers: '55,000+'
    },
    features: [
      'Concentrated Liquidity AMM Smart Contract architecture',
      'L2 Account Abstraction enabling gasless transaction signing',
      'Interactive TradingView lightweight-charts integration with real-time websocket candles',
      'Multi-chain token bridge support for Ethereum, Arbitrum, and Polygon'
    ],
    architectureDiagram: {
      nodes: [
        { id: '1', label: 'Trading Cockpit', subtext: 'React + Web3Modal', type: 'client' },
        { id: '2', label: 'Liquidity Router', subtext: 'Solidity Contracts', type: 'api' },
        { id: '3', label: 'Sub-Graph Indexer', subtext: 'The Graph Protocol', type: 'service' }
      ],
      connections: [
        { from: '1', to: '2', label: 'EIP-1193 JSON-RPC' },
        { from: '2', to: '3', label: 'Chain Events' },
        { from: '3', to: '1', label: 'GraphQL Queries' }
      ]
    },
    databaseDiagram: {
      tables: [
        { name: 'pools', columns: ['id (BYTES)', 'token0 (ADDRESS)', 'token1 (ADDRESS)', 'fee_tier (UINT24)'] },
        { name: 'swaps', columns: ['id (BYTES)', 'pool_id (FK)', 'sender (ADDRESS)', 'amount0 (INT256)', 'amount1 (INT256)'] }
      ]
    },
    workflowDiagram: {
      steps: [
        { step: 1, title: 'Route Optimization', description: 'Calculate optimal multi-hop trade path for minimum price impact.' },
        { step: 2, title: 'Permit Signature', description: 'Sign off-chain EIP-712 permit message for gas-free authorization.' },
        { step: 3, title: 'Contract Swap', description: 'Execute contract call with atomic slippage protection guards.' }
      ]
    },
    liveUrl: 'https://aether-dex-web3.vercel.app',
    githubUrl: 'https://github.com/developer/aether-dex-protocol',
    featured: false
  }
];
