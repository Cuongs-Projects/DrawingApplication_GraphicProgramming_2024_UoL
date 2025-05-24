//Setting up the variables for the dropbox of stamp images.
let catloaf;
let catsuprised;
let dogcute;
let dogmeh;
let dogscared;
var stampDropbox;

//Variables for user's custom stamps
let tempImg;
var tempcustomstamp;
var stampList;

//Used in sketch.js, to preload the stamp tool's images.
function StampToolSetUp(){
	catloaf = loadImage('./assets/cat1.png');
	catsuprised = loadImage('./assets/cat2.png');
	dogcute = loadImage('./assets/dogcute.png');
	dogmeh = loadImage('./assets/dogmeh.png');
	dogscared = loadImage('./assets/dogscared.png');
}

function StampTool(){
	//To set an icon and a name for the object.
	this.name = "StampTool";
	this.icon = "./assets/stamp.jpg";

	//To set up stamping related types of states.
	var stampingState = true;
	var rotatingState = false;
	var objTemp;

	this.draw = function(){

		//To set the size of images.
		var thickness = sliderSelected();
		if (thickness > 0){
			var sW = map(thickness,0,50,0.04,2);
		}
		else if(thickness <= 0){
			var sW = 0.04;
		}
		var stampSize = sW;

		//To set the selected image to a variable.
		tempImg;
		var pickedStamp = selectedStamp();
		for (var i = 0; i<stampList.length;i++){
			if (pickedStamp == stampList[i]){
				tempImg = stampImgList[i];
			}
		}

		//To allow pictures(aka stamps) to retain their aspect ratio.
		let lengthMultiplier = 220;
		if (tempImg.height>lengthMultiplier){
			tempImg.width = tempImg.width*(lengthMultiplier/tempImg.height)
			tempImg.height = lengthMultiplier;
		} else if (tempImg.height<lengthMultiplier){
			tempImg.height = tempImg.height*(lengthMultiplier/tempImg.width)
			tempImg.width = lengthMultiplier;
		}

		//To identify which layer the user chose to draw on.
		var layer = radioEvent();

		if(mouseIsPressed){
			//To check whether the mouse is on the canvas.
			print("mouseIsPressed");
			if(!mouseOnCanvas()){
				return;
			}

			
			if (stampingState){
				//To save the coordinate of where the mouse clicked.
				objTemp ={x:mouseX, y:mouseY,rAngle:0};

				//To save the current canvas.
				botLayer.loadPixels();
				middleLayer.loadPixels();
				topLayer.loadPixels();

				//To change state.
				rotatingState = true;
				stampingState = false;
			}
		}


		if(rotatingState){
			//To continuously remove previous iteration of the stamps when mouse is hold.
			botLayer.updatePixels();
			middleLayer.updatePixels();
			topLayer.updatePixels();
	
			//To decide which direction the stamp will rotate in.
			//Based on the which sides the mouse is positioned off the placement of the stamp,
			//and the distance of the mouse from the stamp.
			var dx = (mouseX - objTemp.x)/2;
			objTemp.rAngle = dx;

			//To reset everything and draw the final iteration of the stamp orientation on the canvas.
			if(mouseIsPressed == false){
				rotatingState = false;
				stampingState = true;
				botLayer.loadPixels();
				middleLayer.loadPixels();
				topLayer.loadPixels();
				mouseIsReleasedForStamp = false;
			}


			//To draw the stamp.
			if (layer == "BaseLayer"){
				botLayer.push();
				botLayer.translate(objTemp.x,objTemp.y);
				//To rotate the stamp to the user's desired angle.
				botLayer.rotate(objTemp.rAngle);
				botLayer.image(tempImg,0,0,tempImg.width*stampSize,tempImg.height*stampSize);
				botLayer.pop();
			}
			else if (layer == "2ndLayer"){
				middleLayer.push();
				middleLayer.translate(objTemp.x,objTemp.y);
				middleLayer.rotate(objTemp.rAngle);
				middleLayer.image(tempImg,0,0,tempImg.width*stampSize,tempImg.height*stampSize);
				middleLayer.pop();
			}
			else if (layer == "3rdLayer"){
				topLayer.push();
				topLayer.translate(objTemp.x,objTemp.y);
				topLayer.rotate(objTemp.rAngle);
				topLayer.image(tempImg,0,0,tempImg.width*stampSize,tempImg.height*stampSize);
				topLayer.pop();
			}

		}

	};

	this.unselectTool = function(){
		select(".options").html("");
		document.getElementById("stampUpload").style.display = "none";
	};

	this.populateOptions = function(){
		console.log("stamp tool selected");
		//To create a stamp dropbox and an instruction about rotating the stamp.
		select(".options").html("<div id='stampSelection'>Stamp</div><br><div>Drag your mouse left or right to rotate</div><br>");
		document.getElementById("stampUpload").style.display = "block";

		stampList = ["CatLoaf","CatSurprised","DogMaid","DogMeh","DogScared"]; // This will allow the stamp images and their name to have the same value of 'i'.
		stampImgList = [catloaf,catsuprised,dogcute,dogmeh,dogscared];		   // Though this can be done with stampList = [["CatLoaf",catloaf],["CatSurprised",catsuprised],["DogMaid",dogcute],["DogMeh",dogmeh],["DogScared",dogscared]];

		//To create a dropbox containing all stamps selection.
		stampDropbox = createSelect();
		for (var i=0; i<stampList.length;i++){
			stampDropbox.option(str(stampList[i]));
		}
		stampDropbox.parent("stampSelection");
		stampDropbox.changed(selectedStamp);		
	};

	//To identify which stamp the user chose.
	function selectedStamp(){
		var value= stampDropbox.value();
		return value;
	}
}