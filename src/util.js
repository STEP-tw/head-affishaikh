const sliceTopByLines = function(readFileSync, optionValue, filePath) {
  let result = readFileSync(filePath, 'utf8').split('\n');   
  result = result.slice(0, optionValue).join('\n');
  return result;
}

const sliceTopByCharacters = function(readFileSync, optionValue, filePath) {
  let result = readFileSync(filePath, 'utf8').substr(0,optionValue);
  return result;
}

const createReducer = function(readFileSync, sliceTopContents, optionValue) {
  let delimeter = '';
  return function(result, filePath) {
    result = result + delimeter + '==> '+ filePath + ' <==\n';
    let slicedContents = sliceTopContents(readFileSync, optionValue, filePath);
    result = result + slicedContents; 
    delimeter = '\n';
    if(sliceTopContents.name === 'sliceTopByLines') {delimeter = '\n\n'};
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
