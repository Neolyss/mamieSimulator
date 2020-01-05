/**définition des classes**/
import { getRandomInt } from './utils.mjs';
//Classe qui représente les individus
class Individu {
    fitness;
	x;
	y;
	genome = [];
	enVie;
    directionX;
    directionY;

    canvasWidth;
    canvasHeight;

    constructor(canvasWidth,canvasHeight){
		this.x = getRandomInt(canvasWidth);
		this.y =  getRandomInt(canvasHeight);
		this.fitness = 0;

        this.canvasHeight = canvasHeight;
        this.canvasWidth = canvasWidth;
        //initialisation du génome
		this.genome[0] = getRandomInt(100)/2.0; //génome de distance de vision
        this.genome[1] = getRandomInt(100)/50.0; //génome de vitesse
        console.log("GENOME distance: " + this.genome[0]);
        console.log("GENOME vitesse: " + this.genome[1]);

		this.enVie = true;
	}

    isEnVie(){
        return this.enVie;
    }

    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }

    getDirectionX(){
        return directionX;
    }

    getDirectionY(){
        return directionY;
    }

    setDirectionX(directionX){
        this.directionX = directionX;
    }

    setDirectionY(directionY){
        this.directionY = directionY;
    }

    deplacer(){ // Fait déplacer l'individu
        this.x = this.x + this.directionX;
        this.y = this.y + this.directionY;

        if(this.x<0){
            this.x = 0;
        }
        if(this.x> this.canvasWidth -30){
            this.x = this.canvasWidth;
        }
        if(this.y<0){
            this.y = 0;
        }
        if(this.y > this.canvasHeight -30){
            this.y = this.canvasHeight;
        }
    }
}

export {Individu};
