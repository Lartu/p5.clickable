# 🖱 p5.clickable
**p5.clickable** is a [p5.js](http://p5js.org) library that lets you create and customize buttons and assign event based behaviours to them. Plain speaking, with **p5.clickable** you can create buttons and define what happens when the user *hovers over*, *clicks*, *releases* or moves their cursor *out* of them.

## Code Example
With **p5.clickable** and just a few lines of code you can get a button up and running. For example, to create a plain button at (20, 20) that when pressed changes color and shows an alert message you just do:
``` 
myButton = new Clickable();     //Create button
myButton.locate(20, 20);        //Position Button
myButton.onPress = function(){  //When myButton is pressed
  this.color = "#AAAAFF";       //Change button color
  alert("Yay!");                //Show an alert message
}
```
Easy as pie!

*(To be finished)*
