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
      style={{ background: 'rgba(10, 10, 15, 0.72)' }}
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
                I'm a student building systems.
              </h2>
              <p
                className="text-[24px] font-light"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--text-secondary)' }}
              >
                Learning to build clean, reliable software through projects and practice.
              </p>
            </div>

            {/* Paragraphs */}
            <div className="flex flex-col gap-4">
              <p
                className="text-[14px] font-light leading-[1.9]"
                style={{ fontFamily: 'var(--font-body)', color: 'var(--text-secondary)' }}
              >
                I'm a B.Tech student at <span className="font-medium" style={{ color: 'var(--text-primary)' }}>Parul University</span> with a solid foundation in Java and Spring Boot. I've solved 600+ DSA problems across major platforms and enjoy building backend systems and scalable services.
              </p>

              <div className="text-[14px] font-light leading-[1.9]" style={{ fontFamily: 'var(--font-body)', color: 'var(--text-secondary)' }}>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Finalist in Parul University Hackathon, selected from a pool of 2,000+ participants.</li>
                  <li>Selected for the State-Level Regional at OpenAI Academy × NxtWave × IndiaAI Hackathon.</li>
                  <li>Selected as one of 100 students university-wide for the ServiceNow CSA & CAD training program.</li>
                  <li>Selected in GSSoC 2026 for Open Source & AI Agent track.</li>
                </ul>
              </div>

              <p
                className="text-[14px] font-light leading-[1.9]"
                style={{ fontFamily: 'var(--font-body)', color: 'var(--text-secondary)' }}
              >
                I'm open to full-time roles, internship opportunities, and <span className="font-medium" style={{ color: 'var(--text-primary)' }}>freelance projects</span>. Looking to build with teams that value distributed systems, clean architecture, and production-grade quality.
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
                  value="600+"
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

            {/* Open to Opportunities */}
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
                  Status
                </span>
                <span
                  className="text-[32px] font-bold"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--highlight)' }}
                >
                  Available
                </span>
              </div>

              {/* Active Indicator */}
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span
                  className="text-[11px]"
                  style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}
                >
                  Open for full-time, internship, freelance
                </span>
              </div>
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
