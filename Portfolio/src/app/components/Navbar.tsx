import { useState, useEffect } from 'react';
import { MagneticButton } from './MagneticButton';
import { trackEvent } from '../utils/analytics';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Work', href: '#work' },
    { label: 'Stack', href: '#stack' },
    { label: 'Activity', href: '#github' },
    { label: 'Certifications', href: '#achievements' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: 'rgba(10,10,15,0.8)',
        backdropFilter: 'blur(16px)',
        borderBottom: `1px solid rgba(255,255,255,${scrolled ? '0.12' : '0.06'})`,
        height: '64px'
      }}
    >
      <div className="max-w-[1440px] mx-auto px-8 h-full flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-4">
          <span
            className="text-[14px] tracking-[0.2em]"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--primary)' }}
          >
            A.S
          </span>
          <span
            className="text-[14px] font-medium"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--text-secondary)' }}
          >
            Animesh Sharma
          </span>
        </div>

        {/* Center: Nav Links */}
        <div className="flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="group relative text-[13px] transition-colors"
              style={{ fontFamily: 'var(--font-body)', color: 'var(--text-secondary)' }}
            >
              <span className="group-hover:text-[var(--primary)] transition-colors">
                {link.label}
              </span>
              <span
                className="absolute -bottom-1 left-0 h-[1px] bg-[var(--primary)] w-0 group-hover:w-full transition-all duration-300"
              />
            </a>
          ))}
        </div>

        {/* Right: Open to Work + Download CV */}
        <div className="flex items-center gap-4">
          <div
            className="flex items-center gap-2 px-3 py-1.5"
            style={{
              border: '1px solid rgba(0,255,100,0.2)',
              background: 'rgba(0,255,100,0.06)',
              borderRadius: '999px'
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span className="text-[12px] font-medium" style={{ fontFamily: 'var(--font-body)' }}>
              Open to Work
            </span>
          </div>

          <MagneticButton
            href="/Animesh_Sharma_Resume.pdf"
            onClick={() => trackEvent('resume_download_click', { location: 'navbar' })}
            className="px-4 py-2 text-[13px] font-medium transition-all hover:bg-[rgba(255,255,255,0.04)]"
            style={{
              fontFamily: 'var(--font-body)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: 'var(--text-primary)'
            }}
          >
            Download Resume
          </MagneticButton>
        </div>
      </div>
    </nav>
  );
}
