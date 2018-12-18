const { handleMissingFile } = require('./handleErrors.js');

const readFile = function(fs, filePath, prerequisites) {
  let { readFileSync, existsSync } = fs;

  let error = handleMissingFile(existsSync, filePath, prerequisites);
  if (error.occured) {
    return error.message;
  }

  let result = readFileSync(filePath, 'utf8');
  return result;
};

const createReducer = function(fs, sliceContents, prerequisites) {
  let delimeter = '';
  return function(result, filePath) {
    let { action } = prerequisites;
    let fileExists = true;
    let heading = '==> ' + filePath + ' <==\n';
    let fileData = readFile(fs, filePath, prerequisites);
    if (fileData === action + ': ' + filePath + ': No such file or directory') {
      fileExists = false;
      heading = '';
    }
    let slicedData = fileData;
    if (fileExists) {
      slicedData = sliceContents(fileData, prerequisites);
    }
    result = result + delimeter + heading;
    result = result + slicedData;
    delimeter = '\n';
    return result;
  };
};

module.exports = {
  createReducer,
  readFile
};
