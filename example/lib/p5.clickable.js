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
p5.prototype.runGUI = function(){
	for(i = 0; i < cl_clickables.length; ++i){
		if(cl_lastHovered != cl_clickables[i])
			cl_clickables[i].onOutside();
	}
	if(cl_lastHovered != null){
		if(cl_lastClicked != cl_lastHovered){
			cl_lastHovered.onHover();
		}
	}
	if(!cl_mouseWasPressed && cl_lastClicked != null){
		cl_lastClicked.onPress();
	}
	if(cl_mouseWasPressed && !mouseIsPressed && cl_lastClicked != null){
		if(cl_lastClicked == cl_lastHovered){
			cl_lastClicked.onRelease();
		}
		cl_lastClicked = null;
	}
	cl_lastHovered = null;
	cl_mouseWasPressed = mouseIsPressed;
}

p5.prototype.registerMethod('post', p5.prototype.runGUI);

//Button Class
function Clickable(){
	this.x = 0;			//X position of the clickable
	this.y = 0;			//Y position of the clickable
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
		textSize(this.textSize);
		textFont(this.textFont);
		text(this.text, this.x+1, this.y+1, this.width, this.height);
		if(mouseX >= this.x && mouseY >= this.y 
		   && mouseX < this.x+this.width && mouseY < this.y+this.height){
			cl_lastHovered = this;
			if(mouseIsPressed && !cl_mouseWasPressed)
				cl_lastClicked = this;
		}
	}
	
	cl_clickables.push(this);
}
