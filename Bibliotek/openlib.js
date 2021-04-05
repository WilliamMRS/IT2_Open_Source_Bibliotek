/*jslint devel: true */
console.log("openlib loaded");

/*

Animasjons-funksjoner mangler. F.eks en animationengine med eksempel.

 - Noen funksjoner er skrevet med et objekt som argument istedenfor mange argumenter. her skriver man bare f.eks: {arg1: minVar, arg2: "Titusen"}
 - litt norsk-engelsk, gjerne skriv guidene om til norsk og lag en pull-request i github. 
 - Om du ser noe som kan forbedres gjerne lag en request på GitHub eller skriv om det i gruppechatten
 - Eksempler på classes og constructors eller annet ligger ikke i biblioteket men i andre filer som ligger i samme mappen.

 INNHOLDSLISTE:
	+	GENERELLE FUNKSJONER 17 - 52
	+	HTML FUNKSJONER 55 - 87
	+
	+
	+
	+
	+

 */



/*
setArray:
	a: Input an array where all numbers are to be set to a certain number.
	v: Input desired number to replace all numbers in array.
*/
function setArray(a, v) {
    "use strict";
    var i, n = 0;
	n = a.length;
    for (i = 0; i < n; i += 1) {
        a[i] = v;
    }
}

//Returns maximum value of an array.
function findMaxValue(array) {
	let max, i;
	max = array[0];
	for (i = 1; i < array.length; i += 1) {
		if (array[i] > max) {
			max = array[i];
		}
	}
	console.log("Max value = " + max);
	return max;
}

//Returns minimum value of an array.
function findMinValue(array) {
	let min, i;
	min = array[0];
	for (i = 1; i > array.length; i += 1) {
		if (array[i] < min) {
			min = array[i];
		}
	}
	console.log("Min value = " + min);
	return min;
}


/*
Gir et tilfeldig tall innenfor en gitt rekkevidde.
	maxNumber: max antall .
	a: Resultatet av et kast.
*/
function randomNumber(maxNumber) {
    let a = Math.floor(Math.random() * maxNumber);
    return a;
}

/*
drawHtmlTable("Id til objektet hvor det skal tegnes", "tittelen på tabellradene", "dataen som skal inn i tabellen")
*/

function drawHtmlTable(tableId,tableHead,tableData){ 
// First write the table with header fields
	let table = "<table><thead><tr>";
	for (var i = 0; i < tableHead.length; i++){
		table = table + "<th>"+tableHead[i] + "</th>";
	}
	table = table + "</tr></thead>";
// Next fill in the content of the table row by row (one row for each iteration of the loop)
	let j = 0;
	while (j < tableData.length) { 
		table = table + 	"<tr>"
		for ( let k = 0; k <  tableHead.length; k++){
			table = table +"<td id >" +tableData[j] +"</td>";
			j = j+ 1;
		}
		table = table + "</tr>";
	}
	table = table + "</table>";	
	tableId.innerHTML = table; // Skriv til HTML
}

//Use .style.display = "none" and "block"/"inline-block" for hiding and displaying html elements from js code.

showDIV = function(htmlObject){
	htmlObject.style.display = "block";
}

hideDIV = function(htmlObject){
	htmlObject.style.display = "none";
}

/*options = {
	ctx: ctx, text: "Hi", x: 100, y: 100, fillstyle: "Red", font: "18px Arial"
}*/
function drawText(options){
	"use strict";
	options.ctx.font = options.font;//18px Arialp
	options.ctx.fillStyle = options.fillstyle; //"black"
	options.ctx.textAlign = "middle";
	options.ctx.fillText(options.text, options.x, options.y);
}

/*options = {
    ctx: ctx, xCentre: 100, yCentre: 100, radius: 10, color: "Black",
}*/
function drawCircle(options) {
	"use strict";
	options.ctx.beginPath();
	options.ctx.strokeStyle = options.color;
	ctx.arc(options.xCentre, options.yCentre, options.radius, 0, 2 * Math.PI);
	ctx.stroke();
}

/*options = {
    ctx: ctx, x: 100, y: 100, size: 10, color: "Black",
}*/
function drawFilledCircle(options) {
	"use strict";
	options.ctx.beginPath();
	options.ctx.strokeStyle = options.color;
	options.ctx.fillStyle = options.color;
	options.ctx.moveTo(options.x, options.y);
	options.ctx.arc(options.x, options.y, options.size, 0, 2 * Math.PI);
	options.ctx.fill();
}

/*options = {
    ctx: ctx, x: 100, y: 100, height: 10, width: 10, color: "Black",
}*/
function drawSquare(options) {
    "use strict";
    options.ctx.beginPath();
	options.ctx.strokeStyle = options.color;
	options.ctx.lineWidth = 2;
    options.ctx.moveTo(options.x, options.y);
    options.ctx.lineTo(options.x + options.width, options.y);
    options.ctx.lineTo(options.x + options.width, options.y + options.height);
    options.ctx.lineTo(options.x, options.y + options.height);
    options.ctx.lineTo(options.x, options.y);
    options.ctx.stroke();
}

/*options = {
    ctx: ctx, x: 100, y: 100, height: 10, width: 10, color: "Black",
}*/
function drawFilledSquare(options) {
    "use strict";
    options.ctx.beginPath();
	options.ctx.fillStyle = options.color;
    options.ctx.moveTo(options.x, options.y);
    options.ctx.lineTo(options.x + options.width, options.y);
    options.ctx.lineTo(options.x + options.width, options.y - options.height);
    options.ctx.lineTo(options.x, options.y - options.height);
    options.ctx.lineTo(options.x, options.y);
    options.ctx.fill();
}

/*options = {
    ctx: ctx, x: 100, y: 100, height: 10, width: 10, color: "Black", linewidth: 2,
}*/
function drawTriangle(options) {
    "use strict";
    options.ctx.beginPath();
	options.ctx.strokeStyle = options.color;
	options.ctx.lineWidth = options.linewidth;
    options.ctx.moveTo(options.x, options.y);
    options.ctx.lineTo(options.x + options.width, options.y);
    options.ctx.lineTo(options.x + options.width, options.y - options.height);
    options.ctx.lineTo(options.x, options.y);
    options.ctx.stroke();
}

/*options = {
    ctx: ctx, x: 100, y: 100, height: 10, width: 10, color: "Black"
}*/
function drawFilledTriangle(options) {
    "use strict";
	options.ctx.beginPath();
	options.ctx.fillStyle = options.color;
    options.ctx.moveTo(options.x, options.y);
    options.ctx.lineTo(options.x + options.width, options.y);
    options.ctx.lineTo(options.x + options.width, options.y + options.height);
    options.ctx.lineTo(options.x, options.y);
    options.ctx.fill();
}

/*options = {
    ctx: ctx, x: 100, y: 100, radius: 5, color: "Black", linewidth: 2, count: 5
}*/
function drawFilledPoly(options) {
	ctx.beginPath();
	ctx.moveTo(options.x + options.radius * Math.cos(0), options.y + options.radius * Math.sin(0));
	ctx.strokeStyle = options.color;
	ctx.lineWidth = options.linewidth;
	for (i = 1; i <= options.count; i += 1) {
		ctx.lineTo(options.x + options.radius * Math.cos(i * 2 * Math.PI / options.count), options.y + options.radius * Math.sin(i * 2 * Math.PI / options.count));
	}
	ctx.stroke();
}

/*
	Hvordan å importere bilder til bruk i canvas:

	<img src="myImage.png" alt="" style = "display: none;">
	myImage = document.getElementById('myImage.png');
	ctx.drawImage(myImage, x, y);
*/
drawRotatedImage = function(x, y, obj, angle){
    ctx.translate(x + obj.width/2, y + obj.height/2);
    ctx.rotate(angle * Math.PI/180);
    ctx.drawImage(obj, -obj.width/2, -obj.height/2);
    ctx.rotate(- angle * Math.PI/180);
    ctx.translate(-x - obj.width/2, - y - obj.height/2);
}

/*
drawColumnChart DOC:
{
	ctx: ctx,
	canvas: myCanvas,
    xData: [1,2,3,4,5,6],
    yData: [10,30,20,10,20,30],
    cvx: "the spacing between the columns" 25,
    cvy: "Bottom left corner y coord" 250,
    number: "how many columns to display" 6,
    widthPx: "the width of the columns" 1,
	yScale: "scaling of the height of the columns" 1,
	barColor: "DarkBlue",
	textColor: "Red"
}
*/
function drawColumnChart(options) {
    let i, yPixel;
	options.number = options.number - 1;
    
    for (i = 0; i <= options.number; i = i + 1) {
        yPixel = options.yData[i] * options.yScale;
		drawFilledSquare({
			ctx: options.ctx,
			x: 10 + options.cvx * i,
			y: options.cvy,
			height: yPixel,
			width: options.widthPx,
			color: options.barColor
		});
		drawText({
			ctx: options.ctx,
			text: options.yData[i],
			x: options.widthPx/2 + options.cvx * i,
			y: options.cvy - 15 - yPixel,
			fillstyle: options.textColor,
			font: "18px Arial"
		});
    }
}

function drawPieChart(ctx, canvas, data, colors) {
	let lastend = 0;
	let total = 0;

	for (let e = 0; e < data.length; e += 1) {
		total += data[e];
	}

	for (let i = 0; i < data.length; i += 1) {
		ctx.fillStyle = colors[i];
		ctx.beginPath();
		ctx.moveTo(canvas.width / 2, canvas.height / 2);
		// Arc Parameters: x, y, radius, startingAngle (radians), endingAngle (radians), antiClockwise (boolean)
		ctx.arc(canvas.width / 2, canvas.height / 2, canvas.height / 2, lastend, lastend + (Math.PI * 2 * (data[i] / total)), false);
		ctx.lineTo(canvas.width / 2, canvas.height / 2);
		ctx.fill();
		lastend += Math.PI * 2 * (data[i] / total);
		console.log(colors[i]);
	}
}

/*
drawPolyline DOC:
	x:
	y:
	cvx:
	cvy:
	colour:
	yScale: The relevant scale of the project. Often use the same value as used in other programs utilizing the canvas.

*/
function drawPolyline(x, y, cvx, cvy, colour, yScale) {
	"use strict";
	var i, yPixel;
	ctx.beginPath();
	ctx.strokeStyle = colour;
	
	ctx.moveTo(x.length * cvx, y[y.length] + cvy);
	
	for (i = 0; i >= x.length; i += 1) {
		console.log(i);
		yPixel = y[i] * yScale;
		ctx.lineTo(10 + cvx * i, yPixel);
	}
	ctx.stroke();
}

//Template for Switch Statement where switchParameter is a number
function switchStatement(switchParameter) {
	switch(switchParameter) {
        	case 0:
            //Block of code
			break;

			case 1:
            //Block of code
			break;

			case 2:
            //Block of code
			break;

			case 3:
            //Block of code
			break;
		default:
		//Block of code
	}
}

//While loop
let ten = 10;
while(ten > 0){
	ten -= 1;
	//counts from ten to zero
}

//for loop
for(i = 0; i < 10; i += 1){
	//counts to ten
}

//Template for Object
var myCat;
myCat = {
	"name": "meowsalot",
	"species": "cat",
	"run": function () {
		console.log("Cat is now running");
	}
};

/*
keyDownHandler():
Makes enter fire a function.
Needs an Eventlistener. Use document.addEventListener();
*/
function keyDownHandler(e) {
	"use strict";
	if (e.keyCode === 13) {
		//console.log("Enter was pressed");
    }
}
document.addEventListener("keydown", keyDownHandler, false); //Creates eventlistener

/*
Returns mouse coordinates on a page when mouse is clicked. Can be used with margin:0; on body
to get coordinates of a canvas with centerX and centerY in the upper right corner.
	Create two global variables named mX and mY or make the program return them.
*/
window.onclick = function (e) {
	"use strict";
	var mX, mY;
	mX = e.pageX;
	mY = e.pageY;
	//console.log(mX + " " + mY);
};

 /*
	- - - - - - - - - - - - - - - - - - - - - - - -    - - - - - - - - - - - - - - - - - - - - - - - -    
	Create a new 'exampleData.js' file and reference it in html head tag like so <script src = "exampleData.js"> </script>
	then assign the data to a variable and you can access it using "yourVariable".data

	ExampleData:
		var jsonData = 
	{
		"uname":"admin",
		"email":"admin@email.com",
		"psw":"password",
		"myData":[1,2,3,4,5,1,13,19,"Hi","Text", 1.0231]
	}
	- - - - - - - - - - - - - - - - - - - - - - - -    - - - - - - - - - - - - - - - - - - - - - - - -    
*/