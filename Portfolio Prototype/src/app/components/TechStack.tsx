import { useState } from 'react';

interface Skill {
  name: string;
  isCore: boolean;
}

const skillColumns = [
  {
    title: 'Languages',
    skills: [
      { name: 'Java', isCore: true },
      { name: 'Python', isCore: false },
      { name: 'TypeScript', isCore: true },
      { name: 'JavaScript', isCore: false },
      { name: 'Dart', isCore: true },
      { name: 'C', isCore: false },
      { name: 'SQL', isCore: false }
    ]
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Spring Boot', isCore: true },
      { name: 'Kafka', isCore: true },
      { name: 'Redis', isCore: true },
      { name: 'Node.js', isCore: false },
      { name: 'Hibernate', isCore: false },
      { name: 'JPA', isCore: false },
      { name: 'JWT', isCore: false }
    ]
  },
  {
    title: 'Frontend/Mobile',
    skills: [
      { name: 'React', isCore: true },
      { name: 'Flutter', isCore: true },
      { name: 'WebRTC', isCore: false },
      { name: 'WebSockets', isCore: false },
      { name: 'Tailwind', isCore: false },
      { name: 'HTML/CSS', isCore: false }
    ]
  },
  {
    title: 'Cloud/Data',
    skills: [
      { name: 'Docker', isCore: true },
      { name: 'AWS', isCore: false },
      { name: 'Firebase', isCore: false },
      { name: 'PostgreSQL', isCore: false },
      { name: 'MongoDB', isCore: false },
      { name: 'MySQL', isCore: false },
      { name: 'Git', isCore: false }
    ]
  }
];

export function TechStack() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section id="stack" className="py-32 relative" style={{ background: 'var(--background)' }}>
      <div className="max-w-[1440px] mx-auto px-8">
        {/* Section Number Watermark */}
        <div
          className="absolute left-8 top-32 text-[200px] font-bold opacity-[0.03] pointer-events-none select-none"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          03
        </div>

        {/* Section Tag */}
        <div
          className="text-[10px] mb-12 tracking-[0.2em]"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--primary)' }}
        >
          // Tech Stack
        </div>

        {/* Header */}
        <div className="mb-16 relative z-10">
          <h2
            className="text-[48px] font-medium mb-2"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
          >
            The Stack
          </h2>
          <p
            className="text-[14px] font-light"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)' }}
          >
            Technologies I deploy in production
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-4 relative z-10">
          {skillColumns.map((column, index) => (
            <div key={column.title} className="relative">
              {/* Vertical Border */}
              {index < skillColumns.length - 1 && (
                <div
                  className="absolute right-0 top-0 bottom-0 w-[1px]"
                  style={{ background: 'var(--border)' }}
                />
              )}

              {/* Column Header */}
              <div
                className="px-6 py-4"
                style={{ borderBottom: '1px solid var(--border)' }}
              >
                <h3
                  className="text-[10px] tracking-wider uppercase font-medium"
                  style={{ fontFamily: 'var(--font-mono)', color: 'var(--highlight)' }}
                >
                  {column.title}
                </h3>
              </div>

              {/* Skills List */}
              <div>
                {column.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="px-6 py-3 flex items-center gap-3 transition-all duration-200 cursor-default"
                    style={{
                      borderBottom: '1px solid var(--border)',
                      background:
                        hoveredSkill === skill.name
                          ? 'rgba(99,102,241,0.06)'
                          : 'transparent',
                      height: '40px'
                    }}
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    {skill.isCore && (
                      <div
                        className="w-1.5 h-1.5 rounded-full transition-all duration-200"
                        style={{
                          background: 'var(--primary)',
                          boxShadow:
                            hoveredSkill === skill.name
                              ? '0 0 8px var(--primary)'
                              : 'none'
                        }}
                      />
                    )}
                    <span
                      className="text-[13px] transition-colors duration-200"
                      style={{
                        fontFamily: 'var(--font-body)',
                        color:
                          hoveredSkill === skill.name || skill.isCore
                            ? 'var(--text-primary)'
                            : 'var(--text-muted)',
                        fontWeight: skill.isCore ? 500 : 400
                      }}
                    >
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
