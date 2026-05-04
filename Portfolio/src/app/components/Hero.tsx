import { useState, useEffect } from 'react';
import { PatternRevealGrid } from './PatternRevealGrid';
import { MagneticButton } from './MagneticButton';

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  const roles = [
    'Full Stack Developer.',
    'AI/ML Enthusiast.',
    'Backend Developer.',
    'Open Source Contributor.'
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
    <section className="min-h-screen flex items-center pt-16" style={{ background: 'rgba(10, 10, 15, 0.72)' }}>
      <div className="max-w-[1440px] mx-auto px-8 w-full">
        <div className="grid grid-cols-[55%_45%] gap-12 items-center">
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            {/* Eyebrow */}
            <div
              className="text-[11px] tracking-[0.25em] uppercase"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--primary)' }}
            >
              FULL STACK DEVELOPER · AI/ML ENTHUSIAST
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
              I build distributed backends, real-time platforms, and event-driven systems. Available for full-time roles, internships, and freelance projects.
            </p>

            {/* CTA Buttons */}
            <div className="flex items-center gap-4 mt-2">
              <MagneticButton
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
              </MagneticButton>

              <MagneticButton
                className="px-6 py-3 text-[14px] font-medium transition-all hover:bg-[rgba(255,255,255,0.04)]"
                style={{
                  fontFamily: 'var(--font-body)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: 'var(--text-primary)'
                }}
              >
                Get in Touch
              </MagneticButton>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-6 mt-2">
              {[
                { name: 'GitHub', href: 'https://github.com/Animesh-86' },
                { name: 'LinkedIn', href: 'https://www.linkedin.com/in/animesh-sharma-adev' },
                { name: 'Email', href: 'mailto:animesh8sharma@gmail.com' }
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target={social.name !== 'Email' ? '_blank' : undefined}
                  rel={social.name !== 'Email' ? 'noopener noreferrer' : undefined}
                  className="text-[13px] transition-all hover:-translate-y-1 hover:text-[var(--primary)]"
                  style={{ fontFamily: 'var(--font-body)', color: 'var(--text-secondary)' }}
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>

          {/* Right Column - Pattern Reveal Card */}
          <div className="relative h-[480px]">
            <div
              className="absolute inset-0 overflow-hidden"
              style={{
                background: 'var(--surface)',
                border: `1px solid var(--border)`,
                borderRadius: '24px',
                boxShadow: `0 0 40px var(--primary-glow)`
              }}
            >
              <PatternRevealGrid />
              
              {/* Overlay Gradient for depth */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-var(--background) via-transparent to-transparent opacity-40" />
            </div>

            {/* Floating Badges */}
            <div
              className="absolute -bottom-6 -right-6 px-4 py-3 flex items-center gap-3 backdrop-blur-md"
              style={{
                background: 'rgba(24, 24, 31, 0.8)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
              }}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
              <div className="flex flex-col">
                <span className="text-[13px] font-medium text-[var(--text-primary)] font-display">1,000+ events/min</span>
                <span className="text-[9px] text-[var(--text-muted)] uppercase tracking-widest font-mono">Real-time Processing</span>
              </div>
            </div>

            <div
              className="absolute -top-6 -left-6 px-4 py-3 flex items-center gap-3 backdrop-blur-md"
              style={{
                background: 'rgba(24, 24, 31, 0.8)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
              }}
            >
              <span className="text-[11px] font-medium text-[var(--text-secondary)] font-mono tracking-tight">
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
