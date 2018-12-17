const {
  createReducer,
  sliceContentsByLines,
  sliceContentsByCharacters
} = require("./util.js");
const { handleErrors } = require("./handleErrors.js");

const isOnlyOneFile = numberOfFiles => numberOfFiles === 1;

const getContentsSlicer = function(option) {
  let contentsSlicer = {
    "-n": sliceContentsByLines,
    "-c": sliceContentsByCharacters
  };
  return contentsSlicer[option];
};

const getRange = function(optionValue, action) {
  let range = { head: [0, optionValue], tail: [-Math.abs(optionValue)] };
  return range[action];
};

const actionForMultipleFiles = function(fs, sliceContents, prerequisites) {
  let reducer = createReducer(fs, sliceContents, prerequisites);
  return prerequisites.filePaths.reduce(reducer, "");
};

const getContents = function(fs, prerequisites) {
  let numberOfFiles = prerequisites.filePaths.length;
  let { filePaths, optionValue, option, action } = prerequisites;

  let error = handleErrors(prerequisites);
  if (error.occured) {
    return error.message;
  }

  let range = getRange(optionValue, action);
  prerequisites.range = range;
  let sliceContents = getContentsSlicer(option);

  if (isOnlyOneFile(numberOfFiles)) {
    result = sliceContents(fs, filePaths[0], prerequisites);
    return result;
  }

  result = actionForMultipleFiles(fs, sliceContents, prerequisites);
  return result;
};

module.exports = { getContents, getContentsSlicer };
