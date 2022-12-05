const _ = require('lodash');
const utils = require('../utils');

// build starting stacks
var inputArray = utils.fileReader("2022/day_5_start.txt");
const stacks = {};
for (var i=1; i<=9; i++) {
	stacks[i] = [];
}
for (var i in inputArray) {
	var line = inputArray[i].trim();
	var counter = 1;
	for (var j = 1; j < line.length; j = j+4) {
		if (line[j] != ' ') stacks[counter].push(line[j]);
		counter++;
	}
}
for (var i=1; i<=9; i++) {
	stacks[i].reverse();
}

// parse instructions (#, from, to)
var inputArray = utils.fileReader("2022/day_5_instructions.txt");
const instructionSet = [];
for (var i in inputArray) {
	const numbers = inputArray[i].trim().replace(/\D/g, "").split('');
	const instructions = [];
	if (numbers.length == 3) {
		instructions.push(numbers[0]*1);
		instructions.push(numbers[1]*1);
		instructions.push(numbers[2]*1);
	} else {
		instructions.push((numbers[0]+numbers[1])*1);
		instructions.push(numbers[2]*1);
		instructions.push(numbers[3]*1);
	}
	instructionSet.push(instructions);
}

// run instruction set (9000)
const p1Stacks = _.cloneDeep(stacks);
for (var i in instructionSet) {
	const instructions = instructionSet[i]; 
	for (var j = 1; j <= instructions[0]; j++) {
		p1Stacks[instructions[2]].push(p1Stacks[instructions[1]].pop());
	}
}

// p1 ans
const p1 = [];
for (var i=1; i<=9; i++) {
	p1.push(p1Stacks[i][p1Stacks[i].length-1]);
}
console.log(p1.join());

// run instruction set (9001)
const p2Stacks = _.cloneDeep(stacks);
for (var i in instructionSet) {
	const instructions = instructionSet[i];
	const items = p2Stacks[instructions[1]].slice(instructions[0]*-1);
	for (var j = 1; j <= instructions[0]; j++) {
		p2Stacks[instructions[1]].pop();
	}
	for (var j in items) {
		p2Stacks[instructions[2]].push(items[j]);
	}
}

// p2 ans
const p2 = [];
for (var i=1; i<=9; i++) {
	p2.push(p2Stacks[i][p2Stacks[i].length-1]);
}
console.log(p2.join());