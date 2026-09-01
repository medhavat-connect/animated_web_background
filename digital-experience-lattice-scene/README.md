# 🌐 Digital Experience Lattice — 3D Interactive Wave Scene

An interactive 3D particle plane and connected commerce mesh simulating responsive digital architecture with real-time cursor proximity displacement and layered wireframe aesthetics.

---

## ✨ Features & Mechanics

- **Interactive Wave Lattice**: Multi-frequency undulating wave plane deformed by a sum of sinusoidal harmonics modulated by elapsed time.
- **Cursor Proximity Displacement**: Real-time vertex repulsion and elevation when hovering over the lattice via Three.js raycasting against a phantom mesh.
- **Layered Wireframe & Point Cloud**: Dual-layered aesthetic combining point grid nodes with glowing structural wireframe lines.
- **Tooltip System**: Interactive hover labels on key lattice nodes identifying digital service zones.

---

## 📐 Core Algorithm

```
Wave Displacement:
  y(x, z, t) = Σ [ amplitude_i × sin(x × freqX_i + t × speed_i)
                              × cos(z × freqZ_i + t × speed_i) ]

Cursor Repulsion:
  displacement += max(0, influenceRadius - dist) × repulsionStrength × normal
  where dist = euclidean(vertex.xz, cursorIntersection.xz)
```

---

## 📂 File Structure

- `index.html` — Standalone experience entry with Library Hub navigation.
- `service-web-scene.js` — Three.js lattice plane geometry, sinusoidal wave deformer, cursor raycasting, tooltip system, and post-processing pipeline.

---

## 🚀 How to Run

Via the Library Hub (recommended):
```bash
npm run dev        # from repo root
# Visit http://localhost:3000/digital-experience-lattice-scene/
```

---

## 📜 Credits & Acknowledgments

- **Three.js WebGL Renderer**: [Three.js](https://threejs.org/) (MIT License © mrdoob and contributors). Vendored copy located in `vendor/three/`.
- **OrbitControls**: From Three.js examples addons (MIT License).
- **UnrealBloomPass**: From the Three.js post-processing examples library (MIT License).
- **Wave Lattice Technique**: Sinusoidal multi-frequency wave deformation of a 3D plane is a classical real-time graphics technique documented extensively in shader and graphics programming literature. No specific third-party implementation was copied.
- **All Scene Implementation Code**: Original work by Medhavat Technologies.

> All custom scene code in this module is original work by Medhavat Technologies. Third-party libraries (Three.js and its post-processing modules) are used under their respective MIT licenses.
