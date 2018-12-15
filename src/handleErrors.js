const handleErrors = function(headPrerequisites) {
  let { filePaths, optionValue, option, action } = headPrerequisites;
  let error = {};
  if (action === "head") {
    error = handleHeadIllegalCount(optionValue, option);
    return error;
  }
  return handleTailIllegalOffset(optionValue);
};

const handleHeadIllegalCount = function(optionValue, option) {
  let error = { occured: 0 };
  let errorOptions = { "-n": "line", "-c": "byte" };

  if (optionValue <= 0 || isNaN(optionValue)) {
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
