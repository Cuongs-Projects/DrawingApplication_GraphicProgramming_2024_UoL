//Layers
function LayersSetup(){
	//To create three blank transparent canvas that stack on top of one another.
	topLayer = createGraphics(canvasW, canvasH);
	middleLayer = createGraphics(canvasW, canvasH);
	botLayer = createGraphics(canvasW, canvasH);
	topLayer.background(0,0,0,0);
	middleLayer.background(0,0,0,0);
	botLayer.background(0,0,0,0);

	blurTLayer = createGraphics(canvasW, canvasH);
	blurTLayer.background(0,0,0,0);
	blurTLayer.loadPixels();

	//To make make the rotation of the stamp easier less confusing.
	botLayer.angleMode(DEGREES);
	botLayer.imageMode(CENTER);
	middleLayer.angleMode(DEGREES);
	middleLayer.imageMode(CENTER);
	topLayer.angleMode(DEGREES);
	topLayer.imageMode(CENTER);

	blurTLayer.angleMode(DEGREES);
	blurTLayer.imageMode(CENTER);
}

//To generate a dropdown list containing the layer options.
function LayersPreload(){
	this.radio=createRadio();
	this.radio.option("BaseLayer");
	this.radio.option("2ndLayer");
	this.radio.option("3rdLayer");
	this.radio.parent("radio");
}
//To allow the user to select which layer to draw on.
function radioEvent(){
	var value= radio.value();
	print(value);
	return value;		
}
//To render layers in sketch.js. (To show changes done onto the layers)
function layersDraw(){
	// var layer = radioEvent();
	// if (layer == "BaseLayer"){
		image(botLayer,0,0);
	// }
	// else if (layer == "2ndlayer"){
		image(middleLayer,0,0);
	// }
	// else if (layer == "3rdLayer"){
		image(topLayer,0,0);
	// }
	image(ESTlayer,0,0);
	
}

//To check whether the mouse is on the canvas.
function mouseOnCanvas(){
	if ((mouseX < canvasW && mouseX > 0)&&(mouseY < canvasH && mouseY > 0)){
		return true;
	}
	else{
		return false;
	}
}

//Grid
function GridSetup(){
		//To generate a layer for the grids.
		gridLayer =  createGraphics(canvasW, canvasH);
		gridLayer.background(0,0,0,0);
}
//To generate a dropdown list for the user to pick which type of grid they wants.
function GridPreload(){
	this.dropbox = createSelect();
    this.dropbox.option("None");
    this.dropbox.option("Camera Grid");
    this.dropbox.option("Line Grid");
    this.dropbox.parent("dropbox");
}

//Thickness
function ThicknessPreload(){
	//To create a slider so the user can change their tools' thickness.
	this.slider = createSlider(0,50,0);
    this.slider.parent("slider");
}
function ThicknessSliderOutput(){
	var thickness = sliderSelected();
	if (thickness > 0){
		//For general usage for the tools.
		sW = map(thickness,0,50,2,60);

		//For spraycan.
		spread = map(thickness,0,50,0,60);
		points = map(thickness,0,50,13,240);
	}
	else if(thickness <= 0){
		//For general usage for the tools.
		sW = 2;

		//For spraycan.
		spread = 5;
		points = 8;
	}
}
function sliderSelected(){
	var item = slider.value();
	return item;
}

//to reselect the user's chosen colour
function reselectColour(){
	botLayer.stroke(colourP.selectedColour);
	middleLayer.stroke(colourP.selectedColour);
	topLayer.stroke(colourP.selectedColour);
	botLayer.fill(colourP.selectedColour);
	middleLayer.fill(colourP.selectedColour);
	topLayer.fill(colourP.selectedColour);
}

