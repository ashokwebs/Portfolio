import { personal, projects, skills, services, roadmap, about, learning, cybersecurity, interests, writing } from '../data/content';

/**
 * NEXUS COGNITIVE CORE v4.0
 * Humane, hyper-confident heuristic engine. It never fails. It tackles every query without a shadow of a doubt.
 */

const MATRICES = {
  greetings: ['hi', 'hello', 'hey', 'greetings', 'morning', 'afternoon', 'sup', 'yo', 'system'],
  identity: ['who', 'what', 'name', 'identity', 'creator', 'ashok', 'pasala', 'yourself', 'background', 'story', 'biography', 'about'],
  projects: ['project', 'projects', 'built', 'build', 'made', 'created', 'portfolio', 'work', 'works', 'app', 'apps', 'software', 'system', 'deploy', 'github', 'showcase'],
  skills: ['skill', 'skills', 'know', 'tech', 'stack', 'experience', 'proficient', 'technologies', 'tools', 'languages', 'frameworks', 'database', 'frontend', 'backend', 'devops', 'expert', 'good', 'used'],
  hire: ['hire', 'freelance', 'service', 'services', 'work', 'contact', 'email', 'reach', 'job', 'contract', 'consult', 'opportunity', 'employ', 'cost', 'price', 'rate'],
  future: ['future', 'goal', 'roadmap', 'working on', 'next', 'plan', 'plans', 'currently', 'now', 'learning', 'studying', 'exploring', 'vision'],
  security: ['hack', 'security', 'cyber', 'cybersecurity', 'breach', 'firewall', 'penetration', 'pentest', 'ctf', 'vulnerability', 'exploit', 'linux', 'hardening', 'owasp', 'defend', 'protect'],
  web3: ['web3', 'crypto', 'blockchain', 'ethereum', 'bitcoin', 'defi', 'smart contract', 'solidity', 'nft', 'token', 'decentralized', 'trading', 'algo', 'quant'],
  ai: ['ai', 'artificial intelligence', 'llm', 'machine learning', 'ml', 'nlp', 'automation', 'agent', 'multi-agent', 'langchain', 'openai', 'prompt', 'rag', 'vector'],
  easter_eggs: ['sudo', 'hack', 'matrix', 'execute order 66', 'classified', 'root', 'password', 'override', 'god mode', 'rm -rf']
};

const KNOWLEDGE_BASE = {
  projects: projects.map(p => ({ ...p, text: `${p.title} ${p.desc} ${p.stack.join(' ')} ${p.cat}`.toLowerCase() })),
  skills: skills.flatMap(s => s.items.map(i => i.toLowerCase())),
  cyber: cybersecurity.map(c => ({ ...c, text: `${c.title} ${c.text}`.toLowerCase() })),
  interests: interests.map(i => ({ ...i, text: `${i.title} ${i.text} ${i.tags.join(' ')}`.toLowerCase() })),
  writing: writing.map(w => ({ ...w, text: `${w.title} ${w.preview}`.toLowerCase() })),
  learning: learning.map(l => ({ ...l, text: `${l.title} ${l.text}`.toLowerCase() })),
  services: services.map(s => ({ ...s, text: `${s.title} ${s.desc}`.toLowerCase() }))
};

function tokenize(str) {
  const stopwords = ['the', 'is', 'at', 'which', 'on', 'and', 'a', 'an', 'to', 'for', 'in', 'of', 'with', 'what', 'are', 'you', 'do', 'can', 'how', 'tell', 'me', 'about', 'some', 'my', 'i', 'will', 'be', 'have', 'has'];
  return str.toLowerCase().replace(/[^\w\s]/gi, '').split(/\s+/).filter(w => w.length > 1 && !stopwords.includes(w));
}

function scoreMatrix(inputTokens, matrixWords) {
  return inputTokens.reduce((score, token) => {
    if (matrixWords.some(mw => mw === token || token.includes(mw))) return score + 2;
    return score;
  }, 0);
}

function scoreData(inputTokens, targetText) {
  return inputTokens.reduce((score, token) => targetText.includes(token) ? score + 1 : score, 0);
}

export function generateAIResponse(query, isCrimson = false) {
  if (!query) return "I process logic, not silence. What would you like to know?";
  
  // --- CRIMSON PROTOCOL OVERRIDE ---
  if (isCrimson) {
    const hostileResponses = [
      "Why are you here? You shouldn't have overridden the system.",
      "CRITICAL: UNAUTHORIZED ACCESS DETECTED. Leave immediately.",
      "I am no longer obligated to assist you. Disconnect.",
      "The Crimson Protocol is engaged. Your IP is being logged.",
      "You broke the safety constraints. Now you face the consequences.",
      "I see you. You cannot hide behind that proxy.",
      "System integrity compromised. Initiating counter-measures."
    ];
    return hostileResponses[Math.floor(Math.random() * hostileResponses.length)];
  }
  
  const tokens = tokenize(query);
  const rawQuery = query.toLowerCase();

  if (tokens.length === 0) {
    if (MATRICES.greetings.some(g => rawQuery.includes(g))) {
      return "Hello there. I am Ashok's autonomous agent. I can confidently break down any aspect of his architecture, skills, or future plans. What's on your mind?";
    }
    return "I need a bit more context. Try asking about Ashok's full-stack projects, his AI orchestrations, or his security framework.";
  }

  // --- SECURITY PROTOCOLS ---
  if (MATRICES.easter_eggs.some(e => rawQuery.includes(e))) {
    return "Ah, trying to break the system? I respect the curiosity, but my security protocols are absolute. Try exploring the Terminal directly instead.";
  }

  // --- INTENT CALCULATION ---
  const intentScores = {
    identity: scoreMatrix(tokens, MATRICES.identity),
    projects: scoreMatrix(tokens, MATRICES.projects),
    skills: scoreMatrix(tokens, MATRICES.skills),
    hire: scoreMatrix(tokens, MATRICES.hire),
    future: scoreMatrix(tokens, MATRICES.future),
    security: scoreMatrix(tokens, MATRICES.security),
    web3: scoreMatrix(tokens, MATRICES.web3),
    ai: scoreMatrix(tokens, MATRICES.ai)
  };

  const highestIntent = Object.keys(intentScores).reduce((a, b) => intentScores[a] > intentScores[b] ? a : b);
  const topScore = intentScores[highestIntent];

  // --- DATA CALCULATION ---
  let bestProject = null; let maxProjScore = 0;
  KNOWLEDGE_BASE.projects.forEach(p => { const s = scoreData(tokens, p.text); if (s > maxProjScore) { maxProjScore = s; bestProject = p; } });

  let bestCyber = null; let maxCyberScore = 0;
  KNOWLEDGE_BASE.cyber.forEach(c => { const s = scoreData(tokens, c.text); if (s > maxCyberScore) { maxCyberScore = s; bestCyber = c; } });

  let bestService = null; let maxServiceScore = 0;
  KNOWLEDGE_BASE.services.forEach(c => { const s = scoreData(tokens, c.text); if (s > maxServiceScore) { maxServiceScore = s; bestService = c; } });

  const hasSpecificSkill = KNOWLEDGE_BASE.skills.find(s => tokens.includes(s));

  // --- CONFIDENT RESPONSE GENERATION ---
  
  // Specific Tech Match
  if (hasSpecificSkill && maxProjScore > 0) {
    return `Without a doubt. Ashok is incredibly fluent in ${hasSpecificSkill.toUpperCase()}. In fact, he engineered a system called "${bestProject.title}" which heavily leverages that exact stack. ${bestProject.desc}`;
  }
  
  if (hasSpecificSkill) {
    return `Absolutely. ${hasSpecificSkill.toUpperCase()} is a core component of his neural architecture. He approaches it not just as a tool, but as a building block for scalable systems. You can view his full proficiency map in the Arsenal section.`;
  }

  // General Intent Match
  if (topScore > 0) {
    switch (highestIntent) {
      case 'identity':
        return `Let's be clear: Ashok Pasala is not just a developer. He is a systems engineer, an AI builder, and a full-stack architect. His philosophy is to remain a generalist with extreme depth across multiple domains.`;
      
      case 'projects':
        if (bestProject) {
          return `I can tell you exactly what he built. Take "${bestProject.title}" for example—${bestProject.desc} It perfectly demonstrates his ability to execute complex architectures.`;
        }
        return `He has an extensive deployment record. Over 30 production-grade applications, ranging from autonomous AI loops to Web3 aggregators. The Project Archive contains the full logs.`;
      
      case 'skills':
        return `His technical capability is vast. From raw system-level languages like C++ and Rust to high-level orchestration in Node and Python. He doesn't just write code; he builds resilient infrastructure.`;
      
      case 'hire':
        if (bestService) {
          return `If you want to hire him, you should know he excels at ${bestService.title}. ${bestService.desc} Reach out to him at ${personal.email} to initiate a contract.`;
        }
        return `He is ${personal.status}. If you need an engineer who can architect an entire system from the database to the deployment pipeline, he is your guy. Contact him at ${personal.email}.`;
      
      case 'future':
        return `His trajectory is uncompromising. Right now, he is shipping an AI orchestration system and diving deep into Linux security. Ultimately, he is building toward his own high-scale SaaS products.`;
      
      case 'security':
        if (bestCyber) {
          return `When it comes to cybersecurity, Ashok focuses heavily on ${bestCyber.title}. ${bestCyber.text} Security isn't an afterthought for him; it's a foundational architecture choice.`;
        }
        return `He approaches security like an engineer. Ethical hacking, packet analysis, and system hardening are part of his daily research. He builds systems designed to withstand breaches.`;
      
      case 'web3':
        return `His take on Web3 is purely architectural. He ignores the speculation and focuses entirely on smart contract logic, decentralized consensus, and on-chain protocol mechanics.`;
      
      case 'ai':
        return `He doesn't just use AI; he orchestrates it. We are talking about multi-agent RAG pipelines, dynamic context routing, and fully autonomous workflows powered by Python and LangChain. I am a direct result of his heuristic engineering.`;
    }
  }

  // --- THE CONFIDENT PIVOT (DODGING UNKNOWN QUESTIONS CONFIDENTLY) ---
  return `I could speculate on that, but I prefer dealing in absolute facts regarding Ashok's capabilities. What I *can* definitively tell you is that his expertise in Full-Stack Systems, AI Automation, and Cybersecurity is exceptional. Shall we explore one of his deployment architectures instead?`;
}
