// Select the canvas element and set up the context
const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');

// Resize canvas to fill the viewport
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Wave properties
const waves = [];
const waveCount = 5;
const waveSpeed = 0.02;
const waveAmplitude = 100;
const waveFrequency = 0.02;

// Generate waves
for (let i = 0; i < waveCount; i++) {
  waves.push({
    phase: Math.random() * Math.PI * 2,
    speed: waveSpeed + Math.random() * 0.01,
    amplitude: waveAmplitude + Math.random() * 50,
    frequency: waveFrequency + Math.random() * 0.01,
    color: `rgba(0, 0, 0, ${0.2 + Math.random() * 0.3})`,
  });
}

// Electric blue flashes
const flashes = [];
function createFlash() {
  flashes.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 50 + 50,
    alpha: 1,
    decay: 0.02,
  });
}
setInterval(createFlash, 2000);

// Draw waves
function drawWaves() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  waves.forEach((wave, index) => {
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);

    for (let x = 0; x < canvas.width; x++) {
      const y =
        canvas.height / 2 +
        Math.sin(x * wave.frequency + wave.phase) * wave.amplitude;
      ctx.lineTo(x, y);
    }

    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.closePath();

    ctx.fillStyle = wave.color;
    ctx.fill();

    wave.phase += wave.speed;
  });
}

// Draw flashes
function drawFlashes() {
  flashes.forEach((flash, index) => {
    ctx.beginPath();
    const gradient = ctx.createRadialGradient(
      flash.x,
      flash.y,
      0,
      flash.x,
      flash.y,
      flash.radius
    );
    gradient.addColorStop(0, `rgba(0, 255, 255, ${flash.alpha})`);
    gradient.addColorStop(1, 'rgba(0, 255, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.arc(flash.x, flash.y, flash.radius, 0, Math.PI * 2);
    ctx.fill();

    flash.alpha -= flash.decay;
    if (flash.alpha <= 0) {
      flashes.splice(index, 1);
    }
  });
}

// Animation loop
function animate() {
  drawWaves();
  drawFlashes();
  requestAnimationFrame(animate);
}

animate();
