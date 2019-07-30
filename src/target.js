class Target {
  constructor() {
    this.w = 10;
    this.h = 10;
    this.pos = createVector((width - this.w) / 2, 50);
  }

  draw() {
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    fill(255);
    rect(0, 0, this.w, this.h);
    pop();
  }
}
