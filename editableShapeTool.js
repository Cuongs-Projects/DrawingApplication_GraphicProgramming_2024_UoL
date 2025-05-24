var isFillBPressed = false;
let tempEST;

//To generate a layer for the red dots of the shape during the editting state.
function ESTSetup(){
	ESTlayer = createGraphics(canvasW, canvasH);
	ESTlayer.background(0,0,0,0);
}

function EdittableST(){
	//set an icon and a name for the object
	this.icon = "./assets/editshapetool.JPG";
	this.name = "editableST";

	//The variable for the three buttons.
	var editB;
	var finishB;
	var fillB;

	//To let the function knows which process its performing.
	var editState = false;

	//To store the majors outline points to form the user's desired shape.
	var currentPoints = [];

	this.draw = function() {
		//To reselect the user's chosen colour after using the Blur Tool or the Gaussian Blur Tool.
		reselectColour();
		ESTSetup();

		//To prevent the shape from being drawn onto the canvas yet.
		botLayer.updatePixels();
		middleLayer.updatePixels();
		topLayer.updatePixels();

		//To identify the user's chosen layer.
		var layer = radioEvent();


		if (mouseIsPressed && !editState){
			//This 'if' statement is disabled if in editing state.
			//To check whether the cursor is on the canvas.
			if(!mouseOnCanvas()){
				return;
			}
			//To log in the position of the cursor when the mouse is pressed.
			currentPoints.push({x:mouseX,y:mouseY});
		}

		//After pressing the 'Edit' button. To allow the user to change the shape's contour.
		if(editState){
			for(var i=0; i<currentPoints.length;i++){
				var editRange = dist(currentPoints[i].x,currentPoints[i].y,mouseX,mouseY);
				if (editRange <= 15){
					if(mouseIsPressed == true){
						currentPoints[i].x = mouseX;
						currentPoints[i].y = mouseY;
					}
				}
			}
		}

		//To un-fill the shape when the 'Fill' button is pressed.
		if (!isFillBPressed){
			botLayer.noFill();
			middleLayer.noFill();
			topLayer.noFill();
		}
		
		if (currentPoints.length > 0){
			if (layer == "BaseLayer"){
				//To fill the shape when the 'Fill' button is pressed.
				if (isFillBPressed){
					botLayer.point(currentPoints[0].x,currentPoints[0].y);
					tempEST = botLayer.get(currentPoints[0].x,currentPoints[0].y);
					botLayer.fill(tempEST);
				}
				//To draw the outline of the shape based on the points inside the currentPoints array.
				botLayer.beginShape();
					for (var i=0;i<currentPoints.length;i++){
						botLayer.strokeWeight(sW);
						botLayer.vertex(currentPoints[i].x,currentPoints[i].y);
					}		
				botLayer.endShape();
			}
			else if (layer == "2ndLayer"){
				if (isFillBPressed){
					middleLayer.point(currentPoints[0].x,currentPoints[0].y);
					tempEST = middleLayer.get(currentPoints[0].x,currentPoints[0].y);
					middleLayer.fill(tempEST);
				}
				middleLayer.beginShape();
					for (var i=0;i<currentPoints.length;i++){
						middleLayer.strokeWeight(sW);
						middleLayer.vertex(currentPoints[i].x,currentPoints[i].y);
					}		
				middleLayer.endShape();
			}
			else if (layer == "3rdLayer"){
				if (isFillBPressed){
					topLayer.point(currentPoints[0].x,currentPoints[0].y);
					tempEST = topLayer.get(currentPoints[0].x,currentPoints[0].y);
					topLayer.fill(tempEST);
				}
				topLayer.beginShape();
					for (var i=0;i<currentPoints.length;i++){
						topLayer.strokeWeight(sW);
						topLayer.vertex(currentPoints[i].x,currentPoints[i].y);
					}		
				topLayer.endShape();
			}
		}

		//To draw the red dots for the editing state. Ino rder for the user to know which are the major outline points.
		if(editState){
			for(var i = 0; i<currentPoints.length;i++){
				drawDotsforEST(i);
			}
		}
	};

	this.unselectTool = function(){
		select(".options").html("");
		//To save the drawn shape onto the canvas when switching to a different tool without saving.
		//Essentially, act as an auto save.
		finishBpressed();
	};

	this.populateOptions = function(){
		console.log("edittableStool selected");
		//To set noFill() on by default.
		noFill();

		//To save the canvas when the tool first load.
		botLayer.loadPixels();
		middleLayer.loadPixels();
		topLayer.loadPixels();

		//To generate the three buttons.
		select(".options").html("<div id='startEditing'></div>&nbsp;<div id='FillTS'></div><br><div id='stopNfinish'></div>");
		editB = createButton("Edit");
		finishB = createButton("Finish");
		fillB = createButton("Fill the shape")
		editB.parent("startEditing");
		finishB.parent("stopNfinish");
		fillB.parent("FillTS")
		editB.mousePressed(editBpressed);
		finishB.mousePressed(finishBpressed);
		fillB.mousePressed(fillBpressed);

		editB.style("display","block");
		finishB.style("display","block");
		fillB.style("display","block");		
	};

	//Edit button
	function editBpressed (){
		print("edit button pressed");
		if (editState){
			editState = false;
			editB.html("Edit");
			
		}
		else{
			editState = true;
			editB.html("Add Vertices");
		}
	}

	//Finish button
	function finishBpressed(){
		//ESTSetup() is called again to clear the canvas off the red dots from the editing state.
		ESTSetup();
		editB.style("display","block");
		finishB.style("display","block");
		//To change the current function state.
		editState = false;

		//To save the canvas
		botLayer.loadPixels();
		middleLayer.loadPixels();
		topLayer.loadPixels();

		//To reset the array for the next shape.
		currentPoints = [];
		editB.html("Edit");
		print("finsihBpress is ran");
	}

	//Fill button
	function fillBpressed(){
		if(isFillBPressed){
			isFillBPressed = false;
			fillB.html("Fill the shape");
		}
		else{
			isFillBPressed = true;
			fillB.html("Un-fill the shape");
		}
	}

	//To make the process of drawing red dots from the editting process neater.
	function drawDotsforEST(i){
		ESTlayer.fill("red");
		ESTlayer.strokeWeight(1);
		ESTlayer.ellipse(currentPoints[i].x,currentPoints[i].y,10);
		ESTlayer.noFill();
		ESTlayer.strokeWeight(sW);
	}
}



