const {createReducer, sliceTopByLines, sliceTopByCharacters} = require('./util.js');
const {handleMissingFile, handleErrors, handleIllegalCount} = require('./handleErrors.js');

const getHeadContents = function(fs, headPrerequisites) {
  let {readFileSync, existsSync} = fs;
  let numberOfFiles = headPrerequisites.filePaths.length;
  let {filePaths, optionValue, option} = headPrerequisites;
  let result = '';
  let sliceTopContents = sliceTopByLines;
  let error = handleErrors(headPrerequisites);

  if(error.occured) {
    return error.message;
  }

  if(option === '-c') {
    sliceTopContents = sliceTopByCharacters;
  }

  if(numberOfFiles === 1) {
    error = handleMissingFile(existsSync, filePaths[0]);
    if(error.occured) {
      return error.message;
    }
    result = sliceTopContents(readFileSync, optionValue, filePaths[0]);
    return result;
  }

  let reducer = createReducer(readFileSync, sliceTopContents, optionValue);
  result = filePaths.reduce(reducer,'');
  return result; 
}

module.exports = {getHeadContents};
