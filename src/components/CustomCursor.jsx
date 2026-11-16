import React, { useEffect, useRef, useState } from 'react';

const LABELS = {
  card: 'EXPLORE ↗',
  target: 'SELECT',
  drag: '◂ DRAG ▸',
  ext: '↗'
};

export default function CustomCursor({ isHovering3D = false, isDragging3D = false }) {
  const [mode, setMode] = useState('default');
  const [tone, setTone] = useState('dark');
  const [isActive, setIsActive] = useState(false);
  const [isDown, setIsDown] = useState(false);

  const curFRef = useRef(null);
  const curDRef = useRef(null);

  const hoverRef = useRef(isHovering3D);
  hoverRef.current = isHovering3D;

  const dragRef = useRef(isDragging3D);
  dragRef.current = isDragging3D;

  const posRef = useRef({ px: -100, py: -100, fx: -100, fy: -100 });
  const animFrameRef = useRef(null);

  useEffect(() => {
    const isTouch = matchMedia('(hover: none)').matches;
    const isFine = matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (isTouch || !isFine) return;

    document.documentElement.classList.add('cc');
    setIsActive(true);

    const onPointerMove = (e) => {
      if (e.pointerType !== 'mouse') {
        setIsActive(false);
        document.documentElement.classList.remove('cc');
        return;
      }

      posRef.current.px = e.clientX;
      posRef.current.py = e.clientY;

      const target = e.target;
      if (!target || !target.closest) return;

      const lightSection = target.closest('.services') || (target.closest('#nav') && document.querySelector('#nav.light'));
      setTone(lightSection ? 'light' : 'dark');

      if (target.closest('input, textarea, select, [contenteditable="true"]')) {
        setMode('native');
      } else if (target.closest('.card-a')) {
        setMode('card');
      } else if (target.closest('a[target="_blank"]')) {
        setMode('ext');
      } else if (target.closest('button, .btn, [role="button"], summary')) {
        setMode('button');
      } else if (target.closest('a')) {
        setMode('link');
      } else if (hoverRef.current) {
        setMode('target');
      } else if (dragRef.current || target.closest('#hero')) {
        setMode('drag');
      } else {
        setMode('default');
      }
    };

    const onPointerDown = (e) => {
      if (e.pointerType === 'mouse') setIsDown(true);
    };

    const onPointerUp = () => setIsDown(false);
    const onMouseLeave = () => setIsActive(false);
    const onMouseEnter = () => setIsActive(true);

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);
    document.documentElement.addEventListener('mouseleave', onMouseLeave);
    document.documentElement.addEventListener('mouseenter', onMouseEnter);

    const renderLoop = () => {
      const { px, py } = posRef.current;
      posRef.current.fx += (px - posRef.current.fx) * 0.24;
      posRef.current.fy += (py - posRef.current.fy) * 0.24;

      if (curFRef.current) {
        curFRef.current.style.transform = `translate3d(${posRef.current.fx.toFixed(1)}px, ${posRef.current.fy.toFixed(1)}px, 0)`;
      }
      if (curDRef.current) {
        curDRef.current.style.transform = `translate3d(${px.toFixed(1)}px, ${py.toFixed(1)}px, 0)`;
      }

      animFrameRef.current = requestAnimationFrame(renderLoop);
    };
    animFrameRef.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      document.documentElement.removeEventListener('mouseenter', onMouseEnter);
      document.documentElement.classList.remove('cc');
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []); // Run ONCE on mount

  const effectiveMode = isHovering3D ? 'target' : isDragging3D ? 'drag' : mode;

  return (
    <div
      className={`cx ${isActive ? 'on' : ''} ${isDown ? 'down' : ''}`}
      id="cur"
      data-mode={effectiveMode}
      data-tone={tone}
      aria-hidden="true"
    >
      <div id="cur-f" ref={curFRef}>
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
          <span className="cx-lab mono">{LABELS[effectiveMode] || ''}</span>
        </div>
      </div>
      <div id="cur-d" ref={curDRef}>
        <i className="cx-dot"></i>
      </div>
    </div>
  );
}
