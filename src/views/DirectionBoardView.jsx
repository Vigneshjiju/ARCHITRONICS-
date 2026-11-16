import React from 'react';

const CURSOR_DEMOS = [
  { mode: 'default', label: 'Default' },
  { mode: 'link', label: 'Navigation link' },
  { mode: 'button', label: 'Button' },
  { mode: 'card', label: 'Project board', text: 'EXPLORE ↗' },
  { mode: 'target', label: '3D object', text: 'SELECT' },
  { mode: 'drag', label: 'Draggable', text: '◂ DRAG ▸' },
  { mode: 'ext', label: 'External link', text: '↗' }
];

export default function DirectionBoardView({ onNavigate }) {
  return (
    <main id="view-direction">
      <div className="inner">
        <div className="wrap">
          <a
            className="back mono"
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('home', 'top');
            }}
          >
            ← Back to homepage
          </a>

          <p className="mark-label mono">
            <b>P1</b> Creative direction
          </p>
          <h1 className="display">
            An architectural world that reveals itself<span className="org">.</span>
          </h1>
          <p className="notice mono">
            Design system specifications and interactive behavior guideline for Architronics.
          </p>

          {/* Identity */}
          <div className="block">
            <h2 className="display">Identity</h2>
            <div className="logos">
              <div>
                <svg
                  className="mk"
                  viewBox="0 0 975 675"
                  fill="#F2EFEA"
                  role="img"
                  aria-label="AT monogram"
                >
                  <use href="#at-core" width="975" height="675" />
                </svg>
              </div>
              <div style={{ gap: 18, alignContent: 'center', display: 'flex', flexDirection: 'column' }}>
                <span className="wm" style={{ fontSize: 'clamp(1rem, 3vw, 2rem)' }}>
                  <svg viewBox="115 824 70 102" aria-hidden="true">
                    <polygon className="a1" points="133,828 140,828 180,922 167,922 133,840" />
                    <polygon className="a2" points="119,880 131,876 131,903 119,908" />
                  </svg>
                  <span>RCHITRONICS</span>
                </span>
                <span className="mono ph">Architecture | Interiors | Spatial Things</span>
              </div>
            </div>
            <p className="body" style={{ marginTop: 16 }}>
              The AT monogram and wordmark are vector constructions reflecting structural balance and planar shifts. In the interactive 3D realm, the monogram serves as the gateway portal that the camera passes through into the studio space.
            </p>
          </div>

          {/* Colour */}
          <div className="block">
            <h2 className="display">Colour</h2>
            <ul className="sw">
              <li style={{ '--c': '#0E0E0F', '--t': '#F2EFEA' }}>
                <b>Almost-black</b>
                <span>#0E0E0F</span>
                <em>Page ground</em>
              </li>
              <li style={{ '--c': '#17171A', '--t': '#F2EFEA' }}>
                <b>Charcoal</b>
                <span>#17171A</span>
                <em>Boards, panels</em>
              </li>
              <li style={{ '--c': '#26262A', '--t': '#F2EFEA' }}>
                <b>Graphite</b>
                <span>#26262A</span>
                <em>Structure, cards</em>
              </li>
              <li style={{ '--c': '#A9A7A2', '--t': '#0E0E0F' }}>
                <b>Concrete</b>
                <span>#A9A7A2</span>
                <em>Secondary text</em>
              </li>
              <li style={{ '--c': '#ECE9E4', '--t': '#121214' }}>
                <b>Warm white</b>
                <span>#ECE9E4</span>
                <em>Light sections</em>
              </li>
              <li style={{ '--c': '#FF4D00', '--t': '#121214' }}>
                <b>Electric orange</b>
                <span>#FF4D00</span>
                <em>Signal only</em>
              </li>
              <li style={{ '--c': '#B83600', '--t': '#F2EFEA' }}>
                <b>Orange ink</b>
                <span>#B83600</span>
                <em>Orange text on warm white</em>
              </li>
            </ul>
          </div>

          {/* Typography */}
          <div className="block">
            <h2 className="display">Typography</h2>
            <div className="spec">
              <span className="mono">Wordmark · extended, wide-tracked</span>
              <div className="big">Architronics</div>
            </div>
            <div className="spec">
              <span className="mono">Headlines · Archivo 800, uppercase, tight</span>
              <div className="big2">Thoughtful by design</div>
            </div>
            <div className="spec">
              <span className="mono">Body · Instrument Sans</span>
              <p className="bd">
                Plain, readable text for architectural descriptions, concept briefs, and project notes at 16 to 18 px.
              </p>
            </div>
            <div className="spec">
              <span className="mono">Annotation · JetBrains Mono</span>
              <p className="mo">Section A–A · Sheet 01 · 1:50 · Status</p>
            </div>
          </div>

          {/* 3D environment */}
          <div className="block">
            <h2 className="display">3D environment</h2>
            <div className="dir-grid">
              <div>
                <span className="mono">One connected space</span>
                <p>
                  A continuous brutalist corridor of concrete fins, roof beams and orange frames runs behind every section. Scroll position smoothly pulls the virtual camera forward.
                </p>
              </div>
              <div>
                <span className="mono">The mark as a gateway</span>
                <p>
                  The AT monogram stands in the opening view as a monumental 3D sculpture. Hover to highlight slabs; click to explode and disassemble.
                </p>
              </div>
              <div>
                <span className="mono">Section transitions</span>
                <p>
                  Each section manipulates focal depth, fog density, and camera rotation to frame corresponding content.
                </p>
              </div>
            </div>
          </div>

          {/* Custom cursor demo */}
          <div className="block">
            <h2 className="display">Custom cursor</h2>
            <p className="body" style={{ marginBottom: 22 }}>
              A drafting reticle: four separated corner brackets, a segmented measurement ring, and an orange diamond reticle with gentle inertia.
            </p>
            <div className="cdemo" id="cdemo">
              {CURSOR_DEMOS.map((demo) => (
                <figure key={demo.mode}>
                  <div className="cx demo" data-mode={demo.mode}>
                    <div className="cx-frame">
                      <svg className="cx-ring" viewBox="-30 -30 60 60" aria-hidden="true">
                        <circle
                          r="26"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1"
                          strokeDasharray="3 5 12 5 3 5 22 5"
                        />
                      </svg>
                      <i className="b b1"></i>
                      <i className="b b2"></i>
                      <i className="b b3"></i>
                      <i className="b b4"></i>
                      <i className="ln ln-h"></i>
                      <i className="ln ln-v"></i>
                      <span className="cx-lab mono">{demo.text || ''}</span>
                    </div>
                    <i className="cx-dot"></i>
                  </div>
                  <figcaption className="mono">{demo.label}</figcaption>
                </figure>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="block">
            <h2 className="display">Navigation</h2>
            <div className="dir-grid two">
              <div>
                <span className="mono">Floating bar</span>
                <p>
                  Fixed brand anchor, real-time section coordinate readout (e.g. 03 / 07 Projects), and full-screen menu trigger with adaptive color inversion over bright surfaces.
                </p>
              </div>
              <div>
                <span className="mono">Full-screen menu</span>
                <p>
                  Five architectural slabs rise with staggered timing while primary index numbers slide into position with ESC trap support.
                </p>
              </div>
            </div>
          </div>

          {/* Motion language */}
          <div className="block">
            <h2 className="display">Motion language</h2>
            <div className="dir-grid two">
              <div>
                <span className="mono">What moves</span>
                <p>
                  The camera on scroll, cursor-following 3D tilt, headline line masks rising with cubic-bezier easing, and project boards lifting on hover.
                </p>
              </div>
              <div>
                <span className="mono">Transitions</span>
                <p>
                  Sub-page navigation utilizes slab wipes. Full accessibility support respects prefers-reduced-motion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
