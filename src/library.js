const sliceContents = function(fs, filePath) {
  let result = fs.readFileSync(filePath, 'utf8');
  return result;
}

module.exports = {sliceContents};
