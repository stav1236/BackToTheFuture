let clockOn = false;

window.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById("clock").innerHTML = new Date().toLocaleTimeString();
});

setClockTime = () => {
    if (clockOn === true) {
        document.getElementById("clock").innerHTML = new Date().toLocaleTimeString();
    }
}

startCloack = () => {
    clockOn = !clockOn
    if (clockOn === true) {
        document.getElementById("clockController").innerHTML = "הפסק";
    } else {
        document.getElementById("clockController").innerHTML = "הפעל";
    }
}

let clockInterval = setInterval(setClockTime, 1000);