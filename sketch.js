//global variables that will store the toolbox colour palette
//and the helper functions
var toolbox = null;
var colourP = null;
var helpers = null;

//Thickness helper function related variables
var slider; 
var sW;

//Layers helper function related variables
var radio;
var topLayer;
var middleLayer;
var botLayer;
var backgroundIMG;

//Simplify the calling of the canvas's dimension.
var canvasW;
var canvasH;

function preload() {
	backgroundIMG = loadImage('./assets/whiteBackground.png');

	//drop box to chose a grid
	GridPreload();
    
	//To create a slider to change thickness value
	ThicknessPreload();

	//To create a radio for the user to chose a drawing layer
	LayersPreload();

	//preloading all of the images related to the stamp tool
	StampToolSetUp();
}

function setup() {
	//create a canvas to fill the content div from index.html
	canvasContainer = select('#content');
	canvasW = canvasContainer.size().width;
	canvasH = canvasContainer.size().height;
	var c = createCanvas(canvasW, canvasH);
	c.parent("content");

	//My additional helpers
	LayersSetup();
	GridSetup();
	ESTSetup();

	//create helper functions and the colour palette
	helpers = new HelperFunctions();
	colourP = new ColourPalette();

	//create a toolbox for storing the tools
	toolbox = new Toolbox();

	//add the tools to the toolbox.
	toolbox.addTool(new FreehandTool());
	toolbox.addTool(new LineToTool());
	toolbox.addTool(new SprayCanTool());
	toolbox.addTool(new mirrorDrawTool());

	toolbox.addTool(new StampTool());
	toolbox.addTool(new EdittableST());
	toolbox.addTool(new EraserTool());
	toolbox.addTool(new BlurTool());
	toolbox.addTool(new BlurToolGaussian());

}

//limit the times the layers will be rendered
var drawTimer = false;
var y = 0;


function draw() {
	if (drawTimer){
		if(mouseIsPressed){
			y = 0;
		}

		//to generate the white background image
		image(backgroundIMG,0,0,canvasW, canvasH);	
		print("background placed");

		//call the draw function from the selected tool.
		//hasOwnProperty is a javascript function that tests
		//if an object contains a particular method or property
		//if there isn't a draw method the app will alert the user
		if (toolbox.selectedTool.hasOwnProperty("draw")) {
			toolbox.selectedTool.draw();
		} else {
			alert("it doesn't look like your tool has a draw method!");
		}

		//My helpers
		ThicknessSliderOutput();
		gridSelection();
		layersDraw();

		//The canvas will stop rendering after a while when the mouse is not clicked
		y++;
		print(y);
		if(y == 3){
			drawTimer = false;
		}
		if (drawTimer == false){
			noLoop();
		}
		print("draw running");
	}
	
	//To display the frame rate.
	let fps = frameRate();
	fill(255);
	stroke(0);
	strokeWeight(2);
	text("FPS: " + fps.toFixed(2), 10, height - 10);

	//To display the square cursor during the usage of the Blur Tool and the Gaussian Blur Tool.
	if (blurIsBeingUsed == true){
		image(blurTLayer,0,0);
		blurTLayer.updatePixels();
		blurTLayer.stroke(0,0,0,175);
		blurTLayer.noFill();
		blurTLayer.rect(mouseX-(bArea/2),mouseY-(bArea/2),bArea,bArea);
	}
}

//To change var drawTimer to true.
function mousePressed(){
	drawTimer = true;
	loop();
}
