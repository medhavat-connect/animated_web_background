/**
 * MagneticButton - Zero Dependency Native Damped Spring Physics Magnetic Attraction
 * Inspired by Aceternity UI (ui.aceternity.com/components/magnetic-button)
 * Written in Pure Vanilla ES6 JavaScript (No Framer Motion, No CDNs)
 * Fixed: Zero-flicker pointer capture + Sub-stepped numerically stable spring integration
 */
export class MagneticButton {
  constructor(triggerElement, options = {}) {
    if (!triggerElement) {
      throw new Error('MagneticButton requires a valid trigger element.');
    }

    this.triggerEl = typeof triggerElement === 'string' ? document.querySelector(triggerElement) : triggerElement;
    if (!this.triggerEl) return;

    // Find inner target element (child to translate) or use trigger element itself
    this.targetEl = this.triggerEl.querySelector('[data-magnetic-target]') || this.triggerEl.firstElementChild || this.triggerEl;

    // Options with defaults matching Aceternity UI spring feel
    this.options = {
      strength: 0.8,       // Magnetic pull strength (0.1 - 2.0)
      maxDistance: 100,    // Maximum displacement cap in pixels
      stiffness: 180,      // Spring stiffness (tension k)
      damping: 18,         // Friction damping (c)
      mass: 0.15,          // Inertia mass (m)
      activeClass: 'is-magnetic-active',
      ...options
    };

    // Physics State
    this.posX = 0;
    this.posY = 0;
    this.velX = 0;
    this.velY = 0;
    this.targetX = 0;
    this.targetY = 0;
    this.hasMoved = false;
    this.lastTime = performance.now();
    this.rafId = null;

    // Event Bindings
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.tick = this.tick.bind(this);

    this.init();
  }

  init() {
    // Style setups
    this.triggerEl.style.cursor = 'pointer';
    if (!this.triggerEl.style.display || this.triggerEl.style.display === 'inline') {
      this.triggerEl.style.display = 'inline-block';
    }
    this.targetEl.style.willChange = 'transform';
    this.targetEl.style.pointerEvents = 'none'; // Prevent target translation from intercepting pointer events

    // Make any inner buttons/links interactive via trigger click delegation
    const interactiveChild = this.targetEl.querySelector('button, a, input');
    if (interactiveChild) {
      this.triggerEl.addEventListener('click', (e) => {
        if (e.target !== interactiveChild && !interactiveChild.contains(e.target)) {
          interactiveChild.click();
        }
      });
    }

    // Window / Document level smooth pointer tracking when active to prevent flickering
    this.containerMouseMove = (e) => {
      if (!this.hasMoved) return;
      const rect = this.triggerEl.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const distFromCenter = Math.hypot(dx, dy);

      // Trigger zone radius includes padding & maxDistance
      const activeRadius = Math.max(rect.width, rect.height) / 2 + this.options.maxDistance + 30;

      if (distFromCenter > activeRadius) {
        this.handleMouseLeave();
      } else {
        this.updateTargetPosition(dx, dy);
      }
    };

    // Event Listeners
    this.triggerEl.addEventListener('mousemove', this.handleMouseMove);
    this.triggerEl.addEventListener('mouseleave', this.handleMouseLeave);
    window.addEventListener('mousemove', this.containerMouseMove);

    // Start Physics Animation Loop
    this.rafId = requestAnimationFrame(this.tick);
  }

  updateTargetPosition(dx, dy) {
    const rawX = dx * this.options.strength;
    const rawY = dy * this.options.strength;

    const distance = Math.hypot(rawX, rawY);
    const maxDist = Math.max(10, this.options.maxDistance);

    if (distance > maxDist && distance > 0) {
      const scale = maxDist / distance;
      this.targetX = rawX * scale;
      this.targetY = rawY * scale;
    } else {
      this.targetX = rawX;
      this.targetY = rawY;
    }

    if (!this.hasMoved) {
      this.hasMoved = true;
      this.triggerEl.classList.add(this.options.activeClass);
    }
  }

  handleMouseMove(e) {
    const rect = this.triggerEl.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;

    this.updateTargetPosition(dx, dy);
  }

  handleMouseLeave() {
    this.targetX = 0;
    this.targetY = 0;
    this.hasMoved = false;
    this.triggerEl.classList.remove(this.options.activeClass);
  }

  /**
   * 100% Numerically Stable Damped Harmonic Oscillator (Sub-stepped Semi-Implicit Integration)
   */
  tick(currentTime) {
    const dt = Math.min((currentTime - this.lastTime) / 1000, 0.032);
    this.lastTime = currentTime;

    const { stiffness, damping, mass, maxDistance } = this.options;
    const safeMass = Math.max(0.05, mass);

    // Sub-step integration to prevent Euler explosions
    const subSteps = 4;
    const subDt = dt / subSteps;

    for (let i = 0; i < subSteps; i++) {
      const forceX = stiffness * (this.targetX - this.posX) - damping * this.velX;
      const forceY = stiffness * (this.targetY - this.posY) - damping * this.velY;

      const accelX = forceX / safeMass;
      const accelY = forceY / safeMass;

      this.velX += accelX * subDt;
      this.velY += accelY * subDt;

      this.posX += this.velX * subDt;
      this.posY += this.velY * subDt;
    }

    // Hard Clamping & NaN protection (prevents buttons from disappearing)
    const maxCap = Math.max(20, maxDistance * 1.25);
    if (isNaN(this.posX) || !isFinite(this.posX)) {
      this.posX = 0;
      this.velX = 0;
    } else {
      this.posX = Math.max(-maxCap, Math.min(maxCap, this.posX));
    }

    if (isNaN(this.posY) || !isFinite(this.posY)) {
      this.posY = 0;
      this.velY = 0;
    } else {
      this.posY = Math.max(-maxCap, Math.min(maxCap, this.posY));
    }

    // Apply smooth position to DOM target
    this.targetEl.style.transform = `translate3d(${this.posX.toFixed(2)}px, ${this.posY.toFixed(2)}px, 0px)`;

    this.rafId = requestAnimationFrame(this.tick);
  }

  updateOptions(newOptions = {}) {
    this.options = { ...this.options, ...newOptions };
  }

  destroy() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
    this.triggerEl.removeEventListener('mousemove', this.handleMouseMove);
    this.triggerEl.removeEventListener('mouseleave', this.handleMouseLeave);
    if (this.containerMouseMove) {
      window.removeEventListener('mousemove', this.containerMouseMove);
    }
    this.triggerEl.classList.remove(this.options.activeClass);
    this.targetEl.style.transform = '';
  }

  static attachAll(selector = '[data-magnetic]', options = {}) {
    const elements = document.querySelectorAll(selector);
    const instances = [];
    elements.forEach(el => {
      instances.push(new MagneticButton(el, options));
    });
    return instances;
  }
}
