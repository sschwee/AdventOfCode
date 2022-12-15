const _ = require('lodash');
const utils = require('../utils');

var inputArray = utils.fileReader("2022/day_15.txt");

var sensorStruct = {};
var min_x = 0;
var max_x = 0;
var min_y = 0;
var max_y = 0;
for (var i in inputArray) {
	var lineArray = inputArray[i].trim().split(":");
	var sensorArray = lineArray[0].split(",");
	var sensor = [parseInt(sensorArray[0].replace(/[^\d-]/g,'')), parseInt(sensorArray[1].replace(/[^\d-]/g,''))];
	var beaconArray = lineArray[1].split(",");
	var beacon = [parseInt(beaconArray[0].replace(/[^\d-]/g,'')), parseInt(beaconArray[1].replace(/[^\d-]/g,''))];
	
	if (Math.min(sensor[0], beacon[0]) < min_x) min_x = Math.min(sensor[0], beacon[0]);
	if (Math.max(sensor[0], beacon[0]) > max_x) max_x = Math.max(sensor[0], beacon[0]);
	if (Math.min(sensor[1], beacon[1]) < min_y) min_y = Math.min(sensor[1], beacon[1]);
	if (Math.max(sensor[1], beacon[1]) > max_y) max_y = Math.max(sensor[1], beacon[1]);
	
	sensorStruct[sensor.join()] = beacon;
}

function calcDist(p1, p2) {
	return Math.abs(p1[0] - p2[0]) + Math.abs(p1[1] - p2[1]);
}

// fill in sensors + blanks
var mapStruct = {};
var line_num = 2000000;
var t = 0;
for (key in sensorStruct) {
	var sensor = key.split(',');
	var beacon = sensorStruct[key];
	
	// add sensor/beacon to array
	if (sensor[1] == line_num) mapStruct[sensor[0]] = "S"; 
	if (beacon[1] == line_num) mapStruct[beacon[0]] = "B";
	
	// add blanks based on dist
	var dist = calcDist(sensor, beacon);
	var x_diff = dist - Math.abs(parseInt(sensor[1]) - line_num);
	var x_min = parseInt(sensor[0]) - parseInt(x_diff)
	var x_max = parseInt(sensor[0]) + parseInt(x_diff)
	for (var x = x_min; x <= x_max; x++) {
		if (!(x in mapStruct)) {
			mapStruct[x] = "#";
			t++;
		}
	}
}
console.log(t);

// p2
var line_max = 4000000;
for (var line = 0; line <= line_max; line++){
	var intervals = [];
	for (key in sensorStruct) {
		var sensor = key.split(',');
		var beacon = sensorStruct[key];
		
		var dist = calcDist(sensor, beacon);
		var x_diff = dist - Math.abs(parseInt(sensor[1]) - line);
		if (x_diff < 0) continue;
		var x_min = Math.max(parseInt(sensor[0]) - parseInt(x_diff), 0);
		var x_max = Math.min(parseInt(sensor[0]) + parseInt(x_diff), line_max);
		intervals.push([x_min, x_max]);
	}
	intervals.sort(function(a,b) { return a[0]-b[0]; });
	
	var range = [];
	for (var i in intervals) {
		var interval = intervals[i];
		if (range.length == 0) {
			range.push(interval);
			continue;
		}
		prev_low = range[range.length-1][0];
		prev_high = range[range.length-1][1];
		
		if (interval[0] > prev_high + 1) {
			range.push(interval);
			continue;
		}
		
		range[range.length-1][1] = Math.max(prev_high, interval[1]);
	}
	
	var x = 0;
	for (var j in range) {
		if (x < range[j][0]) {
			console.log(parseInt(x)*4000000 + parseInt(line));
			return false;
		}
		x = Math.max(x, range[j][1] + 1);
		if (x > line_max) {
			break;
		}
	}
}