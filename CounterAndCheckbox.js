<!doctype html>

<html lang="en">

<head>
  <meta charset="UTF-8">
  
  <title>Abi Countdown</title>
  <link rel="stylesheet" href="appereance.css">
  <meta name="description" content="Official Website of Raninninn">
  <meta name="author" content="chibbi">
  <script data-ad-client='ca-pub-9021480086144976' async src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'></script>
</head>

<body onload="loadCheckboxes()">
  <script src="CounterAndCheckbox.js"></script>
  <div class="navBar">
    <ul id="navBar">
    </ul>
  </div>
  
  <div class="mainContent">
    <div class="multiselect">
      <div class="selectBox" onclick="showCheckboxes()">
        <select>
          <option>Wähle sichtbare Prüfungen aus</option>
        </select>
        <div class="overSelect"></div>
      </div>
      <div id="checkboxes">
        <label for="one">
          <input type="checkbox" id="vid" />Deutsch</label>
        <label for="two">
          <input type="checkbox" id="viph" />Physik</label>
        <label for="three">
          <input type="checkbox" id="viw" />Wirtschaft</label>
        <label for="three">
          <input type="checkbox" id="vie" />Englisch</label>
        <label for="three">
          <input type="checkbox" id="vich" />Chemie</label>
        <label for="three">
          <input type="checkbox" id="vim" />Mathe</label>
      </div>
    </div>
    <div class="cdc" id="dc">
      <p class="cdt">Deutsch Prüfung in:</p>
      <p class="cd" id="d"></p>
    </div>
    <div class="cdc" id="phc">
      <p class="cdt">Physik Prüfung in:</p>
      <p class="cd" id="ph"></p>
    </div>
    <div class="cdc" id="wc">
      <p class="cdt">Wirtschaft Prüfung in:</p>
      <p class="cd" id="w"></p>
    </div>
    <div class="cdc" id="ec">
      <p class="cdt">Englisch Prüfung in:</p>
      <p class="cd" id="e"></p>
    </div>
    <div class="cdc" id="chc">
      <p class="cdt">Chemie Prüfung in:</p>
      <p class="cd" id="ch"></p>
    </div>
    <div class="cdc" id="mc">
      <p class="cdt">Mathe Prüfung in:</p>
      <p class="cd" id="m"></p>
    </div>
  </div>
  <script src="siteLoader.js"></script>
</body>

</html>
