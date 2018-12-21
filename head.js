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