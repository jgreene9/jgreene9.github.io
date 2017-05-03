// Declarations for HTTP urlString
// values for CC3200 Accell 3200 at work
    var device_id = "5040d1e17ef71c0572ccf9eb9ca133cc";
    var m2xKey = "1249c9e5a902e7141bbf8ffbe1d86905";
    var stream = "gyro_points";
    var StartQueryD = "2017-03-12T00:00:00Z";
    var EndQueryD = "2017-03-12T03:00:00Z ";

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

    function myFunction() {
       
        document.getElementById("username").value = ReturnedJSON.values.length; // just to dispaly how many values are returned
       // if (queryString.values.length > 0) {
           // BuildArrays(queryString); // go to Build Array function 
        }

        
        //document.getElementById("Date_Value").value = queryString.latest_value_at;
//var latest_value = queryString.latest_value_at; // this will be used for start date in query

// instantiate a moment object
  /*var NowMoment = new moment(latest_value);
    // display value of moment object in #displayMoment div
  document.getElementById("Date_Value").value = NowMoment.startOf('day').toISOString();
  
 
    } */

function BuildArrays(){
        
for (var i = 0; i < ReturnedJSON.values.length; i++) {

  // alert("I'll fill inn the array now for: " + ReturnedJSON.values.length + " times");
  // alert("The Temperature value is: " + ReturnedJSON.values[i].value + "degrees");
     Tempvalues[i] = ReturnedJSON.values[i].value;
     TimeStamps[i] = ReturnedJSON.values[i].timestamps;
    //Do something
}

//alert("The length of the temperature array is: " + Tempvalues.length + " items");

} // end of Build Array function

    

function DrawChartJSsample() {

var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: '# of Votes',
            data: Tempvalues,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});

}

function DrawBarChart() {
    var ctx = document.getElementById("myChart"); 
    var myChart = new Chart(ctx, {
    type: 'line',
    data: {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    datasets: [
        {
            label: "My First dataset",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: Tempvalues, // This has been filled in during the build array function
            spanGaps: false,
        }

         
    ]
},

options: {
                responsive: true,
                legend: {
                    position: 'bottom',
                },
                hover: {
                    mode: 'label'
                },
                scales: {
                    xAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'AM Hours'
                            }
                        }],
                    yAxes: [{
                            display: true,
                            ticks: {
                                beginAtZero: false,
                                steps: 10,
                                stepValue: 25,
                                max: 80
                            }
                        }]
                },
                title: {
                    display: true,
                    text: 'Chart.js Line Chart - Legend'
                }
            }
        
    });

}

function DrawGauge() {

var opts = {
  
  staticZones: [
   {strokeStyle: "#F03E3E", min: 0, max: 32}, // Red from 100 to 130
   {strokeStyle: "#FFDD00", min: 32, max: 38}, // Yellow
   {strokeStyle: "#30B32D", min: 38, max: 80}, // Green
   {strokeStyle: "#FFDD00", min: 80, max: 100}, // Yellow
   {strokeStyle: "#F03E3E", min: 100, max: 140}  // Red
],

staticLabels: {
  font: "10px sans-serif",  // Specifies font
  labels: [10, 13, 15, 22, 100, 110],  // Print labels at these values
  color: "#000000",  // Optional: Label text color
  fractionDigits: 0  // Optional: Numerical precision. 0=round off.
},


  angle: 0.0, // The span of the gauge arc, 45 degree for half arc
  lineWidth: 0.3, // The line thickness
  radiusScale: 1, // Relative radius
  pointer: {
    length: 0.6, // // Relative to gauge radius
    strokeWidth: 0.05, // The thickness
    color: '#000000' // Fill color
  },
  limitMax: false,     // If false, the max value of the gauge will be updated if value surpass max
  limitMin: false,     // If true, the min value of the gauge will be fixed unless you set it manually
  colorStart: '#6FADCF',   // Colors
  colorStop: '#8FC0DA',    // just experiment with them
  strokeColor: '#E0E0E0',  // to see which ones work best for you
  generateGradient: true,
  highDpiSupport: true     // High resolution support
};

var target = document.getElementById("gauge"); // your canvas element
var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
gauge.maxValue = 140; // set max gauge value
gauge.setMinValue(0);  // Prefer setter over gauge.minValue = 0
gauge.animationSpeed = 32; // set animation speed (32 is default value)
gauge.set(75); // set actual value



}

function GarageCommand() {

   
document.getElementById("GaragePic").src="img/GarageOpen.png";


}  // end of GarageCommand function

function DoorCommand() {

document.getElementById("DoorPic").src="img/DoorOpened.png";

}