// written by chibbi
// a simple Dictionary to hold all the Content that should get loaded into the Sites
var siteContent = {
  navbar: {
    logo: '<li style="padding: 0px;"><a href="home"><img src="/pictures/logo.png" alt="Ranininn Logo" style="width:220px;height:220px;"></a></li>',
    //search: "<form action='javascript:searchStart();'><input name='search' type='text' placeholder='Search..'></form>",
    home: '<li><a href="home">Start</a></li>',
    timer: '<li><a href="countdown">Abitur 21 Countdown</a></li>',
    inter: '<li><a href="interpretation">Interpretationen</a></li>',
    ascii: '<li><a href="ascii">ASCII-Art</a></li>',
    about: '<li><a href="home#About">Über Uns</a></li>',
    contact: '<li><a href="home#Contact">Kontakt</a></li>',
    //nextcloud: '<li><a href="/nextcloud/">Nextcloud</a></li>',
    //mail: '<li><a href="/mail">Mail</a></li>',
    //messenger: '<li><a href="/messenger">Messenger</a></li>',
    opensettings: '<input type="button" id="colordefault" class="sitechangenb" value="Öffne Einstellungen" onclick="javascript:showSettings();">',
    divsettingsopen: '<div id="settingsnb">',
    Color: '<input type="color" id="colorpicker" name="colorpicker" value="#F0EBE4" onchange="changeColor()">',
    makedefault: '<input type="button" id="colordefault" class="sitechangenb" value="Farbthema zurücksetzen" onclick="javascript:resetColor();">',
    makelclen: '<input type="button" id="colordefault" class="sitechangenb" value="english" onclick="javascript:changeLang(\'en\');">',
    makelclde: '<input type="button" id="colordefault" class="sitechangenb" value="deutsch" onclick="javascript:changeLang(\'de\');">',
    divsettingsclosed: '</div>',
    Bracket1: '<br>',
  },
  maincontent: {
    consent: "<script>PLACEBO</script>",
  },
  about: {
    DeveloperChib:
      '<div class="workerSingle"><a href="chibbi"><p>Chibbi</p><img src="/pictures/schnabeltier.png" alt="Chibbis Maskottchen" style="width:220px;height:220px;"><p>Backend-Entwickler</p></a></div>',
    DeveloperRan:
      '<div class="workerSingle"><a href="raninn"><p>Raninn</p><img src="/pictures/biebo.png" alt="Raninns Maskottchen" style="width:220px;height:220px;"><p>Placebo</p></a></div>',
    DesignerJoh:
      '<div class="workerSingle"><a href="jojo"><p>Jojo</p><img src="/pictures/duckii.png" alt="Jojos Maskottchen" style="width:220px;height:220px;"><p>Designer</p></a></div>',
    MotivationMo:
      '<div class="workerSingle"><a href="mattEagle"><p>Matt_Eagle</p><img src="/pictures/eagle.png" alt="MattEagles Maskottchen" style="width:220px;height:220px;"><p>Demotivationstrainer</p></a></div>',
  },
};

// Things to start on Site Load
// named loadMaincontent because else i would have to change every single html file
// kinda a hack i know but it is not that bad so it's all fine
// every htmlfile already starts
// loadNavbar()
// loadAbout()
// loadMaincontent()
function loadMaincontent() {
  loadcontent();
  consentCookies();
}

// loads every object from the object "navbar" in the Dictionary into the existing navBar ul Element
function loadNavbar() {
  // loads ul Element
  var obj = document.getElementById("navBar");
  var temp = "";
  // cycles through the objects of "navbar"
  for (var content in siteContent.navbar) {
    // adds those objects to the navbar
    temp += siteContent.navbar[content];
  }
  obj.innerHTML = temp;
}

function loadAbout() {
  // loads div Element
  var obj = document.getElementById("workerList");
  var temp = "";
  // cycles through the objects of "about"
  for (var content in siteContent.about) {
    // adds those objects to the about
    temp += siteContent.about[content];
  }
  obj.innerHTML = temp;
}
// loads every object from the object "maincontent" in the Dictionary into the existing mainContent div Element
function loadcontent() {
  // loads ul Element
  var obj = document.getElementById("Content");
  // cycles through the objects of "maincontent"
  for (var content in siteContent.content) {
    // adds those objects to the maincontent div
    obj.innerHTML += siteContent.content[content];
  }
  document.querySelectorAll("section").forEach(function (p) {
    p.style.backgroundColor = getCookie("color");
  });
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getVar() {
  var $_GET = {};
  if (document.location.toString().indexOf('?') !== -1) {
    var query = document.location.toString()
      // get the query string
      .replace(/^.*?\?/, '')
      // and remove any existing hash string
      .replace(/#.*$/, '').split('&');
    for (var i = 0, l = query.length; i < l; i++) {
      var aux = decodeURIComponent(query[i]).split('=');
      $_GET[aux[0]] = aux[1];
    }
  }
  return $_GET;
}

function consentCookies() {
  if (getCookie('cookieconsent') != "true") {
    document.body.innerHTML += '\
          <div class="cookieconsent">\
              Diese Seite nutzt Cookies und sammelt Daten über sie. Durch das weitere Nutzen der Seite, stimmen sie auch der Nutzung von Cookies zu. \
              <button id="coconsent">Ich verstehe</button>\
          </div>\
          ';
    document.querySelector('.cookieconsent #coconsent').onclick = function (e) {
      e.preventDefault();
      console.log("clicked Consenting");
      document.querySelector('.cookieconsent').style.display = 'none';
      setCookie("cookieconsent", "true", 7);
      whichLanguage();
    };
  } else { whichLanguage(); }
}

function whichLanguage() {
  if (getCookie('lcl') == "") {
    document.body.innerHTML += '\
          <div class="locales">\
        This site has different Versions for different Languages. Please specify which Language you want to use.\
        <div class="cookieconsent">\
        This site uses cookies. By continuing to use this website, you agree to their use.\
        <div id="langList" style="flex-direction: row;">\
        <button id="deutsch">Deutsch</button>\
        <button id="english">English</button>\
        </div>\
          </div>\
      ';
    document.querySelector('.locales #deutsch').onclick = function (e) {
      e.preventDefault();
      document.querySelector('.locales').style.display = 'none';
      setCookie("lcl", "de", 365);
      location.reload();
    };
    document.querySelector('.locales #english').onclick = function (e) {
      e.preventDefault();
      document.querySelector('.locales').style.display = 'none';
      setCookie("lcl", "en", 365);
      location.reload();
    };
  }
}

function changeLang(newloc) {
  setCookie("lcl", newloc, 365);
  location.reload();
}

var expanded = false;
function showSettings() {
  var checkboxes = document.getElementById("settingsnb");
  if (!expanded) {
    checkboxes.style.display = "block";
    expanded = true;
  } else {
    checkboxes.style.display = "none";
    expanded = false;
  }
}

function mobileNavbar() {
  var x = document.getElementById("navBardiv");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

function sendMail() {
  var subject = document.getElementsByName("subject");
  var body = document.getElementsByName("comment");
  window.open(
    "mailto:support@example.com,YOURBOT@gmail.com@gmail.com?subject=" +
    subject[0].value +
    "&body=" +
    body[0].value
  );
}

function searchStart() {
  var search = document.getElementsByName("search");
  window.location.replace("/search.html?search=" + search[0].value);
}

function changeColor() {
  document.querySelectorAll("section").forEach(function (p) {
    p.style.backgroundColor = document.getElementById("colorpicker").value;
    setCookie("color", document.getElementById("colorpicker").value, 365);
  });
}

function resetColor() {
  document.querySelectorAll("section").forEach(function (p) {
    p.style.backgroundColor = "#F0EBE4";
    setCookie("color", "#F0EBE4", 365);
  });
}