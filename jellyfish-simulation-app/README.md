# 🪼 Photorealistic Jellyfish Shader Simulation

A real-time, procedurally generated 3D jellyfish (*Aurelia aurita*) simulation with high physical fidelity, TSL (Three Shading Language) shaders, and real-time Tweakpane parameter controls.

---

## ✨ Features & Mechanics

- **Procedural Parametric Bell**: High-resolution exumbrella & subumbrella dual-layer hemisphere deformed in real-time by a rhythmic hydrodynamic pulse wave with 16 marginal lappet rim ripples.
- **Bioluminescent Gastric Organs**: Internal 4-leaf clover / horseshoe gonad pouches and 16 radial canals glowing with pulse-synchronized emission.
- **Undulating Frilled Oral Arms**: 4 central ribbons with multi-frequency procedural wave turbulence and bioluminescent edge highlights.
- **Verlet Physics Trailing Tentacles**: 32 trailing marginal tentacles simulated via damped particle-spring chains responding to fluid drag, buoyancy, and swimming inertia.
- **TSL & Thin-Film Optical Shaders**: Thin-film Fresnel iridescence, Dave Hoskins procedural water caustics, and subsurface scattering translucency.
- **Interactive Tweakpane UI**: Live controls for pulse frequency, swimming velocity, tentacle drag, lighting color themes, and school count.

---

## 📂 File Structure

- `index.html` — Entry point and viewport container.
- `index.js` — Main engine orchestrator, Three.js WebGPU/WebGL renderer setup, Tweakpane initialization.
- `src/` — Custom TSL shaders, procedural geometry generators, Verlet physics chains, material nodes, and lighting models.
- `package.json` & `vite.config.js` — Dependencies and TSL operator plugin.

---

## 🚀 How to Run

Run as part of the Medhavat Animation Library on port 3000:
```bash
npm run dev
# Visit http://localhost:3000/jellyfish-simulation-app/
```

Or run standalone:
```bash
npm run jellyfish
# Starts standalone server on port 5175
```

---

## 📜 Credits & Acknowledgments

- **Original Aurelia Experiment**: Procedural jellyfish simulation and WebGPU TSL architecture by [Holtsetio (holtsetio.com)](https://holtsetio.com) — [GitHub Repository: holtsetio/aurelia](https://github.com/holtsetio/aurelia).
- **Procedural Water Caustics**: Procedural water caustic functions based on [Shadertoy (MdKXDm)](https://www.shadertoy.com/view/MdKXDm) by **Dave Hoskins**.
- **Inspiration**: Inspired by **Aki Rodić's** legendary [WebGL Jellyfish Demo](https://akirodic.com/p/jellyfish/).
- **Engine**: Built with [Three.js](https://threejs.org/) and Three Shading Language (TSL).
