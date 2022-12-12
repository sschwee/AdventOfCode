const _ = require('lodash');
const utils = require('../utils');

var inputArray = utils.fileReader("2022/day_12.txt");

function BFS(start, end) {
		
	// init
	var queue = [];
	var visited = {};
	var path = {};
	var start_key = start[0] + "_" + start[1];
	
	// add start to vars
	queue.push(start);
	visited[start_key] = true;
	path[start_key] = start_key;
	
	while (queue.length != 0) {
		
		var node = queue[0];
		var x = node[0];
		var y = node[1];
		var parent_key = x + "_" + y;
		// pop node from queue
		queue.shift();
		
		// check neighbors
		var isFound = false;
		for (var ny=-1; ny<=1; ny++) {
			for (var nx=-1; nx<=1; nx++) {
				
				var neighbor_x = x + nx;
				var neighbor_y = y + ny;
				var key = neighbor_x + "_" + neighbor_y;
				
				// out of bounds
				if (Math.abs(ny) == Math.abs(nx) || neighbor_y < mazeStartY || neighbor_y > mazeEndY || neighbor_x < mazeStartX || neighbor_x > mazeEndX) {
					continue;
				}
				
				// check if traversible or has been visited
				if (!(key in visited) && (mapArray[neighbor_y][neighbor_x].charCodeAt(0) - mapArray[y][x].charCodeAt(0)) <= 1){
					
					queue.push([neighbor_x, neighbor_y]); // add node to queue
					visited[key] = true; // mark is visited
					path[key] = parent_key; // add to path
					
					// if reached end, quit
					if (end[0] == neighbor_x && end[1] == neighbor_y) {
						isFound = true;
						break;
					}
				}
			}
			if (isFound) {
				break;
			}
		}
		
		if (isFound) {
			break;
		}
	}
	
	var solution = [];
	if (isFound) {
		
		// start at end
		var cur_key = end[0] + "_" + end[1];
		while (cur_key != start_key) {
			
			// push current key to solution array
			var cur_point = cur_key.split("_");
			solution.unshift([cur_point[0]*1, cur_point[1]*1]);
			
			// look for child key in path struct and get parent key
			var parent_key = path[cur_key];
			
			// update cur key to parent
			cur_key = parent_key;
		}
	}
	return solution;
}


var mapArray = [];
var start  = [];
var end = [];
for (var i in inputArray) {
	var rowArray = inputArray[i].trim().split('');
	if (start.length == 0 && rowArray.includes('S')) {
		start = [rowArray.indexOf('S'), parseInt(i)];
		rowArray[start[0]] = 'a';
	}
	if (end.length == 0 && rowArray.includes('E')) {
		end = [rowArray.indexOf('E'), parseInt(i)];
		rowArray[end[0]] = 'z';
	}
	mapArray.push(rowArray);
}

const mazeStartX = 0;
const mazeStartY = 0;
const mazeEndX = mapArray[0].length - 1;
const mazeEndY = mapArray.length - 1;
const solution = BFS(start, end);
console.log(solution.length);

var startingPoints = [];
for (var y in mapArray) {
	for (var x in mapArray[y]) {
		if (mapArray[y][x] == 'a') {
			startingPoints.push([parseInt(x), parseInt(y)]);
		}
	}
}

var steps = solution.length;
for (var i in startingPoints) {
	var tempSolution = BFS(startingPoints[i], end);
	if (tempSolution.length > 0 && tempSolution.length < steps) {
		steps = tempSolution.length;
	}
}
console.log(steps);