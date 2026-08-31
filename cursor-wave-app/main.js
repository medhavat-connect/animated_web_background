import { CursorWave } from './cursor-wave.js';

// Pre-defined Color Palettes & Presets
const PRESETS = {
  neon: {
    backgroundColor: '#07090e',
    shapes: ['code', 'braces', 'terminal', 'layers', 'atom', 'database', 'gear', 'rocket', 'box', 'bug'],
    colors: [
      '#00f0ff',
      '#7000ff',
      '#ff007f',
      '#00ff9d',
      '#ffb700',
      { stops: ['#00f0ff', '#7000ff'] },
      { stops: ['#ff007f', '#ffb700'] },
      { stops: ['#00ff9d', '#00f0ff'] }
    ]
  },
  aurora: {
    backgroundColor: '#031412',
    shapes: ['code', 'layers', 'atom', 'rocket', 'box'],
    colors: [
      '#00ff9d',
      '#00f0ff',
      '#0d9488',
      '#84cc16',
      { stops: ['#00ff9d', '#0d9488'] },
      { stops: ['#00f0ff', '#00ff9d'] }
    ]
  },
  sunset: {
    backgroundColor: '#12040d',
    shapes: ['braces', 'terminal', 'gear', 'rocket', 'bug'],
    colors: [
      '#ff007f',
      '#ff7700',
      '#ffb700',
      '#a855f7',
      { stops: ['#ff007f', '#ff7700'] },
      { stops: ['#ff7700', '#ffb700'] }
    ]
  },
  gold: {
    backgroundColor: '#0c0a06',
    shapes: ['code', 'braces', 'database', 'box'],
    colors: [
      '#f59e0b',
      '#eab308',
      '#ffffff',
      '#94a3b8',
      { stops: ['#f59e0b', '#ffffff'] }
    ]
  },
  monochrome: {
    backgroundColor: '#05070a',
    shapes: ['terminal', 'layers', 'gear', 'box'],
    colors: [
      '#ffffff',
      '#cbd5e1',
      '#94a3b8',
      '#64748b',
      { stops: ['#ffffff', '#64748b'] }
    ]
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('canvas-container');

  // Initialize CursorWave Engine
  const cursorWave = new CursorWave(container, {
    cellSize: 40,
    influenceRadiusVmin: 30,
    attackTime: 0.3,
    releaseTime: 0.5,
    idleScale: 0.1,
    minPeakScale: 1.2,
    maxPeakScale: 3.0,
    burstSpeed: 1200,
    burstThickness: 180,
    ...PRESETS.neon
  });

  // Drawer Toggle Handlers
  const drawer = document.getElementById('control-drawer');
  const toggleDrawerBtn = document.getElementById('drawer-toggle-btn');
  const closeDrawerBtn = document.getElementById('drawer-close-btn');
  const heroToggleDrawerBtn = document.getElementById('hero-toggle-drawer');

  const openDrawer = () => drawer.classList.add('open');
  const closeDrawer = () => drawer.classList.remove('open');

  toggleDrawerBtn.addEventListener('click', openDrawer);
  heroToggleDrawerBtn.addEventListener('click', openDrawer);
  closeDrawerBtn.addEventListener('click', closeDrawer);

  // Burst Trigger Handlers
  const topBurstBtn = document.getElementById('burst-btn-top');
  const heroBurstBtn = document.getElementById('hero-burst-btn');
  const drawerBurstBtn = document.getElementById('drawer-burst-btn');

  const triggerBurst = (e) => {
    cursorWave.burst();
  };

  topBurstBtn.addEventListener('click', triggerBurst);
  heroBurstBtn.addEventListener('click', triggerBurst);
  drawerBurstBtn.addEventListener('click', triggerBurst);

  // Quick Preset Buttons in Hero Card
  document.getElementById('preset-neon-btn')?.addEventListener('click', () => applyPreset('neon'));
  document.getElementById('preset-aurora-btn')?.addEventListener('click', () => applyPreset('aurora'));

  // Range Slider Bindings
  const sliders = [
    { id: 'cellSize', unit: 'px', formatter: val => `${val}px` },
    { id: 'influenceRadiusVmin', unit: '%', formatter: val => `${val}%` },
    { id: 'attackTime', unit: 's', formatter: val => `${parseFloat(val).toFixed(2)}s` },
    { id: 'releaseTime', unit: 's', formatter: val => `${parseFloat(val).toFixed(2)}s` },
    { id: 'idleScale', unit: '', formatter: val => `${parseFloat(val).toFixed(2)}` },
    { id: 'maxPeakScale', unit: 'x', formatter: val => `${parseFloat(val).toFixed(1)}x` },
    { id: 'burstSpeed', unit: ' px/s', formatter: val => `${val} px/s` }
  ];

  sliders.forEach(({ id, formatter }) => {
    const input = document.getElementById(`input-${id}`);
    const valDisplay = document.getElementById(`val-${id}`);

    if (input && valDisplay) {
      input.addEventListener('input', (e) => {
        const numVal = parseFloat(e.target.value);
        valDisplay.textContent = formatter(numVal);
        cursorWave.updateOptions({ [id]: numVal });
      });
    }
  });

  // Shape Selector Buttons
  const shapeBtns = document.querySelectorAll('.shape-btn');
  shapeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('selected');

      const selectedShapes = Array.from(document.querySelectorAll('.shape-btn.selected'))
        .map(b => b.getAttribute('data-shape'));

      if (selectedShapes.length > 0) {
        cursorWave.updateOptions({ shapes: selectedShapes });
      } else {
        // Fallback to circle if all unselected
        btn.classList.add('selected');
        cursorWave.updateOptions({ shapes: ['circle'] });
      }
    });
  });

  // Color Swatch Selectors
  const colorSwatches = document.querySelectorAll('.color-swatch');
  colorSwatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      colorSwatches.forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');

      const schemeKey = swatch.getAttribute('data-color-scheme');
      if (PRESETS[schemeKey]) {
        applyPreset(schemeKey);
      }
    });
  });

  // Preset Chips Switcher Toolbar
  const presetChips = document.querySelectorAll('.preset-chip');
  presetChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const schemeKey = chip.getAttribute('data-preset');
      if (PRESETS[schemeKey]) {
        applyPreset(schemeKey);
      }
    });
  });

  function applyPreset(presetKey) {
    const preset = PRESETS[presetKey];
    if (!preset) return;

    // Update preset chips UI
    presetChips.forEach(c => {
      if (c.getAttribute('data-preset') === presetKey) {
        c.classList.add('active');
      } else {
        c.classList.remove('active');
      }
    });

    // Update color swatch UI
    colorSwatches.forEach(s => {
      if (s.getAttribute('data-color-scheme') === presetKey) {
        s.classList.add('active');
      } else {
        s.classList.remove('active');
      }
    });

    // Update shape buttons UI
    shapeBtns.forEach(btn => {
      const shape = btn.getAttribute('data-shape');
      if (preset.shapes.includes(shape)) {
        btn.classList.add('selected');
      } else {
        btn.classList.remove('selected');
      }
    });

    // Update CursorWave options
    cursorWave.updateOptions({
      backgroundColor: preset.backgroundColor,
      shapes: preset.shapes,
      colors: preset.colors
    });

    // Optional burst trigger on preset change
    cursorWave.burst();
  }
});
