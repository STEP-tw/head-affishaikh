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

const {getHeadContents} = require('./src/library.js');
const {extractUserInput} = require('./src/handleUserInput.js');
const {handleErrors} = require('./src/handleErrors');
const {readFileSync, existsSync} = require('fs');

const main = function(userInputForHead) {
  let headPrerequisites = extractUserInput(userInputForHead);
  let error = handleErrors(headPrerequisites, existsSync); 
  let contents = getHeadContents(readFileSync, headPrerequisites);
  console.log(contents);
}

main(process.argv.slice(2));
