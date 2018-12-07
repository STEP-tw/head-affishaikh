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
    headPrerequisites.optionValue
  );
  return headPrerequisites.filePaths.reduce(reducer, "");
};

const getHeadContents = function(fs, headPrerequisites) {
  let numberOfFiles = headPrerequisites.filePaths.length;
  let { filePaths, optionValue, option } = headPrerequisites;
  let result = "";
  let sliceTopContents = sliceTopByLines;

  let error = handleErrors(headPrerequisites);
  if (error.occured) {
    return error.message;
  }

  if (isOptionForBytes(option)) {
    sliceTopContents = sliceTopByCharacters;
  }

  if (isOnlyOneFile(numberOfFiles)) {
    result = sliceTopContents(fs, optionValue, filePaths[0]);
    return result;
  }

  result = headForMultipleFiles(fs, sliceTopContents, headPrerequisites);
  return result;
};

module.exports = { getHeadContents };
