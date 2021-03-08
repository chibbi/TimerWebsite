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

function countDown(countDownDate, counterID) {
    // Update the count down every 1 second
    var x = setInterval(function () {
        // Get current date and time
        var now = new Date().getTime();

        var duration = countDownDate - now;

        var months = Math.floor(duration / (1000 * 60 * 60 * 24 * 31));
        var days = Math.floor((duration % (1000 * 60 * 60 * 24 * 31)) / (1000 * 60 * 60 * 24));
        var hours = Math.floor((duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((duration % (1000 * 60)) / 1000);

        // Output the result in an element with id=textID
        document.getElementById(counterID).textContent =
            months +
            " Monate, " +
            days +
            " Tage, " +
            hours +
            " Stunden, " +
            minutes +
            " Minuten, " +
            seconds +
            " Sekunden ";

        // If the countdown is over, show it
        if (duration < 0) {
            clearInterval(x);
            document.getElementById(counterID).textContent = "Prüfungstart war bereits.";
        }
    }, 1000);
}
// creates the countdown for every timer
countDown(new Date("May 4, 2021 9:00:00").getTime(), "d");
countDown(new Date("May 6, 2021 9:00:00").getTime(), "ph");
countDown(new Date("May 7, 2021 9:00:00").getTime(), "w");
countDown(new Date("May 10, 2021 9:00:00").getTime(), "e");
countDown(new Date("May 11, 2021 9:00:00").getTime(), "ch");
countDown(new Date("May 17, 2021 9:00:00").getTime(), "m");


// How to create new Dates:
// 1. create new <p></p> Texts (with ids)
// 2. create new Button in DropDown Select Menu
// 3. create new countDown(...)
// 4. create new loadCheckBox(...) in loadCheckBoxes()

// How to change from one Abi to the next
// 1. Change every Date for every Prüfung to the new Date
// 2. Maybe change/increase ExpiringDate
