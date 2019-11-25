import { getRandomInt } from './utils.mjs';
//Classe qui représente les mamies
class Mamie{
    x;
    y;
    directionX;
    directionY;
    constructor(sizeOfTheCanvas){
        this.x = getRandomInt(sizeOfTheCanvas);
        this.y = getRandomInt(sizeOfTheCanvas);
    }

    deplacer(){
        this.x = this.x + this.directionX;
        this.y = this.y + this.directionY;
    }
}

export {Mamie};
