# 🌍 Interactive 3D Country Boundary Globe

A WebGL 3D globe with vector country boundaries parsed live from GeoJSON, animated international location hubs, gyroscopic inertia momentum rings, and quadratic Bezier arc routes.

---

## ✨ Features & Mechanics

- **GeoJSON Country Borders**: Parses `world-countries.geojson` coordinates into continuous 3D spherical `LineSegments` geometries using spherical coordinate projection.
- **Gyroscopic Inertia Physics**: Realistic rotational momentum and angular drag responding to drag and pointer inputs — simulates ring inertia and precession.
- **Animated Global Flight Arcs**: 3D quadratic Bezier curve routes connecting international technology hubs with traveling energy pulse particles.
- **Pulsing Hub Rings**: Spherical latitude/longitude coordinate projection with animated pulsing halo beacon shaders.

---

## 📐 Core Algorithm

```
Spherical Coordinate Projection:
  x = radius × cos(lat) × sin(lon)
  y = radius × sin(lat)
  z = radius × cos(lat) × cos(lon)

Quadratic Bezier Arc:
  P(t) = (1-t)² × P0 + 2(1-t)t × Pmid + t² × P1
  where Pmid is elevated radially above the globe surface
```

---

## 📂 File Structure

- `index.html` — Standalone experience entry with Library Hub navigation.
- `brand-globe-scene.js` — Three.js globe engine: GeoJSON parser, spherical projectors, gyroscopic physics integrator, and arc renderer.
- `world-countries.geojson` — High-resolution global country polygon dataset (see Credits below).

---

## 🚀 How to Run

Via the Library Hub (recommended):
```bash
npm run dev        # from repo root
# Visit http://localhost:3000/interactive-globe-scene/
```

---

## 📜 Credits & Acknowledgments

- **World Countries GeoJSON Dataset**: `world-countries.geojson` is sourced from the [datasets/geo-countries](https://github.com/datasets/geo-countries) repository published by [Open Knowledge Foundation](https://okfn.org/). The data is derived from [Natural Earth](https://www.naturalearthdata.com/) public domain geographic data.
  - License: [Open Data Commons Public Domain Dedication and License (PDDL)](https://opendatacommons.org/licenses/pddl/1-0/)
  - This data is free for commercial and non-commercial use. A copy is bundled in this repository for offline reliability.
- **Three.js WebGL Renderer**: [Three.js](https://threejs.org/) (MIT License © mrdoob and contributors). Vendored copy located in `vendor/three/`.
- **UnrealBloomPass**: From the Three.js post-processing examples library (MIT License).
- **Globe Scene Implementation**: Gyroscopic inertia integrator, GeoJSON parser, and arc renderer are original work by Medhavat Technologies.

> **Data Attribution Notice**: The `world-countries.geojson` file is redistributed in compliance with the PDDL public domain license. Medhavat Technologies makes no proprietary claim over this geographic dataset.
