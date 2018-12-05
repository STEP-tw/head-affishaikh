const createReducer = function(readFileSync, numberOfLines) {
  let delimeter = '';
  return function(result, filePath) {
    result = result + delimeter + '==> '+ filePath + ' <==\n';
    let splittedContents = readFileSync(filePath, 'utf8').split('\n'); 
    result = result + splittedContents.slice(0,numberOfLines).join('\n');
    delimeter = '\n\n';
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

module.exports = {createReducer, optionExtractor};
