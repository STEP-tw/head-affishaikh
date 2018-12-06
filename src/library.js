const {createReducer, sliceTopByLines, sliceTopByCharacters} = require('./util.js');

const getHeadContents = function(readFileSync, headPrerequisites) {
  let numberOfFiles = headPrerequisites.filePaths.length;
  let {filePaths, optionValue, option} = headPrerequisites;
  let result = '';
  let sliceTopContents = sliceTopByLines;

  if(option === '-c') {
    sliceTopContents = sliceTopByCharacters;
  }

  if(numberOfFiles === 1) {
    result = sliceTopContents(readFileSync, optionValue, filePaths[0]);
    return result;
  }

  let reducer = createReducer(readFileSync, sliceTopContents, optionValue);
  result = filePaths.reduce(reducer,'');
  return result; 
}

module.exports = {getHeadContents};
