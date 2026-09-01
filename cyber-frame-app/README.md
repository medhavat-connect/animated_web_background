# 🎬 Cyber Frame 240 — Scroll-Driven Animation Sequence

A high-performance scroll-driven video frame sequence engine that decodes and scrubs 240 high-definition anime-style frames directly in GPU canvas memory with zero-latency preloading and an interactive HUD scrubber.

---

## ✨ Features & Mechanics

- **240-Frame GPU Canvas Memory Cache**: All frames preloaded into `Image` objects in browser memory before the scroll experience begins — zero decode lag on scrub.
- **Scroll-to-Frame Index Normalization**: Maps raw `window.scrollY` offset into a normalised `[0, 1]` progress value, then directly to a discrete frame index.
- **DPR-Aware Dual-Pass Scaling**: Renders at full device pixel ratio (up to 4K retina) using a two-pass canvas blit for pixel-perfect crispness on high-DPI screens.
- **Interactive HUD Scrubber**: A dedicated control track for bidirectional lerp-interpolated frame stepping.
- **Web Audio API Ambient Synthesizer**: Integrated ambient sound synthesis driven by scroll velocity.

---

## 📐 Core Algorithm

```
Frame Index = Math.floor(ScrollProgress × TotalFrames)
ScrollProgress = clamp((scrollY - sectionTop) / sectionHeight, 0, 1)
```

---

## 📂 File Structure

- `index.html` — Standalone experience entry with Library Hub navigation.
- `src/heroSequence.js` (root `src/`) — `ScrollSequenceEngine` class: frame preloader, RAF loop, resize handler, and DPR scaling logic.

---

## 🚀 How to Run

Via the Library Hub (recommended):
```bash
npm run dev        # from repo root
# Visit http://localhost:3000/cyber-frame-app/
```

---

## 📜 Credits & Acknowledgments

- **Animation Frames**: Sequence frames are proprietary digital art assets created for Medhavat Technologies. All rights reserved.
- **Canvas 2D Rendering**: Uses the native [HTML5 Canvas 2D API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API). No third-party rendering libraries.
- **Scroll Sequencing Technique**: Original implementation by Medhavat Technologies, engineered from first principles using the standard `IntersectionObserver` + `scroll` event pattern widely documented in the web development community.
- **Engine**: [Three.js](https://threejs.org/) is not used in this element — pure Canvas 2D only.

> All code in this module is original work by Medhavat Technologies unless otherwise stated.
