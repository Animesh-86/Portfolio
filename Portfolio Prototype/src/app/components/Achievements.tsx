import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';

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

const categories = ['All', 'Cloud', 'AI & ML', 'Languages', 'Frontend', 'Mobile', 'Databases', 'DSA', 'Enterprise', 'Engineering'];

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

// Stacking Slider Component
function StackingSlider({ children, cardGap = 20, stackOffset = 20, mobileStackOffset = 0 }: any) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const childrenArray = Array.isArray(children) ? children : [children];

  useEffect(() => {
    const updateDimensions = () => {
      setCardWidth(cardRefs.current[0]?.offsetWidth ?? 0);
      setIsMobile(window.innerWidth < 992);
    };

    updateDimensions();
    const timeoutId = window.setTimeout(updateDimensions, 100);
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener('resize', updateDimensions);
    };
  }, [childrenArray.length]);

  const goToNext = () => {
    if (currentIndex < childrenArray.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const activeOffset = isMobile ? mobileStackOffset : stackOffset;

  const getCardTransform = (index: number) => {
    if (index < currentIndex) {
      const slideMove = (cardWidth + cardGap - activeOffset) * index;
      return -slideMove;
    } else {
      const slideMove = (cardWidth + cardGap - activeOffset) * currentIndex;
      return -slideMove;
    }
  };

  const isAtStart = currentIndex === 0;
  const isAtEnd = currentIndex === childrenArray.length - 1;

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ flex: 1, height: '100%', position: 'relative', overflow: 'visible', display: 'flex', alignItems: 'center' }}>
        <div style={{ display: 'flex', height: 'fit-content', position: 'relative', gap: `${cardGap}px` }}>
          {childrenArray.map((child: any, index: number) => (
            <motion.div
              key={index}
              ref={(element) => {
                cardRefs.current[index] = element;
              }}
              animate={{ x: getCardTransform(index) }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              style={{
                flexShrink: 0,
                position: 'relative',
                zIndex: index + 1
              }}
            >
              {child}
            </motion.div>
          ))}
        </div>
      </div>

      {childrenArray.length > 0 && (
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'flex-start' }}>
          <button
            onClick={goToPrev}
            disabled={isAtStart}
            style={{
              width: '40px',
              height: '40px',
              background: isAtStart ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '50%',
              cursor: isAtStart ? 'not-allowed' : 'pointer',
              opacity: isAtStart ? 0.3 : 1,
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '18px'
            }}
          >
            ←
          </button>
          <button
            onClick={goToNext}
            disabled={isAtEnd}
            style={{
              width: '40px',
              height: '40px',
              background: isAtEnd ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '50%',
              cursor: isAtEnd ? 'not-allowed' : 'pointer',
              opacity: isAtEnd ? 0.3 : 1,
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '18px'
            }}
          >
            →
          </button>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginLeft: '10px' }}>
            {currentIndex + 1} of {childrenArray.length}
          </span>
        </div>
      )}
    </div>
  );
}

export function Achievements() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

  const filtered = useMemo(
    () => (activeCategory === 'All' ? certificates : certificates.filter((c) => c.category === activeCategory)),
    [activeCategory]
  );

  const selectedCertificateNote = selectedCertificate ? categoryNotes[selectedCertificate.category] : '';

  return (
    <section
      className="py-32 relative overflow-hidden"
      style={{
        background: 'radial-gradient(circle at top, rgba(14, 22, 34, 0.96) 0%, rgba(9, 12, 18, 0.99) 50%, var(--background) 100%)'
      }}
    >
      <div className="max-w-[1440px] mx-auto px-8 relative">
        <div className="absolute left-8 top-16 text-[200px] font-bold opacity-[0.03] pointer-events-none select-none" style={{ fontFamily: 'var(--font-display)' }}>
          04
        </div>

        <div className="text-[10px] mb-12 tracking-[0.2em]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--primary)' }}>
          // Credentials
        </div>

        <div className="mb-16 relative z-10">
          <h2 className="text-[48px] font-medium" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
            Certifications and Badges
          </h2>
        </div>

        <div className="mb-12 flex flex-wrap gap-2 relative z-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className="px-4 py-2 text-[12px] font-medium transition-all duration-300 tracking-[0.1em] uppercase"
              style={{
                fontFamily: 'var(--font-mono)',
                background: activeCategory === category ? 'var(--primary)' : 'var(--surface)',
                border: `1px solid ${activeCategory === category ? 'var(--primary)' : 'var(--border)'}`,
                color: activeCategory === category ? '#ffffff' : 'var(--text-secondary)',
                borderRadius: '6px'
              }}
            >
              {category}
            </button>
          ))}
        </div>

        <div style={{ height: '500px', width: '100%', position: 'relative', zIndex: 10 }}>
          <StackingSlider cardGap={30} stackOffset={40} mobileStackOffset={20}>
            {filtered.map((cert) => (
              <div
                key={cert.id}
                onClick={() => setSelectedCertificate(cert)}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    setSelectedCertificate(cert);
                  }
                }}
                style={{
                  width: '320px',
                  height: '420px',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  border: `2px solid ${cert.accent}`,
                  background: `linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)`,
                  boxShadow: `0 0 24px ${cert.accent}40, inset 0 1px 1px rgba(255,255,255,0.1)`,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ position: 'relative', height: '100%' }}>
                  <img
                    src={cert.src}
                    alt={cert.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg,rgba(0,0,0,0.3) 0%,rgba(0,0,0,0.8) 100%)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      padding: '20px'
                    }}
                  >
                    <div
                      style={{
                        display: 'inline-block',
                        background: cert.accent,
                        color: '#ffffff',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '10px',
                        fontWeight: 'bold',
                        marginBottom: '12px',
                        width: 'fit-content',
                        fontFamily: 'var(--font-mono)'
                      }}
                    >
                      {cert.category}
                    </div>
                    <h3
                      style={{
                        color: '#ffffff',
                        fontSize: '18px',
                        fontWeight: '600',
                        fontFamily: 'var(--font-display)',
                        margin: 0,
                        lineHeight: '1.3'
                      }}
                    >
                      {cert.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </StackingSlider>
        </div>

        <div className="mt-8 text-[13px]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
          Showing <span style={{ color: 'var(--text-primary)' }}>{filtered.length}</span> credential{filtered.length !== 1 ? 's' : ''} in {activeCategory === 'All' ? 'all categories' : activeCategory}
        </div>
      </div>

      {selectedCertificate && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedCertificate(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 60,
            background: 'rgba(2, 6, 12, 0.78)',
            backdropFilter: 'blur(14px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }}
        >
          <motion.div
            initial={{ scale: 0.92, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={(event) => event.stopPropagation()}
            style={{
              width: 'min(980px, 100%)',
              maxHeight: '90vh',
              overflow: 'auto',
              borderRadius: '28px',
              border: `1px solid ${selectedCertificate.accent}66`,
              background: 'linear-gradient(180deg, rgba(14, 22, 34, 0.98) 0%, rgba(8, 12, 18, 0.98) 100%)',
              boxShadow: `0 30px 80px rgba(0,0,0,0.6), 0 0 50px ${selectedCertificate.accent}22`
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 0.9fr', gap: '0', minHeight: '560px' }}>
              <div style={{ position: 'relative', background: 'rgba(255,255,255,0.03)' }}>
                <img
                  src={selectedCertificate.src}
                  alt={selectedCertificate.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: '560px' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.6) 100%)'
                  }}
                />
                <button
                  onClick={() => setSelectedCertificate(null)}
                  aria-label="Close certificate preview"
                  style={{
                    position: 'absolute',
                    top: '18px',
                    right: '18px',
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(10, 14, 20, 0.7)',
                    color: '#fff',
                    cursor: 'pointer'
                  }}
                >
                  ×
                </button>
              </div>

              <div style={{ padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '18px' }}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    width: 'fit-content',
                    padding: '8px 14px',
                    borderRadius: '999px',
                    border: `1px solid ${selectedCertificate.accent}66`,
                    background: `${selectedCertificate.accent}22`,
                    color: '#fff',
                    fontSize: '12px',
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase'
                  }}
                >
                  {selectedCertificate.category}
                </div>

                <div>
                  <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', color: 'var(--text-primary)', fontSize: '32px', lineHeight: '1.1' }}>
                    {selectedCertificate.title}
                  </h3>
                  <p style={{ marginTop: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-body)', lineHeight: '1.8', fontSize: '15px' }}>
                    {selectedCertificateNote}
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '12px' }}>
                  <div style={{ padding: '14px', borderRadius: '16px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '6px' }}>Certificate</div>
                    <div style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)', fontSize: '15px' }}>{selectedCertificate.title}</div>
                  </div>
                  <div style={{ padding: '14px', borderRadius: '16px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '6px' }}>Category</div>
                    <div style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)', fontSize: '15px' }}>{selectedCertificate.category}</div>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedCertificate(null)}
                  style={{
                    marginTop: '8px',
                    width: 'fit-content',
                    padding: '12px 18px',
                    borderRadius: '12px',
                    border: 'none',
                    background: selectedCertificate.accent,
                    color: '#fff',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    cursor: 'pointer'
                  }}
                >
                  Close Preview
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
