import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink, Code2, Cpu, Activity, Server } from 'lucide-react';

interface ProjectModalProps {
  project: any;
  onClose: () => void;
}

const caseStudies: Record<string, any> = {
  '01': {
    architecture: 'Event-driven telemetry processing pipeline handling high-throughput JSON/MQTT streams.',
    challenges: 'Processing 1000+ events/min concurrently while maintaining a consistent digital twin state without race conditions. Solved using Apache Kafka for topic isolation and Redis with a 120s TTL for real-time state caching.',
    highlights: [
      { icon: Activity, title: 'Health Scoring Engine', desc: 'Rules-based 0-100 scoring based on SOC, temp, and connectivity.' },
      { icon: Server, title: 'Python Simulator', desc: 'Custom asyncio script orchestrating 250 simulated EVs with fault injection.' },
      { icon: Cpu, title: 'OTA Orchestrator', desc: 'State-machine driven firmware updates with canary rollouts.' }
    ],
    codeSnippet: `public HealthStatus evaluate(DigitalTwin twin) {
    if (twin.getBatteryTemp() > 45.0) return HealthStatus.CRITICAL;
    if (twin.getSoc() < 20.0) return HealthStatus.DEGRADED;
    return HealthStatus.HEALTHY;
}`
  },
  '04': {
    architecture: 'Modular collaboration platform with decoupled Spring Boot backend and React frontend.',
    challenges: 'Synchronizing multi-cursor code editor state and managing peer-to-peer WebRTC connections seamlessly. Implemented robust WebSocket handlers and room state management in Spring Boot.',
    highlights: [
      { icon: Code2, title: 'Code Execution Engine', desc: 'Isolated Python runner containers for secure execution.' },
      { icon: Activity, title: 'Real-time Sync', desc: 'Sub-second synchronization for chat, code, and whiteboard.' },
      { icon: Server, title: 'Session Management', desc: 'Configurable room modes for interviews and team sessions.' }
    ],
    codeSnippet: `@MessageMapping("/room/{roomId}/code")
public void broadcastCode(@DestinationVariable String roomId, CodeChange change) {
    simpMessagingTemplate.convertAndSend("/topic/room/" + roomId, change);
}`
  },
  '05': {
    architecture: 'Offline-first Flutter application with SQLite (Drift) and Firebase Realtime Database sync.',
    challenges: 'Handling atomic invoice generation and cart synchronization across multiple devices concurrently. Implemented Firebase Transactions to ensure sequential invoice IDs without gaps.',
    highlights: [
      { icon: Server, title: 'Drift ORM + SQLite', desc: 'Robust local database for 100% offline functionality.' },
      { icon: Activity, title: 'Live Analytics', desc: 'Real-time dashboard updates (<50ms latency) via Firebase.' },
      { icon: Cpu, title: 'Thermal Printing', desc: 'Direct Bluetooth ESC/POS commands for custom bill formatting.' }
    ],
    codeSnippet: `Future<void> syncCart(String cartId, CartItem item) async {
  await database.runTransaction((tx) async {
    final current = await tx.getCart(cartId);
    await tx.updateCart(current.merge(item));
  });
}`
  },
  '09': {
    architecture: 'Zero-dependency Java engine utilizing a custom lexical scanner and recursive descent parser.',
    challenges: 'Parsing complex nested JSON objects and arrays without relying on Regex or external dependencies while maintaining strict RFC compliance.',
    highlights: [
      { icon: Code2, title: 'Custom Lexer', desc: 'Memory-efficient tokenization stream.' },
      { icon: Cpu, title: 'AST Generation', desc: 'Builds a robust Abstract Syntax Tree for data traversal.' },
      { icon: Server, title: 'Zero Dependencies', desc: 'Written entirely in pure Java.' }
    ],
    codeSnippet: `private Token nextToken() {
    skipWhitespace();
    if (isAtEnd()) return new Token(EOF, "");
    char c = advance();
    if (c == '{') return new Token(LBRACE, "{");
    if (c == '"') return parseString();
    return parseNumber();
}`
  }
};

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const details = caseStudies[project.id];

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end overflow-hidden">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Side Panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="relative w-full max-w-[650px] h-full bg-[#050507] border-l border-white/10 shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header Controls */}
        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-[#050507]/80 backdrop-blur-md z-20">
          <div className="flex items-center gap-4">
             <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
            <span className="text-[11px] font-mono tracking-widest text-white/40 uppercase">Project Case Study</span>
          </div>
          <div className="flex gap-2">
            <a href="#" className="p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors" title="View Source">
              <Github size={20} />
            </a>
            <a href="#" className="p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors" title="Live Demo">
              <ExternalLink size={20} />
            </a>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 sm:p-12 space-y-12 no-scrollbar">
          {/* Intro */}
          <section className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-[40px] sm:text-[52px] font-medium font-display leading-[1.1] text-white">
                {project.name}
              </h2>
              <p className="text-[18px] text-white/60 font-light leading-relaxed">
                {project.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag: string) => (
                <span key={tag} className="px-3 py-1 text-[11px] font-mono bg-white/5 border border-white/10 rounded text-white/60">
                  {tag}
                </span>
              ))}
            </div>
          </section>

          {/* Core Technical Detail Grid */}
          <div className="grid grid-cols-1 gap-10">
            <div className="space-y-4">
              <h3 className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#6366F1]">Architecture</h3>
              <p className="text-[16px] text-white/80 leading-relaxed font-light">
                {details?.architecture}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#6366F1]">Engineering Challenge</h3>
              <p className="text-[16px] text-white/80 leading-relaxed font-light">
                {details?.challenges}
              </p>
            </div>
          </div>

          {/* Highlights */}
          <section className="space-y-6">
            <h3 className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-white/40">Key Highlights</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {details?.highlights.map((h: any, i: number) => {
                const Icon = h.icon;
                return (
                  <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-[#6366F1]/10 flex items-center justify-center">
                      <Icon className="text-[#6366F1]" size={20} />
                    </div>
                    <h4 className="text-[16px] font-medium text-white">{h.title}</h4>
                    <p className="text-[13px] text-white/50 leading-relaxed">{h.desc}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Technical Implementation */}
          <section className="space-y-6">
             <h3 className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-white/40">Implementation Snippet</h3>
             <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#0A0A0F]">
                <div className="flex items-center px-4 py-3 border-b border-white/5 gap-2 bg-white/5">
                  <div className="w-2 h-2 rounded-full bg-[#FF5F56]" />
                  <div className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
                  <div className="w-2 h-2 rounded-full bg-[#27C93F]" />
                  <span className="ml-2 text-[10px] font-mono text-white/40">Source Code</span>
                </div>
                <pre className="p-6 text-[13px] font-mono leading-[1.7] text-[#a3b3cc] whitespace-pre-wrap break-words">
                  <code>{details?.codeSnippet}</code>
                </pre>
             </div>
          </section>

          {/* Footer CTA */}
          <div className="pt-12 border-t border-white/5 flex gap-4">
            <a href="#" className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition-all">
              <Github size={20} /> Repository
            </a>
            <a href="#" className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-white/10 text-white font-medium hover:bg-white/5 transition-all">
              <ExternalLink size={20} /> Live Demo
            </a>
          </div>
        </div>

        <style>{`
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
      </motion.div>
    </div>
  );
}
