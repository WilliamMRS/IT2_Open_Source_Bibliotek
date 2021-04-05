//---------------------------------------------------------------------------------------------------
// Globale variabler som benyttes : INGEN


//---------------------------------------------------------------------------------------------------
//---FUNKSJONER FOR Å TEGNE DIAGRAMMER
function tegnStolperVertikalt(xData,yData,antall,cvx,cvy,diagramBredde,diagramHøyde, marg,farge){
	var x,y,breddeStolpe,høydeStolpe;
	var autoSkalaY;

	autoSkalaY   = (diagramHøyde  - 2*marg)/Math.max.apply(null,yData); // Skaleringsfaktor for antall
	breddeStolpe = (diagramBredde - 2*marg)/(2*antall-1);   // Bredde for hver stolpe)
	x = cvx+marg;

	for (var i = 0; i < antall; i++){
		høydeStolpe = yData[i]*autoSkalaY;
		y = cvy - marg - høydeStolpe;
		tegnFyltFirkant(x,y,breddeStolpe,høydeStolpe,farge);
		tegnTekst(String(xData[i]),x+0.5*breddeStolpe,cvy-marg+12,"12px Arial")	;	// X-verdi på stolpen
		tegnTekst(String(yData[i]),x+0.3*breddeStolpe,y-2,"12px Arial");		// y-verdi på stolpen
		x = x + 2*breddeStolpe;
	}
}
function tegnStolperHorisontalt(xData,yData,antall,cvx,cvy,diagramBredde,diagramHøyde,marg,farge){
	var x,y,breddeStolpe,høydeStolpe;
	var autoSkalaY;

	autoSkalaY   = (diagramBredde  - 2*marg)/Math.max.apply(null,yData); // Skaleringsfaktor for antall
	breddeStolpe = (diagramHøyde   - 2*marg)/(2*antall-1);   // Bredde for hver stolpe)
	x = cvx+marg;
	y = cvy-marg-breddeStolpe;

	for (var i = 0; i < antall; i++){
		høydeStolpe = yData[i]*autoSkalaY;
		tegnFyltFirkant(x,y,høydeStolpe,breddeStolpe,farge);
		tegnTekst(String(xData[i]),x-12,y+breddeStolpe,"12px Arial")	;	// X-verdi på stolpen
		tegnTekst(String(yData[i]),x+høydeStolpe+2,y+breddeStolpe,"12px Arial");		// y-verdi på stolpen
		y = y - 2*breddeStolpe;
	}
}
