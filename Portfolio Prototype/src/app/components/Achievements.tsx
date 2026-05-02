import { useEffect, useMemo, useState } from 'react';

interface Certificate {
  id: string;
  title: string;
  category: string;
  src: string;
  accent: string;
}

const certificates: Certificate[] = [
  // AWS & Cloud
  { id: 'aws-1', title: 'AWS Academy Graduate', category: 'Cloud', src: '/certificates/aws-academy-cloud-foundations.png', accent: '#FF9900' },
  { id: 'aws-2', title: 'AWS Foundations', category: 'Cloud', src: '/certificates/aws.png', accent: '#FF9900' },
  
  // IBM & AI
  { id: 'ibm-1', title: 'IBM AI SkillsBuild', category: 'AI & ML', src: '/certificates/ibm-ai-skillsbuild.png', accent: '#0F62FE' },
  { id: 'ibm-2', title: 'AI Fundamentals', category: 'AI & ML', src: '/certificates/ai-fundamentals.png', accent: '#0F62FE' },
  
  // ServiceNow
  { id: 'sn-1', title: 'ServiceNow Micro-Cert', category: 'Enterprise', src: '/certificates/servicenow-micro.png', accent: '#00A699' },
  
  // HackerRank
  { id: 'hr-1', title: 'HackerRank Java', category: 'Languages', src: '/certificates/hackerrank-java.png', accent: '#2EC866' },
  { id: 'hr-2', title: 'HackerRank Python', category: 'Languages', src: '/certificates/hackerrank-python.png', accent: '#2EC866' },
  
  // Coursera
  { id: 'cs-1', title: 'Meta: HTML & CSS', category: 'Frontend', src: '/certificates/html-css-coursera.jpeg', accent: '#1F70C1' },
  { id: 'cs-2', title: 'Meta: JavaScript', category: 'Frontend', src: '/certificates/javascript-coursera.jpeg', accent: '#1F70C1' },
  
  // Udemy
  { id: 'ud-1', title: 'Flutter Development', category: 'Mobile', src: '/certificates/udemy-flutter.jpg', accent: '#02569B' },
  { id: 'ud-2', title: 'SQL Fundamentals', category: 'Databases', src: '/certificates/udemy-sql.jpg', accent: '#02569B' },
  
  // LeetCode
  { id: 'lc-1', title: 'LeetCode 50 Days', category: 'DSA', src: '/certificates/leetcode-50days.png', accent: '#FFA726' },
  { id: 'lc-2', title: 'LeetCode 100 Days', category: 'DSA', src: '/certificates/leetcode-100days.png', accent: '#FFA726' },
  
  // Languages
  { id: 'lang-1', title: 'C Programming', category: 'Languages', src: '/certificates/c.png', accent: '#A8B9CC' },
  
  // NxtWave
  { id: 'nw-1', title: 'NxtWave Training', category: 'Engineering', src: '/certificates/nxtwave.jpeg', accent: '#0066CC' }
];

const categories = ['All', 'Cloud', 'AI & ML', 'Languages', 'Frontend', 'Mobile', 'Databases', 'DSA', 'Enterprise', 'Engineering'];

export function Achievements() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = useMemo(
    () => (activeCategory === 'All' ? certificates : certificates.filter((certificate) => certificate.category === activeCategory)),
    [activeCategory]
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [activeCategory]);

  useEffect(() => {
    if (selectedIndex >= filtered.length) {
      setSelectedIndex(0);
    }
  }, [filtered.length, selectedIndex]);

  const handlePrev = () => {
    setSelectedIndex((currentIndex) => (currentIndex === 0 ? filtered.length - 1 : currentIndex - 1));
  };

  const handleNext = () => {
    setSelectedIndex((currentIndex) => (currentIndex + 1) % filtered.length);
  };

  const activeCertificate = filtered[selectedIndex] ?? filtered[0];
  const visibleCertificates = [...filtered, ...filtered];

  return (
    <section
      className="py-32 relative overflow-hidden"
      style={{
        background:
          'radial-gradient(circle at top, rgba(14, 22, 34, 0.96) 0%, rgba(9, 12, 18, 0.99) 50%, var(--background) 100%)'
      }}
    >
      <style>{`
        @keyframes certificate-slider-marquee {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(-50%, 0, 0);
          }
        }

        @keyframes certificate-card-glow {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 0.95; }
        }
      `}</style>
      <div className="max-w-[1440px] mx-auto px-8">
        {/* Section Number Watermark */}
        <div
          className="absolute left-8 top-32 text-[200px] font-bold opacity-[0.03] pointer-events-none select-none"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          04
        </div>

        {/* Section Tag */}
        <div
          className="text-[10px] mb-12 tracking-[0.2em]"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--primary)' }}
        >
          // Recognition
        </div>

        {/* Header */}
        <div className="mb-16 relative z-10">
          <h2
            className="text-[48px] font-medium"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
          >
            Certificates in motion<span style={{ color: 'var(--primary)' }}>.</span>
          </h2>
          <p
            className="mt-4 text-[14px] max-w-2xl"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)', lineHeight: '1.8' }}
          >
            A Framer-style certificate slider with category filtering, a focused spotlight card, and a looping ticker that keeps the collection moving.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-12 flex flex-wrap gap-2 relative z-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-2 text-[12px] font-medium transition-all duration-300 tracking-[0.1em] uppercase"
              style={{
                fontFamily: 'var(--font-mono)',
                background: activeCategory === cat ? 'var(--primary)' : 'var(--surface)',
                border: `1px solid ${activeCategory === cat ? 'var(--primary)' : 'var(--border)'}`,
                color: activeCategory === cat ? '#ffffff' : 'var(--text-secondary)',
                borderRadius: '6px'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] relative z-10">
          <aside
            className="rounded-[28px] border p-8 md:p-10 shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 100%)',
              borderColor: 'rgba(255,255,255,0.12)',
              backdropFilter: 'blur(24px)'
            }}
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-[11px] tracking-[0.2em] uppercase" style={{ fontFamily: 'var(--font-mono)', color: 'var(--highlight)' }}>
                  Spotlight
                </div>
                <div className="mt-2 text-[13px] uppercase tracking-[0.18em]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                  {filtered.length} visible certificate{filtered.length !== 1 ? 's' : ''}
                </div>
              </div>
              <div
                className="h-3 w-3 rounded-full"
                style={{ background: activeCertificate?.accent ?? 'var(--primary)', boxShadow: `0 0 18px ${activeCertificate?.accent ?? 'var(--primary)'}` }}
              />
            </div>

            <div className="mt-6 rounded-[24px] overflow-hidden border border-[rgba(255,255,255,0.1)] bg-[rgba(0,0,0,0.28)]">
              <img src={activeCertificate.src} alt={activeCertificate.title} className="h-[240px] w-full object-cover" />
            </div>

            <div className="mt-6 space-y-4">
              <div className="text-[11px] tracking-[0.2em] uppercase" style={{ fontFamily: 'var(--font-mono)', color: activeCertificate.accent }}>
                {activeCertificate.category}
              </div>
              <h3 className="text-[28px] md:text-[34px] font-semibold leading-[1.1]" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                {activeCertificate.title}
              </h3>
              <p className="text-[13px] md:text-[14px] max-w-xl" style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)', lineHeight: '1.8' }}>
                Use the slider controls or click any moving certificate to make it the active spotlight.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3">
              <div className="rounded-[18px] border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)] p-4">
                <div className="text-[10px] uppercase tracking-[0.2em]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                  Position
                </div>
                <div className="mt-2 text-[20px] font-semibold" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                  {selectedIndex + 1}
                </div>
              </div>
              <div className="rounded-[18px] border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)] p-4">
                <div className="text-[10px] uppercase tracking-[0.2em]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                  Filter
                </div>
                <div className="mt-2 text-[18px] font-semibold truncate" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                  {activeCategory}
                </div>
              </div>
              <div className="rounded-[18px] border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)] p-4">
                <div className="text-[10px] uppercase tracking-[0.2em]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                  Total
                </div>
                <div className="mt-2 text-[20px] font-semibold" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                  {filtered.length}
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={handlePrev}
                className="px-4 py-2 text-[14px] font-medium transition-all hover:scale-[1.02]"
                style={{
                  fontFamily: 'var(--font-body)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: 'var(--text-primary)',
                  borderRadius: '999px',
                  background: 'rgba(255,255,255,0.04)'
                }}
              >
                ← Previous
              </button>
              <button
                onClick={handleNext}
                className="px-4 py-2 text-[14px] font-medium transition-all hover:scale-[1.02]"
                style={{
                  fontFamily: 'var(--font-body)',
                  border: '1px solid var(--primary)',
                  color: '#ffffff',
                  borderRadius: '999px',
                  background: 'var(--primary)'
                }}
              >
                Next →
              </button>
            </div>
          </aside>

          <div
            className="relative min-h-[720px] overflow-hidden rounded-[28px] border"
            style={{
              background:
                'radial-gradient(circle at center, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 28%, rgba(0,0,0,0.32) 100%)',
              borderColor: 'rgba(255,255,255,0.12)'
            }}
          >
            <div className="absolute inset-x-0 top-8 flex justify-center pointer-events-none">
              <div
                className="rounded-full border border-[rgba(255,255,255,0.14)] px-5 py-2 text-[11px] tracking-[0.35em] uppercase"
                style={{
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-secondary)',
                  background: 'rgba(0,0,0,0.28)',
                  animation: 'certificate-card-glow 4s ease-in-out infinite'
                }}
              >
                Certificate slider
              </div>
            </div>

            <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
              <div
                className="absolute inset-y-0 left-0 flex items-center gap-6 px-8"
                style={{ animation: 'certificate-slider-marquee 28s linear infinite', width: '200%' }}
              >
                {visibleCertificates.map((certificate, index) => {
                  const isSelected = index === selectedIndex;
                  return (
                    <button
                      key={`${certificate.id}-a`}
                      onClick={() => setSelectedIndex(index)}
                      className="group relative shrink-0 overflow-hidden rounded-[24px] border text-left transition-transform duration-300 hover:scale-[1.02]"
                      style={{
                        width: 'clamp(17rem, 26vw, 21rem)',
                        height: 'clamp(11.5rem, 18vw, 14.5rem)',
                        borderColor: isSelected ? certificate.accent : 'rgba(255,255,255,0.1)',
                        background: 'rgba(255,255,255,0.05)',
                        boxShadow: isSelected ? `0 0 0 1px ${certificate.accent}, 0 24px 70px rgba(0,0,0,0.45)` : '0 16px 50px rgba(0,0,0,0.35)'
                      }}
                    >
                      <img
                        src={certificate.src}
                        alt={certificate.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.16)_48%,rgba(0,0,0,0.82)_100%)]" />
                      <div className="absolute inset-x-0 top-0 flex items-center justify-between px-4 pt-4">
                        <span
                          className="rounded-full px-3 py-1 text-[10px] tracking-[0.2em] uppercase"
                          style={{
                            fontFamily: 'var(--font-mono)',
                            color: '#ffffff',
                            background: `${certificate.accent}22`,
                            border: `1px solid ${certificate.accent}66`
                          }}
                        >
                          {certificate.category}
                        </span>
                        <span
                          className="rounded-full px-3 py-1 text-[10px] tracking-[0.2em] uppercase"
                          style={{
                            fontFamily: 'var(--font-mono)',
                            color: '#ffffff',
                            background: 'rgba(255,255,255,0.1)',
                            border: '1px solid rgba(255,255,255,0.08)'
                          }}
                        >
                          {index + 1}/{visibleCertificates.length}
                        </span>
                      </div>
                      <div className="absolute inset-x-0 bottom-0 p-4 text-left">
                        <h4
                          className="text-[16px] md:text-[18px] font-semibold leading-tight"
                          style={{ fontFamily: 'var(--font-display)', color: '#ffffff' }}
                        >
                          {certificate.title}
                        </h4>
                        <p className="mt-2 text-[11px] tracking-[0.16em] uppercase" style={{ fontFamily: 'var(--font-mono)', color: certificate.accent }}>
                          Tap to spotlight
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 border-t border-[rgba(255,255,255,0.1)] bg-[rgba(4,8,14,0.72)] px-6 py-5 backdrop-blur-xl">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <div className="text-[10px] tracking-[0.25em] uppercase" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    Current spotlight
                  </div>
                  <div className="mt-2 text-[22px] md:text-[26px] font-semibold" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                    {activeCertificate.title}
                  </div>
                </div>
                <div className="flex items-center gap-3 text-[12px] uppercase tracking-[0.18em]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                  <span className="rounded-full border border-[rgba(255,255,255,0.15)] px-3 py-2">
                    {selectedIndex + 1} of {visibleCertificates.length}
                  </span>
                  <span className="rounded-full border border-[rgba(255,255,255,0.15)] px-3 py-2">
                    Click cards to rotate focus
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
