let clockOn = false;
const youngData = [{ "Id": "1", "Name": "חבר פרבר", "Place": "פני חבר", "Phone": "058-5648444" },
    { "Id": "48", "Name": "עדי שטיינר", "Place": "להבים", "Phone": "051-1234567" },
    { "Id": "99", "Name": "סאני סימן-טוב", "Place": "חולון", "Phone": "012-1234567" }
]

window.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById("clock").innerHTML = new Date().toLocaleTimeString();
    document.getElementById("allDetailsTable").style.display = "none";
    let allDetailsTable = document.getElementById("allDetailsTable");
    youngData.forEach(young => {
        let row = document.createElement('tr');
        row.classList.add('defualtRowDetailsTabale')
        let idCol = document.createElement('td');
        idCol.innerText = young.Id;
        let nameCol = document.createElement('td');
        nameCol.innerText = young.Name;
        let placeCol = document.createElement('td');
        placeCol.innerText = young.Place;
        let phoneCol = document.createElement('td');
        phoneCol.innerText = young.Phone;
        row.appendChild(idCol);
        row.appendChild(nameCol);
        row.appendChild(placeCol);
        row.appendChild(phoneCol);

        allDetailsTable.appendChild(row);
    });
});


readYoundData = () => {
    youngData.forEach(element => {
        console.log(element.Id)
    });
}


loadAliensPage = () => {
    document.getElementById("allDetailsTable").style.display = "none";

}

loadYoungPage = () => {
    document.getElementById("allDetailsTable").style.display = "";
}

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