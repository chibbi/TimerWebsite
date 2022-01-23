// written by chibbi
const red = "white";
const green = "#8FBC8F";

function containsTimerList(cookie) {
    return cookie.includes("timerlist");
}

function getTimerList() {
    if (document.cookie.split(";").find(containsTimerList) == undefined || document.cookie.split(";").find(containsTimerList) == null) {
        return "{}";
    }
    return document.cookie.split(";").find(containsTimerList).replace("timerlist=", "");
}

function loadCountdowns() {
    const list = JSON.parse(getTimerList());
    for (const timerID in list) {
        countDown(list[timerID], timerID);
    }
}

function loadCheckboxes() {
    // this section loads every cookie for every timer
    const list = JSON.parse(getTimerList());
    for (const timerID in list)
        loadCheckbox(timerID);
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

function countDown(timer, timerID) {
    const countDownDate = new Date(timer.date).getTime();
    const counterName = timer.name;
    const countdownsdiv = document.getElementById("countdowns");
    countdownsdiv.innerHTML += '<div class="cdc" id="' + timerID + 'c">' +
        '<p class="cdt">' + counterName + ' Prüfung in:</p>' +
        '<p class="cd" id="' + timerID + '"></p>' +
        '<input type="button" value="Delete Countdown"' +
        'onclick="removeCountdown(\'' + timerID + '\')" id="rm' + timerID + '" />' +
        '</div>';
    const checkboxesdiv = document.getElementById("checkboxes");
    checkboxesdiv.innerHTML += '<input type="button" value="' + timerID + '"' +
        'onclick="toggleVisibility(\'' + timerID + '\')" id="vi' + timerID + '" style="background-color: rgb(143, 188, 143);"/>';
    // Update the count down every 1 second
    const countdownInterval = setInterval(function () {
        // Get current date and time
        const then = new Date(countDownDate);
        const duration = countDownDate - new Date().getTime();
        const durationDate = new Date(duration);
        // If Timer does not exist any more, delete it:
        if (document.getElementById(timerID) == null) {
              clearInterval(countdownInterval);
        } // If the countdown is over, show it
        else if (duration < 0) {
            clearInterval(countdownInterval);
            document.getElementById(timerID).textContent = "----------";
        } else {
            // Output the result in an element with id=textID
            document.getElementById(timerID).textContent =
                ((duration / (1000 * 60 * 60 * 24))).toString().split(".")[0] + " Tage, " +
                (durationDate.getHours() - 1) + " Stunden, " + // TODO: find out where this extra hour comes from
                durationDate.getMinutes() + " Minuten, " +
                durationDate.getSeconds() + " Sekunden " + " - (" +
                then.toLocaleString() + ")";
        }
       }, 500);
    document.getElementById(timerID + "c").style.backgroundColor = timer.background;
}

function addCountdown(backgroundColor, name, endTime) {
    // TODO: trigger error if countdown already exists
    endTime = new Date(endTime)
    let list = JSON.parse(getTimerList());
    if(list[name] != null) {
        return;
    }
    list[name] = {"name":name,"date":endTime,"background":backgroundColor};
    document.cookie = "timerlist=" + JSON.stringify(list) + ";expires="+new Date(endTime.setFullYear(endTime.getFullYear()+1)).toUTCString();
    // TODO:/FIXME: HOW AND WHY is
    // list[name]
    // NOT EQUAL TO
    // JSON.parse(getTimerList())[name]
    countDown(JSON.parse(getTimerList())[name], name);
}

function changeCountdown(backgroundColor, name, endTime) {
    // TODO: trigger error if countdown does not exist
    // this is the easiest solution
    removeCountdown(name);
    addCountdown(backgroundColor, name, endTime);
}

function removeCountdown(timerID = "Temp") {
    let list = JSON.parse(getTimerList());
    delete list[timerID];
    document.cookie = "timerlist=" + JSON.stringify(list) + ";expires="+new Date(new Date().setFullYear(new Date().getFullYear()+1)).toUTCString();
    document.getElementById(timerID + "c").remove();
    document.getElementById("vi" + timerID).remove();
}

function addTimerViaInputs() {
    // TODO: trigger error if something is not filled out
    const name = document.getElementById("timername").value;
    const date = document.getElementById("timerdate").value;
    const color = document.getElementById("timercolor").value;
    if(name == "") 
        addCountdown(color, "Temp", new Date(date)
    else 
        addCountdown(color, name, new Date(date)
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

function toggleVisibility(counterName) {
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

function debug() {
    const timerList = {
        "d": { "name": "Deutsch", "date": "May 4, 2022 10:00:00", "background": "rgb(149, 165, 244)" },
        "w": { "name": "Wirtschaft", "date": "May 6, 2022 10:00:00", "background": "#a29fcc" },
        "test": {"name": "testii", "date": new Date(new Date().setMinutes(new Date().getMinutes()+3000)), "background": "rgb(234,54,43)"}
    };
    document.cookie = "timerlist=" + JSON.stringify(timerList) + ";expires="+new Date(new Date().setFullYear(new Date().getFullYear()+1)).toLocaleString();
}
