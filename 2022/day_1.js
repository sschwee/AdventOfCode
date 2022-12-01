const _ = require('lodash');
const utils = require('../utils');

var inputArray = utils.fileReader("2022/day_1.txt");
var elfArray = [];
var temp = [];
for (var i in inputArray) {
    if (inputArray[i] == '') {
        elfArray.push(temp);
        temp = [];
        continue;
    }
    temp.push(inputArray[i]*1);
}
var maxArray = [];
for (var i in elfArray) {
    maxArray.push(_.sum(elfArray[i]));
}
maxArray.sort(function(a, b){return b-a});
console.log(maxArray[0]);
console.log(maxArray[0]+maxArray[1]+maxArray[2]);