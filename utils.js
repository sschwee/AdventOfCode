const fileReader = (fileName) => {
	var fs = require('fs'),
    path = require('path'),    
    filePath = path.join(__dirname, fileName);
    return fs.readFileSync(filePath,'utf8').trim().split("\n");
}


module.exports = {
  fileReader
};