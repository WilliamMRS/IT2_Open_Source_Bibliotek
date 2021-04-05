function visTabellHTML(tableId,tableHead,tableData){ 
// First write the table with header fields
	var utskrift = "<table><thead><tr>";
	for (var i = 0; i < tableHead.length; i++){
		utskrift = utskrift + "<th>"+tableHead[i] + "</th>";
	}
	utskrift = utskrift + "</tr></thead>";
	
// Next fill in the content of the table row by row (one row for each iteration of the loop)
   var j = 0;
	while (j < tableData.length) { 
		utskrift = utskrift + 	"<tr>"
		for ( var k = 0; k <  tableHead.length; k++){
			utskrift = utskrift +"<td id >" +tableData[j] +"</td>";
			j = j+ 1;
		}
		utskrift = utskrift + "</tr>";
	}
	utskrift = utskrift + "</table>";	
	tableId.innerHTML = utskrift; // Skriv til HTML
}

function visPunktlisteHTML(listeId,listeData,listeType){ 
	var utskrift;
	if (listeType === "number") utskrift = "<ol>";
	if (listeType === "punkt" ) utskrift = "<ul>";
	
	for (var i=0; i<listeData.length;i++){
		utskrift += "<li>" + listeData[i] + "</li>";
	}
	
	if (listeType === "number")utskrift += "</ol>";
	if (listeType === "punkt") utskrift += "<ul>";
	
	listeId.innerHTML = utskrift; // Skriv til HTML
}
function visLinkListeHTML(listeId,urlListe,navneListe){ // Inneholder url (http://xxx.yyy.zzz og tilhørende navn)
	var utskrift;
	
	utskrift = "<nav><ul>"
	
	for (var i=0; i<urlListe.length;i++){
		utskrift += "<li><a href="+urlListe[i]+">" + navneListe[i] + "</a></li>";
	}
	
	utskrift += "</ul></nav>";
	
	listeId.innerHTML = utskrift; // Skriv til HTML
}
function visValgListeHTML(listeId,valgListe){ // Inneholder url (http://xxx.yyy.zzz og tilhørende navn)
	var utskrift; // Her antas at <select> tag defineres i HTML først. Bare opsjoner fylles inn.
	
	for (var i=0; i<valgListe.length;i++){
		utskrift += '<option>'+ valgListe[i] + '</option>';
	}
	listeId.innerHTML = utskrift; // Skriv til HTML
}