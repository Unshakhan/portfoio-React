import { useState, useEffect, useRef } from 'react';
import './Skills.css'

const defaultSkills = [
  {
    id: 1, category: 'Frontend', items: [
      { id: 11, name: 'React', percent: 95 },
      { id: 12, name: 'TypeScript', percent: 90 },
      { id: 13, name: 'Next.js', percent: 88 },
      { id: 14, name: 'Tailwind CSS', percent: 92 },
    ]
  },
  {
    id: 2, category: 'Backend', items: [
      { id: 21, name: 'Node.js', percent: 85 },
      { id: 22, name: 'Express', percent: 82 },
      { id: 23, name: 'MongoDB', percent: 78 },
      { id: 24, name: 'PostgreSQL', percent: 72 },
    ]
  },
  {
    id: 3, category: 'Tools & Others', items: [
      { id: 31, name: 'Git', percent: 95 },
      { id: 32, name: 'Docker', percent: 70 },
      { id: 33, name: 'Figma', percent: 80 },
      { id: 34, name: 'AWS', percent: 65 },
    ]
  },
];

function SkillBar({ percent, animated }) {
  const [width, setWidth] = useState(0);
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    if (!animated) return;
    let start = null;
    const duration = 1600;
    const target = percent;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setWidth(Math.floor(eased * target));
      setDisplayed(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    const raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [animated, percent]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <div style={{
        flex: 1,
        height: '10px',
        background: 'var(--card2)',
        borderRadius: '5px',
        overflow: 'hidden',
        border: '1px solid var(--border)',
        position: 'relative',
      }}>
        <div style={{
          height: '100%',
          width: `${width}%`,
          background: 'linear-gradient(90deg, var(--accent), var(--accent2))',
          borderRadius: '5px',
          boxShadow: '0 0 10px rgba(57,255,159,0.5)',
          transition: 'width 0.05s linear',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <span style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)',
            animation: 'skillShimmer 2s infinite',
          }} />
        </div>
      </div>
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.78rem',
        color: 'var(--accent)',
        fontWeight: 700,
        minWidth: '36px',
        textAlign: 'right',
      }}>{displayed}%</span>
    </div>
  );
}

function Toast({ msg, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  const colors = {
    success: 'var(--accent)',
    warning: '#f59e0b',
    error: '#ff4d6d',
  };

  return (
    <div style={{
      background: 'var(--card)',
      border: `1px solid ${colors[type] || 'var(--accent)'}`,
      borderRadius: '12px',
      padding: '14px 18px',
      boxShadow: `0 0 24px rgba(57,255,159,0.25)`,
      display: 'flex', alignItems: 'center', gap: '10px',
      fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--text)',
      animation: 'toastIn 0.3s ease',
      minWidth: '260px',
    }}>
      <i className={`fa-solid ${type === 'success' ? 'fa-circle-check' : type === 'warning' ? 'fa-triangle-exclamation' : 'fa-circle-xmark'}`}
        style={{ color: colors[type], fontSize: '1rem' }} />
      <span style={{ flex: 1 }}>{msg}</span>
      <button onClick={onClose} style={{
        background: 'none', border: 'none', color: 'var(--text2)', cursor: 'pointer', fontSize: '0.85rem'
      }}><i className="fa-solid fa-xmark" /></button>
    </div>
  );
}

function EditModal({ skill, categoryName, onSave, onClose }) {
  const [name, setName] = useState(skill.name);
  const [pct, setPct] = useState(String(skill.percent));

  const handleSave = () => {
    const p = parseInt(pct);
    if (!name.trim() || isNaN(p) || p < 1 || p > 100) return;
    onSave({ ...skill, name: name.trim(), percent: p });
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }} onClick={onClose}>
      <div style={{
        background: 'var(--card)',
        border: '1px solid var(--accent)',
        borderRadius: '16px',
        padding: '36px 32px',
        width: '380px',
        boxShadow: 'var(--glow)',
        animation: 'modalIn 0.25s ease',
      }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h3 style={{
            fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--text)', fontWeight: 700, letterSpacing: '1px',
          }}>
            Edit <span style={{ color: 'var(--accent)' }}>{categoryName}</span> Skill
          </h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text2)', cursor: 'pointer', fontSize: '1.1rem' }}>
            <i className="fa-solid fa-xmark" />
          </button>
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)', marginBottom: '6px', letterSpacing: '1px' }}>
            SKILL NAME
          </label>
          <input value={name} onChange={e => setName(e.target.value)}
            style={inputStyle}
            onKeyDown={e => e.key === 'Enter' && handleSave()} />
        </div>
        <div style={{ marginBottom: '28px' }}>
          <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)', marginBottom: '6px', letterSpacing: '1px' }}>
            PROFICIENCY ({pct || 0}%)
          </label>
          <input type="range" min="1" max="100" value={pct}
            onChange={e => setPct(e.target.value)}
            style={{ width: '100%', accentColor: 'var(--accent)', cursor: 'pointer', height: '6px' }} />
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={onClose} style={{
            flex: 1, padding: '11px', background: 'transparent',
            border: '1px solid var(--border)', borderRadius: '8px',
            color: 'var(--text2)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', cursor: 'pointer',
            transition: 'all 0.25s',
          }}>Cancel</button>
          <button onClick={handleSave} style={{
            flex: 1, padding: '11px', background: 'var(--accent)', color: '#000',
            border: 'none', borderRadius: '8px',
            fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(57,255,159,0.3)',
            transition: 'all 0.25s',
          }}>
            <i className="fa-solid fa-floppy-disk" style={{ marginRight: '6px' }} /> Save
          </button>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '11px 14px',
  background: 'var(--bg2)',
  border: '1px solid var(--border)',
  borderRadius: '8px',
  color: 'var(--text)',
  fontFamily: 'var(--font-mono)',
  fontSize: '0.88rem',
  outline: 'none',
  transition: 'border-color 0.3s',
};

function AddSkillRow({ categories, onAdd }) {
  const [name, setName] = useState('');
  const [pct, setPct] = useState('');
  const [cat, setCat] = useState(categories[0]?.category || '');

  const handleAdd = () => {
    const p = parseInt(pct);
    const n = name.trim();
    if (!n || isNaN(p) || p < 1 || p > 100 || !cat) return false;
    onAdd({ name: n, percent: p, category: cat });
    setName(''); setPct('');
    return true;
  };

  return (
    <div style={{
      background: 'var(--card)',
      border: '1px solid var(--border)',
      borderRadius: '16px',
      padding: '28px',
      maxWidth: '780px',
      margin: '0 auto',
      marginTop: '48px',
      boxShadow: '0 4px 24px rgba(57,255,159,0.05)',
    }}>
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent)',
        letterSpacing: '2px', marginBottom: '18px',
      }}>
        // ADD NEW SKILL
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 160px 140px auto',
        gap: '12px',
        alignItems: 'center',
      }}>
        <input placeholder="Skill name..." value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAdd()}
          style={{ ...inputStyle }} />
        <select value={cat} onChange={e => setCat(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
          {categories.map(c => (
            <option key={c.id} value={c.category}>{c.category}</option>
          ))}
        </select>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input type="number" placeholder="%" min="1" max="100" value={pct}
            onChange={e => setPct(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAdd()}
            style={{ ...inputStyle, width: '72px' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text2)' }}>%</span>
        </div>
        <button onClick={handleAdd} style={{
          padding: '11px 20px', background: 'var(--accent)', color: '#000',
          border: 'none', borderRadius: '8px', fontWeight: 700,
          fontFamily: 'var(--font-mono)', fontSize: '0.85rem', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap',
          boxShadow: '0 4px 16px rgba(57,255,159,0.3)',
          transition: 'all 0.25s',
        }}>
          <i className="fa-solid fa-plus" /> Add
        </button>
      </div>
    </div>
  );
}

function CategoryCard({ category, onDelete, onEdit, animated }) {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div style={{
      background: 'var(--card)',
      border: '1px solid var(--border)',
      borderRadius: '16px',
      padding: '32px',
      transition: 'border-color 0.3s, box-shadow 0.3s',
    }}>
      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontSize: '1rem',
        color: 'var(--accent)',
        fontWeight: 700,
        letterSpacing: '1.5px',
        marginBottom: '28px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}>
        <span style={{ color: 'var(--text2)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>//</span>
        {category.category.toUpperCase()}
        <span style={{
          marginLeft: 'auto',
          fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
          color: 'var(--text2)', fontWeight: 400, letterSpacing: '0px',
        }}>
          {category.items.length} skill{category.items.length !== 1 ? 's' : ''}
        </span>
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
        {category.items.map(skill => (
          <div key={skill.id}
            onMouseEnter={() => setHoveredId(skill.id)}
            onMouseLeave={() => setHoveredId(null)}
            style={{ position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.88rem',
                color: hoveredId === skill.id ? 'var(--accent)' : 'var(--text)',
                fontWeight: 600, transition: 'color 0.2s',
              }}>{skill.name}</span>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                opacity: hoveredId === skill.id ? 1 : 0,
                transform: hoveredId === skill.id ? 'translateX(0)' : 'translateX(8px)',
                transition: 'opacity 0.2s, transform 0.2s',
              }}>
                <button onClick={() => onEdit(skill, category.category)} title="Edit" style={{
                  width: '28px', height: '28px', borderRadius: '6px',
                  background: 'rgba(57,255,159,0.1)', border: '1px solid rgba(57,255,159,0.3)',
                  color: 'var(--accent)', cursor: 'pointer', fontSize: '0.75rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.2s',
                }}>
                  <i className="fa-solid fa-pen-to-square" />
                </button>
                <button onClick={() => onDelete(skill.id)} title="Delete" style={{
                  width: '28px', height: '28px', borderRadius: '6px',
                  background: 'rgba(255,77,109,0.08)', border: '1px solid rgba(255,77,109,0.25)',
                  color: '#ff4d6d', cursor: 'pointer', fontSize: '0.75rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.2s',
                }}>
                  <i className="fa-solid fa-trash" />
                </button>
              </div>
            </div>
            <SkillBar percent={skill.percent} animated={animated} />
          </div>
        ))}
        {category.items.length === 0 && (
          <div style={{
            textAlign: 'center', padding: '32px 0',
            fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text2)',
            borderRadius: '8px', border: '1px dashed var(--border)',
          }}>
            No skills yet — add one below
          </div>
        )}
      </div>
    </div>
  );
}

export default function Skills() {
  const [skills, setSkills] = useState(defaultSkills);
  const [toasts, setToasts] = useState([]);
  const [editTarget, setEditTarget] = useState(null);
  const [animated, setAnimated] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const addToast = (msg, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, msg, type }]);
  };
  const removeToast = (id) => setToasts(prev => prev.filter(t => t.id !== id));

  const handleAdd = ({ name, percent, category }) => {
    setSkills(prev => prev.map(cat =>
      cat.category === category
        ? { ...cat, items: [...cat.items, { id: Date.now(), name, percent }] }
        : cat
    ));
    addToast(`"${name}" added to ${category}`, 'success');
  };

  const handleDelete = (skillId) => {
    let deletedName = '';
    setSkills(prev => prev.map(cat => {
      const found = cat.items.find(s => s.id === skillId);
      if (found) deletedName = found.name;
      return { ...cat, items: cat.items.filter(s => s.id !== skillId) };
    }));
    addToast(`"${deletedName}" removed`, 'error');
  };

  const handleEdit = (skill, categoryName) => {
    setEditTarget({ skill, categoryName });
  };

  const handleSaveEdit = (updated) => {
    setSkills(prev => prev.map(cat => ({
      ...cat,
      items: cat.items.map(s => s.id === updated.id ? updated : s)
    })));
    addToast(`"${updated.name}" updated`, 'success');
    setEditTarget(null);
  };

  const style = `
    @keyframes skillShimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(300%); }
    }
    @keyframes toastIn {
      from { opacity: 0; transform: translateX(24px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes modalIn {
      from { opacity: 0; transform: scale(0.94) translateY(10px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }
    .skill-category-card:hover {
      border-color: var(--accent) !important;
      box-shadow: 0 8px 32px rgba(57,255,159,0.08) !important;
    }
    .add-skill-btn:hover { box-shadow: var(--glow) !important; transform: scale(1.04) !important; }
    .edit-btn:hover { background: rgba(57,255,159,0.2) !important; }
    .del-btn:hover { background: rgba(255,77,109,0.18) !important; }
    select option { background: var(--card); color: var(--text); }
    input[type=range]::-webkit-slider-thumb { cursor: pointer; }
    @media (max-width: 680px) {
      .add-skill-grid { grid-template-columns: 1fr 1fr !important; }
      .add-skill-grid > *:last-child { grid-column: 1 / -1; width: 100%; }
    }
    @media (max-width: 400px) {
      .add-skill-grid { grid-template-columns: 1fr !important; }
    }
  `;

  return (
    <section ref={sectionRef}  className="skills-section"  style={{ padding: '100px 5%', position: 'relative', zIndex: 1 }}>
       <div className="skills-bg" aria-hidden="true">
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      <div className="blob blob-3"></div>
      <div className="blob blob-4"></div>
      <div className="grid-overlay"></div>
    </div>

      <style>{style}</style>

      {/* Toast Container */}
      <div style={{ position: 'fixed', top: '90px', right: '20px', zIndex: 9999, display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {toasts.map(t => (
          <Toast key={t.id} msg={t.msg} type={t.type} onClose={() => removeToast(t.id)} />
        ))}
      </div>

      {/* Edit Modal */}
      {editTarget && (
        <EditModal
          skill={editTarget.skill}
          categoryName={editTarget.categoryName}
          onSave={handleSaveEdit}
          onClose={() => setEditTarget(null)}
        />
      )}

      {/* ✅ Section Heading — section-title class without reveal so it stays visible */}
      <h2 className="section-title">
        My <span>Skills</span>
      </h2>

      {/* Skills Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '28px',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        {skills.map(cat => (
          <CategoryCard
            key={cat.id}
            category={cat}
            onDelete={handleDelete}
            onEdit={handleEdit}
            animated={animated}
          />
        ))}
      </div>

      {/* Add Skill Row */}
      <AddSkillRow categories={skills} onAdd={handleAdd} />
    </section>
  );
}