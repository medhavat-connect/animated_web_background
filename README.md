# 🎨 Medhavat Technologies — Reusable Animated Components & 3D WebGL Effects

A centralized, production-grade library of interactive visual effects, physics-based UI components, and 3D WebGL scenes developed for the **Medhavat** digital platform.

---

## 👥 Maintainers

This repository is maintained by:

| Name | Email |
|---|---|
| **Amit Deokar** | [amit.mdeokar@gmail.com](mailto:amit.mdeokar@gmail.com) |
| **Wasim Ansari** | [wsmaisys@gmail.com](mailto:wsmaisys@gmail.com) |

> Any conflict of interest, structural disagreement, or critical issue with this library must be communicated **directly and immediately** to both maintainers.

---

## 🚀 Quick Start

Run the entire library showcase hub on port 3000:

```bash
npm install
npm run dev
```

Visit **`http://localhost:3000/`** to view the interactive Showcase Hub with tiles for each animation element and direct links to all dedicated experiences.

---

## 📦 Directory of Components & Animations

| Component / Scene | Route / Directory | Technology | Description |
| :--- | :--- | :--- | :--- |
| **🎬 Cyber Frame 240** | [`/cyber-frame-app/`](./cyber-frame-app/) | Canvas 2D, 240 JPG frames | 30 FPS scroll-scrubbed video frame sequence with interactive HUD scrubber and Web Audio synth. |
| **🪼 Aurelia 3D Jellyfish** | [`/jellyfish-simulation-app/`](./jellyfish-simulation-app/) | Three.js, TSL Shaders, Tweakpane | Procedural 3D jellyfish with Verlet tentacle physics, TSL thin-film iridescence, and bioluminescent organs. |
| **🌊 Cursor Wave Matrix** | [`/cursor-wave-app/`](./cursor-wave-app/) | HTML5 Canvas 2D, JS | Interactive vector grid matrix that swells, rotates, and ripples with cursor movement and shockwaves. |
| **🧲 Magnetic Button Physics** | [`/magnetic-button-app/`](./magnetic-button-app/) | CSS, JS Spring Physics | Tactile cursor-attraction buttons driven by a damped harmonic oscillator physics engine ($F = -kx - cv$). |
| **🌌 Crystalline Bloom Portal** | [`/bloom-portal-scene/`](./bloom-portal-scene/) | Three.js, UnrealBloomPass | Dual vortex energy portal with particle filaments and real-time HDR bloom post-processing. |
| **🌍 3D Country Boundary Globe** | [`/interactive-globe-scene/`](./interactive-globe-scene/) | Three.js, GeoJSON GIS | Interactive 3D globe with GeoJSON country borders, gyroscopic momentum physics, and flight arcs. |
| **🧠 Neural Network AI Mesh** | [`/neural-network-ai-scene/`](./neural-network-ai-scene/) | Three.js, WebGL | Dynamic synaptic neural graph with traveling signal pulses, activation clusters, and bloom. |
| **🌐 Digital Experience Lattice** | [`/digital-experience-lattice-scene/`](./digital-experience-lattice-scene/) | Three.js, Shaders | Undulating 3D wave plane with mouse raycast proximity displacement and interactive tooltips. |
| **✨ Deep Space Nebula** | [`/space-nebula-scene/`](./space-nebula-scene/) | Three.js Particle System | 60 FPS lightweight volumetric starfield, concentric orbit rings, and drift kinetics. |
| **📜 Scroll Camera Controller** | [`/scroll-camera-controller/`](./scroll-camera-controller/) | JS Timeline Interpolation | Maps viewport scroll progression to 3D camera matrices and scene transitions without jitter. |

---

## 🛠️ Shared Assets & Architecture

- **`vendor/three/`**: Shared Three.js core modules, controls (`OrbitControls`), and post-processing passes (`EffectComposer`, `UnrealBloomPass`, `OutputPass`, `RenderPass`).
- **`public/`**: Shared static resources including 240 sequence frames, `world-countries.geojson`, and manifest definitions.
- **`src/hub.js` & `src/hub.css`**: Showcase Hub engine with real-time category filtering, search, and specification dialogs.

---

## 🤝 Contributing & Library Maintenance

> Before adding a new element or modifying existing structure, **read the contributing guide first.**

- **[`CONTRIBUTING.md`](./CONTRIBUTING.md)** — Full rules for adding new elements, naming conventions, hub registration steps, and the pre-commit checklist.
- **[`.agents/rules/library-maintenance.md`](./.agents/rules/library-maintenance.md)** — Quick-reference enforcement rules automatically loaded by AI coding assistants.

**The two most critical steps when adding any new element:**
1. Add an entry to the `ELEMENTS` array in [`src/hub.js`](./src/hub.js)
2. Add the `index.html` entry point to `rollupOptions.input` in [`vite.config.js`](./vite.config.js)


