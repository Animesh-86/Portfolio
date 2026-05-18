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
  const { pathname, hash } = useLocation();
  useLayoutEffect(() => {
    const shouldReturnToWork = sessionStorage.getItem('return_to_work');
    // Skip scroll-to-top if we're navigating to a section or returning from a project
    if (!hash && !shouldReturnToWork) {
      requestAnimationFrame(resetScrollPosition);
    }
  }, [pathname, hash]);
  return null;
}

const getBasename = () => {
  const path = window.location.pathname;
  if (path.toLowerCase().startsWith('/portfolio')) {
    return path.substring(0, 10);
  }
  return '/';
};

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
    <Router basename={getBasename()}>
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