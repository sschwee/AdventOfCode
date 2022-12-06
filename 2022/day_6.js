const _ = require('lodash');
const utils = require('../utils');

var inputArray = utils.fileReader("2022/day_6.txt");
var packet = [];
for (var i in inputArray) {
	const str = inputArray[i].trim();
	// p1
	console.log(numTilDistinct(str, 4));
	// p2
	console.log(numTilDistinct(str, 14));
}

function numTilDistinct(str, num) {
	for (var i in str) {
		packet.push(str[i]);
		if (packet.length == (num*1+1)) {
			packet.shift();
		}
		if (_.uniq(packet).length == num) {
			return (i*1+1);
		}
	}
}