export default class Display {
	constructor(sourceId, width, height, factor) {
		this.sourceId = sourceId;
		this.height = height;
		this.width = width;
		this.factor = factor;
		this.displayWidth = width * factor;
		this.displayHeight = height * factor;
		this.frameBuffer = this._createFrameBuffer();

		// Retrieve the source element
		this.root = document.getElementById(sourceId);
		this.init();
		console.log(`Display initialised with ${height} and ${width} at element`,  this.root);
	}

	init() {
		this.canvas = document.createElement("canvas");

		this.canvas.width = this.displayWidth;
		this.canvas.height = this.displayHeight;
		this.canvas.style = "border: 1px solid black"
		
		this.root.appendChild(this.canvas);
	}

	drawFrame() {
		let context = this.canvas.getContext("2d");

		if (!context) {
			return;
		}

		for (let x = 0; x < this.width; x++) {
			for (let y = 0; y < this.height; y++) {
				let pixel = this.frameBuffer[x][y];
				this.drawPixel(x, y, pixel);
			}
		}
	}

	drawPixel(x, y, color) {
		let context = this.canvas.getContext("2d");

		if (!context) {
			return;
		}

		context.fillStyle = this.getColor(color);
		context.fillRect(x * this.factor, y * this.factor, 1 * this.factor, 1 * this.factor);
	}

	setPixel(x, y, value) {
		throw Error("setPixel not implemented");
	}

	clear() {
		let context = this.canvas.getContext("2d");
		context.clearRect(0, 0, this.displayWidth, this.displayHeight);
		for (let x = 0; x < this.width; x++) {
			for (let y = 0; y < this.height; y++) {
				this.frameBuffer[x][y] = 0;
			}
		}
	}

	getColor(value) {
		throw Error("getColor not implemented");
	}

	_createFrameBuffer() {
		let frameBuffer = Array(this.width);
		for (let i = 0; i < this.width; i++) {
			frameBuffer[i] = Array(this.height).fill(0);
		}
		return frameBuffer;
	}
}