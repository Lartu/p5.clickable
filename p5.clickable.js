//Determines if the mouse was pressed on the previous frame
var mouseWasPressed = false;
//Last hovered button
var lastHovered = null;
//Last pressed button
var lastClicked = null;
//All created buttons
var clickables = [];

//This function is what makes the magic happen and should be ran after
//each draw cycle.
function runGUI(){
	for(i = 0; i < clickables.length; ++i){
		if(lastHovered != clickables[i])
			clickables[i].onOutside();
	}
	if(lastHovered != null){
		if(lastClicked != lastHovered){
			lastHovered.onHover();
		}
	}
	if(!mouseWasPressed && lastClicked != null){
		lastClicked.onPress();
	}
	if(mouseWasPressed && !mouseIsPressed && lastClicked != null){
		if(lastClicked == lastHovered){
			lastClicked.onRelease();
		}
		lastClicked = null;
	}
	lastHovered = null;
	mouseWasPressed = mouseIsPressed;
}

//Button Class
function Clickable(){
	this.x = 0;						//X position of the clickable
	this.y = 0;						//Y position of the clickable
	this.width = 100;				//Width of the clickable
	this.height = 50;				//Height of the clickable
	this.color = "#FFFFFF";			//Background color of the clickable
	this.cornerRadius = 10;			//Corner radius of the clickable
	this.strokeWeight = 2;			//Stroke width of the clickable
	this.stroke = "#000000";		//Border color of the clickable
	this.text = "Press Me";			//Text of the clickable
	this.textColor = "#000000";		//Color for the text shown
	
	this.onHover = function(){
		//This function is ran when the clickable is hovered but not
		//pressed.
	}
	
	this.onOutside = function(){
		//This function is ran when the clickable is NOT hovered.
	}
	
	this.onPress = function(){
		//This fucking is ran when the clickable is pressed.
	}
	
	this.onRelease = function(){
		//This funcion is ran when the cursor was pressed and then
		//released inside the clickable. If it was pressed inside and
		//then released outside this won't work.
	}
	
	this.locate = function(x, y){
		this.x = x;
		this.y = y;
	}
	
	this.resize = function(w, h){
		this.width = w;
		this.height = h;
	}
	
	this.draw = function(){
		fill(this.color);
		stroke(this.stroke);
		strokeWeight(this.strokeWeight);
		rect(this.x, this.y, this.width, this.height, this.cornerRadius);
		fill(this.textColor);
		noStroke();
		textAlign(CENTER, CENTER);
		text(this.text, this.x+1, this.y+1, this.width, this.height);
		if(mouseX >= this.x && mouseY >= this.y 
		   && mouseX < this.x+this.width && mouseY < this.y+this.height){
			lastHovered = this;
			if(mouseIsPressed && !mouseWasPressed)
				lastClicked = this;
		}
	}
	
	clickables.push(this);
}
