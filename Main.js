let clockOn = false;
const youngData = [{ "Id": 1, "Name": "חבר פרבר", "Place": "פני חבר", "Phone": "058-5648444", "SpecificDeatils": { "Hobit": "קולנוע", "Book": 'מנהרת הזמן' } },
    { "Id": 48, "Name": "עדי שטיינר", "Place": "להבים", "Phone": "051-1234567", "SpecificDeatils": { "Hobit": "בילויים", "Book": 'חדווא"2' } },
    { "Id": 99, "Name": "סאני סימן-טוב", "Place": "חולון", "Phone": "012-1234567", "SpecificDeatils": { "Hobit": "בילויים", "Book": 'הארי פוטר' } }
]

window.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById("clock").innerHTML = new Date().toLocaleTimeString();
    document.getElementById("allDetailsTable").style.display = "none";
    document.getElementById("addButton").style.display = "none";
    loadAllDetailsTable();
});

loadAllDetailsTable = () => {
    let allDetailsTable = document.getElementById("allDetailsTable");
    let tableRows = allDetailsTable.getElementsByTagName('tr');
    let len = tableRows.length;
    for (let row = 0; row < len - 1; row++) {
        allDetailsTable.removeChild(tableRows[1]);
    }
    youngData.forEach(young => {
        let row = document.createElement('tr');
        row.classList.add('defualtRowDetailsTabale');
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
    highlightRow();
}

sortTableByID = () => {
    youngData.sort((a, b) => a.Id - b.Id);
    loadAllDetailsTable();
}

sortDownTableByID = () => {
    youngData.sort((a, b) => b.Id - a.Id);
    loadAllDetailsTable();
}

sortTableByName = () => {
    youngData.sort((a, b) => a.Name.localeCompare(b.Name));
    loadAllDetailsTable();
}

sortDownTableByName = () => {
    youngData.sort((a, b) => b.Name.localeCompare(a.Name));
    loadAllDetailsTable();
}

showSpecificDetails = (rowIndex) => {
    let specificDetailsTable = document.getElementById("specificDetailsTable");
    let tableRows = specificDetailsTable.getElementsByTagName('tr');
    let len = tableRows.length;
    for (let row = 0; row < len; row++) {
        specificDetailsTable.removeChild(tableRows[0]);
    }

    const youngName = youngData[rowIndex].Name;
    const specificData = youngData[rowIndex].SpecificDeatils;

    let row = document.createElement('tr');
    let nameCol = document.createElement('td');
    nameCol.innerText = 'שם:' + youngName;
    let hobitCol = document.createElement('td');
    hobitCol.innerText = 'תחביב:' + specificData.Hobit;
    let bookCol = document.createElement('td');
    bookCol.innerText = 'ספר:' + specificData.Book;
    row.appendChild(nameCol);
    row.appendChild(hobitCol);
    row.appendChild(bookCol);
    specificDetailsTable.appendChild(row);
}

highlightRow = () => {
    let allDetailsTable = document.getElementById('allDetailsTable');
    let cells = allDetailsTable.getElementsByTagName('td');
    for (let cellIndex = 0; cellIndex < cells.length; cellIndex++) {
        let cell = cells[cellIndex];
        cell.onclick = function() {
            let rowId = this.parentNode.rowIndex;
            let rowsNotSelected = allDetailsTable.getElementsByTagName('tr');
            for (let row = 0; row < rowsNotSelected.length; row++) {
                rowsNotSelected[row].style.backgroundColor = "";
            }
            let rowSelected = allDetailsTable.getElementsByTagName('tr')[rowId];
            rowSelected.style.backgroundColor = "lightblue";
            showSpecificDetails(rowId - 1);
        }
    }
}

loadAliensPage = () => {
    document.getElementById("allDetailsTable").style.display = "none";
    document.getElementById("specificDetailsTable").style.display = "none";
    document.getElementById("addButton").style.display = "none";

}

loadYoungPage = () => {
    document.getElementById("allDetailsTable").style.display = "";
    document.getElementById("specificDetailsTable").style.display = "";
    document.getElementById("addButton").style.display = "inline-block";
}

setClockTime = () => {
    if (clockOn === true) {
        document.getElementById("clock").innerHTML = new Date().toLocaleTimeString();
    }
}

startClock = () => {
    clockOn = !clockOn
    if (clockOn === true) {
        document.getElementById("clockController").innerHTML = "הפסק";

    } else {
        document.getElementById("clockController").innerHTML = "הפעל";

    }
}

const clockInterval = setInterval(setClockTime, 1000);