class Rocket {
  constructor(adn) {
    this.w = 20;

    this.pos = createVector((width - this.w) / 2, height - this.w);
    this.vel = createVector();
    this.acc = createVector();

    this.historialPos = [];

    if (adn) {
      this.adn = adn;
    } else {
      this.adn = new ADN();
    }
    this.fitness = 0;

    this.chocado = false;
    this.exito = false;

    this.barra = new Barra();
    this.target = new Target();
  }

  empujar(fuerza) {
    this.acc.add(fuerza);
  }

  calcularEficacia() {
    var d = dist(this.pos.x, this.pos.y, this.target.pos.x + this.target.w / 2, this.target.pos.y + this.target.h / 2);

    this.fitness = map(d, 0, width, width, 0);

    // this.fitness = map(d, width, 0, 0, 1);
    if (this.exito) {
      this.fitness *= 10;
    } else {
      this.fitness /= 10;
    }

    // if (this.chocado) {
    // }
  }

  update() {
    if (this.chocado || this.exito) return;

    this.acc.add(this.adn.genes[count]);
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.vel.limit(4);
    this.vel.mult(0.99);

    this.historialPos.push(this.pos.copy());

    let chocado = false;
    let exito = false;

    //Me fui a la derecha
    if (this.pos.x + this.w / 2 > width) {
      chocado = true;
    }

    //Me fui a la izquierda
    if (this.pos.x - this.w / 2 < 0) {
      chocado = true;
    }

    //Me fui abajo
    if (this.pos.y + this.w / 2 > height) {
      chocado = true;
    }

    //Me fui arriba
    if (this.pos.y - this.w / 2 < 0) {
      chocado = true;
    }

    // //Choque la barra
    // if (
    //   this.validarChoque(
    //     this.pos.x - this.w / 2,
    //     this.w,
    //     this.pos.y - this.w / 2,
    //     this.w,
    //     this.barra.pos.x,
    //     this.barra.w,
    //     this.barra.pos.y,
    //     this.barra.h
    //   )
    // ) {
    //   chocado = true;
    // }

    //Exito
    if (
      this.validarChoque(
        this.pos.x - this.w / 2,
        this.w,
        this.pos.y - this.w / 2,
        this.w,
        this.target.pos.x,
        this.target.w,
        this.target.pos.y,
        this.target.h
      )
    ) {
      exito = true;
      this.count = count;
    }

    this.chocado = chocado;
    this.exito = exito;
    if (this.chocado || this.exito) {
      this.vel.mult(0);
      this.acc.mult(0);
    }
  }

  validarChoque(x1, w1, y1, h1, x2, w2, y2, h2) {
    let cx1 = x1 + w1 > x2 && x1 + w1 < x2 + w2;
    let cx2 = x1 > x2 && x1 < x2 + w2;
    let cx3 = x1 < x2 && x1 + w1 > x2 + w2;

    let cy1 = y1 + h1 > y2 && y1 + h1 < y2 + h2;
    let cy2 = y1 > y2 && y1 < y2 + h2;
    let cy3 = y1 < y2 && y1 + h1 > y2 + h2;

    return (cx1 || cx2 || cx3) && (cy1 || cy2 || cy3);
  }

  draw() {
    push();

    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());

    noStroke();

    if (this.chocado) {
      fill(255, 0, 0);
    } else if (this.exito) {
      fill(0, 255, 0);
    } else {
      fill(255);
    }
    rectMode(CENTER);
    rect(0, 0, this.w, this.w);
    pop();
  }
}
