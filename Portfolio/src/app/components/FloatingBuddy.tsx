import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform, useMotionValue, animate } from 'framer-motion';
import { Send, X, Terminal, Download, Github, Mail, Code, Zap } from 'lucide-react';

interface ChatMessage {
  role: 'bot' | 'user';
  text: string;
}

const QUICK_ACTIONS = [
  { label: 'Download Resume', icon: <Download size={12} />, action: 'resume' },
  { label: 'Show Projects', icon: <Code size={12} />, action: 'work' },
  { label: 'GitHub Activity', icon: <Github size={12} />, action: 'github' },
  { label: 'Contact Me', icon: <Mail size={12} />, action: 'contact' },
];

const BOT_RESPONSES: Record<string, string> = {
  default: "I'm Friday, Animesh's digital twin. Ask me about his tech stack, projects, or how to hire him!",
  resume: "You can download Animesh's resume from the link in the footer, or I can fetch the latest version for you right now!",
  work: "Animesh specializes in high-performance backends. Check out 'Axion'—it's a beast built with Kafka and Redis!",
  github: "He's super active on GitHub! He loves contributing to open source and building dev tools.",
  contact: "The best way to reach Animesh is via LinkedIn or Email. I've scrolled you down to the contact section!",
  stack: "He's a Java/Spring Boot expert, but he's also proficient in Next.js, Go, and Cloud Infrastructure.",
  greeting: "Hello there! Ready to see some world-class engineering?",
};

export function FloatingBuddy() {
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [message, setMessage] = useState('Hi! I\'m Friday.');
  const [isVisible, setIsVisible] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  
  const buddyRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const dashOffset = useTransform(smoothProgress, [0, 1], [239, 0]);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useMotionValue(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      animate(y, 0, { type: 'spring', stiffness: 50, damping: 20 });
      setMessage("Hey! I'm Friday. Click me to chat or explore together!");
      setIsHovered(true);
      setTimeout(() => setIsHovered(false), 6000);
    }, 1500);
    return () => clearTimeout(timer);
  }, [y]);

  // Wander Logic
  useEffect(() => {
    if (!isVisible || isDragging || isHovered || isChatOpen) return;
    const wander = () => {
      const targetX = x.get() + (Math.random() - 0.5) * 200;
      const targetY = y.get() + (Math.random() - 0.5) * 100;
      const clampedX = Math.max(-window.innerWidth + 250, Math.min(0, targetX));
      const clampedY = Math.max(-window.innerHeight + 250, Math.min(0, targetY));
      animate(x, clampedX, { type: 'spring', stiffness: 40, damping: 20 });
      animate(y, clampedY, { type: 'spring', stiffness: 40, damping: 20 });
    };
    const interval = setInterval(wander, 7000);
    return () => clearInterval(interval);
  }, [isVisible, isDragging, isHovered, isChatOpen, x, y]);

  // Section Awareness
  useEffect(() => {
    const sectionMessages: Record<string, string> = {
      about: "Animesh is a B.Tech student with a passion for building high-performance backends.",
      work: "He built these projects using Kafka, Redis, and distributed architectures.",
      stack: "He loves working with Spring Boot and event-driven systems.",
      github: "He builds personal projects and contributes to open source. Look at that heatmap!",
      achievements: "These certifications prove his commitment to technical mastery.",
      contact: "You should definitely reach out to him. He's great to work with!"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && sectionMessages[entry.target.id]) {
          setMessage(sectionMessages[entry.target.id]);
          if (!isChatOpen) {
            setIsHovered(true);
            setTimeout(() => setIsHovered(false), 3000);
          }
        }
      });
    }, { threshold: 0.5 });

    ['about', 'work', 'stack', 'github', 'achievements', 'contact'].forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isChatOpen]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!buddyRef.current) return;
      const rect = buddyRef.current.getBoundingClientRect();
      const rawX = (e.clientX - rect.left - rect.width / 2) / 25;
      const rawY = (e.clientY - rect.top - rect.height / 2) / 25;
      setMousePosition({ x: Math.max(-6, Math.min(6, rawX)), y: Math.max(-6, Math.min(6, rawY)) });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const handleAction = (action: string) => {
    const responses: Record<string, string> = {
      resume: "I've highlighted the resume download for you! (Or I would if I had a direct link to the PDF handy!)",
      work: "Scrolling you to the projects section. Check out Axion!",
      github: "His GitHub is a treasure trove of backend architecture experiments.",
      contact: "Let's get you in touch with Animesh.",
    };

    setChatHistory(prev => [...prev, { role: 'bot', text: responses[action] || BOT_RESPONSES[action] }]);
    
    if (['work', 'github', 'contact'].includes(action)) {
      document.getElementById(action)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;
    setChatHistory(prev => [...prev, { role: 'user', text }]);
    setInputValue('');

    // Simple keyword matching
    const query = text.toLowerCase();
    let response = BOT_RESPONSES.default;
    
    if (query.includes('hi') || query.includes('hello')) response = BOT_RESPONSES.greeting;
    else if (query.includes('resume') || query.includes('cv')) response = BOT_RESPONSES.resume;
    else if (query.includes('project') || query.includes('work')) response = BOT_RESPONSES.work;
    else if (query.includes('tech') || query.includes('stack')) response = BOT_RESPONSES.stack;
    else if (query.includes('contact') || query.includes('hire')) response = BOT_RESPONSES.contact;

    setTimeout(() => {
      setChatHistory(prev => [...prev, { role: 'bot', text: response }]);
    }, 600);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed z-[100] bottom-[100px] right-[100px] pointer-events-none">
          <motion.div
            ref={buddyRef}
            drag
            dragMomentum={false}
            className="pointer-events-auto"
            style={{ x, y, rotate }}
            onDragStart={() => {
              setIsDragging(true);
              setMessage('Wheee!');
            }}
            onDragEnd={() => setIsDragging(false)}
            onMouseEnter={() => !isChatOpen && setIsHovered(true)}
            onMouseLeave={() => !isChatOpen && setIsHovered(false)}
            onClick={() => {
              if (!isChatOpen) {
                setIsChatOpen(true);
                if (chatHistory.length === 0) {
                  setChatHistory([{ role: 'bot', text: "Systems online! I'm ready to assist. What can I help you find today?" }]);
                }
              }
            }}
          >
            {/* Progress Ring */}
            <svg className="absolute -inset-2 w-20 h-20 -rotate-90">
              <motion.circle cx="40" cy="40" r="38" fill="none" stroke="var(--primary)" strokeWidth="2" strokeDasharray="239" style={{ strokeDashoffset: dashOffset, opacity: 0.2 }} />
            </svg>

            {/* AI Chat Window */}
            <AnimatePresence>
              {isChatOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: -400 }}
                  exit={{ opacity: 0, scale: 0.8, y: 20 }}
                  className="absolute left-1/2 -translate-x-1/2 w-[320px] bg-[rgba(13,13,18,0.95)] border border-[var(--border)] rounded-3xl shadow-2xl backdrop-blur-xl overflow-hidden flex flex-col"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Chat Header */}
                  <div className="px-4 py-3 border-b border-[var(--border)] flex items-center justify-between bg-[rgba(255,255,255,0.02)]">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-[11px] font-mono font-bold text-[var(--text-secondary)] uppercase tracking-wider">Friday</span>
                    </div>
                    <button onClick={() => setIsChatOpen(false)} className="p-1 hover:bg-white/10 rounded-full transition-colors text-[var(--text-muted)]"><X size={14} /></button>
                  </div>

                  {/* Chat Content */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[200px] scrollbar-hide">
                    {chatHistory.map((msg, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: msg.role === 'bot' ? -10 : 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`flex ${msg.role === 'bot' ? 'justify-start' : 'justify-end'}`}
                      >
                        <div className={`max-w-[85%] px-3 py-2 rounded-2xl text-[12px] leading-relaxed ${
                          msg.role === 'bot' 
                            ? 'bg-[var(--surface)] text-white border border-[var(--border)] rounded-tl-none' 
                            : 'bg-[var(--primary)] text-white rounded-tr-none shadow-lg shadow-[var(--primary)]/20'
                        }`}>
                          {msg.text}
                        </div>
                      </motion.div>
                    ))}
                    <div ref={chatEndRef} />
                  </div>

                  {/* Quick Actions */}
                  <div className="px-4 pb-2 flex flex-wrap gap-2">
                    {QUICK_ACTIONS.map((qa) => (
                      <button
                        key={qa.action}
                        onClick={() => handleAction(qa.action)}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-[var(--primary)] hover:bg-[var(--primary)]/10 transition-all text-[10px] text-[var(--text-secondary)] hover:text-white"
                      >
                        {qa.icon}
                        {qa.label}
                      </button>
                    ))}
                  </div>

                  {/* Input Area */}
                  <div className="p-3 border-t border-[var(--border)] flex gap-2">
                    <div className="relative flex-1">
                      <Terminal className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={12} />
                      <input 
                        type="text" 
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                        placeholder="Ask me something..."
                        className="w-full bg-black/40 border border-[var(--border)] rounded-xl py-2 pl-8 pr-3 text-[12px] text-white focus:outline-none focus:border-[var(--primary)] transition-colors placeholder:text-[var(--text-muted)]"
                      />
                    </div>
                    <button 
                      onClick={() => handleSendMessage(inputValue)}
                      className="p-2 bg-[var(--primary)] text-white rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-[var(--primary)]/20"
                    >
                      <Send size={14} />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Classic Speech Bubble */}
            <AnimatePresence>
              {(isHovered && !isChatOpen) && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: -70, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.8 }}
                  className="absolute left-1/2 -translate-x-1/2 bg-[var(--surface)] border border-[var(--border)] px-4 py-2 rounded-2xl shadow-2xl z-[110]"
                  style={{ width: 'max-content', maxWidth: 'min(280px, 80vw)' }}
                >
                  <div className="text-[12px] font-medium text-white font-mono leading-relaxed text-center">
                    {message}
                  </div>
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[var(--surface)] border-r border-b border-[var(--border)] rotate-45" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Robot Avatar */}
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: isHovered || isChatOpen ? [0, -5, 5, 0] : 0,
                scale: isChatOpen ? 1.2 : 1
              }}
              transition={{ 
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 0.5, repeat: isHovered ? Infinity : 0 }
              }}
              className="w-16 h-16 bg-gradient-to-br from-[var(--surface)] to-[#1a1a25] rounded-2xl border border-white/10 flex items-center justify-center shadow-xl group overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-[var(--primary)] opacity-[0.05] group-hover:opacity-[0.1] transition-opacity" />
              <div className="relative w-10 h-10 flex flex-col items-center justify-center gap-2">
                <div className="flex gap-3">
                  <motion.div 
                    animate={{ x: mousePosition.x, y: mousePosition.y, scaleY: isHovered ? [1, 0.1, 1] : 1 }}
                    transition={{ scaleY: { duration: 0.2, repeat: isHovered ? 0 : Infinity, repeatDelay: 3 } }}
                    className="w-2.5 h-2.5 bg-[var(--primary)] rounded-full shadow-[0_0_10px_var(--primary)]" 
                  />
                  <motion.div 
                    animate={{ x: mousePosition.x, y: mousePosition.y, scaleY: isHovered ? [1, 0.1, 1] : 1 }}
                    transition={{ scaleY: { duration: 0.2, repeat: isHovered ? 0 : Infinity, repeatDelay: 3 } }}
                    className="w-2.5 h-2.5 bg-[var(--primary)] rounded-full shadow-[0_0_10px_var(--primary)]" 
                  />
                </div>
                <motion.div 
                  animate={{ 
                    width: isHovered || isChatOpen ? [12, 16, 12] : 12,
                    opacity: isChatOpen ? 1 : [0.5, 1, 0.5],
                    backgroundColor: isChatOpen ? 'var(--secondary)' : 'var(--primary)'
                  }}
                  className="h-1 rounded-full" 
                />
                <div className="absolute -top-1 w-1 h-1 bg-[var(--primary)] rounded-full animate-pulse shadow-[0_0_8px_var(--primary)]" />
              </div>
              
              {/* Interaction Indicator */}
              {isHovered && !isChatOpen && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="absolute top-1 right-1"
                >
                  <Zap size={10} className="text-[var(--primary)] animate-bounce" />
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
