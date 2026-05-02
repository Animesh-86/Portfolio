import { useEffect, useState, type CSSProperties } from 'react';

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

const tunnelDuration = 18;

export function Achievements() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const visibleCertificates =
    activeCategory === 'All' ? certificates : certificates.filter((certificate) => certificate.category === activeCategory);

  useEffect(() => {
    setSelectedIndex(0);
  }, [activeCategory]);

  useEffect(() => {
    if (selectedIndex >= visibleCertificates.length) {
      setSelectedIndex(0);
    }
  }, [selectedIndex, visibleCertificates.length]);

  const activeCertificate = visibleCertificates[selectedIndex] ?? visibleCertificates[0];

  const handlePrev = () => {
    setSelectedIndex((currentIndex) => (currentIndex === 0 ? visibleCertificates.length - 1 : currentIndex - 1));
  };

  const handleNext = () => {
    setSelectedIndex((currentIndex) => (currentIndex + 1) % visibleCertificates.length);
  };

  return (
    <section
      className="py-32 relative overflow-hidden"
      style={{
        background:
          'radial-gradient(circle at top, rgba(15, 30, 43, 0.92) 0%, rgba(9, 12, 18, 0.98) 52%, var(--background) 100%)'
      }}
    >
      <style>{`
        @keyframes certificate-fly {
          0% {
            opacity: 0;
            transform: translate3d(var(--offset-x), var(--offset-y), -4200px) rotateY(26deg) rotateX(10deg) scale(0.42);
          }
          10% {
            opacity: 0.9;
          }
          55% {
            opacity: 1;
          }
          90% {
            opacity: 0.9;
          }
          100% {
            opacity: 0;
            transform: translate3d(calc(var(--offset-x) * 0.15), calc(var(--offset-y) * 0.15), 1100px) rotateY(0deg) rotateX(0deg) scale(1.08);
          }
        }

        @keyframes tunnel-breathe {
          0%, 100% {
            transform: translateY(0px);
            opacity: 0.45;
          }
          50% {
            transform: translateY(-8px);
            opacity: 1;
          }
        }
      `}</style>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-1/2 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-[rgba(255,255,255,0.06)] blur-3xl" />
        <div className="absolute bottom-[-10rem] right-[-8rem] h-[22rem] w-[22rem] rounded-full bg-[rgba(0,160,120,0.12)] blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:120px_120px] opacity-[0.08]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-8 relative z-10">
        <div
          className="absolute left-8 top-24 text-[200px] font-bold opacity-[0.03] pointer-events-none select-none"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          04
        </div>

        <div
          className="text-[10px] mb-12 tracking-[0.2em]"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--primary)' }}
        >
          // Recognition
        </div>

        <div className="mb-10 relative z-10 max-w-3xl">
          <h2 className="text-[48px] md:text-[58px] font-medium" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
            Certificates in motion<span style={{ color: 'var(--primary)' }}>.</span>
          </h2>
          <p className="mt-4 text-[14px] max-w-2xl" style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)', lineHeight: '1.8' }}>
            A cinematic 3D gallery inspired by the Framer tunnel effect. Pick a certificate, then move through the stack with the controls or by selecting a card in the tunnel.
          </p>
        </div>

        <div className="mb-10 flex flex-wrap gap-2 relative z-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className="px-4 py-2 text-[12px] font-medium transition-all duration-300 tracking-[0.1em] uppercase"
              style={{
                fontFamily: 'var(--font-mono)',
                background: activeCategory === category ? 'var(--primary)' : 'rgba(255, 255, 255, 0.04)',
                border: `1px solid ${activeCategory === category ? 'var(--primary)' : 'rgba(255, 255, 255, 0.12)'}`,
                color: activeCategory === category ? '#ffffff' : 'var(--text-secondary)',
                borderRadius: '999px'
              }}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] items-stretch relative z-10">
          <aside
            className="rounded-[32px] border p-8 md:p-10 shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
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
                  {visibleCertificates.length} visible certificate{visibleCertificates.length !== 1 ? 's' : ''}
                </div>
              </div>
              <div
                className="h-3 w-3 rounded-full"
                style={{ background: activeCertificate?.accent ?? 'var(--primary)', boxShadow: `0 0 18px ${activeCertificate?.accent ?? 'var(--primary)'}` }}
              />
            </div>

            <div className="mt-6 rounded-[28px] overflow-hidden border border-[rgba(255,255,255,0.1)] bg-[rgba(0,0,0,0.28)]">
              <img
                src={activeCertificate.src}
                alt={activeCertificate.title}
                className="h-[240px] w-full object-cover"
              />
            </div>

            <div className="mt-6 space-y-4">
              <div className="text-[11px] tracking-[0.2em] uppercase" style={{ fontFamily: 'var(--font-mono)', color: activeCertificate.accent }}>
                {activeCertificate.category}
              </div>
              <h3 className="text-[28px] md:text-[34px] font-semibold leading-[1.1]" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                {activeCertificate.title}
              </h3>
              <p className="text-[13px] md:text-[14px] max-w-xl" style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)', lineHeight: '1.8' }}>
                Click the cards in the tunnel to shift the spotlight, or use the next and previous controls to move through the filtered set.
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
                <div className="mt-2 text-[20px] font-semibold truncate" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                  {activeCategory}
                </div>
              </div>
              <div className="rounded-[18px] border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)] p-4">
                <div className="text-[10px] uppercase tracking-[0.2em]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                  Total
                </div>
                <div className="mt-2 text-[20px] font-semibold" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                  {visibleCertificates.length}
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
              <a
                href={activeCertificate.src}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 text-[14px] font-medium transition-all hover:scale-[1.02]"
                style={{
                  fontFamily: 'var(--font-body)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: 'var(--text-secondary)',
                  borderRadius: '999px',
                  background: 'rgba(255,255,255,0.03)'
                }}
              >
                Open original ↗
              </a>
            </div>
          </aside>

          <div
            className="relative min-h-[720px] overflow-hidden rounded-[32px] border"
            style={{
              perspective: '1800px',
              background:
                'radial-gradient(circle at center, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 28%, rgba(0,0,0,0.32) 100%)',
              borderColor: 'rgba(255,255,255,0.12)'
            }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_30%,transparent_70%)]" />

            <div className="absolute inset-x-0 top-8 flex justify-center pointer-events-none">
              <div
                className="rounded-full border border-[rgba(255,255,255,0.14)] px-5 py-2 text-[11px] tracking-[0.35em] uppercase"
                style={{
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-secondary)',
                  background: 'rgba(0,0,0,0.28)',
                  animation: 'tunnel-breathe 4s ease-in-out infinite'
                }}
              >
                3D certificate tunnel
              </div>
            </div>

            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {visibleCertificates.map((certificate, index) => {
                const total = visibleCertificates.length;
                const offsetX = index % 2 === 0 ? '-24rem' : '24rem';
                const offsetY = `${(index - (total - 1) / 2) * 1.5}rem`;
                const delay = `-${(tunnelDuration / total) * index}s`;
                const isSelected = index === selectedIndex;

                return (
                  <button
                    key={certificate.id}
                    onClick={() => setSelectedIndex(index)}
                    className="group absolute"
                    style={{
                      width: 'clamp(15rem, 24vw, 20rem)',
                      height: 'clamp(10rem, 16vw, 13.5rem)',
                      padding: 0,
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      transformStyle: 'preserve-3d',
                      animation: `certificate-fly ${tunnelDuration}s linear infinite`,
                      animationDelay: delay,
                      ['--offset-x' as unknown as keyof CSSProperties]: offsetX,
                      ['--offset-y' as unknown as keyof CSSProperties]: offsetY,
                      ['--accent' as unknown as keyof CSSProperties]: certificate.accent,
                      outline: 'none'
                    }}
                  >
                    <div
                      className="relative h-full w-full overflow-hidden rounded-[24px] border shadow-[0_18px_80px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-[1.04]"
                      style={{
                        borderColor: isSelected ? certificate.accent : 'rgba(255,255,255,0.1)',
                        background:
                          'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
                        boxShadow: isSelected ? `0 0 0 1px ${certificate.accent}, 0 28px 90px rgba(0,0,0,0.55)` : '0 18px 80px rgba(0,0,0,0.5)',
                        transform: 'translateZ(0)',
                        backfaceVisibility: 'hidden'
                      }}
                    >
                      <img
                        src={certificate.src}
                        alt={certificate.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.18)_45%,rgba(0,0,0,0.8)_100%)]" />
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
                            color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                            background: isSelected ? `${certificate.accent}55` : 'rgba(255,255,255,0.08)',
                            border: `1px solid ${isSelected ? certificate.accent : 'rgba(255,255,255,0.08)'}`
                          }}
                        >
                          {index + 1}/{total}
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
                    </div>
                  </button>
                );
              })}
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
