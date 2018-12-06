const {handleMissingFile} = require('./handleErrors.js');

const sliceTopByLines = function(fs, optionValue, filePath) {
  let {readFileSync, existsSync} = fs;

  let error = handleMissingFile(existsSync, filePath);
  if(error.occured) {
    return error.message;
  }

  let result = readFileSync(filePath, 'utf8').split('\n');   
  result = result.slice(0, optionValue).join('\n');
  return result;
}

const sliceTopByCharacters = function(fs, optionValue, filePath) {
  let {readFileSync} = fs;
  let result = readFileSync(filePath, 'utf8').substr(0,optionValue);
  return result;
}

const createReducer = function(fs, sliceTopContents, optionValue) {
  let delimeter = '';
  return function(result, filePath) {
    let slicedContents = sliceTopContents(fs, optionValue, filePath);
    let heading = '==> '+ filePath + ' <==\n'
    result = result + delimeter + heading; 
    result = result + slicedContents; 
    delimeter = '\n';
    return result;
  }
}

const optionExtractor = function(option) {
  let extractedOption = '-n'; 
  if(option.match(/^-c/)) {
    extractedOption = '-c';
  }
  return extractedOption;
}

module.exports = {createReducer, optionExtractor, sliceTopByLines, sliceTopByCharacters};
