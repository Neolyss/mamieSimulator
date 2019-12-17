import { getRandomInt } from './utils.mjs';
//Classe qui représente les mamies
class Mamie{
    x;
    y;
    directionX;
    directionY;
    constructor(canvasWidth,canvasHeight) {
        this.x = getRandomInt(canvasWidth);
        this.y = getRandomInt(canvasHeight);
    }

    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }

    deplacer(){
        this.x = this.x + this.directionX;
        this.y = this.y + this.directionY;
    }

    rebondirX(){
        this.directionX = - this.directionX;
    }

    rebondirY(){
        this.directionY = - this.directionY;
    }
}

export {Mamie};
