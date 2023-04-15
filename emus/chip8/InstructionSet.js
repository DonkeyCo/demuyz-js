import { Registers } from "./Chip8.js";

function nextInstruction(cpu) {
	cpu.registers[Registers.PC] += 2;
}

function skipInstruction(cpu) {
	cpu.registers[Registers.PC] += 4;
}

export const InstructionSet = {
	EXIT_N: {
		opcode: 	0x0010,
		mask:		0xFFF0,
		register:	[],
		value:		[0x000F],
		desc:		"Exit emulator with a return value of N.",
		execute	(cpu, value, registers) {
			console.log(this.desc);
			throw Error(value);
		}
	},
	CLS: {
		opcode:		0x00E0,
		mask:		0xFFFF,
		register:	[],
		value:		[],
		desc:		"Clear the display. Sets all pixels to off.",
		execute (cpu, value, registers) {
			console.log(this.desc);
			cpu.display.clear();
			nextInstruction(cpu);
		}
	},
	RET: {
		opcode:		0x00EE,
		mask:		0xFFFF,
		register:	[],
		value:		[],
		desc:		"Return from subroutine. Set PC to the address at the top of the stack and subtract 1 from the SP.",
		execute (cpu, value, registers) {
			console.log(this.desc);
			cpu.registers[Registers.PC] = cpu.stack[Registers.SP];
			cpu.registers[Registers.SP]--;
		}
	},
	COMPAT: {
		opcode:		0x00FA,
		mask:		0xFFFF,
		register:	[],
		value:		[],
		desc:		"Non-standard. Toggles changing of the I register by save (FX55) and restore (FX65) opcodes.",
		execute (cpu, value, registers) {
			console.log(this.desc);
			nextInstruction(cpu);
		}
	},
	CALL_NNN_M: {
		opcode:		0x0000,
		mask:		0xF000,
		register:	[],
		value:		[0x0FFF],
		desc:		"Call machine language subroutine at address NNN.",
		execute (cpu, value, registers) {
			console.log(this.desc);
			if (cpu.registers[Registers.SP] == 15) {
				throw new Error("StackOverflowError");
			}
			cpu.stack[cpu.registers[Registers.SP]] = cpu.registers[Registers.PC];
			cpu.registers[Registers.SP]++;
			cpu.registers[Registers.PC] = value;
		}
	},
	JMP_NNN: {
		opcode:		0x1000,
		mask:		0xF000,
		register:	[],
		value:		[0x0FFF],
		desc:		"Set PC to NNN.",
		execute (cpu, value, registers) {
			console.log(this.desc);
			cpu.registers[Registers.PC] = value;
		}
	},
	CALL_NNN_SR: {
		opcode:		0x2000,
		mask:		0xF000,
		register:	[],
		value:		[0x0FFF],
		desc:		"Call subroutine at NNN. Increment the SP and put the current PC value on the top of the stack. Then set the PC to NNN. Generally there is a limit of 16 successive calls.",
		execute (cpu, value, registers) {
			console.log(this.desc);
			if (cpu.registers[Registers.SP] == 15) {
				throw new Error("StackOverflowError");
			}
			cpu.stack[cpu.registers[Registers.SP]] = cpu.registers[Registers.PC];
			cpu.registers[Registers.SP]++;
			cpu.registers[Registers.PC] = value;
		}
	},
	SE_VX_NN: {
		opcode:		0x3000,
		mask:		0xF000,
		register:	[0x0F00],
		value:		[0x00FF],
		desc:		"Skip the next instruction if register VX is equal to NN.",
		execute (cpu, value, registers) {
			console.log(this.desc);
			cpu.registers[Registers.General][registers[0]] == value ? skipInstruction(cpu) : nextInstruction(cpu);
		}
	},
	SNE_VX_NN: {
		opcode:		0x4000,
		mask:		0xF000,
		register:	[0x0F00],
		value:		[0x00FF],
		desc:		"Skip the next instruction if register VX is not equal to NN.",
		execute (cpu, value, registers) {
			console.log(this.desc);
			cpu.registers[Registers.General][registers[0]] != value ? skipInstruction(cpu) : nextInstruction(cpu);
		}
	},
	SE_VX_VY: {
		opcode:		0x5000,
		mask:		0xF00F,
		register:	[0x0F00, 0x00F0],
		value:		[],
		desc:		"Skip the next instruction if register VX equals VY.",
		execute (cpu, value, registers) {
			console.log(this.desc);
			cpu.registers[Registers.General][registers[0]] == registers[1] ? skipInstruction(cpu) : nextInstruction(cpu);
		}
	},
	LD_VX_NN: {
		opcode:		0x6000,
		mask:		0xF000,
		register:	[0x0F00],
		value:		[0x00FF],
		desc:		"Load immediate value NN into register VX.",
		execute (cpu, value, registers) {
			console.log(this.desc);
			console.log(cpu.registers[Registers.General][registers[0]]);
			cpu.registers[Registers.General][registers[0]] = value;
			console.log(cpu.registers[Registers.General][registers[0]]);
			nextInstruction(cpu);
		}
	},
	ADD_VX_NN: {
		opcode:		0x7000,
		mask:		0xF000,
		register:	[0x0F00, 0x00F0],
		value:		[0x00FF],
		desc:		"Add immediate value NN to register VX. Does not effect VF.",
		execute (cpu, value, registers) {
			console.log(this.desc);
			cpu.registers[Registers.General][registers[0]] += value;
			nextInstruction(cpu);
		}
	},
	LD_VX_VY: {
		opcode:		0x8000,
		mask:		0xF00F,
		register:	[0x0F00, 0x00F0],
		value:		[],
		desc:		"Copy the value in register VY into VX.",
		execute (cpu, value, registers) {
			console.log(this.desc);
			cpu.registers[Registers.General][registers[0]] = registers[1];
			nextInstruction(cpu);
		}
	},
	OR_VX_VY: {
		opcode:		0x8001,
		mask:		0xF00F,
		register:	[0x0F00, 0x00F0],
		value:		[],
		desc:		"Set VX equal to the bitwise or of the values in VX and VY.",
		execute (cpu, value, registers) {
			console.log(this.desc);
			cpu.registers[Registers.General][registers[0]] |= registers[1];
			nextInstruction(cpu);
		}
	},
	AND_VX_VY: {
		opcode:		0x8002,
		mask:		0xF00F,
		register:	[0x0F00, 0x00F0],
		value:		[],
		desc:		"Set VX equal to the bitwise and of the values in VX and VY.",
		execute (cpu, value, registers) {
			console.log(this.desc);
			cpu.registers[Registers.General][registers[0]] &= registers[1];
			nextInstruction(cpu);
		}
	},
	XOR_VX_VY: {
		opcode:		0x8003,
		mask:		0xF00F,
		register:	[0x0F00, 0x00F0],
		value:		[],
		desc:		"Set VX equal to the bitwise xor of the values in VX and VY.",
		execute (cpu, value, registers) {
			console.log(this.desc);
			cpu.registers[Registers.General][registers[0]] ^= registers[1];
			nextInstruction(cpu);
		}
	},
	ADD_VX_VY: {
		opcode:		0x8004,
		mask:		0xF00F,
		register:	[0x0F00, 0x00F0],
		value:		[],
		desc:		"Set VX equal to VX plus VY. In the case of an overflow VF is set to 1. Otherwise 0.",
		execute (cpu, value, registers) {
			console.log(this.desc);
			cpu.registers[Registers.General][registers[0]] += registers[1];
			cpu.registers[Registers.VF] = cpu.registers[Registers.General][registers[0]] > 0xFF ? 1 : 0;
			nextInstruction(cpu);
		}
	},
	SUB_VX_VY: {
		opcode:		0x8005,
		mask:		0xF00F,
		register:	[0x0F00, 0x00F0],
		value:		[],
		desc:		"Set VX equal to VX minus VY. In the case of an underflow VF is set to 0. Otherwise 1.",
		execute (cpu, value, registers) {
			console.log(this.desc);
			cpu.registers[Registers.General][registers[0]] += registers[1];
			cpu.registers[Registers.VF] = cpu.registers[Registers.General][registers[0]] > registers[1] ? 1 : 0;
			nextInstruction(cpu);
		}
	},
	SHR_VX_VY: {
		opcode:		0x8006,
		mask:		0xF00F,
		register:	[0x0F00, 0x00F0],
		value:		[],
		desc:		"Set VX equal to VX bitshifted right 1. VF is set to the least significant bit of VX prior to the shift.",
		execute (cpu, value, registers) {
			console.log(this.desc);
			registers[Registers.VF] = cpu.registers[Registers.General][registers[0]] & 1;
			cpu.registers[Registers.General][registers[0]] >>>= 1;
			nextInstruction(cpu);
		}
	},
	SUBN_VX_VY: {
		opcode:		0x8007,
		mask:		0xF00F,
		register:	[0x0F00, 0x00F0],
		value:		[],
		desc:		"Set VX equal to VY minus VX. VF is set to 1 if VY > VX. Otherwise 0.",
		execute (cpu, value, registers) {
			console.log(this.desc);
			cpu.registers[Registers.General][registers[0]] = registers[1] - cpu.registers[Registers.General][registers[0]];
			cpu.registers[Registers.VF] = registers[1] > cpu.registers[Registers.General][registers[0]] ? 1 : 0;
			nextInstruction(cpu);
		}
	},
	SHL_VX_VY: {
		opcode:		0x800E,
		mask:		0xF00F,
		register:	[0x0F00, 0x00F0],
		value:		[],
		desc:		"Set VX equal to VX bitshifted left 1. VF is set to the most significant bit of VX prior to the shift.",
		execute (cpu, value, registers) {
			console.log(this.desc);
			cpu.registers[Registers.VF] = cpu.registers[Registers.General][registers[0]] >> 7;
			cpu.registers[Registers.General][registers[0]] <<= 1;
			nextInstruction(cpu);
		}
	},
	SNE_VX_VY: {
		opcode:		0x9000,
		mask:		0xF00F,
		register:	[0x0F00, 0x00F0],
		value:		[],
		desc:		"Skip the next instruction if VX does not equal VY.",
		execute (cpu, value, registers) {
			console.log(this.desc);
			cpu.registers[Registers.General][registers[0]] == cpu.registers[Registers.General][registers[0]] != registers[1] ? skipInstruction(cpu) : nextInstruction(cpu);
		}
	},
	LD_I_NNN: {
		opcode:		0xA000,
		mask:		0xF000,
		register:	[],
		value:		[0x0FFF],
		desc:		"Set I equal to NNN.",
		execute (cpu, value, registers) {
			console.log(this.desc);
			cpu.registers[Registers.I] = value;
			nextInstruction(cpu);
		}
	},
	JMP_V0_NNN: {
		opcode:		0xB000,
		mask:		0xF000,
		register:	[],
		value:		[0x0FFF],
		desc:		"Set the PC to NNN plus the value in V0.",
		execute (cpu, value, registers) {
			console.log(this.desc);
			cpu.registers[Registers.PC] = value + cpu.registers[Registers.General][0]; 
			nextInstruction(cpu);
		}
	},
	RND_VX_NN: {
		opcode:		0xC000,
		mask:		0xF000,
		register:	[0x0F00],
		value:		[0x00FF],
		desc:		"Set VX equal to a random number ranging from 0 to 255 which is logically anded with NN.",
		execute (cpu, value, registers) {
			console.log(this.desc);
			const random = Math.floor(Math.random() * 255);
			cpu.registers[Registers.General][registers[0]] = random & value;
			nextInstruction(cpu);
		}
	},
	DRW_VX_VY_N: {
		opcode:		0xD000,
		mask:		0xF000,
		register:	[0x0F00, 0x00F0],
		value:		[0x000F],
		desc:		"Display N-byte sprite starting at memory location I at (VX, VY). Each set bit of xored with what's already drawn. VF is set to 1 if a collision occurs. 0 otherwise.",
		execute (cpu, value, registers) {
			console.log(this.desc);
			// TODO: Do some display magic
			nextInstruction(cpu);
		}
	},
	SKP_VX: {
		opcode:		0xE09E,
		mask:		0xF0FF,
		register:	[0x0F00],
		value:		[],
		desc:		"Skip the following instruction if the key represented by the value in VX is pressed.",
		execute (cpu, value, registers) {
			console.log(this.desc);
			// TODO: Check keyboard press and then skip
			skipInstruction(cpu);
		}
	},
	SKNP_VX: {
		opcode:		0xE0A1,
		mask:		0xF0FF,
		register:	[0x0F00],
		value:		[],
		desc:		"Skip the following instruction if the key represented by the value in VX is not pressed.",
		execute (cpu, value, registers) {
			console.log(this.desc);
			// TODO: Check keyboard press and then skip
			skipInstruction(cpu);
		}
	},
	LD_VX_DT: {
		opcode:		0xF007,
		mask:		0xF0FF,
		register:	[0x0F00],
		value:		[],
		desc:		"Set VX equal to the delay timer.",
		execute (cpu, value, registers) {
			console.log(this.desc);
			cpu.registers[Registers.General][registers[0]] = cpu.registers[Registers.Delay];
			nextInstruction(cpu);
		}
	},
	LD_VX_KEY: {
		opcode:		0xF00A,
		mask:		0xF0FF,
		register:	[0x0F00],
		value:		[],
		desc:		"Wait for a key press and store the value of the key into VX.",
		execute (cpu, value, registers) {
			console.log(this.desc);
			// Do some magic here
			nextInstruction(cpu);
		}
	},
	LD_DT_VX: {
		opcode:		0xF015,
		mask:		0xF0FF,
		register:	[0x0F00],
		value:		[],
		desc:		"Set the delay timer DT to VX.",
		execute (cpu, value, registers) {
			console.log(this.desc);

			cpu.registers[Registers.Delay] = cpu.registers[Registers.General][registers[0]];

			nextInstruction(cpu);
		}
	},
	LD_ST_VX: {
		opcode:		0xF018,
		mask:		0xF0FF,
		register:	[0x0F00],
		value:		[],
		desc:		"Set the sound timer ST to VX.",
		execute (cpu, value, registers) {
			console.log(this.desc);
			
			cpu.registers[Registers.Sound] = cpu.registers[Registers.General][registers[0]];

			nextInstruction(cpu);
		}
	},
	ADD_I_VX: {
		opcode:		0xF01E,
		mask:		0xF0FF,
		register:	[0x0F00],
		value:		[],
		desc:		"Add VX to I. VF is set to 1 if I > 0x0FFF. Otherwise set to 0.",
		execute (cpu, value, registers) {
			console.log(this.desc);

			cpu.registers[Registers.I] += cpu.registers[Registers.General][registers[0]];
			cpu.registers[Registers.VF] = cpu.registers[Registers.I] > 0x0FFF ? 1 : 0;

			nextInstruction(cpu);
		}
	},
	LD_I_FONT_VX: {
		opcode:		0xF029,
		mask:		0xF0FF,
		register:	[0x0F00],
		value:		[],
		desc:		"Set I to the address of the CHIP-8 8x5 font sprite representing the value in VX.",
		execute (cpu, value, registers) {
			console.log(this.desc);
			// Do some magic here
			nextInstruction(cpu);
		}
	},
	BCD_VX: {
		opcode:		0xF033,
		mask:		0xF0FF,
		register:	[0x0F00],
		value:		[],
		desc:		"Convert that word to BCD and store the 3 digits at memory location I through I+2. I does not change.",
		execute (cpu, value, registers) {
			console.log(this.desc);

			const i = cpu.register[Registers.I];
			cpu.memory[i] = Math.floor(value / 100);
			cpu.memory[i + 1] = Math.floor(value / 10);
			cpu.memory[i + 2] = value % 10;

			nextInstruction(cpu);
		}
	},
	LD_I_VX: {
		opcode:		0xF055,
		mask:		0xF0FF,
		register:	[0x0F00],
		value:		[],
		desc:		"Store registers V0 through VX in memory starting at location I. I does not change.",
		execute (cpu, value, registers) {
			console.log(this.desc);

			let general = registers[Registers.General];
			const i = registers[Registers.I];
			for (let v = 0; v <= registers[0]; v++) {
				cpu.memory[i + v] = general[v];
			}

			nextInstruction(cpu);
		}
	},
	LD_VX_I: {
		opcode:		0xF065,
		mask:		0xF0FF,
		register:	[0x0F00],
		value:		[],
		desc:		"Copy values from memory location I through I + X into registers V0 through VX. I does not change.",
		execute (cpu, value, registers) {
			console.log(this.desc);

			let general = cpu.registers[Registers.General];
			for (let v = cpu.registers[Registers.I]; v <= registers[0]; v++) {
				general[v] = cpu.memory[v];
			}

			nextInstruction(cpu);
		}
	},
};