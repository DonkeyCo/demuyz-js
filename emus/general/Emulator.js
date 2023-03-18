import { BinarySize } from "./MemoryMap.js";

class Emulator {
	static REGISTER_SIZE = 8;
	static MEMORY_UNIT = 8;

	/**
	 * Constructor for the emulator.
	 * @param {int} memory memory size in byte
	 * @param {Object} registers register map
	 * @param {Object} inputs map of inputs
	 * @param {Object} outputs map of outputs
	 * @param {Object} timers map of timers
	 */
	constructor(memory, registers, inputs, outputs, timers) {
		this.memory = new BinarySize[Emulator.MEMORY_UNIT](memory);
		this.registers = registers;
		this.inputs = inputs;
		this.outputs = outputs;
		this.timers = timers;
	}
}

export default Emulator;