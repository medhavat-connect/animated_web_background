# ⚡ Interactive Web UI Components & Canvas Effects

A high-performance collection of zero-dependency interactive background effects and tactile UI components built with native **HTML5 Canvas 2D API**, **Vanilla ES6 JavaScript**, and **Glassmorphism CSS**.

---

## 🚀 Projects Included

### 1. 🌊 **Cursor Wave Application** (`cursor-wave-app/`)
Inspired by *React Bits Pro*. An interactive 2D grid matrix of web development icons that swell, rotate, and ripple in response to mouse motion and click events.

- **Native Web Dev Icons**: Drawn using pure HTML5 2D vector paths (`code`, `braces`, `terminal`, `layers`, `atom`, `database`, `gear`, `rocket`, `box`, `bug`).
- **Smoothstep Distance Easing**: $f(t) = t^2(3-2t)$ falloff math with configurable attack & release time constants.
- **Radial Click Shockwaves**: Sinusoidal ripple expansion wave ($u = \sin(\pi c)$) on click or trigger.
- **Element Masking (`[data-cursor-wave-mask]`)**: Hides shapes under frosted Glassmorphism UI tiles for text contrast.
- **Theme Presets**: Cyberpunk Neon, Emerald Aurora, Sunset Glow, Minimal Gold, and Deep Space Monochrome.

---

### 2. 🧲 **Magnetic Button Application** (`magnetic-button-app/`)
Inspired by *Aceternity UI*. Tactile cursor-attraction magnetic buttons powered by a native **Damped Harmonic Oscillator Spring Physics** engine.

- **Spring Differential Physics**: Simulates $F = -k \cdot x - c \cdot v$ ($k = \text{stiffness}$, $c = \text{damping}$, $m = \text{mass}$) without Framer Motion or external physics libraries.
- **Sub-stepped Integration**: 4× sub-stepping per frame step with hard position clamping to prevent numerical explosions.
- **Zero-Flicker Hit Areas**: Expanded hit padding and pointer-events isolation for smooth, shake-free tracking.
- **Active Outlines**: Aceternity UI-style active dashed border ring (`.is-magnetic-active`).
- **Live Physics Tuning**: Interactive controls to adjust attraction strength, max distance, stiffness, and damping.

---

## 🛠️ Tech Stack & Philosophy

- **Core**: HTML5, ES6 JavaScript, Vanilla CSS.
- **Zero Dependencies**: 0 npm runtime dependencies, 0 CDN links, 0 external font files.
- **High Performance**: Optimized for 60 FPS using `requestAnimationFrame`, High-DPI scaling (`devicePixelRatio`), and `ResizeObserver`.

---

## 📦 Project Structure

```
.
├── cursor-wave-app/          # Standalone Cursor Wave App
│   ├── index.html            # Main HTML layout & control drawer
│   ├── cursor-wave.js        # Canvas 2D CursorWave Engine
│   ├── style.css             # Glassmorphic CSS design system
│   └── main.js               # App controller & preset logic
│
├── magnetic-button-app/      # Standalone Magnetic Button App
│   ├── index.html            # Showcase layout & physics sliders
│   ├── magnetic-button.js    # Damped Spring Physics Class
│   ├── style.css             # Glassmorphism & active outline styles
│   └── main.js               # Physics slider controller
│
├── .gitignore                # Git ignore rules
└── README.md                 # Project documentation
```

---

## ⚡ Quick Start & Development

### Prerequisite
Make sure [Node.js](https://nodejs.org/) is installed on your machine.

### Running Applications Locally

#### Run Cursor Wave:
```bash
npx vite cursor-wave-app --port 5173
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

#### Run Magnetic Button:
```bash
npx vite magnetic-button-app --port 5174
```
Open [http://localhost:5174](http://localhost:5174) in your browser.

---

## 📄 License
MIT License. Created for production-ready interactive web application experiences.
