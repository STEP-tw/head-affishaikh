const { extractUserInput } = require("./src/lib/handleUserInput.js");
const {getContents} = require('./src/lib/lib.js');
const fs = require("fs");

const main = function(userInputForHead) {
  let tailPrerequisites = extractUserInput(userInputForHead);
  tailPrerequisites.action = 'tail';
  let contents = getContents(fs, tailPrerequisites);
  console.log(contents);
};

main(process.argv.slice(2));