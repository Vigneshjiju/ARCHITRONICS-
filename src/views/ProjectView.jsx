import React from 'react';
import { projects } from '../data/projectsData';
import { DrawingArtwork } from '../components/DrawingArtwork';

export default function ProjectView({ projectId = 1, onNavigate }) {
  const p = projects.find((item) => item.id === projectId) || projects[0];
  const currentIndex = projects.findIndex((item) => item.id === p.id);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <main id="view-project">
      <div className="inner">
        <div className="wrap" id="proj-root">
          <a
            className="back mono"
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('home', 'projects');
            }}
          >
            ← Return to projects
          </a>

          <p className="mark-label mono">
            <b>{p.n}</b> {p.c}
          </p>

          <h1 className="display">{p.t}</h1>

          <p className="notice mono">
            Project dossier. Architectural drawing sets, material palettes, and spatial studies.
          </p>

          <div className="pj-top">
            <div className={`pj-art ${p.tone}`}>
              <span className="mono">[Hero drawing / Isometric]</span>
              <div className="art">
                <DrawingArtwork index={p.id * 2 - 2} withGrid={true} />
              </div>
            </div>

            <dl className="facts">
              <dt className="mono">Project</dt>
              <dd className="ph">{p.t}</dd>
              <dt className="mono">Category</dt>
              <dd className="ph">{p.c}</dd>
              <dt className="mono">Year</dt>
              <dd className="ph">{p.y}</dd>
              <dt className="mono">Location</dt>
              <dd className="ph">{p.l}</dd>
              <dt className="mono">Status</dt>
              <dd className="ph">{p.s}</dd>
            </dl>
          </div>

          <section className="block">
            <h2 className="display">Concept statement</h2>
            <p className="body ph">
              The project is conceived as an extrusion of the natural terrain, framing views of the skyline while maintaining an intimate, sheltered atmosphere internally.
            </p>
          </section>

          <section className="block">
            <h2 className="display">Design intention</h2>
            <p className="body ph">
              Integrating daylight as an active structural material. Shadow lines define spatial transitions between public communal zones and private reflective quarters.
            </p>
          </section>

          <section className="block">
            <h2 className="display">Site and context</h2>
            <p className="body ph">
              Situated within an evolving urban precinct, the structure negotiates historical setbacks and pedestrian axes, functioning as a tranquil architectural oasis.
            </p>
          </section>

          <section className="block">
            <h2 className="display">Drawings and diagrams</h2>
            <div className="draw3">
              {['Plan', 'Section', 'Diagram'].map((k, i) => (
                <figure key={k}>
                  <div className="box t0">
                    <div className="art">
                      <DrawingArtwork index={p.id * 2 - 2 + i + 1} withGrid={true} />
                    </div>
                  </div>
                  <figcaption className="mono">[Drawing coordinate · {k}]</figcaption>
                </figure>
              ))}
            </div>
          </section>

          <section className="block">
            <h2 className="display">Spatial development</h2>
            <p className="body ph">
              Sequential spatial volumes alternate between compression and expansion, heightening perception as visitors move through thresholds.
            </p>
          </section>

          <section className="block">
            <h2 className="display">Material and form exploration</h2>
            <p className="body ph">
              Board-marked concrete, oxidized orange metal accents, and untreated oak joinery cultivate a sensory dialogue between permanence and warmth.
            </p>
          </section>

          <section className="block">
            <h2 className="display">Final design presentation</h2>
            <p className="body ph">
              Coordinated technical documentation, detailing construction joinery, envelope waterproofing, and integrated indirect lighting coves.
            </p>
          </section>

          <section className="block">
            <h2 className="display">Image gallery</h2>
            <div className="imgs">
              <div className="hatch tall mono">[Primary Architectural Plate · 1:50]</div>
              <div className="hatch mono">[Material Texture Analysis]</div>
              <div className="hatch mono">[Ambient Daylight Simulation]</div>
            </div>
          </section>

          <section className="block">
            <h2 className="display">Related projects</h2>
            <div className="rel">
              <a
                href={`#project-${nextProject.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('project', `project-${nextProject.id}`);
                }}
              >
                <span className="mono">Project {nextProject.n}</span>
                <span className="mono">Open →</span>
              </a>
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('home', 'projects');
                }}
              >
                <span className="mono">All projects</span>
                <span className="mono">View →</span>
              </a>
            </div>
          </section>

          <div className="pn mono">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('home', 'projects');
              }}
            >
              ← Return to projects
            </a>
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('home', 'top');
              }}
            >
              Back to top ↑
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
