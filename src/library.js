const sliceContents = function(fs, dataForSlicing) {
  let filePath = dataForSlicing.fileNames[0]
  let numberOfLines = dataForSlicing.numberOfLines;
  let result = fs.readFileSync(filePath, 'utf8').split('\n').slice(0,numberOfLines).join('\n');
  return result;
}

module.exports = {sliceContents};
