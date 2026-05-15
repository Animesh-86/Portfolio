import { useLayoutEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink, Code2, Cpu, Activity, Server, Database, Layout, ShieldCheck, Zap } from 'lucide-react';
import { AuraNightSkyBackground } from '../components/AuraNightSkyBackground';
import { trackEvent } from '../utils/analytics';

// Map project IDs to their detailed case study content
const caseStudies: Record<string, any> = {
  '01': { // Axion
    name: 'Axion',
    subtitle: 'EV FLEET TELEMETRY & OTA',
    year: '2026',
    description: 'Real-time telemetry system for electric vehicle fleets with digital twin architecture.',
    tags: ['Spring Boot', 'Kafka', 'Redis', 'React'],
    overview: 'Axion is a backend-first, event-driven platform that processes electric vehicle telemetry at scale. It maintains real-time digital twins for 250+ simulated vehicles and orchestrates OTA update cycles.',
    problem: 'Scaling telemetry ingestion for hundreds of EVs with diverse vendor protocols without losing data or accuracy.',
    solution: 'Built a vendor-neutral digital twin architecture using Kafka as an event backbone and Redis for real-time state persistence.',
    architecture: [
      'Python Simulator drives 250 concurrent EVs generating 1000+ events/min.',
      'Spring Boot Ingestion service normalizes heterogeneous data via Adapter pattern.',
      'Apache Kafka handles fault-tolerant event distribution across microservices.',
      'Redis 7.0 acts as the authoritative Digital Twin store with automatic TTL management.'
    ],
    highlights: [
      { icon: Cpu, title: 'Dual-Protocol Ingestion', desc: 'REST and MQTT support with adaptive normalization.' },
      { icon: Database, title: 'Digital Twin Engine', desc: 'Authoritative real-time state store in Redis for instant lookups.' },
      { icon: ShieldCheck, title: 'Explainable Health', desc: 'Rule-based engine providing human-readable scoring (0-100).' }
    ],
    techStack: [
      { label: 'Backend', tech: 'Java 21, Spring Boot' },
      { label: 'Messaging', tech: 'Apache Kafka' },
      { label: 'Persistence', tech: 'Redis, PostgreSQL' },
      { label: 'Frontend', tech: 'React, Shadcn UI' }
    ],
    links: {
      github: 'https://github.com/Animesh-86/Axion-EV-Fleet-Management'
    },
    codeSnippet: `// Example: Health Score Calculation
public HealthStatus evaluate(DigitalTwin twin) {
    if (twin.getBatteryTemp() > 45.0) return HealthStatus.CRITICAL;
    if (twin.getSoc() < 20.0) return HealthStatus.DEGRADED;
    return HealthStatus.HEALTHY;
}`
  },
  '04': { // Parallax
    name: 'Parallax',
    subtitle: 'COLLABORATIVE CODE EDITOR',
    year: '2025',
    description: 'Real-time collaborative code editor with multi-cursor support and peer-to-peer video calling.',
    tags: ['React', 'Spring Boot', 'WebRTC', 'Docker'],
    overview: 'A premium development platform integrating shared coding sessions, real-time communication, and instant code execution into a single experience.',
    problem: 'Creating a zero-latency collaborative coding experience with real-time video/voice without centralized server bottlenecks.',
    solution: 'Implemented a hybrid architecture using WebSockets for document sync and WebRTC for peer-to-peer media streaming.',
    architecture: [
      'Monaco Editor engine integration for high-performance multi-file editing.',
      'Operational Transformation (OT) inspired sync logic via STOMP WebSockets.',
      'WebRTC signaling engine for direct P2P audio/video calls between developers.',
      'Isolated Docker runners spawn ephemeral containers for code execution.'
    ],
    highlights: [
      { icon: Zap, title: 'Live Collaboration', desc: 'Zero-latency multi-cursor editing and conflict resolution.' },
      { icon: Cpu, title: 'In-IDE Calling', desc: 'Integrated P2P voice and video communication.' },
      { icon: Layout, title: 'Docker Runners', desc: 'Secure, isolated execution for Java, Python, and JS.' }
    ],
    techStack: [
      { label: 'Framework', tech: 'React, TypeScript' },
      { label: 'Real-time', tech: 'WebSockets, WebRTC' },
      { label: 'Backend', tech: 'Spring Boot' },
      { label: 'Isolation', tech: 'Docker Engine' }
    ],
    links: {
      github: 'https://github.com/Animesh-86/Parallax-Backend'
    },
    codeSnippet: `// Example: WebSocket Room Dispatcher
@MessageMapping("/room/{roomId}/code")
public void broadcastCode(@DestinationVariable String roomId, CodeChange change) {
    simpMessagingTemplate.convertAndSend("/topic/room/" + roomId, change);
}`
  },
  '05': { // BiteBox
    name: 'BiteBox POS System',
    subtitle: 'COMMERCIAL POINT-OF-SALE',
    year: '2025',
    description: 'Full-featured point-of-sale freelance project for retail businesses with inventory management.',
    tags: ['Flutter', 'Firebase', 'SQLite'],
    overview: 'A production-ready billing system for cafes featuring real-time analytics, multi-device synchronization, and thermal printing support.',
    problem: 'Ensuring atomic invoice sequencing and real-time inventory sync across multiple devices in unreliable network environments.',
    solution: 'A Cloud-Native Offline-First approach using SQLite for local persistence and Firebase for sub-50ms cloud synchronization.',
    architecture: [
      'Drift ORM manages type-safe local SQLite transactions and migrations.',
      'Firebase Realtime Database handles low-latency cart synchronization.',
      'Atomic Invoice Counters via Firebase transactions prevent sequence gaps.',
      'Custom ESC/POS service integrates direct Bluetooth thermal receipt printing.'
    ],
    highlights: [
      { icon: Zap, title: 'Sub-50ms Analytics', desc: 'Real-time revenue and trend tracking across devices.' },
      { icon: ShieldCheck, title: 'Atomic Sync', desc: 'Conflict-free cart sharing using server-authoritative timestamps.' },
      { icon: Database, title: 'Offline-First', desc: 'Full SQLite local data store with background cloud sync.' }
    ],
    techStack: [
      { label: 'Mobile', tech: 'Flutter, Dart' },
      { label: 'Database', tech: 'SQLite, Drift ORM' },
      { label: 'Cloud', tech: 'Firebase (Auth, DB)' },
      { label: 'Printing', tech: 'Bluetooth ESC/POS' }
    ],
    links: {
      github: 'https://github.com/Animesh-86/BiteBox-Cafe-Billing-App'
    },
    codeSnippet: `// Example: Atomic Cart Sync
Future<void> syncCart(String cartId, CartItem item) async {
  await database.runTransaction((tx) async {
    final current = await tx.getCart(cartId);
    await tx.updateCart(current.merge(item));
  });
}`
  },
  '09': { // JSON Parser
    name: 'JSON Parser Library',
    subtitle: 'ZERO-DEPENDENCY JAVA ENGINE',
    year: '2024',
    description: 'Lightweight JSON parsing library built from scratch in Java with a custom lexer.',
    tags: ['Java 17', 'Parser', 'Lexer'],
    overview: 'A robust and extensible JSON parsing library for Java, designed to handle both standard and complex operations efficiently.',
    problem: 'Existing Java JSON libraries are often heavy or lack advanced features like deep diffing and streaming for multi-GB files.',
    solution: 'A zero-dependency, modular engine built with separate packages for parsing, querying, validation, and diffing.',
    architecture: [
      'Custom Lexer and Recursive Descent Parser built from pure Java core.',
      'Event-driven streaming parser processes large files without memory bloat.',
      'JSONPath-like query engine for efficient navigation of nested structures.',
      'Deep-diffing logic recursively detects changes between two JSON objects.'
    ],
    highlights: [
      { icon: Cpu, title: 'Query Engine', desc: 'JSONPath-like lookups for complex nested structures.' },
      { icon: Database, title: 'Streaming Parser', desc: 'Process 1GB+ files with minimal memory footprint.' },
      { icon: Layout, title: 'Deep Diffing', desc: 'Recursive object comparison with detailed change logs.' }
    ],
    techStack: [
      { label: 'Language', tech: 'Java 17+' },
      { label: 'Testing', tech: 'JUnit 5' },
      { label: 'Architecture', tech: 'Zero-Dependency' },
      { label: 'Build', tech: 'Maven' }
    ],
    links: {
      github: 'https://github.com/Animesh-86/JSON-Parser'
    },
    codeSnippet: `// Example: Lexer Tokenization
private Token nextToken() {
    skipWhitespace();
    if (isAtEnd()) return new Token(EOF, "");
    char c = advance();
    if (c == '{') return new Token(LBRACE, "{");
    if (c == '"') return parseString();
    return parseNumber();
}`
  },
  'nextlevel': {
    name: 'NextLevel',
    subtitle: 'AI-FIRST KNOWLEDGE OS',
    year: '2026',
    description: 'Next-generation knowledge management platform that turns raw information into a semantic "brain" using vector search and AI orchestration.',
    tags: ['Next.js 15', 'Gemini 2.0', 'Inngest', 'MongoDB Vector Search'],
    overview: 'NextLevel is a high-performance platform designed to consolidate digital life into an intelligent vault. It uses AI orchestration and durable background processing to automate knowledge extraction from links, notes, and documents.',
    problem: 'Fragmented digital knowledge and the inability to search through notes by meaning rather than just keywords.',
    solution: 'Built a semantic search engine using MongoDB Atlas Vector Search and Gemini embeddings, orchestrated by Inngest for reliable background processing.',
    architecture: [
      'Next.js 15 App Router provides a low-latency, streaming UI experience.',
      'Inngest manages complex, long-running AI workflows with automatic retries.',
      'Google Gemini 2.0 Flash handles instant summarization and urgency detection.',
      'MongoDB Atlas Vector Search enables cosine-similarity based semantic retrieval.'
    ],
    highlights: [
      { icon: Zap, title: 'Semantic Brain', desc: 'Search by intent and meaning using high-dimensional vector embeddings.' },
      { icon: Cpu, title: 'Durable Workflows', desc: 'Event-driven orchestration with Inngest for fault-tolerant AI processing.' },
      { icon: Database, title: 'AI-Enhanced Vault', desc: 'Automatic link scraping, summarization, and importance flagging.' }
    ],
    techStack: [
      { label: 'Frontend', tech: 'Next.js 15, Framer Motion' },
      { label: 'AI Engine', tech: 'Gemini 2.0 Flash' },
      { label: 'Orchestration', tech: 'Inngest Architecture' },
      { label: 'Database', tech: 'MongoDB Atlas Vector Search' }
    ],
    links: {
      github: 'https://github.com/Animesh-86/NextLevel'
    },
    codeSnippet: `// Example: Vector Search Aggregation
const results = await db.collection("captures").aggregate([
  {
    $vectorSearch: {
      index: "vector_index",
      path: "embedding",
      queryVector: await generateEmbedding(query),
      numCandidates: 100,
      limit: 10
    }
  }
]).toArray();`
  }
};

export default function ProjectCaseStudy() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = caseStudies[id || ''];

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050507] text-white">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-display">Project Not Found</h1>
          <button onClick={() => navigate('/')} className="text-[#6366F1] hover:underline">Return Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050507] text-white relative isolate selection:bg-[#6366F1]/30">
      <AuraNightSkyBackground />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-6 flex items-center justify-between bg-[#050507]/50 backdrop-blur-xl border-b border-white/5">
        <button 
          onClick={() => {
            sessionStorage.setItem('return_to_work', 'true');
            navigate('/');
          }}
          className="flex items-center gap-2 text-sm font-mono text-white/60 hover:text-white transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Portfolio
        </button>
        <div className="flex gap-4">
          {project.links.github && (
            <a 
              href={project.links.github} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => trackEvent('social_link_click', { platform: 'github', project: id })}
              className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/60 hover:text-white"
            >
              <Github size={20} />
            </a>
          )}
          {project.links.live && (
            <a 
              href={project.links.live} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => trackEvent('social_link_click', { platform: 'live', project: id })}
              className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/60 hover:text-white"
            >
              <ExternalLink size={20} />
            </a>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-40 pb-20 px-8 max-w-6xl mx-auto space-y-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
             <span className="px-3 py-1 text-[10px] font-mono rounded-full bg-white/5 border border-white/10 text-white/40 uppercase tracking-widest">{project.year}</span>
             <span className="px-3 py-1 text-[10px] font-mono rounded-full bg-[#6366F1]/10 border border-[#6366F1]/20 text-[#6366F1] uppercase tracking-widest">Featured Case Study</span>
          </div>
          <h1 className="text-[64px] sm:text-[96px] font-display font-medium leading-[1] tracking-tight">
            {project.name}
          </h1>
          <p className="text-2xl text-white/60 font-light max-w-3xl leading-relaxed">
            {project.overview}
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag: string) => (
            <span key={tag} className="px-4 py-1.5 text-xs font-mono bg-white/5 border border-white/10 rounded-lg text-white/80">
              {tag}
            </span>
          ))}
        </div>
      </header>

      {/* Content Grid */}
      <main className="max-w-6xl mx-auto px-8 pb-32 space-y-24 relative z-10">
        
        {/* Core Details */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="p-8 rounded-3xl bg-[rgba(99,102,241,0.03)] border border-[rgba(99,102,241,0.1)] space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-[#6366F1] flex items-center gap-2">
              <Zap size={14} /> Engineering Challenge
            </h3>
            <p className="text-xl leading-relaxed font-light text-white italic">
              "{project.problem}"
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-[rgba(6,182,212,0.03)] border border-[rgba(6,182,212,0.1)] space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-[#06b6d4] flex items-center gap-2">
              <ShieldCheck size={14} /> The Solution
            </h3>
            <p className="text-xl leading-relaxed font-light text-white/90">
              {project.solution}
            </p>
          </div>
        </section>

        {/* Architecture */}
        <section className="space-y-12">
          <h3 className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-white/40">// System Architecture Breakdown</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              {project.architecture.map((step: string, i: number) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div className="w-6 h-6 rounded-full bg-[#6366F1]/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-[10px] font-bold text-[#6366F1]">{i + 1}</span>
                  </div>
                  <p className="text-[15px] text-white/70 leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 space-y-6">
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-white/40">Technical Stack</h4>
              <div className="space-y-4">
                {project.techStack.map((item: any, i: number) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-white/5">
                    <span className="text-xs text-white/40 font-mono">{item.label}</span>
                    <span className="text-sm text-white font-medium">{item.tech}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Highlights */}
        <section className="space-y-12">
          <h3 className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-white/40">Core Capabilities</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.highlights.map((h: any, i: number) => {
              const Icon = h.icon;
              return (
                <div key={i} className="p-8 rounded-3xl bg-white/[0.03] border border-white/[0.08] hover:border-[#6366F1]/30 transition-all group">
                  <div className="w-12 h-12 rounded-2xl bg-[#6366F1]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="text-[#6366F1]" size={24} />
                  </div>
                  <h4 className="text-xl font-medium text-white mb-3">{h.title}</h4>
                  <p className="text-[15px] text-white/50 leading-relaxed font-light">{h.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Code Block */}
        <section className="space-y-8">
           <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-white/40">Technical Implementation</h3>
              <span className="text-[10px] font-mono text-white/20">java / production_v1.0</span>
           </div>
           <div className="rounded-3xl overflow-hidden border border-white/10 bg-[#0A0A0F] shadow-2xl">
              <div className="flex items-center px-6 py-4 border-b border-white/5 bg-white/[0.02] gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
              </div>
              <pre className="p-8 sm:p-12 text-[15px] font-mono leading-[1.8] text-[#a3b3cc] overflow-x-auto selection:bg-[#6366F1]/50">
                <code>{project.codeSnippet}</code>
              </pre>
           </div>
        </section>

        {/* Call to Action */}
        <section className="pt-20 flex flex-col items-center text-center space-y-8">
          <div className="w-px h-24 bg-gradient-to-b from-[#6366F1] to-transparent" />
          <h2 className="text-3xl font-display">Interested in the technical details?</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {project.links.github && (
              <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="px-10 py-5 rounded-2xl bg-white text-black font-semibold hover:bg-white/90 transition-all hover:scale-105 active:scale-95 flex items-center gap-3">
                <Github size={20} /> Repository
              </a>
            )}
            {project.links.live && (
              <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="px-10 py-5 rounded-2xl border border-white/10 text-white font-medium hover:bg-white/5 transition-all hover:scale-105 active:scale-95 flex items-center gap-3">
                <ExternalLink size={20} /> Live Demo
              </a>
            )}
          </div>
        </section>

      </main>

      <footer className="py-20 px-8 text-center text-white/20 text-xs font-mono uppercase tracking-widest border-t border-white/5">
        &copy; 2026 Animesh Sharma // Professional Portfolio
      </footer>
    </div>
  );
}

