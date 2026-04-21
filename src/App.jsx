import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Particles from './components/Particles';
import BackToTop from './components/BackToTop';
import { ToastProvider } from './components/Toast';
import Home from './pages/Home';
import About from './pages/About';
import Resume from './pages/Resume';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Contact from './pages/Contact';

export default function App() {
  const [isLight, setIsLight] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.body.classList.toggle('light-mode', isLight);
  }, [isLight]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const toggleTheme = () => setIsLight((v) => !v);

  return (
    <ToastProvider>
      <Particles />
      <Header isLight={isLight} toggleTheme={toggleTheme} />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
      <BackToTop />
    </ToastProvider>
  );
}