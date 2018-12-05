const {optionExtractor} = require('./util.js');

const extractUserInput = function(userInputForHead) {
  let headPrerequisites = {};
  headPrerequisites.filePaths = [];
  let substrIndex = 1;
  let optionValue = 10;
  let fileReaderIndex = 0;
  let option = optionExtractor(userInputForHead[0]);
  let regex = '^'+option+'[0-9]';
  regex = new RegExp(regex);

  if(userInputForHead[0].match(regex)) {
    substrIndex = 2;
  }

  if(userInputForHead[0].match(/^-/)) {
    optionValue = +userInputForHead[0].substr(substrIndex);
    fileReaderIndex = 1;
  }
  
  if(userInputForHead[0] === option) {
    optionValue = +userInputForHead[1];
    fileReaderIndex = 2;
  }
  
  headPrerequisites.optionValue = optionValue;
  headPrerequisites.filePaths = userInputForHead.slice(fileReaderIndex);
  headPrerequisites.option = option;
  return headPrerequisites;
}

module.exports = {extractUserInput};
