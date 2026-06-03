// All content data extracted from original portfolio + expanded to 30+ projects
// No location, no education marks — per user request

export const personal = {
  name: 'Ashok Pasala',
  roles: ['Full Stack Developer', 'AI Automation Builder', 'Systems Engineer'],
  tagline: 'I build intelligent systems, scalable products, and automated workflows — exploring AI, web3, cybersecurity, and the full-stack frontier.',
  email: 'ashokashishms@gmail.com',
  phone: '+91 9491111675',
  github: 'https://github.com/ashokwebs',
  linkedin: 'https://www.linkedin.com/in/ashok-raj-p-1b8539317/',
  status: 'Available for freelance & collaboration',
};

export const about = {
  paragraphs: [
    "I'm <strong>Ashok Pasala</strong> — a <em>full-stack developer, AI builder, and systems thinker</em>. I don't fit neatly into one box, and I prefer it that way.",
    "My work spans <strong>web application development, AI automation systems, multi-agent coordination frameworks, and backend infrastructure</strong>. I gravitate toward problems that require connecting multiple domains — building intelligent pipelines, scalable APIs, or products that actually solve real problems.",
    "Beyond engineering, I'm deeply curious about <strong>cybersecurity, web3 systems, algorithmic trading, and decentralized technologies</strong>. These aren't just interests — they're areas I actively research and experiment in.",
    "In my free time, I write. Essays, book drafts, technical journals — writing is how I process ideas and build clarity. I also freelance, taking on client work that sharpens my real-world product instincts.",
    "I believe the best builders are <strong>generalists with depth</strong> — people who move fluidly across domains while building something real. That's what I'm becoming.",
  ],
  tags: ['Full Stack Dev', 'AI Systems', 'Automation', 'Cybersecurity', 'Web3', 'Freelancer', 'Writer', 'Systems Thinker', 'Open Source', 'Product Builder'],
};

export const skills = [
  { title: 'Languages', color: 'green', items: ['Python', 'JavaScript', 'TypeScript', 'C', 'C++', 'Java', 'SQL', 'Bash', 'Rust', 'Go'] },
  { title: 'Frontend', color: 'purple', items: ['React', 'Next.js', 'HTML/CSS', 'Tailwind CSS', 'Framer Motion', 'Redux', 'Three.js', 'GSAP'] },
  { title: 'Backend & APIs', color: 'cyan', items: ['Node.js', 'Express.js', 'FastAPI', 'REST APIs', 'WebSockets', 'GraphQL', 'gRPC', 'Django'] },
  { title: 'Databases', color: 'amber', items: ['PostgreSQL', 'MongoDB', 'MySQL', 'Firebase', 'Redis', 'SQLite', 'Supabase', 'Prisma'] },
  { title: 'AI & Automation', color: 'green', items: ['LLM Workflows', 'Multi-Agent Systems', 'LangChain', 'OpenAI API', 'Automation Pipelines', 'Prompt Engineering', 'RAG Systems', 'Vector DBs'] },
  { title: 'DevOps & Infra', color: 'cyan', items: ['Docker', 'Linux', 'Git / GitHub', 'Nginx', 'AWS', 'CI/CD', 'Kubernetes', 'Terraform'] },
  { title: 'Cybersecurity', color: 'rose', items: ['Network Security', 'Linux Hardening', 'Ethical Hacking', 'OWASP', 'CTF Exploration', 'Penetration Testing', 'Wireshark', 'Cryptography'] },
  { title: 'Web3 & Blockchain', color: 'purple', items: ['Blockchain Fundamentals', 'Smart Contracts', 'Solidity', 'DeFi Concepts', 'Web3.js', 'Ethers.js', 'On-chain Analysis', 'NFT Systems'] },
];

export const projects = [
  { title: 'Multi-Agent Orchestration System', desc: 'A multi-agent coordination framework where specialized AI agents collaborate to complete complex tasks — research, reasoning, code generation, and output synthesis.', stack: ['Python', 'LangChain', 'OpenAI API', 'FastAPI'], status: 'wip', cat: 'ai automation', icon: '🤖' },
  { title: 'AI Workflow Automation Dashboard', desc: 'A dashboard-driven platform for building, managing, and monitoring AI automation workflows — visual pipeline editor with real-time execution logs.', stack: ['Next.js', 'Node.js', 'PostgreSQL', 'Docker'], status: 'wip', cat: 'web ai', icon: '⚡' },
  { title: 'Developer Portfolio OS', desc: 'An operating-system-inspired personal portfolio and knowledge management system with command palette, real-time status, and modular content architecture.', stack: ['React', 'TypeScript', 'Tailwind', 'Framer Motion'], status: 'live', cat: 'web tools', icon: '🗃️' },
  { title: 'Python Automation Toolkit', desc: 'A collection of intelligent automation scripts for productivity — web scraping, file management, API integrations, and scheduled task orchestration.', stack: ['Python', 'Playwright', 'Celery', 'Redis'], status: 'live', cat: 'automation tools', icon: '🔧' },
  { title: 'SaaS Analytics Platform', desc: 'A full-stack analytics dashboard with event tracking, user segmentation, funnel analysis, and real-time metrics visualization for SaaS products.', stack: ['Next.js', 'Express', 'MongoDB', 'WebSockets'], status: 'wip', cat: 'web', icon: '📊' },
  { title: 'DeFi Portfolio Tracker', desc: 'A web3 portfolio tracking interface that aggregates on-chain data across multiple wallets and protocols, with price feeds and P&L analysis.', stack: ['React', 'Web3.js', 'Ethers.js', 'CoinGecko API'], status: 'concept', cat: 'web3', icon: '🔗' },
  { title: 'Personal Knowledge Engine', desc: 'An AI-powered second brain — ingests notes, documents, and web content, enables semantic search, and surfaces connections between ideas using vector embeddings.', stack: ['Python', 'Chroma DB', 'OpenAI', 'Streamlit'], status: 'wip', cat: 'tools ai', icon: '🧠' },
  { title: 'API Integration Framework', desc: 'A modular REST API integration layer that standardizes authentication, rate limiting, retry logic, and response caching across third-party service connections.', stack: ['Node.js', 'TypeScript', 'Redis', 'Docker'], status: 'live', cat: 'automation tools', icon: '📡' },
  { title: 'OSPRED Security Framework', desc: 'A cybersecurity AI assistant framework with guardrail systems, threat analysis pipelines, and automated vulnerability scanning capabilities.', stack: ['Python', 'FastAPI', 'OpenAI', 'Docker'], status: 'live', cat: 'security ai', icon: '🛡️' },
  { title: 'ShadowForge Crypto Intelligence', desc: 'An industrial-grade autonomous cryptographic vulnerability analysis platform for Ethereum and Bitcoin with deep diagnostics and risk assessment.', stack: ['Next.js', 'FastAPI', 'Python', 'PostgreSQL'], status: 'wip', cat: 'security web3', icon: '🔬' },
  { title: 'NovaVault Fintech OS', desc: 'A full-stack fintech operating system with AI-powered portfolio management, Stripe payment integration, and real-time financial dashboards.', stack: ['Next.js', 'Node.js', 'Stripe API', 'PostgreSQL'], status: 'live', cat: 'web ai', icon: '🏦' },
  { title: 'Aerius SecureTech Platform', desc: 'Premium landing page and product showcase for industrial gas detection startup with real-time monitoring dashboards and safety analytics.', stack: ['React', 'Tailwind CSS', 'Framer Motion', 'Node.js'], status: 'live', cat: 'web', icon: '🏭' },
  { title: 'Unified Secret Scraper', desc: 'Consolidated multi-tool secret scanning CLI combining Betterleaks, Gitleaks, TruffleHog into a single automated security analysis pipeline.', stack: ['Python', 'Go', 'Bash', 'Docker'], status: 'live', cat: 'security tools', icon: '🔑' },
  { title: 'Real-time Chat Infrastructure', desc: 'Scalable WebSocket-based real-time messaging system with presence detection, message persistence, typing indicators, and room management.', stack: ['Node.js', 'Socket.io', 'Redis', 'MongoDB'], status: 'live', cat: 'web', icon: '💬' },
  { title: 'Algorithmic Trading Engine', desc: 'Quantitative trading backtesting framework with strategy builder, market data pipelines, risk analytics, and paper trading capabilities.', stack: ['Python', 'Pandas', 'NumPy', 'PostgreSQL'], status: 'wip', cat: 'trading', icon: '📈' },
  { title: 'AI Content Pipeline', desc: 'Automated content generation and publishing system using multi-model AI orchestration with human-in-the-loop quality controls.', stack: ['Python', 'OpenAI', 'FastAPI', 'Celery'], status: 'live', cat: 'ai automation', icon: '✍️' },
  { title: 'Distributed Task Queue', desc: 'A high-throughput distributed task processing system with priority queues, dead letter handling, retry policies, and monitoring dashboards.', stack: ['Node.js', 'Redis', 'Bull MQ', 'Docker'], status: 'live', cat: 'automation tools', icon: '⚙️' },
  { title: 'Smart Contract Auditor', desc: 'Automated Solidity smart contract analysis tool that detects common vulnerabilities, gas optimization issues, and security anti-patterns.', stack: ['Python', 'Solidity', 'Ethers.js', 'AST Parser'], status: 'concept', cat: 'web3 security', icon: '📋' },
  { title: 'DevOps Pipeline Builder', desc: 'Visual CI/CD pipeline configuration tool with GitHub Actions integration, Docker orchestration, and automated deployment workflows.', stack: ['React', 'Node.js', 'Docker API', 'GitHub API'], status: 'wip', cat: 'tools', icon: '🚀' },
  { title: 'Markdown Knowledge Base', desc: 'A full-featured markdown-powered documentation and knowledge management system with full-text search, tags, and cross-referencing.', stack: ['Next.js', 'MDX', 'Fuse.js', 'Tailwind'], status: 'live', cat: 'tools web', icon: '📚' },
  { title: 'Network Packet Analyzer', desc: 'Real-time network traffic visualization and analysis tool for educational cybersecurity training with protocol breakdown and anomaly detection.', stack: ['Python', 'Scapy', 'React', 'WebSockets'], status: 'wip', cat: 'security tools', icon: '🌐' },
  { title: 'E-Commerce API Platform', desc: 'Modular e-commerce backend with product catalog, cart management, payment processing, inventory tracking, and order fulfillment APIs.', stack: ['Node.js', 'Express', 'PostgreSQL', 'Stripe'], status: 'live', cat: 'web', icon: '🛒' },
  { title: 'AI Resume Optimizer', desc: 'LLM-powered resume analysis and optimization tool that scores resumes against job descriptions and suggests targeted improvements.', stack: ['Python', 'OpenAI', 'React', 'FastAPI'], status: 'live', cat: 'ai web', icon: '📄' },
  { title: 'Crypto Price Alert System', desc: 'Multi-exchange cryptocurrency monitoring bot with configurable alerts, price tracking, and automated notifications via Telegram and email.', stack: ['Python', 'WebSockets', 'Redis', 'Telegram API'], status: 'live', cat: 'web3 automation', icon: '🔔' },
  { title: 'Linux Server Dashboard', desc: 'Real-time server monitoring dashboard with CPU, memory, disk, and network metrics visualization, process management, and alert systems.', stack: ['React', 'Node.js', 'SSH2', 'Chart.js'], status: 'live', cat: 'tools', icon: '🖥️' },
  { title: 'Multi-Model AI Gateway', desc: 'Unified API gateway for routing requests across multiple LLM providers (OpenAI, Anthropic, Ollama) with load balancing and cost tracking.', stack: ['Node.js', 'TypeScript', 'Redis', 'Docker'], status: 'wip', cat: 'ai tools', icon: '🔀' },
  { title: 'Freelance Project Manager', desc: 'Custom project management tool built for freelancers with time tracking, invoicing, client portals, and project milestone tracking.', stack: ['Next.js', 'Prisma', 'PostgreSQL', 'Stripe'], status: 'wip', cat: 'web tools', icon: '📌' },
  { title: 'Automated Testing Framework', desc: 'End-to-end browser testing framework with visual regression detection, parallel execution, and CI integration for web applications.', stack: ['Playwright', 'TypeScript', 'Docker', 'GitHub Actions'], status: 'live', cat: 'tools automation', icon: '🧪' },
  { title: 'Discord Bot Ecosystem', desc: 'Modular Discord bot system with AI chat, server analytics, moderation tools, music streaming, and custom command builders.', stack: ['Python', 'Discord.py', 'Redis', 'PostgreSQL'], status: 'live', cat: 'automation tools', icon: '🎮' },
  { title: 'Web Scraping Orchestrator', desc: 'Scalable web scraping platform with proxy rotation, CAPTCHA solving, data pipeline management, and structured data extraction.', stack: ['Python', 'Scrapy', 'Playwright', 'MongoDB'], status: 'live', cat: 'automation tools', icon: '🕷️' },
  { title: 'Personal Finance Tracker', desc: 'Expense tracking and budgeting application with bank sync capabilities, spending analytics, and financial goal monitoring dashboards.', stack: ['React', 'Node.js', 'PostgreSQL', 'Plaid API'], status: 'concept', cat: 'web', icon: '💰' },
  { title: 'PROX Casino Platform', desc: 'Full-featured casino gaming platform with multi-row slot machines, diverse themes, animated chip effects, and provably fair mechanics.', stack: ['React', 'Node.js', 'WebSockets', 'Canvas API'], status: 'live', cat: 'web', icon: '🎰' },
];

export const experience = [
  {
    period: '2024 — Present',
    role: 'Independent Full Stack Developer',
    org: 'Freelance / Self-Directed',
    bullets: [
      'Built and deployed full-stack web applications for clients across multiple domains, handling everything from architecture to deployment.',
      'Developed AI-powered automation systems and LLM-driven workflows for productivity and business process optimization.',
      'Created REST APIs, backend services, and database architectures with PostgreSQL, MongoDB, and Firebase.',
      'Delivered responsive, modern frontend interfaces using React and Next.js with smooth UI/UX.',
      'Experimented with multi-agent coordination systems, building orchestrated AI pipelines for complex task automation.',
    ],
  },
  {
    period: '2023 — 2024',
    role: 'Technical Researcher & Builder',
    org: 'Self-Directed',
    bullets: [
      'Independently explored cybersecurity fundamentals, Linux environments, and networking concepts through hands-on experimentation.',
      'Studied web3 and blockchain ecosystems — smart contracts, DeFi protocols, and decentralized application architecture.',
      'Built developer tools, productivity systems, and personal automation workflows as engineering practice.',
      'Rapid prototyping across domains — each project designed to push skill boundaries and produce real, working software.',
    ],
  },
  {
    period: 'Ongoing',
    role: 'Technical Writer & Experimenter',
    org: 'Personal — Writing & Research',
    bullets: [
      'Writing books and long-form technical essays on engineering, systems thinking, and the future of technology.',
      'Maintaining learning logs, research notes, and idea archives as a personal technical knowledge system.',
      'Exploring algorithmic trading concepts, financial systems, and market structure as a secondary research interest.',
    ],
  },
];

export const learning = [
  { icon: '🧠', title: 'LLM Systems & AI Architecture', text: 'Building with large language models — RAG systems, fine-tuning, prompt engineering, agent loops, and multi-step reasoning pipelines.', progress: 75 },
  { icon: '🔐', title: 'Cybersecurity & Ethical Hacking', text: 'Network security, penetration testing fundamentals, OWASP vulnerabilities, Linux security hardening, and CTF challenge practice.', progress: 55 },
  { icon: '⛓️', title: 'Web3 & Blockchain Engineering', text: 'Smart contract development, DeFi protocol mechanics, on-chain data analysis, Layer 2 architectures, and decentralized application development.', progress: 40 },
  { icon: '📈', title: 'Algorithmic Trading & Market Systems', text: 'Quantitative finance fundamentals, algorithmic strategy design, backtesting frameworks, market microstructure, and financial data pipelines.', progress: 45 },
  { icon: '🏗️', title: 'System Architecture & Scalability', text: 'Distributed systems design, microservices patterns, caching strategies, message queues, database sharding, and high-availability architecture.', progress: 60 },
  { icon: '🚀', title: 'Startup & Product Engineering', text: 'SaaS business models, product-market fit, growth engineering, technical founding strategies, and building products from zero to launch.', progress: 65 },
];

export const interests = [
  { icon: '📊', title: 'Algorithmic Trading Research', text: 'I research market structure, order flow dynamics, and quantitative strategies. Building automated trading systems is the intersection of financial logic and software engineering — two areas I find compelling. Currently studying backtesting frameworks and developing systematic approach to market analysis.', tags: ['Quantitative Finance', 'Backtesting', 'Market Microstructure', 'Python'] },
  { icon: '⛓️', title: 'Web3 & Decentralized Systems', text: "I explore blockchain technology from a systems engineering perspective — consensus mechanisms, smart contract logic, DeFi protocol architecture, and the economic primitives underlying Web3. I'm interested in the technical infrastructure, not the speculation.", tags: ['Blockchain', 'Smart Contracts', 'DeFi Protocols', 'Solidity'] },
  { icon: '🏦', title: 'Fintech & Financial Products', text: 'The intersection of engineering and financial systems produces some of the most demanding and interesting software. I study payment systems, banking infrastructure, and emerging fintech architectures — with an eye toward eventually building financial products.', tags: ['Payment Systems', 'API Banking', 'Product Design'] },
  { icon: '🌐', title: 'Open Source & Decentralized Tools', text: 'Open source is the infrastructure of the modern internet. I study how major OSS projects are architected, governed, and monetized — and actively look for opportunities to contribute to tools that matter.', tags: ['Open Source', 'GitHub', 'Protocol Design'] },
];

export const cybersecurity = [
  { icon: '🔐', title: 'Network Security', text: 'Studying TCP/IP stack security, packet analysis with Wireshark, firewall configurations, VPN architectures, and intrusion detection systems.' },
  { icon: '🐧', title: 'Linux & System Hardening', text: 'Deep Linux proficiency — file system security, user privilege management, systemd services, SSH hardening, and kernel-level concepts.' },
  { icon: '🕵️', title: 'Ethical Hacking & CTFs', text: 'Exploring ethical hacking methodologies — reconnaissance, vulnerability scanning, exploitation techniques — through CTF challenges and lab environments.' },
  { icon: '🛡️', title: 'Application Security', text: 'OWASP Top 10 vulnerabilities, secure coding practices, authentication systems (JWT, OAuth), input sanitization, and security-first API design.' },
  { icon: '🏗️', title: 'Infrastructure & Architecture', text: 'Server infrastructure design, containerization security with Docker, secrets management, environment isolation, and cloud security fundamentals.' },
  { icon: '🔬', title: 'Security Research', text: 'Following CVE disclosures, security researchers, and vulnerability reports. Reading papers on cryptographic systems, zero-knowledge proofs, and privacy-preserving computation.' },
];

export const writing = [
  { type: 'Book', typeClass: 'wt-book', date: 'In Progress', title: "The Builder's Operating System", preview: 'A framework for how technical people should structure their learning, work, and long-term career — drawing from systems thinking, engineering principles, and startup culture.' },
  { type: 'Essay', typeClass: 'wt-essay', date: 'Draft', title: 'Why Generalists Win in the Age of AI', preview: 'AI commoditizes depth but rewards breadth and coordination. Technical generalists who can architect across domains will lead the next generation of product builders.' },
  { type: 'Research Log', typeClass: 'wt-log', date: 'Ongoing', title: 'Cybersecurity Field Notes', preview: 'Running log of security research, vulnerability patterns discovered during ethical exploration, and notes from CTF challenges and security communities.' },
  { type: 'Idea', typeClass: 'wt-idea', date: 'Concept', title: 'Multi-Agent Economics: How AI Agents Will Trade Value', preview: 'Speculation on the emerging economy of AI agents — when agents can hire other agents, hold crypto, and complete contracts, what market structures emerge?' },
  { type: 'Essay', typeClass: 'wt-essay', date: 'Draft', title: 'Building in Public from India', preview: 'On the unique position of technical founders from India — the advantages, the real constraints, and why the internet has eliminated most of the barriers.' },
  { type: 'Research Log', typeClass: 'wt-log', date: 'Ongoing', title: 'Systems Architecture Study Notes', preview: 'Distilled notes from studying distributed systems — database internals, consensus algorithms, consistency models, and real-world architecture case studies.' },
];

export const services = [
  { icon: '⚡', title: 'Full Stack Development', desc: 'End-to-end web applications — React/Next.js frontend, Node.js or Python backend, database design, and cloud deployment.', price: 'Project-based / Hourly' },
  { icon: '🤖', title: 'AI & Automation Systems', desc: 'LLM integrations, multi-agent workflows, automation pipelines, and AI-powered feature development for your product.', price: 'Consultation + Build' },
  { icon: '🔌', title: 'API Development', desc: 'Robust REST APIs, third-party integrations, webhook systems, and backend microservices built for performance and security.', price: 'Project-based' },
  { icon: '📊', title: 'Dashboard & Analytics', desc: 'Custom admin panels, real-time analytics dashboards, data visualization platforms, and operational monitoring tools.', price: 'Project-based' },
  { icon: '🏗️', title: 'Technical Consulting', desc: 'Architecture reviews, technology selection, system design consultation, and technical strategy for early-stage products.', price: 'Hourly / Retainer' },
  { icon: '🚀', title: 'Rapid Prototyping', desc: 'Fast, functional MVPs to validate your idea — from wireframe to working product in weeks, not months.', price: 'Fixed scope' },
];

export const roadmap = {
  now: [
    'Ship multi-agent AI orchestration system',
    'Build out freelance client base',
    'Deep dive into cybersecurity fundamentals',
    'Complete first technical book draft',
    'Master system architecture patterns',
    'Launch personal knowledge engine',
  ],
  next: [
    'Launch first SaaS product',
    'Build AI automation platform MVP',
    'Earn security certification (CEH/OSCP path)',
    'Grow technical writing audience',
    'Open source contributions to major repos',
    'Build algorithmic trading system (paper)',
  ],
  future: [
    'Co-found a technical startup',
    'Build a profitable AI tooling business',
    'Publish technical book commercially',
    'Launch web3 product or protocol',
    'Build recognized technical brand',
    'Create elite developer community',
  ],
};

export const monetization = [
  { icon: '💼', title: 'Freelance Development', desc: 'Full-stack web applications, API development, automation systems, and AI integrations for clients.', badge: 'Active', badgeClass: 'gb-green' },
  { icon: '🤖', title: 'AI Automation Services', desc: 'Building custom AI workflows, LLM integrations, and automation pipelines for businesses.', badge: 'Building', badgeClass: 'gb-amber' },
  { icon: '🚀', title: 'Future SaaS Products', desc: 'Developer tools, AI productivity apps, and workflow automation platforms.', badge: 'Planned', badgeClass: 'gb-purple' },
  { icon: '📚', title: 'Technical Writing & Books', desc: 'Publishing technical books, courses, and content. Building an audience through writing.', badge: 'Building', badgeClass: 'gb-amber' },
  { icon: '📊', title: 'Trading Systems', desc: 'Algorithmic trading strategy development and market analysis. Currently in research phase.', badge: 'Research', badgeClass: 'gb-purple' },
  { icon: '🔗', title: 'Open Source & Community', desc: 'Building reputation through OSS contributions, technical blog, and community building.', badge: 'Building', badgeClass: 'gb-amber' },
];

export const focus = [
  { emoji: '🤖', label: 'Multi-Agent AI', sub: 'Building orchestrated systems', heat: 5 },
  { emoji: '⚡', label: 'Full Stack Freelance', sub: 'Client projects & products', heat: 4 },
  { emoji: '🔐', label: 'Cybersecurity', sub: 'Ethical hacking & CTFs', heat: 3 },
  { emoji: '📝', label: 'Writing', sub: 'Books & technical essays', heat: 4 },
  { emoji: '⛓️', label: 'Web3 Research', sub: 'DeFi & smart contracts', heat: 2 },
  { emoji: '📊', label: 'Trading Systems', sub: 'Algo strategies & backtesting', heat: 3 },
  { emoji: '🏗️', label: 'System Architecture', sub: 'Scalable distributed design', heat: 4 },
  { emoji: '🚀', label: 'Product Building', sub: 'Future SaaS & tools', heat: 5 },
];
