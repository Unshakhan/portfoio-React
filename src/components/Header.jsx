import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Resume', to: '/resume' },
  { label: 'Projects', to: '/projects' },
  { label: 'Skills', to: '/skills' },
  { label: 'Contact', to: '/contact' },
];

export default function Header({ isLight, toggleTheme }) {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (to) => {
    setNavOpen(false);
    navigate(to);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header style={{ boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.3)' : 'none' }}>
      <a
        href="/"
        className="logo"
        onClick={(e) => { e.preventDefault(); handleNavClick('/'); }}
      >
        <i className="fa-solid fa-code logo-icon"></i>
        <span className="logo-text">My Portfolio</span>
      </a>

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
              <NavLink
                to={link.to}
                className={({ isActive }) => (isActive ? 'active-link' : '')}
                onClick={() => handleNavClick(link.to)}
                end={link.to === '/'}
              >
                {link.label}
              </NavLink>
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