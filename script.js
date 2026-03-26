const cubes = document.querySelectorAll(".cube");
const container = document.querySelector(".items");

let activeCube = null;
let offsetX = 0;
let offsetY = 0;

cubes.forEach(cube => {
  cube.addEventListener("mousedown", (e) => {
    activeCube = cube;

    const rect = cube.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    cube.style.position = "absolute";
    cube.style.zIndex = "1000";
  });
});

document.addEventListener("mousemove", (e) => {
  if (!activeCube) return;

  const containerRect = container.getBoundingClientRect();

  let x = e.clientX - containerRect.left - offsetX;
  let y = e.clientY - containerRect.top - offsetY;

  x = Math.max(0, Math.min(x, container.clientWidth - activeCube.offsetWidth));
  y = Math.max(0, Math.min(y, container.clientHeight - activeCube.offsetHeight));

  activeCube.style.left = x + "px";
  activeCube.style.top = y + "px";
});

document.addEventListener("mouseup", () => {
  activeCube = null;
});