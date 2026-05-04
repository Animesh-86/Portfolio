import { useLayoutEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink, Code2, Cpu, Activity, Server } from 'lucide-react';
import { AuraNightSkyBackground } from '../components/AuraNightSkyBackground';

// Map project IDs to their detailed case study content
const caseStudies: Record<string, any> = {
  '01': { // Axion
    name: 'Axion',
    year: '2026',
    description: 'Real-time telemetry system for electric vehicle fleets with digital twin architecture.',
    tags: ['Spring Boot', 'Kafka', 'Redis', 'React'],
    architecture: 'Event-driven telemetry processing pipeline handling high-throughput JSON/MQTT streams.',
    challenges: 'Processing 1000+ events/min concurrently while maintaining a consistent digital twin state without race conditions. Solved using Apache Kafka for topic isolation and Redis with a 120s TTL for real-time state caching.',
    highlights: [
      { icon: Activity, title: 'Health Scoring Engine', desc: 'Rules-based 0-100 scoring based on SOC, temp, and connectivity.' },
      { icon: Server, title: 'Python Simulator', desc: 'Custom asyncio script orchestrating 250 simulated EVs with fault injection.' },
      { icon: Cpu, title: 'OTA Orchestrator', desc: 'State-machine driven firmware updates with canary rollouts and automatic rollbacks.' }
    ],
    codeSnippet: `// Example: Health Score Calculation
public HealthStatus evaluate(DigitalTwin twin) {
    if (twin.getBatteryTemp() > 45.0) return HealthStatus.CRITICAL;
    if (twin.getSoc() < 20.0) return HealthStatus.DEGRADED;
    return HealthStatus.HEALTHY;
}`
  },
  '04': { // Parallax
    name: 'Parallax',
    year: '2025',
    description: 'Real-time collaborative code editor with multi-cursor support and peer-to-peer video calling.',
    tags: ['React', 'Spring Boot', 'WebRTC'],
    architecture: 'Modular collaboration platform with decoupled Spring Boot backend and React frontend.',
    challenges: 'Synchronizing multi-cursor code editor state and managing peer-to-peer WebRTC connections seamlessly. Implemented robust WebSocket handlers and room state management in Spring Boot.',
    highlights: [
      { icon: Code2, title: 'Code Execution Engine', desc: 'Isolated Python runner containers for secure execution.' },
      { icon: Activity, title: 'Real-time Sync', desc: 'Sub-second synchronization for chat, code, and whiteboard.' },
      { icon: Server, title: 'Session Management', desc: 'Configurable room modes for interviews and team sessions.' }
    ],
    codeSnippet: `// Example: WebSocket Room Dispatcher
@MessageMapping("/room/{roomId}/code")
public void broadcastCode(@DestinationVariable String roomId, CodeChange change) {
    simpMessagingTemplate.convertAndSend("/topic/room/" + roomId, change);
}`
  },
  '05': { // BiteBox
    name: 'BiteBox POS System',
    year: '2025',
    description: 'Full-featured point-of-sale freelance project for retail businesses with inventory management.',
    tags: ['Flutter', 'Firebase'],
    architecture: 'Offline-first Flutter application with SQLite (Drift) and Firebase Realtime Database sync.',
    challenges: 'Handling atomic invoice generation and cart synchronization across multiple devices concurrently. Implemented Firebase Transactions to ensure sequential invoice IDs without gaps.',
    highlights: [
      { icon: Server, title: 'Drift ORM + SQLite', desc: 'Robust local database for 100% offline functionality.' },
      { icon: Activity, title: 'Live Analytics', desc: 'Real-time dashboard updates (<50ms latency) via Firebase.' },
      { icon: Cpu, title: 'Thermal Printing', desc: 'Direct Bluetooth ESC/POS commands for custom bill formatting.' }
    ],
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
    year: '2024',
    description: 'Lightweight JSON parsing library built individually from scratch in Java with a custom lexer.',
    tags: ['Java', 'Lexer'],
    architecture: 'Zero-dependency Java engine utilizing a custom lexical scanner and recursive descent parser.',
    challenges: 'Parsing complex nested JSON objects and arrays without relying on Regex or external dependencies while maintaining strict RFC compliance.',
    highlights: [
      { icon: Code2, title: 'Custom Lexer', desc: 'Memory-efficient tokenization stream.' },
      { icon: Cpu, title: 'AST Generation', desc: 'Builds a robust Abstract Syntax Tree for data traversal.' },
      { icon: Server, title: 'Zero Dependencies', desc: 'Written entirely in pure Java.' }
    ],
    codeSnippet: `// Example: Lexer Tokenization
private Token nextToken() {
    skipWhitespace();
    if (isAtEnd()) return new Token(EOF, "");
    char c = advance();
    if (c == '{') return new Token(LBRACE, "{");
    if (c == '"') return parseString();
    return parseNumber();
}`
  }
};

export default function ProjectCaseStudy() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = caseStudies[id || ''];

  useLayoutEffect(() => {
    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    root.scrollTop = 0;
    document.body.scrollTop = 0;
    root.style.scrollBehavior = previousScrollBehavior;
  }, []);

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
          <a href="#" className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/60 hover:text-white"><Github size={20} /></a>
          <a href="#" className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/60 hover:text-white"><ExternalLink size={20} /></a>
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
             <span className="px-3 py-1 text-[10px] font-mono rounded-full bg-[#6366F1]/10 border border-[#6366F1]/20 text-[#6366F1] uppercase tracking-widest">Case Study</span>
          </div>
          <h1 className="text-[64px] sm:text-[96px] font-display font-medium leading-[1] tracking-tight">
            {project.name}
          </h1>
          <p className="text-2xl text-white/60 font-light max-w-3xl leading-relaxed">
            {project.description}
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
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-[#6366F1]">Architecture</h3>
            <p className="text-xl leading-relaxed font-light text-white/90">
              {project.architecture}
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-[#6366F1]">Engineering Challenge</h3>
            <p className="text-xl leading-relaxed font-light text-white/90">
              {project.challenges}
            </p>
          </div>
        </section>

        {/* Highlights */}
        <section className="space-y-12">
          <h3 className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-white/40">Key Implementation Highlights</h3>
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
            <a href="#" className="px-10 py-5 rounded-2xl bg-white text-black font-semibold hover:bg-white/90 transition-all hover:scale-105 active:scale-95 flex items-center gap-3">
              <Github size={20} /> Repository
            </a>
            <a href="#" className="px-10 py-5 rounded-2xl border border-white/10 text-white font-medium hover:bg-white/5 transition-all hover:scale-105 active:scale-95 flex items-center gap-3">
              <ExternalLink size={20} /> Live Demo
            </a>
          </div>
        </section>

      </main>

      <footer className="py-20 px-8 text-center text-white/20 text-xs font-mono uppercase tracking-widest border-t border-white/5">
        &copy; 2026 Animesh Sharma // Professional Portfolio
      </footer>
    </div>
  );
}
