import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useLayoutEffect } from 'react';
import Home from './pages/Home';
import ProjectCaseStudy from './pages/ProjectCaseStudy';
import Certifications from './pages/Certifications';
import { FloatingBuddy } from './components/FloatingBuddy';
import { Toaster } from 'sonner';

function resetScrollPosition() {
  const root = document.documentElement;
  const previousScrollBehavior = root.style.scrollBehavior;
  root.style.scrollBehavior = 'auto';
  window.scrollTo(0, 0);
  root.scrollTop = 0;
  document.body.scrollTop = 0;
  root.style.scrollBehavior = previousScrollBehavior;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    requestAnimationFrame(resetScrollPosition);
  }, [pathname]);
  return null;
}

export default function App() {
  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      const { scrollRestoration } = window.history;
      window.history.scrollRestoration = 'manual';
      return () => {
        window.history.scrollRestoration = scrollRestoration;
      };
    }
    return undefined;
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectCaseStudy />} />
        <Route path="/certifications" element={<Certifications />} />
      </Routes>
      <FloatingBuddy />
      <Toaster position="top-center" expand={false} richColors />
    </Router>
  );
}