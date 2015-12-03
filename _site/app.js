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
//var selectallButton = document.getElementById("rs-selectall");
var clearRsButton = document.getElementById("rs-clear");
var textOptionButton = document.getElementById("op-text");
var xmlOptionButton = document.getElementById("op-xml");
var translateButton = document.getElementById("in-translate");
var clearInButton = document.getElementById("in-clear")

//Container for the resutlt list
var resultsList = document.createElement("ul");
resultsList.id = "rs-resultsList"

//Depot, Option and Changelist items
var depot = "http://aviapp.avidyne.com:8080/";
var option = "?ac=160";
var changelist = "";

//Toggle the depot to select
function depotToggle(depot) {
  melbourneButton.setAttribute("class", "button");
  lincolnButton.setAttribute("class", "button");
  depot.setAttribute("class", "button selected");
}

//Toggle the option to select
function optionToggle(option) {
  textOptionButton.setAttribute("class", "button");
  xmlOptionButton.setAttribute("class", "button");
  option.setAttribute("class", "button selected");
}

//Toggles for each button:
lincolnButton.onclick = function() {
  depotToggle(lincolnButton);
  deopt = "http://aviapp.avidyne.com:8080/";
};
melbourneButton.onclick = function() {
  depotToggle(melbourneButton);
  depot = "http://palmtree.avidyne.com:8080/";
};
textOptionButton.onclick = function() {
  optionToggle(textOptionButton);
  option = "?ac=160";
};
xmlOptionButton.onclick = function() {
  optionToggle(xmlOptionButton);
  option = "?ac=201";
};
clearClButton.onclick = function() {
  var changelistInput = document.getElementById("cl-input");
  changelistInput.value = "";
};
clearInButton.onclick = function() {
  var inputArea = document.getElementById("in-inputArea");
  inputArea.value = "";
};
clearRsButton.onclick = function() {
  var resultsDiv = document.getElementById("rs-results");
  resultsList.innerHTML = "";
  resultsDiv.innerHTML = "";
};

//Build the link to fetch
function buildUrl(clInput, repository, opSelection) {
  var fetchUrl = repository;
  fetchUrl += "@md=d&cd=//&c=&rc=s@/p4%20describe%20";
  fetchUrl += clInput;
  fetchUrl += opSelection;
  return fetchUrl;
}

//Add to results list for each item
function addToResults(linkMeat, depot, clXML) {
  var itemToAdd = document.createElement("li");
  itemToAdd.innerHTML = depot + linkMeat + "@" + clXML;
  resultsList.appendChild(itemToAdd);
}

//On open click collect data and open URL
openButton.onclick = function() {
  console.log("Open Button Clicked");
  
  //Set Changelist Entered
  var changelistInput = document.getElementById("cl-input");
  changelist = changelistInput.value;
  
  //Build the url using selected options
  var xmlUrl = buildUrl(changelist, depot, option);
  console.log("The xmlUrl is " + xmlUrl);

  window.open(xmlUrl);
}

//On translate click collect data and output formatted strings
translateButton.onclick = function() {
  console.log("Translate Button Clicked");

  //Get results box item
  var resultsDiv = document.getElementById("rs-results");
  //Clear results box
  resultsList.innerHTML = "";
  resultsDiv.innerHTML = "";

  //Grab the XML from the input and parse to XML
  var inputXML = $.parseXML(document.getElementById("in-inputArea").value);
  
  //Extract the depotfiles and changelistXML from the XML data
  var depotFiles = inputXML.getElementsByTagName("depotfile");
  var perforce = inputXML.getElementsByTagName("perforce");
  var changelistXML = perforce[0].getAttributeNode("args");
  
  //Lopp through depotFiles and pull out the link values
  for (var i = 0; i < depotFiles.length; i++) {
    var linkValue = depotFiles[i].getAttributeNode("value");
    addToResults(linkValue.value, depot, changelistXML.value);
  };

  //Add resultsList to results box
  resultsDiv.appendChild(resultsList);
  
}







