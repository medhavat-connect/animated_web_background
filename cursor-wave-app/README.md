# 🌊 Cursor Wave Grid Matrix Animation

An interactive 2D grid matrix of web development and technology icons that dynamically swell, rotate, and ripple in response to mouse movement and click shockwaves.

---

## ✨ Features & Mechanics

- **Native Vector Icons**: Drawn with pure HTML5 Canvas 2D vector path commands — code brackets, database, gear, rocket, terminal, atom, and more. No SVG overhead.
- **Smoothstep Distance Falloff**: `f(t) = t² × (3 - 2t)` falloff curve governing proximity attraction with configurable attack and release timing.
- **Click Shockwaves**: High-frequency sinusoidal radial ripple waves expanding outward from any click or trigger point at configurable speed.
- **Selective Element Masking**: Automatically detects and masks grid nodes underneath `[data-cursor-wave-mask]` elements for optimal reading contrast.
- **Dynamic Color Presets**: Supports themes including Cyberpunk Neon, Emerald Aurora, Sunset Glow, Minimal Gold, and Deep Space Monochrome.

---

## 📐 Core Algorithm

```
Proximity Attraction: f(t) = t² × (3 - 2t)
  where t = clamp(1 - distance / influenceRadius, 0, 1)

Shockwave Ring Influence: sin((dist - burstRadius) × freq) × falloff
  where falloff = max(0, 1 - |dist - burstRadius| / burstThickness)
```

---

## 📂 File Structure

- `index.html` — Standalone interactive demo with preview cards and theme controls.
- `cursor-wave.js` — Core `CursorWave` animation engine: distance math, icon path definitions, shockwave system, and resize handling.
- `main.js` — UI controller: theme toggle, mask observer initialisation.
- `style.css` — Dark mode styling and glassmorphism cards.

---

## 🚀 How to Run

Via the Library Hub (recommended):
```bash
npm run dev        # from repo root
# Visit http://localhost:3000/cursor-wave-app/
```

Standalone:
```bash
npm run cursor-wave   # from repo root, starts on port 5173
```

---

## 📜 Credits & Acknowledgments

- **Design Concept Inspiration**: The visual concept of an interactive cursor-reactive icon grid was inspired by [React Bits Pro Cursor Wave component](https://pro.reactbits.dev/docs/components/cursor-wave) (commercial UI library by React Bits). The implementation in this library is an **independent, ground-up reimplementation** in vanilla ES6 JavaScript — no React Bits source code, libraries, or assets were copied or derived. Only the general visual interaction concept served as a reference.
- **Canvas 2D Rendering**: Uses the native [HTML5 Canvas 2D API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API). No third-party rendering libraries.
- **Smoothstep Algorithm**: Classic computer graphics technique well-documented in [The Book of Shaders](https://thebookofshaders.com/glossary/?search=smoothstep) and Ken Perlin's original work. No specific code was copied.
- **All Implementation Code**: Original work by Medhavat Technologies.

> **Legal Note**: The React Bits Pro brand and component designs are the intellectual property of their respective owners. This implementation shares only a visual interaction concept — it contains no copied code, no derivative source files, and no extracted assets from any commercial product.
