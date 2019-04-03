const IFTTT = require('node-ifttt-maker');
const ifttt = new IFTTT(process.env.IFTTT_TOKEN);
const { exec } = require('child_process');

const atLeast1 = process.env.AT_LEAST_1_EVENT || 'someone_home';
const atMost0  = process.env.AT_MOST_0_EVENT || 'everyone_gone';

const knownDevices = process.env.KNOWN_DEVICES.split(',');

const intervalS = process.env.INTERVAL_SECONDS || 5;

function update() {
	getDevicesNearby(knownDevices).then(len => {
		if (len === 0) {
			console.log('Emitting 0 device event to IFTTT...');
			ifttt.request(atMost0);
		} else {
			console.log('Emitting at least 1 device event to IFTTT...');
			ifttt.request(atLeast1);
		}
	});
}

function getDevicesNearby(macs) {
	let len = 0;
	return new Promise(async (resolve, reject) => {

		await asyncForEach(macs, address => {
			return new Promise((resolve, reject) => {
				console.log(`Looking for ${address}...`);
				exec(`hcitool name ${address}`, (err, stdout, stderr) => {
				  if (err) {
				  	console.error(err);
				  	reject(err);
				  }
				  if (stdout.length !== 0) {
				  	console.log(`Found ${address}.`);
				  	len++;
				  }
				  resolve();
				});
			});
		});

		resolve(len);
	});
}

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}


// Inital call to update
setInterval(update, intervalS * 1000);
