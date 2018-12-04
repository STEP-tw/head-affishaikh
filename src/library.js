const sliceContents = function(fs, filePath, numberOfLines) {
  if(numberOfLines === undefined) {
    numberOfLines = 10;
  }

  let result = fs.readFileSync(filePath, 'utf8').split('\n').slice(0,numberOfLines).join('\n');
  return result;
}

module.exports = {sliceContents};
