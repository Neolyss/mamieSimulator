import { Individu } from './modules/individu.mjs';
import { Mamie } from './modules/mamie.mjs'; 

//variables
let individus = [];
let mamies = [];

let nbIndividus;

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let buttonStart = document.getElementById("start");

buttonStart.addEventListener("click", main);
// Appel du main
main();

function main() {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    nbIndividus = document.getElementById("nbIndividu").value;
    genererMamies();
    genererPopDepart();
    afficherPopulation();
    afficherMamies();
}

function genererMamies(){
    mamies = [];
	for (var i = 0 ; i<10 ; i++){
		mamies[i] = new Mamie(canvas.width,canvas.height);
	}
}

function genererPopDepart(){
    individus = [];
	for (var i = 0 ; i<nbIndividus ; i++){
		individus[i] = new Individu(canvas.width,canvas.height);
	}
}

function afficherMamies() {
    for (let mamie of mamies) {
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(mamie.getX(),mamie.getY(),10,10);
    }
}

function afficherPopulation() {
    for (let individu of individus) {
        ctx.fillStyle = "#0000FF";
        ctx.fillRect(individu.getX(),individu.getY(),5,5);
    }
}
//Constantes :
var probaMutation = document.getElementById("probaMutation").value;

var nbParents = document.getElementById("nbParents").value;


var generation = 0;
var bestFitness = 0;
var individuFinal;
var vitesseAnimation = document.getElementById("vitesse").value;

function nouvelleGeneration(){
    //Calcul de la fitness pour tous les individus
	for(var i=0;i<individus.length;i++){
		individus[i].calculerFitness();
	}
    //Tri des individus en fonction de leur fitness
	individus.sort(function(a, b) {
  		return b.fitness - a.fitness;
	});
    //Calcul de la mailleur fitness
	if(individus[0].fitness>bestFitness){
		bestFitness = individus[0].fitness;
	}
    //On écrit sur la page la meilleur fitness
	document.getElementById("meilleurFitness").innerHTML = "Meilleure fitness : "+ bestFitness;

    //La 2nd moitié de la nouvelle génération mute
	for (var i = (nbParents*nbIndividus)/2 ; i<nbIndividus ; i++){
		muter(individus[i]);
	}

    //le nombre de génération incrémente
	generation++;
	document.getElementById("generation").innerHTML = "Génération : "+ generation;

    //On passe à l'étape suivante
	//Itterer();
}

function selection(oldGeneration){
    //On sauvegarde la vielle génération dans oldIndividus
    var newGeneration = [];

    //la première moitié de la vielle génération deviens la première moitié de la nouvelle génération
    for(var i = 0 ; i<Math.round(nbParents*nbIndividus)/2;i++){
        newGeneration[i] = oldIndividus[i];
        newGeneration[i].x = 1;
        newGeneration[i].y = 1;
        newGeneration[i].fitness = 0;
        newGeneration[i].step = 0;
        newGeneration[i].enVie = true;
    }
    //La vielle génération baise dur, ce qui rempli l'autre moitié de la nouvelle génération
    for(var i = Math.round(nbParents*nbIndividus)/2 ; i<nbIndividus;i++){
        newGeneration[i] = reproduire(oldIndividus[0],oldIndividus[i-Math.round(0.5*nbIndividus)]);
    }

    //On return la nouvelle génération
    return newGeneration;
}
function reproduire(individu1,individu2){
	var individu = new Individu();
	for(var i =0;i<individu.genome.length;i+=2){
		try{
			individu.genome[i] = individu1.genome[i];
			individu.genome[i+1] = individu2.genome[i+1];
		}catch(e){

		}
	}
	return individu;
}

function muter(individu){
	for (var i = 0; i < individu.genome.length; i++) {
		if(Math.random()<probaMutation){
			individu.genome[i] = getRandomInt(20);
		}
	}
}
