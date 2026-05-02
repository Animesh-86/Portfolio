import { useState, useEffect } from 'react';

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  const roles = [
    'Backend Engineer.',
    'System Designer.',
    'Building for FAANG.',
    'Distributed Systems.'
  ];

  useEffect(() => {
    const roleInterval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => {
      clearInterval(roleInterval);
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <section className="min-h-screen flex items-center pt-16" style={{ background: 'var(--background)' }}>
      <div className="max-w-[1440px] mx-auto px-8 w-full">
        <div className="grid grid-cols-[55%_45%] gap-12 items-center">
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            {/* Eyebrow */}
            <div
              className="text-[11px] tracking-[0.25em] uppercase"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--primary)' }}
            >
              SYSTEMS ENGINEER · PARUL UNIVERSITY · 2026
            </div>

            {/* Name */}
            <div style={{ fontFamily: 'var(--font-display)' }}>
              <h1 className="text-[96px] font-bold leading-[0.95]" style={{ color: 'var(--text-primary)' }}>
                Animesh
              </h1>
              <h1 className="text-[96px] font-bold leading-[0.95]" style={{ color: 'var(--text-primary)' }}>
                Sharma<span style={{ color: 'var(--primary)' }}>.</span>
              </h1>
            </div>

            {/* Animated Role Text */}
            <div className="h-8 flex items-center">
              <p
                className="text-[20px] font-light transition-opacity duration-500"
                style={{
                  fontFamily: 'var(--font-body)',
                  color: 'var(--text-secondary)'
                }}
              >
                {roles[roleIndex]}
                <span className={`inline-block w-[2px] h-5 ml-1 bg-[var(--primary)] ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`} />
              </p>
            </div>

            {/* Description */}
            <p
              className="text-[15px] font-light max-w-[440px]"
              style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--text-secondary)',
                lineHeight: '1.8'
              }}
            >
              I build distributed backends, real-time platforms, and event-driven systems. Available for full-time roles, contract work, and freelance projects.
            </p>

            {/* CTA Buttons */}
            <div className="flex items-center gap-4 mt-2">
              <button
                className="px-6 py-3 text-[14px] font-medium transition-all hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] group"
                style={{
                  fontFamily: 'var(--font-body)',
                  background: 'var(--primary)',
                  color: '#ffffff'
                }}
              >
                <span className="flex items-center gap-2">
                  View Work
                  <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </span>
              </button>

              <button
                className="px-6 py-3 text-[14px] font-medium transition-all hover:bg-[rgba(255,255,255,0.04)]"
                style={{
                  fontFamily: 'var(--font-body)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: 'var(--text-primary)'
                }}
              >
                Get in Touch
              </button>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-6 mt-2">
              {['GitHub', 'LinkedIn', 'Email'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-[13px] transition-all hover:-translate-y-1 hover:text-[var(--primary)]"
                  style={{ fontFamily: 'var(--font-body)', color: 'var(--text-secondary)' }}
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Right Column - Code Card */}
          <div className="relative">
            <div
              className="p-6"
              style={{
                background: 'var(--surface)',
                border: `1px solid var(--border)`,
                borderRadius: '12px',
                boxShadow: `0 0 40px var(--primary-glow)`
              }}
            >
              {/* Terminal Header */}
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[var(--border)]">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span
                  className="text-[11px] ml-2"
                  style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}
                >
                  backend/magic.java
                </span>
              </div>

              {/* Code Block */}
              <pre
                className="text-[13px] leading-relaxed"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                <code>
                  <span style={{ color: 'var(--primary)' }}>@Service</span>
                  {'\n'}<span style={{ color: 'var(--text-secondary)' }}>public class</span> <span style={{ color: 'var(--text-primary)' }}>MyService</span> {'{\n'}
                  {'\n'}  <span style={{ color: 'var(--text-secondary)' }}>public void</span> <span style={{ color: 'var(--text-primary)' }}>doMagic</span>(<span style={{ color: 'var(--text-primary)' }}>String input</span>) {'{'}
                  {'\n'}    <span style={{ color: 'var(--text-muted)' }}>// Hope nobody calls this in prod</span>
                  {'\n'}    <span style={{ color: 'var(--secondary)' }}>@RedisCache</span>(key = <span style={{ color: 'var(--highlight)' }}>"pray-it-works"</span>)
                  {'\n'}    cache.update(input);
                  {'\n'}
                  {'\n'}    <span style={{ color: 'var(--text-muted)' }}>// It's not a bug, it's a feature</span>
                  {'\n'}    logger.info(<span style={{ color: 'var(--highlight)' }}>"Success? Maybe 🤞"</span>);
                  {'\n'}  {'}'}
                  {'\n'}
                  {'\n'}  <span style={{ color: 'var(--text-secondary)' }}>private</span> <span style={{ color: 'var(--text-primary)' }}>Cache cache</span>;
                  {'\n'}  <span style={{ color: 'var(--text-secondary)' }}>private</span> <span style={{ color: 'var(--text-primary)' }}>Logger logger</span>;
                  {'\n'}<span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}>{'|'}</span>
                  {'\n'}{'}'}
                </code>
              </pre>
            </div>

            {/* Floating Badges */}
            <div
              className="absolute -bottom-4 -right-4 px-3 py-2 flex items-center gap-2"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '6px'
              }}
            >
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                1,000+ events/min
              </span>
            </div>

            <div
              className="absolute -top-4 -left-4 px-3 py-2 flex items-center gap-2"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '6px'
              }}
            >
              <span className="text-[10px]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                Redis · Spring Boot · Cache Magic
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Marquee */}
        <div className="mt-24 pt-12" style={{ borderTop: '1px solid var(--border)' }}>
          <div className="overflow-hidden">
            <div className="flex gap-8 animate-marquee whitespace-nowrap">
              {['Spring Boot', 'Redis', 'WebRTC', 'Flutter', 'Docker', 'AWS', 'PostgreSQL', 'React', 'TypeScript', 'gRPC', 'Spring Boot', 'Redis', 'WebRTC', 'Flutter', 'Docker', 'AWS'].map((tech, i) => (
                <span
                  key={i}
                  className="text-[11px]"
                  style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}
                >
                  {tech} <span style={{ color: 'var(--primary)' }}>·</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  );
}
