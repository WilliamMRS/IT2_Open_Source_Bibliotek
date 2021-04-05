/*jslint devel: true */

/*
Eksempler av noen funksjoner i bruk.
*/

function winInit() {
    myDIV = document.getElementById("myDIV");
    myCanvas = document.getElementById('myCanvas');
    ctx = myCanvas.getContext("2d");

    exampleCanvas = document.getElementById('exampleCanvas');
    ctx2 = exampleCanvas.getContext("2d");

    drawColumnChart({
        ctx: ctx,
        canvas: myCanvas,
        xData: [1,2,3,4,5,6],
        yData: [10,30,20,10,20,60],
        cvx: myCanvas.width/6, // canvas.width / antall kolonner (6)
        cvy: 500,
        number: 6,
        widthPx: 50,
        yScale: 7,
        barColor: "Green",
        textColor: "Pink"
    });

    drawHtmlTable(myDIV, ["nice", "verynice", "reallynice"], ["1", "13231231212", "38218942", "1", "2", "3"]);

    drawPieChart(ctx2, exampleCanvas, [1,2,3], ["Red", "blue", "yellow"]);
}
window.onload = winInit;