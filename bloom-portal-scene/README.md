# 🌌 Crystalline Energy Portal — UnrealBloomPass 3D Scene

A high-fidelity Three.js WebGL hero scene featuring dual crystalline light portals, swirling volumetric particle vortexes, and real-time HDR bloom post-processing.

---

## ✨ Features & Mechanics

- **Dual Crystalline Vortexes**: Custom GLSL shader material simulating counter-rotating energy funnels with dynamic depth fade and wave distortion.
- **UnrealBloomPass HDR Post-Processing**: Multi-pass bloom pipeline (`EffectComposer` → `RenderPass` → `UnrealBloomPass` → `OutputPass`) rendering intense luminescence on high-energy nodes.
- **Floating Particle Filament Field**: 2,000+ interconnected energy particles bridging the gap between portals with subtle drift dynamics.
- **Interactive Viewport Parallax**: Smooth camera tracking responding to pointer movement with damped inertia.

---

## 📐 Core Algorithm

```
Vortex Radial Distortion: r(θ, t) = base_r + amplitude × sin(θ × freq + t × speed)
Bloom Threshold: only fragments with luminance > 0.85 contribute to the bloom accumulation pass
```

---

## 📂 File Structure

- `index.html` — Standalone experience entry with Library Hub navigation.
- `home-bloom-scene.js` — Complete Three.js scene: custom GLSL shader uniforms, particle geometry, post-processing composer, and parallax interaction.

---

## 🚀 How to Run

Via the Library Hub (recommended):
```bash
npm run dev        # from repo root
# Visit http://localhost:3000/bloom-portal-scene/
```

---

## 📜 Credits & Acknowledgments

- **Three.js WebGL Renderer**: All 3D rendering uses [Three.js](https://threejs.org/) (MIT License © mrdoob and contributors). The vendored copy is located in `vendor/three/`.
- **UnrealBloomPass**: Post-processing bloom pass from the [Three.js examples post-processing library](https://threejs.org/examples/?q=bloom#webgl_postprocessing_unreal_bloom). Inspired by the bloom pass of Unreal Engine. MIT Licensed.
- **GLSL Vortex Shaders**: Custom shader code written originally by Medhavat Technologies. No third-party shader libraries or Shadertoy code was used.
- **Particle Field Implementation**: Original procedural geometry and animation logic by Medhavat Technologies.

> All custom scene code in this module is original work by Medhavat Technologies. Third-party libraries (Three.js, UnrealBloomPass) are used under their respective MIT licenses.
