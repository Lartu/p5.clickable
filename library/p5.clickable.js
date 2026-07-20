function p5ClickableAddon(p5, fn, lifecycles) {
	p5.__p5_clickable_registered_clickables = [];

	let previousMousePressed = false;
	let pressedClickable = null;
	let previousHoveredClickable = null;

	let currentHoveredClickable = null;
	let currentMousePressed = false;
	let mousePressedThisFrame = false;
	let mouseReleasedThisFrame = false;

	function __p5ClickableObject() {
		this.x = 0;
		this.y = 0;
		this.width = 100;
		this.height = 100;

		this.locate = function (x, y) {
			this.x = x;
			this.y = y;
		};

		this.resize = function (w, h) {
			this.width = w;
			this.height = h;
		};

		this.register = function () {
			p5.__p5_clickable_registered_clickables.push(this);
		};

		this.onPress = function () {
			updateInteractions();
			return mousePressedThisFrame && pressedClickable === this;
		};

		this.isPressed = function () {
			updateInteractions();
			return currentMousePressed && pressedClickable === this && currentHoveredClickable === this;
		};

		this.onRelease = function () {
			updateInteractions();
			return mouseReleasedThisFrame && pressedClickable === this && currentHoveredClickable === this;
		};

		this.onHoverStart = function () {
			updateInteractions();
			return currentHoveredClickable === this && previousHoveredClickable !== this;
		};

		this.isHovered = function () {
			updateInteractions();
			return currentHoveredClickable === this;
		};

		this.onHoverEnd = function () {
			updateInteractions();
			return previousHoveredClickable === this && currentHoveredClickable !== this;
		};
	}

	fn.createClickable = function () {
		return new __p5ClickableObject();
	};

	function isMouseInside(clickable) {
		return this.mouseX >= clickable.x && this.mouseX < clickable.x + clickable.width && this.mouseY >= clickable.y && this.mouseY < clickable.y + clickable.height;
	}

	function findTopmostHoveredClickable() {
		const clickables = p5.__p5_clickable_registered_clickables;
		// Iterate backwards because the last registered Clickable has the greatest z-order.
		for (let i = clickables.length - 1; i >= 0; i--) {
			if (isMouseInside(clickables[i])) {
				return clickables[i];
			}
		}
		return null;
	}

	function updateInteractions() {
		currentHoveredClickable = findTopmostHoveredClickable();
		currentMousePressed = this.mouseIsPressed && this.mouseButton.left;
		mousePressedThisFrame = currentMousePressed && !previousMousePressed;
		mouseReleasedThisFrame = !currentMousePressed && previousMousePressed;
		if (mousePressedThisFrame) {
			pressedClickable = currentHoveredClickable;
		}
	}

	lifecycles.predraw = function () {
		p5.__p5_clickable_registered_clickables = [];
		currentHoveredClickable = null;
		currentMousePressed = this.mouseIsPressed && this.mouseButton.left;
		mousePressedThisFrame = currentMousePressed && !previousMousePressed;
		mouseReleasedThisFrame = !currentMousePressed && previousMousePressed;
	};

	lifecycles.postdraw = function () {
		updateInteractions();
		previousHoveredClickable = currentHoveredClickable;
		previousMousePressed = currentMousePressed;
		if (mouseReleasedThisFrame) {
			pressedClickable = null;
		}
	};
}

p5.registerAddon(p5ClickableAddon);