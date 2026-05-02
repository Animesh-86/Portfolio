import { useState, useEffect, useRef } from 'react';

export function About() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-32 relative"
      style={{ background: 'var(--background)' }}
    >
      <div className="max-w-[1440px] mx-auto px-8">
        {/* Section Number Watermark */}
        <div
          className="absolute left-8 top-32 text-[200px] font-bold opacity-[0.03] pointer-events-none select-none"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          01
        </div>

        {/* Section Tag */}
        <div
          className="text-[10px] mb-12 tracking-[0.2em]"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--primary)' }}
        >
          // About me
        </div>

        <div className="grid grid-cols-[55%_45%] gap-16 relative z-10">
          {/* Left Column */}
          <div className="flex flex-col gap-8">
            {/* Pull Quote */}
            <div>
              <h2
                className="text-[42px] font-medium leading-[1.05] mb-4"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
              >
                I don't write code. I design systems.
              </h2>
              <p
                className="text-[24px] font-light"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--text-secondary)' }}
              >
                Systems that scale, fail gracefully, and survive production.
              </p>
            </div>

            {/* Paragraphs */}
            <div className="flex flex-col gap-4">
              <p
                className="text-[14px] font-light leading-[1.9]"
                style={{ fontFamily: 'var(--font-body)', color: 'var(--text-secondary)' }}
              >
                I'm a final-year CSE student at Parul University, graduating in June 2026. I specialize in backend systems engineering, with hands-on experience building <span className="font-medium" style={{ color: 'var(--text-primary)' }}>Spring Boot</span> microservices, <span className="font-medium" style={{ color: 'var(--text-primary)' }}>Apache Kafka</span> event streaming platforms, and <span className="font-medium" style={{ color: 'var(--text-primary)' }}>Redis digital twin</span> architectures.
              </p>
              <p
                className="text-[14px] font-light leading-[1.9]"
                style={{ fontFamily: 'var(--font-body)', color: 'var(--text-secondary)' }}
              >
                My work ranges from real-time collaborative platforms to EV fleet telemetry systems processing 1000+ events per minute. I've built production systems that handle concurrent users, distributed state, and event-driven workflows.
              </p>
              <p
                className="text-[14px] font-light leading-[1.9]"
                style={{ fontFamily: 'var(--font-body)', color: 'var(--text-secondary)' }}
              >
                I'm targeting roles at <span className="font-medium" style={{ color: 'var(--text-primary)' }}>Google/Meta/Amazon</span> and similar organizations, with a placement target of 50+ LPA. Campus placements begin <span className="font-medium" style={{ color: 'var(--text-primary)' }}>June 2026</span>, but I'm open to pre-placement opportunities now.
              </p>
            </div>
          </div>

          {/* Right Column - Stats Grid */}
          <div className="flex flex-col gap-4">
            {/* 2x2 Bento Grid */}
            <div className="grid grid-cols-2 gap-4">
              <StatCard
                value="10+"
                label="Certificates & Badges"
                color="var(--primary)"
                inView={inView}
                delay={0}
              />
              <StatCard
                value="Top 100"
                label="ServiceNow CSA/CAD · University Rank"
                color="var(--secondary)"
                inView={inView}
                delay={100}
                smaller
              />
              <StatCard
                value="400+"
                label="DSA Problems Solved"
                color="var(--highlight)"
                inView={inView}
                delay={200}
              />
              <StatCard
                value="06+"
                label="Hands-on Domains"
                color="var(--primary)"
                inView={inView}
                delay={300}
                smaller
              />
            </div>

            {/* Placement Target Card */}
            <div
              className="p-6 flex flex-col gap-4"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)'
              }}
            >
              <div className="flex items-end justify-between">
                <span
                  className="text-[12px] tracking-[0.15em] uppercase"
                  style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}
                >
                  Placement Target
                </span>
                <span
                  className="text-[32px] font-bold"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--highlight)' }}
                >
                  50+ LPA
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <div
                  className="h-full transition-all duration-1000"
                  style={{
                    width: inView ? '30%' : '0%',
                    background: 'var(--highlight)'
                  }}
                />
              </div>

              <span
                className="text-[11px]"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}
              >
                Target: June 2026
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({
  value,
  label,
  color,
  inView,
  delay,
  smaller = false
}: {
  value: string;
  label: string;
  color: string;
  inView: boolean;
  delay: number;
  smaller?: boolean;
}) {
  return (
    <div
      className="p-6 flex flex-col gap-2 transition-all duration-500"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        transitionDelay: `${delay}ms`,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)'
      }}
    >
      <div
        className={smaller ? 'text-[42px]' : 'text-[56px]'}
        style={{ fontFamily: 'var(--font-display)', fontWeight: 'bold', color }}
      >
        {value}
      </div>
      <div
        className="text-[9px] uppercase tracking-wide"
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}
      >
        {label}
      </div>
    </div>
  );
}
