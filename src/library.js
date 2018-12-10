const {
  createReducer,
  sliceTopByLines,
  sliceTopByCharacters
} = require("./util.js");
const {
  handleMissingFile,
  handleErrors,
  handleIllegalCount
} = require("./handleErrors.js");

const isOptionForBytes = option => option === "-c";
const isOnlyOneFile = numberOfFiles => numberOfFiles === 1;
const headForMultipleFiles = function(fs, sliceTopContents, headPrerequisites) {
  let reducer = createReducer(
    fs,
    sliceTopContents,
    headPrerequisites.range
  );
  return headPrerequisites.filePaths.reduce(reducer, "");
};

const getContents = function(fs, headPrerequisites) {
  let numberOfFiles = headPrerequisites.filePaths.length;
  let { filePaths, optionValue, option, action } = headPrerequisites;
  let result = "";
  let sliceTopContents = sliceTopByLines;

  let error = handleErrors(headPrerequisites);
  if (error.occured) {
    return error.message;
  }
  
  let range = [0, optionValue];
  if (action === 'tail') {
    range = [-optionValue];
  }
  headPrerequisites.range = range;

  if (isOptionForBytes(option)) {
    sliceTopContents = sliceTopByCharacters;
  }

  if (isOnlyOneFile(numberOfFiles)) {
    result = sliceTopContents(fs, range, filePaths[0]);
    return result;
  }

  result = headForMultipleFiles(fs, sliceTopContents, headPrerequisites);
  return result;
};

module.exports = { getContents };
