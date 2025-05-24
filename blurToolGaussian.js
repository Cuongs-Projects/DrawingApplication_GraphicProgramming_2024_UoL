let totalRed;
let totalGreen;
let totalBlue;
let totalAlpha;

var bArea;
var blurIsBeingUsed;
var isBlurTcanvasLoaded;

function BlurToolGaussian(){
	
	this.name = "blurToolGaussian";
	this.icon = "assets/blurtoolgaussian.jpg";
	//Setting up a kernel will allow the gaussian blur effect to be more stronger at the center of the square cursor.
	var v = float(1.0 / 16.0);
	var kernel = [[1,2,1],
				  [2,4,2],
				  [1,2,1]];

	this.draw = function(){
		botLayer.loadPixels();
		middleLayer.loadPixels();
		topLayer.loadPixels();

		//Set up the size of the Gaussian Blur Tool.
		if (sW <=10){
			bArea = 10;
		}
		else {
			bArea = sW;
		}

		
		if(mouseIsPressed){
			if(!mouseOnCanvas()){
				return;
			}
			var layer = radioEvent();
			if (layer == "BaseLayer"){
				//Similar to the Blur Tool, the first two for-loop are used to traverse to all of the pixels inside the square cursor.
				//But instead of 'exploding', every pixels' colour values will be averaged within the 3x3 range of the center pixel and applied only to the center pixel.
				for (var y = mouseY - (bArea/2) + 1; y < mouseY + (bArea/2) - 1; y++) { 
					for (var x = mouseX - (bArea/2) + 1; x < mouseX + (bArea/2) - 1; x++) {
						//Resetting the total colour values everytime shift to apply the averaged colour values of the next pixel.
						totalRed = 0;
						totalGreen = 0;
						totalBlue = 0;
						totalAlpha = 0;
						for (var rangeY = -1; rangeY <= 1; rangeY++) {
							for (var rangeX = -1; rangeX <= 1; rangeX++) {
								//To calculate the total colour values in four categories of Red, Green, Blue and Alpha, within the range of 3x3.
								var posY = y + rangeY;
								var posX = x + rangeX;
								print("y coord: "+posY);
								print("x corrd: "+posX);
								//To retrieve the colour values of a pixel in the form of an array.
								var pulledPixel = botLayer.get(posX,posY);
								totalRed = totalRed + (v*kernel[rangeY+1][rangeX+1] * pulledPixel[0]);
								totalGreen = totalGreen + (v*kernel[rangeY+1][rangeX+1] * pulledPixel[1]);
								totalBlue = totalBlue + (v*kernel[rangeY+1][rangeX+1] * pulledPixel[2]);
								totalAlpha = totalAlpha + (1/9 * pulledPixel[3]);
							}
						}
						//The averaged colour value will be applied to the center pixel.
						botLayer.stroke(totalRed,totalGreen,totalBlue,totalAlpha);
						botLayer.strokeWeight(1);
						botLayer.noFill();
						botLayer.point(x,y);
					}
				}
			}
			else if (layer == "2ndLayer"){
				for (var y = mouseY - (bArea/2) + 1; y < mouseY + (bArea/2) - 1; y++) { 
					for (var x = mouseX - (bArea/2) + 1; x < mouseX + (bArea/2) - 1; x++) {
						totalRed = 0;
						totalGreen = 0;
						totalBlue = 0;
						totalAlpha = 0;
						for (var rangeY = -1; rangeY <= 1; rangeY++) {
							for (var rangeX = -1; rangeX <= 1; rangeX++) {
								
								var posY = y + rangeY;
								var posX = x + rangeX;
								print("y coord: "+posY);
								print("x corrd: "+posX);
								var pulledPixel = middleLayer.get(posX,posY);
								totalRed = totalRed + (v*kernel[rangeY+1][rangeX+1] * pulledPixel[0]);
								totalGreen = totalGreen + (v*kernel[rangeY+1][rangeX+1] * pulledPixel[1]);
								totalBlue = totalBlue + (v*kernel[rangeY+1][rangeX+1] * pulledPixel[2]);
								totalAlpha = totalAlpha + (1/9 * pulledPixel[3]);
							}
						}

						middleLayer.stroke(totalRed,totalGreen,totalBlue,totalAlpha);
						middleLayer.strokeWeight(1);
						middleLayer.noFill();
						middleLayer.point(x,y);
					}
				}
			}
			else if (layer == "3rdLayer"){
				for (var y = mouseY - (bArea/2) + 1; y < mouseY + (bArea/2) - 1; y++) { 
					for (var x = mouseX - (bArea/2) + 1; x < mouseX + (bArea/2) - 1; x++) {
						totalRed = 0;
						totalGreen = 0;
						totalBlue = 0;
						totalAlpha = 0;
						for (var rangeY = -1; rangeY <= 1; rangeY++) {
							for (var rangeX = -1; rangeX <= 1; rangeX++) {
									
									var posY = y + rangeY;
									var posX = x + rangeX;
									print("y coord: "+posY);
									print("x corrd: "+posX);
									var pulledPixel = topLayer.get(posX,posY);
									totalRed = totalRed + (v*kernel[rangeY+1][rangeX+1] * pulledPixel[0]);
									totalGreen = totalGreen + (v*kernel[rangeY+1][rangeX+1] * pulledPixel[1]);
									totalBlue = totalBlue + (v*kernel[rangeY+1][rangeX+1] * pulledPixel[2]);
									totalAlpha = totalAlpha + (1/9 * pulledPixel[3]);
							}
						}

						topLayer.stroke(totalRed,totalGreen,totalBlue,totalAlpha);
						topLayer.strokeWeight(1);
						topLayer.noFill();
						topLayer.point(x,y);
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
		//To display the disclaimer regarding the usage of the Gaussian Blur Tool.
		select(".options").html("<div id='BlurGaussianInstructions'>This tool takes a while to do its job. Please be patient!</div>");

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
