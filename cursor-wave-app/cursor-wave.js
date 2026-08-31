/**
 * CursorWave Engine - Zero Dependency HTML5 Canvas Interactive Wave Grid
 * Inspired by React Bits Pro (pro.reactbits.dev/docs/components/cursor-wave)
 * Written in Pure Vanilla ES6 JavaScript (No CDNs, No external libs)
 */
export class CursorWave {
  constructor(container, options = {}) {
    if (!container) {
      throw new Error('CursorWave requires a valid container element.');
    }
    this.container = typeof container === 'string' ? document.querySelector(container) : container;
    
    // Default Options
    this.options = {
      cellSize: 40,                   // Pixel spacing between shape centers (16-96)
      influenceRadiusVmin: 30,        // Cursor influence radius as % of min(width, height)
      attackTime: 0.3,                // Swell-up ease time in seconds
      releaseTime: 0.5,               // Relax-down ease time in seconds
      idleScale: 0.1,                 // Resting scale applied to shapes (0-0.5)
      minPeakScale: 1.2,              // Minimum peak scale assigned on hover
      maxPeakScale: 3.0,              // Maximum peak scale assigned on hover
      burstSpeed: 1200,               // Click shockwave expansion speed (px/sec)
      burstThickness: 180,            // Click shockwave ring width in pixels
      backgroundColor: '#07090e',     // Canvas background fill color
      opacity: 1.0,                   // Canvas master opacity (0-1)
      dpr: Math.min(window.devicePixelRatio || 1, 2), // Device pixel ratio cap
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
      ],
      ...options
    };

    // Engine State
    this.canvas = document.createElement('canvas');
    this.canvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;display:block;pointer-events:none;';
    this.container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');

    this.width = 0;
    this.height = 0;
    this.cells = [];
    this.ripples = [];
    this.maskRects = [];
    this.pointer = null; // { x, y }
    this.pointerEnergy = 0;
    this.lastTime = performance.now();
    this.rafId = null;
    this.resizeObserver = null;
    this.maskFrameCounter = 0;

    // Event Bindings
    this.handlePointerMove = this.handlePointerMove.bind(this);
    this.handlePointerLeave = this.handlePointerLeave.bind(this);
    this.handlePointerDown = this.handlePointerDown.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.tick = this.tick.bind(this);

    this.init();
  }

  init() {
    // Ensure relative positioning on container
    const computedStyle = window.getComputedStyle(this.container);
    if (computedStyle.position === 'static') {
      this.container.style.position = 'relative';
    }

    // Event Listeners
    this.container.addEventListener('pointermove', this.handlePointerMove);
    this.container.addEventListener('pointerleave', this.handlePointerLeave);
    this.container.addEventListener('pointerdown', this.handlePointerDown);

    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => this.handleResize());
      this.resizeObserver.observe(this.container);
    } else {
      window.addEventListener('resize', this.handleResize);
    }

    this.handleResize();
    this.updateMasks();
    this.rafId = requestAnimationFrame(this.tick);
  }

  handleResize() {
    const rect = this.container.getBoundingClientRect();
    this.width = rect.width;
    this.height = rect.height;

    const dpr = this.options.dpr;
    this.canvas.width = Math.floor(this.width * dpr);
    this.canvas.height = Math.floor(this.height * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    this.rebuildGrid();
  }

  rebuildGrid() {
    const { cellSize, shapes, colors, idleScale } = this.options;
    this.cells = [];

    if (this.width <= 0 || this.height <= 0) return;

    const cols = Math.ceil(this.width / cellSize) + 1;
    const rows = Math.ceil(this.height / cellSize) + 1;

    const offsetX = (this.width - (cols - 1) * cellSize) / 2;
    const offsetY = (this.height - (rows - 1) * cellSize) / 2;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = offsetX + c * cellSize;
        const y = offsetY + r * cellSize;

        // Pick random shape and color from pools
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const angle = (Math.random() * Math.PI) / 4;

        this.cells.push({
          x,
          y,
          angle,
          scale: idleScale,
          targetScale: idleScale,
          peak: idleScale,
          shape,
          color,
          hovered: false
        });
      }
    }
  }

  updateMasks() {
    const maskElements = this.container.querySelectorAll('[data-cursor-wave-mask]');
    const containerRect = this.container.getBoundingClientRect();
    const rects = [];

    maskElements.forEach(el => {
      const r = el.getBoundingClientRect();
      rects.push({
        left: r.left - containerRect.left,
        top: r.top - containerRect.top,
        right: r.right - containerRect.left,
        bottom: r.bottom - containerRect.top
      });
    });

    this.maskRects = rects;
  }

  handlePointerMove(e) {
    const rect = this.container.getBoundingClientRect();
    this.pointer = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
    this.pointerEnergy = 1.0;
  }

  handlePointerLeave() {
    this.pointer = null;
  }

  handlePointerDown(e) {
    const rect = this.container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    this.burst(x, y);
  }

  /**
   * Trigger an expanding shockwave ripple from specified (x,y) or pointer position
   */
  burst(x, y) {
    let px = x;
    let py = y;

    if (px === undefined || py === undefined) {
      if (this.pointer) {
        px = this.pointer.x;
        py = this.pointer.y;
      } else {
        px = this.width / 2;
        py = this.height / 2;
      }
    }

    this.ripples.push({
      x: px,
      y: py,
      start: performance.now()
    });
  }

  /**
   * Update engine configuration on the fly
   */
  updateOptions(newOptions = {}) {
    const rebuildNeeded = 
      (newOptions.cellSize && newOptions.cellSize !== this.options.cellSize) ||
      (newOptions.shapes && JSON.stringify(newOptions.shapes) !== JSON.stringify(this.options.shapes)) ||
      (newOptions.colors && JSON.stringify(newOptions.colors) !== JSON.stringify(this.options.colors));

    this.options = { ...this.options, ...newOptions };

    if (rebuildNeeded) {
      this.rebuildGrid();
    }
  }

  // Smoothstep interpolation [0, 1]
  smoothstep(t) {
    const clamped = Math.max(0, Math.min(1, t));
    return clamped * clamped * (3 - 2 * clamped);
  }

  // Random float helper [min, max]
  randomRange(min, max) {
    return min + Math.random() * (max - min);
  }

  tick(currentTime) {
    const dt = Math.min((currentTime - this.lastTime) / 1000, 0.1); // Cap delta time to prevent spikes
    this.lastTime = currentTime;

    const ctx = this.ctx;
    const opts = this.options;
    const { width, height } = this;

    // Clear and fill background
    ctx.clearRect(0, 0, width, height);
    ctx.globalAlpha = opts.opacity;
    ctx.fillStyle = opts.backgroundColor;
    ctx.fillRect(0, 0, width, height);

    // Periodically sync mask element rects (every 15 frames)
    this.maskFrameCounter++;
    if (this.maskFrameCounter % 15 === 0) {
      this.updateMasks();
    }

    // Pointer energy decay
    this.pointerEnergy *= 0.93;

    // Compute cursor influence radius
    const vmin = Math.min(width, height);
    const influenceRadius = (opts.influenceRadiusVmin / 100) * vmin;

    // Filter active shockwave ripples
    const maxDiagonal = Math.sqrt(width * width + height * height);
    this.ripples = this.ripples.filter(ripple => {
      const elapsed = (currentTime - ripple.start) / 1000;
      const currentRadius = elapsed * opts.burstSpeed;
      return currentRadius < maxDiagonal + opts.burstThickness;
    });

    // Exponential Easing Factors
    const attackFactor = 1 - Math.exp(-dt / Math.max(0.01, opts.attackTime * 0.25));
    const releaseFactor = 1 - Math.exp(-dt / Math.max(0.01, opts.releaseTime * 0.25));
    const halfCell = opts.cellSize * 0.5;

    // Process Grid Cells
    for (let i = 0; i < this.cells.length; i++) {
      const cell = this.cells[i];

      // 1. Check DOM Element Masking
      let isMasked = false;
      for (let m = 0; m < this.maskRects.length; m++) {
        const mask = this.maskRects[m];
        if (
          cell.x >= mask.left - halfCell &&
          cell.x <= mask.right + halfCell &&
          cell.y >= mask.top - halfCell &&
          cell.y <= mask.bottom + halfCell
        ) {
          isMasked = true;
          break;
        }
      }

      if (isMasked) {
        // Smoothly scale down to 0 under masked UI text/cards
        cell.scale += (0 - cell.scale) * releaseFactor;
        if (cell.scale < 0.005) cell.scale = 0;
        continue;
      }

      // 2. Cursor Swell Calculation
      let cursorIntensity = 0;
      if (this.pointer && this.pointerEnergy > 0.001 && influenceRadius > 0) {
        const dx = cell.x - this.pointer.x;
        const dy = cell.y - this.pointer.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        const rawFactor = 1 - dist / influenceRadius;
        cursorIntensity = this.smoothstep(rawFactor) * this.pointerEnergy;

        if (cursorIntensity > 0.05 && !cell.hovered) {
          cell.hovered = true;
          cell.peak = this.randomRange(opts.minPeakScale, opts.maxPeakScale);
          cell.angle = this.randomRange(0, Math.PI * 2);
        } else if (cursorIntensity <= 0.05) {
          cell.hovered = false;
        }
      } else {
        cell.hovered = false;
      }

      // 3. Shockwave Burst Ripple Calculation
      let rippleIntensity = 0;
      for (let r = 0; r < this.ripples.length; r++) {
        const ripple = this.ripples[r];
        const elapsed = (currentTime - ripple.start) / 1000;
        const ringRadius = elapsed * opts.burstSpeed;

        const dx = cell.x - ripple.x;
        const dy = cell.y - ripple.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const proximity = 1 - Math.abs(dist - ringRadius) / opts.burstThickness;
        if (proximity > 0) {
          const wavePulse = Math.sin(Math.PI * proximity);
          if (wavePulse > rippleIntensity) {
            rippleIntensity = wavePulse;
          }
        }
      }

      // 4. Combine Hover & Ripple Target Scale
      const scaleDelta = cell.peak - opts.idleScale;
      const hoverTarget = opts.idleScale + cursorIntensity * scaleDelta;
      const rippleTarget = opts.idleScale + rippleIntensity * scaleDelta;
      const targetScale = Math.max(hoverTarget, rippleTarget);

      // 5. Ease toward target scale (Attack vs Release)
      const currentEasing = targetScale > cell.scale ? attackFactor : releaseFactor;
      cell.scale += (targetScale - cell.scale) * currentEasing;

      // Skip rendering if scale is tiny
      if (cell.scale < opts.idleScale * 0.1) continue;

      // 6. Canvas Draw Operation
      ctx.save();
      ctx.translate(cell.x, cell.y);
      ctx.rotate(cell.angle);
      ctx.scale(cell.scale, cell.scale);

      // Set Fill Style (Solid Color or Radial Gradient)
      ctx.fillStyle = this.getFillStyle(ctx, cell.color, opts.cellSize);

      // Draw Shape Primitive
      this.drawShape(ctx, cell.shape, opts.cellSize);
      ctx.fill();

      ctx.restore();
    }

    ctx.globalAlpha = 1.0;
    this.rafId = requestAnimationFrame(this.tick);
  }

  getFillStyle(ctx, colorProp, cellSize) {
    if (typeof colorProp === 'string') {
      return colorProp;
    }
    if (colorProp && colorProp.stops && Array.isArray(colorProp.stops)) {
      const radius = cellSize * 0.6;
      const grad = ctx.createRadialGradient(0, -radius * 0.3, 0, 0, radius * 0.3, radius * 1.5);
      grad.addColorStop(0, colorProp.stops[0]);
      grad.addColorStop(1, colorProp.stops[1]);
      return grad;
    }
    return '#00f0ff';
  }

  drawShape(ctx, shape, cellSize) {
    const s = cellSize * 0.35;

    ctx.beginPath();
    switch (shape) {
      // Code Tag: </>
      case 'code':
        // <
        ctx.moveTo(-s * 0.4, -s * 0.5);
        ctx.lineTo(-s * 0.9, 0);
        ctx.lineTo(-s * 0.4, s * 0.5);
        // /
        ctx.moveTo(s * 0.1, -s * 0.6);
        ctx.lineTo(-s * 0.1, s * 0.6);
        // >
        ctx.moveTo(s * 0.4, -s * 0.5);
        ctx.lineTo(s * 0.9, 0);
        ctx.lineTo(s * 0.4, s * 0.5);
        break;

      // Curly Braces: {}
      case 'braces':
        // {
        ctx.moveTo(-s * 0.3, -s * 0.8);
        ctx.lineTo(-s * 0.6, -s * 0.8);
        ctx.lineTo(-s * 0.6, -s * 0.2);
        ctx.lineTo(-s * 0.9, 0);
        ctx.lineTo(-s * 0.6, s * 0.2);
        ctx.lineTo(-s * 0.6, s * 0.8);
        ctx.lineTo(-s * 0.3, s * 0.8);
        // }
        ctx.moveTo(s * 0.3, -s * 0.8);
        ctx.lineTo(s * 0.6, -s * 0.8);
        ctx.lineTo(s * 0.6, -s * 0.2);
        ctx.lineTo(s * 0.9, 0);
        ctx.lineTo(s * 0.6, s * 0.2);
        ctx.lineTo(s * 0.6, s * 0.8);
        ctx.lineTo(s * 0.3, s * 0.8);
        break;

      // Terminal Shell: >_
      case 'terminal':
        // Chevron >
        ctx.moveTo(-s * 0.8, -s * 0.6);
        ctx.lineTo(-s * 0.2, -s * 0.1);
        ctx.lineTo(-s * 0.8, s * 0.4);
        // Cursor _
        ctx.moveTo(0, s * 0.4);
        ctx.lineTo(s * 0.7, s * 0.4);
        break;

      // CSS Layers / Stack
      case 'layers':
        // Top layer
        ctx.moveTo(0, -s * 0.7);
        ctx.lineTo(s * 0.8, -s * 0.3);
        ctx.lineTo(0, s * 0.1);
        ctx.lineTo(-s * 0.8, -s * 0.3);
        ctx.closePath();
        // Mid layer lip
        ctx.moveTo(-s * 0.8, 0.1 * s);
        ctx.lineTo(0, 0.5 * s);
        ctx.lineTo(s * 0.8, 0.1 * s);
        // Bottom layer lip
        ctx.moveTo(-s * 0.8, 0.5 * s);
        ctx.lineTo(0, 0.9 * s);
        ctx.lineTo(s * 0.8, 0.5 * s);
        break;

      // React Atom / Orbit
      case 'atom':
        // Nucleus
        ctx.arc(0, 0, s * 0.25, 0, Math.PI * 2);
        // Orbit 1
        ctx.ellipse(0, 0, s * 0.9, s * 0.35, Math.PI / 4, 0, Math.PI * 2);
        // Orbit 2
        ctx.ellipse(0, 0, s * 0.9, s * 0.35, -Math.PI / 4, 0, Math.PI * 2);
        break;

      // Database Cylinder
      case 'database':
        ctx.ellipse(0, -s * 0.5, s * 0.7, s * 0.25, 0, 0, Math.PI * 2);
        ctx.moveTo(-s * 0.7, -s * 0.5);
        ctx.lineTo(-s * 0.7, s * 0.5);
        ctx.ellipse(0, s * 0.5, s * 0.7, s * 0.25, 0, 0, Math.PI);
        ctx.lineTo(s * 0.7, -s * 0.5);
        ctx.moveTo(-s * 0.7, 0);
        ctx.ellipse(0, 0, s * 0.7, s * 0.25, 0, 0, Math.PI);
        break;

      // Dev Gear / Cog
      case 'gear':
        const teeth = 6;
        const rOut = s * 0.85;
        const rIn = s * 0.6;
        for (let i = 0; i < teeth * 2; i++) {
          const a = (i * Math.PI) / teeth;
          const r = i % 2 === 0 ? rOut : rIn;
          const px = Math.cos(a) * r;
          const py = Math.sin(a) * r;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.moveTo(s * 0.3, 0);
        ctx.arc(0, 0, s * 0.3, 0, Math.PI * 2);
        break;

      // Rocket / Deploy
      case 'rocket':
        ctx.moveTo(0, -s * 0.9);
        ctx.quadraticCurveTo(s * 0.6, -s * 0.2, s * 0.5, s * 0.5);
        ctx.lineTo(-s * 0.5, s * 0.5);
        ctx.quadraticCurveTo(-s * 0.6, -s * 0.2, 0, -s * 0.9);
        // Wings
        ctx.moveTo(s * 0.5, s * 0.2);
        ctx.lineTo(s * 0.8, s * 0.7);
        ctx.lineTo(s * 0.4, s * 0.6);
        ctx.moveTo(-s * 0.5, s * 0.2);
        ctx.lineTo(-s * 0.8, s * 0.7);
        ctx.lineTo(-s * 0.4, s * 0.6);
        break;

      // Component Box: <div>
      case 'box':
        if (typeof ctx.roundRect === 'function') {
          ctx.roundRect(-s * 0.75, -s * 0.75, s * 1.5, s * 1.5, s * 0.2);
        } else {
          ctx.rect(-s * 0.75, -s * 0.75, s * 1.5, s * 1.5);
        }
        // Header line
        ctx.moveTo(-s * 0.75, -s * 0.3);
        ctx.lineTo(s * 0.75, -s * 0.3);
        // Dots
        ctx.moveTo(-s * 0.5, -s * 0.5);
        ctx.arc(-s * 0.5, -s * 0.5, s * 0.08, 0, Math.PI * 2);
        ctx.moveTo(-s * 0.25, -s * 0.5);
        ctx.arc(-s * 0.25, -s * 0.5, s * 0.08, 0, Math.PI * 2);
        break;

      // Debug Bug Icon
      case 'bug':
        // Body
        ctx.arc(0, s * 0.1, s * 0.45, 0, Math.PI * 2);
        // Head
        ctx.moveTo(-s * 0.3, -s * 0.3);
        ctx.arc(0, -s * 0.35, s * 0.3, Math.PI, 0);
        // Legs
        ctx.moveTo(-s * 0.7, -s * 0.2);
        ctx.lineTo(-s * 0.4, -s * 0.1);
        ctx.moveTo(s * 0.7, -s * 0.2);
        ctx.lineTo(s * 0.4, -s * 0.1);

        ctx.moveTo(-s * 0.8, s * 0.1);
        ctx.lineTo(-s * 0.4, s * 0.1);
        ctx.moveTo(s * 0.8, s * 0.1);
        ctx.lineTo(s * 0.4, s * 0.1);

        ctx.moveTo(-s * 0.7, s * 0.4);
        ctx.lineTo(-s * 0.4, s * 0.3);
        ctx.moveTo(s * 0.7, s * 0.4);
        ctx.lineTo(s * 0.4, s * 0.3);
        break;

      default:
        ctx.arc(0, 0, s * 0.5, 0, Math.PI * 2);
        break;
    }

    // Stroke path for icon line graphics
    ctx.lineWidth = Math.max(1.5, cellSize * 0.04);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = ctx.fillStyle;
    ctx.stroke();
  }

  destroy() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
    this.container.removeEventListener('pointermove', this.handlePointerMove);
    this.container.removeEventListener('pointerleave', this.handlePointerLeave);
    this.container.removeEventListener('pointerdown', this.handlePointerDown);

    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    } else {
      window.removeEventListener('resize', this.handleResize);
    }

    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
  }
}
