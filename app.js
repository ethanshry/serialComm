// Hardware Interface Imports
let SerialPort = require('serialport');

/*
	### Serial Communication ###
*/
// port might be /dev/ttyAMA0
let sp = new SerialPort("/dev/ttyACM0", {
	baudRate: 115200
});

sp.on("open", () => {
	console.log("Serial Comm Connection Open");
});

sp.on("error", (error) => {
	console.error("Serial Comm Error: ", error);
});

sp.on("close", () => {
	console.log("Serial Comm Port Closed");
});

sp.on("data", (data) => {
	let bufferedData = new Buffer(data, 'utf');
	console.log("Recieved Serial Data: " + bufferedData);
	globalData.serialACK = 1;
});

async function writeSerial(serialSends) {
	for (let i = 0; i < serialSends.length; i++) {
		globalData.serialACK = 0;
		sp.write(serialSends[i]);
		while (!serialACK) {
			await sleep(100);
		}
	}
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
