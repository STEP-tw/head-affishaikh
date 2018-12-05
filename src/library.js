const getHeadContents = function(readFileSync, headPrerequisites) {
  let numberOfFiles = headPrerequisites.filePaths.length;
  let numberOfLines = headPrerequisites.numberOfLines;
  let filePaths = headPrerequisites.filePaths;
  let delimeter = '';
  let result = '';

  if(numberOfFiles === 1) {
    result = readFileSync(filePaths[0], 'utf8').split('\n').slice(0,numberOfLines).join('\n');
    return result;
  }

  for(let filePath of filePaths) {
    result = result + delimeter + '==> '+ filePath + ' <==\n';
    result = result + readFileSync(filePath, 'utf8').split('\n').slice(0,numberOfLines).join('\n');
    delimeter = '\n\n';
  }
  return result;
}

module.exports = {getHeadContents};
