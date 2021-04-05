/*jslint devel: true */

function winInit() {
    værdata.sjekkData(); //Sjekker om dataen er tilgjengelig, skrives ut i konsollen.

    //Håndtak til HTML
    vinterSELECT = document.getElementById("vinterSELECT");
    dataSELECT = document.getElementById("dataSELECT");

    outputDIV = document.getElementById("outputDIV");
    tabellOutput = document.getElementById("tabellOutput");
    warningTekst = document.getElementById("warningTekst");

    warningTekst.style.display = "none";

    //canvas
    dataCanvas = document.getElementById("dataCanvas");
    //checkboxes
    temperaturBox = document.getElementById("temperaturBox");
    nedbørBox = document.getElementById("nedbørBox");
}
window.onload = winInit;

createOutput = function(){
    let a = [];
    let b = [];
    if(vinterSELECT.value === "null"){ //Sjekker om brukeren har valgt vinter og ikke "velg vinter" alternativet
        warningTekst.style.display = "block";
    }else{
        warningTekst.style.display = "none";
        if(dataSELECT.value === "temperatur"){ //om brukeren valgte temperatur kjører denne koden.
            a[0] = hentData.temperatur(vinterSELECT.value, "desember");
            a[1] = hentData.temperatur(vinterSELECT.value, "januar"); //henter dataene og legger de inn i en array.
            a[2] = hentData.temperatur(vinterSELECT.value, "februar");

            b[0] = Math.round(((a[0] + a[1] + a[2]) / 3)*100)/100; //finner snittet
            b[1] = findMaxValue(a); //Bruker biblioteket
            b[2] = findMinValue(a); //Bruker biblioteket
            b[3] = "Hele Vinteren";
            b[4] = "i " + findMonth(findMaxValue_arrayIndex(a)); //henter hvilken måned hadde maks Temperatur
            b[5] = "i " + findMonth(findMinValue_arrayIndex(a)); //henter hvilken måned hadde min Temperatur

            drawHtmlTable(tabellOutput, ["Snitt Temperatur - ", "Maks Temperatur - ", "Min Temperatur"], b);

        }
        else if(dataSELECT.value === "nedbør"){ //Om brukeren valgte nedbør kjører denne koden.

            a[0] = hentData.nedbør(vinterSELECT.value, "desember");
            a[1] = hentData.nedbør(vinterSELECT.value, "januar"); //henter dataene og legger de inn i en array.
            a[2] = hentData.nedbør(vinterSELECT.value, "februar");

            b[0] = Math.round(((a[0] + a[1] + a[2]) / 3)*100)/100 + " %"; //finner snittet
            b[1] = findMaxValue(a) + " %"; //Bruker biblioteket
            b[2] = findMinValue(a) + " %"; //Bruker biblioteket
            b[3] = "Hele Vinteren";
            b[4] = "i " + findMonth(findMaxValue_arrayIndex(a)); //henter hvilken måned hadde maks Nedbør
            b[5] = "i " + findMonth(findMinValue_arrayIndex(a)); //henter hvilken måned hadde min Nedbør

            drawHtmlTable(tabellOutput, ["Snitt Nedbør - ", "Maks Nedbør - ", "Min Nedbør"], b);
        }
    }
}

hentData = {
    nedbør: function(år, måned){
        return værdata["vinterdata"][år][måned]["nedbør"];
    },
    temperatur: function(år, måned){
        return værdata["vinterdata"][år][måned]["temperatur"];
    }
}

function findMaxValue_arrayIndex(array) { //Modifiserte funksjoner for å spytte ut indeksen til det største tallet i datasettet
    let max, i;
    let maxValueIndex;
    max = array[0];
    maxValueIndex = 0;
	for (i = 1; i < array.length; i += 1) {
		if (array[i] > max) {
            max = array[i];
            maxValueIndex = i;
        }
    }
    return maxValueIndex;
}

function findMinValue_arrayIndex(array) { //Modifiserte funksjoner for å spytte ut indeksen til det største tallet i datasettet
    let min, i;
    let minValueIndex;
    min = array[0];
    minValueIndex = 0;
	for (i = 1; i < array.length; i += 1) {
		if (array[i] < min) {
            min = array[i];
            minValueIndex = i;
		}
    }
	return minValueIndex;
}



findMonth = function(a){ //Bruker indeksen for å hente måneden (hjelpefunksjon)
        switch(a) {
            case 0:
            return "desember";
            break;

            case 1:
            return "januar";
            break;

            case 2:
            return "februar";
            break;
    }
}

//Søylediagram Kode
displayDataGraphically = function(a){
    if(a === 1){
        dataCanvas.getContext("2d").clearRect(0, 0, 500, 500); //fjern gammel data først
        nedbørBox.checked = false;
        tegnTemperaturData(); //tegn data
    }else if(a === 0){
        dataCanvas.getContext("2d").clearRect(0, 0, 500, 500); //fjern gammel data først
        temperaturBox.checked = false;
        tegnNedbørdata(); //tegn data
    }else{
        dataCanvas.getContext("2d").clearRect(0, 0, 500, 500);
    }
}

tegnTemperaturData = function(){
    //beregner snittverdier og legger dem inn i en array
    let b = [];
    b[0] = hentData.temperatur("16/17", "desember");
    b[1] = hentData.temperatur("16/17", "januar");
    b[2] = hentData.temperatur("16/17", "februar");
    b[3] = hentData.temperatur("15/16", "desember");
    b[4] = hentData.temperatur("15/16", "januar");
    b[5] = hentData.temperatur("15/16", "februar");
    b[6] = hentData.temperatur("14/15", "desember");
    b[7] = hentData.temperatur("14/15", "januar");
    b[8] = hentData.temperatur("14/15", "februar");
    b[9] = hentData.temperatur("13/14", "desember");
    b[10] = hentData.temperatur("13/14", "januar");
    b[11] = hentData.temperatur("13/14", "februar");
    b[12] = hentData.temperatur("12/13", "desember");
    b[13] = hentData.temperatur("12/13", "januar");
    b[14] = hentData.temperatur("12/13", "februar");
    b[15] = hentData.temperatur("11/12", "desember");
    b[16] = hentData.temperatur("11/12", "januar");
    b[17] = hentData.temperatur("11/12", "februar");
    b[18] = hentData.temperatur("10/11", "desember");
    b[19] = hentData.temperatur("10/11", "januar");
    b[20] = hentData.temperatur("10/11", "februar");

    let a = [];
    a[0] = Math.round(((b[0] + b[1] + b[2]) / 3)*100)/100; 
    a[1] = Math.round(((b[3] + b[4] + b[5]) / 3)*100)/100; 
    a[2] = Math.round(((b[6] + b[7] + b[8]) / 3)*100)/100; 
    a[3] = Math.round(((b[9] + b[10] + b[11]) / 3)*100)/100; 
    a[4] = Math.round(((b[12] + b[13] + b[14]) / 3)*100)/100; 
    a[5] = Math.round(((b[15] + b[16] + b[17]) / 3)*100)/100; 
    a[6] = Math.round(((b[18] + b[19] + b[20]) / 3)*100)/100; 

    //tegner en ramme
    drawSquare({ctx: dataCanvas.getContext("2d"), x: 0, y: 0, height: dataCanvas.height, width: dataCanvas.width, color: "Black"});
    drawColumnChart({                       //Bibliteksfunksjon med et object som parameter for bedre lesbarhet.
        ctx: dataCanvas.getContext("2d"),
        canvas: dataCanvas,
        yData: a,
        cvx: 71,
        cvy: dataCanvas.height,
        number: 7,
        widthPx: 35,
        yScale: 20,
        barColor: "DarkBlue",
        textColor: "Red"
    });
}

tegnNedbørdata = function(){
    //beregner snittverdier og legger dem inn i en array
    let b = [];
    b[0] = hentData.nedbør("16/17", "desember");
    b[1] = hentData.nedbør("16/17", "januar");
    b[2] = hentData.nedbør("16/17", "februar");
    b[3] = hentData.nedbør("15/16", "desember");
    b[4] = hentData.nedbør("15/16", "januar");
    b[5] = hentData.nedbør("15/16", "februar");
    b[6] = hentData.nedbør("14/15", "desember");
    b[7] = hentData.nedbør("14/15", "januar");
    b[8] = hentData.nedbør("14/15", "februar");
    b[9] = hentData.nedbør("13/14", "desember");
    b[10] = hentData.nedbør("13/14", "januar");
    b[11] = hentData.nedbør("13/14", "februar");
    b[12] = hentData.nedbør("12/13", "desember");
    b[13] = hentData.nedbør("12/13", "januar");
    b[14] = hentData.nedbør("12/13", "februar");
    b[15] = hentData.nedbør("11/12", "desember");
    b[16] = hentData.nedbør("11/12", "januar");
    b[17] = hentData.nedbør("11/12", "februar");
    b[18] = hentData.nedbør("10/11", "desember");
    b[19] = hentData.nedbør("10/11", "januar");
    b[20] = hentData.nedbør("10/11", "februar");

    let a = [];
    a[0] = Math.round(((b[0] + b[1] + b[2]) / 3)*100)/100; 
    a[1] = Math.round(((b[3] + b[4] + b[5]) / 3)*100)/100; 
    a[2] = Math.round(((b[6] + b[7] + b[8]) / 3)*100)/100; 
    a[3] = Math.round(((b[9] + b[10] + b[11]) / 3)*100)/100; 
    a[4] = Math.round(((b[12] + b[13] + b[14]) / 3)*100)/100; 
    a[5] = Math.round(((b[15] + b[16] + b[17]) / 3)*100)/100; 
    a[6] = Math.round(((b[18] + b[19] + b[20]) / 3)*100)/100; 

    //tegner en ramme
    drawSquare({ctx: dataCanvas.getContext("2d"), x: 0, y: 0, height: dataCanvas.height, width: dataCanvas.width, color: "Black"});
    drawColumnChart({                       //Bibliteksfunksjon med et object som parameter for bedre lesbarhet.
        ctx: dataCanvas.getContext("2d"),
        canvas: dataCanvas,
        yData: a,
        cvx: 71,
        cvy: dataCanvas.height,
        number: 7,
        widthPx: 35,
        yScale: 2,
        barColor: "Orange",
        textColor: "Red"
    });
}

