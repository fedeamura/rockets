class ADN {
  constructor(genes) {
    if (genes) {
      this.genes = genes;
    }
    //Si no me vienen genes, genero aleatorio
    else {
      this.genes = [];
      for (var i = 0; i < lifespan; i++) {
        this.genes[i] = p5.Vector.random2D();
        this.genes[i].setMag(maxforce);
      }
    }
  }

  //Mezcla genes
  crossover(padre) {
    var newgenes = [];
    //Elijo un punto medio de los genes
    var mid = floor(random(this.genes.length));
    for (var i = 0; i < this.genes.length; i++) {
      // Si 'i' es mayor al 'medio' el gen tiene que venir de el mismo
      if (i > mid) {
        newgenes[i] = this.genes[i];
      }
      //sino del padre
      else {
        newgenes[i] = padre.genes[i];
      }
    }
    return new ADN(newgenes);
  }

  //Vario aleatoriamente el gen
  mutar() {
    for (var i = 0; i < this.genes.length; i++) {
      //Solo a algunos pocos genes los modifico
      if (random(1) < 0.001) {
        this.genes[i] = p5.Vector.random2D();
        this.genes[i].setMag(maxforce);
      }
    }
  }
}
