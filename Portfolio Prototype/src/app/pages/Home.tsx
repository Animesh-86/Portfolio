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

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
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
