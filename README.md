<p align="center">
  <img src="https://github.com/Lartu/p5.clickable/blob/master/images/logo_outlined.png">
  <br>
  <img src="https://img.shields.io/badge/license-MIT-red">
  <img src="https://img.shields.io/badge/current_version-2.0-green.svg">
</p>

> [!NOTE]  
> Beware that p5.clickable has been migrated to support p5.js 2.x, and part of its API has changed compared to the p5.js 1.x version.

Welcome! This is **p5.clickable**, a [p5.js](http://p5js.org) 2.x library that lets you create immediate-mode **buttons**. With *p5.clickable*, you can create buttons and define what happens when the user *presses*, *holds*, or *releases* them, as well as when the cursor *enters*, *hovers over*, or *leaves* them.

## :telescope: Preview

Integrating *p5.clickable* buttons into your project is super easy:

```javascript
function start() {
    myButton = createClickable();
}

function draw() {
    myButton.register();
    // ...
    if (myButton.isPressed()) {
        // Do something
    }
}
```

That's it!

## :microscope: Documentation

### Including the p5.clickable Library

To include the *p5.clickable* library in your p5.js project, copy the [p5.clickable.js](library/p5.clickable.js) file into your project directory and then add the line

```html
<script src="path/to/p5.clickable.js"></script>
```

to the HTML file that includes your p5.js script, **after** the line that imports the p5 library but **before** any of your own code or the line that imports your own code.

### Creating a Clickable

**p5.clickable** provides `Clickable` objects that act as buttons (a *Clickable* is simply an interactable area, and it's invisible!). To create a button, just call the `createClickable()` function, like this:

```javascript
myButton = createClickable();
```

By default, *Clickables* are located at `(0, 0)` and have a size of `(100, 100)`. Keep in mind that **p5.clickable does not define what your buttons look like**; it simply implements interactable areas that detect presses, hovers, and similar interactions. These areas are invisible! To style your buttons, draw them yourself in the same spots where your *Clickables* are located!

### Moving a Clickable

To move a *Clickable*, you can change its `x` and `y` properties. You can also use these properties to read the current location of a *Clickable*:

```javascript
myButton.x = 100;
myButton.y = 200;
```

You can also use the `locate(x, y)` method to change the location of a *Clickable*:

```javascript
myButton.locate(100, 200);
```

### Resizing a Clickable

To resize a *Clickable*, you can modify its `width` and `height` properties. You can also use these properties to read the current size of a *Clickable*:

```javascript
myButton.width = 250;
myButton.height = 100;
```

You can also use the `resize(width, height)` function to change the size of a *Clickable*:

```javascript
myButton.resize(250, 100);
```

### Register Interactions

In order to detect when the user interacts with your *Clickables*, you have to `register()` them. Make sure to `register()` all the *Clickables* that you want the user to be able to interact with during the current frame. If a *Clickable* is not registered during a frame, it is treated as if it didn't exist and will not detect any interactions.


```javascript
function draw() {
    // First register interactions
    button1.register();
    button2.register();

    // Then check for interactions
    if (button1.isPressed()) {
        // ...
    }
    if (button2.isPressed())
    {
        // ...
    }
}
```

Interactions must be registered *before* you check for any interactions using the methods listed in the section below.

*Clickables* registered **first** are considered to be **below** *Clickables* registered **later**. This means that if you `register()` *Clickable #1* and then *Clickable #2*, and the two overlap, only *Clickable #2* will detect interactions within the overlapping area.


### Interaction Methods

The *Clickable* class provides six methods that can be used to check whether the user has interacted with the button: `onPress()`, `isPressed()`, `onRelease()`, `onHoverStart()`, `isHovered()`, and `onHoverEnd()`.

`onPress()` returns `true` during the frame in which the user starts pressing the button with the left mouse button:

```javascript
if (myButton.onPress()) {
    // Do something!
}
```

`isPressed()` returns `true` while the left mouse button is being held within the button bounds, as long as the click was initiated within those bounds:

```javascript
if (myButton.isPressed()) {
    // Do something!
}
```

`onRelease()` returns `true` during the frame in which the left mouse button is released over the button, as long as the press was also initiated within the button bounds:

```javascript
if (myButton.onRelease()) {
    // Do something!
}
```

`onHoverStart()` returns `true` during the frame in which the cursor enters the button bounds:

```javascript
if (myButton.onHoverStart()) {
    // Do something!
}
```

`isHovered()` returns `true` while the cursor is inside the button bounds:

```javascript
if (myButton.isHovered()) {
    // Do something!
}
```

`onHoverEnd()` returns `true` during the frame in which the cursor leaves the button bounds:

```javascript
if (myButton.onHoverEnd()) {
    // Do something!
}
```

## :safety_vest: Example

This example draws three buttons: a blue one, a red one and a green one. It then places *Clickable* areas over them and prints different messages when the user interacts with each button:

```javascript
async function setup() {
    createCanvas(200, 200);

    button1 = createClickable();
    button1.resize(100, 50);
    button1.locate(0, 0);

    button2 = createClickable();
    button2.resize(50, 50);
    button2.locate(25, 25);

    button3 = createClickable();
    button3.resize(50, 100);
    button3.locate(0, 0);
}

function draw() {
    // Draw all buttons
    noStroke();
    fill(255, 0, 0);
    rect(0, 0, 100, 50);
    fill(0, 255, 0);
    rect(25, 25, 50, 50);
    fill(0, 0, 255);
    rect(0, 0, 50, 100);

    // Register the buttons
    button1.register();
    button2.register();
    button3.register();

    // Check for interactions
    if(button1.onPress()) print("Button 1 pressed!");
    if(button2.onPress()) print("Button 2 pressed!");
    if(button3.onPress()) print("Button 3 pressed!");
}
```

## :beers: Contributing

If there's a feature you'd like to see in *p5.clickable*, feel free to implement it and submit a pull request. Found something that's broken? Please try to fix it or let me know! Also, feel free to submit issues, bug reports and feature requests.

## :scroll: Licensing  

The *p5.clickable* library is licensed under the MIT License. You can find a copy of the MIT License in this repository.

This repository also includes code from the [p5.js](https://github.com/processing/p5.js) library, which is licensed under the LGPL 2.1 license.
