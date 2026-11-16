import React, { useState, useEffect, useCallback, Component } from 'react';
import Canvas3D from './components/Canvas3D';
import CustomCursor from './components/CustomCursor';
import Navigation from './components/Navigation';
import Menu from './components/Menu';
import SlabWipe from './components/SlabWipe';

import HomeView from './views/HomeView';
import ProjectView from './views/ProjectView';
import StubView from './views/StubView';
import DirectionBoardView from './views/DirectionBoardView';

const SECTION_IDS = ['hero', 'studio', 'projects', 'services', 'philosophy', 'about', 'contact'];
const SECTION_NAMES = ['Opening', 'Studio', 'Projects', 'Services', 'Philosophy', 'About', 'Contact'];

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Architronics Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 40, color: '#FF4D00', background: '#0E0E0F', minHeight: '100vh', fontFamily: 'monospace' }}>
          <h2>Application Notice</h2>
          <p style={{ color: '#F2EFEA', marginTop: 10 }}>{this.state.error?.toString()}</p>
          <button
            style={{ marginTop: 20, padding: '10px 20px', background: '#FF4D00', color: '#121214', border: 0, cursor: 'pointer', fontWeight: 600 }}
            onClick={() => window.location.reload()}
          >
            Reload Experience
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [currentHash, setCurrentHash] = useState('');
  const [selectedProjectId, setSelectedProjectId] = useState(1);
  const [wipeState, setWipeState] = useState('');

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSecIndex, setCurrentSecIndex] = useState(0);
  const [isNavLight, setIsNavLight] = useState(false);

  const [isHovering3D, setIsHovering3D] = useState(false);
  const [isDragging3D, setIsDragging3D] = useState(false);

  // Parse view from URL hash
  const parseRoute = useCallback((hashStr) => {
    const clean = hashStr.replace('#', '');
    if (clean === 'direction') {
      return { view: 'direction', hash: 'direction' };
    }
    const projMatch = clean.match(/^project-(\d+)$/);
    if (projMatch) {
      return { view: 'project', hash: clean, projectId: parseInt(projMatch[1], 10) };
    }
    if (/^(projects|about|services|contact)-page$/.test(clean)) {
      return { view: 'stub', hash: clean };
    }
    return { view: 'home', hash: clean || 'top' };
  }, []);

  const navigateTo = useCallback(
    (targetView, targetHash) => {
      const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

      const performNav = () => {
        setCurrentView(targetView);
        setCurrentHash(targetHash);
        document.body.setAttribute('data-view', targetView);

        if (targetView === 'project') {
          const id = parseInt(targetHash.replace('project-', ''), 10) || 1;
          setSelectedProjectId(id);
        }

        window.location.hash = targetHash;

        if (targetView === 'home' && targetHash && targetHash !== 'top') {
          const el = document.getElementById(targetHash);
          if (el) {
            el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
            return;
          }
        }
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      };

      if (reduce || targetView === currentView) {
        performNav();
        return;
      }

      setWipeState('in');
      setTimeout(() => {
        performNav();
        setWipeState('out');
        setTimeout(() => {
          setWipeState('');
        }, 650);
      }, 520);
    },
    [currentView]
  );

  // Sync with browser hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const { view, hash, projectId } = parseRoute(window.location.hash);
      if (projectId) setSelectedProjectId(projectId);
      setCurrentView(view);
      setCurrentHash(hash);
      document.body.setAttribute('data-view', view);
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [parseRoute]);

  // Section Tracking & Tone Observation on Home View
  useEffect(() => {
    if (currentView !== 'home') return;

    const handleScroll = () => {
      let activeIndex = 0;
      SECTION_IDS.forEach((id, idx) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.5) {
          activeIndex = idx;
        }
      });
      setCurrentSecIndex(activeIndex);

      const servicesEl = document.getElementById('services');
      if (servicesEl) {
        const sr = servicesEl.getBoundingClientRect();
        setIsNavLight(sr.top < 70 && sr.bottom > 70);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  // Scroll Reveal Animations
  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('pre');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    const elements = document.querySelectorAll(
      '.svc li, .tile, .founder, .about .two > div, .c-det > div, .sec-head'
    );
    elements.forEach((el) => {
      el.classList.add('rv');
      const r = el.getBoundingClientRect();
      if (r.top > window.innerHeight * 0.95) {
        el.classList.add('pre');
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [currentView]);

  return (
    <ErrorBoundary>
      <div className="app-root">
        <a
          className="skip"
          href="#main-content"
          onClick={(e) => {
            e.preventDefault();
            const target = document.querySelector('main:not([hidden])');
            if (target) {
              target.setAttribute('tabindex', '-1');
              target.focus();
            }
          }}
        >
          Skip to content
        </a>

        {/* 3D Three.js WebGL Scene Canvas */}
        <Canvas3D
          isHome={currentView === 'home'}
          onHoverObjectChange={setIsHovering3D}
          onDragStateChange={setIsDragging3D}
        />

        {/* Wipe Transition Slabs */}
        <SlabWipe state={wipeState} />

        {/* Custom Drafting Instrument Cursor */}
        <CustomCursor
          isHovering3D={isHovering3D}
          isDragging3D={isDragging3D}
        />

        {/* Top Floating Adaptive Navigation */}
        <Navigation
          currentSectionIndex={currentSecIndex}
          currentSectionName={SECTION_NAMES[currentSecIndex]}
          totalSections={SECTION_NAMES.length}
          isLight={isNavLight}
          onOpenMenu={() => setIsMenuOpen(true)}
          onNavigate={navigateTo}
        />

        {/* Fullscreen Architectural Menu */}
        <Menu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          currentSectionIndex={currentSecIndex}
          currentView={currentView}
          onNavigate={navigateTo}
        />

        {/* Dynamic View Switcher */}
        {currentView === 'home' && <HomeView onNavigate={navigateTo} />}
        {currentView === 'project' && (
          <ProjectView projectId={selectedProjectId} onNavigate={navigateTo} />
        )}
        {currentView === 'stub' && (
          <StubView hash={currentHash} onNavigate={navigateTo} />
        )}
        {currentView === 'direction' && (
          <DirectionBoardView onNavigate={navigateTo} />
        )}
      </div>
    </ErrorBoundary>
  );
}
