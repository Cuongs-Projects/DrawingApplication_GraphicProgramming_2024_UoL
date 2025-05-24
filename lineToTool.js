//a tool for drawing straight lines to the screen. Allows the user to preview
//the a line to the current mouse position before drawing the line to the 
//pixel array.
function LineToTool(){
	//set an icon and a name for the object
	this.icon = "assets/lineTo.jpg";
	this.name = "LineTo";

	var startMouseX = -1;
	var startMouseY = -1;
	var drawing = false;

	//draws the line to the screen 
	this.draw = function(){

		//only draw when mouse is clicked
		if(mouseIsPressed){
			//To reselect the user's chosen colour after using the Blur Tool or the Gaussian Blur Tool.
			reselectColour();
			if(!mouseOnCanvas()){
				return;
			}
			//if it's the start of drawing a new line
			if(startMouseX == -1){
				startMouseX = mouseX;
				startMouseY = mouseY;
				drawing = true;
				//save the current pixel Array
				botLayer.loadPixels();
				middleLayer.loadPixels();
				topLayer.loadPixels();
			}

			else{
				//update the screen with the saved pixels to hide any previous
				//line between mouse pressed and released
				botLayer.updatePixels();
				middleLayer.updatePixels();
				topLayer.updatePixels();
				
				var layer = radioEvent();

				//draw the line
				if (layer == "BaseLayer"){
					botLayer.strokeWeight(sW);
					botLayer.line(startMouseX, startMouseY, mouseX, mouseY);
				}
				else if (layer == "2ndLayer"){
					middleLayer.strokeWeight(sW);
					middleLayer.line(startMouseX, startMouseY, mouseX, mouseY);
				}
				else if (layer == "3rdLayer"){
					topLayer.strokeWeight(sW);
					topLayer.line(startMouseX, startMouseY, mouseX, mouseY);
				}
			}

		}

		else if(drawing){
			//save the pixels with the most recent line and reset the
			//drawing bool and start locations
			botLayer.loadPixels();
			middleLayer.loadPixels();
			topLayer.loadPixels();
			drawing = false;
			startMouseX = -1;
			startMouseY = -1;
		}
	};


}
