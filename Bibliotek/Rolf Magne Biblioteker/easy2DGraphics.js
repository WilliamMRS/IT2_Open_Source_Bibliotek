//---easyGraphis - a development for IT-2 - to make canvas drawing much easier
//
//---Coordinate transformations mad possible
//   User Model Coordinates -> Normalised Canvas Coordinates -> Pixel Coordinates
//        UMC          ->         NCC                   -> PXC
// 

function easy2DGraphics (){
	
	this.canvas= "NaN",
	this.context= "NaN",
	this.backgroundColor="white",
	this.xScale= 200,
	this.yScale= 200,
	this.xMargin= 10,
	this.yMargin= 10,
	this.ncX1=  0.0, this.ncX2=  1.0, this.ncY1= 0.0, this.ncY2= 1.0,  // Normalised Canvas Coordinates
	this.ucX1=  0.0, this.ucX2= 10.0, this.ucY1= 0.0, this.ucY2= 10.0, // User Model Coordinates (unrotated)
	this.useMatrix=false;
	this.rotX=  0.0, this.rotY=  0.0, this.rotAngle=0.0,			   // Rotation point and rotation angle
	this.matrixA=1.0, matrixB=0.0,matrixC=0.0,                         // x'=ax+by+c
	this.matrixD=0.0, matrixE=1.0,matrixF=0.0,						   // y'=dx+ey+f
	this.xLT=0.0, this.yLT=0.0,									       // Last point
	
	this.print= false,								  // Set to true if you want to see details execution
	this.trace= false,										

	this.init=
	function (canvas) {
			this.canvas = canvas;
			this.context = this.canvas.getContext("2d");
			 
	},
	
	this.showData=
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
	function(xMargin,yMargin){
		this.xMargin = xMargin;
		this.yMargin = yMargin;
		
	},
	
	this.window=
	function(xlow,xhigh,ylow,yhigh){
		this.ucX1 = xlow;	
		this.ucX2 = xhigh;	
		this.ucY1 = ylow;	
		this.ucY2 = yhigh;	
			
	},
	
	this.viewport= 
	function(xlow,xhigh,ylow,yhigh){
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
	function(xlow,xhigh,ylow,yhigh){
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
	
//--- Section of functions related to drawing of basic graphics primitives like:
//--- lines,rectangles,markers,text.
//
	this.clearCanvas=
	function (){
		this.context.fillStyle = this.backgroundColor;
		this.context.rect(0,0,this.canvas.width,this.canvas.height);
		this.context.fill();
	},
	
	this.moveTo=
	function(x,y) {
		this.transformXY(x,y);
		this.context.moveTo(this.ucpxTransX(this.xLT),this.ucpxTransY(this.yLT));
		if (this.trace) console.log ("moveTo  " +x +" " +y);
	},
	
	this.lineTo= 
	function(x,y) {
		this.transformXY(x,y);
		this.context.lineTo(this.ucpxTransX(this.xLT),this.ucpxTransY(this.yLT));
		if (this.trace) console.log ("lineTo " +x +" " +y);
	},
	
	this.polyLine= 
	function(x,y) {
		for (var index = 0; index <= x.length-1; index++ ) {
			if (index == 0) this.moveTo(x[index],y[index]);
			else 			this.lineTo(x[index],y[index]);
			index = index + 1;
		}
	},
	
	this.rectangle2= 
	function(x1,y1,x2,y2) {
		this.context.moveTo(this.ucpxTransX(x1),this.ucpxTransY(y1));
		this.context.lineTo(this.ucpxTransX(x2),this.ucpxTransY(y1));
		this.context.lineTo(this.ucpxTransX(x2),this.ucpxTransY(y2));
		this.context.lineTo(this.ucpxTransX(x1),this.ucpxTransY(y2));
		this.context.lineTo(this.ucpxTransX(x1),this.ucpxTransY(y1));
		if (this.trace) console.log ("rectangle A " +x1 +" " +y1 +" " + +x2 +" " +y2);
		
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
		//this.context.lineWidth = 0;
		//this.context.strokeStyle = '#003300';
		//this.context.stroke();
		
	},
	
	this.text= 
	function(x,y,text) {
		this.context.font = "10px Arial" ;
		this.context.fillStyle = "black";
		this.context.textAlign = "left" ; // Can be left/rigth/center
		this.transformXY(x,y);
		this.context.fillText(text,this.ucpxTransX(this.xLT),this.ucpxTransY(this.yLT));
		if (this.trace) console.log ("text " +x +" " +y +" " + text);
	},
	this.textAdvanced = 
	function(x,y,text,color,font,textAlign,textBaseline) {
		this.context.font = font ;
		this.context.fillStyle = color;
		this.context.textAlign = textAlign ;           // Can be left/rigth/center
		this.context.textBaseline = textBaseline;      // Can be top,bottom,middle,left,right
		this.transformXY(x,y);
		this.context.fillText(text,this.ucpxTransX(this.xLT),this.ucpxTransY(this.yLT));
		if (this.trace) console.log ("text " +x +" " +y +" " + text);
	},
	
	this.marker=
	function(x,y,type) {
		
		this.context.font = "14px Arial" ;
		this.context.fillStyle = "black";
		this.context.textAlign = "center" ;
		this.context.textBaseline = "middle";
		this.transformXY(x,y);
		
		if (type == "cross") {
			this.context.fillText("X",this.ucpxTransX(this.xLT),this.ucpxTransX(this.yLT));
			
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
			this.textAdvanced(x,y-size,parseFloat(x.toFixed(3)),"red","10px Arial","center","top");
		}
		else if (type == "axXmarkerU") {
			var size = (this.ucY2-this.ucY1)/30.
			this.moveTo(x,y); 
			this.lineTo(x,y+size);
			this.textAdvanced(x,y+size,parseFloat(x.toFixed(3)),"red","10px Arial","center","bottom");
		}
		else if (type == "axYmarkerL") {
			var size = (this.ucX2-this.ucX1)/30.
			this.moveTo(x,y); 
			this.lineTo(x-size,y);
			this.textAdvanced(x-size,y,parseFloat(y.toFixed(3)),"red","10px Arial","right","middle");
			
		}
		else if (type == "axYmarkerR") {
			var size = (this.ucX2-this.ucX1)/30.
			this.moveTo(x,y); 
			this.lineTo(x+size,y);
			this.textAdvanced(x+size,y,parseFloat(y.toFixed(3)),"red","10px Arial","left","middle");
			
		}
		
		if (this.trace) console.log ("marker " +x +" " +y);
		
	},

//---Section of functions related to drawing coordinate systems.
    this.windowAxes1=
	function() {
	    var ucX1,ucX2,ucY1,ucY2;
		ucX1 = this.ucX1; ucX2 = this.ucX2;
		ucY1 = this.ucY1; ucY2 = this.ucY2;
		this.context.beginPath();
		this.moveTo (ucX1,ucY1);
		this.lineTo (ucX2,ucY1);
		this.marker(ucX1,ucY1,"axXmarkerD");
		this.marker(ucX2,ucY1,"axXmarkerD");
		
		this.moveTo (ucX1,ucY1);
		this.lineTo (ucX1,ucY2);
		this.marker(ucX1,ucY1,"axYmarkerL");
		this.marker(ucX1,ucY2,"axYmarkerL");
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
//---INTERNAL utilities for coordinate transformations	
//
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
 
	
