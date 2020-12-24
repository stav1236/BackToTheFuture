const STOP = "הפסק"
const START = "הפעל"
const NAME = "שם:"
const HOBBY = "תחביב:"
const BOOK = "ספר:"
const TR = "tr"
const TD = "td"
const NONE = "none"

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

window.addEventListener("DOMContentLoaded", (event) => {
    document.getElementById("clock").innerHTML = new Date().toLocaleTimeString();
    document.getElementById("allDetailsTable").style.display = NONE;
    document.getElementById("addButton").style.display = NONE;
});

loadAllDetailsTable = () => {
    const allDetailsTable = document.getElementById("allDetailsTable");
    const tableRows = allDetailsTable.getElementsByTagName(TR);
    [...tableRows].slice(1).forEach(row => {
        allDetailsTable.removeChild(row);
    });

    youngData.forEach(young => {
        const row = document.createElement(TR);
        row.classList.add("defualtRowDetailsTabale");
        const idCol = document.createElement(TD);
        idCol.innerText = young.id;
        const nameCol = document.createElement(TD);
        nameCol.innerText = young.name;
        const placeCol = document.createElement(TD);
        placeCol.innerText = young.place;
        const phoneCol = document.createElement(TD);
        phoneCol.innerText = young.phone;
        row.appendChild(idCol);
        row.appendChild(nameCol);
        row.appendChild(placeCol);
        row.appendChild(phoneCol);
        allDetailsTable.appendChild(row);
    });
    highlightRow();
}

sortUpToDownByID = () => {
    sortYoungData((first, second) => first.id - second.id);
}

sortDownToUpByID = () => {
    sortYoungData((first, second) => second.id - first.id);
}

sortUpToDownByName = () => {
    sortYoungData((first, second) => first.name.localeCompare(second.name));
}

sortDownToUpByName = () => {
    sortYoungData((first, second) => second.name.localeCompare(first.name));
}

sortYoungData = (sortFunc) => {
    youngData.sort(sortFunc);
    loadAllDetailsTable()
}


showSpecificDetails = (rowIndex) => {
    const specificDetailsTable = document.getElementById("specificDetailsTable");
    specificDetailsTable.innerHTML = "";
    const youngName = youngData[rowIndex].name;
    const specificData = youngData[rowIndex].specificDeatils;
    const row = document.createElement(TR);
    const nameCol = document.createElement(TD);
    nameCol.innerText = NAME + youngName;
    const hobitCol = document.createElement(TD);
    hobitCol.innerText = HOBBY + specificData.hobby;
    const bookCol = document.createElement(TD);
    bookCol.innerText = BOOK + specificData.book;
    row.appendChild(nameCol);
    row.appendChild(hobitCol);
    row.appendChild(bookCol);
    specificDetailsTable.appendChild(row);
}

highlightRow = () => {
    const allDetailsTable = document.getElementById("allDetailsTable");
    const cells = allDetailsTable.getElementsByTagName(TD);
    [...cells].forEach(cell => {
        const rowId = cell.parentNode.rowIndex;
        cell.onclick = () => {
            const rowsNotSelected = allDetailsTable.getElementsByTagName(TR);
            [...rowsNotSelected].forEach(row => {
                row.style.backgroundColor = ""
            });
            const rowSelected = allDetailsTable.getElementsByTagName(TR)[rowId];
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
    loadAllDetailsTable();
    document.getElementById("allDetailsTable").style.display = "";
    document.getElementById("specificDetailsTable").style.display = "";
    document.getElementById("addButton").style.display = "inline-block";
}

setClockTime = () => {
    if (clockOn) {
        document.getElementById("clock").innerHTML = new Date().toLocaleTimeString();
    }
}

operateClock = () => {
    clockOn = !clockOn
    if (clockOn) {
        document.getElementById("clockController").innerHTML = STOP;
        clockInterval = setInterval(setClockTime, 1000);

    } else {
        document.getElementById("clockController").innerHTML = START;
        clearInterval(clockInterval)

    }
}

const clockInterval = setInterval(setClockTime, 1000);