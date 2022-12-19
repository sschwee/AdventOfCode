const _ = require('lodash');
const utils = require('../utils');

const inputArray = utils.fileReader("2022/day_17.txt");
const jetArray = inputArray[0].trim().split('');
const rockArray = ['-', '+', 'L', '|', '#'];

function renderMap(mapObj, maxHeight) {
	for (var y = maxHeight; y >= 1; y--) {
		var line = "";
		for (var x = 0; x <=6; x++) {
			if ([x,y].join() in mapObj) {
				line += "#";
			} else {
				line += ".";
			}
		}
		console.log(line);
	}
	console.log("");
}

const map = {};
var cur_y = 1;
var rock_enum = 0;
var jet_enum = 0;
for (var i=1; i<=1000000000000; i++) {
	// init rock
	if (rock_enum >= rockArray.length) {
		rock_enum = 0;
	}
	var rock = rockArray[rock_enum];
	var rock_y = cur_y + 3;
	var rock_x = 2;
	switch (rock) {
		case "-": rock_width=3; rock_height_right=1; rock_height_left=1; break;
		case "+": rock_width=2; rock_height_right=3; rock_height_left=3; break;
		case "L": rock_width=2; rock_height_right=3; rock_height_left=1; break;
		case "|": rock_width=0; rock_height_right=4; rock_height_left=4; break;
		case "#": rock_width=1; rock_height_right=2; rock_height_left=2; break;
	}
	var rockFalling = true;
	// console.log(cur_y);
	// console.log([rock_x, rock_y]);
	while (rockFalling) {
		
		// jet
		if (jet_enum >= jetArray.length) {
			jet_enum = 0;
		}
		var jet_move = jetArray[jet_enum];
		var jet_move_allowed = true;
		if (jet_move == ">") {
			// check right edge hitting wall or another rock
			temp_x = rock_x + rock_width + 1;
			if (temp_x <= 6) {
				var jet_move_allowed = true;
				if (rock == "+") {
					var edges = [[temp_x-1, rock_y], [temp_x, rock_y+1], [temp_x-1, rock_y+2]];
					for (var h in edges) {
						if (edges[h].join() in map) {
							jet_move_allowed = false;
							break;
						}
					}
				} else {
					for (var h=0; h<rock_height_right; h++) {
						if ([temp_x, rock_y+h].join() in map) {
							jet_move_allowed = false;
							break;
						}
					}
				}
				if (jet_move_allowed) {
					rock_x++;
				}
			}
		} else {
			temp_x = rock_x - 1;
			if (temp_x >= 0) {
				var jet_move_allowed = true;
				if (rock == "+") {
					var edges = [[temp_x+1, rock_y], [temp_x, rock_y+1], [temp_x+1, rock_y+2]];
					for (var h in edges) {
						if (edges[h].join() in map) {
							jet_move_allowed = false;
							break;
						}
					}
				} else {
					for (var h=0; h<rock_height_left; h++) {
						if ([temp_x, rock_y+h].join() in map) {
							jet_move_allowed = false;
							break;
						}
					}
				}
				if (jet_move_allowed) {
					rock_x--;
				}
			}
		}
		jet_enum++
	// console.log([rock_x, rock_y]);
		
		// fall
		rock_y--;
	// console.log([rock_x, rock_y]);
		
		// check if rock exists (any bottom edge)
		if (rock_y < 1) { 
			rockFalling = false;
		} else if (rock == "+") {
			var edges = [[rock_x, rock_y+1], [rock_x+1, rock_y], [rock_x+2, rock_y+1]];
			for (var j in edges) {
				var key = edges[j].join();
				if (key in map) {
					rockFalling = false;
				}
			}
		} else {
			for (var j=0; j<=rock_width; j++) {
				var key = [rock_x+j, rock_y].join();
				if (key in map) {
					rockFalling = false;
				}
			}
		}
		
	}
	rock_enum++;
	rock_y++; // go back up 1 unit
	switch (rock) {
		case "-": 
			cur_y = Math.max(cur_y, rock_y+1);
			for (var j = 0; j <= rock_width; j++) {
				map[[rock_x+j, rock_y].join()] = true;
			}
			break;
		case "+": 
			cur_y = Math.max(cur_y, rock_y+3);
			map[[rock_x+1, rock_y].join()] = true;
			map[[rock_x, rock_y+1].join()] = true;
			map[[rock_x+1, rock_y+1].join()] = true;
			map[[rock_x+2, rock_y+1].join()] = true;
			map[[rock_x+1, rock_y+2].join()] = true;
			break;
		case "L": 
			cur_y = Math.max(cur_y, rock_y+3);
			map[[rock_x, rock_y].join()] = true;
			map[[rock_x+1, rock_y].join()] = true;
			map[[rock_x+2, rock_y].join()] = true;
			map[[rock_x+2, rock_y+1].join()] = true;
			map[[rock_x+2, rock_y+2].join()] = true;
			break;
		case "|": 
			cur_y = Math.max(cur_y, rock_y+4);
			map[[rock_x, rock_y].join()] = true;
			map[[rock_x, rock_y+1].join()] = true;
			map[[rock_x, rock_y+2].join()] = true;
			map[[rock_x, rock_y+3].join()] = true;
			break;
		case "#": 
			cur_y = Math.max(cur_y, rock_y+2);
			map[[rock_x, rock_y].join()] = true;
			map[[rock_x+1, rock_y].join()] = true;
			map[[rock_x, rock_y+1].join()] = true;
			map[[rock_x+1, rock_y+1].join()] = true;
			break;
	}
	// renderMap(map, cur_y);
}
console.log(cur_y-1);