import { resolve } from 'path';
import { defineConfig } from 'vite';
import tslOperatorPlugin from 'vite-plugin-tsl-operator';

export default defineConfig({
  base: '/animated_web_background/',
  publicDir: 'public',
  server: {
    port: 3000,
    open: true
  },
  plugins: [
    tslOperatorPlugin({ logs: false })
  ],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        cyberFrame: resolve(__dirname, 'cyber-frame-app/index.html'),
        jellyfish: resolve(__dirname, 'jellyfish-simulation-app/index.html'),
        cursorWave: resolve(__dirname, 'cursor-wave-app/index.html'),
        magneticButton: resolve(__dirname, 'magnetic-button-app/index.html'),
        bloomPortal: resolve(__dirname, 'bloom-portal-scene/index.html'),
        globe: resolve(__dirname, 'interactive-globe-scene/index.html'),
        neuralNetwork: resolve(__dirname, 'neural-network-ai-scene/index.html'),
        digitalLattice: resolve(__dirname, 'digital-experience-lattice-scene/index.html'),
        spaceNebula: resolve(__dirname, 'space-nebula-scene/index.html'),
        scrollCamera: resolve(__dirname, 'scroll-camera-controller/index.html')
      }
    }
  }
});
