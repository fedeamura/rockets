//Cada cohete vive solo 400 frames
const lifespan = 400;
//Fuerza maxima que se le aplica al cohete
const maxforce = 0.2;

//Frame actual
var count = 0;

let poblacion;
let barra;
let target;

let historial = [];

function setup() {
  createCanvas(500, 500);

  poblacion = new Poblacion();
  barra = new Barra();
  target = new Target();
}

// function keyPressed() {
//   if (key == "ArrowLeft") {
//     rocket.empujar(createVector(-maxforce, 0));
//     return;
//   }

//   if (key == "ArrowRight") {
//     rocket.empujar(createVector(maxforce, 0));
//     return;
//   }

//   if (key == "ArrowUp") {
//     rocket.empujar(createVector(0, -maxforce));
//     return;
//   }
//   if (key == "ArrowDown") {
//     rocket.empujar(createVector(0, maxforce));
//     return;
//   }
// }
function draw() {
  background(0);

  // for (let i = 0; i < historial.length; i++) {
  //   let h = historial[i];

  //   stroke(255, 10);
  //   beginShape(LINES);
  //   for (let j = 0; j < h.length; j++) {
  //     vertex(h[j].x, h[j].y);
  //   }
  //   endShape();
  // }

  // for (let i = 0; i < 1000; i++) {
  poblacion.run();

  count++;
  if (count == lifespan) {
    poblacion.evaluar();
    poblacion.seleccionarMejores();
    count = 0;
  }

  // barra.draw();
  target.draw();
  // }
}
