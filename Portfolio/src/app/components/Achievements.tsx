import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useAnimationControls } from 'framer-motion';

interface Certificate {
  id: string;
  title: string;
  category: string;
  src: string;
  accent: string;
}

const certificates: Certificate[] = [
  { id: 'aws-1', title: 'AWS Academy Graduate', category: 'Cloud', src: '/certificates/aws-academy-cloud-foundations.png', accent: '#FF9900' },
  { id: 'aws-2', title: 'AWS Foundations', category: 'Cloud', src: '/certificates/aws.png', accent: '#FF9900' },
  { id: 'ibm-1', title: 'IBM AI SkillsBuild', category: 'AI & ML', src: '/certificates/ibm-ai-skillsbuild.png', accent: '#0F62FE' },
  { id: 'ibm-2', title: 'AI Fundamentals', category: 'AI & ML', src: '/certificates/ai-fundamentals.png', accent: '#0F62FE' },
  { id: 'sn-1', title: 'ServiceNow Micro-Cert', category: 'Enterprise', src: '/certificates/servicenow-micro.png', accent: '#00A699' },
  { id: 'hr-1', title: 'HackerRank Java', category: 'Languages', src: '/certificates/hackerrank-java.png', accent: '#2EC866' },
  { id: 'hr-2', title: 'HackerRank Python', category: 'Languages', src: '/certificates/hackerrank-python.png', accent: '#2EC866' },
  { id: 'cs-1', title: 'Meta: HTML & CSS', category: 'Frontend', src: '/certificates/html-css-coursera.jpeg', accent: '#1F70C1' },
  { id: 'cs-2', title: 'Meta: JavaScript', category: 'Frontend', src: '/certificates/javascript-coursera.jpeg', accent: '#1F70C1' },
  { id: 'ud-1', title: 'Flutter Development', category: 'Mobile', src: '/certificates/udemy-flutter.jpg', accent: '#02569B' },
  { id: 'ud-2', title: 'SQL Fundamentals', category: 'Databases', src: '/certificates/udemy-sql.jpg', accent: '#02569B' },
  { id: 'lc-1', title: 'LeetCode 50 Days', category: 'DSA', src: '/certificates/leetcode-50days.png', accent: '#FFA726' },
  { id: 'lc-2', title: 'LeetCode 100 Days', category: 'DSA', src: '/certificates/leetcode-100days.png', accent: '#FFA726' },
  { id: 'lang-1', title: 'C Programming', category: 'Languages', src: '/certificates/c.png', accent: '#A8B9CC' },
  { id: 'nw-1', title: 'NxtWave Training', category: 'Engineering', src: '/certificates/nxtwave.jpeg', accent: '#0066CC' }
];

const categoryNotes: Record<string, string> = {
  Cloud: 'Cloud fundamentals and AWS training focused on building and deploying scalable systems.',
  'AI & ML': 'AI and machine learning credentials covering applied concepts and practical tooling.',
  Languages: 'Programming language certifications that reinforce core coding fluency and problem solving.',
  Frontend: 'Frontend learning focused on layout, interaction, and production-ready web interfaces.',
  Mobile: 'Mobile development training centered on cross-platform app building and delivery.',
  Databases: 'Database fundamentals and SQL practice for working with structured data confidently.',
  DSA: 'Data structures and algorithms practice to strengthen technical interview readiness.',
  Enterprise: 'Enterprise platform training for real-world workflow and service implementations.',
  Engineering: 'Engineering-focused training from hands-on program work and applied development practice.'
};

function InfiniteMarquee({ items, speed = 40, direction = 'left', onCardClick }: any) {
  // Triple the items to ensure seamless loop even on ultra-wide screens
  const tripledItems = [...items, ...items, ...items];

  return (
    <div 
      className="relative w-full overflow-hidden py-4"
    >
      <motion.div
        className="flex gap-4 w-max"
        animate={{
          x: direction === 'left' ? [0, -100/3 + '%'] : [-100/3 + '%', 0],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {tripledItems.map((cert, index) => (
          <motion.div
            key={`${cert.id}-${index}`}
            whileHover={{ y: -5, scale: 1.02 }}
            className="relative group cursor-pointer"
            onClick={() => onCardClick(cert)}
            style={{
              width: '320px',
              height: '220px',
              flexShrink: 0,
              borderRadius: '20px',
              overflow: 'hidden',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(10px)',
              boxShadow: `0 15px 30px rgba(0,0,0,0.3)`
            }}
          >
            <img
              src={cert.src}
              alt={cert.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090C12] via-[#090C12]/40 to-transparent" />
            
            <div className="absolute inset-0 p-5 flex flex-col justify-end">
              <div 
                className="w-fit px-3 py-1 rounded-full text-[9px] font-mono font-bold mb-2"
                style={{ 
                  background: `${cert.accent}22`,
                  border: `1px solid ${cert.accent}44`,
                  color: cert.accent 
                }}
              >
                {cert.category}
              </div>
              <h3 className="text-white text-base font-display font-medium leading-tight group-hover:text-[var(--primary)] transition-colors">
                {cert.title}
              </h3>
            </div>

            {/* Accent Glow */}
            <div 
              className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity"
              style={{ background: cert.accent }}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export function Achievements() {
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

  // Split certificates into two rows for a more dynamic look
  const row1 = certificates.slice(0, Math.ceil(certificates.length / 2));
  const row2 = certificates.slice(Math.ceil(certificates.length / 2));

  const selectedCertificateNote = selectedCertificate ? categoryNotes[selectedCertificate.category] : '';

  return (
    <section
      id="achievements"
      className="py-32 relative overflow-hidden"
      style={{
        background: 'radial-gradient(circle at center, rgba(14, 22, 34, 0.96) 0%, var(--background) 100%)'
      }}
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[var(--primary)] opacity-[0.03] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#6366f1] opacity-[0.03] blur-[120px] pointer-events-none" />

      {/* Section Number Watermark - Moved outside main container to align with others */}
      <div className="absolute left-4 top-16 text-[220px] font-bold opacity-[0.02] pointer-events-none select-none font-display leading-none">
        05
      </div>

      <div className="max-w-[1440px] mx-auto px-8 relative">
        <div className="text-[10px] mb-4 tracking-[0.3em] font-mono text-[var(--primary)] uppercase">
          // Global Recognition
        </div>

        <div className="mb-20 relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h2 className="text-[56px] font-medium font-display leading-tight text-white max-w-2xl">
              Professional <span className="text-[var(--primary)]">Credentials</span> & Badges
            </h2>
          </div>
          <p className="text-[var(--text-muted)] font-body max-w-sm leading-relaxed mb-4">
            A continuous track record of professional growth, technical mastery, and industry-standard certifications.
          </p>
        </div>

        {/* Marquee Rows - Now contained within the max-width layout */}
        <div className="relative z-10 space-y-2 overflow-hidden rounded-[32px] border border-white/5 bg-white/[0.01] p-4">
          <InfiniteMarquee 
            items={row1} 
            speed={60} 
            direction="left" 
            onCardClick={setSelectedCertificate} 
          />
          <InfiniteMarquee 
            items={row2} 
            speed={70} 
            direction="right" 
            onCardClick={setSelectedCertificate} 
          />
        </div>

        <div className="mt-12">
          <div className="text-[11px] font-mono text-[var(--text-muted)] flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-pulse" />
            Scroll horizontally or click to verify details
          </div>
        </div>
      </div>

      {/* Modal / Preview */}
      {selectedCertificate && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedCertificate(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-xl"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-auto rounded-[32px] bg-[#090C12] border border-white/10 shadow-2xl flex flex-col md:flex-row"
          >
            <div className="md:w-1/2 h-full min-h-[400px] relative">
              <img
                src={selectedCertificate.src}
                alt={selectedCertificate.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090C12] via-transparent to-transparent" />
            </div>

            <div className="md:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
              <div 
                className="w-fit px-4 py-1.5 rounded-full text-[11px] font-mono font-bold tracking-widest mb-6 uppercase"
                style={{ 
                  background: `${selectedCertificate.accent}15`,
                  border: `1px solid ${selectedCertificate.accent}30`,
                  color: selectedCertificate.accent 
                }}
              >
                {selectedCertificate.category}
              </div>

              <h3 className="text-3xl sm:text-4xl font-display font-medium text-white mb-6 leading-tight">
                {selectedCertificate.title}
              </h3>

              <p className="text-[var(--text-muted)] font-body leading-relaxed mb-10">
                {selectedCertificateNote}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-10">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <span className="block text-[10px] font-mono text-[var(--text-muted)] uppercase mb-1">Status</span>
                  <span className="text-white font-medium">Verified</span>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <span className="block text-[10px] font-mono text-[var(--text-muted)] uppercase mb-1">Issuer</span>
                  <span className="text-white font-medium">{selectedCertificate.category} Partner</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => setSelectedCertificate(null)}
                  className="flex-1 px-8 py-4 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition-all text-sm"
                >
                  Close Preview
                </button>
                <button className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all text-sm">
                  View Public URL
                </button>
              </div>
            </div>

            <button 
              onClick={() => setSelectedCertificate(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-white hover:bg-black/60 transition-all"
            >
              ×
            </button>
          </motion.div>
        </motion.div>
      )}

      <style>{`
        #achievements .no-scrollbar::-webkit-scrollbar { display: none; }
        #achievements .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
