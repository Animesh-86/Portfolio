import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform, useMotionValue, animate } from 'framer-motion';

export function FloatingBuddy() {
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [message, setMessage] = useState('Hi! I\'m Ani-Bot.');
  const [isVisible, setIsVisible] = useState(false);
  
  const buddyRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const dashOffset = useTransform(smoothProgress, [0, 1], [239, 0]);

  // Motion values for stable positioning
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useMotionValue(0);

  // Show welcome sequence on reload
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      animate(y, 0, { type: 'spring', stiffness: 50, damping: 20 });
      setMessage("Hey! I'm Ani-Bot. Let's explore Animesh's portfolio together!");
      setIsHovered(true);

      // Hide message after a few seconds
      setTimeout(() => {
        setIsHovered(false);
      }, 6000);
    }, 1500);

    return () => clearTimeout(timer);
  }, [y]);

  // Wander Logic: Occasionally move to a new spot
  useEffect(() => {
    if (!isVisible || isDragging || isHovered) return;
    
    const wander = () => {
      // Calculate a new relative target
      const targetX = x.get() + (Math.random() - 0.5) * 200;
      const targetY = y.get() + (Math.random() - 0.5) * 100;
      const tilt = targetX > x.get() ? 10 : -10;

      // Ensure we don't go too far off screen (clamping with safe margins)
      const clampedX = Math.max(-window.innerWidth + 250, Math.min(0, targetX));
      const clampedY = Math.max(-window.innerHeight + 250, Math.min(0, targetY));

      animate(x, clampedX, { type: 'spring', stiffness: 40, damping: 20 });
      animate(y, clampedY, { type: 'spring', stiffness: 40, damping: 20 });
      animate(rotate, tilt, { type: 'spring', stiffness: 100, damping: 15 });
      
      setTimeout(() => {
        animate(rotate, 0, { type: 'spring', stiffness: 100, damping: 15 });
      }, 2000);
    };

    const interval = setInterval(wander, 7000);
    return () => clearInterval(interval);
  }, [isVisible, isDragging, isHovered, x, y, rotate]);

  // Section Awareness: Say something when a new section is in view
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
          // Briefly show speech bubble when entering a new section
          setIsHovered(true);
          setTimeout(() => setIsHovered(false), 3000);
        }
      });
    }, { threshold: 0.5 });

    const sections = ['about', 'work', 'stack', 'github', 'achievements', 'contact'];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Update mouse position relative to buddy
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!buddyRef.current) return;
      const rect = buddyRef.current.getBoundingClientRect();
      const rawX = (e.clientX - rect.left - rect.width / 2) / 25;
      const rawY = (e.clientY - rect.top - rect.height / 2) / 25;
      
      // Clamp values to keep eyes within face boundaries
      const eyeX = Math.max(-6, Math.min(6, rawX));
      const eyeY = Math.max(-6, Math.min(6, rawY));
      
      setMousePosition({ x: eyeX, y: eyeY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleBuddyClick = () => {
    const messages = ['Need a backend built?', 'I love building with Redis.', 'Have a great day!', 'I build fast systems.'];
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    setMessage(randomMsg);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={buddyRef}
          drag
          dragMomentum={false}
          dragConstraints={{ left: -window.innerWidth + 250, right: 0, top: -window.innerHeight + 250, bottom: 0 }}
          onDragStart={() => {
            setIsDragging(true);
            setMessage('Wheee! Where are we going?');
          }}
          onDragEnd={() => {
            setIsDragging(false);
            setMessage('I like this spot!');
          }}
          initial={{ opacity: 0, scale: 0, y: 100, x: 0 }}
          style={{ 
            x, 
            y, 
            rotate,
            bottom: '100px',
            right: '100px',
            width: '64px',
            height: '64px',
            background: 'rgba(10, 10, 15, 0.72)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            boxShadow: isDragging ? '0 20px 50px rgba(0,0,0,0.5)' : '0 10px 30px rgba(99, 102, 241, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          animate={{ 
            opacity: 1, 
            scale: isDragging ? 1.1 : 1
          }}
          transition={{
            scale: { duration: 0.2 }
          }}
          className={`fixed z-[100] ${isDragging ? 'cursor-grabbing' : 'cursor-grab active:cursor-grabbing'}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleBuddyClick}
        >
          {/* Progress Ring */}
          <svg className="absolute -inset-2 w-20 h-20 -rotate-90">
            <motion.circle
              cx="40"
              cy="40"
              r="38"
              fill="none"
              stroke="var(--primary)"
              strokeWidth="2"
              strokeDasharray="239"
              style={{
                strokeDashoffset: dashOffset,
                opacity: 0.2
              }}
            />
          </svg>

          {/* Speech Bubble */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: -70, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.8 }}
                className="absolute left-1/2 -translate-x-1/2 bg-[var(--surface)] border border-[var(--border)] px-4 py-2 rounded-2xl shadow-2xl z-[110]"
                style={{ 
                  width: 'max-content',
                  maxWidth: 'min(280px, 80vw)',
                }}
              >
                <div className="text-[12px] font-medium text-white font-mono leading-relaxed text-center whitespace-normal">
                  {message}
                </div>
                {/* Arrow */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[var(--surface)] border-r border-b border-[var(--border)] rotate-45" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Robot Avatar */}
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              rotate: isHovered ? [0, -5, 5, 0] : 0
            }}
            transition={{ 
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 0.5, repeat: isHovered ? Infinity : 0 }
            }}
            className="w-16 h-16 bg-gradient-to-br from-[var(--surface)] to-[#1a1a25] rounded-2xl border border-white/10 flex items-center justify-center shadow-xl group overflow-hidden"
          >
            {/* Inner Glow */}
            <div className="absolute inset-0 bg-[var(--primary)] opacity-[0.05] group-hover:opacity-[0.1] transition-opacity" />
            
            {/* Robot Face */}
            <div className="relative w-10 h-10 flex flex-col items-center justify-center gap-2">
              {/* Eyes */}
              <div className="flex gap-3">
                <motion.div 
                  animate={{ 
                    x: mousePosition.x, 
                    y: mousePosition.y,
                    scaleY: isHovered ? [1, 0.1, 1] : 1
                  }}
                  transition={{
                    scaleY: { duration: 0.2, repeat: isHovered ? 0 : Infinity, repeatDelay: 3 }
                  }}
                  className="w-2.5 h-2.5 bg-[var(--primary)] rounded-full shadow-[0_0_10px_var(--primary)]" 
                />
                <motion.div 
                   animate={{ 
                    x: mousePosition.x, 
                    y: mousePosition.y,
                    scaleY: isHovered ? [1, 0.1, 1] : 1
                  }}
                  transition={{
                    scaleY: { duration: 0.2, repeat: isHovered ? 0 : Infinity, repeatDelay: 3 }
                  }}
                  className="w-2.5 h-2.5 bg-[var(--primary)] rounded-full shadow-[0_0_10px_var(--primary)]" 
                />
              </div>
              
              {/* Mouth/LED */}
              <motion.div 
                animate={{ 
                  width: isHovered ? [8, 16, 8] : 12,
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  opacity: { duration: 2, repeat: Infinity }
                }}
                className="h-1 bg-[var(--primary)] rounded-full opacity-50" 
              />

              {/* Antenna Glow */}
              <div className="absolute -top-1 w-1 h-1 bg-[var(--primary)] rounded-full animate-pulse shadow-[0_0_8px_var(--primary)]" />
            </div>

            {/* Scanning Line */}
            <motion.div 
              animate={{ y: [-40, 60] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent opacity-20"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
