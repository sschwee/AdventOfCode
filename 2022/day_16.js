const _ = require('lodash');
const utils = require('../utils');

var inputArray = utils.fileReader("2022/day_16.txt");

var mapStruct = {};
var flowStruct = {};
var posFlows = [];
const distances = {};
for (var i in inputArray) {
	var lineArray = inputArray[i].trim().split(';');
	var valveArray = lineArray[0].split(' has flow rate=');
	var valve = valveArray[0].replace('Valve ', '');
	var rate = parseInt(valveArray[1])
	var tunnelArray = lineArray[1].replace(' tunnels lead to valves ', '').replace(' tunnel leads to valve ', '').split(', ');
	
	mapStruct[valve] = tunnelArray;
	flowStruct[valve] = rate;
	if (rate > 0) posFlows.push(valve);
	
	// init for floyd warshall distances
	distances[valve] = {}
	distances[valve][valve] = 0;
	for (var i in tunnelArray) {
		distances[valve][tunnelArray[i]] = 1;	
	}
}

// floyd warshall to calc distances between all valves
for (var k in flowStruct) {
	for (var i in flowStruct) {
		for (var j in flowStruct) {
			// is path i->j better than path i->k->j ?
			distances[i][j] = Math.min(distances[i][j] || Infinity, (distances[i][k] + distances[k][j]) || Infinity); // undefined paths = infinity distance
		}
	}
}

function maxPressure(valve, time, remaining, has_elephant) {
	var max = has_elephant ? maxPressure("AA", init_time, remaining, false) : 0;
	for (var i in remaining) {
		var next_valve = remaining[i];
		var time_left = time - distances[valve][next_valve] - 1;
		if (time_left >= 0) {
			var new_remaining = _.clone(remaining);
			_.pull(new_remaining, next_valve)
			max = Math.max(max, flowStruct[next_valve]*time_left + maxPressure(next_valve, time_left, new_remaining, has_elephant));
		}
	}
	return max;
}
var init_time = 30;
console.log(maxPressure("AA", init_time, posFlows, false));
var init_time = 26;
console.log(maxPressure("AA", init_time, posFlows, true));