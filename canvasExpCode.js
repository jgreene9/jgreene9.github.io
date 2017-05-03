function drawBar(arrayX) {
       
    var vals = arrayX;
    
    // This section draws on Canvas 1

    // draw mask
    var m = document.getElementById("myCanvas");
    var ctx = m.getContext("2d");
    ctx.fillStyle = "#FFFACD"; // this light yellow
    ctx.fillRect(0, 0, 435, 70);
    ctx.fillStyle = "#DCDCDC"; // Light grey is #DCDCDC
    ctx.fillRect(0, 70, 435, 50); // draw light grey box
    
    var xCoordInt = 20;
    var yCoordInt = 10;
    var fillColor = "blue";
    var fillIndicator;
    var motValue;

    for (i = 0; i < 79; i++) {

        if (vals[i] == "0") // only used for sample to change colors
            fillColor = "#0000FF"; // LIME GREEN
        else if (vals[i] == "1") // only used for sample to change colors
            fillColor = "#00FF00";// BLUE
        else
            fillColor = "black";

        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        ctx.fillStyle = fillColor;
        ctx.fillRect(xCoordInt, yCoordInt, 5, 20); // 79 boxes 5 wide, 15 high = 395 pixels toltal wide
        ctx.lineWidth = .5;
        ctx.strokeStyle = "black";
        ctx.strokeRect(xCoordInt, yCoordInt, 5, 20);
        xCoordInt = xCoordInt + 5;
    }
    // end of script to create AM bar


    // create bar for PM values

    var xCoordInt = 50;
    var yCoordInt = 80;
    var fillColor = "blue";
    var fillIndicator;
    var motValue;

    for (i = 0; i < 12; i++) {

        if (i % 2 == 0) // only used for sample to change colors
            fillColor = "green";
        else
            fillColor = "red";


        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        ctx.fillStyle = fillColor;
        ctx.fillRect(xCoordInt, yCoordInt, 35, 35);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "black";  
        ctx.strokeRect(xCoordInt, yCoordInt, 35, 35);
        xCoordInt = xCoordInt + 35;
    }
    // end of script to create PM bar


    // add notation in graph
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.font = "30px Arial";
    ctx.fillText(chrtName, 110, 30);



}



