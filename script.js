// script.js

const container = document.getElementById('container');
const cubes    = document.querySelectorAll('.cube');
const CUBE_SIZE = 72;
const COLORS = [
  '#4f46e5', '#0891b2', '#059669', '#d97706',
  '#dc2626', '#7c3aed', '#db2777', '#65a30d'
];

let dragging = null;
let offsetX  = 0;
let offsetY  = 0;

// Initial grid layout
function layoutGrid() {
  const COLS = 4, GAP = 16, PAD = 16;
  cubes.forEach((cube, i) => {
    cube.style.background = COLORS[i % COLORS.length];
    cube.style.left = (PAD + (i % COLS)        * (CUBE_SIZE + GAP)) + 'px';
    cube.style.top  = (PAD + Math.floor(i/COLS) * (CUBE_SIZE + GAP)) + 'px';
  });
}

// Drag start
function onMouseDown(e) {
  dragging = e.currentTarget;
  const rect = dragging.getBoundingClientRect();
  offsetX = e.clientX - rect.left;
  offsetY = e.clientY - rect.top;
  dragging.classList.add('dragging');
  e.preventDefault();
}

// Drag move
function onMouseMove(e) {
  if (!dragging) return;
  const box = container.getBoundingClientRect();
  const maxX = box.width  - CUBE_SIZE;
  const maxY = box.height - CUBE_SIZE;

  const x = Math.max(0, Math.min(e.clientX - box.left - offsetX, maxX));
  const y = Math.max(0, Math.min(e.clientY - box.top  - offsetY, maxY));

  dragging.style.left = x + 'px';
  dragging.style.top  = y + 'px';
}

// Drag end
function onMouseUp() {
  if (!dragging) return;
  dragging.classList.remove('dragging');
  dragging = null;
}

// Event listeners
cubes.forEach(cube => {
  cube.addEventListener('mousedown', onMouseDown);
});
document.addEventListener('mousemove', onMouseMove);
document.addEventListener('mouseup',   onMouseUp);

layoutGrid();