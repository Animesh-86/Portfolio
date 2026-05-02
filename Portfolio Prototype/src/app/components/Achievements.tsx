import { useState, useMemo } from 'react';

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

export function Achievements() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filtered = useMemo(
    () => (activeCategory === 'All' ? certificates : certificates.filter((c) => c.category === activeCategory)),
    [activeCategory]
  );

  return (
    <section
      className="py-32 relative overflow-hidden"
      style={{
        background: 'radial-gradient(circle at top, rgba(14, 22, 34, 0.96) 0%, rgba(9, 12, 18, 0.99) 50%, var(--background) 100%)'
      }}
    >
      <style>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes float-in {
          from { opacity: 0; transform: translateY(40px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .cert-card {
          animation: float-in 0.6s ease-out backwards;
        }

        .cert-card:nth-child(1) { animation-delay: 0.05s; }
        .cert-card:nth-child(2) { animation-delay: 0.1s; }
        .cert-card:nth-child(3) { animation-delay: 0.15s; }
        .cert-card:nth-child(4) { animation-delay: 0.2s; }
        .cert-card:nth-child(5) { animation-delay: 0.25s; }
        .cert-card:nth-child(6) { animation-delay: 0.3s; }
      `}</style>

      <div className="max-w-[1440px] mx-auto px-8 relative z-10">
        <div className="absolute left-8 top-32 text-[200px] font-bold opacity-[0.03] pointer-events-none select-none" style={{ fontFamily: 'var(--font-display)' }}>
          04
        </div>

        <div className="text-[10px] mb-12 tracking-[0.2em]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--primary)' }}>
          // Credentials
        </div>

        <div className="mb-16 relative z-10">
          <h2 className="text-[48px] font-medium" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
            Certifications<span style={{ color: 'var(--primary)' }}>.</span>
          </h2>
          <p className="mt-4 text-[14px] max-w-2xl" style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)', lineHeight: '1.8' }}>
            A curated collection of professional credentials spanning cloud infrastructure, AI & machine learning, full-stack development, and more.
          </p>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 relative z-10">
          {filtered.map((cert) => (
            <button
              key={cert.id}
              onClick={() => setSelectedCert(cert)}
              onMouseEnter={() => setHoveredId(cert.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="cert-card group relative overflow-hidden rounded-[20px] border transition-all duration-500 hover:scale-[1.02] text-left"
              style={{
                borderColor: hoveredId === cert.id ? cert.accent : 'rgba(255,255,255,0.1)',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)',
                boxShadow: hoveredId === cert.id ? `0 0 24px ${cert.accent}40, inset 0 1px 1px rgba(255,255,255,0.1)` : '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.05)'
              }}
            >
              <div className="relative h-[240px] overflow-hidden">
                <img
                  src={cert.src}
                  alt={cert.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.3)_0%,rgba(0,0,0,0.6)_60%,rgba(0,0,0,0.8)_100%)] group-hover:opacity-75 transition-opacity duration-300" />

                <div className="absolute top-3 left-3">
                  <span
                    className="inline-block rounded-full px-3 py-1 text-[10px] tracking-[0.2em] uppercase font-medium"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      color: '#ffffff',
                      background: cert.accent,
                      opacity: 0.9
                    }}
                  >
                    {cert.category}
                  </span>
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[rgba(0,0,0,0.5)] backdrop-blur-sm">
                  <svg className="w-12 h-12 mb-2" fill="none" stroke="white" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-white text-[12px] font-medium">View details</p>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-[16px] font-semibold leading-tight" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                  {cert.title}
                </h3>
                <div className="mt-3 flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full" style={{ background: cert.accent }} />
                  <p className="text-[11px]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    {cert.category}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="text-[13px]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
          Showing <span style={{ color: 'var(--text-primary)' }}>{filtered.length}</span> credential{filtered.length !== 1 ? 's' : ''} in {activeCategory === 'All' ? 'all categories' : activeCategory}
        </div>
      </div>

      {selectedCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          style={{ background: 'rgba(0,0,0,0.7)' }}
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="relative bg-[rgba(14,20,32,0.95)] border border-[rgba(255,255,255,0.1)] rounded-[32px] max-w-[600px] w-full max-h-[80vh] overflow-y-auto shadow-[0_32px_128px_rgba(0,0,0,0.6)]"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: 'slide-up 0.4s ease-out' }}
          >
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-[rgba(255,255,255,0.1)]"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}
            >
              ✕
            </button>

            <div className="relative h-[360px] overflow-hidden rounded-t-[32px]">
              <img src={selectedCert.src} alt={selectedCert.title} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.8)_100%)]" />

              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="inline-block rounded-full px-4 py-2 text-[11px] tracking-[0.2em] uppercase font-medium mb-4" style={{ fontFamily: 'var(--font-mono)', color: '#ffffff', background: selectedCert.accent }}>
                  {selectedCert.category}
                </div>
                <h2 className="text-[36px] font-semibold leading-tight" style={{ fontFamily: 'var(--font-display)', color: '#ffffff' }}>
                  {selectedCert.title}
                </h2>
              </div>
            </div>

            <div className="p-8 space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-[16px] border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)] p-4">
                  <div className="text-[10px] tracking-[0.2em] uppercase" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    Category
                  </div>
                  <div className="mt-2 text-[14px] font-semibold" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                    {selectedCert.category}
                  </div>
                </div>
                <div className="rounded-[16px] border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)] p-4">
                  <div className="text-[10px] tracking-[0.2em] uppercase" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    Status
                  </div>
                  <div className="mt-2 text-[14px] font-semibold" style={{ fontFamily: 'var(--font-display)', color: 'var(--primary)' }}>
                    Earned
                  </div>
                </div>
                <div className="rounded-[16px] border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)] p-4">
                  <div className="text-[10px] tracking-[0.2em] uppercase" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    Year
                  </div>
                  <div className="mt-2 text-[14px] font-semibold" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                    2024
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-[13px] tracking-[0.2em] uppercase font-semibold mb-3" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                  About this credential
                </h3>
                <p className="text-[14px] leading-relaxed" style={{ fontFamily: 'var(--font-body)', color: 'var(--text-secondary)' }}>
                  This certification validates my knowledge and practical expertise in {selectedCert.category.toLowerCase()}. It demonstrates commitment to continuous learning and professional development in this technical domain.
                </p>
              </div>

              <div className="pt-4 border-t border-[rgba(255,255,255,0.1)]">
                <button
                  onClick={() => setSelectedCert(null)}
                  className="w-full px-6 py-3 rounded-[12px] font-medium transition-all"
                  style={{
                    fontFamily: 'var(--font-body)',
                    background: 'var(--primary)',
                    color: '#ffffff',
                    border: '1px solid var(--primary)'
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
