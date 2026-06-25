// import { useEffect } from 'react';
import useReveal from '../components/useReveal';
import './About.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const services = [
  {
    icon: 'fa-solid fa-code',
    title: 'Full-Stack Web Development',
    desc: 'Specialized in building complete MERN stack applications (MongoDB, Express, React, Node.js) with secure authentication (JWT, bcrypt), RESTful APIs, and seamless deployment. Experienced in delivering production-ready web solutions from concept to deployment.',
  },
  {
    icon: 'fa-solid fa-palette',
    title: 'Modern Frontend Development',
    desc: 'Expert in creating responsive, high-performance user interfaces using React.js, Tailwind CSS, and modern JavaScript. Proven track record of transforming legacy designs into clean, mobile-optimized, and visually appealing web experiences.',
  },
  {
    icon: 'fa-solid fa-server',
    title: 'Backend & Database Solutions',
    desc: 'Developing robust backend systems with Node.js, Express.js, Supabase, and MongoDB. Skilled in building secure APIs, implementing authentication flows, and managing data operations to ensure scalable and efficient applications.',
  },
];

export default function About() {
  useReveal();
//  useEffect(() => {
//     AOS.init({
//       duration: 1000,
//       once: true,
//     });
//   }, []);
  return (
    <section className="about-section" id="about">
      {/* Animated green blob gradient background */}
      <div className="about-bg" aria-hidden="true">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
        <div className="blob blob-4"></div>
        <div className="grid-overlay"></div>
      </div>

      <div className="about-check-deco" aria-hidden="true"></div>

     <h2 className="section-title reveal" data-aos="fade-up">
  My <span>Services</span>
</h2>

      <div className="services-grid">
       {services.map((s, index) => (
  <div
    key={s.title}
    className="service-card reveal"
    data-aos="fade-up"
    data-aos-delay={index * 150}
  >
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