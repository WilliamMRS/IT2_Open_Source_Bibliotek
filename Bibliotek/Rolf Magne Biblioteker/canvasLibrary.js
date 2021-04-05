//---------------------------------------------------------------------------------------------------
// Globale variabler som benyttes i biblioteket
var canvas // Canvas 
var ctx;   // Drawing context (canvas.getDrawingContext("2d")
//---------------------------------------------------------------------------------------------------
//---INNEHOLDER FUNKSJONER FOR Å 
//		TEGNE GRUNNLEGGENDE ELEMENTER I CANVAS
//		TRANSFORMASJON FOR ROTASJON AV OBJEKTER RUNDT REFERANSEPUNKT
//
function tegnPolyLinje(x,y,antall,farge){ //x,y er arrayer med koordinatene
	ctx.beginPath();
	ctx.strokeStyle = farge;
	ctx.moveTo(x[0],y[0]); // Flytt til første punkt
	for (var i=1; i<=( antall-1); i++){
		ctx.lineTo(x[i],y[i]); // Tegn linje til de neste punktene
	}	 
	ctx.stroke(); // Tegn ut resultatet
}
function tegnFyltPolyLinje(x,y,antall,farge){ //x,y er arrayer med koordinatene.(Trenger ikke å være lukket.)
	ctx.beginPath();
	ctx.fillStyle = farge;
	ctx.moveTo(x[0],y[0]); // Flytt til første punkt
	for (var i=1; i<=( antall-1); i++){
		ctx.lineTo(x[i],y[i]); // Tegn linje til de neste punktene
	}	 
	ctx.lineTo(x[0],y[0]); // Lukk ploygonet
	ctx.fill(); // og fyll med farge
}
function tegnSirkel(xSenter,ySenter,radius,farge){
	ctx.beginPath();
	ctx.strokeStyle = farge;
	ctx.arc(xSenter,ySenter,radius,0,2*Math.PI); // Hele sirkelen !
	ctx.stroke();
}
function tegnFyltSirkel(xSenter,ySenter,radius,farge){
	ctx.beginPath();
	ctx.fillStyle = farge;
	ctx.arc(xSenter,ySenter,radius,0,2*Math.PI); // Hele sirkelen !
	ctx.fill();
}
function tegnTekst(tekst,x,y,font,farge){ //x,y er nedre venstre hjørne
	ctx.font = font; // Format som: "12px Arial"
	ctx.fillStyle = farge ;
	ctx.textAlign = "left"  ;  // Can be left/rigth/center
	ctx.fillText(tekst,x,y)  ; // Alternative method strokeText
}
function tegnTekstRotert(tekst,x,y,font,farge,vinkel){ //x,y er nedre venstre hjørne. Rotasjon mot klokka
	ctx.font = font; // Format som: "12px Arial"
	ctx.fillStyle = farge ;
	ctx.textAlign = "left"  ;  // Can be left/rigth/center
	
	ctx.translate(x,y);
	ctx.rotate(vinkel*Math.PI/180.);
   ctx.translate(-x,-y);
	ctx.fillText(tekst,x,y)  ; // Alternative method strokeText
	ctx.setTransform(1, 0, 0, 1, 0, 0);
}
function tegnFirkant(x,y,bredde,hoyde,farge){ //x,y er øvre venstre hjørne
	ctx.beginPath();
	ctx.lineWidth = 2;
	ctx.strokeStyle = farge;
	ctx.moveTo(x,y);
	ctx.lineTo(x+bredde,y);
	ctx.lineTo(x+bredde,y+hoyde);
	ctx.lineTo(x       ,y+hoyde);
	ctx.lineTo(x,y);
	ctx.stroke();
}
function tegnFyltFirkant(x,y,bredde,hoyde,farge){ //x,y er øvre venstre hjørne
	ctx.beginPath();
	ctx.fillStyle = farge;
	ctx.moveTo(x,y);
	ctx.lineTo(x+bredde,y);
	ctx.lineTo(x+bredde,y+hoyde);
	ctx.lineTo(x       ,y+hoyde);
	ctx.lineTo(x,y);
	ctx.fill();
}
function tegnRegulærMangekant(xs,ys,radius,antall,vinkel,farge){ // antall er hjørner, vinkel gir første punktet.
	var x=[],y=[],angle,dAngle;
	angle = vinkel;
	dAngle = (2*Math.PI)/antall;
	for (i=0; i< antall;i++){
		x[i] = xs+radius*Math.cos(angle);
		y[i] = ys+radius*Math.sin(angle);
		angle = angle + dAngle;
	}
	tegnPolyLinje(x,y,antall,farge);
}
function tegnFyltRegulærMangekant(xs,ys,radius,antall,vinkel,farge){
	var x=[],y=[],angle,dAngle;
	angle = vinkel;
	dAngle = (2*Math.PI)/antall;
	for (i=0; i< antall;i++){
		x[i] = xs+radius*Math.cos(angle);
		y[i] = ys+radius*Math.sin(angle);
		angle = angle + dAngle;
	}
	tegnFyltPolyLinje(x,y,antall,farge);
}
function setBoksRotasjon(boksSenterX,boksSenterY,vinkel){ // Vinkelen er effektiv rotasjon
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.translate(boksSenterX,boksSenterY);
	ctx.rotate(vinkel*Math.PI/180.);
   ctx.translate(-boksSenterX,-boksSenterY);
}
function setBoksRotasjonSkalering(boksSenterX,boksSenterY,vinkel,skalerX,skalerY){  
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.translate(boksSenterX,boksSenterY);
	ctx.rotate(vinkel*Math.PI/180.);
	ctx.scale(skalerX,skalerY); // Boksen skaleres i begge retninger etter rotasjon
   ctx.translate(-boksSenterX,-boksSenterY);
}
function setBoksDeltaRotasjon(boksSenterX,boksSenterY,deltaVinkel){ // Rotasjonsvinkelen økes med deltaVinkel
	ctx.translate(boksSenterX,boksSenterY);
	ctx.rotate(deltaVinkel*Math.PI/180.);
   ctx.translate(-boksSenterX,-boksSenterY);
}
function setBoksIngenRotasjon(){ // Rotasjonen nullstilles med denne funksjonen
	ctx.setTransform(1, 0, 0, 1, 0, 0);
}
	
	
