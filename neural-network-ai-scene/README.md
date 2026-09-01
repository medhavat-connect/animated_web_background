# 🧠 Neural Network AI — Synaptic Graph 3D Scene

An interactive 3D WebGL graph visualization representing neural networks, deep learning decision pathways, and synaptic data exchange with traveling signal pulses.

---

## ✨ Features & Mechanics

- **Dynamic Synaptic Graph**: Procedural network graph with weighted vertex nodes and interconnected synaptic transmission lines rendered as `LineSegments`.
- **Traveling Data Pulses**: High-speed glowing particle packets propagating through network nodes along activation paths using parametric interpolation.
- **Interactive Orbit & Damping**: Smooth `OrbitControls` with subtle auto-rotation and interactive node hover magnification via raycasting.
- **HDR Bloom Integration**: Selective `UnrealBloomPass` highlighting activated synaptic clusters with high-contrast luminance glow.

---

## 📐 Core Algorithm

```
Node Activation Pulse Position:
  P(t) = lerp(nodeA.position, nodeB.position, t)
  where t = (elapsedTime % pulseDuration) / pulseDuration

Procedural Graph Layout:
  Nodes distributed by spherical Fibonacci lattice for uniform coverage
  Edge weight ∝ 1 / euclidean_distance(nodeA, nodeB)
```

---

## 📂 File Structure

- `index.html` — Standalone experience entry with Library Hub navigation.
- `service-ai-scene.js` — Three.js neural mesh generator: graph topology builder, pulse animator, vertex buffer logic, and post-processing setup.

---

## 🚀 How to Run

Via the Library Hub (recommended):
```bash
npm run dev        # from repo root
# Visit http://localhost:3000/neural-network-ai-scene/
```

---

## 📜 Credits & Acknowledgments

- **Three.js WebGL Renderer**: [Three.js](https://threejs.org/) (MIT License © mrdoob and contributors). Vendored copy located in `vendor/three/`.
- **OrbitControls**: From Three.js examples addons (MIT License).
- **UnrealBloomPass**: From the Three.js post-processing examples library (MIT License).
- **Neural Graph Visualization Concept**: The general concept of 3D interactive neural network graph visualization is a widely used technique in data visualization and educational software. No specific third-party implementation was copied or derived.
- **All Scene Implementation Code**: Original work by Medhavat Technologies.

> All custom scene code in this module is original work by Medhavat Technologies. Third-party libraries (Three.js and its post-processing modules) are used under their respective MIT licenses.
