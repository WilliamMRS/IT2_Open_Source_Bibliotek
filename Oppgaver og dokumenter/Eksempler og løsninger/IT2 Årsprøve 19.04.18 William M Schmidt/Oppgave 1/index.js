/*jslint devel: true */

function winInit() {
    rettLyd = document.getElementById("rettLyd");
    feilLyd = document.getElementById("feilLyd");

    responseText = document.getElementById("responseText");
}
window.onload = winInit;

sjekkDyr = function(dyr){
    if(dyr === "Ku"){
        rettLyd.play();
        responseText.innerHTML = "Rett Svar!";
        responseText.style.color = "rgb(25, 175, 25)";
    }else{
        feilLyd.play();
        responseText.innerHTML = "Feil Svar!";
        responseText.style.color = "Red";
    }
}