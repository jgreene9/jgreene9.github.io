// Declarations for HTTP urlString
// values for feather_door device on M2X
    var device_id = "f5d94740ca1bf9da17a64bb330668d9f";
    var m2xKey = "5610e7b05bb7d017b99f00249ac31401";
    var stream = "Command";
    

    // Declaration for building array to construct DrawChartJSsample
    var Tempvalues = [];
    var TimeStamps = [];
    var ReturnCount = 0;

    // Returned value from AJAX calls
    var ReturnedJSON;

    // Toggle image of garage door icon
    var GarDoorStat = 0;

function getM2Xvalues() {    
    var urlString = "http://api-m2x.att.com/v2/devices/" + device_id + "/streams/" + stream + "/values.json?start=" + StartQueryD + "&end=" + EndQueryD;
    var xhr = new XMLHttpRequest();

// This is code for the event that detects when readtstate changes property as HTTP is exchanged
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            ReturnedJSON = JSON.parse(xhr.responseText); //takes JSON string (reponseText)and converts into JSON object called queryString
            myFunction(ReturnedJSON); // when state changes you know it has returned, then starts doing something with it
        }       
    }; // end of onreadystaatchange event handler

    // open the connection and set HTTP header values
    xhr.open('GET', urlString, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("X-M2X-KEY", m2xKey);
    xhr.send();//the HTTP request is actually send out to the network
}


function PUT_M2X_values(open_close) {    
    var urlString = "http://api-m2x.att.com/v2/devices/" + device_id + "/streams/" + stream + "/value";
    // Setting up JSON payload to PUT to cloud service
    var data = {};
    data.value = open_close;
    var json = JSON.stringify(data);

    var xhr = new XMLHttpRequest(); // creating a Http object
    // open the connection and set HTTP header values
    xhr.open('PUT', urlString, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("X-M2X-KEY", m2xKey);


// This is code for the event that detects when readtstate changes property as HTTP is exchanged
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 202) {
            ReturnedJSON = JSON.parse(xhr.responseText); //takes JSON string (reponseText)and converts into JSON object called queryString
           // myFunction(ReturnedJSON); // when state changes you know it has returned, then starts doing something with it
        }       
    }; // end of onreadystaatchange event handler

    
    xhr.send(json);//the HTTP request is actually send out to the network
}

function Close_GarageCommand() {   
document.getElementById("GaragePic").src="img/GarageClosed.png";
PUT_M2X_values(0); // run the PUT function and pass #0 to webservice
}  // end of Close_GarageCommand function

function Open_GarageCommand() {   
document.getElementById("GaragePic").src="img/GarageOpen.png";
PUT_M2X_values(1); // run the PUT function and pass #1 to webservice
}  // end of Open_GarageCommand function

// new function as a test get as this page loads
function Get_DoorStatus_OnLoad() {   
document.getElementById("GaragePic").src="img/GarageOpen.png";
getM2Xvalues(); // run the GET function
}  // end of Open_GarageCommand function

function Test_Send_Success(){

} // end of Test_Send_Success

function DoorCommand() {

document.getElementById("DoorPic").src="img/DoorOpened.png";
}

////////////// test onloads page
  
  function getM2Xvalues_Temperature() {
    // values for CC3200 Accell 3200 at work

    var device_id = "5040d1e17ef71c0572ccf9eb9ca133cc";
    var m2xKey = "1249c9e5a902e7141bbf8ffbe1d86905";
    var stream = "gyro_points";
    var urlString = "http://api-m2x.att.com/v2/devices/" + device_id + "/streams/" + stream;

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var queryString = JSON.parse(xhr.responseText);
            myFunction(queryString);
        }
       
    };

    
    xhr.open('GET', urlString, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("X-M2X-KEY", m2xKey);
    xhr.send();


    function myFunction(queryString) {

       // if using jquery $('#Temp').text(queryString.value);
        document.getElementById("txb_Temperature").value = queryString.value;

    }


} // end of getM2XvaluesTemperature function