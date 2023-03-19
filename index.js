import { Chip8 } from "./emus/chip8/Chip8.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let rom = fs.readFileSync(path.join(__dirname, "./test/roms/SCTEST.ch8"));
let chip8 = new Chip8();
chip8.loadRom(rom);

let i = 0;
const limit = rom.length;
while (i < limit) {
  chip8.cycle();
  i++;
}

console.log(chip8)