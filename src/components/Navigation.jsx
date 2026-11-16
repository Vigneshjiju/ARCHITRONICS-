import React from 'react';

export default function Navigation({
  currentSectionIndex = 0,
  currentSectionName = 'Opening',
  totalSections = 7,
  isLight = false,
  onOpenMenu,
  onNavigate
}) {
  const pad = (n) => (n < 10 ? '0' : '') + n;

  return (
    <header className={`nav ${isLight ? 'light' : ''}`} id="nav">
      <a
        className="brand"
        href="#top"
        onClick={(e) => {
          e.preventDefault();
          onNavigate('home', 'top');
        }}
        aria-label="Architronics, back to top"
      >
        <span className="wm">
          <svg viewBox="115 824 70 102" aria-hidden="true">
            <polygon className="a1" points="133,828 140,828 180,922 167,922 133,840" />
            <polygon className="a2" points="119,880 131,876 131,903 119,908" />
          </svg>
          <span>RCHITRONICS</span>
        </span>
      </a>

      <div className="ind mono" id="ind" aria-hidden="true">
        <b id="ind-n">{pad(currentSectionIndex + 1)} / {pad(totalSections)}</b>
        <span id="ind-t">{currentSectionName}</span>
      </div>

      <button
        className="menu-btn"
        id="menu-btn"
        type="button"
        aria-haspopup="dialog"
        aria-expanded="false"
        aria-controls="menu"
        onClick={onOpenMenu}
      >
        <span>Menu</span>
        <span className="bars" aria-hidden="true">
          <i></i>
          <i></i>
        </span>
      </button>
    </header>
  );
}
