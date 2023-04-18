import Emulator from "../general/Emulator.js";
import { BinarySize } from "../general/MemoryMap.js";
import Display from "./Display.js";
import { InstructionSet } from "./InstructionSet.js";
import Keyboard from "./Keyboard.js";

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
	static GENERAL_REGISTERS = 16;
	static START_ADDRESS = 0x200;
	
	constructor(container, factor) {
		super(
			Chip8.MEMORY_SIZE, // memory
			{
				[Registers.General]: new BinarySize[Chip8.REGISTER_SIZE](Chip8.GENERAL_REGISTERS), // 16 8-Bit general registers
				[Registers.I]: 0x0, // 1 16-Bit I register
				[Registers.VF]: 0x0, // 1 8-Bit VF register
				[Registers.Delay]: 0x0, // 1 8-Bit Delay Register
				[Registers.Sound]: 0x0, // 1 8-Bit Sound Register
				[Registers.PC]: Chip8.START_ADDRESS, // 1 16-Bit Program Counter
				[Registers.SP]: 0x0, // 1 8-Bit Stack Pointer
			}, // registers
			{
				keyboard: new Keyboard()
			}, // inputs
			{
				display: new Display(container, factor)
			}, // outputs
			{}, // timers
		);
		this.stack = new BinarySize[16](16); // Stack (16 16-bit)
	}

	loadRom(rom) {
		for (let i = 0; i < rom.length; i++) {
			this.memory[Chip8.START_ADDRESS + i] = rom[i]; 
		}
		this.inputs.keyboard.activate(); // Maybe move this into a setup routine 
		this.reset();
	}

	reset() {
		this.memory.map(x => 0);
		this.registers[Registers.General] = new BinarySize[Chip8.REGISTER_SIZE](Chip8.GENERAL_REGISTERS);
		this.registers[Registers.I] = 0x0;
		this.registers[Registers.VF] = 0x0;
		this.registers[Registers.Delay] = 0x0;
		this.registers[Registers.Sound] = 0x0;
		this.registers[Registers.PC] = Chip8.START_ADDRESS;
		this.registers[Registers.SP] = 0x0;

		this.stack = new BinarySize[16](16);
		
		this.outputs.display.clear();
	}

	cycle() {
		let code = this.fetch();
		let {value, registers, instruction} = this.decode(code);
		this.execute(instruction, value, registers);
	}

	fetch() {
		let pc = this.registers[Registers.PC];
		return this.memory[pc] << 8 | this.memory[pc+1];
	}

	decode(code) {
		const instruction = Object.values(InstructionSet).find(info => info.opcode == (code & info.mask));
		return {
			value: code & instruction.value[0],
			registers: instruction.register.map(mask => {
				let register = mask & code;
				while (register > 15) {
					register = register >> 4;
				}
				return register;
			}),
			instruction: instruction
		};
	}

	execute(instruction, value, registers) {
		instruction?.execute(this, value, registers);
	}
}

export { 
	Chip8, Registers
};
