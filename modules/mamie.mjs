import { getRandomInt } from './utils.mjs';
//Classe qui représente les mamies
class Mamie{
    x;
    y;
    directionX;
    directionY;

    canvasWidth;
    canvasHeight;

    constructor(canvasWidth,canvasHeight) {
        this.x = getRandomInt(canvasWidth);
        this.y = getRandomInt(canvasHeight);

        this.canvasHeight = canvasHeight;
        this.canvasWidth = canvasWidth;
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

        if(this.x >= this.canvasWidth){
            this.x = this.canvasWidth;
        }
        if(this.y >= this.canvasHeight){
            this.y = this.canvasHeight;
        }
        if(this.x <= 0){
            this.x = 0;
        }
        if(this.y <= 0){
            this.y = 0;
        }
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
}

export {Mamie};
