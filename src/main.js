import './style.css'

const root = document.documentElement;
const cursorOctagon = document.getElementById('cursor-octagon');
const trailContainer = document.getElementById('cursor-trails');

// State
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let currentX = mouseX;
let currentY = mouseY;
const lerpFactor = 0.1; // Smoothness

// Parallax Targets
const heroBase = document.querySelector('.layer-base .hero-img');
const heroReveal = document.querySelector('.layer-reveal .hero-img');
const title = document.querySelector('.main-title');

// Track Mouse
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  spawnTrail(mouseX, mouseY);
});

// Animation Loop
function animate() {
  // Lerp current position towards target mouse position
  currentX += (mouseX - currentX) * lerpFactor;
  currentY += (mouseY - currentY) * lerpFactor;

  // Update CSS variables for Mask and Cursor
  root.style.setProperty('--mx', `${currentX}px`);
  root.style.setProperty('--my', `${currentY}px`);

  // Parallax logic (shift elements opposite to mouse)
  // 0,0 is center of screen for calculation
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const percentX = (currentX - centerX) / centerX; // -1 to 1
  const percentY = (currentY - centerY) / centerY; // -1 to 1

  // Apply parallax
  applyParallax(heroBase, percentX, percentY, 10);
  applyParallax(heroReveal, percentX, percentY, 10); // Sync with base
  applyParallax(title, percentX, percentY, -15); // Title moves opposite

  requestAnimationFrame(animate);
}

function applyParallax(element, px, py, intensity) {
  if (!element) return;
  const x = px * intensity;
  const y = py * intensity;
  element.style.transform = `translate(${x}px, ${y}px)`;
}

// Trail Logic
let lastTrailTime = 0;
const TRAIL_INTERVAL = 50; // ms

function spawnTrail(x, y) {
  const now = Date.now();
  if (now - lastTrailTime < TRAIL_INTERVAL) return;
  lastTrailTime = now;

  const trail = document.createElement('div');
  trail.className = 'trail-piece';

  // Position trail exactly where mouse WAS
  // Note: Trail should be static at creation point, then fade
  trail.style.left = `${x}px`;
  trail.style.top = `${y}px`;

  trailContainer.appendChild(trail);

  // Remove after animation
  setTimeout(() => {
    trail.remove();
  }, 500); // Match CSS animation duration
}

// Add Trail Styles dynamically or in CSS
// Styles are now in style.css

animate();
