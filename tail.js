/* 
  Usage:
  node ./tail.js file1
  node ./tail.js -n5 file1
  node ./tail.js -n 5 file1
  node ./tail.js -5 file1
  node ./tail.js file1 file2
  node ./tail.js -n 5 file1 file2
  node ./tail.js -n5 file1 file2
  node ./tail.js -5 file1 file2 
  node ./tail.js -c5 file1
  node ./tail.js -c 5 file1
  node ./tail.js -c5 file1 file2
  node ./tail.js -c 5 file1 file2
*/

const { extractUserInput } = require("./src/handleUserInput.js");
const {getContents} = require('./src/library.js');
const fs = require("fs");

const main = function(userInputForHead) {
  let tailPrerequisites = extractUserInput(userInputForHead);
  tailPrerequisites.action = 'tail';
  let contents = getContents(fs, tailPrerequisites);
  console.log(contents);
};

main(process.argv.slice(2));