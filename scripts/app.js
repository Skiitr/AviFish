// AviFish:
// Application to search Perforce changle lists and return formated document
// link that point to the repository selected and well as specificly the file version
// submitted within the changelist noted.
// Author: Dan Gallagher
window.onload = function() {

  //Collect the DOM button into variables
  var lincolnButton = document.getElementById("dp-lincoln");
  var melbourneButton = document.getElementById("dp-melbourne");
  var runButton = document.getElementById("cl-run");
  var clearClButton = document.getElementById("cl-clear");
  var selectallButton = document.getElementById("rs-selectall");
  var clearRsButton = document.getElementById("rs-clear");
  var textOptionButton = document.getElementById("op-text");
  var clOptionButton = document.getElementById("op-changelist");
  var verOptionButton = document.getElementById("op-version");
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
    fetchUrl += "@md=d&cd=//&c=0Jy&rc=s&pat=01046&is=y@/p4%20describe%20";
    fetchUrl += changelist;
    fetchUrl += "?ac=201";
    return fetchUrl;
  }

  //Set the results to the Results box
  function setResults(data) {
    resultsOutput.value("data");
  }

  //On button click collect data and output parsed data
  runButton.onclick = function() {
    
    //Set Depot Selected
    if (lincolnButton.getAttribute("class") === "button selected") {
      console.log("Lincoln Depot Selected");
      var repository = "http://aviapp.avidyne.com:8080/";
    } else if (melbourneButton.getAttribute("class") === "button selected") {
      console.log("Melbourne Depot Selected");
      var repository = "http://palmtree.avidyne.com:8080/";
    } else {
      console.log("Errrror")
    }
    
    //Set Option Selected
    if (textOptionButton.getAttribute("class") === "button selected") {
      console.log("Text Option Selected");
      var option = "???";
    } else if (clOptionButton.getAttribute("class") === "button selected") {
      console.log("Changelist Links Option Selected");
      var option = "???";
    } else if (verOptionButton.getAttribute("class") === "button selected") {
      console.log("Version Links Option Selected");
      var option = "???";
    } else {
      console.log("Errrror")
    }
    
    //Set Changelist Entered
    if (changelistInput != "") {
      console.log("Changelist Number: " + changelistInput.value);
      var changelist = changelistInput.value;
    } else {
      console.log("Errrror")
    }
    
    
    //run the buildUrl with inputs
    var xmlUrl = buildUrl(changelist, repository, option);
    console.log("The xmlUrl is " + xmlUrl);

    //call the httpGetAsync to fetch the xml information
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        console.log(xmlHttp.responseType);
        setResults(xmlHttp.responseText);
      }
    }
    xmlHttp.open("GET", xmlUrl, true); // true for asynchronous
    xmlHttp.send(null);

    //Parse the xml data for the changed document links

    //Add the proper prefix and sufix to the document links

    //Print the document links to the page
  }
}



