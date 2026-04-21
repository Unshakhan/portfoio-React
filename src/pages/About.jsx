import useReveal from '../components/useReveal';
import './About.css'; // create this file with the CSS below

const services = [
  {
    icon: 'fa-solid fa-code',
    title: 'Web Development',
    desc: 'Building responsive, modern web applications using HTML, CSS, JavaScript, React, Bootstrap, and Node.js. I craft clean, performant, and accessible interfaces.',
  },
  {
    icon: 'fa-solid fa-palette',
    title: 'Graphic Designing',
    desc: 'Creative visual design using Adobe Photoshop and Illustrator. I design UI mockups, social media graphics, and brand assets that communicate clearly.',
  },
  {
    icon: 'fa-solid fa-server',
    title: 'Backend Basics',
    desc: 'Currently learning Express.js and Node.js to build REST APIs and server-side logic. Comfortable using Postman for API testing and documentation.',
  },
];

export default function About() {
  useReveal();

  return (
    <section className="about-section">
      {/* Animated green blob gradient background */}
      <div className="about-bg" aria-hidden="true">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
        <div className="blob blob-4"></div>
        <div className="grid-overlay"></div>
      </div>

      <div className="about-check-deco" aria-hidden="true"></div>

      <h2 className="section-title reveal">
        My <span>Services</span>
      </h2>

      <div className="services-grid">
        {services.map((s) => (
          <div key={s.title} className="service-card reveal">
            <div className="service-icon">
              <i className={s.icon}></i>
            </div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
