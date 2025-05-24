var bArea;
var blurIsBeingUsed;
var isBlurTcanvasLoaded;
var blurDropbox;

//To identify the current blur setting the user chose
function selectedBlur(){
	var value= blurDropbox.value();
	return value;
}

function BlurTool(){
	
	this.name = "blurTool";
	this.icon = "assets/blurtool.jpg";

	this.draw = function(){
		botLayer.loadPixels();
		middleLayer.loadPixels();
		topLayer.loadPixels();

		//Set up the size of the Blur Tool
		if (sW <=5){
			bArea = 5;
		}
		else {
			bArea = sW;
		}

		//Change the intensity of the blur
		let tempIntensity;
		var pickedBlur = selectedBlur();
		if (pickedBlur == "Light"){
			tempIntensity = 1;
		}
		else if (pickedBlur == "Heavy"){
			tempIntensity = 2;
		};
		//with tempIntensity = 1, the center pixel will 'explode' onto the surrounding pixels within a 3x3 range
		//with tempIntensity = 2, the center pixel will 'explode' onto the surrounding pixels within a 5x5 range
		
		if(mouseIsPressed){
			if(!mouseOnCanvas()){
				return;
			}

			var layer = radioEvent();

			if (layer == "BaseLayer"){
				//The first two for-loop are used to select the pixels to be 'exploded'.
				//This allows the tool to blur everything inside the square cursor outline.
				for (var y = mouseY - (bArea/2) + tempIntensity; y < mouseY + (bArea/2) - tempIntensity; y=y+(tempIntensity*2)+1) { 
					for (var x = mouseX - (bArea/2) + tempIntensity; x < mouseX + (bArea/2) - tempIntensity; x=x+(tempIntensity*2)+1) {
						//Retreive the colour values of the center pixel in the form of an array.
						var pulledPixel = botLayer.get(x,y);
						print("pixel colout value pulled is: "+pulledPixel);

						//To change the colour of the surrounding pixels within the range of 3x3 or 5x5 based on the intensity setting.
						for (var rangeY = -1*tempIntensity; rangeY <= tempIntensity; rangeY++) {
							for (var rangeX = -1*tempIntensity; rangeX <= tempIntensity; rangeX++) {
								var posY = y + rangeY;
								var posX = x + rangeX;
								print("y coord: "+posY);
								print("x corrd: "+posX);
								//Included 'alpha' to prevent the blur effect from interferring the other layers.
								botLayer.stroke(pulledPixel[0],pulledPixel[1],pulledPixel[2],pulledPixel[3]);
								botLayer.strokeWeight(1);
								botLayer.noFill();
								//Replace the colour value of the surrounding pixels
								botLayer.point(posX,posY);
							}
						}
					}
				}
			}
			else if (layer == "2ndLayer"){
				for (var y = mouseY - (bArea/2) + tempIntensity; y < mouseY + (bArea/2) - tempIntensity; y=y+(tempIntensity*2)+1) { 
					for (var x = mouseX - (bArea/2) + tempIntensity; x < mouseX + (bArea/2) - tempIntensity; x=x+(tempIntensity*2)+1) {
						var pulledPixel = middleLayer.get(x,y);
						print("pixel colout value pulled is: "+pulledPixel);

						for (var rangeY = -1*tempIntensity; rangeY <= tempIntensity; rangeY++) {
							for (var rangeX = -1*tempIntensity; rangeX <= tempIntensity; rangeX++) {
								var posY = y + rangeY;
								var posX = x + rangeX;
								print("y coord: "+posY);
								print("x corrd: "+posX);
								middleLayer.stroke(pulledPixel[0],pulledPixel[1],pulledPixel[2],pulledPixel[3]);
								middleLayer.strokeWeight(1);
								middleLayer.noFill();
								middleLayer.point(posX,posY);
							}
						}
					}
				}
			}
			else if (layer == "3rdLayer"){
				for (var y = mouseY - (bArea/2) + tempIntensity; y < mouseY + (bArea/2) - tempIntensity; y=y+(tempIntensity*2)+1) { 
					for (var x = mouseX - (bArea/2) + tempIntensity; x < mouseX + (bArea/2) - tempIntensity; x=x+(tempIntensity*2)+1) {
						var pulledPixel = topLayer.get(x,y);
						print("pixel colout value pulled is: "+pulledPixel);

						for (var rangeY = -1*tempIntensity; rangeY <= tempIntensity; rangeY++) {
							for (var rangeX = -1*tempIntensity; rangeX <= tempIntensity; rangeX++) {
								var posY = y + rangeY;
								var posX = x + rangeX;
								print("y coord: "+posY);
								print("x corrd: "+posX);
								topLayer.stroke(pulledPixel[0],pulledPixel[1],pulledPixel[2],pulledPixel[3]);
								topLayer.strokeWeight(1);
								topLayer.noFill();
								topLayer.point(posX,posY);
							}
						}
					}
				}
			}
		}
		else{
			previousMouseX = -1;
			previousMouseY = -1;
			botLayer.loadPixels();
			middleLayer.loadPixels();
			topLayer.loadPixels();
		}
	};

	this.populateOptions = function(){
		//To show the dropbox so the user can select the intensity of the blur effect
		select(".options").html("<div id='BlurIntensitySelection'>Blur Intensity: </div>");
		
		//To create a dropbox that contain the blur intensity setting
		blurDropbox = createSelect();
		blurDropbox.option("Light");
		blurDropbox.option("Heavy");
		blurDropbox.parent("BlurIntensitySelection");
		blurDropbox.changed(selectedBlur);

		//For the Square outline of the Blur Tool
		blurTLayer = createGraphics(canvasW, canvasH);
		blurTLayer.background(0,0,0,0);
		blurTLayer.loadPixels();


		blurIsBeingUsed = true;
	};

	this.unselectTool = function(){
		select(".options").html("");
		blurIsBeingUsed = false;
	};
}