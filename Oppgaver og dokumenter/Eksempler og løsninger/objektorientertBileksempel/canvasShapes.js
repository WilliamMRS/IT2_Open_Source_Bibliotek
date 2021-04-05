/*jslint devel: true */

function drawText(ctx, text, x, y, fillstyle, font) {
	"use strict";
	ctx.font = font;//"18px Arial"
	ctx.fillStyle = fillstyle; //"black"
	ctx.textAlign = "middle";
	ctx.fillText(text, x, y);
}

function drawCircle(ctx, xCentre, yCentre, radius, colour) {
	"use strict";
	ctx.beginPath();
	ctx.strokeStyle = colour;
	ctx.arc(xCentre, yCentre, radius, 0, 2 * Math.PI);
	ctx.stroke();
}

function drawFilledCircle(ctx, x, y, size, colour) {
	"use strict";
	ctx.beginPath();
	ctx.strokeStyle = colour;
	ctx.fillStyle = colour;
	ctx.moveTo(x, y);
	ctx.arc(x, y, size, 0, 2 * Math.PI);
	ctx.fill();
}

function drawSquare(ctx, x, y, height, width, color) {
    "use strict";
    ctx.beginPath();
	ctx.strokeStyle = color;
	ctx.lineWidth = 2;
    ctx.moveTo(x, y);
    ctx.lineTo(x + width, y);
    ctx.lineTo(x + width, y + height);
    ctx.lineTo(x, y + height);
    ctx.lineTo(x, y);
    ctx.stroke();
}

function drawFilledSquare(ctx, x, y, height, width, colour) {
    "use strict";
    ctx.beginPath();
	ctx.fillStyle = colour;
    ctx.moveTo(x, y);
    ctx.lineTo(x + width, y);
    ctx.lineTo(x + width, y + height);
    ctx.lineTo(x, y + height);
    ctx.lineTo(x, y);
    ctx.fill();
}

function drawTriangle(ctx, x, y, height, width, color) {
    "use strict";
    ctx.beginPath();
	ctx.strokeStyle = color;
	ctx.lineWidth = 2;
    ctx.moveTo(x, y);
    ctx.lineTo(x + width, y);
    ctx.lineTo(x + width, y - height);
    ctx.lineTo(x, y);
    ctx.stroke();
}

function drawFilledTriangle(ctx, x, y, height, width, color) {
    "use strict";
    ctx.beginPath();
	ctx.fillStyle = color;
    ctx.moveTo(x, y);
    ctx.lineTo(x + width, y);
    ctx.lineTo(x + width, y + height);
    ctx.lineTo(x, y);
    ctx.fill();
}

function drawFilledPoly(ctx, x, y, antall, radius, color) {
	"use strict";
	var i;
	ctx.beginPath();
	ctx.moveTo(x + radius * Math.cos(0), y + radius * Math.sin(0));
	ctx.strokeStyle = color;
	ctx.lineWidth = 2;
	for (i = 1; i <= antall; i += 1) {
		ctx.lineTo(x + radius * Math.cos(i * 2 * Math.PI / antall), y + radius * Math.sin(i * 2 * Math.PI / antall));
	}
	ctx.stroke();
}