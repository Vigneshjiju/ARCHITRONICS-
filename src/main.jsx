import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';

// Initialize motion classes
try {
  const d = document.documentElement;
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    d.classList.add('anim');
  }
} catch (e) {
  // Graceful fallback
}

// Render without StrictMode double-mount for stable WebGL context lifecycle
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
