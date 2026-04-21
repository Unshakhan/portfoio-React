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
        title: 'Frontend Developer (Learning)',
        meta: 'SMIT - Saylani Mass IT Training | 2024 - Present',
        desc: 'Developing real-world projects including clones, games, and full-stack applications as part of a professional Web and App Development diploma program.',
      },
      {
        title: 'Graphic Designer (Freelance)',
        meta: 'Self-employed | 2023 - Present',
        desc: 'Designing logos, social media posts, and UI mockups for clients using Adobe Photoshop and Illustrator.',
      },
    ],
  },
  education: {
    title: <>My <span>Education</span></>,
    items: [
      {
        title: 'Web and App Development Diploma',
        meta: 'SMIT - Saylani Mass IT Training | 2024 - Present',
        desc: 'Comprehensive diploma covering HTML, CSS, JavaScript, React, Bootstrap, Node.js, Express.js, and modern development workflows including Git and Postman.',
      },
      {
        title: 'BS Botany (Graduate)',
        meta: 'University | 2019 - 2023',
        desc: 'Completed Bachelor of Science in Botany, developing strong analytical and research skills alongside a growing passion for technology.',
      },
    ],
  },
  skillsTab: {
    title: <>My <span>Skills</span></>,
    items: [
      {
        title: 'Frontend Technologies',
        meta: 'Proficient',
        desc: 'HTML5 (95%), CSS3 (95%), JavaScript ES6+ (70%), React.js (60%), Bootstrap (90%), Tailwind CSS (65%)',
      },
      {
        title: 'Tools & Backend',
        meta: 'Intermediate / Learning',
        desc: 'Git & GitHub (85%), Netlify (95%), Adobe Photoshop (80%), Adobe Illustrator (70%), Postman (65%), Node.js (40%), Express.js (35%)',
      },
    ],
  },
  aboutme: {
    title: <>About <span>Me</span></>,
    items: [
      {
        title: 'Who Am I?',
        meta: 'Frontend Developer & Designer',
        desc: "I'm a passionate Web and App Development student who loves creating modern, clean, and user-friendly websites. I enjoy learning new technologies and continuously improving my skills to become a well-rounded full-stack developer.",
      },
      {
        title: 'My Goals',
        meta: '2025 and Beyond',
        desc: 'To master React and Node.js, build full-stack projects, contribute to open source, and land a professional developer role where I can grow and make an impact.',
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
