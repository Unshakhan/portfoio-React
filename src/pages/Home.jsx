import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useReveal from '../components/useReveal';

const roles = ['Frontend Developer', 'React Developer', 'UI Designer', 'Creative Learner'];

const CODE_SYMBOLS = [
  '{', '}', '?', ']', '(', ')', '<', '>', '/', '*',
  '=', '+', '-', ';', ':', '&', '|', '%', '$', '#', '@',
];

function useTyping() {
  const [text, setText] = useState('');
  const [roleIdx, setRoleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIdx];
    let timeout;
    if (!deleting) {
      timeout = setTimeout(() => {
        setText(current.substring(0, charIdx + 1));
        if (charIdx + 1 === current.length) {
          setTimeout(() => setDeleting(true), 1600);
        } else {
          setCharIdx((c) => c + 1);
        }
      }, 100);
    } else {
      timeout = setTimeout(() => {
        setText(current.substring(0, charIdx - 1));
        if (charIdx - 1 === 0) {
          setDeleting(false);
          setRoleIdx((r) => (r + 1) % roles.length);
          setCharIdx(0);
        } else {
          setCharIdx((c) => c - 1);
        }
      }, 60);
    }
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, roleIdx]);

  return text;
}

// Floating particles — generated once on mount
function FloatingParticles() {
  const particles = useRef(
    Array.from({ length: 50 }, (_, i) => ({
  id: i,
  symbol: CODE_SYMBOLS[Math.floor(Math.random() * CODE_SYMBOLS.length)],
  left: Math.random() * 100,
  delay: Math.random() * 12,
  duration: 8 + Math.random() * 10,
  direction: Math.random() > 0.5 ? 'up' : 'down', // 👈 NEW
}))
  );

  return (
    <>
      <style>{`
       .hero-particle {
  position: absolute;
  font-family: var(--font-mono, 'Space Mono', monospace);
  font-size: 1.1rem;
  color: var(--accent);
  opacity: 0;
  pointer-events: none;
  user-select: none;
  filter: drop-shadow(0 0 6px var(--accent));
}

/* Bottom → Top */
.hero-particle.up {
  animation: floatUp linear infinite;
}

/* Top → Bottom */
.hero-particle.down {
  animation: floatDown linear infinite;
}

@keyframes floatUp {
  0% {
    transform: translateY(100vh) translateX(0) rotate(0deg);
    opacity: 0;
  }
  10%, 90% {
    opacity: 0.2;
  }
  50% {
    transform: translateY(-200px) translateX(40px) rotate(180deg);
    opacity: 0.35;
  }
  100% {
    transform: translateY(-320px) translateX(-40px) rotate(360deg);
    opacity: 0;
  }
}

@keyframes floatDown {
  0% {
    transform: translateY(-100px) translateX(0) rotate(0deg);
    opacity: 0;
  }
  10%, 90% {
    opacity: 0.2;
  }
  50% {
    transform: translateY(50vh) translateX(-40px) rotate(180deg);
    opacity: 0.35;
  }
  100% {
    transform: translateY(110vh) translateX(40px) rotate(360deg);
    opacity: 0;
  }
}
      `}</style>
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        {particles.current.map((p) => (
          <span
            key={p.id}
            className={`hero-particle ${p.direction}`}
style={{
  left: `${p.left}%`,
  animationDelay: `${p.delay}s`,
  animationDuration: `${p.duration}s`,
}}
          >
            {p.symbol}
          </span>
        ))}
      </div>
    </>
  );
}

// Skill badges data
const badges = [
  {
    icon: 'fa-brands fa-react',
    label: 'React',
    libs: 'Hooks, Router, Redux',
    style: { top: '2%', right: '-18%' },
    delay: '0s',
  },
  {
    icon: 'fa-brands fa-js',
    label: 'JavaScript',
    libs: 'ES6+, DOM, APIs',
    style: { bottom: '18%', right: '-22%' },
    delay: '1s',
  },
  {
    icon: 'fa-brands fa-css3-alt',
    label: 'CSS & Design',
    libs: 'Flexbox, Grid, GSAP',
    style: { top: '42%', left: '-24%' },
    delay: '2s',
  },
];

export default function Home() {
  useReveal();
  const typedText = useTyping();
  const navigate = useNavigate();

  const goTo = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    // Wrap in a relative container so particles are scoped to hero section
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Floating code symbols background animation */}
      <FloatingParticles />

      <div className="hero-section" style={{ position: 'relative', zIndex: 1 }}>
        <div className="hero-content reveal">
          <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            <span>Available for Opportunities</span>
          </div>
          <h1 className="hero-name">
            Unsha
            <br />
            Sattar
          </h1>
          <div className="hero-role">
            <span style={{ color: 'var(--text2)' }}>I am a</span>
            <span className="typing-wrap">{typedText}</span>
          </div>
          <p className="hero-desc">
            Hi, I&apos;m <b>Unsha Sattar</b>, a passionate{' '}
            <b>Frontend Developer</b> skilled in <b>HTML</b>, <b>CSS</b>,{' '}
            <b>JavaScript</b>, and <b>React</b>. I blend creativity with code and
            also use <b>Photoshop</b> and <b>Illustrator</b> to design modern,
            responsive websites.
          </p>
          <div className="cta-row">
            <button
              className="btn-glow btn-primary"
              onClick={() => goTo('/projects')}
            >
              <i className="fa-solid fa-code"></i> View Projects
            </button>
            <button
              className="btn-glow btn-outline"
              onClick={() => goTo('/contact')}
            >
              <i className="fa-solid fa-paper-plane"></i> Contact Me
            </button>
          </div>
          <div className="socials">
            <a href="https://github.com/Unshakhan" title="GitHub">
              <i className="fa-brands fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/feed/" title="LinkedIn">
              <i className="fa-brands fa-linkedin"></i>
            </a>
            <a href="#" title="Twitter">
              <i className="fa-brands fa-twitter"></i>
            </a>
          </div>
        </div>

        {/* Profile + Badges */}
        <div className="profile-wrap reveal">
          {/* Rotating rings */}
          <div className="profile-ring"></div>
          <div className="profile-ring r2"></div>

          {/* Pulse rings */}
          <div style={{ position: 'absolute', inset: 0 }}>
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="pulse-ring-item"
                style={{ animationDelay: `${i}s` }}
              ></span>
            ))}
          </div>

          {/* Code logo */}
          <div className="profile-img-wrap profile-code-logo">
            <span className="code-logo-text">&lt;/&gt;</span>
          </div>

          {/* Floating skill badges */}
          {badges.map((badge) => (
            <div
              key={badge.label}
              className="skill-float-badge"
              style={{ ...badge.style, animationDelay: badge.delay }}
            >
              <i className={badge.icon}></i>
              <div className="skill-float-info">
                <span className="skill-float-title">{badge.label}</span>
                <span className="skill-float-libs">{badge.libs}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}