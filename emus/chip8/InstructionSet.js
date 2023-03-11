import { Registers } from "./Chip8";

export const InstructionSet = {
	EXIT_N: {
		opcode: 	0x0010,
		mask:			0x1110,
		register:	[],
		value:		[0x0001],
		desc:			"Exit emulator with a return value of N.",
		execute:	(value, registers) => {
			console.log(desc);
			throw new Error(value);
		}
	},
	CLS: {
		opcode:		0x00E0,
		mask:			0x1111,
		register:	[],
		value:		[],
		desc:			"Clear the display. Sets all pixels to off.",
		execute:	(value, registers) => {
			console.log(desc);
		}
	},
	RET: {
		opcode:		0x00EE,
		mask:			0x1111,
		register:	[],
		value:		[],
		desc:			"Return from subroutine. Set PC to the address at the top of the stack and subtract 1 from the SP.",
		execute:	(value, registers) => {
			console.log(desc);
			this.registers[Registers.PC] = this.stack[this.stack.length - 1];
			this.registers[Registers.SP]--;
		}
	},
	COMPAT: {
		opcode:		0x00FA,
		mask:			0x1111,
		register:	[],
		value:		[],
		desc:			"Non-standard. Toggles changing of the I register by save (FX55) and restore (FX65) opcodes.",
		execute:	(value, registers) => {
			console.log(desc);
		}
	},
	CALL_NNN_M: {
		opcode:		0x0000,
		mask:			0x1000,
		register:	[],
		value:		[0x0111],
		desc:			"Call machine language subroutine at address NNN.",
		execute:	(value, registers) => {
			console.log(desc);
		}
	},
	JMP_NNN: {
		opcode:		0x1000,
		mask:			0x1000,
		register:	[],
		value:		[0x0111],
		desc:			"Set PC to NNN.",
		execute:	(value, registers) => {
			console.log(desc);
			this.registers[Registers.PC] = value;
		}
	},
	CALL_NNN_SR: {
		opcode:		0x2000,
		mask:			0x1000,
		register:	[],
		value:		[0x0111],
		desc:			"Call subroutine at NNN. Increment the SP and put the current PC value on the top of the stack. Then set the PC to NNN. Generally there is a limit of 16 successive calls.",
		execute:	(value, registers) => {
			console.log(desc);
			if (this.registers[Registers.SP] == 15) {
				throw new Error("StackOverflowError");
			}
			this.registers[Registers.SP]++;
			this.stack.push(this.registers[Registers.PC]);
			this.registers[Registers.PC] = value;
		}
	},
	SE_VX_NN: {
		opcode:		0x3000,
		mask:			0x1000,
		register:	[0x0100],
		value:		[0x0011],
		desc:			"Skip the next instruction if register VX is equal to NN.",
		execute:	(value, registers) => {
			console.log(desc);
			registers[0] == value ? this.registers[Registers.PC] += 2 : 0;
		}
	},
	SNE_VX_NN: {
		opcode:		0x4000,
		mask:			0x1000,
		register:	[0x0100],
		value:		[0x0011],
		desc:			"Skip the next instruction if register VX is not equal to NN.",
		execute:	(value, registers) => {
			console.log(desc);
			registers[0] != value ? this.registers[Registers.PC] += 2 : 0;
		}
	},
	SE_VX_VY: {
		opcode:		0x5000,
		mask:			0x1001,
		register:	[0x0100, 0x0010],
		value:		[],
		desc:			"Skip the next instruction if register VX equals VY.",
		execute:	(value, registers) => {
			console.log(desc);
			registers[0] == registers[1] ? this.registers[Registers.PC] += 2 : 0;
		}
	},
	LD_VX_NN: {
		opcode:		0x6000,
		mask:			0x1000,
		register:	[0x0100],
		value:		[0x0011],
		desc:			"Load immediate value NN into register VX.",
		execute:	(value, registers) => {
			console.log(desc);
			registers[0] = value;
		}
	},
	ADD_VX_NN: {
		opcode:		0x7000,
		mask:			0x1000,
		register:	[0x0100, 0x0010],
		value:		[0x0011],
		desc:			"Add immediate value NN to register VX. Does not effect VF.",
		execute:	(value, registers) => {
			console.log(desc);
			registers[0] += value;
		}
	},
	LD_VX_VY: {
		opcode:		0x8000,
		mask:			0x1001,
		register:	[0x0100, 0x0010],
		value:		[],
		desc:			"Copy the value in register VY into VX.",
		execute:	(value, registers) => {
			console.log(desc);
			registers[0] = registers[1];
		}
	},
	OR_VX_VY: {
		opcode:		0x8001,
		mask:			0x1001,
		register:	[0x0100, 0x0010],
		value:		[],
		desc:			"Set VX equal to the bitwise or of the values in VX and VY.",
		execute:	(value, registers) => {
			console.log(desc);
			registers[0] |= registers[1];
		}
	},
	AND_VX_VY: {
		opcode:		0x8002,
		mask:			0x1001,
		register:	[0x0100, 0x0010],
		value:		[],
		desc:			"Set VX equal to the bitwise and of the values in VX and VY.",
		execute:	(value, registers) => {
			console.log(desc);
			registers[0] &= registers[1];
		}
	},
	XOR_VX_VY: {
		opcode:		0x8003,
		mask:			0x1001,
		register:	[0x0100, 0x0010],
		value:		[],
		desc:			"Set VX equal to the bitwise xor of the values in VX and VY.",
		execute:	(value, registers) => {
			console.log(desc);
			registers[0] ^= registers[1];
		}
	},
	ADD_VX_VY: {
		opcode:		0x8004,
		mask:			0x1001,
		register:	[0x0100, 0x0010],
		value:		[],
		desc:			"Set VX equal to VX plus VY. In the case of an overflow VF is set to 1. Otherwise 0.",
		execute:	(value, registers) => {
			console.log(desc);
			registers[0] += registers[1];
			this.registers[Registers.VF] = registers[0] > 0xFF ? 1 : 0;
		}
	},
	SUB_VX_VY: {
		opcode:		0x8005,
		mask:			0x1001,
		register:	[0x0100, 0x0010],
		value:		[],
		desc:			"Set VX equal to VX minus VY. In the case of an underflow VF is set to 0. Otherwise 1.",
		execute:	(value, registers) => {
			console.log(desc);
			registers[0] += registers[1];
			this.registers[Registers.VF] = registers[0] > registers[1] ? 1 : 0;
		}
	},
	SHR_VX_VY: {
		opcode:		0x8006,
		mask:			0x1001,
		register:	[0x0100, 0x0010],
		value:		[],
		desc:			"Set VX equal to VX bitshifted right 1. VF is set to the least significant bit of VX prior to the shift.",
		execute:	(value, registers) => {
			console.log(desc);
			registers[Registers.VF] = registers[0]
			registers[0] >>>= 1;
		}
	},
	SUBN_VX_VY: {
		opcode:		0x8008,
		mask:			0x1001,
		register:	[0x0100, 0x0010],
		value:		[],
		desc:			"Set VX equal to VY minus VX. VF is set to 1 if VY > VX. Otherwise 0.",
		execute:	(value, registers) => {
			console.log(desc);
			registers[0] = registers[1] - registers[0];
			this.registers[Registers.VF] = registers[1] > registers[0] ? 1 : 0;
		}
	},
};