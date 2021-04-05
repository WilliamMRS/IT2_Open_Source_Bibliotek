function visKlokke(x){ // Viser desimaltid i klokkeformat (hh:mm)
	var hh = Math.floor(x);
	var mm = parseFloat((x-hh)*60).toFixed(0);
	var tid = hh+'.'+mm;
	if (mm < 10) tid = hh+"."+"0"+mm;
	return tid;
}
function visDato(obsData){ // Omregner "unix time" til dat
	var value = obsData.starttid*1000;
	var date = new Date(value+500);
	var dd  = date.getDate();
	var mm  = Number(date.getMonth()) +1;
	var yy  = date.getFullYear();
	var ddmmyy = String(dd)+"."+String(mm)+"."+String(yy);
	return ddmmyy;
}
function glattTempData(obsData){ // Glatter ut de observerte temperaturene.						 
   var temp;
	var newArray = [];
	var num = obsData.tid.length;
	console.log("Glatter...");
	newArray.push(0.6666*obsData.temp[0]+0.3333*obsData.temp[1]);
	for (i=1; i <=  num - 2; i++){ // tid bør generelt ligge mellom to indekser
		 temp = 0.5*obsData.temp[i]+0.25*(obsData.temp[i-1]+obsData.temp[i+1])
		 newArray.push(temp);
	}	
	newArray.push(0.6666*obsData.temp[num-1]+0.3333*obsData.temp[num-2]);
	for (var i = 0; i< newArray.length-1;i++) obsData.temp[i]=newArray[i];
}


// finner laveste temp
function minTemp(tempData) {
    return Math.min.apply(Math, tempData);
}

// finner høyeste temp
function maxTemp(tempData) {
    return Math.max.apply(Math, tempData);
}


// looper gjennom arrayen for tidspunkt og finner tidspunktet nærmest 
// tiden du ønsker å finne temperaturen til
// oppgir desimaltid

function hentTemp(tid, tidData, tempData) {
    
    var index = 0;
    
    for (var i = 0; i < tidData.length; i++) {
        
        var a = Math.abs(tid - tidData[i]);
        var b = Math.abs(tid - tidData[index]);
        
        if (a < b) {
            index = i;
        }
    }
    
    return tempData[index];
}