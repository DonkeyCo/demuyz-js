import Display from "../emus/general/Display.js";

window.onload = () => {
	const factor = 5;
	let demuyz = new Display("container", 120, 120, factor);
	console.log(demuyz);

	document.getElementById("clear").addEventListener("click", () => {
		console.log(`Clearing display`);
		demuyz.clear();
	});

	document.getElementById("drawLine").addEventListener("click", () => {
		for (let i = 0; i < 120 * factor; i++) {
			demuyz.drawPixel(i, 60, "red");
		}
	});
};
