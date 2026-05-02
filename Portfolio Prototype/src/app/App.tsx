import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Work } from './components/Work';
import { TechStack } from './components/TechStack';
import { Achievements } from './components/Achievements';
import { Contact } from './components/Contact';

export default function App() {
  return (
    <div
      className="min-h-screen"
      style={{
        background: 'var(--background)',
        color: 'var(--text-primary)',
        fontFamily: 'var(--font-body)'
      }}
    >
      <Navbar />
      <Hero />
      <About />
      <Work />
      <TechStack />
      <Achievements />
      <Contact />
    </div>
  );
}