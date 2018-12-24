const { createReducer, readFile } = require('../util/util.js');

const { sliceByLine, sliceByCharacter } = require('../util/stringUtility');

const { handleErrors } = require('./handleErrors.js');

const isRangeZero = range => range[0] === 0;
const isActionTail = action => action === 'tail';
const isTailRangeZero = (range, action) =>
  isRangeZero(range) && isActionTail(action);

const isOnlyOneFile = numberOfFiles => numberOfFiles === 1;

const getContentsSlicer = function(option) {
  if (option === '-n') {
    return sliceByLine;
  }
  return sliceByCharacter;
};

const getRange = function(optionValue, action) {
  let range = { head: [0, optionValue], tail: [-Math.abs(optionValue)] };
  return range[action];
};

const actionForMultipleFiles = function(fs, sliceContents, prerequisites) {
  let reducer = createReducer(fs, sliceContents, prerequisites);
  return prerequisites.filePaths.reduce(reducer, '');
};

const actionForSingleFile = function(fs, sliceContents, prerequisites) {
  let { filePaths, action, range } = prerequisites;
  let fileData = readFile(fs, filePaths[0], action);
  if (
    fileData ===
    action + ': ' + filePaths[0] + ': ' + 'No such file or directory'
  ) {
    return fileData;
  }
  let result = sliceContents(fileData, range);
  return result;
};

const getContents = function(fs, prerequisites) {
  let { filePaths, optionValue, option, action } = prerequisites;
  let numberOfFiles = filePaths.length;

  let error = handleErrors(prerequisites);
  if (error.occured) {
    return error.message;
  }

  prerequisites.range = getRange(optionValue, action);
  let sliceContents = getContentsSlicer(option);

  if (isTailRangeZero(prerequisites.range, action)) {
    return '';
  }

  if (isOnlyOneFile(numberOfFiles)) {
    return actionForSingleFile(fs, sliceContents, prerequisites);
  }

  return actionForMultipleFiles(fs, sliceContents, prerequisites);
};

module.exports = { getContents, getContentsSlicer };
