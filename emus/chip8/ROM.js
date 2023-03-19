import { ROM as BaseROM } from "../general/ROM.js";

export class ROM extends BaseROM {
  constructor(rom) {
    super(rom);
  }

  fetchInstruction(pc) {
    return this.data[pc] << 8 | this.data[pc+1];
  }
}