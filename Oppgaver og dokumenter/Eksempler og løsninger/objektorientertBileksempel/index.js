/*jslint devel: true */
window.onload = winInit;
var ctx, canvas, bil1, bil2, astra, golf;

function winInit(){
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	bil1 = new BilObjekt("mini", "blue", 0, 300); // Fra superklassen
	bil2 = new BilObjekt("van", "red", 100, 300);
	astra = new OpelBil("astra", "yellow", 250, 300); // Fra subklassen (arver metoder og egenskaper)
	golf = new VWGolf("golf", "Pink", 350, 300);

	setInterval(animasjon,1000/20);
}

function animasjon(){
	ctx.clearRect(0, 0, 1000, 1000);

		bil1.tegn(); 	
		bil1.flytt(2,0);
		bil2.tegn(); 	
		bil2.flytt(2,0);
		astra.tegn(); 	
		astra.flytt(2,0);
		golf.tegn();
		golf.flytt(10,0);

		if (bil1.x > 500) bil1.x = -100;
		if (bil2.x > 500) bil2.x = -100;
		if (golf.x > 500) golf.x = -100;
		if (astra.x > 500) {
		var punkt = astra.posisjon;
		console.log ("Astra er nå her:", punkt[0], punkt[1]);
		astra.x = -100;
	}
}

class BilObjekt{
	constructor(modell,farge,x,y){
		// Bilen har modellnavn,farge og startposisjon posisjon.
		this.farge  = farge;
		this.modell = modell;
		this.x = x;
		this.y = y;  
		if (modell == "mini"){
			this.lengde = 60; 
			this.høyde  = 30;
		}
		else if (modell == "van"){
			this.lengde = 120;
			this.høyde = 60
		}
	}
	tegn(){ // Metode for å tegne
		drawFilledSquare(ctx, this.x, this.y - this.høyde, this.høyde, this.lengde, this.farge);
		drawFilledCircle (ctx, this.x + this.lengde / 4, this.y, this.høyde*0.2, "black");
		drawFilledCircle (ctx, this.x + 3 * this.lengde / 4, this.y, this.høyde * 0.2, "black");
		drawText(ctx, this.modell,this.x + 10,this.y-10,"black", "11px Arial");
	}
	flytt(x, y){ // Metode for å beregne forflytning (vektor)
		this.x = this.x + x;
		this.y = this.y + y;
	}
	get posisjon(){ // En get metode leverer en verdi fra klassen, her en array
		return [this.x,this.y];
	}
}

class OpelBil extends BilObjekt{
	constructor(type,farge,x,y){
		super("mini", farge, x, y);
		this.type = type;
	}
	tegn(){ // Overstyrer tegn metoden
		drawFilledSquare(ctx, this.x, this.y - this.høyde, this.høyde, this.lengde, this.farge);
		drawFilledCircle (ctx, this.x + this.lengde / 4, this.y, this.høyde * 0.2, "black");
		drawFilledCircle (ctx, this.x + 3 * this.lengde / 4, this.y, this.høyde * 0.2, "black");
		drawText(ctx, this.type, this.x + 10, this.y - 10,"black", "12px Arial");
	}
}


class VWGolf extends BilObjekt{
	constructor(type, farge, x, y){
		super("mini", farge, x, y);
		this.type = type;
	}
} 
