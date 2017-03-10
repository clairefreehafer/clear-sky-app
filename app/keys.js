// const request = require('request-promise');
const axios = require('axios');

const locationKeysUrl = 'http://www.cleardarksky.com/t/chart_prop00.txt';

const keysArr = [];
const locationArr = [];
const nameArr = [];

let locationKeysArr;
let locationData = {};

const	getLocationArray = function () {
	return axios.get('../d3-sandbox/obs_data.tsv')
	.then(function (body) {
		locationKeysArr = body.split(`\n`); // 'key|location|name'
		console.log(body)
		locationKeysArr.forEach(function (element) {
			keysArr.push(element.split('|')[0]);
			locationArr.push(element.split('|')[1]);
			nameArr.push(element.split('|')[2]);
		})
		console.log(locationArr)
	})
	.catch(console.error)
}

const getLocationData = function (key) {
	const locationDataUrl = `http://cleardarksky.com/txtc/${key}csp.txt`;
	locationData.key = key;
	locationData.conditions = [];
	locationData.darkness = [];

	return axios.get('../d3-sandbox/obs_data.tsv')
	.then(function (body) {
		locationData.name = /title(\s*)=(\s*)\"(.*)\"/g.exec(body)[3];
		let dataArr = body.match(/"(.*)",\s(\d*),\t(\d*),\t(\d*),\t(\d*),\t(\d*),\t(\d*),\t/g); // array of each hour's data
		let darknessArr = body.match(/"(.*)",\s([-\.\d]*),\s([-\.\d]*),\s([-\.\d]*)(\))/g);

		dataArr.forEach(function (data) {
			let hourlyData = data.replace(/\s/g, '').split(','); // one array with each column its own element
			let hour = hourlyData[0].split(':')[0] // YYYY-MM-DDHH

			locationData.conditions.push({
				time: [hour.substr(hour.length - 2, hour.length), 0, 0], // [HH, MM, SS]
				clouds: hourlyData[1],
				transparency: hourlyData[2],
				seeing: hourlyData[3],
				wind: hourlyData[4],
				humidity: hourlyData[5],
				temperature: hourlyData[6]
			})
		})

		darknessArr.forEach(function (data, index) {
			let darknessData = data.replace(/\s|\)/g, '').split(',');
			let time = darknessData[0].slice(11, -1).split(':');

			locationData.darkness.push({
				time: [time[0], time[1], time[2]], // [HH, MM, SS];
				limitingMagnitude: darknessData[1],
				sunAltitude: darknessData[2],
				moonAltitude: darknessData[3]
			})
		})
		return locationData;
		/*
		locationData = {
			key:
			name:
			conditions:
			darkness:
		}
		*/
	})
	.catch(console.error);
}


module.exports = {
	getLocationArray,
	keysArr,
	locationArr,
	nameArr,
	getLocationData
}



