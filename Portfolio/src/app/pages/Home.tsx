import { useEffect } from 'react';
import Lenis from 'lenis';
import { AuraNightSkyBackground } from '../components/AuraNightSkyBackground';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Work } from '../components/Work';
import { TechStack } from '../components/TechStack';
import { GitHubHeatmap } from '../components/GitHubHeatmap';
import { Achievements } from '../components/Achievements';
import { Contact } from '../components/Contact';

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    let animationFrameId = 0;

    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    // Check if we should scroll to the work section (returning from a project)
    const shouldReturnToWork = sessionStorage.getItem('return_to_work');
    if (shouldReturnToWork) {
      sessionStorage.removeItem('return_to_work');
      // Small timeout to allow Lenis to initialize and content to render
      setTimeout(() => {
        const workSection = document.getElementById('work');
        if (workSection) {
          lenis.scrollTo(workSection, { offset: -100, duration: 1.5 });
        }
      }, 100);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  return (
    <div
      className="min-h-screen relative isolate"
      style={{
        background: 'var(--background)',
        color: 'var(--text-primary)',
        fontFamily: 'var(--font-body)'
      }}
    >
      <AuraNightSkyBackground />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <Work />
        <TechStack />
        <GitHubHeatmap username="Animesh-86" />
        <Achievements />
        <Contact />
      </div>
    </div>
  );
}
