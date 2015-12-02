// AviFish:
// Application to search Perforce changle lists and return formated document
// link that point to the repository selected and well as specificly the file version
// submitted within the changelist noted.
// Author: Dan Gallagher


//Collect the DOM button into variables
var lincolnButton = document.getElementById("dp-lincoln");
var melbourneButton = document.getElementById("dp-melbourne");
var openButton = document.getElementById("cl-open");
var clearClButton = document.getElementById("cl-clear");
var selectallButton = document.getElementById("rs-selectall");
var clearRsButton = document.getElementById("rs-clear");
var textOptionButton = document.getElementById("op-text");
var clOptionButton = document.getElementById("op-changelist");
var verOptionButton = document.getElementById("op-version");
var translateButton = document.getElementById("in-translate");
var clearInButton = document.getElementById("in-clear")

//Collect the DOM Input and Output into variables
var changelistInput = document.getElementById("cl-input");

var resultsOutput = document.getElementById("rs-results");

//Toggle the depot to select
function depotToggle(depot) {
  melbourneButton.setAttribute("class", "button");
  lincolnButton.setAttribute("class", "button");
  depot.setAttribute("class", "button selected");
}

//Toggle the option to select
function optionToggle(option) {
  textOptionButton.setAttribute("class", "button");
  clOptionButton.setAttribute("class", "button");
  verOptionButton.setAttribute("class", "button");
  option.setAttribute("class", "button selected");
}

//Toggles for each button:
lincolnButton.onclick = function() {
  depotToggle(lincolnButton);
};
melbourneButton.onclick = function() {
  depotToggle(melbourneButton);
};
textOptionButton.onclick = function() {
  optionToggle(textOptionButton);
};
clOptionButton.onclick = function() {
  optionToggle(clOptionButton);
};
verOptionButton.onclick = function() {
  optionToggle(verOptionButton);
};

//Build the link to fetch
function buildUrl(changelist, repository, option) {
  var fetchUrl = repository;
  fetchUrl += "@md=d&cd=//&c=5a1&rc=s@/p4%20describe%20";
  fetchUrl += changelist;
  fetchUrl += option;
  return fetchUrl;
}

//Set the results to the Results box
function setResults(data) {
  resultsOutput.value = data;
}

var windowHTML = "";

//On open click collect data and open URL
openButton.onclick = function() {
  console.log("Open Button Clicked");

  var depot = "";
  var option = "";
  var changelist = "";

  //Set Depot Selected
  if (lincolnButton.getAttribute("class") === "button selected") {
    console.log("Lincoln Depot Selected");
    repository = "http://aviapp.avidyne.com:8080/";
  } else if (melbourneButton.getAttribute("class") === "button selected") {
    console.log("Melbourne Depot Selected");
    repository = "http://palmtree.avidyne.com:8080/";
  } else {
    console.log("Errrror")
  }
  
  //Set Option Selected
  if (textOptionButton.getAttribute("class") === "button selected") {
    console.log("Text Option Selected");
    option = "?ac=160";
  } else if (clOptionButton.getAttribute("class") === "button selected") {
    console.log("Changelist Links Option Selected");
    option = "?ac=201";
  } else if (verOptionButton.getAttribute("class") === "button selected") {
    console.log("Version Links Option Selected");
    option = "?ac=201";
  } else {
    console.log("Errrror")
  }
  
  //Set Changelist Entered
  if (changelistInput != "") {
    console.log("Changelist Number: " + changelistInput.value);
    changelist = changelistInput.value;
  } else {
    console.log("Errrror")
  }
  
  //Build the url using selected options
  var xmlUrl = buildUrl(changelist, repository, option);
  console.log("The xmlUrl is " + xmlUrl);

  window.open(xmlUrl);
}

//On translate click collect data and output formatted strings
translateButton.onclick = function() {
  console.log("Translate Button Clicked");

  var inputText = document.getElementById("in-inputArea");
  console.dir(inputText.typeOf);
}





