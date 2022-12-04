const _ = require('lodash');
const utils = require('../utils');

var inputArray = utils.fileReader("2022/day_4.txt");
var p1 = 0;
var p2 = 0;
for (var i in inputArray) {
	var pairs = inputArray[i].trim().split(',');
	var p = {
		0: [],
		1: []
	}
	for (var j in pairs) {
		var temp = pairs[j].trim().split('-');
		for (var k=temp[0]*1; k <= temp[1]*1; k++) {
			p[j].push(k*1);
		}
	}
	var intersection = _.intersection(p[0], p[1]);
	if (_.isEqual(intersection, p[0]) || _.isEqual(intersection, p[1])) {
		p1++;
	}
	if (intersection.length) {
		p2++;
	}
}
console.log(p1);
console.log(p2);