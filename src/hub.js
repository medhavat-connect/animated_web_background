/**
 * Medhavat Technologies — Animation & 3D WebGL Library Data & Controller
 */

export const ELEMENTS = [
  {
    id: 'cyber-frame',
    title: 'Cyber Frame 240',
    icon: '🎬',
    category: 'canvas',
    categoryLabel: 'Canvas 2D Sequence',
    fps: '30 FPS Ultra',
    badgeColor: 'rgba(0, 240, 255, 0.2)',
    bannerGradient: 'radial-gradient(circle at 50% 50%, #0f2744 0%, #05070c 100%)',
    description: 'High-performance scroll-driven video frame sequence engine. Decodes and scrubs 240 high-definition anime frames in GPU canvas memory with zero latency and interactive HUD scrubber.',
    techTags: ['Canvas 2D', '240 JPG Frames', 'Frame Preloader', 'HUD Scrubber', 'Web Audio Synth'],
    path: '/cyber-frame-app/',
    mathDocs: 'Scroll Offset -> Frame Index Normalization: Frame(t) = Math.floor(ScrollProgress * TotalFrames)',
    architecture: [
      'Zero-latency memory caching for 240 JPG frames',
      'Dual-pass DPR scaling ensuring 4K retina crispness',
      'Integrated Web Audio API ambient synthesizer',
      'Interactive scrubber with bidirectional lerp interpolation'
    ],
    codeSnippet: `import { ScrollSequenceEngine } from './heroSequence.js';\n\nconst engine = new ScrollSequenceEngine({\n  canvas: document.getElementById('hero-canvas'),\n  section: document.getElementById('sequence-section'),\n  frameUrls: manifest.frames,\n  useLerp: true\n});\nengine.preloadImages();`
  },
  {
    id: 'jellyfish-simulation',
    title: 'Aurelia 3D Jellyfish',
    icon: '🪼',
    category: 'webgl',
    categoryLabel: 'WebGL 3D & Shaders',
    fps: '60 FPS TSL',
    badgeColor: 'rgba(168, 85, 247, 0.2)',
    bannerGradient: 'radial-gradient(circle at 50% 50%, #1e1035 0%, #05070c 100%)',
    description: 'Photorealistic procedurally generated 3D jellyfish (Aurelia aurita). Features Verlet physics trailing tentacles, TSL optical shaders, bioluminescent organ pulses, and real-time Tweakpane controls.',
    techTags: ['Three.js', 'TSL Shaders', 'Verlet Physics', 'Thin-Film Fresnel', 'Tweakpane UI'],
    path: '/jellyfish-simulation-app/',
    mathDocs: 'Verlet Position Step: x(t + dt) = 2x(t) - x(t - dt) + a * dt^2 + Drag + Buoyancy',
    architecture: [
      'Procedural dual-layer hemisphere deformed by hydrodynamic pulse wave',
      '32 trailing marginal tentacles simulated via damped particle-spring chains',
      'Thin-film optical interference with subsurface scattering translucency',
      'Live Tweakpane control panel for swimming dynamics and color themes'
    ],
    codeSnippet: `// Run standalone via Vite\ncd jellyfish-simulation-app\nnpm install\nnpm run dev`
  },
  {
    id: 'cursor-wave',
    title: 'Cursor Wave Grid',
    icon: '🌊',
    category: 'canvas',
    categoryLabel: 'Canvas 2D Matrix',
    fps: '60 FPS Native',
    badgeColor: 'rgba(0, 240, 255, 0.2)',
    bannerGradient: 'radial-gradient(circle at 50% 50%, #082836 0%, #05070c 100%)',
    description: 'Zero-dependency interactive 2D vector grid matrix. Tech icons and binary digits swell, rotate, and ripple with smoothstep proximity falloff and radial shockwave bursts.',
    techTags: ['HTML5 Canvas 2D', 'Smoothstep Falloff', 'Shockwave Ripples', 'Mask Observer', 'Zero-Dep'],
    path: '/cursor-wave-app/',
    mathDocs: 'Smoothstep Proximity Attraction: f(t) = t^2 * (3 - 2t) where t = clamp(1 - dist/R, 0, 1)',
    architecture: [
      'Pure native Canvas 2D vector path drawing (no SVG overhead)',
      'Sub-pixel smoothstep distance falloff easing',
      'High-frequency sinusoidal radial ripple waves on click',
      'Automatic [data-cursor-wave-mask] reading contrast occlusion'
    ],
    codeSnippet: `import { CursorWave } from './cursor-wave.js';\n\nconst wave = new CursorWave(document.getElementById('container'), {\n  cellSize: 40,\n  influenceRadiusVmin: 30,\n  shapes: ['1', '0'],\n  colorScheme: 'neon'\n});\nwave.start();`
  },
  {
    id: 'magnetic-button',
    title: 'Magnetic Button Physics',
    icon: '🧲',
    category: 'physics',
    categoryLabel: 'Physics & Spring UI',
    fps: '60 FPS Native',
    badgeColor: 'rgba(236, 72, 153, 0.2)',
    bannerGradient: 'radial-gradient(circle at 50% 50%, #301026 0%, #05070c 100%)',
    description: 'Tactile cursor-attraction magnetic UI buttons powered by a native damped harmonic oscillator spring physics engine. Zero Framer Motion or external physics dependencies.',
    techTags: ['Damped Spring Engine', 'Sub-stepping', 'CSS Custom Props', 'Hit Padding', 'Zero-Dep'],
    path: '/magnetic-button-app/',
    mathDocs: 'Damped Harmonic Oscillator: F = -k * x - c * v (k = stiffness, c = damping, m = mass)',
    architecture: [
      'Native spring differential equations running in RAF loop',
      '4x sub-stepping per frame step with hard position clamping',
      'Expanded virtual hit boundaries for zero-flicker fast gestures',
      'Dynamic active border outline tracking and glowing pill variants'
    ],
    codeSnippet: `import { initMagneticButtons } from './magnetic-button.js';\n\nconst controller = initMagneticButtons({\n  stiffness: 180,\n  damping: 18,\n  maxDistance: 100\n});`
  },
  {
    id: 'bloom-portal',
    title: 'Crystalline Bloom Portal',
    icon: '🌌',
    category: 'webgl',
    categoryLabel: 'WebGL 3D & Shaders',
    fps: '60 FPS WebGL',
    badgeColor: 'rgba(79, 224, 255, 0.2)',
    bannerGradient: 'radial-gradient(circle at 50% 50%, #0c2040 0%, #05070c 100%)',
    description: 'High-fidelity Three.js hero scene featuring dual crystalline light vortexes, swirling volumetric particle vortexes, and real-time HDR UnrealBloomPass post-processing.',
    techTags: ['Three.js r185', 'UnrealBloomPass', 'EffectComposer', 'GLSL Shaders', 'Particle Vortex'],
    path: '/bloom-portal-scene/',
    mathDocs: 'Vortex Swirl: theta(r, t) = angle + sin(angle * 3.0 + r * 14.0 - t * 0.12)',
    architecture: [
      'Dual crystalline energy funnels with dynamic depth fade shaders',
      'Multi-pass HDR bloom post-processing pipeline',
      '2,000+ interconnected drifting particle filaments spanning portal mouths',
      'Interactive camera tracking with damped viewport parallax'
    ],
    codeSnippet: `import * as THREE from './vendor/three/three.module.js';\nimport { UnrealBloomPass } from './vendor/three/UnrealBloomPass.js';\n// View bloom-portal-scene/home-bloom-scene.js for complete shader pipeline`
  },
  {
    id: 'interactive-globe',
    title: '3D Country Boundary Globe',
    icon: '🌍',
    category: 'webgl',
    categoryLabel: 'WebGL 3D & Shaders',
    fps: '60 FPS WebGL',
    badgeColor: 'rgba(16, 185, 129, 0.2)',
    bannerGradient: 'radial-gradient(circle at 50% 50%, #0a261c 0%, #05070c 100%)',
    description: 'Interactive 3D WebGL globe with vector country boundaries parsed from GeoJSON, gyroscopic momentum physics, pulsing beacon hubs, and animated quadratic flight route arcs.',
    techTags: ['Three.js', 'GeoJSON Polygons', 'Gyroscopic Inertia', 'Flight Arcs', 'Spherical Math'],
    path: '/interactive-globe-scene/',
    mathDocs: 'Spherical Coordinate Projection: x = R*cos(lat)*sin(lon), y = R*sin(lat), z = R*cos(lat)*cos(lon)',
    architecture: [
      'Direct client-side GeoJSON parsing into 3D line geometries',
      'Angular momentum and gyroscopic settling torque physics',
      'Animated quadratic Bezier flight paths connecting world hubs',
      'Pulsing beacon hub rings with spherical latitude/longitude projection'
    ],
    codeSnippet: `import { startBrandGlobe } from './brand-globe-scene.js';\n\nconst dispose = startBrandGlobe(document.getElementById('globe-canvas'), 0x10b981);`
  },
  {
    id: 'neural-network',
    title: 'Neural Network AI Mesh',
    icon: '🧠',
    category: 'webgl',
    categoryLabel: 'WebGL 3D & Shaders',
    fps: '60 FPS WebGL',
    badgeColor: 'rgba(178, 102, 255, 0.2)',
    bannerGradient: 'radial-gradient(circle at 50% 50%, #220f38 0%, #05070c 100%)',
    description: 'Interactive 3D synaptic neural graph representing neural network layers, decision paths, and traveling luminous packet clusters with auto-damping orbit controls.',
    techTags: ['Three.js', 'Synaptic Graph', 'Pulse Propagation', 'OrbitControls', 'Bloom Shaders'],
    path: '/neural-network-ai-scene/',
    mathDocs: 'Synaptic Signal Propagation: Position(t) = Lerp(NodeA, NodeB, (t * speed + phase) % 1.0)',
    architecture: [
      'Layered multi-depth vertex graph with weighted interconnection lines',
      'Dynamic traveling signal packets simulating synaptic transmission',
      'Selective HDR bloom highlights on high-weight active clusters',
      'Damped OrbitControls with interactive node magnification'
    ],
    codeSnippet: `import './neural-network-ai-scene/service-ai-scene.js';\n// Mounts automatically to <canvas id="service-canvas"></canvas>`
  },
  {
    id: 'digital-lattice',
    title: 'Digital Experience Lattice',
    icon: '🌐',
    category: 'webgl',
    categoryLabel: 'WebGL 3D & Shaders',
    fps: '60 FPS WebGL',
    badgeColor: 'rgba(59, 130, 246, 0.2)',
    bannerGradient: 'radial-gradient(circle at 50% 50%, #09203c 0%, #05070c 100%)',
    description: 'Undulating 3D wave plane with mouse raycast proximity displacement, high-res interactive nodes, dynamic shader vertex animation, and tooltips.',
    techTags: ['Three.js', 'Vertex Wave Shader', 'Raycast Proximity', 'Interactive Tooltips'],
    path: '/digital-experience-lattice-scene/',
    mathDocs: 'Displacement: z = sin(x * 0.4 + time) * cos(y * 0.4 + time) + RaycastGaussian(mouseDist)',
    architecture: [
      'Dynamic vertex buffer displacement wave plane',
      'Mouse raycasting detecting hovered nodes in 3D space',
      'Floating HTML tooltips synchronized with 3D coordinate projection',
      'ACESFilmic tone mapping with subtle bloom lighting'
    ],
    codeSnippet: `import './digital-experience-lattice-scene/service-web-scene.js';\n// Mounts to <canvas id="service-canvas"></canvas>`
  },
  {
    id: 'space-nebula',
    title: 'Deep Space Nebula',
    icon: '✨',
    category: 'webgl',
    categoryLabel: 'WebGL 3D & Shaders',
    fps: '60 FPS Fast',
    badgeColor: 'rgba(0, 240, 255, 0.2)',
    bannerGradient: 'radial-gradient(circle at 50% 50%, #0a1f33 0%, #05070c 100%)',
    description: 'Lightweight volumetric starfield and drift kinetics designed for high-performance cloud infrastructure and tech brand themes with zero heavy overhead.',
    techTags: ['Particle Buffers', 'Volumetric Starfield', 'Torus Knot Core', 'Zero Overhead'],
    path: '/space-nebula-scene/',
    mathDocs: 'Stellar Drift: Particle.z = (Particle.z + speed * delta) % MaxDepth',
    architecture: [
      'Thousands of colored particles with volumetric depth scaling',
      'Switchable center core: Wireframe Icosahedron or Torus Knot geometry',
      'Concentric gyro-orbital rings with additive blending',
      'Extremely lightweight footprint for mobile and low-power devices'
    ],
    codeSnippet: `import { startSpaceScene } from './service-space-scene.js';\n\nconst dispose = startSpaceScene({\n  canvas: document.getElementById('space-canvas'),\n  accent: 0x4fe0ff,\n  mode: 'grid'\n});`
  },
  {
    id: 'scroll-camera',
    title: 'Scroll Camera Controller',
    icon: '📜',
    category: 'scroll',
    categoryLabel: 'Scroll & Timelines',
    fps: '60 FPS Smooth',
    badgeColor: 'rgba(245, 158, 11, 0.2)',
    bannerGradient: 'radial-gradient(circle at 50% 50%, #2e1e07 0%, #05070c 100%)',
    description: 'Timeline coordinator that maps browser window scroll progression to 3D WebGL camera vectors, rotations, and section scene transitions without jitter.',
    techTags: ['Scroll Normalization', 'Cubic Easing', 'Decoupled Inertia', 'IntersectionObserver'],
    path: '/scroll-camera-controller/',
    mathDocs: 'Normalized Progression: p = clamp((scrollY - top) / (height - vh), 0, 1)',
    architecture: [
      'Converts raw scroll offsets into normalized [0, 1] progression curves',
      'Separates scroll input rate from render tick timing using damped lerp',
      'Coordinates camera FOV shifts, zoom, and cross-scene transitions',
      'Includes scroll progression bar and viewport landmark observers'
    ],
    codeSnippet: `import './scroll-camera-controller/scroll-experience.js';\n// Automatically binds scroll progress and .home-section visibility classes`
  }
];

// -----------------------------------------------------------------------------
// Hub Controller Initialization
// -----------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  initAmbientCanvas();
  renderGrid(ELEMENTS);
  initFilters();
  initSearch();
  initModal();
});

// Render Elements Grid
function renderGrid(elements) {
  const grid = document.getElementById('elements-grid');
  if (!grid) return;

  if (elements.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
        <p style="font-size: 1.25rem; margin-bottom: 0.5rem;">🔍 No animation elements match your search</p>
        <p style="font-size: 0.85rem;">Try searching for "WebGL", "Physics", "Shaders", or "Canvas".</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = elements.map(el => `
    <article class="element-card" data-category="${el.category}" data-id="${el.id}">
      <div class="card-banner" style="background: ${el.bannerGradient};">
        <div class="card-banner-bg"></div>
        <div class="card-icon-floater">${el.icon}</div>
        <span class="card-category-badge" style="background: ${el.badgeColor}; border-color: ${el.badgeColor};">${el.categoryLabel}</span>
      </div>

      <div class="card-body">
        <div class="card-header-row">
          <h2 class="card-title">${el.title}</h2>
          <span class="card-fps-tag">${el.fps}</span>
        </div>

        <p class="card-desc">${el.description}</p>

        <div class="card-tags">
          ${el.techTags.map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
        </div>

        <div class="card-footer">
          <a href="${el.path}" class="btn-launch" title="Launch Dedicated Experience">
            <span>Launch Experience</span>
            <span>↗</span>
          </a>
          <button class="btn-docs" data-doc-id="${el.id}" title="View Architecture & Code Snippet">
            <span>Docs</span>
            <span>📋</span>
          </button>
        </div>
      </div>
    </article>
  `).join('');

  // Rebind docs buttons
  document.querySelectorAll('.btn-docs').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-doc-id');
      const item = ELEMENTS.find(e => e.id === id);
      if (item) openModal(item);
    });
  });
}

// Category Tabs Filter
function initFilters() {
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const cat = tab.getAttribute('data-category');
      const searchVal = document.getElementById('search-input')?.value.toLowerCase().trim() || '';

      filterElements(cat, searchVal);
    });
  });
}

// Live Search Filter
function initSearch() {
  const searchInput = document.getElementById('search-input');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const searchVal = e.target.value.toLowerCase().trim();
    const activeTab = document.querySelector('.tab-btn.active');
    const cat = activeTab ? activeTab.getAttribute('data-category') : 'all';

    filterElements(cat, searchVal);
  });
}

function filterElements(category, searchVal) {
  let filtered = ELEMENTS;

  if (category && category !== 'all') {
    filtered = filtered.filter(el => el.category === category);
  }

  if (searchVal) {
    filtered = filtered.filter(el => 
      el.title.toLowerCase().includes(searchVal) ||
      el.description.toLowerCase().includes(searchVal) ||
      el.categoryLabel.toLowerCase().includes(searchVal) ||
      el.techTags.some(t => t.toLowerCase().includes(searchVal))
    );
  }

  renderGrid(filtered);
}

// Modal Dialog
function initModal() {
  const modalBackdrop = document.getElementById('doc-modal');
  const modalClose = document.getElementById('modal-close-btn');

  if (modalClose && modalBackdrop) {
    modalClose.addEventListener('click', () => {
      modalBackdrop.classList.remove('open');
    });

    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        modalBackdrop.classList.remove('open');
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) {
        modalBackdrop.classList.remove('open');
      }
    });
  }
}

function openModal(item) {
  const modal = document.getElementById('doc-modal');
  if (!modal) return;

  document.getElementById('modal-title-text').innerHTML = `<span>${item.icon}</span> ${item.title} // Docs`;
  document.getElementById('modal-math-content').textContent = item.mathDocs;
  document.getElementById('modal-code-content').textContent = item.codeSnippet;

  const featuresList = document.getElementById('modal-features-list');
  featuresList.innerHTML = item.architecture.map(feat => `<li>${feat}</li>`).join('');

  const launchBtn = document.getElementById('modal-launch-link');
  if (launchBtn) {
    launchBtn.href = item.path;
  }

  modal.classList.add('open');
}

// Subtle Background Particle Canvas
function initAmbientCanvas() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const count = Math.min(Math.floor((width * height) / 18000), 70);

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.4 + 0.1
    });
  }

  let mouse = { x: -1000, y: -1000 };
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  function draw() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      // Mouse gentle repulsion
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        p.x += (dx / dist) * 0.8;
        p.y += (dy / dist) * 0.8;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 240, 255, ${p.alpha})`;
      ctx.fill();

      // Connect near particles
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dist2 = Math.hypot(p.x - p2.x, p.y - p2.y);
        if (dist2 < 110) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(0, 240, 255, ${(1 - dist2 / 110) * 0.08})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);
}
