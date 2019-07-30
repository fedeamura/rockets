class Poblacion {
  constructor() {
    this.popsize = 25;
    this.rockets = [];
    this.mejores = [];

    //Genero los cohetes
    for (var i = 0; i < this.popsize; i++) {
      this.rockets[i] = new Rocket();
    }
  }

  evaluar() {
    var maxfit = 0;

    let cantidadExito = 0;

    //Calculo la eficacia de cada cohete
    for (var i = 0; i < this.popsize; i++) {
      this.rockets[i].calcularEficacia();

      if (this.rockets[i].exito) {
        cantidadExito++;
        historial.push(this.rockets[i].historialPos);
      }

      //Guardo la mayor eficacia
      if (this.rockets[i].fitness > maxfit) {
        maxfit = this.rockets[i].fitness;
      }
    }

    //Normalizo las eficacias
    for (var i = 0; i < this.popsize; i++) {
      this.rockets[i].fitness /= maxfit;
    }

    const p = cantidadExito / this.rockets.length;
    console.log("Exito", p);
    // if (p == 1) {
    //   this.exito = true;
    //   return;
    // }

    this.mejores = [];

    //Hago que las eficacias vayan del 1 al 100
    //Los cohetes con mayor eficacias son mas probables de que aparezcan en la lista de mejores

    // for (var i = 0; i < cohetesExito; i++) {
    //   var n = this.rockets[i].fitness * 100;
    //   for (var j = 0; j < n; j++) {
    //     this.mejores.push(this.rockets[i]);
    //   }
    // }

    let cohetesExito = _.filter(this.rockets, x => x.exito == true);
    for (var i = 0; i < cohetesExito; i++) {
      var n = cohetesExito[i].fitness * 100;
      n *= map(cohetesExito[i].count, 0, lifespan, lifespan, 0);

      for (var j = 0; j < n; j++) {
        this.mejores.push(cohetesExito[i]);
      }
    }

    if (this.mejores.length == 0) {
      for (var i = 0; i < this.popsize; i++) {
        var n = this.rockets[i].fitness * 100;

        for (var j = 0; j < n; j++) {
          this.mejores.push(this.rockets[i]);
        }
      }
    }
  }

  seleccionarMejores() {
    // if (this.exito) {
    //   this.rockets;
    //   return;
    // }

    const newRockets = [];

    for (var i = 0; i < this.rockets.length; i++) {
      //Elijo dos genes aleatorios
      var parentA = random(this.mejores).adn;
      var parentB = random(this.mejores).adn;
      //Creo un hijo mezclando estos dos genes
      var child = parentA.crossover(parentB);

      //Y lo modifico un poquito
      child.mutar();

      //Lo meto en el listado de nuevos cohetes
      newRockets[i] = new Rocket(child);
    }

    this.rockets = newRockets;
  }

  run() {
    for (var i = 0; i < this.popsize; i++) {
      this.rockets[i].update();
      this.rockets[i].draw();
    }
  }
}
