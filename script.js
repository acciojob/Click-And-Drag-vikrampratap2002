const items = document.querySelector('.items');

let isDown = false;
let startX;
let scrollLeft;

items.addEventListener('mousedown', (e) => {
  isDown = true;
  items.style.cursor = 'grabbing';
  
  startX = e.pageX - items.offsetLeft;
  scrollLeft = items.scrollLeft;
});

items.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();

  const x = e.pageX - items.offsetLeft;
  const walk = (x - startX) * 2;

  items.scrollLeft = scrollLeft - walk;
});

items.addEventListener('mouseup', () => {
  isDown = false;
  items.style.cursor = 'grab';
});

items.addEventListener('mouseleave', () => {
  isDown = false;
  items.style.cursor = 'grab';
});