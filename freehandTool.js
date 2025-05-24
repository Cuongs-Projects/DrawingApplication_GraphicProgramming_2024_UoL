function FreehandTool(){
	//set an icon and a name for the object
	this.icon = "assets/freehand.jpg";
	this.name = "freehand";

	//to smoothly draw we'll draw a line from the previous mouse location
	//to the current mouse location. The following values store
	//the locations from the last frame. They are -1 to start with because
	//we haven't started drawing yet.
	var previousMouseX = -1;
	var previousMouseY = -1;

	this.draw = function(){
		//if the mouse is pressed
		if(mouseIsPressed){
			//To reselect the user's chosen colour after using the Blur Tool or the Gaussian Blur Tool.
			reselectColour();
			if(!mouseOnCanvas()){
				return;
			}
			//check if they previousX and Y are -1. set them to the current
			//mouse X and Y if they are.
			if (previousMouseX == -1){
				previousMouseX = mouseX;
				previousMouseY = mouseY;

				//save the current pixel Array (i edit)
				botLayer.loadPixels();
				middleLayer.loadPixels();
				topLayer.loadPixels();
			}
			//if we already have values for previousX and Y we can draw a line from 
			//there to the current mouse location
			else{
				var layer = radioEvent();
				
				//drawing the lines for freehandTool
				if (layer == "BaseLayer"){
					botLayer.strokeWeight(sW);
					botLayer.line(previousMouseX, previousMouseY, mouseX, mouseY);
					previousMouseX = mouseX;
					previousMouseY = mouseY;
				}
				else if (layer == "2ndLayer"){
					middleLayer.strokeWeight(sW);
					middleLayer.line(previousMouseX, previousMouseY, mouseX, mouseY);
					previousMouseX = mouseX;
					previousMouseY = mouseY;
				}
				else if (layer == "3rdLayer"){
					topLayer.strokeWeight(sW);
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
		}
	};

	this.populateOptions = function(){
		//To display the instructions to start using the drwaing application
		select(".options").html("<div>To start using the application,<br>Please select the desired layer and tool's thickness</div>");
	
	};

	this.unselectTool = function(){
		select(".options").html("");
	};
}