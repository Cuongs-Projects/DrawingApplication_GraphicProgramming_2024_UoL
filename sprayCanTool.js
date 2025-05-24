var points;
var spread;

function SprayCanTool(){
	
	this.name = "sprayCanTool";
	this.icon = "assets/sprayCan.jpg";

	this.draw = function(){
		var r = random(5,10);

		//save the current pixel Array (i edit)
		botLayer.loadPixels();
		middleLayer.loadPixels();
		topLayer.loadPixels();

		//to revert the strokeWeight changes of other tools
		botLayer.strokeWeight(1);
		middleLayer.strokeWeight(1);
		topLayer.strokeWeight(1);
		
		if(mouseIsPressed){
			reselectColour();
			if(!mouseOnCanvas()){
				return;
			}

			var layer = radioEvent();

			if (layer == "BaseLayer"){
				for(var i = 0; i < points; i++){
					botLayer.point(random(mouseX-spread, mouseX + spread), random(mouseY-spread, mouseY+spread));
				}
			}
			else if (layer == "2ndLayer"){
				for(var i = 0; i < points; i++){
					middleLayer.point(random(mouseX-spread, mouseX + spread), random(mouseY-spread, mouseY+spread));
				}
			}
			else if (layer == "3rdLayer"){
				for(var i = 0; i < points; i++){
					topLayer.point(random(mouseX-spread, mouseX + spread), random(mouseY-spread, mouseY+spread));
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
}