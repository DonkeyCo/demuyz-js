import { Chip8 } from "./emus/chip8/Chip8.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let rom = fs.readFileSync(path.join(__dirname, "./test/roms/test_opcode.ch8"));
let chip8 = new Chip8(rom);
chip8.run();