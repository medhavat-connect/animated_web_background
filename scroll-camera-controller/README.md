# 📜 Scroll Camera Controller & Parallax Coordinator

A timeline coordinator that maps browser window scroll progress to 3D WebGL camera vectors, scene transitions, and viewport-relative parallax effects — without jitter or jump cuts.

---

## ✨ Features & Mechanics

- **Section-Aware Normalisation**: Converts raw `window.scrollY` offsets into normalised `[0, 1]` progression values per registered viewport landmark section.
- **Smooth Easing & Inertia**: Prevents jerky camera movement with exponential decay easing filters applied to position and rotation interpolation.
- **Multi-Scene Transitions**: Coordinates camera zoom, field-of-view (FOV) shifts, and opacity crossfades between adjacent 3D scenes as the user scrolls through sections.
- **Matrix Interpolation**: Uses `THREE.Vector3.lerp()` and `THREE.Quaternion.slerp()` for smooth camera matrix blending between keyframe states.

---

## 📐 Core Algorithm

```
Section Progress Normalisation:
  progress = clamp((scrollY - sectionTop) / sectionHeight, 0, 1)

Exponential Decay Easing:
  smoothed = smoothed + (target - smoothed) × (1 - e^(−k × dt))
  where k is the responsiveness constant

Camera Lerp:
  camera.position.lerpVectors(startPos, endPos, easedProgress)
  camera.quaternion.slerpQuaternions(startRot, endRot, easedProgress)
```

---

## 📂 File Structure

- `index.html` — Standalone experience entry with Library Hub navigation.
- `scroll-experience.js` — Scroll listener, section progress normaliser, matrix interpolation math, and viewport coordinate binder.

---

## 🚀 How to Run

Via the Library Hub (recommended):
```bash
npm run dev        # from repo root
# Visit http://localhost:3000/scroll-camera-controller/
```

---

## 📜 Credits & Acknowledgments

- **Three.js WebGL Renderer**: [Three.js](https://threejs.org/) (MIT License © mrdoob and contributors). Specifically `Vector3.lerpVectors()` and `Quaternion.slerpQuaternions()` from the Three.js math library. Vendored copy located in `vendor/three/`.
- **Scroll Normalisation Technique**: The general technique of normalising scroll offsets to `[0, 1]` per section is a universally documented pattern in web animation development. The specific implementation here is original to Medhavat Technologies.
- **Exponential Decay Easing**: A standard signal-processing technique. The coefficient derivation from frame-rate-independent `dt` is widely documented in game development literature.
- **All Implementation Code**: Original work by Medhavat Technologies.

> All custom controller code in this module is original work by Medhavat Technologies. Third-party libraries (Three.js math utilities) are used under their respective MIT licenses.
