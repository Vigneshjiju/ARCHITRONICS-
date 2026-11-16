# Architronics — React Architecture & Spatial Design Portfolio

A high-fidelity, interactive React.js web application built for **Architronics** (*"Architecture | Interiors | Spatial Things"*).

---

## ⚡ Quick Start

```bash
# Install dependencies (already installed)
npm install

# Start local development server
npm run dev

# Create production build
npm run build

# Preview production build
npm run preview
```

---

## 🏗️ Architecture & Component Hierarchy

```
src/
├── components/
│   ├── Canvas3D.jsx         # Three.js 3D brutalist corridor, lighting, portals & interactive AT monogram
│   ├── CustomCursor.jsx     # Architectural drafting reticle cursor with inertia lerp & contextual modes
│   ├── DrawingArtwork.jsx   # Procedural SVG architectural plates, plans, sections & isometric cubes
│   ├── HUD.jsx              # Technical telemetry HUD (Cam X/Y/Z, Travel %, drag hints)
│   ├── IntroLoader.jsx      # Monogram assembly animation & digital counter (000–100)
│   ├── Menu.jsx             # 5-slab rising architectural fullscreen navigation overlay
│   ├── Navigation.jsx       # Floating adaptive header with section coordinate tracking (e.g. 01 / 07)
│   ├── ProjectDeck.jsx      # Overlapping fanned architectural drawing boards with hover lift
│   └── SlabWipe.jsx         # Architectural slab wipe transition between views
├── data/
│   └── projectsData.js      # Project catalog data and technical specifications
├── styles/
│   └── index.css            # Complete design system tokens, typography, animations & media queries
├── views/
│   ├── DirectionBoardView.jsx # Brand identity board, color swatches, typography specs & cursor demos
│   ├── HomeView.jsx           # Main experience (Hero, Studio Parallax, Deck, Services, Philosophy, About, Contact)
│   ├── ProjectView.jsx        # Project dossier template (Facts table, Drawing sets, Gallery)
│   └── StubView.jsx           # Section sub-page stubs
├── App.jsx                  # Main view router, scroll tracking, light/dark tone detection
└── main.jsx                 # Application entrypoint & motion preference initializer
```

---

## 🎨 UI/UX Features Preserved in React

1. **3D Scroll Corridor**: Camera moves down a concrete brutalist corridor based on scroll percentage.
2. **Interactive AT Gateway**: Monogram tilts with mouse tracking; click disassembles/explodes the geometric slabs.
3. **Custom Drafting Cursor**: Morphs between 7 contextual modes (`SELECT`, `EXPLORE ↗`, `DRAG`, `LINK`, `BUTTON`) with inertia physics.
4. **Adaptive Tone Switching**: Custom cursor and floating navigation auto-invert contrast when crossing the paper-white Services section.
5. **Architectural Fanned Deck**: 3D overlapping project drawing cards with material finish chips, registration crosshairs, and slide-up detail drawers.
6. **Slab Wipe Transitions**: Transitions between views using vertical architectural slab wipes.
7. **Accessibility**: Full keyboard navigation, ESC handlers, touch/mobile fallback, and `prefers-reduced-motion` compliance.
