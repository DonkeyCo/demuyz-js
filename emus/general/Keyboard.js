export default class Keyboard {
	constructor() {
		this.keys = 0x0;
		this.isPressed = false;
		this._keydown = this.setKey.bind(this);
		this._keyup = this.setKey.bind(this);
	}

	activate() {
		console.log("Register keyboard")
		document.addEventListener("keydown", this._keydown);
		document.addEventListener("keyup", this._keyup);
	}

	deactivate() {
		document.removeEventListener("keydown", this._keydown);
		document.addEventListener("keyup", this._keyup);
	}

	setKey(event) {
		let key = this.keyMap[event.key];
		if (key != undefined) {
			console.log(`Key pressed: ${key}`);
			this.keys = key;
			this.isPressed = true;
		}
	}

	resetKey() {
		this.keys = 0x0;
		this.isPressed = false;
	}

	get pressedKey() {
		if (this.isPressed) {
			return this.keys;
		}
	}

	get keyMap() {
		throw Error("keyMap getter not implemented");
	}
}