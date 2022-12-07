const _ = require('lodash');
const utils = require('../utils');

var inputArray = utils.fileReader("2022/day_7.txt");
var directoryMap = {};
var pathArray = [];
for (var i in inputArray) {
	var line = inputArray[i].trim();
	var lineArray = line.split(' ');
	
	// check if command
	if (lineArray[0] == "$") {
		if (lineArray[1] == "cd") {
			if (lineArray[2] == "..") {
				pathArray.pop();
			} else {
				pathArray.push(lineArray[2]);
			}
		}
	} else {
		if (lineArray[0] != "dir") {
			var tempPath = [];
			for (var j in pathArray) {
				tempPath.push(pathArray[j]);
				if (!(tempPath.join(',') in directoryMap)) {
					directoryMap[tempPath.join(',')] = 0;
				}
				directoryMap[tempPath.join(',')] += parseInt(lineArray[0]);
			}
		}	
	}
}

var sum = 0;
for (var dir in directoryMap) {
	if (directoryMap[dir] <= 100000) {
		sum += directoryMap[dir];
	}
}
console.log(sum);

const unusedSpace = 70000000 - directoryMap["/"];
const spaceNeeded = 30000000 - unusedSpace;
const dirs = _.filter(directoryMap, function(size) { return size >= spaceNeeded;});
console.log(_.min(dirs));