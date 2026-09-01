# 🧲 Magnetic Button Physics Component

Tactile cursor-attraction magnetic buttons powered by a native **Damped Harmonic Oscillator Spring Physics** engine — zero Framer Motion, zero external physics libraries.

---

## ✨ Features & Mechanics

- **Native Spring Differential Physics**: Simulates `F = −k×x − c×v` (k = stiffness, c = damping, m = mass) computed in a fixed-timestep integration loop.
- **Sub-stepped Integration**: 4× sub-stepping per animation frame with hard displacement clamping to eliminate numerical overflow and visual jitter.
- **Zero-Flicker Hit Boundaries**: Expanded virtual hit padding and `pointer-events` isolation for seamless cursor tracking during fast gestures.
- **Active Border Feedback**: Dynamic dashed border ring on `.is-magnetic-active` state for tactile visual confirmation.
- **Configurable Parameters**: Live tweaking for attraction strength, maximum displacement radius, stiffness, damping, and inertia mass.

---

## 📐 Core Algorithm

```
Spring Force:       F = −stiffness × displacement − damping × velocity
Integration Step:   velocity += (F / mass) × dt
                    displacement += velocity × dt
Sub-steps:          4 iterations per rAF frame (dt = frameDelta / 4)
Clamp:              displacement = clamp(displacement, −maxDistance, +maxDistance)
```

---

## 📂 File Structure

- `index.html` — Interactive demo page with multiple button styles and live physics tuning sliders.
- `magnetic-button.js` — `MagneticButton` class: spring physics integrator, pointer capture, and hit boundary logic.
- `main.js` — Demo initialisation and slider bindings.
- `style.css` — Button styles, glassmorphism containers, and active glow states.

---

## 🚀 How to Run

Via the Library Hub (recommended):
```bash
npm run dev              # from repo root
# Visit http://localhost:3000/magnetic-button-app/
```

Standalone:
```bash
npm run magnetic-button  # from repo root, starts on port 5174
```

---

## 📜 Credits & Acknowledgments

- **Design Concept Inspiration**: The visual concept of a magnetically-attracted UI button was inspired by the [Aceternity UI Magnetic Button component](https://ui.aceternity.com/components/magnetic-button) (MIT-licensed Tailwind/Framer Motion library). The implementation in this library is an **independent, ground-up reimplementation** in vanilla ES6 JavaScript using a custom physics integrator — no Aceternity source code, no Framer Motion, and no Tailwind CSS were used or copied.
- **Damped Harmonic Oscillator Physics**: Classical physics formulation universally documented in engineering and game development literature. The specific sub-stepped integration approach is original to Medhavat Technologies.
- **Canvas / DOM Rendering**: Uses native CSS transforms and pointer events. No third-party UI or animation libraries.
- **All Implementation Code**: Original work by Medhavat Technologies.

> **Legal Note**: Aceternity UI and its component designs are the intellectual property of their respective owners. This implementation shares only a visual interaction concept — it contains no copied code, no derivative source files, and no extracted assets from any external product.
