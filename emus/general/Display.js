export default class Display {
	constructor(sourceId, height, width, factor) {
		this.sourceId = sourceId;
		this.height = height * factor;
		this.width = width * factor;
		this.factor = factor;

		// Retrieve the source element
		this.root = document.getElementById(sourceId);
		this.init();
		console.log(`Display initialised with ${height} and ${width} at element`,  this.root);
	}

	init() {
		this.canvas = document.createElement("canvas");

		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.canvas.style = "border: 1px solid black"
		
		this.root.appendChild(this.canvas);
	}

	drawPixel(x, y, color) {
		let context = this.canvas.getContext("2d");

		if (!context) {
			return;
		}

		context.fillStyle = color;
		context.fillRect(x, y, 1 * this.factor, 1 * this.factor);
	}

	clear() {
		let context = this.canvas.getContext("2d");
		context.clearRect(0, 0, this.height, this.width);
	}
}