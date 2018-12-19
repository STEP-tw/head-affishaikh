const { createReducer, readFile } = require("./util.js");

const { sliceDataByLine, sliceDataByCharacter } = require("./stringUtility.js");

const { handleErrors } = require("./handleErrors.js");

const isRangeZero = range => range[0] === 0;
const isActionTail = action => action === "tail";
const isTailRangeZero = (range, action) =>
  isRangeZero(range) && isActionTail(action);

const isOnlyOneFile = numberOfFiles => numberOfFiles === 1;

const getContentsSlicer = function(option) {
  let contentsSlicer = {
    "-n": sliceDataByLine,
    "-c": sliceDataByCharacter
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
  let { filePaths, optionValue, option, action } = prerequisites;
  let numberOfFiles = filePaths.length;

  let error = handleErrors(prerequisites);
  if (error.occured) {
    return error.message;
  }

  let range = getRange(optionValue, action);
  prerequisites.range = range;
  let sliceContents = getContentsSlicer(option);
  let fileData = "";

  if (isTailRangeZero(range, action)) {
    return "";
  }

  if (isOnlyOneFile(numberOfFiles)) {
    fileData = readFile(fs, filePaths[0], prerequisites);
    if (
      fileData ===
      action + ": " + filePaths[0] + ": " + "No such file or directory"
    ) {
      return fileData;
    }
    let result = sliceContents(fileData, prerequisites.range);
    return result;
  }

  result = actionForMultipleFiles(fs, sliceContents, prerequisites);
  return result;
};

module.exports = { getContents, getContentsSlicer };
