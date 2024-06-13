const CARTEW = 180;
const CARTEH = 245;

class Carte {
	constructor(x, y, f){
		this.posX = x;
		this.posY = y;
		this.face = f;
		this.visible = false;
		this.trouve = false;

	}
	
	dessinerCarte(){
		if(this.visible){
			if(this.face==1){
				gc.fillStyle = "#FF0000";
			}
			if(this.face==2){
				gc.fillStyle = "#000000";
			}
			if(this.face==3){
				gc.fillStyle = "#00FF00";
			}
			if(this.face==4){
				gc.fillStyle = "#FFFF00";
			}
            if(this.face==5){
				gc.fillStyle = "#FF00FF";
			}
            if(this.face==6){
				gc.fillStyle = "#00FFFF";
			}
			

		}
		else{
			if(this.trouve){ // Si les cartes sont trouvées, leur dos devient blanc.
				gc.fillStyle = "#FFFFFF";
			}
			else{
			gc.fillStyle = "#0000FF";
			}			
		}
		gc.fillRect(this.posX, this.posY, CARTEW, CARTEH);
}
}