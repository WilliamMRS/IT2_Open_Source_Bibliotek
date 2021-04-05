var canvas,ctx;

window.onload = winInit;

function winInit(){
   canvas 	= document.getElementById("canvas");
	ctx 		= canvas.getContext("2d");
	testStatistikk();
}
function testStatistikk(){  // Quick and dirty for å sjekke skjellettet
	var tall;
	var liste = [];
	
	tall = tilfeldigTall(5.0,10.0,"flyttall");
   console.log("Tilfeldig flyttall:",tall);
	
	tall = tilfeldigTall(5,10,"heltall");
   console.log("Tilfeldig heltall:",tall);
	
	liste = listeTilfeldigeTall(10,1,5,"heltall");
	console.log("Liste tilfeldige heltall:",liste);
	
	liste = listeTilfeldigeTall(10,1,5,"flyttall");
	console.log("Liste tilfeldige flyttall:",liste);
	
	liste = listeTilfeldigeTall(10,1,6,"heltall");	
	console.log("Liste tilfeldige heltall:",liste);
	
	tall = minsteVerdiListe(liste)
	console.log("Minstverdi:",tall);
	tall = størsteVerdiListe(liste)
	console.log("Størsteverdi",tall);
	
	tall = sumListe(liste)
	console.log("Sum:",tall);

}

	/*
	tall = gjennomsnittsverdiListe(liste)
	console.log("Gjennomsnitt:",tall);
	
	tall = stdavvikListe(liste);
	console.log("Standardavvik:",tall);
	
	liste = sorterListeMinkende(liste);
	console.log("Sortert liste minkende:",liste);
	
	liste = sorterListeØkende(liste);
	console.log("Sortert liste økende:",liste);
	
	tall = medianListe(liste);
	console.log("Median:",tall);
	
	tall = tellTreffListe(liste,3);
	console.log("Antall treere ", tall);
	*/

 