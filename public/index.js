import Display from "../emus/chip8/Display.js";

window.onload = () => {
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
};
