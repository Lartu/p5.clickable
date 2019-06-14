var canvas;
var click1;
var click2;

function setup() {
  createCanvas(400, 400);
  
  //Create, style and resize clickables.
  click1 = new Clickable();
  click1.locate(20, 20);
  //This function is ran when the clickable is hovered but not pressed.
  click1.onHover = function(){
	this.color = "#AAAAFF";
	this.textColor = "#FFFFFF";
	this.text = "Yay!";
  }
  //This function is ran when the clickable is NOT hovered.
  click1.onOutside = function(){
	this.color = "#EEEEEE";
	this.text = "Hello there!";
	this.textColor = "#000000";
  }
  //This function is ran when the clickable is pressed.
  click1.onPress = function(){
	  this.stroke = "#FF0000";
  }
  //This funcion is ran when the cursor was pressed and then
  //rleased inside the clickable. If it was pressed inside and
  //then released outside this won't work.
  click1.onRelease = function(){
	  this.x += 50;
  }
  
  click2 = new Clickable();
  click2.cornerRadius = 0;
  click2.locate(60, 60);
  click2.resize(80, 80);
  click2.onOutside = function(){
	  this.color = "#FFFFFF";
  }
  click2.onHover = function(){
	  this.color = "#AA33AA";
  }
  click2.onPress = function(){
	  alert("Hi there!");
  }
}

function draw() {
  background(255);
  click1.draw();
  click2.draw();
}
