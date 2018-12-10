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
const fs = require("fs");

const main = function(userInputForHead) {
  let tailPrerequisites = extractUserInput(userInputForHead);
  // let contents = getHeadContents(fs, headPrerequisites);
  console.log(tailPrerequisites);
};

main(process.argv.slice(2));

