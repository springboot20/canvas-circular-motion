const canvas = document.getElementById("canvas-screen");
const context = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

let mouseCoords = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};
addEventListener("mousemove", (event) => {
  mouseCoords.x = event.clientX;
  mouseCoords.y = event.clientY;
});

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const colors = ["#2c3e50", "#e74c3c", "#bcf0f1", "#3498db", "#2980b9"];

class Particle {
  constructor({ x, y }, radius) {
    this.position = {
      x,
      y,
    };

    this.radians = Math.random() * Math.PI * 2;
    this.radius = radius;
    this.velocity = 0.05;
    this.distance = randomIntFromRange(50, 120);
    this.color = colors[Math.floor(Math.random() * colors.length)];

    this.draw = () => {
      context.beginPath();
      context.arc(this.position.x, this.position.y, this.radius, Math.PI * 2, false);
      context.fillStyle = this.color;
      context.fill();
      context.closePath();
    };

    this.update = () => {
      this.radians += this.velocity;

      // this.lastMouse.x += (mouseCoords.x - this.lastMouse.x) * 0.05;
      // this.lastMouse.y += (mouseCoords.y - this.lastMouse.y) * 0.05;

      this.position.x = mouseCoords.x + Math.cos(this.radians) * this.distance;
      this.position.y = mouseCoords.y + Math.sin(this.radians) * this.distance;

      this.draw();
    };
  }
}

let particles = [];

function init() {
  particles = [];

  for (let index = 0; index < 30; index++) {
    let radius = Math.random() * 4 + 1;

    let position = {
      x: canvas.width / 2,
      y: canvas.height / 2,
    };

    particles.push(new Particle(position, radius));
  }
}

function animate() {
  requestAnimationFrame(animate);

  context.fillStyle = "rgba(255, 255, 255, 0.1)";
  context.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => {
    particle.update();
  });
}

init();
animate();
