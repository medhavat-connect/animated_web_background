import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '..');
const publicImagesDir = path.join(rootDir, 'public', 'images');
const fallbackImagesDir = path.join(rootDir, 'images');

let targetDir = publicImagesDir;
let publicPrefix = 'images/';

if (!fs.existsSync(publicImagesDir)) {
  if (fs.existsSync(fallbackImagesDir)) {
    targetDir = fallbackImagesDir;
  } else {
    console.error('Error: Neither public/images nor images directory found!');
    process.exit(1);
  }
}

const supportedExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.avif'];

const files = fs.readdirSync(targetDir);
const imageFiles = files
  .filter(file => {
    const ext = path.extname(file).toLowerCase();
    return supportedExtensions.includes(ext);
  })
  .sort((a, b) => {
    return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
  });

console.log(`[Manifest Generator] Found ${imageFiles.length} image frames in ${targetDir}`);

if (imageFiles.length === 0) {
  console.warn('[Manifest Generator] Warning: No frame images found!');
}

const frameUrls = imageFiles.map(file => `${publicPrefix}${file}`);

// Detect pattern example
const firstFile = imageFiles[0] || '';
const lastFile = imageFiles[imageFiles.length - 1] || '';

const manifest = {
  totalFrames: imageFiles.length,
  firstFrame: firstFile,
  lastFrame: lastFile,
  frames: frameUrls,
  generatedAt: new Date().toISOString()
};

const outputDir = path.join(rootDir, 'public');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: recursive });
}

const outputPath = path.join(outputDir, 'frame-manifest.json');
fs.writeFileSync(outputPath, JSON.stringify(manifest, null, 2), 'utf-8');

console.log(`[Manifest Generator] Wrote frame manifest to ${outputPath}`);
