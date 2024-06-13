const CARTEW = 180;
const CARTEH = 245;
var img;

class Carte {
	constructor(x, y, f){
		this.posX = x;
		this.posY = y;
		this.face = f;
		this.visible = false;
		this.trouve = false;

	}

	dessinerCarte(){
		img = new Image();
		

		if(this.visible){
			if(isNaN(this.face)==false){ //face n'est pas défini au début donc ça aurait donné une image du nom de carteundefined qui n'existe pas
				img.src = `images/carte${this.face}.png`;
			}
		}

		else{
			if(this.trouve){ // Si les cartes sont trouvées, leur dos devient blanc.
				gc.fillStyle = "#FFFFFF";
			}
			else{
			gc.fillStyle = "#0000FF";
			}
			gc.fillRect(this.posX, this.posY, CARTEW, CARTEH);
		}

		gc.drawImage(img, this.posX, this.posY, CARTEW, CARTEH); //Avec img.onload, l'image ne se charge pas à temps donc on ne la voit pas.

	}
}