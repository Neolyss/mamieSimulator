import { Individu } from './modules/individu.mjs';
import { Mamie } from './modules/mamie.mjs';
import { getRandomInt } from './modules/utils.mjs';


//variables
let individus = [];
let mamies = [];

let nbEnVie;
let nbIndividus;

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let buttonStart = document.getElementById("start");

//Constantes :
var probaMutation = document.getElementById("probaMutation").value;

let generation = 1;

buttonStart.addEventListener("click", main);
// Appel du main
main();

function main() {
    clear();
    nbIndividus = document.getElementById("nbIndividu").value;
    nbEnVie = nbIndividus;
    genererMamies();
    genererPopDepart();
    afficherPopulation();
    afficherMamies();
    Itterer();
}

// Créer la population de mamie
function genererMamies(){
    mamies = [];
	for (var i = 0 ; i<10 ; i++){
		mamies[i] = new Mamie(canvas.width,canvas.height);
	}
}

// Génère la population d'individus
function genererPopDepart(){
    individus = [];
	for (var i = 0 ; i<nbIndividus ; i++){
		individus[i] = new Individu(canvas.width,canvas.height);
	}
}

// Efface le canvas
function clear(){
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Affichage des mamies
function afficherMamies() {
    for (let mamie of mamies) {
        let img = new Image();
        img.src = '../img/Mamie_vieillard.png';
        ctx.drawImage(img,mamie.getX(),mamie.getY(),30,50);
    }
}

// Affichage des individus
function afficherPopulation() {
    for (let individu of individus) {
        if(individu.enVie){
            let img = new Image();
            img.src = '../img/Perso_etudiant.png';
            ctx.drawImage(img,individu.getX(),individu.getY(),30,30);
        }
    }
}

function nouvelleGeneration(){
    //Tri des individus en fonction de leur fitness
	individus.sort(function(a, b) {
  		return b.fitness - a.fitness;
	});

    let newIndividus = selection(individus);

    //La nouvelle génération mute
	for (var i = 0 ; i<newIndividus.length ; i++){
        if(newIndividus[i] instanceof Individu) {
            console.log("lucas" + i);
        }
		muter(newIndividus[i]);
	}

    // Création de la nouvelle population
    individus = newIndividus;

    // Le nombre de génération incrémente
	generation++;
    // Actualisation du nombre de la génération
	document.getElementById("generation").innerHTML = "Génération : "+ generation;
}

function selection(oldIndividus){
    //On sauvegarde la vielle génération dans oldIndividus
    var newGeneration = [];

    //la première moitié de la vielle génération deviens la première moitié de la nouvelle génération
    //L'ancienne génération crée de nouveaux individus, ce qui rempli l'autre moitié de la nouvelle génération
    for(var i=0; i<nbIndividus/2; i++){
        console.log(Math.round(nbIndividus/2)-i);
        newGeneration[i] = reproduire(oldIndividus[0],oldIndividus[Math.round(nbIndividus/2)-i]);
    }
    for(var i=Math.round(nbIndividus/2); i<nbIndividus; i++){
        newGeneration[i] = oldIndividus[i];
        if(newGeneration[i]==undefined || newGeneration[i]== null){
            newGeneration[i] = new Individu(canvas.width,canvas.height);
        }
        newGeneration[i].x = getRandomInt(canvas.width);
        newGeneration[i].y = getRandomInt(canvas.height);
        newGeneration[i].fitness = 0;
        newGeneration[i].enVie = true;
    }
    //On return la nouvelle génération
    return newGeneration;
}

// Génère la reproduction de deux individus
function reproduire(individu1,individu2){
	let individu = new Individu(canvas.width,canvas.height);
	for(let i = 0 ; i<3 ; i++){
		individu.genome[i] = (individu1.genome[0] + individu2.genome[0])/2.0;
        individu.genome[i] = (individu1.genome[1] + individu2.genome[1])/2.0;
	}
	return individu;
}

// Permet aux individus de muter
function muter(individu){
	for (var i = 0; i < individu.genome.length; i++) {
		if(Math.random()<probaMutation){
			individu.genome[i] = individu.genome[0]++;
		}else if(Math.random()<probaMutation){
            individu.genome[i] = individu.genome[0]--;
        }
	}
}

function Itterer(){
    //Calculs

    //Déplacement des mamies
    for(let mamie of mamies){
        var distance = 100000000;
        var plusProche = null;
        for(let individu of individus){
            if(individu.enVie){
                var distanceTemp =  Math.sqrt((individu.getX() - mamie.getX())*(individu.getX() - mamie.getX()) + (individu.getY() - mamie.getY())*(individu.getY() - mamie.getY()) );
                if(distanceTemp < distance){
                    distance = distanceTemp;
                    plusProche = individu;
                }
            }
        }
        if(plusProche!=null){
            if(plusProche.getX() - mamie.getX() < 0){
                mamie.setDirectionX(-1);
            }else{
                mamie.setDirectionX(1);
            }
            if(plusProche.getY() - mamie.getY() < 0){
                mamie.setDirectionY(-1);
            }else{
                mamie.setDirectionY(1);
            }
            mamie.deplacer();
        }
    }

    // Déplacement des individus
    for(let individu of individus){
        var distance = 100000000;
        var plusProche = null;
        for(let mamie of mamies){
            var distanceTemp =  Math.sqrt((individu.getX() - mamie.getX())*(individu.getX() - mamie.getX()) + (individu.getY() - mamie.getY())*(individu.getY() - mamie.getY()) );
            if(distanceTemp < distance){
                distance = distanceTemp;
                plusProche = mamie;
            }
        }
        if(distance <10 && individu.enVie){
            individu.enVie = false;
            nbEnVie--;
            console.log("En vie : " + nbEnVie);
        }
        if(plusProche!=null && distance<individu.genome[0]){
            if(plusProche.getX() - individu.getX() < 0){
                individu.setDirectionX(individu.genome[1]);
            }else{
                individu.setDirectionX(-individu.genome[1]);
            }

            if(plusProche.getY() - individu.getY() < 0){
                individu.setDirectionY(individu.genome[1]);
            }else{
                individu.setDirectionY(-individu.genome[1]);
            }
            individu.deplacer();
        }
    }

    clear();
    afficherMamies();
    afficherPopulation();

    //Si il n'y a plus d'individus, on créer une nouvelle génération
    if(nbEnVie<=0){
        nouvelleGeneration();
        afficherPopulation();
        nbEnVie = nbIndividus;
    }

    // Permet de boucler, pour avoir l'affichage et les calculs
    setTimeout(Itterer,25);
}
