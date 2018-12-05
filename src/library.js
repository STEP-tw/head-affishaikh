const {createReducer} = require('./util.js');

const getHeadContents = function(readFileSync, headPrerequisites) {
  let numberOfFiles = headPrerequisites.filePaths.length;
  let numberOfLines = headPrerequisites.numberOfLines;
  let filePaths = headPrerequisites.filePaths;
  let result = '';

  if(numberOfFiles === 1) {
    let splittedContents = readFileSync(filePaths[0], 'utf8').split('\n');
    result = splittedContents.slice(0,numberOfLines).join('\n');
    return result;
  }

  let reducer = createReducer(readFileSync, numberOfLines);
  result = filePaths.reduce(reducer,'');
  return result; 
}

module.exports = {getHeadContents};
