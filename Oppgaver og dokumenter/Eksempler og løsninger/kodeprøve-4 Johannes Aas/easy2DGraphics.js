//---easyGraphis - a Fagerlia development for IT-2 - to make canvas drawing much easier
//
//---Coordinate transformation pipeline:
//   User Model Coordinates -> Normalized Canvas Coordinates -> Pixel Coordinates
//        UMC          ->         NCC                   -> PXC
// 

function easy2DGraphics (){ // Object to be created in the program
									 // Constructor: init(canvas)
									 
	this.version= "ver3:March2018",
	this.canvas= "undefined", this.context= "undefined",
	this.backgroundColor="white",
	this.xScale = 200,this.yScale= 200,
	this.xMargin=  10,this.yMargin= 10,
	this.ncX1=  0.0, this.ncX2=  1.0, this.ncY1= 0.0, this.ncY2= 1.0,  // Normalised Canvas Coordinates
	this.ucX1=  0.0, this.ucX2= 10.0, this.ucY1= 0.0, this.ucY2= 10.0, // User Model Coordinates (unrotated)
	this.useMatrix=false;
	this.rotX=  0.0, this.rotY=  0.0, this.rotAngle=0.0,			   // Rotation point and rotation angle
	this.matrixA=1.0, matrixB=0.0,matrixC=0.0,                     // x'=ax+by+c
	this.matrixD=0.0, matrixE=1.0,matrixF=0.0,						   // y'=dx+ey+f
	this.xLT=0.0, this.yLT=0.0,									       // Last point
	
	this.print= false,								  // Set to true if you want to see details execution
	this.trace= false,										

	this.init=
	function (canvas) { // Constructor for the program
			this.canvas = canvas;
			this.context = this.canvas.getContext("2d");
			 
	},
	
	this.showData= // For debugging
	function () {
		console.log("-------------------------------------------------");
		console.log("canvas  : " +this.canvas);
		console.log("context : " +this.context);
		console.log("margins : " +this.xMargin +" " +this.yMargin);
		console.log("viewport: " +this.ncX1 +" " +this.ncX2 +" " +this.ncY1 +" " +this.ncY2);
		console.log("window  : " +this.ucX1 +" " +this.ucX2 +" " +this.ucY1 +" " +this.ucY2);
		console.log("-------------------------------------------------");
	},
//---
//--- Section of functions related to mapping coordinates from a model coordinat system to
//--- to the pixel coordinates used in the canvas. Rotation of the coordinate system is supported.
//	
	this.margins= 
	function(xMargin,yMargin){ // Define a margin in canvas the x- and y-axis
		this.xMargin = xMargin;
		this.yMargin = yMargin;
		
	},
	
	this.window=
	function(xlow,xhigh,ylow,yhigh){ // Set x and y ranges in a single method
		this.ucX1 = xlow;					// Same as calling xrange and yrange
		this.ucX2 = xhigh;	
		this.ucY1 = ylow;	
		this.ucY2 = yhigh;		
	},
	this.xRange= 
	function(xlow,xhigh){ // Set x range only (alternativ to window())
		this.ucX1 = xlow;	
		this.ucX2 = xhigh;		
	},
	this.yRange= 
	function(ylow,yhigh){ // Set y range only (alternativ to window())
		this.ucY1 = ylow;	
		this.ucY2 = yhigh;	
	},
	this.viewport= 
	function(xlow,xhigh,ylow,yhigh){ // Set area on canvas (NB: range 0-1 for canvas width/height
	   this.ncX1 = xlow;	
		this.ncX2 = xhigh;	
	   this.ncY1 = ylow;	
		this.ncY2 = yhigh;
		this.xScale = (xhigh-xlow)*(this.canvas.width-2*this.xMargin);
		this.yScale = (yhigh-ylow)*(this.canvas.height-2*this.yMargin);
		
		if (this.print) console.log ("NDC " ,this.ncX1,this.ncX2,this.ncY1,this.ncY2 );
		if (this.print) console.log ("scaling " +this.xScale +" " +this.yScale );
		if (this.print) console.log ("margin " +this.xMargin +" " +this.yMargin);
	},
	
	this.canvasArea = 
	function(xlow,xhigh,ylow,yhigh){ // Coordinates given in pixels
	//  Benytte lineære transformasjon basert på 2 kjente punkter for å beregne NC fra Pixel på hver akse
	// (0,this.xMargin) og (1,this.canvas.width-this.xMargin) for transformasjon NC->PX langs x-akse
	// (0,this.canvas.height-this.yMargin) og (1,this.yMargin)
	   this.ncX1 = (xlow -this.xMargin)/(this.canvas.width - 2* this.xMargin);
		this.ncX2 = (xhigh-this.xMargin)/(this.canvas.width - 2* this.xMargin);	
	   this.ncY1 = (yhigh-this.canvas.height + this.yMargin)/(2*this.yMargin-this.canvas.height);
		this.ncY2 = (ylow -this.canvas.height + this.yMargin)/(2*this.yMargin-this.canvas.height);
		
		this.xScale = (this.ncX2-this.ncX1)*(this.canvas.width-2*this.xMargin);
		this.yScale = (this.ncY2-this.ncY1)*(this.canvas.height-2*this.yMargin);
		
		if (this.print) console.log ("NDC " ,this.ncX1,this.ncX2,this.ncY1,this.ncY2 );
		if (this.print) console.log ("Scaling " +this.xScale +" " +this.yScale );
		if (this.print) console.log ("Margin " +this.xMargin +" " +this.yMargin);
	},
	
	this.rotation= 
	function(xRotation,yRotation,angle){
		this.rotX = xRotation; 
		this.rotY = yRotation;
		this.rotAngle = angle;
		this.useMatrix = true;
		
		var angleRad = (angle/180.)*Math.PI;
		var sinA = Math.sin(angleRad);
		var cosA = Math.cos(angleRad);
		
		this.matrixA =  cosA;
		this.matrixB = -1.*sinA;
		this.matrixC = -xRotation*cosA + yRotation*sinA + xRotation;
		this.matrixD =  sinA;
		this.matrixE =  cosA;
		this.matrixF = -xRotation*sinA - yRotation*cosA + yRotation;
		
		if (this.trace) console.log("Matrix: " +this.matrixA +" "+this.matrixB +" " +this.matrixC +" " );
		if (this.trace) console.log("        " +this.matrixD +" "+this.matrixE +" " +this.matrixF +" " );
    },
//	
//--- Section of functions related to drawing of basic graphics primitives like:
//--- lines,rectangles,markers,text.
	this.clearCanvas=
	function (){
		this.context.beginPath();
		this.context.fillStyle = this.backgroundColor;
		this.context.rect(0,0,this.canvas.width,this.canvas.height);
		this.context.fill();
	},
	this.beginPath=
	function (){
		this.context.beginPath();
	},
	this.stroke=
	function (){
		this.context.stroke();
	},
	this.moveTo=
	function(x,y) { // Input model coordinates (user coordinates)
		this.transformXY(x,y);
		this.context.moveTo(this.ucpxTransX(this.xLT),this.ucpxTransY(this.yLT));
		if (this.trace) console.log ("moveTo  " +x +" " +y);
	},
	
	this.lineTo= 
	function(x,y) { // Input model coordinates (user coordinates)
		this.transformXY(x,y);
		this.context.lineTo(this.ucpxTransX(this.xLT),this.ucpxTransY(this.yLT));
		if (this.trace) console.log ("lineTo " +x +" " +y);
		
	},
	
	this.polyLine= 
	function(x,y,color="black",lineWidth=1) { // x any y arrays (model coordinates)
		var iL = -1,iH=-1; 
		//console.log("polyline - num of points ",x.length);
		for (i=0;i<x.length;i++){
			if (iL == -1 && x[i] >= this.ucX1 ) iL = i;
		}
		if (iL == -1) return;
		
		for (i=x.length-1;i>iL;i--){
			if (iH == -1 && x[i] <= this.ucX2 ) iH = i;
		}
		if (iH == -1 ) return
		
		// Above a simple clipping algoritm (do not plot outside x-range)
		this.context.beginPath();
		this.context.strokeStyle = color;
		this.context.lineWidth = lineWidth;
		for (var i = iL; i<= iH; i++ ) {
			if (i == iL) 
				this.moveTo(x[i],y[i]);
			else 			
				this.lineTo(x[i],y[i]);
		}
		this.context.stroke();
	},
	
	this.polyMarker= 
	function(x,y,marker="cross",color="black") { // x any y arrays (model coordinates)
 
		for (var i = 0; i < x.length ; i++ ) {
			if (x[i] >= this.ucX1 && x[i] <= this.ucX2) this.marker(x[i],y[i],marker,color);
		}
	},

	this.rectangle= 
	function(x1,y1,x2,y2) {
		this.moveTo(x1,y1);
		this.lineTo(x2,y1);
		this.lineTo(x2,y2);
		this.lineTo(x1,y2);
		this.lineTo(x1,y1);
		if (this.trace) console.log ("rectangle B " +x1 +" " +y1 +" " + +x2 +" " +y2);

	},
	this.fillRectangle= 
	function(x1,y1,x2,y2,color) {
		if (this.trace) console.log ("rectangle B " +x1 +" " +y1 +" " + +x2 +" " +y2);
		
		this.context.beginPath();	 
		this.context.fillStyle=color;
		this.moveTo(x1,y1);
		this.lineTo(x2,y1);
		this.lineTo(x2,y2);
		this.lineTo(x1,y2);
		this.lineTo(x1,y1);
	   this.context.fillStyle=color;
		this.context.fill();


	},
	this.fillCircle=
	function(centerX,centerY,radius,color){
		this.context.beginPath();
		if (print) console.log("fillCircle UC: ",centerX,centerY,radius);
		if (print) console.log("fillCircle PX: " ,
								this.ucpxTransX(centerX),this.ucpxTransY(centerY), 
								this.ucpxTransX(radius)-this.ucpxTransX(0));
								
		this.context.arc(	this.ucpxTransX(centerX),this.ucpxTransY(centerY), 
								this.ucpxTransX(radius)-this.ucpxTransX(0), 0, 2 * Math.PI, false  );
								
		this.context.fillStyle = color;
		this.context.fill();
	},
	
	this.text= // Note that some input are optional (if not given, see defaults )
	function(x,y,text,color="black",font="10px Arial",align="left",baseline="bottom",rotAngle=0) {
		this.context.fillStyle = color;
		this.context.font 	  = font ;
		this.context.textAlign = align ; // Can be left/rigth/center
		this.context.textBaseline = baseline; // Can be top/bottom/middle/alphabetic/hanging
		this.transformXY(x,y);
		if (rotAngle != 0 ){ 
		   var xPx = this.ucpxTransX(this.xLT);
			var yPx = this.ucpxTransY(this.yLT);
			this.context.translate(xPx,yPx);
			this.context.rotate(-rotAngle*Math.PI/180.);
			this.context.translate(-xPx,-yPx);
		}
		this.context.fillText(text,this.ucpxTransX(this.xLT),this.ucpxTransY(this.yLT));
		if (this.trace) console.log ("text " +x +" " +y +" " + text);
		if (rotAngle != 0) {
			this.context.setTransform(1, 0, 0, 1, 0, 0);
		}
	},
	this.textAdvanced = 
	function(x,y,text,color,font,textAlign,textBaseline) { // Will be removed. Use text()
		this.context.font = font ;
		this.context.fillStyle = color;
		this.context.textAlign = textAlign ;           // Can be left/rigth/center
		this.context.textBaseline = textBaseline;      // Can be top,bottom,middle,left,right
		this.transformXY(x,y);
		this.context.fillText(text,this.ucpxTransX(this.xLT),this.ucpxTransY(this.yLT));
		if (this.trace) console.log ("text " +x +" " +y +" " + text);
	},
	
	this.marker=
	function(x,y,type="cross",color="black") {
		
		this.context.font = "10px Arial" ;
		this.context.fillStyle = color;
		this.context.textAlign = "center" ;
		this.context.textBaseline = "middle";
		this.transformXY(x,y);
		
		if (type == "cross") {
			this.context.fillText("X",this.ucpxTransX(this.xLT),this.ucpxTransY(this.yLT));
			
		}
		else if (type == "dot") {
			this.context.fillText(".",this.ucpxTransX(this.xLT),this.ucpxTransY(this.yLT));
			
		}
		else if (type == "circle") {
			this.context.fillText("O",this.ucpxTransX(this.xLT),this.ucpxTransY(this.yLT));
			
		}
		else if (type == "star") {
			this.context.fillText("*",this.ucpxTransX(this.xLT),this.ucpxTransY(this.yLT));
			
		}
		else if (type == "axXmarkerD") {
			var size = (this.ucY2-this.ucY1)/30.
			this.moveTo(x,y); 
			this.lineTo(x,y-size);
			this.textAdvanced(x,y-1.5*size,parseFloat(x.toFixed(3)),"black","12px Arial","center","top");
		}
		else if (type == "axXmarkerU") {
			var size = (this.ucY2-this.ucY1)/30.
			this.moveTo(x,y); 
			this.lineTo(x,y+size);
			this.textAdvanced(x,y+1.5*size,parseFloat(x.toFixed(3)),"black","12px Arial","center","bottom");
		}
		else if (type == "axYmarkerL") {
			var size = (this.ucX2-this.ucX1)/40.
			this.moveTo(x,y); 
			this.lineTo(x-size,y);
			this.textAdvanced(x-1.5*size,y,parseFloat(y.toFixed(3)),"black","12px Arial","right","middle");
			
		}
		else if (type == "axYmarkerR") {
			var size = (this.ucX2-this.ucX1)/40.
			this.moveTo(x,y); 
			this.lineTo(x+size,y);
			this.textAdvanced(x+1.5*size,y,parseFloat(y.toFixed(3)),"black","12px Arial","left","middle");
			
		}
		//if (this.trace) console.log ("marker " +x +" " +y);
	},
//
//---Section of functions related to drawing coordinate systems.
	this.drawXaxis=
	function(){	//Draw x-axis for given range
		this.windowAxes1();
	},
	
	this.drawYaxis=
	function(){ //Draw y-axis for given range
		this.windowAxes2();
	},
	
	this.drawBoundary=
	function(color="black"){
		this.context.beginPath();
		this.context.strokeStyle = color;
		this.rectangle(this.ucX1,this.ucY1,this.ucX2,this.ucY2);
		this.context.stroke();
	},
	
	this.drawXgrid=
	function(color="black",increment=1,labels="no"){ //Uses x-range to draw a vertical lines (option to annotate)
		var x1,x2;
		x1 = Math.floor(this.ucX1);
		x2 = Math.floor(this.ucX2);
		this.context.beginPath();
		this.context.lineWidth = 1;
		this.context.strokeStyle = color;
		for (var x=x1;x<=x2;x=x+increment){
			this.moveTo(x,this.ucY1);
			this.lineTo(x,this.ucY2);
			if (labels == "yes") this.text(x,this.ucY1,String(x), "black", "10px Arial","center","top" );
		}	 
		this.context.stroke();
	},
	this.drawYgrid=
	function(color="black",increment=1,labels="no"){ //Uses y-range to draw a vertical lines (option to annotate)
		var y1,y2;
		y1 = Math.floor(this.ucY1);
		y2 = Math.floor(this.ucY2);
		this.context.beginPath();
		this.context.lineWidth = 1;
		this.context.strokeStyle = color;
		for (var y=y1;y<=y2;y=y+increment){
			this.moveTo(this.ucX1,y);
			this.lineTo(this.ucX2,y);
			if (labels == "yes") this.text(this.ucX1,y,String(y)+" ", "black", "10px Arial","right","middle" );
		}
		this.context.stroke();
	},
//
//---Next to be removed...
   this.windowAxes1=
	function() {
	   var ucX1,ucX2,ucY1,ucY2;
		ucX1 = this.ucX1; ucX2 = this.ucX2;
		ucY1 = this.ucY1; ucY2 = this.ucY2;
		this.context.beginPath();
		this.context.strokeStyle = "black";
		this.moveTo (ucX1,ucY1);
		this.lineTo (ucX2,ucY1);
		this.marker(ucX1,ucY1,"axXmarkerD");
		this.marker(ucX2,ucY1,"axXmarkerD");
		
		this.moveTo (ucX1,ucY1);
		this.lineTo (ucX1,ucY2);
		this.marker(ucX1,ucY1,"axYmarkerL","black");
		this.marker(ucX1,ucY2,"axYmarkerL","black");
		this.context.stroke();
		
	},
	this.windowAxes2=
	function() {
		var ucX1,ucX2,ucY1,ucY2;
		ucX1 = this.ucX1; ucX2 = this.ucX2;
		ucY1 = this.ucY1; ucY2 = this.ucY2;
	    
		this.context.beginPath();
		this.moveTo (ucX1,ucY2);
		this.lineTo (ucX2,ucY2);
		this.marker(ucX1,ucY2,"axXmarkerU"); // Egentlig opp.....
		this.marker(ucX2,ucY2,"axXmarkerU");
		
		this.moveTo (ucX2,ucY1);
		this.lineTo (ucX2,ucY2);
		this.marker(ucX2,ucY1,"axYmarkerR"); // Egentli ned...
		this.marker(ucX2,ucY2,"axYmarkerR");
		this.context.stroke();
		
	},
	
//-------------------------------------------------------------------------------------------------
//---OBJECT INTERNAL utilities for coordinate transformations	
	this.transformXY=
	function (x,y) {
		if (this.useMatrix) {
			this.xLT = x*this.matrixA+y*this.matrixB+this.matrixC;
			this.yLT = x*this.matrixD+y*this.matrixE+this.matrixF;
		}
		else {
			this.xLT = x; this.yLT=y;
		}
	},
	
	this.ucpxTransX=
	function (x){
		var _vpXoffset = this.ncX1*(this.canvas.width-2*this.xMargin);
		var _x = (x-this.ucX1)/(this.ucX2-this.ucX1)*this.xScale +this.xMargin + _vpXoffset; // UMC->PXC 
		return _x;
	},
	
	this.ucpxTransY=
	function (y){
		var _vpYoffset = this.ncY1*(this.canvas.height-2*this.yMargin);
		var _y = this.canvas.height - ((y-this.ucY1)/(this.ucY2-this.ucY1)*this.yScale +this.yMargin + _vpYoffset); // UC->PXC 
		return _y;
	}
				  
}
 
	
