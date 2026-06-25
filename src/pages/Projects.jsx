import { useState, useEffect } from 'react';
import useReveal from '../components/useReveal';
import projectsData from '../data/projects';
import './Projects.css';

const SLIDE_INTERVAL = 4000;

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  useReveal();

  const total = projectsData.length;
  const current = projectsData[currentIndex];

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentIndex((prev) => {
        setPrevIndex(prev);
        return (prev + 1) % total;
      });
    }, SLIDE_INTERVAL);

    return () => clearInterval(id);
  }, [total]);

  return (
    <section className="projects-section" id='projects'>
      <div className="projects-bg" aria-hidden="true">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
        <div className="blob blob-4"></div>
        <div className="grid-overlay"></div>
      </div>

      <h2 className="section-title reveal">
        Latest <span>Projects</span>
      </h2>

      <div className="projects-slider reveal">
        <div className="projects-detail" key={currentIndex}>
          <span className="projects-detail-count">
            {String(currentIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          <h3 className="projects-detail-title">{current.title}</h3>
          <p className="projects-detail-desc">{current.desc}</p>
          <div className="projects-detail-tags">
            {current.tags.map((tag) => (
              <span key={tag} className="tech-tag">{tag}</span>
            ))}
          </div>
          <a href={current.link} target="_blank" rel="noopener noreferrer" className="projects-visit-link tech-tag">
            Visit Project <i className="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
        </div>

        <div className="projects-image-stage">
          {projectsData.map((p, i) => {
            let cls = 'projects-slide';
            if (i === currentIndex) cls += ' active';
            else if (i === prevIndex) cls += ' exit';

            return (
              <div key={p.id} className={cls}>
                <div className="device-mockup">

                  {/* Laptop — center */}
                  <div className="device device-laptop">
                    <div className="device-screen">
                      <img
                        src={p.img}
                        alt={p.title}
                        onError={(e) => {
                          e.target.src = `https://via.placeholder.com/560x340/111c2d/39ff9f?text=${encodeURIComponent(p.title)}`;
                        }}
                      />
                    </div>
                    <div className="device-laptop-base"></div>
                    <div className="device-shadow device-shadow-laptop"></div>
                    <div className="device-reflection device-reflection-laptop">
                      <img src={p.img} alt="" aria-hidden="true" />
                    </div>
                  </div>

                  {/* Tablet — corner, lower */}
                  <div className="device device-tablet">
                    <div className="device-screen">
                      <img src={p.img2} alt={`${p.title} tablet view`} />
                    </div>
                    <div className="device-shadow device-shadow-tablet"></div>
                    <div className="device-reflection device-reflection-tablet">
                      <img src={p.img2} alt="" aria-hidden="true" />
                    </div>
                  </div>

                  {/* Phone — corner, lower */}
                  <div className="device device-phone">
                    <div className="device-screen">
                      <img src={p.img1} alt={`${p.title} mobile view`} />
                    </div>
                    <div className="device-shadow device-shadow-phone"></div>
                    <div className="device-reflection device-reflection-phone">
                      <img src={p.img1} alt="" aria-hidden="true" />
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
          <div className="glass-shelf-line"></div>
        </div>
      </div>
    </section>
  );
}