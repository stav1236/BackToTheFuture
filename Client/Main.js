const STOP = "הפסק"
const START = "הפעל"
const NAME = "שם:"
const HOBBY = "תחביב:"
const BOOK = "ספר:"
const TR = "tr"
const TD = "td"
const NONE = "none"
const SERVER_ADDRESS = "http://localhost:4567/"
const INPUTS = ["youngIdInput", "youngNameInput", "youngPlaceInput", "youngPhoneInput", "youngHobbyInput", "youngBookInput"]

let addingOn = false;
let clockOn = true;
let youngData = null;
let chosenYoung = null;

window.addEventListener("DOMContentLoaded", (event) => {
    document.getElementById("clock").innerHTML = new Date().toLocaleTimeString();
    clearAddingYoungPage();
    clearYoungPage();
});

loadAllDetailsTable = async() => {
    const allDetailsTable = document.getElementById("allDetailsTable");
    const tableRows = allDetailsTable.getElementsByTagName(TR);
    [...tableRows].slice(1).forEach(row => {
        allDetailsTable.removeChild(row);
    });
    if (!youngData) {
        const response = await fetch(`${SERVER_ADDRESS}youngs`)
        youngData = await response.json();
    }

    youngData.forEach(young => {
        const row = document.createElement(TR);
        row.classList.add("defualtRowDetailsTabale");
        const idCol = document.createElement(TD);
        idCol.innerText = young._id;
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
    sortYoungData((first, second) => first._id - second._id);
}

sortDownToUpByID = () => {
    sortYoungData((first, second) => second._id - first._id);
}

sortUpToDownByName = () => {
    sortYoungData((first, second) => first.name.localeCompare(second.name));
}

sortDownToUpByName = () => {
    sortYoungData((first, second) => second.name.localeCompare(first.name));
}

sortYoungData = (sortFunc) => {
    chosenYoung = null;
    clearSpecificDetailsTable();
    youngData.sort(sortFunc);
    loadAllDetailsTable();
}


showSpecificDetails = async(rowIndex) => {
    const specificDetailsTable = document.getElementById("specificDetailsTable");
    specificDetailsTable.innerHTML = "";
    let youngDetails = null;
    chosenYoung = youngData[rowIndex];
    const response = await fetch(`${SERVER_ADDRESS}specificDetails/${youngData[rowIndex]._id}`)
    youngDetails = await response.json();
    const youngName = youngData[rowIndex].name;
    const row = document.createElement(TR);
    const nameCol = document.createElement(TD);
    nameCol.innerText = NAME + youngName;
    const hobitCol = document.createElement(TD);
    hobitCol.innerText = HOBBY + youngDetails.hobby;
    const bookCol = document.createElement(TD);
    bookCol.innerText = BOOK + youngDetails.favoriteBook;
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
                row.style.backgroundColor = "";
            });
            const rowSelected = allDetailsTable.getElementsByTagName(TR)[rowId];
            rowSelected.style.backgroundColor = "lightblue";
            showSpecificDetails(rowId - 1);
        }
    });
}

clearAddingYoungPage = () => {
    document.getElementById("AddingYoungPageContainer").style.display = NONE;
}

clearYoungPage = () => {
    document.getElementById("YoungPageContainer").style.display = NONE;
}

clearAliensPage = () => {
    document.getElementById("AlienPageContainer").style.display = NONE;
}

loadAliensPage = () => {
    clearYoungPage();
    clearAddingYoungPage();
    document.getElementById("AlienPageContainer").style.display = "";
}

clearSpecificDetailsTable = () => {
    const specificDetailsTable = document.getElementById("specificDetailsTable");
    specificDetailsTable.innerHTML = "";
}

loadYoungPage = () => {
    chosenYoung = null;
    clearSpecificDetailsTable();
    clearAliensPage();
    clearAddingYoungPage();
    loadAllDetailsTable();
    document.getElementById("YoungPageContainer").style.display = "";
}

loadAddingYoungPage = () => {
    clearAliensPage();
    if (addingOn) {
        clearAddingYoungPage();
    } else {
        document.getElementById("AddingYoungPageContainer").style.display = "";
    }
    addingOn = !addingOn;
}

setClockTime = () => {
    if (clockOn) {
        document.getElementById("clock").innerHTML = new Date().toLocaleTimeString();
    }
}

operateClock = () => {
    clockOn = !clockOn;
    if (clockOn) {
        document.getElementById("clockController").innerHTML = STOP;
        clockInterval = setInterval(setClockTime, 1000);

    } else {
        document.getElementById("clockController").innerHTML = START;
        clearInterval(clockInterval);
    }
}

deleteYoung = async() => {
    if (Boolean(chosenYoung)) {
        await fetch(`${SERVER_ADDRESS}removeYoung/${chosenYoung._id}`, { method: "POST" });
        youngData.splice(youngData.indexOf(chosenYoung), 1);
        chosenYoung = null;
        clearSpecificDetailsTable();
        loadAllDetailsTable();
    } else {
        alert("לא נבחר צעיר");
    }
}

creatYoungObject = () => {
    const youngId = document.getElementById(INPUTS[0]).value;
    const youngName = document.getElementById(INPUTS[1]).value;
    const youngPlace = document.getElementById(INPUTS[2]).value;
    const youngPhone = document.getElementById(INPUTS[3]).value;
    const hobby = document.getElementById(INPUTS[4]).value;
    const favBook = document.getElementById(INPUTS[5]).value;
    const newYoung = {
        "_id": youngId,
        "name": youngName,
        "place": youngPlace,
        "phone": youngPhone,
        "specificDetails": {
            "hobby": hobby,
            "favoriteBook": favBook
        }
    }
    return newYoung;
}

clearInputs = () => {
    document.getElementById(INPUTS[0]).value = null;
    document.getElementById(INPUTS[1]).value = null;
    document.getElementById(INPUTS[2]).value = null;
    document.getElementById(INPUTS[3]).value = null;
    document.getElementById(INPUTS[4]).value = null;
    document.getElementById(INPUTS[5]).value = null;
}


postNewYoung = async() => {
    const newYoung = creatYoungObject();
    if (newYoung._id && newYoung.name != "" && newYoung.place != "" &&
        newYoung.phone && newYoung.specificDetails.hobby != "" && newYoung.specificDetails.favoriteBook != "") {
        const response = await fetch(`${SERVER_ADDRESS}insertYoung`, {
            method: 'POST',
            body: JSON.stringify(newYoung)
        })
        const responseText = await response.text();
        console.log(responseText);
        if (response.status == 200) {
            youngData.push(newYoung);
            clearInputs();
        } 
        else {
            if (responseText == "no write to db") {
                alert("לא הצליח לכתוב לשרת");
            } else {
                alert("מספר חייזר כבר קיים");
            }
        }
        loadAllDetailsTable();
    } else {
        alert("יש למלא את כל השדות");
    }
}

const clockInterval = setInterval(setClockTime, 1000);