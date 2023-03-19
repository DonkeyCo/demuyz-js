export class ROM {
  constructor(rom) {
    this.data = rom;
  }

  fetchInstruction(pc) {
    return this.data[pc] << 8;
  }
}