/* 
  Usage:
  node ./head.js file1
  node ./head.js -n5 file1
  node ./head.js -n 5 file1
  node ./head.js -5 file1
  node ./head.js file1 file2
  node ./head.js -n 5 file1 file2
  node ./head.js -n5 file1 file2
  node ./head.js -5 file1 file2 
  node ./head.js -c5 file1
  node ./head.js -c 5 file1
  node ./head.js -c5 file1 file2
  node ./head.js -c 5 file1 file2
*/

const { getContents } = require("./src/lib.js");
const { extractUserInput } = require("./src/handleUserInput.js");
const fs = require("fs");

const main = function(userInputForHead) {
  let headPrerequisites = extractUserInput(userInputForHead);
  headPrerequisites.action = 'head';
  let contents = getContents(fs, headPrerequisites);
  console.log(contents);
};

main(process.argv.slice(2));