const _ = require('lodash');
const utils = require('../utils');

var inputArray = utils.fileReader("2022/day_9.txt");

var knots = [
	[0,0],
	[0,0],
	[0,0],
	[0,0],
	[0,0],
	[0,0],
	[0,0],
	[0,0],
	[0,0],
	[0,0]
]
var visited = {};
visited[knots[9].join()] = true;

function updateTail(knot_num) {
	if (knots[knot_num-1][0] - knots[knot_num][0] > 1) {
		knots[knot_num][0]++;
		if (knots[knot_num-1][1] > knots[knot_num][1]) {
			knots[knot_num][1]++;
		} else if (knots[knot_num-1][1] < knots[knot_num][1]) {
			knots[knot_num][1]--;
		} 
	}
	if (knots[knot_num-1][0] - knots[knot_num][0] < -1) {
		knots[knot_num][0]--;
		if (knots[knot_num-1][1] > knots[knot_num][1]) {
			knots[knot_num][1]++;
		} else if (knots[knot_num-1][1] < knots[knot_num][1]) {
			knots[knot_num][1]--;
		} 
	}
	if (knots[knot_num-1][1] - knots[knot_num][1] > 1) {
		knots[knot_num][1]++;
		if (knots[knot_num-1][0] > knots[knot_num][0]) {
			knots[knot_num][0]++;
		} else if (knots[knot_num-1][0] < knots[knot_num][0]) {
			knots[knot_num][0]--;
		} 
	}
	if (knots[knot_num-1][1] - knots[knot_num][1] < -1) {
		knots[knot_num][1]--;
		if (knots[knot_num-1][0] > knots[knot_num][0]) {
			knots[knot_num][0]++;
		} else if (knots[knot_num-1][0] < knots[knot_num][0]) {
			knots[knot_num][0]--;
		} 
	}
	if (knot_num == 9) {visited[knots[9].join()] = true;}
}

function printRopes() {
	for (var y = 15; y >= -5; y--) {
		var lineArray = [];
		for (var x = -11; x <= 14; x++) {
			var found = false;
			for (var z in knots) {
				if (knots[z][0] == x && knots[z][1] == y) {
					if (z == 0) {
						lineArray.push("H");
					} else {
						lineArray.push(z);
					}
					found = true;
					break;
				}
			}
			if (!found) {
				if (x == 0 && y == 0) {
					lineArray.push("s");
				} else {
					lineArray.push(".");
				}
			}
		}
		console.log(lineArray.join(''));
	}
}

// console.log("== Initial State ==");
// console.log("");
// console.log("");
// printRopes();
for (var i in inputArray) {
	var moveArray = inputArray[i].trim().split(' ');
	if (moveArray[0] == "R") {
		for (var j = 0; j < moveArray[1]; j++) {
			knots[0][0]++;
			for (var k = 1; k < knots.length; k++) {
				updateTail(k);
			}
		}
	} else if (moveArray[0] == "L") {
		for (var j = 0; j < moveArray[1]; j++) {
			knots[0][0]--;
			for (var k = 1; k < knots.length; k++) {
				updateTail(k);
			}
		}
	} else if (moveArray[0] == "D") {
		for (var j = 0; j < moveArray[1]; j++) {
			knots[0][1]--;
			for (var k = 1; k < knots.length; k++) {
				updateTail(k);
			}
			
		}
	} else if (moveArray[0] == "U") {
		for (var j = 0; j < moveArray[1]; j++) {
			knots[0][1]++;
			for (var k = 1; k < knots.length; k++) {
				updateTail(k);
			}
		}
	}
	
	// console.log("== "+inputArray[i].trim()+" ==");
	// console.log("");
	// console.log("");
	// printRopes();
	// console.log("");
	// console.log("");
}
console.log(Object.keys(visited).length);