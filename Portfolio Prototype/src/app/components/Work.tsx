import { useState } from 'react';

type FilterType = 'All' | 'Backend' | 'Mobile' | 'Open Source';

interface Project {
  id: string;
  number: string;
  year: string;
  name: string;
  subtitle: string;
  description: string;
  tags: string[];
  badge?: { text: string; color: string };
  category: FilterType[];
}

const projects: Project[] = [
  {
    id: '01',
    number: '01',
    year: '2026',
    name: 'Axion',
    subtitle: 'EV FLEET TELEMETRY & OTA',
    description: 'Real-time telemetry system for electric vehicle fleets with digital twin architecture. Processes 1000+ events/min using Kafka streams, Redis caching, and Spring Boot microservices. Includes OTA update pipeline and fleet monitoring dashboard.',
    tags: ['Spring Boot', 'Kafka', 'Redis', 'Python', 'Digital Twin'],
    badge: { text: 'Featured', color: 'var(--primary)' },
    category: ['All', 'Backend']
  },
  {
    id: '02',
    number: '02',
    year: '2025',
    name: 'Parallax',
    subtitle: 'COLLABORATIVE CODE EDITOR',
    description: 'Real-time collaborative code editor with multi-cursor support, live syntax highlighting, and peer-to-peer video calling. Built with WebSocket synchronization and WebRTC for low-latency communication.',
    tags: ['React', 'Spring Boot', 'WebSocket', 'WebRTC', 'TypeScript'],
    category: ['All', 'Backend']
  },
  {
    id: '03',
    number: '03',
    year: '2025',
    name: 'POS System',
    subtitle: 'COMMERCIAL POINT-OF-SALE',
    description: 'Full-featured point-of-sale system for retail businesses with inventory management, sales analytics, and receipt printing. Serverless architecture with Firebase backend for real-time sync.',
    tags: ['Flutter', 'Firebase', 'Dart', 'Serverless'],
    badge: { text: 'Freelance', color: 'var(--highlight)' },
    category: ['All', 'Mobile']
  },
  {
    id: '04',
    number: '04',
    year: '2024',
    name: 'JSON Parser Library',
    subtitle: 'ZERO-DEPENDENCY JAVA ENGINE',
    description: 'Lightweight JSON parsing library built from scratch in Java with custom lexer and parser. Zero external dependencies, full JSON spec compliance, and comprehensive test coverage.',
    tags: ['Java', 'JUnit', 'Lexer'],
    badge: { text: 'Open Source', color: 'var(--secondary)' },
    category: ['All', 'Backend', 'Open Source']
  },
  {
    id: '05',
    number: '05',
    year: '2024',
    name: 'Expenzo',
    subtitle: 'PERSONAL FINANCE TRACKER',
    description: 'Mobile-first personal finance tracker with expense categorization, budget planning, and spending analytics. Real-time cloud sync with Firebase and beautiful data visualizations.',
    tags: ['Flutter', 'Firebase', 'Dart'],
    category: ['All', 'Mobile']
  }
];

export function Work() {
  const [filter, setFilter] = useState<FilterType>('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredProjects = projects.filter((p) => p.category.includes(filter));

  return (
    <section id="work" className="py-32 relative" style={{ background: 'rgba(10, 10, 15, 0.72)' }}>
      <div className="max-w-[1440px] mx-auto px-8">
        {/* Section Number Watermark */}
        <div
          className="absolute left-8 top-32 text-[200px] font-bold opacity-[0.03] pointer-events-none select-none"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          02
        </div>

        {/* Section Tag */}
        <div
          className="text-[10px] mb-12 tracking-[0.2em]"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--primary)' }}
        >
          // Selected Work
        </div>

        {/* Header Row */}
        <div className="flex items-end justify-between mb-16 relative z-10">
          <h2
            className="text-[48px] font-medium"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
          >
            Systems I've Built
          </h2>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2">
            {(['All', 'Backend', 'Mobile', 'Open Source'] as FilterType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className="px-4 py-2 text-[12px] font-medium transition-all"
                style={{
                  fontFamily: 'var(--font-body)',
                  background: filter === tab ? 'var(--primary)' : 'transparent',
                  color: filter === tab ? '#ffffff' : 'var(--text-secondary)',
                  border: `1px solid ${filter === tab ? 'var(--primary)' : 'var(--border)'}`,
                  borderRadius: '6px'
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Project List */}
        <div className="relative z-10">
          {filteredProjects.map((project, index) => (
            <div key={project.id}>
              <ProjectRow
                project={project}
                isExpanded={expandedId === project.id}
                onToggle={() => setExpandedId(expandedId === project.id ? null : project.id)}
              />
              {index < filteredProjects.length - 1 && (
                <div style={{ height: '1px', background: 'var(--border)' }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectRow({
  project,
  isExpanded,
  onToggle
}: {
  project: Project;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="grid grid-cols-[80px_1fr_120px] gap-8 py-8 px-6 -mx-6 cursor-pointer transition-all duration-300 group relative"
      style={{
        background: isExpanded ? 'var(--surface)' : 'transparent'
      }}
      onClick={onToggle}
    >
      {/* Left Border on Hover */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[2px] transition-all duration-300"
        style={{
          background: 'var(--primary)',
          opacity: isExpanded ? 1 : 0
        }}
      />

      {/* Column 1: Number & Year */}
      <div className="flex flex-col gap-1">
        <span
          className="text-[11px]"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}
        >
          {project.number}
        </span>
        <span
          className="text-[9px]"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}
        >
          {project.year}
        </span>
      </div>

      {/* Column 2: Content */}
      <div className="flex flex-col gap-3">
        <div>
          <h3
            className="text-[24px] font-medium mb-1"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
          >
            {project.name}
          </h3>
          <div
            className="text-[9px] tracking-[0.15em] uppercase mb-2"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--secondary)' }}
          >
            {project.subtitle}
          </div>
        </div>

        {/* Description */}
        <p
          className="text-[12px] font-light transition-all duration-300 overflow-hidden"
          style={{
            fontFamily: 'var(--font-body)',
            color: 'var(--text-secondary)',
            lineHeight: '1.85',
            maxHeight: isExpanded ? '500px' : '48px'
          }}
        >
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-1">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-[11px]"
              style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--text-secondary)',
                border: '1px solid var(--border)',
                borderRadius: '6px'
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Column 3: Arrow & Badge */}
      <div className="flex flex-col items-end justify-between">
        <span
          className="text-[24px] transition-transform duration-300"
          style={{
            color: 'var(--text-muted)',
            transform: isExpanded ? 'rotate(45deg)' : 'rotate(0deg)'
          }}
        >
          ↗
        </span>

        {project.badge && (
          <span
            className="px-3 py-1 text-[10px] font-medium"
            style={{
              fontFamily: 'var(--font-body)',
              background: project.badge.color,
              color: '#ffffff',
              borderRadius: '6px'
            }}
          >
            {project.badge.text}
          </span>
        )}
      </div>
    </div>
  );
}
