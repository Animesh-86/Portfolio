import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Terminal, Cpu, Database, GitBranch, Binary, Braces, Command } from 'lucide-react';

const SEQUENTIAL_SYMBOLS = [
  { id: 'code', type: 'icon', value: Code, scale: 1.6 },
  { id: 'java', type: 'text', value: 'JAVA', size: '120px' },
  { id: 'database', type: 'icon', value: Database, scale: 1.5 },
  { id: 'spring', type: 'text', value: 'SPRING', size: '100px' },
  { id: 'react', type: 'text', value: 'REACT', size: '110px' },
  { id: 'docker', type: 'text', value: 'DOCKER', size: '90px' },
  { id: 'kafka', type: 'text', value: 'KAFKA', size: '110px' },
  { id: 'redis', type: 'text', value: 'REDIS', size: '110px' },
  { id: 'aws', type: 'text', value: 'AWS', size: '140px' },
  { id: 'braces', type: 'icon', value: Braces, scale: 1.7 },
  { id: 'js', type: 'text', value: 'JS', size: '140px' },
  { id: 'terminal', type: 'icon', value: Terminal, scale: 1.4 },
  { id: 'api', type: 'text', value: 'API', size: '140px' },
];

export function PatternRevealGrid() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const symbolInterval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SEQUENTIAL_SYMBOLS.length);
    }, 3500);

    return () => clearInterval(symbolInterval);
  }, []);

  return (
    <div className="absolute inset-0 group overflow-hidden bg-[#010103]">
      {/* 1. Base Layer: Small Purple Dots (Higher Resolution Grid) */}
      <div 
        className="absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage: `radial-gradient(circle at center, #6366f1 1px, transparent 0)`,
          backgroundPosition: 'center',
          backgroundSize: '12px 12px',
        }}
      />

      {/* 2. Active Layer: Ultra-Bold Sequential Symbols (LED Matrix Style) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={SEQUENTIAL_SYMBOLS[activeIndex].id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex items-center justify-center w-full h-full"
            style={{
              filter: 'drop-shadow(0 0 12px var(--primary)) drop-shadow(0 0 4px var(--primary))',
              // Higher resolution mask for clear letters
              maskImage: `radial-gradient(circle at center, black 2.5px, transparent 0)`,
              WebkitMaskImage: `radial-gradient(circle at center, black 2.5px, transparent 0)`,
              maskPosition: 'center',
              maskSize: '12px 12px',
              WebkitMaskPosition: 'center',
              WebkitMaskSize: '12px 12px',
            }}
          >
            <SymbolRenderer symbol={SEQUENTIAL_SYMBOLS[activeIndex]} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 3. Subtle Atmospheric Glow (Primary) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.12]"
        style={{
          background: `radial-gradient(500px circle at center, var(--primary-glow), transparent 80%)`
        }}
      />
    </div>
  );
}

// The underlying symbol must have HARD edges and solid color to act as a clean mask basis.
function SymbolRenderer({ symbol }: { symbol: any }) {
  const sharpStyle = {
    color: '#ffffff', // Solid white, no blurs or glows here
  };

  if (symbol.type === 'icon') {
    const Icon = symbol.value;
    return (
      <div style={{ transform: `scale(${symbol.scale})`, ...sharpStyle }}>
        <Icon size={240} strokeWidth={2} /> {/* Slightly thinner stroke for higher res */}
      </div>
    );
  }

  return (
    <span 
      // Changed from font-black tracking-tighter to font-bold tracking-widest
      // This prevents the letters from bleeding into each other on the dot matrix
      className="font-mono font-bold select-none tracking-[0.15em]"
      style={{ fontSize: symbol.size, ...sharpStyle }}
    >
      {symbol.value}
    </span>
  );
}
