import { MagneticButton } from './magnetic-button.js';

document.addEventListener('DOMContentLoaded', () => {
  // Attach Magnetic Button instances to all [data-magnetic] triggers
  const instances = MagneticButton.attachAll('[data-magnetic]', {
    strength: 0.8,
    maxDistance: 100,
    stiffness: 180,
    damping: 18,
    mass: 0.15
  });

  // Slider bindings for live physics tuning
  const sliders = [
    { id: 'strength', formatter: val => parseFloat(val).toFixed(2) },
    { id: 'maxDistance', formatter: val => `${val}px` },
    { id: 'stiffness', formatter: val => `${parseInt(val, 10)}` },
    { id: 'damping', formatter: val => `${parseInt(val, 10)}` }
  ];

  sliders.forEach(({ id, formatter }) => {
    const input = document.getElementById(`input-${id}`);
    const valDisplay = document.getElementById(`val-${id}`);

    if (input && valDisplay) {
      input.addEventListener('input', (e) => {
        const numVal = parseFloat(e.target.value);
        valDisplay.textContent = formatter(numVal);

        // Update all magnetic instances live
        instances.forEach(inst => {
          inst.updateOptions({ [id]: numVal });
        });
      });
    }
  });
});
