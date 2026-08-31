/**
 * ScrollSequenceEngine (Virtual Scroll Engine)
 * Manages frame preloading, canvas cover rendering, HiDPI scaling, and virtual wheel/touch animation inside a locked 100vh hero section.
 */
export class ScrollSequenceEngine {
  constructor(options = {}) {
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext('2d', { alpha: false, desynchronized: true });
    this.section = options.section;
    this.frameUrls = options.frameUrls || [];
    this.totalFrames = this.frameUrls.length;
    
    // Callbacks
    this.onProgress = options.onProgress || (() => {});
    this.onFrameChange = options.onFrameChange || (() => {});
    this.onLoadComplete = options.onLoadComplete || (() => {});

    // State
    this.images = new Array(this.totalFrames);
    this.loadedCount = 0;
    this.currentFrameIndex = -1;
    this.targetFrameIndex = 0;
    this.renderedFrameIndex = -1;
    
    // Virtual Scroll State (0.0 to 1.0)
    this.progress = 0;
    this.touchStartY = 0;
    
    // Performance & Smoothness
    this.useLerp = options.useLerp ?? true;
    this.lerpFactor = 0.35; // Responsive interpolation factor
    this.virtualFrame = 0;
    this.isLoaded = false;
    this.animFrameId = null;
    this.isReducedMotion = false;

    // Bind methods
    this.handleWheel = this.handleWheel.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.renderLoop = this.renderLoop.bind(this);
  }

  /**
   * Preloads image sequence in parallel batches
   */
  async preloadImages(batchSize = 12) {
    if (this.totalFrames === 0) {
      console.warn('No frames to preload');
      return;
    }

    this.loadedCount = 0;

    for (let i = 0; i < this.totalFrames; i += batchSize) {
      const batch = [];
      const end = Math.min(i + batchSize, this.totalFrames);

      for (let j = i; j < end; j++) {
        batch.push(this.loadImageFrame(j));
      }

      await Promise.all(batch);
      this.onProgress(this.loadedCount / this.totalFrames, this.loadedCount, this.totalFrames);
    }

    this.isLoaded = true;
    this.handleResize();
    this.updateProgress(0);
    this.renderFrame(0);
    this.onLoadComplete();
    this.startLoop();
  }

  /**
   * Load individual frame image with decode optimization
   */
  loadImageFrame(index) {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';

      const handleSuccess = () => {
        this.images[index] = img;
        this.loadedCount++;
        resolve(img);
      };

      const handleError = (err) => {
        console.warn(`Frame ${index} failed to load: ${this.frameUrls[index]}`, err);
        this.images[index] = this.images[index - 1] || null;
        this.loadedCount++;
        resolve(null);
      };

      img.onload = () => {
        if ('decode' in img) {
          img.decode().then(handleSuccess).catch(handleSuccess);
        } else {
          handleSuccess();
        }
      };

      img.onerror = handleError;
      img.src = this.frameUrls[index];
    });
  }

  /**
   * Handles canvas size and device pixel ratio for crisp rendering
   */
  handleResize() {
    if (!this.canvas) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    this.canvas.width = Math.floor(width * dpr);
    this.canvas.height = Math.floor(height * dpr);

    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;

    this.viewportWidth = width;
    this.viewportHeight = height;
    this.dpr = dpr;

    if (this.renderedFrameIndex >= 0) {
      this.renderFrame(this.renderedFrameIndex, true);
    }
  }

  /**
   * Updates virtual progress (0..1) and maps target frame index
   */
  updateProgress(newProgress) {
    if (!this.isLoaded) return;

    this.progress = Math.max(0, Math.min(1, newProgress));
    const frameIndex = Math.min(this.totalFrames - 1, Math.floor(this.progress * (this.totalFrames - 1)));
    this.targetFrameIndex = frameIndex;

    this.onFrameChange(this.progress, frameIndex, this.totalFrames);
  }

  /**
   * Intercepts mouse wheel for virtual scroll animation
   */
  handleWheel(e) {
    e.preventDefault();
    if (!this.isLoaded) return;

    // Sensitivity tuning: 1 scroll tick (~100px) moves ~1.5 to 2 frames
    const sensitivity = 0.0006;
    const delta = e.deltaY;
    this.updateProgress(this.progress + (delta * sensitivity));
  }

  /**
   * Intercepts touch gestures for mobile smooth scrolling
   */
  handleTouchStart(e) {
    if (e.touches && e.touches[0]) {
      this.touchStartY = e.touches[0].clientY;
    }
  }

  handleTouchMove(e) {
    if (!this.isLoaded || !e.touches || !e.touches[0]) return;
    e.preventDefault();

    const currentY = e.touches[0].clientY;
    const deltaY = this.touchStartY - currentY;
    this.touchStartY = currentY;

    const touchSensitivity = 0.002;
    this.updateProgress(this.progress + (deltaY * touchSensitivity));
  }

  /**
   * Starts event listeners and requestAnimationFrame render loop
   */
  startLoop() {
    window.addEventListener('wheel', this.handleWheel, { passive: false });
    window.addEventListener('touchstart', this.handleTouchStart, { passive: true });
    window.addEventListener('touchmove', this.handleTouchMove, { passive: false });
    window.addEventListener('resize', this.handleResize, { passive: true });
    this.renderLoop();
  }

  stopLoop() {
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
    window.removeEventListener('wheel', this.handleWheel);
    window.removeEventListener('touchstart', this.handleTouchStart);
    window.removeEventListener('touchmove', this.handleTouchMove);
    window.removeEventListener('resize', this.handleResize);
  }

  renderLoop() {
    if (this.isLoaded) {
      if (this.useLerp && !this.isReducedMotion) {
        const diff = this.targetFrameIndex - this.virtualFrame;
        if (Math.abs(diff) > 0.001) {
          this.virtualFrame += diff * this.lerpFactor;
        } else {
          this.virtualFrame = this.targetFrameIndex;
        }
      } else {
        this.virtualFrame = this.targetFrameIndex;
      }

      const frameToDraw = Math.round(this.virtualFrame);

      if (frameToDraw !== this.renderedFrameIndex) {
        this.renderFrame(frameToDraw);
      }
    }

    this.animFrameId = requestAnimationFrame(this.renderLoop);
  }

  /**
   * Renders specified frame onto canvas with object-fit: cover scaling
   */
  renderFrame(index, force = false) {
    const img = this.images[index];
    if (!img || !this.ctx) return;

    if (!force && index === this.renderedFrameIndex) return;

    const canvasW = this.canvas.width;
    const canvasH = this.canvas.height;

    const imgW = img.naturalWidth || img.width || 1920;
    const imgH = img.naturalHeight || img.height || 1080;

    const canvasAspect = canvasW / canvasH;
    const imgAspect = imgW / imgH;

    let drawW, drawH, offsetX, offsetY;

    if (canvasAspect > imgAspect) {
      drawW = canvasW;
      drawH = canvasW / imgAspect;
      offsetX = 0;
      offsetY = (canvasH - drawH) / 2;
    } else {
      drawW = canvasH * imgAspect;
      drawH = canvasH;
      offsetX = (canvasW - drawW) / 2;
      offsetY = 0;
    }

    this.ctx.fillStyle = '#08090c';
    this.ctx.fillRect(0, 0, canvasW, canvasH);
    this.ctx.drawImage(img, offsetX, offsetY, drawW, drawH);

    this.renderedFrameIndex = index;
  }

  /**
   * Jump directly to specific frame index
   */
  jumpToFrame(index) {
    const clampedIndex = Math.max(0, Math.min(this.totalFrames - 1, index));
    this.targetFrameIndex = clampedIndex;
    this.virtualFrame = clampedIndex;
    const newProgress = clampedIndex / (this.totalFrames - 1);
    this.updateProgress(newProgress);
  }

  setLerp(enabled) {
    this.useLerp = enabled;
  }

  setReducedMotion(reduced) {
    this.isReducedMotion = reduced;
  }
}
