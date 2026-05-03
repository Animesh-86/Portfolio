import { AuraNightSkyBackground } from './components/AuraNightSkyBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Work } from './components/Work';
import { TechStack } from './components/TechStack';
import { GitHubHeatmap } from './components/GitHubHeatmap';
import { Achievements } from './components/Achievements';
import { Contact } from './components/Contact';

export default function App() {
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