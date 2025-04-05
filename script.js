// Get canvas and context
const canvas = document.getElementById("nn-canvas");
const ctx = canvas.getContext("2d");

// Set initial canvas dimensions
let width, height;
const leftNeurons = [];
const rightNeurons = [];
const numNeurons = 10;
const center = { x: 0, y: 0 };

// Resize canvas and position neurons
function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;

  center.x = width / 2;
  center.y = height / 2;

  leftNeurons.length = 0;
  rightNeurons.length = 0;

  const spacing = height / (numNeurons + 1);

  for (let i = 0; i < numNeurons; i++) {
    const y = spacing * (i + 1);
    leftNeurons.push({ x: width * 0.15, y });
    rightNeurons.push({ x: width * 0.85, y });
  }
}

// Draw a neuron with glowing effect
function drawNeuron(x, y, glow) {
  ctx.beginPath();
  ctx.arc(x, y, 6, 0, 2 * Math.PI);
  ctx.fillStyle = `rgba(245, 197, 24, ${glow})`;
  ctx.shadowColor = "#f5c518";
  ctx.shadowBlur = glow * 20;
  ctx.fill();
  ctx.shadowBlur = 0;
}

// Draw a bezier connection curve between neuron and center
function drawCurve(from, to, t) {
  const cpX = (from.x + to.x) / 2;
  const cpY = from.y - 80 + Math.sin(t + from.y) * 20;

  ctx.beginPath();
  ctx.moveTo(from.x, from.y);
  ctx.quadraticCurveTo(cpX, cpY, to.x, to.y);

  const glow = 0.4 + 0.6 * Math.abs(Math.sin(t + from.y / 100));
  ctx.strokeStyle = `rgba(245, 197, 24, ${glow})`;
  ctx.lineWidth = 2;
  ctx.shadowColor = "#f5c518";
  ctx.shadowBlur = glow * 20;
  ctx.stroke();
  ctx.shadowBlur = 0;
}

// Main animation loop
function animate(t) {
  ctx.clearRect(0, 0, width, height);

  leftNeurons.forEach(neuron => {
    const glow = Math.abs(Math.sin(t / 500 + neuron.y));
    drawNeuron(neuron.x, neuron.y, glow);
    drawCurve(neuron, center, t / 500);
  });

  rightNeurons.forEach(neuron => {
    const glow = Math.abs(Math.cos(t / 500 + neuron.y));
    drawNeuron(neuron.x, neuron.y, glow);
    drawCurve(neuron, center, t / 500 + 1);
  });

  requestAnimationFrame(animate);
}

// Init
resizeCanvas();
window.addEventListener("resize", resizeCanvas);
animate(0);
