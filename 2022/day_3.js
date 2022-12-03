const _ = require('lodash');
const utils = require('../utils');

var inputArray = utils.fileReader("2022/day_3.txt");
function calcScore(shared) {
	var score = 0;
	for (var j in shared) {
		if (shared[j] == shared[j].toUpperCase()) {
			score += shared[j].charCodeAt(0) - 38;
		} else {
			score += shared[j].charCodeAt(0) - 96;
		}
	}
	return score;
}

// p1
var score = 0;
for (var i in inputArray) {
	var string = inputArray[i].trim();
	var r1 = string.substring(0, string.length/2).split('');
	var r2 = string.substring(string.length/2).split('');
	var shared = _.intersection(r1, r2);
	score += calcScore(shared);
	
}
console.log(score);

// p2
var score = 0;
for (var i = 0; i < inputArray.length; i = i+3) {
	var e1 = inputArray[i].trim().split('');
	var e2 = inputArray[i+1].trim().split('');
	var e3 = inputArray[i+2].trim().split('');
	var shared = _.intersection(e1, e2, e3);
	score += calcScore(shared);
}
console.log(score);