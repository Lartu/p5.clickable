<p align="center">
  <img src="https://github.com/Lartu/p5.clickable/blob/master/images/logo.png">
  <br>
  <img src="https://img.shields.io/badge/license-MIT-red">
  <img src="https://img.shields.io/badge/current_version-1.2-green.svg">
</p>

Welcome! This is **p5.clickable**, a [p5.js](http://p5js.org) library that lets you create and customize **buttons** and assign event-based behaviours to them. With **p5.clickable** you can create buttons and define what happens when the user *hovers over*, *clicks*, *releases* or *moves* the cursor *outside* of them.

Can't wait? Check [this **live example**](https://lartu.github.io/projects/p5.clickable/example.html) to see some of the things this library can do. Its source code is available in the [example](example) folder of this repository.

>:warning: **Attention Contributors!** It seems that in one poorly checked pull request some of the newly contributes features were deleted. Sorry! I will add them again in the next release alongside all new features.

## :telescope: Code Example
With **p5.clickable** you can get a button up and running with just a few lines of code. For example, to create a plain white button at (20, 20) that when pressed changes color and shows an alert message you do:

```javascript
myButton = new Clickable();     //Create button
myButton.locate(20, 20);        //Position Button
myButton.onPress = function(){  //When myButton is pressed
  this.color = "#AAAAFF";       //Change button color
  alert("Yay!");                //Show an alert message
}
```
Easy as pie!

## :microscope: Documentation

### Including the p5.clickable Library

To include the **p5.clickable** library into your p5.js project, copy the [p5.clickable.js](library/p5.clickable.js) file into
your project directory and then add the line

```html
<script src="path/to/p5.clickable.js"></script>
```

to the HTML file that includes your p5.js script **after** the line that imports the p5 library, but **before** all of your personal code or the line that imports your personal code. Check the [example project HTML file](p5.clickable/example/example.html) for more information.

### Creating a Clickable

**p5.clickable** provides the `Clickable` class (a *Clickable* is just a button). To create a button just instantiate a new Clickable, like this:

```javascript
myButton = new Clickable();
```

The starting position of a Clickable defaults to (0, 0) and its size to (100, 50). 

~~You can also create it at a different location:~~

>:warning: Sorry, this isn't working at the moment. It will be re-added in the next release.

```javascript
myButton = new Clickable(200,300);
```

### Moving a Clickable

To move a Clickable you can change its `x` and `y` properties. You can also use this properties to read the current
location of a Clickable.

```javascript
myButton.x = 100;
myButton.y = 200;
```

You can also use the `locate` method to change the location of a Clickable.

```javascript
myButton.locate(100, 200);
```

### Resizing a Clickable

To resize a Clickable you can modify its `width` and `height` properties. You can also use this properties to read the current size of a Clickable.

```javascript
myButton.width = 250;
myButton.height = 100;
```

You can also use the `resize` method to change the size of a Clickable.

```javascript
myButton.resize(250, 100);
```

### Altering the Appearance of a Clickable

Clickables contain properties that can be changed to alter their appearance:

```javascript
myButton.color = "#FFFFFF";       //Background color of the clickable (hex number as a string)
myButton.cornerRadius = 10;       //Corner radius of the clickable (float)
myButton.strokeWeight = 2;        //Stroke width of the clickable (float)
myButton.stroke = "#000000";      //Border color of the clickable (hex number as a string)
myButton.text = "Press Me";       //Text of the clickable (string)
myButton.textColor = "#000000";   //Color of the text (hex number as a string)
myButton.textSize = 12;           //Size of the text (integer)
myButton.textFont = "sans-serif"; //Font of the text (string)
myButton.textScaled = false;       //Whether to scale the text with the clickable (boolean)
```

### Displaying a Clickable

To **display** a Clickable, you have to call its `draw` method inside the `draw` function of your p5.js script.

```javascript
function draw(){ // This is the p5.js draw function.
  //...
  myButton.draw(); // <- Draw the 'myButton' Clickable
  //...
}
```

This is very important! If you don't call this method your button will not be shown and it also **won't respond
to any events**!

### Clickable Events

The Clickable class provide four methods that are called when the user interacts with a Clickable: `onOutside`, `onHover`, `onPress` and `onRelease`.

`onOutside` is called whenever the cursor is not hovering over the Clickable.

```javascript
myButton.onOutside = function(){
  console.log("Hey! Press me!");
}
```

`onHover` is called whenever the cursor is hovering over a Clickable, but it is not being pressed.

```javascript
myButton.onHover = function(){
  console.log("The cursor is over me!");
}
```

`onPress` is called when the user presses the Clickable.

```javascript
myButton.onPress = function(){
  console.log("I have been pressed!");
}
```

`onRelease` is called when the user clicks a Clickable and then releases the click while within the area of the Clickable.

```javascript
myButton.onRelease = function(){
  console.log("I have been released!");
}
```

## :beers: Contributing
If there's a missing feature you'd like to see on p5.clickable, feel free to write it and submit a pull request. Something broke? Please try to fix it! Also feel free to submit issues, bug reports and requests for future features.

## :scroll: Licensing  
The **p5.clickable** library is licensed under the MIT License. You can find a copy of the MIT License on this repository.

This repository also includes code from the [p5.js](https://github.com/processing/p5.js) library, that is licensed under the LGPL 2.1 license.
