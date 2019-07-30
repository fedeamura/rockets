class Barra {
  constructor() {
    this.w = 200;
    this.h = 10;

    this.pos = createVector((width - this.w) / 2, 150);
  }

  draw() {
    noStroke();
    fill(255);
    rect(this.pos.x, this.pos.y, this.w, this.h);
  }
}
