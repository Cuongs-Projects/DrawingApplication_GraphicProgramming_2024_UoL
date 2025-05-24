function EraserTool(){
	//set an icon and a name for the object
	this.icon = "assets/eraser.jpg";
	this.name = "eraser";

	//To erase a section of the canvas by drawing a line from the previous mouse location to the current mouse location. 
	//The following values store the locations from the last frame. They are -1 to start with because we haven't started drawing yet.
	//Works the same way as the Free Hand Tool.
	var previousMouseX = -1;
	var previousMouseY = -1;


	this.draw = function(){
		//To check if the mouse is pressed
		if(mouseIsPressed){
			if(!mouseOnCanvas()){
				return;
			}
			//To check if they previousX and Y are -1. set them to the current
			//mouse X and Y if they are.
			if (previousMouseX == -1){
				previousMouseX = mouseX;
				previousMouseY = mouseY;
				botLayer.loadPixels();
				middleLayer.loadPixels();
				topLayer.loadPixels();
			}
			//if we already have values for previousX and Y we can draw a line from 
			//there to the current mouse location
			else{
				var layer = radioEvent();
				
				//To 'erase' drawings
				if (layer == "BaseLayer"){
					botLayer.strokeWeight(sW);
					botLayer.blendMode(REMOVE);
					botLayer.line(previousMouseX, previousMouseY, mouseX, mouseY);
					previousMouseX = mouseX;
					previousMouseY = mouseY;
				}
				else if (layer == "2ndLayer"){
					middleLayer.strokeWeight(sW);
					middleLayer.blendMode(REMOVE);
					middleLayer.line(previousMouseX, previousMouseY, mouseX, mouseY);
					previousMouseX = mouseX;
					previousMouseY = mouseY;
				}
				else if (layer == "3rdLayer"){
					topLayer.strokeWeight(sW);
					topLayer.blendMode(REMOVE);
					topLayer.line(previousMouseX, previousMouseY, mouseX, mouseY);
					previousMouseX = mouseX;
					previousMouseY = mouseY;
				}
			}
		}
		//if the user has released the mouse we want to set the previousMouse values 
		//back to -1.
		else{
			previousMouseX = -1;
			previousMouseY = -1;
			botLayer.loadPixels();
			middleLayer.loadPixels();
			topLayer.loadPixels();
			botLayer.blendMode(BLEND);
			middleLayer.blendMode(BLEND);
			topLayer.blendMode(BLEND);
		}
	
	};
}