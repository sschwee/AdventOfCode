const _ = require('lodash');
const utils = require('../utils');

var inputArray = utils.fileReader("2022/day_13.txt");

function compareValues(left, right) {
	if (typeof left != "object" && typeof right != "object") {
		if (parseInt(left) == parseInt(right)) {
			return 0;
		} else {
			return parseInt(left) < parseInt(right) ? -1 : 1;
		}
	} else if (typeof left == "object" && typeof right == "object") {
		var j = 0;
		while (j < left.length && j < right.length) {
			var ret = compareValues(left[j], right[j]);
			if (ret != 0) { return ret; }
			j++
		}
		if (j == left.length && j < right.length) {
			return -1;
		} else if (j == right.length && j < left.length) {
			return 1;
		} else {
			return 0;
		}
	} else if (typeof left == "object" && typeof right != "object") {
		return compareValues(left, [right]);
	} else {
		return compareValues([left], right);
	}
}

const pairs = [];
var tempArray = [];
const packets = [];
const divider1 = [[2]];
const divider2 = [[6]];
for (var i in inputArray) {
	var line = inputArray[i].trim();
	if (line.length == 0) {
		pairs.push(tempArray);
		tempArray = [];
		continue;
	}
	tempArray.push(JSON.parse(line));
	packets.push(JSON.parse(line));
}
pairs.push(tempArray);
packets.push(divider1);
packets.push(divider2);

const tracking = {};
var sum = 0;
for (var i in pairs) {
	var result = compareValues(pairs[i][0], pairs[i][1]);
	if (result == -1) {
		tracking[parseInt(i)+1] = pairs[i];
		sum += (parseInt(i)+1);
	}
}
console.log(sum);

packets.sort(function(a, b){return compareValues(a, b);});
var mult = 1;
for (var i in packets) {
	if (_.isEqual(packets[i], divider1)) {
		mult *= (parseInt(i)+1);
	} else if (_.isEqual(packets[i],divider2)) {
		mult *= (parseInt(i)+1);
	}
}
console.log(mult);