const {optionExtractor} = require('./util.js');

const extractUserInput = function(userInput) {
  let headPrerequisites = {};
  let filePaths = [];
  let substrIndex = 1;
  let optionValue = 10;
  let fileReaderIndex = 0;
  let option = optionExtractor(userInput[0]);
  let regex = '^'+option+'[0-9]';
  regex = new RegExp(regex);

  if(userInput[0].match(regex)) {
    substrIndex = 2;
  }

  if(userInput[0].match(/^-/)) {
    optionValue = userInput[0].substr(substrIndex);
    fileReaderIndex = 1;
  }
  
  if(userInput[0] === option) {
    optionValue = userInput[1];
    fileReaderIndex = 2;
  }
  
  filePaths = userInput.slice(fileReaderIndex);
  headPrerequisites = {filePaths, optionValue, option};
  return headPrerequisites;
}

module.exports = {extractUserInput};
