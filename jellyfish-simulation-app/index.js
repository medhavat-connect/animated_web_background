/**
 * Aurelia WebGPU Jellyfish Simulation — Entry Point
 *
 * Original experiment: Holtsetio (https://holtsetio.com)
 * Source repository:   https://github.com/holtsetio/aurelia
 * License:             MIT License © 2025 Holtsetio
 *
 * Modifications by Medhavat Technologies:
 *  - WebGPU → WebGL graceful fallback initialisation
 *  - Integrated Library Hub navigation
 *  - Removed on-screen Info tweakpane (credits moved to README.md)
 */
import * as THREE from "three/webgpu"
import App from "./src/app";
THREE.ColorManagement.enabled = true

const updateLoadingProgressBar = async (frac, delay=200) => {
    return new Promise(resolve => {
        const progress = document.getElementById("progress")
        // 200px is the width of the progress bar defined in index.html
        progress.style.width = `${frac * 200}px`
        setTimeout(resolve, delay)
    })
}

const createRenderer = () => {
    const renderer = new THREE.WebGPURenderer({
        //forceWebGL: true,
        //antialias: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    return renderer;
}

const error = (msg) => {
    const progressBar = document.getElementById("progress-bar");
    progressBar.style.opacity = 0;
    const error = document.getElementById("error");
    error.style.visibility = "visible";
    error.innerText = "Error: " + msg;
    const veil = document.getElementById("veil");
    error.style.pointerEvents = "auto";
};


const run = async () => {
    let renderer;
    try {
        renderer = createRenderer();
        await renderer.init();
    } catch (err) {
        console.warn("WebGPU initialization failed, attempting fallback:", err);
        try {
            renderer = new THREE.WebGPURenderer({ forceWebGL: true });
            await renderer.init();
        } catch (fallbackErr) {
            error("WebGL / WebGPU is not supported by your browser: " + (err.message || err));
            return;
        }
    }

    const container = document.getElementById("container");
    container.appendChild(renderer.domElement);

    const app = new App(renderer);
    await app.init(updateLoadingProgressBar);
    window.addEventListener("resize", () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        app.resize(window.innerWidth, window.innerHeight);
    });
    const veil = document.getElementById("veil");
    if (veil) veil.style.opacity = "0";
    const progressBar = document.getElementById("progress-bar");
    if (progressBar) progressBar.style.opacity = "0";
    const clock = new THREE.Clock();
    const animate = async () => {
        const delta = clock.getDelta();
        const elapsed = clock.getElapsedTime();
        await app.update(delta, elapsed);
        requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
};

run().catch(err => {
    console.error(err);
    error(err.message || err);
});