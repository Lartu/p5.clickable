<p align="center">
  <img src="https://github.com/Lartu/p5.clickable/blob/master/images/logo_outlined.png">
  <br>
  <img src="https://img.shields.io/badge/license-MIT-red">
  <img src="https://img.shields.io/badge/current_version-2.0-green.svg">
</p>

Welcome! This is **p5.clickable**, a [p5.js](http://p5js.org) 2.x library that lets you create immediate-mode **buttons**. With *p5.clickable*, you can create buttons and define what happens when the user *presses*, *holds*, or *releases* them, as well as when the cursor *enters*, *hovers over*, or *leaves* them.

Can't wait? Check out [this **live example**](https://lartu.github.io/p5.clickable/example/example.html) to see some of the things this library can do. Its source code is available in the [example](example) folder of this repository.

## :telescope: Code Example

Integrating *p5.clickable* buttons into your project is super easy:

```javascript
function start() {
    // ...
    myButton = createClickable();
    // ...
}

function draw() {
    // ...
    if (myButton.isPressed()) {
        // Do something
    }
    // ...
}
```

That's it!

## :microscope: Documentation

### Including the p5.clickable Library

To include the *p5.clickable* library in your p5.js project, copy the [p5.clickable.js](library/p5.clickable.js) file into your project directory and then add the line

```html
<script src="path/to/p5.clickable.js"></script>
```

to the HTML file that includes your p5.js script, **after** the line that imports the p5 library but **before** any of your own code or the line that imports your own code. Check the [example project HTML file](p5.clickable/example/example.html) for more information.

### Creating a Clickable

**p5.clickable** provides the `Clickable` class (a *Clickable* is simply an interactable area, and it's invisible!). To create a button, just instantiate a new *Clickable*, like this:

```javascript
myButton = new Clickable();
```

By default, *Clickables* are located at `(0, 0)` and have a size of `(100, 50)`. **p5.clickable does not define what your buttons look like**; it simply implements interactable areas that detect presses, hovers, and similar interactions. To style your buttons, draw them yourself in the same areas where your *Clickables* are located!

### Moving a Clickable

To move a *Clickable*, you can change its `x` and `y` properties. You can also use these properties to read the current location of a *Clickable*:

```javascript
myButton.x = 100;
myButton.y = 200;
```

You can also use the `locate` method to change the location of a *Clickable*:

```javascript
myButton.locate(100, 200);
```

### Resizing a Clickable

To resize a *Clickable*, you can modify its `width` and `height` properties. You can also use these properties to read the current size of a *Clickable*:

```javascript
myButton.width = 250;
myButton.height = 100;
```

You can also use the `resize` function to change the size of a *Clickable*:

```javascript
myButton.resize(250, 100);
```

### Interaction Methods

The *Clickable* class provides six methods that can be used to check whether the user has interacted with the button: `onPress`, `isPressed`, `onRelease`, `onHoverStart`, `isHovered`, and `onHoverEnd`.

`onPress` returns `true` during the frame in which the user starts pressing the button with the left mouse button:

```javascript
if (myButton.onPress()) {
    // Do something!
}
```

`isPressed` returns `true` while the left mouse button is being held within the button bounds, as long as the click was initiated within those bounds:

```javascript
if (myButton.isPressed()) {
    // Do something!
}
```

`onRelease` returns `true` during the frame in which the left mouse button is released over the button, as long as the press was also initiated within the button bounds:

```javascript
if (myButton.onRelease()) {
    // Do something!
}
```

`onHoverStart` returns `true` during the frame in which the cursor enters the button bounds:

```javascript
if (myButton.onHoverStart()) {
    // Do something!
}
```

`isHovered` returns `true` while the cursor is inside the button bounds:

```javascript
if (myButton.isHovered()) {
    // Do something!
}
```

`onHoverEnd` returns `true` during the frame in which the cursor leaves the button bounds:

```javascript
if (myButton.onHoverEnd()) {
    // Do something!
}
```

### Clickable Z-Order

*Clickables* can overlap each other, so if you hover your mouse over a *Clickable* that is on top of another *Clickable*, only the topmost *Clickable* will be triggered! The order in which *Clickables* are processed is called *z-order*. *Clickables* with a greater *z-order* are placed **above** *Clickables* with a lower *z-order*, meaning they take priority when their areas overlap.

To set the *z-order* of a clickable, use the `setZ` method:

```javascript
myButton.setZ(10);
```

## :beers: Contributing

If there's a feature you'd like to see in *p5.clickable*, feel free to implement it and submit a pull request. Found something that's broken? Please try to fix it or let me know! Also, feel free to submit issues, bug reports and feature requests.

## :scroll: Licensing  

The *p5.clickable* library is licensed under the MIT License. You can find a copy of the MIT License in this repository.

This repository also includes code from the [p5.js](https://github.com/processing/p5.js) library, which is licensed under the LGPL 2.1 license.
