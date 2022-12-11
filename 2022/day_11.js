const _ = require('lodash');
const utils = require('../utils');

function runOperation(monkey_num, worry) {
	var lcm = 3 * 13 * 19 * 17 * 5 * 7 * 11 * 2;
	switch(monkey_num){
		case 0:
			worry = (worry * 13) % lcm;
			monkey_throw = 1;
			if (worry % 3 == 0) {
				monkey_throw = 2;
			}
			break;
		case 1:
			worry = (worry + 2) % lcm;
			monkey_throw = 2;
			if (worry % 13 == 0) {
				monkey_throw = 7;
			}
			break;
		case 2:
			worry = (worry + 8) % lcm;
			monkey_throw = 7;
			if (worry % 19 == 0) {
				monkey_throw = 4;
			}
			break;
		case 3:
			worry = (worry + 1) % lcm;
			monkey_throw = 5;
			if (worry % 17 == 0) {
				monkey_throw = 6;
			}
			break;
		case 4:
			worry = (worry * 17) % lcm;
			monkey_throw = 3;
			if (worry % 5 == 0) {
				monkey_throw = 6;
			}
			break;
		case 5:
			worry = (worry + 3) % lcm;
			monkey_throw = 0;
			if (worry % 7 == 0) {
				monkey_throw = 1;
			}
			break;
		case 6:
			worry = (worry * worry) % lcm;
			monkey_throw = 0;
			if (worry % 11 == 0) {
				monkey_throw = 5;
			}
			break;
		case 7:
			worry = (worry + 6) % lcm;
			monkey_throw = 3;
			if (worry % 2 == 0) {
				monkey_throw = 4;
			}
			break;
	}
	
	return [worry, monkey_throw]
}

// game
var monkeys = [
	[54, 98, 50, 94, 69, 62, 53, 85],
	[71, 55, 82],
	[77, 73, 86, 72, 87],
	[97, 91],
	[78, 97, 51, 85, 66, 63, 62],
	[88],
	[87, 57, 63, 86, 87, 53],
	[73, 59, 82, 65]
];
var monkeyCounts = [0, 0, 0, 0, 0, 0, 0, 0];

// loop 20 rounds
for (var i = 1; i <= 10000; i++) {
	// loop each monkey
	for (var j = 0; j <= 7; j++) {
		// loop monkey items
		for (var k in monkeys[j]) {
			var result = runOperation(j, monkeys[j][k]);
			monkeyCounts[j]++;
			monkeys[result[1]].push(result[0]);
		}
		monkeys[j] = [];
	}
}
monkeyCounts.sort(function(a, b){return b-a});
console.log(monkeyCounts);
console.log(monkeyCounts[0] * monkeyCounts[1]);