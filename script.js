const cubes = document.querySelectorAll('.cube');
const container = document.querySelector('.items');

let currentCube = null;
let offsetX = 0;
let offsetY = 0;

cubes.forEach((cube, index) => {
  // Set initial grid positions manually
  cube.style.left = (index % 2) * 100 + "px";
  cube.style.top = Math.floor(index / 2) * 100 + "px";

  cube.addEventListener('mousedown', (e) => {
    currentCube = cube;

    offsetX = e.clientX - cube.offsetLeft;
    offsetY = e.clientY - cube.offsetTop;
  });
});

document.addEventListener('mousemove', (e) => {
  if (!currentCube) return;

  let x = e.clientX - offsetX;
  let y = e.clientY - offsetY;

  // Boundary constraints
  const containerRect = container.getBoundingClientRect();
  const cubeRect = currentCube.getBoundingClientRect();

  const maxX = container.clientWidth - cubeRect.width;
  const maxY = container.clientHeight - cubeRect.height;

  x = Math.max(0, Math.min(x, maxX));
  y = Math.max(0, Math.min(y, maxY));

  currentCube.style.left = x + "px";
  currentCube.style.top = y + "px";
});

document.addEventListener('mouseup', () => {
  currentCube = null;
});