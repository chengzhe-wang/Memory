window.addEventListener("load", init, false);

var monCanvas,gc;
var maCarte;
const NBLIG = 3, NBCOL = 4, NBMELANGE = 20;
var melange;
const dx = 20; dy = 20;
var premiereCarte, secondeCarte, nbPairesTrouvees;
var mesCartes; //mon Plateau s'appelle mesCartes
var chrono;
var temps = 0;


function init(){
        
    monCanvas = document.getElementById("moncanvas");
    gc = monCanvas.getContext("2d");
    mesCartes = [new Carte()];
    creerPlateau();
    for(i = 0; i<NBMELANGE; i++){
    	melangeCarte();
    }
    afficherPlateau();
    calculerCoordonnees();
    monCanvas.addEventListener("click", choisirCarte, false);
    premiereCarte = undefined;
    deuxiemeCarte = undefined;
    nbPairesTrouvees = 0;

    //Timer
    tps = document.createElement("div");
    tps.id = "temps";
    document.body.appendChild(tps); 
    tps.innerHTML= "Temps passé à jouer : " + temps + " secondes.";
 
}
    
    
/**function intCarte(){ //J'avais créé cette fonction pour mettre un événement à la fonction choisirCarte() mais elle s'est avérée inutile
    choisirCarte(mesCartes[i]);
}**/


function creerPlateau(){
    var x = 10;
    var y = 10;
    var f = 1;
    for(i=0; i<NBLIG; i++){
        for(k=0; k<NBCOL;k++){
            
        mesCartes.push(new Carte(x, y, f));
        x += CARTEW+dx;
            if(f==(NBLIG*NBCOL)/2){
                f = 1;
            } 
            else {
                f += 1;
            }
        
    }
        x = 10;
        y += CARTEH+dy;

    }
    afficherPlateau();
    
}



function choisirCarte(){
    
    sourisX = event.offsetX;
    sourisY = event.offsetY;
    
    if(deuxiemeCarte == undefined){ //Cela empêche le joueur d'afficher plus de 2 cartes à la fois.
	    	for(j=0; j<mesCartes.length; j++){
	        
		    if(mesCartes[j].posX<=sourisX && sourisX<=mesCartes[j].posX+CARTEW && mesCartes[j].posY<=sourisY && sourisY<=mesCartes[j].posY+CARTEH && mesCartes[j].trouve!=true){ //Si la carte est trouvée, on ne peut plus l'afficher
			    	//Lancement du timer au premier clic
			    	if(temps==0){
			    		timer();
			    	}

			    	if(premiereCarte == undefined){
			    		premiereCarte = mesCartes[j];

			    			
			    	}
			    	else if(deuxiemeCarte == undefined){
			    		if(mesCartes[j]!=premiereCarte){ // La deuxième carte ne pourra jamais être la première.
			    			deuxiemeCarte = mesCartes[j];

			    		}
			    	}
			    	mesCartes[j].visible = true;
			    }

			    	afficherPlateau();
		    }
		    if(premiereCarte != undefined && deuxiemeCarte != undefined && deuxiemeCarte!=premiereCarte){ //Les deux cartes ne doivent pas être undefined ni identiques(cette condition peut être enlevée vu que plus haut je fais en sorte qu'ils ne soient jamais identiques)
		    	if(premiereCarte.face == deuxiemeCarte.face){
		    		nbPairesTrouvees++;
		    		premiereCarte.trouve = true; //Les cartes sont trouvées.
		    		deuxiemeCarte.trouve = true;

		    		setTimeout(reinitCartes, 750);

		    		if(nbPairesTrouvees==(NBLIG*NBCOL)/2){ // Si toutes les cartes ont été trouvées, un popup s'affiche et indique que toutes les cartes ont été trouvées.
		    			alert("Vous avez trouvé toutes les cartes ! Votre temps est de " + temps + " secondes.");
		    			clearTimeout(chrono); // On arrête le timer, j'ai dû stocker le setTimeout dans une variable, je ne pouvais pas l'arrêter sans faire ça.
		    		}
		    	}
			    else{
			    	setTimeout(reinitCartes, 750);
		    	}
		    }
    }
}

function melangeCarte(){
    
    var rand1 = Math.floor(1+Math.random()*(NBLIG*NBCOL));
    var rand2 = Math.floor(1+Math.random()*(NBLIG*NBCOL));
    var save = 0;
    var carte1 = mesCartes[rand1].face;
    var carte2 = mesCartes[rand2].face;
    save = carte1;
    mesCartes[rand1].face = carte2;
    mesCartes[rand2].face = save;
}

function afficherPlateau(){ //J'avais mis cette fonction dans la fonction melangeCarte mais c'était trop lourd à charger 20 fois et la page ne marchait plus.
	for(i=0; i<mesCartes.length; i++){
        mesCartes[i].dessinerCarte();   
	}
}

function calculerCoordonnees(){
	coordsCarteX = [];
	coordsCarteY = [];
	for(i=0; i<mesCartes.length; i++){
		coordsCarteX[i] = mesCartes[i].posX;
		coordsCarteY[i] = mesCartes[i].posY;
	}
}

function reinitCartes(){
	premiereCarte.visible = false;
	deuxiemeCarte.visible = false;
	premiereCarte = undefined;
	deuxiemeCarte = undefined;
	afficherPlateau();
}

function timer(){
	temps++;
	tps.innerHTML= "Temps passé à jouer : " + temps + " secondes.";
	chrono = setTimeout(timer, 1000)

}

