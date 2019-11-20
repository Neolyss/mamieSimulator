//définition des classes
class Individu{
    fitness;
	x;
	y;
	genome = [];
	enVie;

    constructor(){
		this.x = 1;
		this.y = 1;
		this.fitness = 0;
		this.step = 0;
        //initialisation du génome
		this.genome[0] = getRandomInt(20);
        this.genome[1] = getRandomInt(20);
        this.genome[2] = getRandomInt(20);

		this.enVie = true;
	}

    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }

    calculerFitness(){
		var distance = Math.sqrt((18.5-this.x)*(18.5-this.x) + (18.5-this.y)*(18.5-this.y));
		var fit = (1/distance) + (1/this.step)*0.001;
		if(fit>this.fitness)
			this.fitness = fit;
	}
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
