const {
  createReducer,
  sliceContentsByLines,
  sliceContentsByCharacters
} = require("./util.js");
const {
  handleMissingFile,
  handleErrors,
  handleIllegalCount
} = require("./handleErrors.js");

const isOptionForBytes = option => option === "-c";
const isOnlyOneFile = numberOfFiles => numberOfFiles === 1;
const headForMultipleFiles = function(fs, sliceContents, prerequisites) {
  let reducer = createReducer(
    fs,
    sliceContents,
    prerequisites.range
  );
  return prerequisites.filePaths.reduce(reducer, "");
};

const getContents = function(fs, prerequisites) {
  let numberOfFiles = prerequisites.filePaths.length;
  let { filePaths, optionValue, option, action } = prerequisites;
  let result = "";
  let sliceContents = sliceContentsByLines;

  let error = handleErrors(prerequisites);
  if (error.occured) {
    return error.message;
  }
  
  let range = [0, optionValue];
  if (action === 'tail') {
    range = [-optionValue];
  }
  prerequisites.range = range;

  if (isOptionForBytes(option)) {
    sliceContents = sliceContentsByCharacters;
  }

  if (isOnlyOneFile(numberOfFiles)) {
    result = sliceContents(fs, range, filePaths[0]);
    return result;
  }

  result = headForMultipleFiles(fs, sliceContents, prerequisites);
  return result;
};

module.exports = { getContents };
