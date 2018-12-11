const {
  createReducer,
  sliceContentsByLines,
  sliceContentsByCharacters
} = require("./util.js");
const {
  handleErrors
} = require("./handleErrors.js");

const isOptionForBytes = option => option === "-c";
const isOnlyOneFile = numberOfFiles => numberOfFiles === 1;
const getRange = function(optionValue, action) {
  let range = {'head': [0, optionValue], 'tail': [-Math.abs(optionValue)]};
  return range[action];
}

const headForMultipleFiles = function(fs, sliceContents, prerequisites) {
  let reducer = createReducer(
    fs,
    sliceContents,
    prerequisites
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
  
  let range = getRange(optionValue, action);
  prerequisites.range = range;

  if (isOptionForBytes(option)) {
    sliceContents = sliceContentsByCharacters;
  }

  if (isOnlyOneFile(numberOfFiles)) {
    result = sliceContents(fs, filePaths[0], prerequisites);
    return result;
  }

  result = headForMultipleFiles(fs, sliceContents, prerequisites);
  return result;
};

module.exports = { getContents };