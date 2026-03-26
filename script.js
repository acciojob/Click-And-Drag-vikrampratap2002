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
    cube.style.cursor = "grabbing";
  });
});

document.addEventListener("mousemove", (e) => {
  if (!activeCube) return;

  const containerRect = container.getBoundingClientRect();

  let x = e.clientX - containerRect.left - offsetX;
  let y = e.clientY - containerRect.top - offsetY;

  // Boundary control
  x = Math.max(0, Math.min(x, container.clientWidth - activeCube.offsetWidth));
  y = Math.max(0, Math.min(y, container.clientHeight - activeCube.offsetHeight));

  activeCube.style.left = x + "px";
  activeCube.style.top = y + "px";
});

document.addEventListener("mouseup", () => {
  if (activeCube) {
    activeCube.style.cursor = "grab";
  }
  activeCube = null;
});

describe("Drag Test", () => {

  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should drag cube", () => {

    cy.get('.items').should('be.visible');

    cy.get('.cube').first()
      .trigger('mousedown', { which: 1, clientX: 100, clientY: 100 })
      .trigger('mousemove', { clientX: 250, clientY: 250 })
      .trigger('mouseup');

    cy.get('.cube').first()
      .should('have.css', 'position', 'absolute');
  });

});