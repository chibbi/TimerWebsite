// written by chibbi
const red = "white";
const green = "#8FBC8F";
const timerList = {
    //"d": { "name": "Deutsch", "date": "May 4, 2021 9:00:00", "background": "rgb(149, 165, 244)" },
    //"w": { "name": "Wirtschaft", "date": "May 6, 2021 9:00:00", "background": "#a29fcc" },
    //"ph": { "name": "Physik", "date": "May 7, 2021 9:00:00", "background": "#d9a6db" },
    //"e": { "name": "Englisch", "date": "May 10, 2021 9:00:00", "background": "#f7c09e" },
    //"ch": { "name": "Chemie", "date": "May 11, 2021 9:00:00", "background": "#f4e866" },
    //"m": { "name": "Mathe", "date": "May 17, 2021 9:00:00", "background": "#f4705f" },
    "it": { "name": "IT", "date": "Jun 29, 2021 11:30:00", "background": "#a29fcc" },
    "gb": { "name": "GB", "date": "Jul 4, 2021 1:00:00", "background": "#d9a6db" },
    "as": { "name": "AS", "date": "Sep 6, 2021 8:00:00", "background": "#f4e866" },
    "ls": { "name": "LS", "date": "Oct 4, 2021 13:00:00", "background": "#f7c09e" },
}

let expanded = false;
function showCheckboxes() {
    const checkboxes = document.getElementById("checkboxes");
    if (!expanded) {
        checkboxes.style.display = "flex";
        expanded = true;
    } else {
        checkboxes.style.display = "none";
        expanded = false;
    }
}

function loadCountdowns() {
    // creates the countdown for every timer
    for (const time in timerList)
        countDown(time);

}


function loadCheckboxes() {
    // this section loads every cookie for every timer
    for (const id in timerList)
        loadCheckbox(id);
}

function loadCheckbox(visibilityBoxName) {
    const buttonID = "vi" + visibilityBoxName;
    const visibilityBox = visibilityBoxName + "c";
    // basically searches the cookie string after the given name and if it is
    // false
    if (document.cookie.includes("checkBox_" + visibilityBox + "=false")) {
        document.getElementById(visibilityBox).style.display = "none";
        document.getElementById(buttonID).style.backgroundColor = red;
        // or true
    } else if (document.cookie.includes("checkBox_" + visibilityBox + "=true")) {
        document.getElementById(visibilityBox).style.display = "block";
        document.getElementById(buttonID).style.backgroundColor = green;
        // if it is neither false nor true, it is made true by default
    } else {
        document.getElementById(visibilityBox).style.display = "block";
        document.getElementById(buttonID).style.backgroundColor = green;
        document.cookie = "checkBox_" + visibilityBox + "=true;expires=Mon, 04 Jul 2022 22:44:25 UTC";
    }
}

function checkVisibility(counterName) {
    // Checks if the given Text and Counter should be visible
    const buttonID = "vi" + counterName;
    const counterID = counterName + "c";
    if (document.getElementById(counterID).style.display == "none") {
        // if yes, it will show them
        document.getElementById(counterID).style.display = "block";
        document.getElementById(buttonID).style.backgroundColor = green;
        document.cookie = "checkBox_" + counterID + "=true;expires=Mon, 04 Jul 2022 22:44:25 UTC";
    } else {
        // if not, it will not show them
        document.getElementById(counterID).style.display = "none";
        document.getElementById(buttonID).style.backgroundColor = red;
        document.cookie = "checkBox_" + counterID + "=false;expires=Mon, 04 Jul 2022 22:44:25 UTC";
    }
}

function countDown(counterID) {
    const countDownDate = new Date(timerList[counterID].date).getTime();
    const counterName = timerList[counterID].name;
    const contentdiv = document.getElementById("content");
    contentdiv.innerHTML += '<div class="cdc" id="' + counterID + 'c">' +
        '<p class="cdt">' + counterName + ' Prüfung in:</p>' +
        '<p class="cd" id="' + counterID + '"></p>' +
        '</div>';
    const checkboxesdiv = document.getElementById("checkboxes");
    checkboxesdiv.innerHTML += '<input type="button" value="' + counterID + '"' +
        'onclick="checkVisibility(\'' + counterID + '\')" id="vi' + counterID + '" />';
    // Update the count down every 1 second
    const x = setInterval(function () {
        // Get current date and time
        var now = new Date().getTime();
        var then = new Date(countDownDate);
        var duration = countDownDate - now;
        var durationDate = new Date(duration);
        // Output the result in an element with id=textID
        document.getElementById(counterID).textContent =
            ((duration / (1000 * 60 * 60 * 24))).toString().split(".")[0] + " Tage, " +
            (durationDate.getHours() - 1) + " Stunden, " +
            durationDate.getMinutes() + " Minuten, " +
            durationDate.getSeconds() + " Sekunden " + " - (" +
            then.getDate() + "." +
            (then.getMonth() + 1) + "." +
            then.getFullYear() + " " +
            (then.getHours() < 10 ? '0' : '') + then.getHours() + ":" +
            (then.getMinutes() < 10 ? '0' : '') + then.getMinutes() + ")";

        // If the countdown is over, show it
        if (duration < 0) {
            clearInterval(x);
            document.getElementById(counterID).textContent = "Prüfungstart war bereits.";
        }
    }, 500);
    document.getElementById(counterID + "c").style.backgroundColor = timerList[counterID].background;
}

// How to create new Dates:
// 1. create a new Object in "timerList" // line 4

// How to change from one Abi to the next
// 1. Change every Date for every Prüfung to the new Date
// 2. Maybe change/increase ExpiringDate
