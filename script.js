// written by chibbi
var expanded = false;
var red = "white";
var green = "#8FBC8F";

function showCheckboxes() {
    var checkboxes = document.getElementById("checkboxes");
    if (!expanded) {
        checkboxes.style.display = "flex";
        expanded = true;
    } else {
        checkboxes.style.display = "none";
        expanded = false;
    }
}

function loadCheckboxes() {
    var cookies = document.cookie;
    // this section loads every cookie for every timer
    loadCheckbox("d");
    loadCheckbox("w");
    loadCheckbox("ph");
    loadCheckbox("e");
    loadCheckbox("ch");
    loadCheckbox("m");
    // finished loading
}

function loadCheckbox(visibilityBox) {
    // basically searches the cookie string after the given name and if it is
    // false
    buttonID = "vi" + visibilityBox;
    visibilityBox = visibilityBox + "c";
    if (document.cookie.includes("checkBox_" + visibilityBox + "=false")) {
        document.getElementById(visibilityBox).style.display = "none";
        document.getElementById(buttonID).style.backgroundColor = red;
        // or true
    } else if (document.cookie.includes("checkBox_" + visibilityBox + "=true")) {
        document.getElementById(visibilityBox).style.display = "block";
        document.getElementById(buttonID).style.backgroundColor = green;
        // if it is neither false nor true is is made true by default
    } else {
        document.getElementById(visibilityBox).style.display = "block";
        document.cookie = "checkBox_" + visibilityBox + "=true;expires=Mon, 04 Jul 2022 22:44:25 UTC";
    }
}

function checkVisibility(counterID) {
    // Checks if the given Text and Counter should be visible
    buttonID = "vi" + counterID;
    counterID = counterID + "c";
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

function countDown(countDownDate, counterID, counterName) {
    let contentdiv = document.getElementById("content");
    contentdiv.innerHTML += '<div class="cdc" id="' + counterID + 'c">' +
        '<p class="cdt">' + counterName + ' Prüfung in:</p>' +
        '<p class="cd" id="' + counterID + '"></p>' +
        '</div>';
    let checkboxesdiv = document.getElementById("checkboxes");
    checkboxesdiv.innerHTML += '<input type="button" value="' + counterName + '"' +
        'onclick="checkVisibility(\'' + counterID + '\')" id="vi' + counterID + '" />';
    // Update the count down every 1 second
    var x = setInterval(function () {
        // Get current date and time
        var now = new Date().getTime();
        var then = new Date(countDownDate);
        var duration = countDownDate - now;
        var durationDate = new Date(duration);

        // Output the result in an element with id=textID
        document.getElementById(counterID).textContent =
            (durationDate.getDate() - 1) + " Tage, " +
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
}
// creates the countdown for every timer
function loadCountdowns() {
    countDown(new Date("May 4, 2021 9:00:00").getTime(), "d", "Deutsch");
    countDown(new Date("May 6, 2021 9:00:00").getTime(), "ph", "Physik");
    countDown(new Date("May 7, 2021 9:00:00").getTime(), "w", "Wirtschaft");
    countDown(new Date("May 10, 2021 9:00:00").getTime(), "e", "Englisch");
    countDown(new Date("May 11, 2021 9:00:00").getTime(), "ch", "Chemie");
    countDown(new Date("May 17, 2021 9:00:00").getTime(), "m", "Mathe");
}


// How to create new Dates:
// 1. create a new "countDown(...)" // line 109
// 2. create a new "loadCheckBox(...)" in loadCheckBoxes() // line 26
// 3. create a new thingy in the css file (not necessary)
// TODO: create a function which automatically does all of the above 

// How to change from one Abi to the next
// 1. Change every Date for every Prüfung to the new Date
// 2. Maybe change/increase ExpiringDate
