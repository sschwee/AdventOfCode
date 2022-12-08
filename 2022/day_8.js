const _ = require('lodash');
const utils = require('../utils');

var inputArray = utils.fileReader("2022/day_8.txt");
const treeMap = [];
for (var i in inputArray) {
	treeMap.push(inputArray[i].trim().split(''));
}

function isVisible(x, y) {
	// edges always visible
	if (x == 0 || x == treeMap.length - 1 || y == 0 || y == treeMap[x].length - 1) { return true; }
	
	// check for visiblity
	const size = treeMap[x][y];
	
	// left
	var visibleCheck = true;
	for (var k = x-1; k >= 0; k--) {
		if (size <= treeMap[k][y]) { 
			visibleCheck = false;
			break; 
		}
	}
	if (visibleCheck) { return true; }
	
	// right
	var visibleCheck = true;
	for (var k = x+1; k < treeMap[x].length; k++) {
		if (size <= treeMap[k][y]) { 
			visibleCheck = false;
			break; 
		}
	}
	if (visibleCheck) { return true; }
	
	// up
	var visibleCheck = true;
	for (var k = y-1; k >= 0; k--) {
		if (size <= treeMap[x][k]) { 
			visibleCheck = false;
			break; 
		}
	}
	if (visibleCheck) { return true; }
	
	// down
	var visibleCheck = true;
	for (var k = y+1; k < treeMap.length; k++) {
		if (size <= treeMap[x][k]) { 
			visibleCheck = false;
			break; 
		}
	}
	if (visibleCheck) { return true; }
	
	return false;
}

function calcScenicScore(x, y) {
	
	const size = treeMap[x][y];
	
	// left
	var leftView = 0;
	for (var k = x-1; k >= 0; k--) {
		leftView++;
		if (treeMap[k][y] >= size) { 
			break; 
		}
	}
	
	// right
	var rightView = 0;
	for (var k = x+1; k < treeMap[x].length; k++) {
		rightView++;
		if (treeMap[k][y] >= size) { 
			break; 
		}
	}
	
	// up
	var upView = 0;
	for (var k = y-1; k >= 0; k--) {
		upView++;
		if (treeMap[x][k] >= size) { 
			break; 
		}
	}
	
	// down
	var downView = 0;
	for (var k = y+1; k < treeMap.length; k++) {
		downView++;
		if (treeMap[x][k] >= size) { 
			break; 
		}
	}
	
	return leftView*rightView*upView*downView;
}

var visible = 0;
for (var i = 0; i < treeMap.length; i++) {
	for (var j = 0; j < treeMap[i].length; j++) {
		if (isVisible(i, j)) {
			visible++;
		}
	}
}
console.log(visible);

var maxScore = 0;
for (var i = 0; i < treeMap.length; i++) {
	for (var j = 0; j < treeMap[i].length; j++) {
		var score = calcScenicScore(i, j);
		if (score > maxScore) { maxScore = score; }
	}
}
console.log(maxScore);