import { useEffect, useRef } from 'react';

export default function Particles() {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 40; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = Math.random() * 3 + 1;
      p.style.left = Math.random() * 100 + '%';
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      p.style.background = 'var(--accent)';
      p.style.animationDuration = Math.random() * 15 + 10 + 's';
      p.style.animationDelay = Math.random() * 10 + 's';
      container.appendChild(p);
    }
  }, []);

  return <div id="particles" ref={ref}></div>;
}