import { useState } from 'react';

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
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All' 
    ? certificates 
    : certificates.filter(c => c.category === activeCategory);

  const handlePrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === 0 ? filtered.length - 1 : selectedIndex - 1);
    }
  };

  const handleNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % filtered.length);
    }
  };

  const currentCert = selectedIndex !== null ? filtered[selectedIndex] : null;

  return (
    <section className="py-32 relative" style={{ background: 'var(--background)' }}>
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
            Certificates & Recognition<span style={{ color: 'var(--primary)' }}>.</span>
          </h2>
          <p
            className="mt-4 text-[14px] max-w-2xl"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)', lineHeight: '1.8' }}
          >
            {filtered.length} certificate{filtered.length !== 1 ? 's' : ''} across cloud, AI, frontend, databases, DSA, and more. Click any certificate to expand.
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

        {/* Certificate Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 relative z-10 mb-8">
          {filtered.map((cert, idx) => (
            <div
              key={cert.id}
              onClick={() => setSelectedIndex(idx)}
              className="group cursor-pointer relative overflow-hidden rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                aspectRatio: '1/1'
              }}
            >
              <img
                src={cert.src}
                alt={cert.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4"
              >
                <div className="text-[12px] tracking-[0.1em] uppercase" style={{ fontFamily: 'var(--font-mono)', color: cert.accent }}>
                  {cert.category}
                </div>
                <h4 className="text-[14px] font-semibold mt-1 line-clamp-2" style={{ fontFamily: 'var(--font-body)', color: '#ffffff' }}>
                  {cert.title}
                </h4>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Viewer */}
        {currentCert && selectedIndex !== null && (
          <div
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setSelectedIndex(null)}
          >
            <div
              className="relative bg-[var(--surface)] border border-[var(--border)] rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div
                className="sticky top-0 flex items-center justify-between p-6 border-b border-[var(--border)]"
                style={{ background: 'var(--surface)' }}
              >
                <div>
                  <div className="text-[11px] tracking-[0.15em] uppercase" style={{ fontFamily: 'var(--font-mono)', color: currentCert.accent }}>
                    {currentCert.category}
                  </div>
                  <h3 className="text-[24px] font-semibold mt-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                    {currentCert.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedIndex(null)}
                  className="text-[24px] transition-colors hover:text-[var(--primary)]"
                  style={{ color: 'var(--text-muted)' }}
                >
                  ✕
                </button>
              </div>

              {/* Image */}
              <div className="p-6 flex justify-center bg-black/20">
                <img src={currentCert.src} alt={currentCert.title} className="max-w-full max-h-[60vh] rounded" />
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between p-6 border-t border-[var(--border)]">
                <button
                  onClick={handlePrev}
                  className="px-4 py-2 text-[14px] font-medium transition-all hover:bg-[var(--primary)] hover:text-white"
                  style={{
                    fontFamily: 'var(--font-body)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-primary)',
                    borderRadius: '6px'
                  }}
                >
                  ← Previous
                </button>
                <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                  {selectedIndex + 1} of {filtered.length}
                </div>
                <button
                  onClick={handleNext}
                  className="px-4 py-2 text-[14px] font-medium transition-all hover:bg-[var(--primary)] hover:text-white"
                  style={{
                    fontFamily: 'var(--font-body)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-primary)',
                    borderRadius: '6px'
                  }}
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
