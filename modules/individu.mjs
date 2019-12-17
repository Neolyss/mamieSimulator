/**définition des classes**/
import { getRandomInt } from './utils.mjs';
//classe qui représente les individus
class Individu {
    fitness;
	x;
	y;
	genome = [];
	enVie;

    constructor(canvasWidth,canvasHeight){
		this.x = getRandomInt(canvasWidth);
		this.y =  getRandomInt(canvasHeight);
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

export {Individu};
