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
	distances[valve] = {}
	distances[valve][valve] = 0;
	for (var i in tunnelArray) {
		distances[valve][tunnelArray[i]] = 1;	
	}
}

for (var k in flowStruct) {
	for (var i in flowStruct) {
		for (var j in flowStruct) {
			distances[i][j] = Math.min(distances[i][j] || 999999, (distances[i][k] + distances[k][j]) || 999999);
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
return false;

function BFS(start, end) {
		
	// init
	var queue = [];
	var visited = {};
	var path = {};
	
	// add start to vars
	queue.push(start);
	visited[start] = true;
	path[start] = start;
	
	while (queue.length != 0) {
		// pop node from queue
		var node = queue[0];
		queue.shift();
		
		// check neighbors
		var isFound = false;
		for (var i in mapStruct[node]) {
			var key = mapStruct[node][i];
			// check if has been visited
			if (!(key in visited)){
				queue.push(key); // add node to queue
				visited[key] = true; // mark is visited
				path[key] = node; // add to path
				
				// if reached end, quit
				if (key == end) {
					isFound = true;
					break;
				}
			}
		}
		if (isFound) {
			break;
		}
	}
	// console.log(visited);
	// console.log(path);
	
	var solution = [];
	if (isFound) {
		
		// start at end
		var cur_key = end;
		while (cur_key != start) {
			
			// push current key to solution array
			solution.unshift(cur_key);
			
			// look for child key in path struct and get parent key
			var parent_key = path[cur_key];
			
			// update cur key to parent
			cur_key = parent_key;
		}
	}
	return solution;
}

const start = "AA";

var cur_node = start;
var cur_pressure = 0;
var total_pressure = 0;
var pathArray = [start];
var valvesOpen = [];
var queue = [];
var allOpen = false;
for (var i = 0; i <= 30; i++) {
	// console.log("== Minute "+i+" ==");
	// console.log(cur_pressure);
	// upkeeping
	if (i != 0) {
		// sum cur pressure
		total_pressure += cur_pressure;
		
		// turn on valve
		if (cur_node == prev_node && !allOpen) {
			cur_pressure += flowStruct[cur_node];
			valvesOpen.push(cur_node);
		}
	}
	
	// determine next node
	if (queue.length == 0) {
		var weights = [];
		for (var node in flowStruct) {
			if (valvesOpen.includes(node) || flowStruct[node] == 0) {
				continue;
			}
			var path = BFS(cur_node, node);
			if (path.length <= (30-i)) weights.push({minutes: path.length, path: path, rate: flowStruct[node]});
		}
		if (weights.length == 0) {
			allOpen = true;
			continue;
		}
		// sort by minutes desc
		weights = _.sortBy(weights, function(o) { return o.minutes*-1; });
		var maxMinutes = weights[0].minutes;
		for (var j = 0; j < weights.length; j++) {
			if (maxMinutes == weights[j].minutes) {
				weights[j].profit = weights[j].rate;
			} else {
				weights[j].profit = weights[j].rate * (maxMinutes - weights[j].minutes);	
			}
		}
		weights = _.sortBy(weights, function(o) { return o.profit*-1; });
		// console.log(cur_node);
		// console.log(weights);
		queue = weights[0].path;
		queue.push(queue[queue.length - 1]);
	}
	
	next_node = queue[0];
	queue.shift();
	
	
	// cue next action
	pathArray.push(next_node);
	var prev_node = cur_node;
	var cur_node = next_node;
}
console.log(total_pressure);
console.log(valvesOpen);
console.log(pathArray);