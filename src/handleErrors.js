const isActionHead = action => action === 'head'
const handleErrors = function(headPrerequisites) {
  let { optionValue, option, action } = headPrerequisites;
  if (isActionHead(action)) {
    return handleHeadIllegalCount(optionValue, option);
  }
  return handleTailIllegalOffset(optionValue);
};

const isZeroOrNegative = optionValue => optionValue <= 0
const isOptionValueIllegal = optionValue => isZeroOrNegative(optionValue) || isNaN(optionValue)

const handleHeadIllegalCount = function(optionValue, option) {
  let error = { occured: 0 };
  let errorOptions = { "-n": "line", "-c": "byte" };

  if (isOptionValueIllegal(optionValue)) {
    error.occured = 1;
    error.message =
      "head: illegal " + errorOptions[option] + " count -- " + optionValue;
  }
  return error;
};

const handleTailIllegalOffset = function(optionValue) {
  let error = { occured: 0 };

  if (isNaN(optionValue)) {
    error.occured = 1;
    error.message = "tail: illegal offset -- " + optionValue;
  }
  return error;
};

const handleMissingFile = function(existsSync, fileName, prerequisites) {
  let doesExist = existsSync(fileName);
  let { action } = prerequisites;
  let error = { occured: 0 };
  if (!doesExist) {
    error.occured = 1;
    error.message = action + ": " + fileName + ": No such file or directory";
  }
  return error;
};

module.exports = {
  handleErrors,
  handleHeadIllegalCount,
  handleMissingFile,
  handleTailIllegalOffset
};
