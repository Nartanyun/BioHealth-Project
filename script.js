const canvas = document.getElementById('animated-bg');
const ctx = canvas.getContext('2d');
let width, height;
let shapes = [];

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize);
resize();

function createShapes(count) {
  shapes = [];
  for (let i = 0; i < count; i++) {
    shapes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 50 + 10,
      dx: (Math.random() - 0.5) * 1.5,
      dy: (Math.random() - 0.5) * 1.5,
      color: 'rgba(0, 0, 0, 0.3)'
    });
  }
}

createShapes(80);

function animate() {
  ctx.clearRect(0, 0, width, height);
  shapes.forEach(shape => {
    shape.x += shape.dx;
    shape.y += shape.dy;

    if (shape.x < 0 || shape.x > width) shape.dx *= -1;
    if (shape.y < 0 || shape.y > height) shape.dy *= -1;

    shape.color = Math.random() < 0.01
      ? 'rgba(0, 191, 255, 0.6)'
      : 'rgba(0, 0, 0, 0.3)';

    ctx.fillStyle = shape.color;
    ctx.beginPath();
    ctx.arc(shape.x, shape.y, shape.size, 0, Math.PI * 2);
    ctx.fill();
  });
  requestAnimationFrame(animate);
}

animate();
