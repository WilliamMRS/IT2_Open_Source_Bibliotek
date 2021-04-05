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
function finnIndeksListe(liste,verdi){
	for (var i=0; i < liste.length; i++){
		if (Math.abs(verdi-liste[i] ) < 0.000001) return i;
	}
	return -1;
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
function gjennomsnittsverdiListe(liste){
	var gjennomsnitt;
	gjennomsnitt = sumListe(liste)/liste.length;
	return gjennomsnitt;
}
function variasjonsbreddeListe(liste){
	return størsteVerdiListe(liste)-minsteVerdiListe(liste);
}
function stdavvikListe(liste){
	var stdAvvik,gjsnitt,sumKvadrat;
	gjsnitt = gjennomsnittsverdiListe(liste);
	sumKvadrat = 0;
	for (var i=0;i<liste.length;i++){
		sumKvadrat = sumKvadrat + (liste[i]-gjsnitt)*(liste[i]-gjsnitt);
	}
	stdAvvik = Math.sqrt(sumKvadrat/liste.length);
	return stdAvvik;
}
function sorterListeØkende(liste){
	var liste1 = [], liste2 = [];
	var minVerdi,maksVerdi,indeks;
	
	liste1 = liste;
	maksVerdi = størsteVerdiListe(liste);
	
	for (var i=0;i < liste.length;i++){
		minVerdi = minsteVerdiListe(liste);
		liste2.push(minVerdi);
		indeks = finnIndeksListe(liste1,minVerdi);
		liste1[indeks] = maksVerdi + 10;
	}
	return liste2;
}
function medianListe(listeInn){
	var senter,median;
	var liste = [];
	liste = sorterListeØkende(listeInn);
	
	senter = liste.length/2 ;
	
// Antall i lista er et partall
	if (senter == Math.round(senter) ) {
		median = (liste[senter-1]+liste[senter])/2 ;
	}
// Antall i lista er et oddetall
	else {
		median = liste[Math.floor(senter)];
	}
	return median;
}
function tellTreffListe(liste,treff,avvik = 0.001){
	var antall = 0;
	for (var i = 0; i < liste.length; i++){
		if (Math.abs( liste[i]-treff) < avvik) {
			antall = antall + 1;
		}
	}
	return antall;
}










