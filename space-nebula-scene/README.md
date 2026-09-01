# 🌌 Deep Space Nebula & Particle System

A high-performance WebGL deep space particle field designed for cloud infrastructure and engineering platform themes, maintaining 60 FPS on both desktop and mobile devices.

---

## ✨ Features & Mechanics

- **Volumetric Starfield**: Thousands of multi-coloured stellar particles distributed in a 3D bounding volume with realistic depth perspective scaling.
- **Drift & Warp Kinetics**: Smooth continuous camera-relative drift through the particle nebula simulating deep space travel.
- **Concentric Orbit Rings**: Multiple thin `RingGeometry` planes rotating at different speeds and inclinations.
- **Zero Heavy Overheads**: Optimised `BufferGeometry` + `Points` particle buffers maintaining 60 FPS on mobile and low-power devices.

---

## 📐 Core Algorithm

```
Particle Distribution: Random spherical volume sampling
  x = (Math.random() - 0.5) × spread
  y = (Math.random() - 0.5) × spread
  z = (Math.random() - 0.5) × spread

Drift Motion:
  particle.z += driftSpeed × delta
  if (particle.z > cameraFar) particle.z -= totalDepth
```

---

## 📂 File Structure

- `index.html` — Standalone experience entry with Library Hub navigation.
- `service-space-scene.js` — Three.js particle buffer implementation, ring geometry setup, and kinetic animation loop. Exports a `startSpaceScene()` factory function.

---

## 🚀 How to Run

Via the Library Hub (recommended):
```bash
npm run dev        # from repo root
# Visit http://localhost:3000/space-nebula-scene/
```

---

## 📜 Credits & Acknowledgments

- **Three.js WebGL Renderer**: [Three.js](https://threejs.org/) (MIT License © mrdoob and contributors). Vendored copy located in `vendor/three/`.
- **UnrealBloomPass**: From the Three.js post-processing examples library (MIT License).
- **Deep Space Visual Concept**: The general concept of a particle-based starfield / nebula visualization is a universal real-time graphics technique. No specific third-party implementation was copied or derived.
- **All Scene Implementation Code**: Original work by Medhavat Technologies.

> All custom scene code in this module is original work by Medhavat Technologies. Third-party libraries (Three.js and its post-processing modules) are used under their respective MIT licenses.
