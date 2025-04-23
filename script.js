// Select the canvas element and set up the context
const canvas = document.getElementById('animated-bg');
const ctx = canvas.getContext('2d');

// Set canvas size to fill the browser window
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Variables for animation
let blobs = [];
const blobCount = 8;
const maxRadius = 150;
const minRadius = 50;

// Generate random blobs
function createBlobs() {
  blobs = [];
  for (let i = 0; i < blobCount; i++) {
    blobs.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * (maxRadius - minRadius) + minRadius,
      dx: (Math.random() - 0.5) * 2,
      dy: (Math.random() - 0.5) * 2,
      color: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)`
    });
  }
}

createBlobs();

// Animate blobs
function animateBlobs() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  blobs.forEach(blob => {
    blob.x += blob.dx;
    blob.y += blob.dy;

    if (blob.x - blob.radius < 0 || blob.x + blob.radius > canvas.width) blob.dx *= -1;
    if (blob.y - blob.radius < 0 || blob.y + blob.radius > canvas.height) blob.dy *= -1;

    ctx.fillStyle = blob.color;
    ctx.beginPath();
    ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
    ctx.fill();
  });
  requestAnimationFrame(animateBlobs);
}

animateBlobs();
