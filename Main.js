let clockOn = false;

startCloack = () => {
    clockOn = !clockOn
    console.log("hllo")
    if (clockOn === true) {
        document.getElementById("clockController").innerHTML = "הפסק";


    } else {
        document.getElementById("clockController").innerHTML = "הפעל";
    }
}