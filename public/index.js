import Display from "../emus/chip8/Display.js";
import { Chip8 } from "../emus/chip8/Chip8.js";

window.onload = () => {
	let chip8 = null;

	document.getElementById("run").addEventListener('click', () => {
		let file = document.getElementById("input").files[0];

		if (file) {
			file.arrayBuffer().then((buffer) => {
				if (!chip8) {
					chip8 = new Chip8("container", 7);
				}
				
				let rom = new Uint8Array(buffer);
				chip8.loadRom(rom);
	
				let i = 0;
				const limit = rom.length;
				while (i < limit) {
					chip8.cycle();
					i++;
				}
			});
		}
	});

	/*
	const factor = 7;
	let demuyz = new Display("container", factor);
	console.log(demuyz);

	demuyz.drawFrame();
	document.getElementById("clear").addEventListener("click", () => {
		console.log(`Clearing display`);
		demuyz.clear();
		demuyz.drawFrame();
	});

	document.getElementById("drawLine").addEventListener("click", () => {
		for (let i = 0; i < demuyz.width; i++) {
			demuyz.setPixel(i, i, 1);
		}
		demuyz.drawFrame();
	});
	*/
};
