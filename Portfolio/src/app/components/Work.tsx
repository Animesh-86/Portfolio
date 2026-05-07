import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExternalLink, Github } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

type FilterType = 'All' | 'Full Stack' | 'Mobile' | 'Open Source' | 'Hackathon' | 'Freelance' | 'Group Project' | 'Library';

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
    isFeatured: true
  },
  {
    id: '04',
    year: '2025',
    name: 'Parallax',
    subtitle: 'COLLABORATIVE CODE EDITOR',
    description: 'Real-time collaborative code editor with multi-cursor support, live syntax highlighting, and peer-to-peer video calling.',
    tags: ['React', 'Spring Boot', 'WebRTC', 'Docker'],
    category: ['All', 'Full Stack'],
    isFeatured: true
  },
  {
    id: '05',
    year: '2025',
    name: 'BiteBox POS System',
    subtitle: 'COMMERCIAL POINT-OF-SALE',
    description: 'Full-featured point-of-sale freelance project for retail businesses with real-time inventory and multi-device sync.',
    tags: ['Flutter', 'Firebase', 'SQLite'],
    badge: { text: 'Freelance', color: 'var(--highlight)' },
    category: ['All', 'Mobile', 'Freelance'],
    isFeatured: true
  },
  {
    id: '09',
    year: '2024',
    name: 'JSON Parser Library',
    subtitle: 'ZERO-DEPENDENCY JAVA ENGINE',
    description: 'Lightweight JSON parsing library built from scratch in Java with a custom lexer and query engine.',
    tags: ['Java 17', 'Parser', 'Lexer'],
    badge: { text: 'Individual', color: 'var(--primary)' },
    category: ['All', 'Library'],
    isFeatured: true
  },
  {
    id: '02',
    year: '2026',
    name: 'DataTrust Engine',
    subtitle: 'UNIFIED DATA TRUST SCORES',
    description: 'Observability tool built during the WeMakeDev Metadata Hackathon. Connects to OpenMetadata to compute Trust Scores.',
    tags: ['OpenMetadata', 'Python', 'React'],
    badge: { text: 'Hackathon Winner', color: 'var(--secondary)' },
    category: ['All', 'Hackathon', 'Full Stack']
  },
  {
    id: '03',
    year: '2026',
    name: 'Studio JSON Schema',
    subtitle: 'SCHEMA ORGANIZATION ARCHITECTURE',
    description: 'Open source contribution focused on JSON schema organization. Designed architectural improvements for managing complex definitions.',
    tags: ['JSON Schema', 'Open Source', 'Architecture'],
    badge: { text: 'Open Source', color: 'var(--highlight)' },
    category: ['All', 'Open Source']
  },
  {
    id: '06',
    year: '2025',
    name: 'Around Me',
    subtitle: 'LOCATION DISCOVERY APP',
    description: 'Intelligent location discovery application built during the OpenAI Academy NxtWave Hackathon.',
    tags: ['OpenAI', 'React'],
    badge: { text: 'Hackathon', color: 'var(--secondary)' },
    category: ['All', 'Hackathon', 'Full Stack']
  },
  {
    id: '07',
    year: '2025',
    name: 'Pantsir SHORAD',
    subtitle: 'DEFENSE SIMULATION SYSTEM',
    description: 'A comprehensive group project focusing on simulating short-range air defense mechanics.',
    tags: ['Simulation', 'Algorithms'],
    badge: { text: 'Group Project', color: '#8b5cf6' },
    category: ['All', 'Group Project']
  },
  {
    id: '08',
    year: '2024',
    name: 'Expenzo',
    subtitle: 'PERSONAL FINANCE TRACKER',
    description: 'Mobile-first personal finance tracker with expense categorization and budget planning.',
    tags: ['Flutter', 'Firebase'],
    category: ['All', 'Mobile']
  },
  {
    id: '10',
    year: '2024',
    name: 'Blog App',
    subtitle: 'FULL STACK CONTENT PLATFORM',
    description: 'A fully featured blogging platform built completely independently with Python and Django.',
    tags: ['Python', 'Django'],
    category: ['All', 'Full Stack']
  },
  {
    id: '11',
    year: '2023',
    name: 'Amazon Clone',
    subtitle: 'E-COMMERCE UI REPLICA',
    description: 'A responsive Amazon.in homepage replica built completely from scratch.',
    tags: ['HTML5', 'CSS3'],
    category: ['All', 'Full Stack']
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
    // Only navigate for projects that have case studies (01, 04, 05, 09)
    if (['01', '04', '05', '09'].includes(project.id)) {
      window.scrollTo(0, 0);
      navigate(`/project/${project.id}`);
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
            {(['All', 'Full Stack', 'Mobile', 'Open Source', 'Hackathon', 'Freelance', 'Group Project', 'Library'] as FilterType[]).map((tab) => (
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
              <div className="hidden md:grid grid-cols-[80px_2fr_1fr_2fr] gap-4 px-6 py-4 border-b border-[var(--border)] text-[10px] uppercase tracking-wider font-mono text-[var(--text-muted)]">
                <span>Year</span>
                <span>Project</span>
                <span>Built At</span>
                <span>Tech Stack</span>
              </div>
              
              {archiveProjects.map((project) => (
                <div 
                  key={project.id} 
                  className={`grid grid-cols-1 md:grid-cols-[80px_2fr_1fr_2fr] gap-2 md:gap-4 px-6 py-6 border-b border-[var(--border)] hover:bg-[rgba(255,255,255,0.02)] transition-colors group ${['01', '04', '05', '09'].includes(project.id) ? 'cursor-pointer' : 'cursor-default'}`}
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
                </div>
              ))}
            </div>
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
            <a href="#" onClick={(e) => e.stopPropagation()} className="p-2 rounded-full bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.08)] transition-colors text-[var(--text-secondary)] hover:text-[var(--text-primary)]"><Github size={16} /></a>
            <a href="#" onClick={(e) => e.stopPropagation()} className="p-2 rounded-full bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.08)] transition-colors text-[var(--text-secondary)] hover:text-[var(--text-primary)]"><ExternalLink size={16} /></a>
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
           <span className="text-[10px] font-mono text-[var(--primary)] opacity-0 group-hover:opacity-100 transition-opacity">View Case Study →</span>
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

