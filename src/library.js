const {createReducer, sliceLines, sliceCharacters} = require('./util.js');

const getHeadContents = function(readFileSync, headPrerequisites) {
  let numberOfFiles = headPrerequisites.filePaths.length;
  let optionValue = headPrerequisites.optionValue;
  let filePaths = headPrerequisites.filePaths;
  let option = headPrerequisites.option;
  let sliceContents = sliceLines;
  let result = '';

  if(option === '-c') {
    sliceContents = sliceCharacters;
  }

  if(numberOfFiles === 1) {
    result = sliceContents(readFileSync, optionValue, filePaths[0]);
    return result;
  }

  let reducer = createReducer(readFileSync, sliceContents, optionValue);
  result = filePaths.reduce(reducer,'');
  return result; 
}

module.exports = {getHeadContents};
