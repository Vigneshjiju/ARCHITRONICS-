import React, { useState } from 'react';
import { projects } from '../data/projectsData';
import { DrawingArtwork } from './DrawingArtwork';

export default function ProjectDeck({ onSelectProject }) {
  const [activeCardId, setActiveCardId] = useState(null);

  const handleCardClick = (e, project) => {
    const isTouch = matchMedia('(hover: none)').matches;
    if (isTouch) {
      if (activeCardId !== project.id) {
        e.preventDefault();
        setActiveCardId(project.id);
        return;
      }
    }
    e.preventDefault();
    onSelectProject(project.id);
  };

  return (
    <ol className="deck wrap" id="deck" aria-label="Project boards">
      {projects.map((p, i) => {
        const isSelected = activeCardId === p.id;
        return (
          <li key={p.id} className={`card ${isSelected ? 'on' : ''}`}>
            <a
              className={`card-a ${p.tone}`}
              href={`#project-${p.id}`}
              aria-label={`Open project ${p.n}: ${p.t}`}
              onClick={(e) => handleCardClick(e, p)}
            >
              <i className="reg r1"></i>
              <i className="reg r2"></i>
              <i className="reg r3"></i>
              <i className="reg r4"></i>

              <div className="sheet mono">
                <span>Sheet A-{p.n}</span>
                <span>NTS</span>
              </div>

              <div className="cover">
                <div className="art">
                  <DrawingArtwork index={i * 2} withGrid={false} />
                </div>
                <span className="cvr mono">[Cover image]</span>
              </div>

              <div className="chips" aria-hidden="true">
                <i></i>
                <i></i>
                <i></i>
                <i></i>
              </div>

              <div className="tb mono">
                <span>
                  Project <b>{p.n}</b>
                </span>
                <span className="hint"></span>
              </div>

              <span className="explore mono">Explore ↗</span>

              <div className="info">
                <span className="cat mono">{p.c}</span>
                <h3>{p.t}</h3>
                <p>{p.d}</p>
                <div className="meta mono">
                  <span>{p.y}</span>
                  <span>{p.l}</span>
                  <span>{p.s}</span>
                </div>
                <span className="open mono">Open project →</span>
              </div>
            </a>
          </li>
        );
      })}
    </ol>
  );
}
