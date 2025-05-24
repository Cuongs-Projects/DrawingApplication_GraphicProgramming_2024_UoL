var gridLayer;
var gridType;
var prevGridType = "Nothing";
var dropbox;
var runoncegrid;

//To let the function knows whether any grid is selected
function dropboxSelected(){
    var item = dropbox.value();
    return item;
}

function gridSelection(){
    //Setting up the colour and thickness of the grid.
    gridLayer.strokeWeight(2);
    gridLayer.stroke(0,0,0,200);

    //To let the function knows whether any grid is selected
    gridType = dropboxSelected();

    //To ensure that the clearing of layer and drawing of a new grid.
    if  (gridType == "None"){
        runoncegrid=1;
        //To clear the grid layer.
        gridLayer = createGraphics(canvasContainer.size().width, canvasContainer.size().height);
        gridLayer.background(0,0,0,0);

        for (var i =0;i<runoncegrid;i++){
            image(gridLayer,0,0);
        }
    }
    if  (gridType == "Camera Grid"){
        runoncegrid=0;
        //To clear the grid layer.
        gridLayer = createGraphics(canvasContainer.size().width, canvasContainer.size().height);
        gridLayer.background(0,0,0,0);

        //To draw the grid (onto the grid layer) that will divide the canvas into 9 equal parts.
        for (var i = 1; i <= 2; i++ ){
            gridLayer.line((canvasContainer.size().width / 3 * i)-7, 0, (canvasContainer.size().width / 3 * i)-7, canvasContainer.size().height);
        }
        for (var i = 1; i <= 2; i++ ){
           gridLayer.line(0,canvasContainer.size().height/3*i,canvasContainer.size().width,canvasContainer.size().height/3*i);
        }

        image(gridLayer,0,0);
    }
    if  (gridType == "Line Grid"){
        runoncegrid=0;
        //To set up this grid design
        var boxW = 30;
        var boxH  = 13;
        //To clear the grid layer.
        gridLayer = createGraphics(canvasContainer.size().width, canvasContainer.size().height);
        gridLayer.background(0,0,0,0);

        //To draw the grid (onto the grid layer) that will divide the canvas into many small squares.
        for (var i = 1; i <= boxW; i++ ){
            gridLayer.line((canvasContainer.size().width / boxW * i)-7, 0, (canvasContainer.size().width / boxW * i)-7, canvasContainer.size().height);
        }
        for (var i = 1; i <= boxH; i++ ){
           gridLayer.line(0,canvasContainer.size().height/boxH*i,canvasContainer.size().width,canvasContainer.size().height/boxH*i);
        }

        image(gridLayer,0,0);

    }
};