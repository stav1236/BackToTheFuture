const STOP = 'הפסק'
const START = "הפעל"
const NAME = 'שם:'
const HOBIT = 'תחביב:'
const BOOK = 'ספר:'
const TR = 'tr'
const TD = "td"
const NONE = 'none'

let clockOn = true;
let youngData = null
let fileAsString = null

fileToString = (file) => {
    const rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = () => {
        fileAsString = rawFile.responseText;
    }
    rawFile.send(null);
}
fileToString("./db.json");
youngData = JSON.parse(fileAsString)


window.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById("clock").innerHTML = new Date().toLocaleTimeString();
    document.getElementById("allDetailsTable").style.display = NONE;
    document.getElementById("addButton").style.display = NONE;
    loadAllDetailsTable();
});

loadAllDetailsTable = () => {
    let allDetailsTable = document.getElementById("allDetailsTable");
    let tableRows = allDetailsTable.getElementsByTagName(TR);
    [...tableRows].slice(1).forEach(row => {
        allDetailsTable.removeChild(row);
    });

    youngData.forEach(young => {
        let row = document.createElement(TR);
        row.classList.add('defualtRowDetailsTabale');
        let idCol = document.createElement(TD);
        idCol.innerText = young.id;
        let nameCol = document.createElement(TD);
        nameCol.innerText = young.name;
        let placeCol = document.createElement(TD);
        placeCol.innerText = young.place;
        let phoneCol = document.createElement(TD);
        phoneCol.innerText = young.phone;
        row.appendChild(idCol);
        row.appendChild(nameCol);
        row.appendChild(placeCol);
        row.appendChild(phoneCol);
        allDetailsTable.appendChild(row);
    });
    highlightRow();
}

sortTableByID = () => {
    youngData.sort((a, b) => a.id - b.id);
    loadAllDetailsTable();
}

sortDownTableByID = () => {
    youngData.sort((a, b) => b.id - a.id);
    loadAllDetailsTable();
}

sortTableByName = () => {
    youngData.sort((a, b) => a.name.localeCompare(b.name));
    loadAllDetailsTable();
}

sortDownTableByName = () => {
    youngData.sort((a, b) => b.name.localeCompare(a.name));
    loadAllDetailsTable();
}

showSpecificDetails = (rowIndex) => {
    let specificDetailsTable = document.getElementById("specificDetailsTable");
    specificDetailsTable.innerHTML = "";
    const youngName = youngData[rowIndex].name;
    const specificData = youngData[rowIndex].specificDeatils;
    let row = document.createElement(TR);
    let nameCol = document.createElement(TD);
    nameCol.innerText = NAME + youngName;
    let hobitCol = document.createElement(TD);
    hobitCol.innerText = HOBIT + specificData.hobit;
    let bookCol = document.createElement(TD);
    bookCol.innerText = BOOK + specificData.book;
    row.appendChild(nameCol);
    row.appendChild(hobitCol);
    row.appendChild(bookCol);
    specificDetailsTable.appendChild(row);
}

highlightRow = () => {
    let allDetailsTable = document.getElementById('allDetailsTable');
    let cells = allDetailsTable.getElementsByTagName(TD);
    [...cells].forEach(cell => {
        let rowId = cell.parentNode.rowIndex;
        cell.onclick = () => {
            let rowsNotSelected = allDetailsTable.getElementsByTagName(TR);
            [...rowsNotSelected].forEach(row => {
                row.style.backgroundColor = ""
            });
            let rowSelected = allDetailsTable.getElementsByTagName(TR)[rowId];
            rowSelected.style.backgroundColor = "lightblue";
            showSpecificDetails(rowId - 1);
        }
    });
}

loadAliensPage = () => {
    document.getElementById("allDetailsTable").style.display = NONE;
    document.getElementById("specificDetailsTable").style.display = NONE;
    document.getElementById("addButton").style.display = NONE;

}

loadYoungPage = () => {
    document.getElementById("allDetailsTable").style.display = "";
    document.getElementById("specificDetailsTable").style.display = "";
    document.getElementById("addButton").style.display = "inline-block";
}

setClockTime = () => {
    if (clockOn) {
        document.getElementById("clock").innerHTML = new Date().toLocaleTimeString();
    }
}

startClock = () => {
    clockOn = !clockOn
    if (clockOn) {
        document.getElementById("clockController").innerHTML = STOP;

    } else {
        document.getElementById("clockController").innerHTML = START;

    }
}

const clockInterval = setInterval(setClockTime, 1000);