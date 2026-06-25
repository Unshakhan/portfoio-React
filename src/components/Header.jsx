import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';

const navLinks = [
  { label: 'Home', to: 'home' },
  { label: 'About', to: 'about' },
  { label: 'Resume', to: 'resume' },
  { label: 'Projects', to: 'projects' },
  { label: 'Skills', to: 'skills' },
  { label: 'Contact', to: 'contact' },
];

export default function Header({ isLight, toggleTheme }) {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeNav = () => setNavOpen(false);

  return (
    <header style={{ boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.3)' : 'none' }}>
      <Link
        to="home"
        smooth={true}
        duration={500}
        offset={-80}
        className="logo"
        style={{ cursor: 'pointer' }}
        onClick={closeNav}
      >
        <i className="fa-solid fa-code logo-icon"></i>
        <span className="logo-text">My Portfolio</span>
      </Link>

      <button
        className="hamburger"
        aria-label="Menu"
        onClick={() => setNavOpen((v) => !v)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav className={navOpen ? 'open' : ''}>
        <ul>
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                smooth={true}
                duration={500}
                offset={-80}
                spy={true}
                activeClass="active-link"
                onClick={closeNav}
                style={{ cursor: 'pointer' }}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <button className="theme-toggle-btn" onClick={toggleTheme}>
              <i className={`fa-solid ${isLight ? 'fa-sun' : 'fa-moon'}`}></i>
              {isLight ? ' Light' : ' Dark'}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}