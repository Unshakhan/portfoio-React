import { useState } from 'react';
import useReveal from '../components/useReveal';
import projectsData from '../data/projects';
import './Projects.css'; // ← yeh file banayein (neeche CSS hai)

export default function Projects() {
  const [liked, setLiked] = useState({});
  useReveal();

  const toggleLike = (id) => {
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="projects-section">
      {/* 🟢 Layer 1: Animated blob gradient background */}
      <div className="projects-bg" aria-hidden="true">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
        <div className="blob blob-4"></div>
        <div className="grid-overlay"></div>
      </div>

      {/* 🫧 Bubbles global #particles se aayengi (peeche se) */}

      {/* 📄 Content */}
      <h2 className="section-title reveal">
        Latest <span>Projects</span>
      </h2>
      <div className="projects-grid">
        {projectsData.map((p) => (
          <div key={p.id} className="project-card reveal">
            <a href={p.link} target="_blank" rel="noopener noreferrer">
              <img
                className="project-img"
                src={p.img}
                alt={p.title}
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/300x180/111c2d/39ff9f?text=${encodeURIComponent(p.title)}`;
                }}
              />
            </a>
            <div className="project-body">
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--text)', marginBottom: '8px' }}>
                {p.title}
              </h4>
              <p>{p.desc}</p>
              <div className="project-footer">
                <div className="tech-tags">
                  {p.tags.map((tag) => (
                    <span key={tag} className="tech-tag">{tag}</span>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <button
                    className={`heart-btn${liked[p.id] ? ' liked' : ''}`}
                    onClick={() => toggleLike(p.id)}
                    aria-label="Like"
                  >
                    <i className={liked[p.id] ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}></i>
                  </button>
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                    title="Visit"
                  >
                    <i className="fa-solid fa-arrow-up-right-from-square"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
