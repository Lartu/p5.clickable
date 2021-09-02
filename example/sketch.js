var canvas;
var click1;
var click2;
var click3;
var clickImg;

function preload(){
  clickImg = loadImage('./logo.png');
}
function setup() {
  createCanvas(400, 400);

  //Create, style and resize clickables.
  click1 = new Clickable();
  click1.locate(20, 20);
  //This function is ran when the clickable is hovered but not pressed.
  click1.onHover = function () {
    this.color = "#AAAAFF";
    this.textColor = "#FFFFFF";
    this.text = "Yay!";
  }
  //This function is ran when the clickable is NOT hovered.
  click1.onOutside = function () {
    this.color = "#EEEEEE";
    this.text = "Hello there!";
    this.textColor = "#000000";
  }
  //This function is ran when the clickable is pressed.
  click1.onPress = function () {
    this.stroke = "#FF0000";
  }
  //This funcion is ran when the cursor was pressed and then
  //rleased inside the clickable. If it was pressed inside and
  //then released outside this won't work.
  click1.onRelease = function () {
    this.x += 50;
  }

  click2 = new Clickable();
  click2.cornerRadius = 0;
  click2.textScaled = true;
  click2.text = "hello";
  click2.locate(60, 60);
  click2.resize(250, 100);
  click2.onOutside = function () {
    this.color = "#FFFFFF";
  }
  click2.onHover = function () {
    this.color = "#AA33AA";
  }
  click2.onPress = function () {
    alert("Hi there!");
  }

  click3 = new Clickable();
  click3.image = clickImg;
  click3.locate(280,250);
  click3.resize(100,100);
  click3.text = "";
  click3.onHover = function () {
    this.color = "#AA33AA";
    this.noTint = false;
    this.tint = "#FF0000";
  }
  click3.onOutside = function () {
    this.color = "#FFFFFF";
    this.noTint = true;
  }

  // image will stretch to fill button by default
  click4 = new Clickable();
  click4.image = clickImg;
  click4.imageScale = 1;
  click4.text = "";
  click4.locate(10, 200);
  click4.resize(120, 90);
  click4.onHover = function () {
    click4.imageScale = 1.1;
  }
  click4.onOutside = function () {
    click4.imageScale = 1;
  }

  // centered and fitted
  click5 = new Clickable();
  click5.image = clickImg;
  click5.fitImage = true; // no stretching!
  click5.imageScale = 1;
  click5.text = "";
  click5.locate(140, 200);
  click5.resize(120, 90);
  click5.onHover = function () {
    click5.imageScale = 1.1;
  }
  click5.onOutside = function () {
    click5.imageScale = 1;
  }
}

function draw() {
  background(255);
  click1.draw();
  click2.draw();
  click3.draw();
  click4.draw();
  click5.draw();
}
