function tilfeldigTall(fra,til,type){
	var tall;
	if (type == "flyttall"){
		tall = fra + Math.random()*(til-fra);
	}
	else if (type == "heltall") {
		tall = Math.round( fra + Math.random()*(til-fra) );
	}
	return tall;
}
function listeTilfeldigeTall(antall,fra,til,type){
	var liste = [];
	
	for (var i = 0; i< antall; i++){
		liste[i] = tilfeldigTall(fra,til,type);
	}
	return liste;
}
function minsteVerdiListe(liste){
	var minsteVerdi;
	minsteVerdi = liste[0];
	for (var i=1; i < liste.length; i++){
		if (minsteVerdi > liste[i] ) minsteVerdi = liste[i];
	}
	return minsteVerdi;
}
function størsteVerdiListe(liste){
	var storsteVerdi;
	storsteVerdi = liste[0];
	for (var i=1; i < liste.length; i++){
		if (storsteVerdi < liste[i] ) storsteVerdi = liste[i];
	}
	return storsteVerdi;
}
function sumListe(liste){
	var sum = 0;
	for (var i = 0; i<liste.length;i++ ){
		sum = sum + liste[i];
	}
	return sum;
}
