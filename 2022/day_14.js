const _ = require('lodash');
const utils = require('../utils');

var inputArray = utils.fileReader("2022/day_14.txt");
var minX = 500
var maxX = 500
var maxY = 0
var mapStruct = {};
for (var i in inputArray) {
	var lineArray = inputArray[i].trim().split(' -> ');
	var last_key = '';
	for (var j in lineArray) {
		// add current pos
		mapStruct[lineArray[j]] = true;
		var posArray = lineArray[j].split(',');
		var curX = parseInt(posArray[0]);
		var curY = parseInt(posArray[1]);
		
		// track min/max
		if (curY > maxY) maxY = curY;
		if (curX > maxX) maxX = curX;
		if (curX < minX) minX = curX;
		
		// build line of rocks from last pos
		if (last_key.length) {
			var lastArray = last_key.split(',');
			var lastX = parseInt(lastArray[0]);
			var lastY = parseInt(lastArray[1]);
			
			// vertical line
			if (lastX == curX) {
				// down
				if (lastY < curY) {
					for (var y = 1; y < curY - lastY; y++) {
						var newY = lastY + parseInt(y);
						mapStruct[curX+','+newY] = true;
					}
				// up
				} else {
					for (var y = -1; y > curY - lastY; y--) {
						var newY = lastY + parseInt(y);
						mapStruct[curX+','+newY] = true;
					}
				}
			// horizontal line	
			} else {
				// right
				if (lastX < curX) {
					for (var x = 1; x < curX - lastX; x++) {
						var newX = lastX + parseInt(x);
						mapStruct[newX+','+lastY] = true;
					}
				// left
				} else {
					for (var x = -1; x > curX - lastX; x--) {
						var newX = lastX + parseInt(x);
						mapStruct[newX+','+lastY] = true;
					}
				}
			}
		}
		last_key = lineArray[j];
	}
}
var p2Struct = _.cloneDeep(mapStruct);

function moveSand(pos) {
	// check out of bounds
	if (pos[0] < minX || pos[0] > maxX || pos[1] > maxY) {
		return false;
	}
	
	// move down if possible
	var new_pos = [pos[0], pos[1]+1];
	if (!(new_pos.join() in mapStruct)) {
		return moveSand(new_pos);
	}
	
	// move diagonal left if possible
	var new_pos = [pos[0]-1, pos[1]+1];
	if (!(new_pos.join() in mapStruct)) {
		return moveSand(new_pos);
	}
	
	// move diagonal right if possible
	var new_pos = [pos[0]+1, pos[1]+1];
	if (!(new_pos.join() in mapStruct)) {
		return moveSand(new_pos);
	}
	
	// sand cant move
	mapStruct[pos.join()] = true;
	return true;
}

var sandStart = [500, 0];
var t = 0;
while (true){
	if (!moveSand(sandStart)) {
		break;
	}
	t++
}
console.log(t);

function moveSandP2(pos) {
	// check out of bounds
	if ('500,0' in p2Struct) {
		return false;
	}
	
	// move down if possible
	var new_pos = [pos[0], pos[1]+1];
	if (new_pos[1] < maxY && !(new_pos.join() in p2Struct)) {
		return moveSandP2(new_pos);
	}
	
	// move diagonal left if possible
	var new_pos = [pos[0]-1, pos[1]+1];
	if (new_pos[1] < maxY && !(new_pos.join() in p2Struct)) {
		return moveSandP2(new_pos);
	}
	
	// move diagonal right if possible
	var new_pos = [pos[0]+1, pos[1]+1];
	if (new_pos[1] < maxY && !(new_pos.join() in p2Struct)) {
		return moveSandP2(new_pos);
	}
	
	// sand cant move
	p2Struct[pos.join()] = true;
	return true;
}

var sandStart = [500, 0];
var t = 0;
maxY += 2;
while (true){
	if (!moveSandP2(sandStart)) {
		break;
	}
	t++
}
console.log(t);