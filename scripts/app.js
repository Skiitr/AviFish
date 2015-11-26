// AviFish:
// Application to search Perforce changle lists and return formated document
// link that point to the repository selected and well as specificly the file version
// submitted within the changelist noted.
// Author: Dan Gallagher

//Build the link to fetch
function buildUrl(changeList, repository) {
  var fetchUrl = repository;
  fetchUrl += "@md=d&cd=//&c=0Jy&rc=s&pat=01046&is=y@/p4%20describe%20";
  fetchUrl += changeList;
  fetchUrl += "?ac=201";
  return fetchUrl;
}

//On button click collect data and output parsed data
document.getElementById("submitButton").onclick = function() {
  
  //get the chagelist number submitted
  var changeList = document.getElementById("changeList").value;
  console.log("The changeList is " + changeList);
  
  //get the repository selected
  var repository = document.getElementById("repository").value;
  console.log("The repository is " + repository);
  
  //run the buildUrl with inputs
  var xmlUrl = buildUrl(changeList, repository);
  console.log("The xmlUrl is " + xmlUrl);

  //call the httpGetAsync to fetch the xml information
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      console.log(xmlHttp.responseType);
    }
  }
  xmlHttp.open("GET", xmlUrl, true); // true for asynchronous
  xmlHttp.send(null);

  //Parse the xml data for the changed document links

  //Add the proper prefix and sufix to the document links

  //Print the document links to the page
}



