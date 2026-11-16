import React, { useState, useEffect } from 'react';

export default function IntroLoader({ onFinish }) {
  const [count, setCount] = useState(0);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const startTime = performance.now();
    const duration = 1900;
    let animFrameId;

    const tick = (now) => {
      const progress = Math.min(1, (now - startTime) / duration);
      setCount(Math.round(progress * 100));
      if (progress < 1) {
        animFrameId = requestAnimationFrame(tick);
      }
    };
    animFrameId = requestAnimationFrame(tick);

    const timer = setTimeout(() => {
      handleClose();
    }, 2100);

    return () => {
      cancelAnimationFrame(animFrameId);
      clearTimeout(timer);
    };
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      if (onFinish) onFinish();
    }, 950);
  };

  return (
    <div
      id="intro"
      className={`intro ${isClosing ? 'out' : ''}`}
      role="dialog"
      aria-label="Loading Architronics"
    >
      <div className="intro-in">
        <svg className="mk" viewBox="140 620 1650 700" aria-hidden="true">
          <polygon className="p p1" fill="#F2EFEA" points="486,1146 790,638 790,773 568,1146" />
          <polygon className="p p2" fill="#F2EFEA" points="790,638 1095,1146 1013,1146 790,773" />
          <rect className="p p3" fill="#F2EFEA" x="1027" y="787" width="419" height="59" />
          <rect className="p p4" fill="#F2EFEA" x="1207" y="899" width="59" height="397" />
          <rect className="dsh l" fill="#FF4D00" x="148" y="958" width="182" height="18" />
          <rect className="dsh r" fill="#FF4D00" x="1602" y="958" width="182" height="18" />
        </svg>
        <div className="wm">
          <svg viewBox="115 824 70 102" aria-hidden="true">
            <polygon className="a1" points="133,828 140,828 180,922 167,922 133,840" />
            <polygon className="a2" points="119,880 131,876 131,903 119,908" />
          </svg>
          <span>RCHITRONICS</span>
        </div>
        <div className="tag mono">Architecture | Interiors | Spatial Things</div>
        <div className="ct mono" id="ct">
          {('00' + count).slice(-3)}
        </div>
      </div>
      <button className="skipbtn" type="button" onClick={handleClose}>
        Skip intro
      </button>
    </div>
  );
}
