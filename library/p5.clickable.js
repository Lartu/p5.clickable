var _p5_clickable_clickables = [];

function Clickable() {
	this.x = 0;
	this.y = 0;
	this.width = 100;
	this.height = 50;
	this.__zorder = 0;

	this.locate = function (x, y) {
		this.x = x;
		this.y = y;
	}

	this.resize = function (w, h) {
		this.width = w;
		this.height = h;
	}

	this.setZ = function (zorder) {
		this.__zorder = zorder;
	}

	this.onPress = function () {
	}

	this.isPressed = function () {
	}

	this.onRelease = function () {
	}

	this.onHoverStart = function () {
	}

	this.isHovered = function () {
	}

	this.onHoverEnd = function () {
	}

	_p5_clickable_clickables.push(this);
}

function p5ClickableAddon(p5, fn, lifecycles) {
	fn.createClickable = function () {
		return new Clickable();
	}

	lifecycles.predraw = function () {
		// Corre antes de cada draw
	};

	lifecycles.postdraw = function () {
		// Corre despues de cada draw
	};
}

p5.registerAddon(p5ClickableAddon);