import { useState } from 'react';
import useReveal from '../components/useReveal';

const tabs = [
  { key: 'experience', icon: 'fa-solid fa-briefcase', label: 'Experience' },
  { key: 'education', icon: 'fa-solid fa-graduation-cap', label: 'Education' },
  { key: 'skillsTab', icon: 'fa-solid fa-star', label: 'Skills' },
  { key: 'aboutme', icon: 'fa-solid fa-user', label: 'About Me' },
];

const tabContent = {
  experience: {
    title: <>My <span>Experience</span></>,
    items: [
      {
        title: 'Digital Product Development Intern',
        meta: 'Innvelous Tech | Apr 2026 – May 2026',
        desc: 'Co-developed a full-stack Attendance Management Portal using React.js and Tailwind CSS in an Agile environment. Integrated APIs with Axios and Postman, and engineered responsive teacher timetable interfaces.',
      },
      {
        title: 'Frontend Developer Intern (Remote)',
        meta: 'Digitech Offerings | Oct 2025 – Dec 2025',
        desc: 'Built production-ready single-page applications using React.js and React Router. Modernized legacy CSS into utility-first Tailwind CSS, significantly improving mobile experience and UI/UX workflows.',
      },
    ],
  },
  education: {
    title: <>My <span>Education</span></>,
    items: [
      {
        title: 'Diploma in Web & App Development',
        meta: 'SMIT - Saylani Mass IT Training | 2024 – Present',
        desc: 'Intensive training in modern web technologies including HTML5, CSS3, JavaScript, React.js, Node.js, Express.js, MongoDB, and professional development tools like Git and Postman.',
      },
      {
        title: 'BS Botany',
        meta: 'Federal Urdu University | 2019 – 2022 | CGPA: 3.7',
        desc: 'Developed strong analytical, research, and problem-solving skills. Transitioned passion for technology into professional web development career.',
      },
    ],
  },
  skillsTab: {
    title: <>My <span>Skills</span></>,
    items: [
      {
        title: 'Frontend Technologies',
        meta: 'Advanced',
        desc: 'HTML5, CSS3, JavaScript (ES6+), React.js, Redux, React Router, Tailwind CSS, Bootstrap, Responsive Design',
      },
      {
        title: 'Backend & Database',
        meta: 'Intermediate',
        desc: 'Node.js, Express.js, MongoDB, Supabase, RESTful APIs, JWT Authentication, bcrypt',
      },
      {
        title: 'Tools & Others',
        meta: 'Proficient',
        desc: 'Git & GitHub, Postman, Axios, Figma, Agile/Scrum, Cloudinary, Vercel, Netlify',
      },
    ],
  },
  aboutme: {
    title: <>About <span>Me</span></>,
    items: [
      {
        title: 'Who Am I?',
        meta: 'Full-Stack Developer (MERN Stack)',
        desc: "Result-driven Full-Stack Developer specializing in the MERN stack and Supabase. Passionate about building secure, scalable, and user-centric web applications with clean code and modern technologies.",
      },
      {
        title: 'My Goals',
        meta: 'Career Objective',
        desc: 'To secure a challenging Full-Stack Developer role where I can contribute my technical expertise, deliver high-quality solutions, and continue growing in a dynamic development environment.',
      },
    ],
  },
};

export default function Resume() {
  const [activeTab, setActiveTab] = useState('experience');
  useReveal();

  const content = tabContent[activeTab];

  return (
    <section className="resume-section">
      {/* 🟢 Layer 1: Animated blob gradient background (sabse peeche) */}
      <div className="resume-bg" aria-hidden="true">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
        <div className="blob blob-4"></div>
        <div className="grid-overlay"></div>
      </div>

      {/* 📄 Layer 2: Resume content */}
      <h2 className="section-title reveal">
        Why <span>Hire Me?</span>
      </h2>

      <div className="resume-grid">
        <div className="resume-sidebar reveal">
          <h2>About</h2>
          <span>Me</span>
          <p>
            Dedicated, detail-oriented, and always eager to learn new
            technologies. I combine creativity with clean coding to deliver
            quality work and continuously grow.
          </p>
          <div className="resume-tabs">
            {tabs.map((t) => (
              <button
                key={t.key}
                className={`tab-btn${activeTab === t.key ? ' active' : ''}`}
                onClick={() => setActiveTab(t.key)}
              >
                <i className={t.icon}></i> {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="reveal">
          <div className="tab-content active">
            <h3>{content.title}</h3>
            {content.items.map((item) => (
              <div key={item.title} className="timeline-item">
                <h4>{item.title}</h4>
                <div className="meta">{item.meta}</div>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}