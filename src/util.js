const createReducer = function(readFileSync, numberOfLines) {
  let delimeter = '';
  return function(result, filePath) {
    result = result + delimeter + '==> '+ filePath + ' <==\n';
    result = result + readFileSync(filePath, 'utf8').split('\n').slice(0,numberOfLines).join('\n');
    delimeter = '\n\n';
    return result;
  }
}

module.exports = {createReducer};
