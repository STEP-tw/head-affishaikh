const sliceContents = function(fs, dataForSlicing) {
  let numberOfFiles = dataForSlicing.filePaths.length;
  let numberOfLines = dataForSlicing.numberOfLines;
  let filePaths = dataForSlicing.filePaths;
  let delimeter = '';
  let result = '';
  if(numberOfFiles === 1) {
    result = result + fs.readFileSync(filePaths[0], 'utf8').split('\n').slice(0,numberOfLines).join('\n');
    return result;
  }

  for(let filePath of filePaths) {
    result = result + delimeter + '==> '+ filePath + ' <==\n';
    result = result + fs.readFileSync(filePath, 'utf8').split('\n').slice(0,numberOfLines).join('\n');
    delimeter = '\n\n';
  }
  return result;
}

module.exports = {sliceContents};
