const handleErrors = function(headPrerequisites) {
  let { filePaths, optionValue, option } = headPrerequisites;
  let error = handleIllegalCount(optionValue, option);
  return error;
};

const handleIllegalCount = function(optionValue, option) {
  let error = { occured: 0 };
  let errorOptions = { "-n": "line", "-c": "byte" };

  if (optionValue <= 0 || isNaN(optionValue)) {
    error.occured = 1;
    error.message =
      "head: illegal " + errorOptions[option] + " count -- " + optionValue;
  }
  return error;
};

const handleMissingFile = function(existsSync, fileName) {
  let doesExist = existsSync(fileName);
  let error = { occured: 0 };
  if (!doesExist) {
    error.occured = 1;
    error.message = "head: " + fileName + ": No such file or directory";
  }
  return error;
};

module.exports = { handleErrors, handleIllegalCount, handleMissingFile };
