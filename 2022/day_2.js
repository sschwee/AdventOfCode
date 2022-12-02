const _ = require('lodash');
const utils = require('../utils');

var inputArray = utils.fileReader("2022/day_2.txt");
var score = 0;
for (var i in inputArray) {
	var temp = inputArray[i].trim().split(" ");
	var opp = temp[0].charCodeAt(0) - 64;
	var me = temp[1].charCodeAt(0) - 87;
	
	// win/loss
	if (me - opp == 1 || me - opp == -2) {
		score += 6;
	} else if (me - opp == 0) {
		score += 3;
	}
	// my score
	score += me;
}
console.log(score);

// part 2
var score = 0;
for (var i in inputArray) {
	var temp = inputArray[i].trim().split(" ");
	var opp = temp[0].charCodeAt(0) - 64;
	// win/loss and selection
	switch (temp[1]) {
		case "X": var me = opp - 1; break;
		case "Y": var me = opp; score += 3; break;
		case "Z": var me = opp + 1; score += 6; break;
	}
	// wrapping
	if (me == 0) {
		me = 3;
	} else if (me == 4) {
		me = 1;
	}
	// my score
	score += me;
}
console.log(score);