import React from 'react';

export default function StubView({ hash = 'about-page', onNavigate }) {
  const cleanName = hash.replace('-page', '');
  const title = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);

  return (
    <main id="view-stub">
      <div className="inner">
        <div className="wrap" id="stub-root">
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
            <b>P4</b> {title}
          </p>
          <h1 className="display">{title} page</h1>
          <p className="notice mono">
            Comprehensive {title} documentation and dedicated media archive.
          </p>
          <div className="block">
            <h2 className="display">Overview</h2>
            <p className="body">
              This dedicated view provides detailed information regarding Architronics {title.toLowerCase()} scope, completed case studies, and collaborative team structures.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
