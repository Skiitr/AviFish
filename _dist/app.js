// AviFish:
// Application to search Perforce changle lists and return formated document
// link that point to the repository selected and well as specificly the file version
// submitted within the changelist noted.
// Author: Dan Gallagher

/*jslint browser: true*/
/*global $, jQuery, alert*/

$(document).ready(function () {
  
  "use strict";
  
  //Collect the DOM button into variables
  var lincolnButton = document.getElementById("dp-lincoln"),
    melbourneButton = document.getElementById("dp-melbourne"),
    openButton = document.getElementById("cl-open"),
    clearClButton = document.getElementById("cl-clear"),
  //var selectallButton = document.getElementById("rs-selectall");
    clearRsButton = document.getElementById("rs-clear"),
    textOptionButton = document.getElementById("op-text"),
    xmlOptionButton = document.getElementById("op-xml"),
    translateButton = document.getElementById("in-translate"),
    clearInButton = document.getElementById("in-clear"),
  //Depot, Option and Changelist items
    depot = "http://aviapp.avidyne.com:8080/", //Default
    option = "?ac=160", //Default
    changelist = "",
  //Container for the resutlt list
    resultsList = document.createElement("ul");
  resultsList.id = "rs-resultsList";

  //Toggle the depot to select
  function depotToggle(location) {
    melbourneButton.setAttribute("class", "button");
    lincolnButton.setAttribute("class", "button");
    location.setAttribute("class", "button selected");
  }

  //Toggle the option to select
  function optionToggle(option) {
    textOptionButton.setAttribute("class", "button");
    xmlOptionButton.setAttribute("class", "button");
    option.setAttribute("class", "button selected");
  }

  //Toggles for each button:
  lincolnButton.onclick = function () {
    depotToggle(lincolnButton);
    depot = "http://aviapp.avidyne.com:8080/";
  };
  melbourneButton.onclick = function () {
    depotToggle(melbourneButton);
    depot = "http://palmtree.avidyne.com:8080/";
  };
  textOptionButton.onclick = function () {
    optionToggle(textOptionButton);
    option = "?ac=160";
  };
  xmlOptionButton.onclick = function () {
    optionToggle(xmlOptionButton);
    option = "?ac=201";
  };

  //Clear Form elements
  clearClButton.onclick = function () {
    var changelistInput = document.getElementById("cl-input");
    changelistInput.value = "";
  };
  clearInButton.onclick = function () {
    var inputArea = document.getElementById("in-inputArea");
    inputArea.value = "";
  };
  clearRsButton.onclick = function () {
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
  openButton.onclick = function () {

    //Set Changelist Entered
    var changelist = document.getElementById("cl-input").value,
    //Build the url using selected options
      xmlUrl = buildUrl(changelist, depot, option);

    window.open(xmlUrl);
  };

  //On translate click collect data and output formatted strings
  translateButton.onclick = function () {
    // Set loop counter and linkValue
    var i = 0,
      linkValue = "",
    //Get results box item
      resultsDiv = document.getElementById("rs-results"),
    //Grab the XML from the input and parse to XML
      inputXML = $.parseXML(document.getElementById("in-inputArea").value),
    //Extract the depotfiles and changelistXML from the XML data
      depotFiles = inputXML.getElementsByTagName("depotfile"),
      perforce = inputXML.getElementsByTagName("perforce"),
      changelistXML = perforce[0].getAttributeNode("args");
    
    //Clear results box
    resultsList.innerHTML = "";
    resultsDiv.innerHTML = "";
    
    //Lopp through depotFiles and pull out the link values
    for (i; i < depotFiles.length; i += 1) {
      linkValue = depotFiles[i].getAttributeNode("value");
      addToResults(linkValue.value, depot, changelistXML.value);
    }
    //Add resultsList to results box
    resultsDiv.appendChild(resultsList);
  };
});






