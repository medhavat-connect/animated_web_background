import { ScrollSequenceEngine } from './src/heroSequence.js';

document.addEventListener('DOMContentLoaded', async () => {
  // DOM Elements
  const preloader = document.getElementById('preloader');
  const loaderPercent = document.getElementById('loader-percent');
  const loaderBarFill = document.getElementById('loader-bar-fill');
  const loaderSubtext = document.getElementById('loader-subtext');

  const canvas = document.getElementById('hero-canvas');
  const sequenceSection = document.getElementById('sequence-section');
  const storyCards = document.querySelectorAll('.story-card');

  // HUD Elements
  const hudFrameNum = document.getElementById('hud-frame-num');
  const hudProgressPercent = document.getElementById('hud-progress-percent');
  const hudScrubberBg = document.getElementById('hud-scrubber-bg');
  const hudScrubberFill = document.getElementById('hud-scrubber-fill');
  const hudLerpBtn = document.getElementById('hud-lerp-btn');
  const hudPlayBtn = document.getElementById('hud-play-btn');
  const hudTopBtn = document.getElementById('hud-top-btn');

  // Nav & Action Buttons
  const audioToggle = document.getElementById('audio-toggle');
  const motionToggle = document.getElementById('motion-toggle');
  const fullscreenToggle = document.getElementById('fullscreen-toggle');
  const ctaScrollTop = document.getElementById('cta-scroll-top');
  const telemetryFrames = document.getElementById('telemetry-frames');
  const beatCards = document.querySelectorAll('.beat-card');

  // Fetch frame manifest
  let frameUrls = [];
  try {
    const res = await fetch('/frame-manifest.json');
    if (res.ok) {
      const data = await res.json();
      frameUrls = data.frames || [];
    }
  } catch (e) {
    console.warn('Could not load frame-manifest.json, fallback generator...', e);
  }

  // Fallback if manifest empty
  if (frameUrls.length === 0) {
    for (let i = 1; i <= 240; i++) {
      const pad = String(i).padStart(3, '0');
      frameUrls.push(`/images/ezgif-frame-${pad}.jpg`);
    }
  }

  if (telemetryFrames) {
    telemetryFrames.textContent = frameUrls.length;
  }

  // Initialize Scroll Engine
  const engine = new ScrollSequenceEngine({
    canvas,
    section: sequenceSection,
    frameUrls,
    useLerp: true,
    onProgress: (ratio, loaded, total) => {
      const percent = Math.round(ratio * 100);
      loaderPercent.textContent = `${percent}%`;
      loaderBarFill.style.width = `${percent}%`;
      loaderSubtext.textContent = `Preloaded ${loaded} of ${total} high-definition frames...`;
    },
    onFrameChange: (progress, frameIndex, totalFrames) => {
      const padIndex = String(frameIndex + 1).padStart(3, '0');
      hudFrameNum.textContent = `${padIndex} / ${totalFrames}`;
      const percentInt = Math.round(progress * 100);
      hudProgressPercent.textContent = `${percentInt}%`;
      hudScrubberFill.style.width = `${progress * 100}%`;

      // Update story text overlays
      storyCards.forEach((card) => {
        const start = parseFloat(card.dataset.start || '0');
        const end = parseFloat(card.dataset.end || '1');
        if (progress >= start && progress <= end) {
          card.classList.add('active');
        } else {
          card.classList.remove('active');
        }
      });
    },
    onLoadComplete: () => {
      setTimeout(() => {
        preloader.classList.add('hidden');
      }, 300);
    }
  });

  // Start image preloading
  engine.preloadImages();

  // Handle Scrubber Interaction
  let isDraggingScrubber = false;
  const seekFromScrubber = (e) => {
    const rect = hudScrubberBg.getBoundingClientRect();
    const clickX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const progress = clickX / rect.width;
    const targetFrame = Math.round(progress * (engine.totalFrames - 1));
    engine.jumpToFrame(targetFrame);
  };

  hudScrubberBg.addEventListener('mousedown', (e) => {
    isDraggingScrubber = true;
    seekFromScrubber(e);
  });

  window.addEventListener('mousemove', (e) => {
    if (isDraggingScrubber) seekFromScrubber(e);
  });

  window.addEventListener('mouseup', () => {
    isDraggingScrubber = false;
  });

  // Story Beats click to jump
  beatCards.forEach((card) => {
    card.addEventListener('click', () => {
      const frameTarget = parseInt(card.dataset.frame || '0', 10);
      engine.jumpToFrame(frameTarget);
    });
  });

  // HUD Controls
  let isLerpActive = true;
  hudLerpBtn.addEventListener('click', () => {
    isLerpActive = !isLerpActive;
    engine.setLerp(isLerpActive);
    hudLerpBtn.textContent = `LERP: ${isLerpActive ? 'ON' : 'OFF'}`;
  });

  let isPreviewPlaying = false;
  let previewInterval = null;
  hudPlayBtn.addEventListener('click', () => {
    isPreviewPlaying = !isPreviewPlaying;
    hudPlayBtn.textContent = isPreviewPlaying ? 'PAUSE' : 'PREVIEW';

    if (isPreviewPlaying) {
      let currentF = engine.targetFrameIndex;
      previewInterval = setInterval(() => {
        currentF = (currentF + 1) % engine.totalFrames;
        engine.jumpToFrame(currentF);
      }, 33); // ~30 FPS
    } else {
      if (previewInterval) clearInterval(previewInterval);
    }
  });

  hudTopBtn.addEventListener('click', () => {
    if (previewInterval) clearInterval(previewInterval);
    isPreviewPlaying = false;
    hudPlayBtn.textContent = 'PREVIEW';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  if (ctaScrollTop) {
    ctaScrollTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Fullscreen toggle
  fullscreenToggle.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
    }
  });

  // Motion reduced preference
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const handleMotionChange = (e) => {
    engine.setReducedMotion(e.matches);
    motionToggle.innerHTML = e.matches ? '<span>⚡</span> Motion: OFF' : '<span>⚡</span> Motion: ON';
  };
  motionQuery.addEventListener('change', handleMotionChange);
  handleMotionChange(motionQuery);

  motionToggle.addEventListener('click', () => {
    isLerpActive = !isLerpActive;
    engine.setLerp(isLerpActive);
    motionToggle.innerHTML = isLerpActive ? '<span>⚡</span> Smooth: ON' : '<span>⚡</span> Smooth: OFF';
  });

  // Web Audio API Ambient Sound Synthesizer
  let audioCtx = null;
  let isAudioPlaying = false;
  let synthGain = null;

  const initAudioSynth = () => {
    if (audioCtx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();

    // Create dual oscillator cyber ambient pad
    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const filter = audioCtx.createBiquadFilter();
    synthGain = audioCtx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(55, audioCtx.currentTime); // A1 note

    osc2.type = 'sawtooth';
    osc2.frequency.setValueAtTime(110.5, audioCtx.currentTime); // Slight detune

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, audioCtx.currentTime);

    synthGain.gain.setValueAtTime(0.001, audioCtx.currentTime); // Muted start

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(synthGain);
    synthGain.connect(audioCtx.destination);

    osc1.start();
    osc2.start();
  };

  audioToggle.addEventListener('click', () => {
    if (!audioCtx) initAudioSynth();

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    isAudioPlaying = !isAudioPlaying;

    if (isAudioPlaying) {
      synthGain.gain.setTargetAtTime(0.08, audioCtx.currentTime, 0.5);
      audioToggle.innerHTML = '<span>🔊</span> Audio: ON';
      audioToggle.classList.add('active');
    } else {
      synthGain.gain.setTargetAtTime(0.001, audioCtx.currentTime, 0.5);
      audioToggle.innerHTML = '<span>🔈</span> Audio: OFF';
      audioToggle.classList.remove('active');
    }
  });

  // Keyboard Navigation Controls
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      engine.jumpToFrame(engine.targetFrameIndex + 4);
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      engine.jumpToFrame(engine.targetFrameIndex - 4);
    } else if (e.key === 'Home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (e.key === 'End') {
      engine.jumpToFrame(engine.totalFrames - 1);
    }
  });
});
