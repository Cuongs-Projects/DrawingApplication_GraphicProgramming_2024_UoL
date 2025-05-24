//og methoid https://www.youtube.com/watch?v=8K2ihr3NC40&ab_channel=dcode
//testinf https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL

document.querySelector("#myFileInput").addEventListener("change", function(){
	console.log(this.files);
	//To give the most recently uploaded image a variable.
	const reader = new FileReader();
	reader.addEventListener(
		"load",
		() => {
		//To push the newly uploaded image into the array containing all images. With loadImage() so the image can be read and draw.
		stampImgList.push(loadImage(reader.result));
		},
		false,
		);
	//For me to check whether the image is properly uploaded.
	reader.readAsDataURL(this.files[0]);

	//To dynamically generate a string to name the newly uploaded picture.
	let customNameStart = 'custom';
	let customNameEnd = stampList.length -4;
	//To push the name of the new stamp into the array containing the name of all stamps.
	//This will allow the newly uploaded stamp and it's name to have the same value of 'i' across the variable.
	stampList.push(str(customNameStart+customNameEnd));

	//To initialise the newly uploaded stamp so it can appear in the stamp list dropbox.
	stampDropbox.option(str(stampList[stampList.length-1]));
	print(stampList);
	print(stampImgList);

	//To let the user knows that their stamp is added.
	alert("stamp added");
});