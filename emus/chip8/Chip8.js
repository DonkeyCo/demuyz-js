import Emulator from "../general/Emulator";
import { BinarySize } from "../general/MemoryMap"; 

const SYM_GENERAL_REG = Symbol("chip8_general");
const SYM_I_REG = Symbol("chip8_I");
const SYM_VF_REG = Symbol("chip8_VF");
const SYM_DELAY_REG = Symbol("chip8_delay");
const SYM_SOUND_REG = Symbol("chip8_sound");
const SYM_PC_REG = Symbol("chip8_PC");
const SYM_SP_REG = Symbol("chip8_SP");

const Registers = {
	General: SYM_GENERAL_REG,
	I: SYM_I_REG,
	VF: SYM_VF_REG,
	Delay: SYM_DELAY_REG,
	Sound: SYM_SOUND_REG,
	PC: SYM_PC_REG,
	SP: SYM_SP_REG,
};

/**
 * Class representing the Chip-8 emulator.
 * 
 * Memory: 4KB (4096 Bytes)
 * Registers: 16 8-bit registers, 1 16-bit I-Register
 */
class Chip8 extends Emulator {
	static REGISTER_SIZE = 8;
	static MEMORY_UNIT = 8;

	static MEMORY_SIZE = 4096;
	static GENERAL_REGISTERS = 8;
	
	constructor() {
		super(
			MEMORY_SIZE, // memory
			{
				SYM_GENERAL_REG: BinarySize[REGISTER_SIZE](GENERAL_REGISTERS), // 16 8-Bit general registers
				SYM_I_REG: 0x0, // 1 16-Bit I register
				SYM_VF_REG: 0x0, // 1 8-Bit VF register
				SYM_DELAY_REG: 0x0, // 1 8-Bit Delay Register
				SYM_SOUND_REG: 0x0, // 1 8-Bit Sound Register
				SYM_PC_REG: 0x0, // 1 16-Bit Program Counter
				SYM_PC_REG: 0x0, // 1 8-Bit Stack Pointer
			}, // registers
			{}, // inputs
			{}, // outputs
			{}, // timers
		);
		this.stack = BinarySize[16](16); // Stack (16 16-bit)
	}
}

export { 
	Chip8, Registers
};
