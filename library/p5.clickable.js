//Determines if the mouse was pressed on the previous frame
var cl_mouseWasPressed = false;
//Last hovered button
var cl_lastHovered = null;
//Last pressed button
var cl_lastClicked = null;
//All created buttons
var cl_clickables = [];

//This function is what makes the magic happen and should be ran after
//each draw cycle.
p5.prototype.runGUI = function () {
	for (i = 0; i < cl_clickables.length; ++i) {
		if (cl_lastHovered != cl_clickables[i])
			cl_clickables[i].onOutside();
	}
	if (cl_lastHovered != null) {
		if (cl_lastClicked != cl_lastHovered) {
			cl_lastHovered.onHover();
		}
	}
	if (!cl_mouseWasPressed && cl_lastClicked != null) {
		cl_lastClicked.onPress();
	}
	if (cl_mouseWasPressed && !mouseIsPressed && cl_lastClicked != null) {
		if (cl_lastClicked == cl_lastHovered) {
			cl_lastClicked.onRelease();
		}
		cl_lastClicked = null;
	}
	cl_lastHovered = null;
	cl_mouseWasPressed = mouseIsPressed;
}

p5.prototype.registerMethod('post', p5.prototype.runGUI);

//This function is used to get the bounding size of a
//string of text for use in the 'textScaled' property
function getTextBounds(m, font, size) {
	let txt = document.createElement("span");
	document.body.appendChild(txt);

	txt.style.font = font;
	txt.style.fontSize = size + "px";
	txt.style.height = 'auto';
	txt.style.width = 'auto';
	txt.style.position = 'absolute';
	txt.style.whiteSpace = 'no-wrap';
	txt.innerHTML = m;

	let width = Math.ceil(txt.clientWidth);
	let height = Math.ceil(txt.clientHeight);
	document.body.removeChild(txt);
	return [width, height];
}

//Button Class
function Clickable(x,y) {
	this.x = x;			//X position of the clickable
	this.y = y;			//Y position of the clickable
	this.width = 100;		//Width of the clickable
	this.height = 50;		//Height of the clickable
	this.color = "#FFFFFF";		//Background color of the clickable
	this.cornerRadius = 10;		//Corner radius of the clickable
	this.strokeWeight = 2;		//Stroke width of the clickable
	this.stroke = "#000000";	//Border color of the clickable
	this.text = "Press Me";		//Text of the clickable
	this.textColor = "#000000";	//Color for the text shown
	this.textSize = 12;		//Size for the text shown
	this.textFont = "sans-serif";	//Font for the text shown
	this.textScaled = false;     //Scale the text with the size of the clickable
	this.rectMode = null;		//P5 rectMode but for clickable, null defaults to CORNER


	// image options
	this.image = null; // image object from p5loadimage()
	this.fitImage = false; // when true, image will stretch to fill button
	this.imageScale = 1.0;
	this.tint = null; // tint image using color
	this.noTint = true; // default to disable tinting
	this.filter = null; // filter effect

	// private variables
	let lastRectMode = null;

	this.updateTextSize = function () {
		if (this.textScaled) {
			// actual width & height of button as per this.rectMode is calculated
			let width;
			let height;
			if (this.rectMode == RADIUS) {
				width = this.width * 2;
				height = this.height * 2;
			}
			else if (this.rectMode == CORNERS) {
				width = max(this.x, this.width) - min(this.x, this.width);
				height = max(this.y, this.height) - min(this.y, this.height);
			}
			else {
				width = this.width;
				height = this.height;
			}

			for (let i = height; i > 0; i--) {
				if (getTextBounds(this.text, this.textFont, i)[0] <= width
					&& getTextBounds(this.text, this.textFont, i)[1] <= height) {
					console.log("textbounds: " + getTextBounds(this.text, this.font, i));
					console.log("boxsize: " + width + ", " + height);
					this.textSize = i / 2;
					break;
				}
			}
		}
	}

	this.onHover = function () {
		//This function is ran when the clickable is hovered but not
		//pressed.
	}

	this.onOutside = function () {
		//This function is ran when the clickable is NOT hovered.
	}

	this.onPress = function () {
		//This function is ran when the clickable is pressed.
	}

	this.onRelease = function () {
		//This function is ran when the cursor was pressed and then
		//released inside the clickable. If it was pressed inside and
		//then released outside this won't run.
	}

	this.locate = function (x, y) {
		this.x = x;
		this.y = y;
	}

	this.resize = function (w, h) {
		this.width = w;
		this.height = h;
		this.updateTextSize();
	}

	this.drawImage = function(){
		push();
		imageMode(CENTER);

		let centerX;
		let centerY;
		let buttonWidth;
		let buttonHeight;

		// actual width & height of button & image as per this.rectMode is calculated
		if (this.rectMode == RADIUS) {
			centerX = this.x;
			centerY = this.y;
			buttonWidth = this.width * 2;
			buttonHeight = this.height * 2;
		}
		else if (this.rectMode == CORNERS) {
			centerX = (this.x + this.width) / 2;
			centerY = (this.y + this.height) / 2;
			buttonWidth = max(this.x, this.width) - min(this.x, this.width);
			buttonHeight = max(this.y, this.height) - min(this.y, this.height);
		}
		else if (this.rectMode == CENTER) {
			centerX = this.x;
			centerY = this.y;
			buttonWidth = this.width;
			buttonHeight = this.height;
		}
		else {
			centerX = this.x + this.width / 2;
			centerY = this.y + this.height / 2;
			buttonWidth = this.width;
			buttonHeight = this.height;
		}

		let imgWidth = buttonWidth;
		let imgHeight = buttonHeight;

		if(this.fitImage){
			let imageAspect = this.image.width / this.image.height;
			let buttonAspect = buttonWidth / buttonHeight;

			if(imageAspect > buttonAspect){ // image is wider than button
				imgHeight = buttonHeight * (buttonAspect / imageAspect);
			}
			else{
				imgWidth = buttonWidth * (imageAspect / buttonAspect);
			}
		}
		
		image(this.image, centerX, centerY, imgWidth * this.imageScale, imgHeight * this.imageScale);

		if(this.tint && !this.noTint){
			tint(this.tint)
		} else {
			noTint();
		}
		if(this.filter){
			filter(this.filter);
		}
		pop();
	}

	this.draw = function () {
		if (this.rectMode == null) this.rectMode = CORNER;
		push();
		rectMode(this.rectMode);
		fill(this.color);
		stroke(this.stroke);
		strokeWeight(this.strokeWeight);
		rect(this.x, this.y, this.width, this.height, this.cornerRadius);
		fill(this.textColor);
		noStroke();
		if(this.image){
			this.drawImage();
		}
		if (this.rectMode != lastRectMode) {
			this.updateTextSize();
			lastRectMode = this.rectMode;	
		}
		textAlign(CENTER, CENTER);
		textSize(this.textSize);
		textFont(this.textFont);

		switch (this.rectMode) {
			case CORNER:
				text(this.text, this.x + this.width / 2, this.y + this.height / 2);
				if (mouseX >= this.x && mouseY >= this.y
					&& mouseX < this.x + this.width && mouseY < this.y + this.height) {
					cl_lastHovered = this;
					if (mouseIsPressed && !cl_mouseWasPressed)
						cl_lastClicked = this;
				}
				break;

			case CORNERS:
				text(this.text, (this.x + this.width) / 2, (this.y + this.height) / 2);

				let xLow = min(this.x, this.width);
				let xHigh = max(this.x, this.width);
				let yLow = min(this.y, this.height);
				let yHigh = max(this.y, this.height);
				if (mouseX >= xLow && mouseY >= yLow
					&& mouseX < xHigh && mouseY < yHigh) {
					cl_lastHovered = this;
					if (mouseIsPressed && !cl_mouseWasPressed)
						cl_lastClicked = this;
				}
				break;

			case CENTER:
				text(this.text, this.x, this.y);
				if (mouseX >= this.x - this.width / 2 && mouseY >= this.y - this.height / 2
					&& mouseX < this.x + this.width / 2 && mouseY < this.y + this.height / 2) {
					cl_lastHovered = this;
					if (mouseIsPressed && !cl_mouseWasPressed)
						cl_lastClicked = this;
				}
				break;

			case RADIUS:
				text(this.text, this.x, this.y);
				if (mouseX >= this.x - this.width && mouseY >= this.y - this.height
					&& mouseX < this.x + this.width && mouseY < this.y + this.height) {
					cl_lastHovered = this;
					if (mouseIsPressed && !cl_mouseWasPressed)
						cl_lastClicked = this;
				}
				
				break;
		
			default:
				break;
		}
		pop();
	}

	cl_clickables.push(this);
}
