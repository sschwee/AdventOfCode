const _ = require('lodash');
const utils = require('../utils');

var inputArray = utils.fileReader("2022/day_10.txt");
var start = 1;
var cycle = 0;
var checkArray = [20, 60, 100, 140, 180, 220]
var sum = 0;
var printArray = [[],[],[],[],[],[]];
for (var i in inputArray) {
	var instructionArray = inputArray[i].trim().split(' ');
	var addX = 0;
	var count = 1;
	if (instructionArray[0] != "noop") {
		addX = parseInt(instructionArray[1]);
		count = 2;
	}
	for (var j = 0; j < count; j++) {
		var position = cycle - (40 * Math.floor(cycle/40));
		var character = (position >= start - 1 && position <= start + 1) ? "#" : ".";
		printArray[Math.floor(cycle/40)].push(character);
		cycle++;
		if (checkArray.includes(cycle)) {
			sum += cycle * start;
		}
	}
	start += addX;
}
console.log(sum);

for (var y in printArray) {
	console.log(printArray[y].join(''));
}