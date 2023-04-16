import BaseDisplay from "../general/Display.js"

export default class Display extends BaseDisplay {
  constructor(sourceId, factor) {
    super(sourceId, 64, 32, factor);
  }

	setPixel(x, y, value) {
    const collision = this.frameBuffer[x][y] & value;
    this.frameBuffer[x][y] ^= value;
    return !!collision;
	}

  getColor(value) {
    return value == 1 ? "white" : "black"
  }
}