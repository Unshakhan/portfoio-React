import { useState, useEffect } from 'react';
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
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function App() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('light-mode', isLight);
  }, [isLight]);
useEffect(() => {
  AOS.init({
    duration: 1000,
    once: true,
  });
}, []);
  const toggleTheme = () => setIsLight((v) => !v);

  return (
    <ToastProvider>
      <Particles />
      <Header isLight={isLight} toggleTheme={toggleTheme} />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Home />
        <About />
        <Skills />
        <Resume />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </ToastProvider>
  );
}