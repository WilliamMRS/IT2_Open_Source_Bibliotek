var canvas;
var etx; // Global variabel for tegneobjektet som benyttes (Easy2D)
var data; //Dataobservasjoner - Globalt objekt som er lastet inn fra JSON i HTML

var xMin,xMax,yMin,yMax; // Definisjonsmengde og verdimengde til temperaturfunksjonen

var glatt_HtEl; // Variable for "glatteknappen"

window.onload = winInit;

function winInit(){
// Aktiver glattefunksjonen i brukergrensesnittet
	glatt_HtEl = document.getElementById("glatting");
	glatt_HtEl.onclick = glattUtData; // Hendelse for glatting av dataobservasjonene
// Initier den eksterne grafikkpakka
	canvas = document.getElementById("canvas");
	etx = new easy2DGraphics(); // Bruker det eksterne biblioteket
	etx.init(canvas); // Fortell Easy2D hvilke canvas som skal brukes.
// Skriver ut info om JSON dataobservasjonene i konsollet (foreløpig sjekk)
	printData();
// Konverterer først data i minutter over til timer	
	for ( i=0;i < data.tid.length;i++) data.tid[i] = data.tid[i]/60  
// Sett koordinatområder for tegningen av dataene
// (Foreløpig hardkodet....)
    yMin = -12;
	yMax =   4;  
	xMin =   0;
	xMax =  24;
   tegnObservasjoner(); // Tegn observasjonene
    
    // skriver ut info, sted, tiv osv
    info();
    
    // events
    document.getElementById("oppdater").onclick = oppdater;
    document.getElementById("nullstill").onclick = nullstill;
    document.getElementById("glider").oninput = animasjon;
}

function tegnObservasjoner(){ // Tegn ut temperaturobservasjonene i et koordinatsystem
// Definere koordinatsystemet i Easy2D og området i canvas det skal benytte
	etx.xRange(xMin,xMax);  // Min og max verdier for koordinatsystemet (x er timer etter midnatt)
	etx.yRange(yMin,yMax ); // y er temperaturområdet for de observerte dataene
	etx.canvasArea(50,750,50,400); // Pikselkoordinater. Bestemmer her området som etx jobber innenfor.
// Sett bakgrunnsfarge 
	etx.backgroundColor = "lightgrey"; 
	etx.clearCanvas();
// Tegner koordinatsystemet med aksetekster
	etx.drawYgrid("grey",0.5,"no")  // Tegner horisontale linjer i bakgrunnen uten tall
	etx.drawYgrid("orange",1.0,"yes")  // Tegner horisontale linjer i bakgrunnen med tall
	etx.drawXgrid("orange",1.0,"yes" ) // Tegner vertikal linjer i bakgrunnen med tall
	etx.drawBoundary("black");
	etx.text(xMin-0.5,0.5*(yMin+yMax),"Temperatur (celsius)","blue","16px Arial","center","bottom",90); // Rotert text
	etx.text(0.5*(xMin+xMax),yMin-0.5,"Klokkeslett","blue","16px Arial","center","top");

// Metoder for å presenterer datasettet som en polylinje og/eller polymarker
	etx.polyLine(data.tid,data.temp,"red",2); 
	//etx.polyMarker(data.tid,data.temp,"cross","blue"); 
}
function glattUtData(){ // Glatter temperaturdatene og tegner på nytt
	glattTempData(data); // Benytter algoritme fra biblioteket tempAnalyse.js
	tegnObservasjoner();
}
function printData(){ // Skriver ut info om temperaturdatene fra JSON-objektet
	console.log("-----------TEMPDATA---------------");
	console.log("Sted:",data.sted);
	console.log("Dato:",visDato(data));
	console.log("Starttid:", data.starttid); // "Unix time" * 1000 for dette datasettet
	console.log("Antall punkter:", data.tid.length,data.temp.length);
}
function testAnalyseLib(){
	console.log("Tester funksjoner i tempAnalyse.js");
	//console.log("Maxverdi =", finnTempMax(data));
}




// skriver ut sted, tid, høyest og lavest temp
function info() {
    document.getElementById("sted").innerHTML = data.sted;
    document.getElementById("tid").innerHTML = visDato(data);
    document.getElementById("minTemp").innerHTML = minTemp(data.temp);
    document.getElementById("maxTemp").innerHTML = maxTemp(data.temp);
}

// oppdaterer aksene, tegner ny graf og nullstiller glider
function oppdater() {
    yMin = document.getElementById("temp1").value;
	yMax = document.getElementById("temp2").value;  
	xMin = document.getElementById("tid1").value;
	xMax = document.getElementById("tid2").value;
    
    document.getElementById("glider").value = 0;
    document.getElementById("glider").min = xMin;
    document.getElementById("glider").max = xMax;
    
    document.getElementById("gliderTemp").innerHTML = "";
    document.getElementById("gliderTid").innerHTML = "";
    
    tegnObservasjoner();
}

// nullstiller aksene og tegner grafen for hele døgnet
function nullstill() {
    yMin = -12;
	yMax = 4;  
	xMin = 0;
	xMax = 24;
    
    tegnObservasjoner();
}

// beveger en vertikal linje proposjonalt med glideren og viser temp og tid 
function animasjon() {
    
    var rangeValue = document.getElementById("glider").value;
    
    document.getElementById("gliderTemp").innerHTML = hentTemp(rangeValue, data.tid, data.temp);
    document.getElementById("gliderTid").innerHTML = visKlokke(rangeValue);
    
    etx.clearCanvas();
    
    tegnObservasjoner();
    
    etx.beginPath();
    etx.moveTo(rangeValue, yMax);
    etx.lineTo(rangeValue, yMin);
    etx.stroke();
}
