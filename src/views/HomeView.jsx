import React, { useEffect, useRef } from 'react';
import ProjectDeck from '../components/ProjectDeck';

export default function HomeView({ onNavigate }) {
  const studioRef = useRef(null);

  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const handleScroll = () => {
      if (!studioRef.current) return;
      const r = studioRef.current.getBoundingClientRect();
      const q = Math.min(1, Math.max(0, (window.innerHeight - r.top) / (window.innerHeight + r.height))) - 0.5;
      if (r.bottom > 0 && r.top < window.innerHeight) {
        const lines = studioRef.current.querySelectorAll('.st-line');
        lines.forEach((l) => {
          const k = parseFloat(l.getAttribute('data-k')) || 0;
          l.style.transform = `translateX(${(q * k * -1.6).toFixed(1)}px)`;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main id="view-home">
      {/* 01 Opening */}
      <section className="hero" id="hero" aria-labelledby="hero-h">
        <div className="wrap">
          <p className="mark-label mono">
            <b>01</b> Opening · Architecture | Interiors | Spatial Things
          </p>
          <h1 className="display" id="hero-h">
            <span className="line">
              <span style={{ '--d': 0 }}>We design</span>
            </span>
            <span className="line">
              <span style={{ '--d': 0.1 }}>
                spaces<span className="org">.</span>
              </span>
            </span>
            <span className="line">
              <span style={{ '--d': 0.2 }}>We shape</span>
            </span>
            <span className="line">
              <span style={{ '--d': 0.3 }}>
                experiences<span className="org">.</span>
              </span>
            </span>
          </h1>
          <div className="hero-foot">
            <p>
              ARCHITRONICS is an independent architecture and interior design studio.
              Scroll to move through the building. Click the mark to take it apart.
            </p>
            <div className="scroll-ind mono" aria-hidden="true">
              <i></i>
              <span>Scroll to explore</span>
            </div>
          </div>
        </div>
      </section>

      {/* 02 Studio */}
      <section className="studio" id="studio" ref={studioRef} aria-labelledby="studio-h">
        <div className="crop-n" aria-hidden="true">02</div>
        <span className="vtag mono" aria-hidden="true">
          Studio statement · Spatial Inquiry
        </span>
        <div className="wrap">
          <p className="mark-label mono">
            <b>02</b> Studio
          </p>
          <h2 className="st-lines display" id="studio-h">
            <span className="st-line dim l1" data-k="-70">
              Architecture is
            </span>
            <span className="st-line l2" data-k="0">
              more than the space
            </span>
            <span className="st-line l3" data-k="70">
              we build<span className="org">.</span>
            </span>
            <span className="st-line dim l1" data-k="-70" style={{ marginTop: '.35em' }}>
              It is the
            </span>
            <span className="st-line l2" data-k="0">
              <span className="out">experience</span>
            </span>
            <span className="st-line l3" data-k="70">
              we create<span className="org">.</span>
            </span>
          </h2>
          <div className="st-note mono">
            <span>Fig. 02 · Studio statement · Section A–A</span>
            <p>Form follows perception. Materiality grounds emotion.</p>
          </div>
        </div>
      </section>

      {/* 03 Projects */}
      <section className="panel" id="projects" aria-labelledby="proj-h">
        <div className="wrap">
          <p className="mark-label mono">
            <b>03</b> Featured projects
          </p>
          <div className="sec-head">
            <h2 className="display" id="proj-h">
              Selected work
            </h2>
            <p>
              Architectural portfolios and spatial inquiries. Hover or tap a board to inspect. Click to enter the project view.
            </p>
          </div>
        </div>
        <ProjectDeck
          onSelectProject={(id) => onNavigate('project', `project-${id}`)}
        />
        <div className="wrap deck-foot">
          <span className="mono ph">Curated experimental architecture and interiors.</span>
          <a
            className="btn"
            href="#projects-page"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('stub', 'projects-page');
            }}
          >
            All projects <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      {/* 04 Services */}
      <section className="services" id="services" aria-labelledby="svc-h">
        <div className="wrap">
          <p className="mark-label mono">
            <b>04</b> Services
          </p>
          <div className="sec-head">
            <h2 className="display" id="svc-h">
              What we do
            </h2>
            <p>
              Comprehensive architectural execution from initial schematic diagrams to final construction details.
            </p>
          </div>
          <ul className="svc">
            <li>
              <div className="svc-row">
                <span className="svc-n" aria-hidden="true">01</span>
                <div>
                  <span className="tag mono">Structure · Technical Scope</span>
                  <h3 className="display">Architecture</h3>
                </div>
                <p className="d">
                  Buildings designed from the first line of the section to the last coordinated construction drawing.
                </p>
                <svg className="glyph" viewBox="0 0 64 64" aria-hidden="true">
                  <path d="M8 54 L32 10 L56 54" />
                  <path d="M22 54 V38 H42 V54" />
                  <rect className="o" x="28" y="22" width="8" height="5" />
                </svg>
              </div>
            </li>
            <li>
              <div className="svc-row">
                <span className="svc-n" aria-hidden="true">02</span>
                <div>
                  <span className="tag mono">Light & Surface · Materiality</span>
                  <h3 className="display">Interior design</h3>
                </div>
                <p className="d">
                  Layouts, textures, bespoke joinery and custom lighting developed organically alongside structural architecture.
                </p>
                <svg className="glyph" viewBox="0 0 64 64" aria-hidden="true">
                  <rect x="10" y="22" width="44" height="30" />
                  <path d="M10 40 H54" />
                  <path d="M22 22 V12 H42 V22" />
                  <rect className="o" x="44" y="42" width="6" height="6" />
                </svg>
              </div>
            </li>
            <li>
              <div className="svc-row">
                <span className="svc-n" aria-hidden="true">03</span>
                <div>
                  <span className="tag mono">Volume & Threshold · Installation</span>
                  <h3 className="display">Spatial design</h3>
                </div>
                <p className="d">
                  Sequences, experiential thresholds, and artistic installations where human movement dictates geometry.
                </p>
                <svg className="glyph" viewBox="0 0 64 64" aria-hidden="true">
                  <rect x="8" y="8" width="34" height="34" />
                  <rect x="18" y="18" width="34" height="34" />
                  <rect className="o" x="30" y="30" width="10" height="10" />
                </svg>
              </div>
            </li>
            <li>
              <div className="svc-row">
                <span className="svc-n" aria-hidden="true">04</span>
                <div>
                  <span className="tag mono">Detail · Digital Craft</span>
                  <h3 className="display">Visualisation</h3>
                </div>
                <p className="d">
                  Rigorous BIM modeling, isometric line drawings, and cinematic renders that clarify design intent prior to fabrication.
                </p>
                <svg className="glyph" viewBox="0 0 64 64" aria-hidden="true">
                  <polygon points="32,8 54,20 32,32 10,20" />
                  <polygon points="10,20 32,32 32,56 10,44" />
                  <polygon points="54,20 32,32 32,56 54,44" />
                  <polygon className="o" points="32,8 54,20 32,32 10,20" />
                </svg>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* 05 Philosophy */}
      <section className="phil" id="philosophy" aria-labelledby="phil-h">
        <div className="wrap">
          <p className="mark-label mono">
            <b>05</b> Design philosophy
          </p>
          <div className="phil-grid">
            <div>
              <h2 className="display" id="phil-h">
                Thoughtful by design<span className="org">.</span>{' '}
                <span className="dim">Experimental by nature<span className="org">.</span></span>
              </h2>
              <p className="lead">
                Every project balances structural rigor with tactile experimentation. We treat physical boundaries not as limitations, but as optical instruments that orchestrate climate, shadow, and human connection.
              </p>
            </div>
            <div className="tiles" aria-hidden="true">
              <div className="tile">
                <svg className="fig" viewBox="0 0 240 240">
                  <rect className="fl" x="40" y="40" width="160" height="160" />
                  <circle className="fl" cx="120" cy="120" r="80" />
                  <line className="gl" x1="40" y1="40" x2="200" y2="200" />
                  <line className="gl" x1="200" y1="40" x2="40" y2="200" />
                  <line className="fl" x1="40" y1="222" x2="200" y2="222" />
                  <line className="fl" x1="40" y1="217" x2="40" y2="227" />
                  <line className="fl" x1="200" y1="217" x2="200" y2="227" />
                  <circle className="fo" cx="120" cy="120" r="5" />
                </svg>
                <span className="cap mono">Fig. 5.1 · Construction</span>
              </div>
              <div className="tile conc">
                <svg className="fig" width="100%" height="100%">
                  <rect width="100%" height="100%" filter="url(#nz)" />
                </svg>
                <span className="cap mono" style={{ color: 'var(--bone)' }}>
                  Fig. 5.2 · Surface
                </span>
              </div>
              <div className="tile">
                <svg className="fig" viewBox="0 0 240 240">
                  <polygon className="fl" points="120,40 170,65 120,90 70,65" />
                  <polygon className="fl" points="70,65 120,90 120,150 70,125" />
                  <polygon className="fl" points="170,65 120,90 120,150 170,125" />
                  <polygon className="fo" points="120,100 150,115 120,130 90,115" transform="translate(0,40)" />
                  <polygon className="fl" points="60,170 110,195 60,220 10,195" transform="translate(120,-20)" />
                </svg>
                <span className="cap mono">Fig. 5.3 · Spatial model</span>
              </div>
              <div className="tile">
                <svg className="fig" viewBox="0 0 240 240">
                  <g className="gl">
                    <line x1="0" y1="60" x2="240" y2="60" />
                    <line x1="0" y1="120" x2="240" y2="120" />
                    <line x1="0" y1="180" x2="240" y2="180" />
                    <line x1="60" y1="0" x2="60" y2="240" />
                    <line x1="120" y1="0" x2="120" y2="240" />
                    <line x1="180" y1="0" x2="180" y2="240" />
                  </g>
                  <svg x="46" y="60" width="148" height="104" viewBox="0 0 975 675" fill="#F2EFEA">
                    <use href="#at-core" width="975" height="675" />
                  </svg>
                  <rect className="fo" x="14" y="118" width="22" height="3" />
                  <rect className="fo" x="204" y="118" width="22" height="3" />
                </svg>
                <span className="cap mono">Fig. 5.4 · Mark on grid</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 06 About */}
      <section className="about" id="about" aria-labelledby="about-h">
        <div className="wrap">
          <p className="mark-label mono">
            <b>06</b> About
          </p>
          <div className="about-grid">
            <div>
              <h2 className="display" id="about-h">
                An independent design studio<span className="org">.</span>
              </h2>
              <p className="lead">
                ARCHITRONICS is a research-informed architectural practice. We engage with commercial, cultural, and residential realms to create durable, sculptural environments that elevate daily life.
              </p>
              <div className="two">
                <div>
                  <span className="mono">Approach to architecture</span>
                  <p className="ph">
                    Form anchored in context, tectonic honesty, and natural daylight orchestration.
                  </p>
                </div>
                <div>
                  <span className="mono">Approach to interiors</span>
                  <p className="ph">
                    Bespoke material tactility, acoustic comfort, and seamless spatial transitions.
                  </p>
                </div>
              </div>
              <p style={{ marginTop: 30 }}>
                <a
                  className="btn"
                  href="#about-page"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('stub', 'about-page');
                  }}
                >
                  Read the full About page <span aria-hidden="true">→</span>
                </a>
              </p>
            </div>
            <aside className="founder" aria-label="Founder introduction">
              <div className="portrait mono">
                <span>
                  Principal Architect<br />Architronics Studio
                </span>
              </div>
              <span className="mono k">The person behind the studio</span>
              <h3>Principal & Lead Architect</h3>
              <p className="ph">
                Architectural researcher and designer exploring the intersection of brutalist geometry, digital craft, and sustainable masonry.
              </p>
            </aside>
          </div>
        </div>
      </section>

      {/* 07 Contact */}
      <section className="contact" id="contact" aria-labelledby="contact-h">
        <div className="wrap">
          <p className="mark-label mono">
            <b>07</b> Contact
          </p>
          <h2 className="display" id="contact-h">
            Let's create something meaningful<span className="org">.</span>
          </h2>
          <div className="c-row">
            <div>
              <a
                className="btn"
                href="#contact-page"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('stub', 'contact-page');
                }}
              >
                Start a conversation <span aria-hidden="true">→</span>
              </a>
            </div>
            <div className="c-det">
              <div>
                <span className="mono">Email</span>
                <span className="ph">hello@architronics.studio</span>
              </div>
              <div>
                <span className="mono">Social</span>
                <span className="ph">Instagram · LinkedIn · Are.na</span>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Endbar Footer */}
      <div className="endbar">
        <div className="wrap mono">
          <span>© Architronics Studio · Interactive Portfolio</span>
          <nav aria-label="Footer">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('home', 'projects');
              }}
            >
              Projects
            </a>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('home', 'about');
              }}
            >
              About
            </a>
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('home', 'services');
              }}
            >
              Services
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('home', 'contact');
              }}
            >
              Contact
            </a>
            <a
              href="#direction"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('direction', 'direction');
              }}
            >
              Direction
            </a>
          </nav>
        </div>
      </div>
    </main>
  );
}
