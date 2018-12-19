const sliceBy = function(data, range, delimiter) {
  return data.split(delimiter).slice(range[0],range[1]).join(delimiter);
}

const sliceDataByLine = function(data, range) {
  return sliceBy(data, range, '\n');
}

const sliceDataByCharacter = function(data, range) {
  return sliceBy(data, range, '');
};

module.exports = { sliceDataByLine, sliceDataByCharacter };