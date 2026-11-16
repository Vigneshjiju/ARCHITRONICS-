import React, { useEffect, useRef } from 'react';

const MENU_ITEMS = [
  { n: '01', t: 'Home', target: 'top', view: 'home', secIdx: 0 },
  { n: '02', t: 'Projects', target: 'projects', view: 'home', secIdx: 2 },
  { n: '03', t: 'About', target: 'about', view: 'home', secIdx: 5 },
  { n: '04', t: 'Services', target: 'services', view: 'home', secIdx: 3 },
  { n: '05', t: 'Contact', target: 'contact', view: 'home', secIdx: 6 }
];

export default function Menu({
  isOpen,
  onClose,
  currentSectionIndex = 0,
  currentView = 'home',
  onNavigate
}) {
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.documentElement.classList.add('menu-open');
      const timer = setTimeout(() => {
        closeBtnRef.current?.focus();
      }, 60);
      return () => clearTimeout(timer);
    } else {
      document.documentElement.classList.remove('menu-open');
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Section index to menu item mapping:
  // secIds=['hero','studio','projects','services','philosophy','about','contact']
  // menuMap=[0,0,1,3,2,2,4];
  const activeMenuIdx =
    currentView === 'home'
      ? [0, 0, 1, 3, 2, 2, 4][currentSectionIndex] ?? 0
      : -1;

  return (
    <div
      className={`menu ${isOpen ? 'open' : ''}`}
      id="menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
    >
      <div className="slabs" aria-hidden="true">
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
      </div>

      <div className="menu-top">
        <span className="wm" style={{ fontSize: '.78rem' }}>
          <svg viewBox="115 824 70 102" aria-hidden="true">
            <polygon className="a1" points="133,828 140,828 180,922 167,922 133,840" />
            <polygon className="a2" points="119,880 131,876 131,903 119,908" />
          </svg>
          <span>RCHITRONICS</span>
        </span>
        <button
          ref={closeBtnRef}
          className="close"
          id="close"
          type="button"
          onClick={onClose}
        >
          <span>Close</span>
          <span aria-hidden="true">✕</span>
        </button>
      </div>

      <div className="menu-in wrap">
        <nav aria-label="Primary">
          <ol className="mlist" id="mlist">
            {MENU_ITEMS.map((item, idx) => {
              const isCurrent = activeMenuIdx === idx;
              return (
                <li key={item.n} style={{ '--i': idx }}>
                  <a
                    href={`#${item.target}`}
                    aria-current={isCurrent ? 'true' : 'false'}
                    onClick={(e) => {
                      e.preventDefault();
                      onClose();
                      onNavigate(item.view, item.target);
                    }}
                  >
                    <span className="n mono">{item.n}</span>
                    <span className="t">{item.t}</span>
                    <span className="here mono">● You are here</span>
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>

        <div className="menu-side mono">
          <div>
            <span className="mono">Studio</span>
            <span className="ph">Architecture | Interiors | Spatial Things</span>
          </div>
          <div>
            <span className="mono">Email</span>
            <span className="ph">hello@architronics.studio</span>
          </div>
          <div>
            <span className="mono">Notes</span>
            <a
              href="#direction"
              onClick={(e) => {
                e.preventDefault();
                onClose();
                onNavigate('direction', 'direction');
              }}
            >
              Creative direction board →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
