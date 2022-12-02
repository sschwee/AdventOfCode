const _ = require('lodash');
const utils = require('../utils');

var inputArray = utils.fileReader("2022/day_2.txt");
var score = 0;
for (var i in inputArray) {
	var temp = inputArray[i].trim().split(" ");
	switch (temp[0]) {
		case "A": var opp = 1; break;
		case "B": var opp = 2; break;
		case "C": var opp = 3; break;
	}
	switch (temp[1]) {
		case "X": var me = 1; break;
		case "Y": var me = 2; break;
		case "Z": var me = 3; break;
	}
	if (me - opp == 1 || me - opp == -2) {
		score += 6;
	} else if (me - opp == 0) {
		score += 3;
	}
	score += me;
}
console.log(score);

var score = 0;
for (var i in inputArray) {
	var temp = inputArray[i].trim().split(" ");
	switch (temp[0]) {
		case "A": var opp = 1; break;
		case "B": var opp = 2; break;
		case "C": var opp = 3; break;
	}
	switch (temp[1]) {
		case "X": var me = opp - 1; break;
		case "Y": var me = opp; score += 3; break;
		case "Z": var me = opp + 1; score += 6; break;
	}
	if (me == 0) {
		me = 3;
	} else if (me == 4) {
		me = 1;
	}
	score += me;
}
console.log(score);