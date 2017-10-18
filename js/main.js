// get elements from the html by id and assign to variables so we can
// mess with them later
var title = document.getElementById("title");
var description1 = document.getElementById("description1");
var description2 = document.getElementById("description2");
var description3 = document.getElementById("description3");

(function() {
  // set an eventlistener on the button to listen for a click and call the
  // makeRequest function when it is clicked
  // document.getElementById("ajaxButton").addEventListener("click", makeRequest);
  
  var httpRequest;
  
  // function makeRequest() {
    httpRequest = new XMLHttpRequest();
    
    if (!httpRequest) { // if(!httpRequest) is roughly equal to if(httpRequest == null)
      alert("creating request object failed");
      return false;
    }
    
    // onreadystatechange is a property that defines a callback method
    // when the httprequest's state has changed (usually a response or failed request)
    httpRequest.onreadystatechange = fillInfo;
    
    // the open method on the request object takes two arguments: request type and the URL
    // httpRequest.open("GET", "https://ghibliapi.herokuapp.com/films/58611129-2dbc-4a81-a72f-77ddfc1b1b49");
    httpRequest.open("GET", "http://api.oceandrivers.com/v1.0/getAemetStation/Norwich/lastdata/");

    httpRequest.send();
    
    // now we have to define what happens after the request's state changes
    function fillInfo() {
      var responseContent;
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
          console.log(httpRequest.responseText);
          
          // store our response text in our responseContent variable
          responseContent = httpRequest.responseText;
          var parsedContent = JSON.parse(responseContent);

          
          // title.innerHTML = parsedContent.title;
          description1.innerHTML = "Humidity = " + parsedContent.HUMIDITY;
          description2.innerHTML = "Temperature = " + parsedContent.TEMPERATURE;
          description3.innerHTML = "Pressure = " + parsedContent.PRESSURE;
        }
        else {
         alert("There was a problem with the request: " + httpRequest.status);
        }
      } 
      
    }
    
  // }
})();
