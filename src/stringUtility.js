const sliceDataByLine = function(data, prerequisites) {
  let { range } = prerequisites;
  return data
    .split('\n')
    .slice(range[0], range[1])
    .join('\n');
};

const sliceDataByCharacter = function(data, prerequisites) {
  let { range } = prerequisites;
  return data.substr(range[0], range[1]);
};

module.exports = { sliceDataByLine, sliceDataByCharacter };
