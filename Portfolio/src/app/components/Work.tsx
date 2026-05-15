import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExternalLink, Github } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

type FilterType = 'All' | 'Full Stack' | 'Java' | 'Mobile' | 'Freelance' | 'Open Source' | 'Hackathon';

interface Project {
  id: string;
  year: string;
  name: string;
  subtitle: string;
  description: string;
  tags: string[];
  badge?: { text: string; color: string };
  category: FilterType[];
  isFeatured?: boolean;
  github: string;
}

const projects: Project[] = [
  {
    id: '01',
    year: '2026',
    name: 'Axion',
    subtitle: 'EV FLEET TELEMETRY & OTA',
    description: 'Real-time telemetry system for electric vehicle fleets with digital twin architecture. Processes 1000+ events/min using Kafka streams and Redis.',
    tags: ['Spring Boot', 'Kafka', 'Redis', 'React'],
    badge: { text: 'Featured', color: 'var(--primary)' },
    category: ['All', 'Full Stack'],
    isFeatured: true,
    github: 'https://github.com/Animesh-86/Axion'
  },
  {
    id: 'nextlevel',
    year: '2026',
    name: 'NextLevel',
    subtitle: 'AI KNOWLEDGE OPERATING SYSTEM',
    description: 'AI-first platform for knowledge management. Features semantic search with vector embeddings, durable Inngest workflows, and automated summarization.',
    tags: ['Next.js 15', 'MongoDB', 'Gemini AI', 'Inngest'],
    badge: { text: 'AI-First', color: '#6366F1' },
    category: ['All', 'Full Stack'],
    isFeatured: true,
    github: 'https://github.com/Animesh-86/NextLevel'
  },
  {
    id: '04',
    year: '2025',
    name: 'Parallax',
    subtitle: 'COLLABORATIVE CODE EDITOR',
    description: 'Real-time collaborative editor with multi-cursor support, syntax highlighting, and integrated WebRTC video calling for remote pair programming.',
    tags: ['React', 'Spring Boot', 'WebRTC', 'Docker'],
    badge: { text: 'Featured', color: 'var(--primary)' },
    category: ['All', 'Full Stack'],
    isFeatured: true,
    github: 'https://github.com/Animesh-86/Parallax'
  },
  {
    id: '05',
    year: '2025',
    name: 'BiteBox POS System',
    subtitle: 'COMMERCIAL POINT-OF-SALE',
    description: 'A robust freelance POS system for retail. Handles multi-device synchronization, offline inventory management, and real-time sales reporting.',
    tags: ['Flutter', 'Firebase', 'SQLite'],
    badge: { text: 'Freelance', color: 'var(--highlight)' },
    category: ['All', 'Mobile', 'Freelance'],
    github: 'https://github.com/Animesh-86/BiteBox'
  },
  {
    id: 'commitpulse',
    year: '2026',
    name: 'CommitPulse',
    subtitle: 'ISOMETRIC GITHUB CONTRIBUTIONS',
    description: 'A cinematic SVG generation engine that visualizes GitHub contributions as a 3D isometric city. Supports custom themes and UTC-midnight sync.',
    tags: ['Next.js', 'GraphQL', 'SVG', 'TypeScript'],
    badge: { text: 'Open Source', color: 'var(--highlight)' },
    category: ['All', 'Open Source'],
    github: 'https://github.com/JhaSourav07/commitpulse'
  },
  {
    id: 'travelloop',
    year: '2026',
    name: 'TravelLoop',
    subtitle: 'SMART AI TRAVEL PLANNER',
    description: 'Production-grade travel planner featuring AI-generated itineraries, real-time WebSocket collaboration, and comprehensive budget tracking.',
    tags: ['Spring Boot', 'React', 'PostgreSQL', 'Docker'],
    badge: { text: 'Hackathon', color: 'var(--secondary)' },
    category: ['All', 'Hackathon'],
    github: 'https://github.com/Animesh-86/TravelLoop'
  },
  {
    id: 'studio-json',
    year: '2026',
    name: 'Studio JSON Schema',
    subtitle: 'VISUAL GRAPH-BASED EXPLORER',
    description: 'An interactive open-source tool for visualizing complex JSON Schemas as node graphs. Resolves $ref chains and circular references in real-time.',
    tags: ['React Flow', 'Hyperjump', 'Monaco', 'Open Source'],
    badge: { text: 'Open Source', color: 'var(--highlight)' },
    category: ['All', 'Open Source'],
    github: 'https://github.com/ioflux-org/studio-json-schema'
  },
  {
    id: 'datatrust',
    year: '2026',
    name: 'DataTrust Engine',
    subtitle: 'UNIFIED DATA TRUST SCORES',
    description: 'Data observability tool that computes trust scores for metadata catalogs. Integrates with OpenMetadata to provide lineage and quality metrics.',
    tags: ['OpenMetadata', 'Python', 'React'],
    badge: { text: 'Individual', color: 'var(--primary)' },
    category: ['All', 'Full Stack'],
    github: 'https://github.com/Animesh-86/DataTrust-Engine'
  },
  {
    id: 'expenzo',
    year: '2026',
    name: 'Expenzo',
    subtitle: 'SMART SAVINGS TRACKER',
    description: 'Personal finance application focused on long-term savings goals. Includes intelligent weekly calculation and goal category management.',
    tags: ['React Native', 'Node.js', 'PostgreSQL'],
    badge: { text: 'Individual', color: 'var(--primary)' },
    category: ['All', 'Mobile'],
    github: 'https://github.com/Animesh-86/Expenzo'
  },
  {
    id: 'blogapp',
    year: '2025',
    name: 'Blog WebApp',
    subtitle: 'MODERN CONTENT PLATFORM',
    description: 'Full stack blogging platform with markdown support, SEO optimization, and an integrated dashboard for content management.',
    tags: ['React', 'Node.js', 'MongoDB'],
    badge: { text: 'Individual', color: 'var(--primary)' },
    category: ['All', 'Full Stack'],
    github: 'https://github.com/Animesh-86/Blog-WebApp'
  },
  {
    id: 'aroundme',
    year: '2025',
    name: 'Around Me',
    subtitle: 'LOCATION DISCOVERY APP',
    description: 'AI-powered location discovery application that suggests hidden gems and local attractions based on user preferences.',
    tags: ['React Native', 'OpenAI'],
    badge: { text: 'Hackathon', color: 'var(--secondary)' },
    category: ['All', 'Hackathon'],
    github: 'https://github.com/Animesh-86/AroundMe'
  },
  {
    id: 'amazon',
    year: '2024',
    name: 'Amazon Clone',
    subtitle: 'E-COMMERCE FLOW REPLICATION',
    description: 'A high-fidelity clone of the Amazon storefront, featuring full cart functionality, payment gateway integration, and user authentication.',
    tags: ['React', 'Firebase', 'Stripe'],
    badge: { text: 'Individual', color: 'var(--primary)' },
    category: ['All', 'Full Stack'],
    github: 'https://github.com/Animesh-86/Amazon-Clone'
  },
  {
    id: '09',
    year: '2024',
    name: 'JSON Parser Library',
    subtitle: 'ZERO-DEPENDENCY JAVA ENGINE',
    description: 'High-performance JSON parser built from scratch in Java 17. Includes a custom recursive-descent lexer and memory-efficient node engine.',
    tags: ['Java 17', 'Parser', 'Lexer'],
    badge: { text: 'Individual', color: 'var(--primary)' },
    category: ['All', 'Java'],
    isFeatured: true,
    github: 'https://github.com/Animesh-86/json-parser-java'
  }
];

export function Work() {
  const [filter, setFilter] = useState<FilterType>('All');
  const navigate = useNavigate();

  const filteredProjects = projects.filter((p) => p.category.includes(filter));
  const featuredProjects = filteredProjects.filter((p) => p.isFeatured);
  const archiveProjects = filteredProjects.filter((p) => !p.isFeatured);

  const handleProjectClick = (project: Project) => {
    trackEvent('project_view', { id: project.id, name: project.name });
    // Projects that have detailed case studies
    if (['01', '04', '05', '09', 'nextlevel'].includes(project.id)) {
      window.scrollTo(0, 0);
      navigate(`/project/${project.id}`);
    } else {
      window.open(project.github, '_blank');
    }
  };

  return (
    <section id="work" className="py-32 relative" style={{ background: 'rgba(10, 10, 15, 0.72)' }}>
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="absolute left-8 top-32 text-[200px] font-bold opacity-[0.03] pointer-events-none select-none" style={{ fontFamily: 'var(--font-display)' }}>
          02
        </div>

        <div className="text-[10px] mb-12 tracking-[0.2em]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--primary)' }}>
          // Selected Work
        </div>

        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-16 relative z-10 gap-6">
          <h2 className="text-[48px] font-medium" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
            Projects I've Built
          </h2>

          <div className="flex flex-wrap items-center gap-2">
            {(['All', 'Full Stack', 'Java', 'Mobile', 'Freelance', 'Open Source', 'Hackathon'] as FilterType[]).map((tab) => (
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

        {filter === 'All' ? (
          <>
            {featuredProjects.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 mb-20">
                {featuredProjects.map((project) => (
                  <FeaturedCard 
                    key={project.id} 
                    project={project} 
                    onClick={() => handleProjectClick(project)}
                  />
                ))}
              </div>
            )}

            {archiveProjects.length > 0 && (
              <div className="relative z-10 mt-12">
                <h3 className="text-[24px] font-medium mb-8" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                  Other Notable Projects
                </h3>
                
                <div className="flex flex-col">
                  <div className="hidden md:grid grid-cols-[80px_2fr_1fr_2fr_40px] gap-4 px-6 py-4 border-b border-[var(--border)] text-[10px] uppercase tracking-wider font-mono text-[var(--text-muted)]">
                    <span>Year</span>
                    <span>Project</span>
                    <span>Category</span>
                    <span>Tech Stack</span>
                    <span>Link</span>
                  </div>
                  
                  {archiveProjects.map((project) => (
                    <div 
                      key={project.id} 
                      className={`grid grid-cols-1 md:grid-cols-[80px_2fr_1fr_2fr_40px] gap-2 md:gap-4 px-6 py-6 border-b border-[var(--border)] hover:bg-[rgba(255,255,255,0.02)] transition-colors group ${['01', '04', '05', '09', 'nextlevel'].includes(project.id) ? 'cursor-pointer' : 'cursor-default'}`}
                      onClick={() => handleProjectClick(project)}
                    >
                      <div className="text-[12px] font-mono text-[var(--text-secondary)] md:py-1">
                        {project.year}
                      </div>
                      
                      <div className="flex flex-col gap-1">
                        <span className="text-[16px] font-medium text-[var(--text-primary)] font-display group-hover:text-[var(--primary)] transition-colors">
                          {project.name}
                        </span>
                        <span className="text-[10px] font-mono text-[var(--text-muted)] md:hidden">
                          {project.badge?.text || 'Individual'}
                        </span>
                      </div>
                      
                      <div className="hidden md:flex items-start py-1">
                        <span className="text-[12px] text-[var(--text-secondary)]">
                          {project.badge?.text || 'Individual'}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 items-start py-1">
                        {project.tags.map(tag => (
                          <span key={tag} className="text-[11px] font-mono text-[var(--text-muted)] bg-[rgba(255,255,255,0.03)] px-2 py-0.5 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center md:py-1">
                        <a 
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors p-1"
                        >
                          <Github size={16} />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            {filteredProjects.map((project) => (
              <FeaturedCard 
                key={project.id} 
                project={project} 
                onClick={() => handleProjectClick(project)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function FeaturedCard({ project, onClick }: { project: Project; onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className="flex flex-col justify-between p-8 rounded-2xl border border-[var(--border)] bg-[rgba(17,17,24,0.4)] backdrop-blur-sm hover:border-[var(--primary)] transition-all duration-300 group relative overflow-hidden h-full min-h-[320px] cursor-pointer"
    >
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle at top right, ${project.badge?.color || 'var(--primary)'}, transparent 60%)` }}
      />

      <div className="relative z-10 flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-mono text-[var(--secondary)] tracking-widest uppercase">
              {project.subtitle}
            </span>
            <h3 className="text-[28px] font-medium font-display text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors">
              {project.name}
            </h3>
          </div>
          <div className="flex gap-2">
            <a 
              href={project.github} 
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()} 
              className="p-2 rounded-full bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.08)] transition-colors text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            >
              <Github size={16} />
            </a>
            <a 
              href={project.github} 
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()} 
              className="p-2 rounded-full bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.08)] transition-colors text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            >
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
        <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed mt-2">
          {project.description}
        </p>
      </div>

      <div className="relative z-10 mt-8 pt-6 border-t border-[rgba(255,255,255,0.05)] flex justify-between items-end">
        <div className="flex flex-wrap gap-2">
          {project.tags.map(tag => (
            <span key={tag} className="text-[11px] font-mono text-[var(--text-muted)]">{tag}</span>
          ))}
        </div>
        <div className="flex flex-col items-end gap-2">
           <span className="text-[10px] font-mono text-[var(--primary)] opacity-0 group-hover:opacity-100 transition-opacity">
             {['01', '04', '05', '09', 'nextlevel'].includes(project.id) ? 'View Case Study →' : 'View Code →'}
           </span>
           {project.badge && (
             <span className="px-3 py-1 text-[10px] font-medium rounded-full" style={{ background: `color-mix(in srgb, ${project.badge.color} 15%, transparent)`, color: project.badge.color, border: `1px solid color-mix(in srgb, ${project.badge.color} 30%, transparent)` }}>
               {project.badge.text}
             </span>
           )}
        </div>
      </div>
    </div>
  );
}

