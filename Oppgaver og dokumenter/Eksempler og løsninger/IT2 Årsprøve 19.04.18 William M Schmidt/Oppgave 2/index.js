/*jslint devel: true */

function winInit() {
    responseText = document.getElementById("responseText");
    cup = document.getElementById("cup");
    pint = document.getElementById("pint");
    ounce = document.getElementById("ounce");
}
window.onload = winInit;

updateResponseText = function(){
    let totalDesiliters = 0;

    if(cup.value > 0)totalDesiliters += (parseFloat(cup.value) * 2.5);

    if(pint.value > 0)totalDesiliters += (parseFloat(pint.value) * 5.7);

    if(ounce.value > 0)totalDesiliters += (parseFloat(ounce.value) * 0.28);

    totalDesiliters = Math.round(totalDesiliters * 100)/100;

    responseText.innerHTML = ("Desiliter: " + totalDesiliters);
}