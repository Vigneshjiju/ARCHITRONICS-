import React from 'react';

export function renderCube(x, y, s, o) {
  return (
    <g>
      <polygon
        className={o ? 'oa' : 's'}
        points={`${x},${y} ${x + s},${y + s / 2} ${x},${y + s} ${x - s},${y + s / 2}`}
      />
      <polygon
        className="s"
        points={`${x - s},${y + s / 2} ${x},${y + s} ${x},${y + 2 * s} ${x - s},${y + 1.5 * s}`}
      />
      <polygon
        className="s"
        points={`${x},${y + s} ${x + s},${y + s / 2} ${x + s},${y + 1.5 * s} ${x},${y + 2 * s}`}
      />
    </g>
  );
}

export function GridLines() {
  const vLines = [];
  for (let i = 0; i <= 12; i++) {
    vLines.push(
      <line key={`v-${i}`} className="h" x1={i * 20} y1="0" x2={i * 20} y2="320" />
    );
  }
  const hLines = [];
  for (let j = 0; j <= 16; j++) {
    hLines.push(
      <line key={`h-${j}`} className="h" x1="0" y1={j * 20} x2="240" y2={j * 20} />
    );
  }
  return (
    <>
      {vLines}
      {hLines}
    </>
  );
}

export function DrawingArtwork({ index = 0, withGrid = false }) {
  const artIdx = Math.abs(index) % 5;

  const renderArt = () => {
    switch (artIdx) {
      case 0:
        return (
          <>
            <rect className="s" x="40" y="226" width="124" height="44" />
            <rect className="oa" x="62" y="190" width="156" height="14" />
            <rect className="s" x="40" y="136" width="110" height="44" />
            <rect className="s" x="86" y="106" width="104" height="12" />
            <line className="s" x1="58" y1="204" x2="58" y2="226" />
            <line className="s" x1="104" y1="204" x2="104" y2="226" />
            <line className="s" x1="150" y1="204" x2="150" y2="226" />
            <line className="s" x1="14" y1="270" x2="226" y2="270" />
          </>
        );
      case 1: {
        const circles = [24, 48, 72, 96].map((r, i) => (
          <circle
            key={r}
            className="s"
            cx="120"
            cy="170"
            r={r}
            strokeDasharray={`${60 + i * 40} ${30 + i * 14}`}
          />
        ));
        return (
          <>
            {circles}
            <line className="s" x1="20" y1="170" x2="220" y2="170" />
            <line className="s" x1="120" y1="60" x2="120" y2="280" />
            <circle className="o" cx="172" cy="118" r="11" />
          </>
        );
      }
      case 2: {
        const rects = [];
        for (let i = 0; i < 13; i++) {
          const h = 56 + ((i * 37) % 96);
          rects.push(
            <rect
              key={i}
              className={i === 6 ? 'oa' : 's'}
              x={24 + i * 15}
              y={270 - h}
              width="8"
              height={h}
            />
          );
        }
        return (
          <>
            {rects}
            <line className="s" x1="14" y1="270" x2="226" y2="270" />
            <line className="s" x1="14" y1="86" x2="226" y2="86" />
          </>
        );
      }
      case 3:
        return (
          <>
            <polygon className="s" points="30,270 210,270 120,60" />
            <line className="s" x1="75" y1="165" x2="165" y2="165" />
            <line className="s" x1="30" y1="270" x2="165" y2="165" />
            <line className="s" x1="210" y1="270" x2="75" y2="165" />
            <line className="s" x1="52" y1="217" x2="188" y2="217" />
            <rect className="o" x="108" y="52" width="24" height="16" />
          </>
        );
      case 4:
      default:
        return (
          <>
            {renderCube(120, 70, 34, false)}
            {renderCube(76, 150, 28, true)}
            {renderCube(160, 164, 28, false)}
            {renderCube(118, 214, 22, false)}
          </>
        );
    }
  };

  return (
    <svg
      viewBox="0 0 240 320"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
      className="art-svg"
    >
      {withGrid && <GridLines />}
      {renderArt()}
    </svg>
  );
}
export default DrawingArtwork;
