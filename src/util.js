const { handleMissingFile } = require("./handleErrors.js");

const sliceTopByLines = function(fs, range, filePath) {
  let { readFileSync, existsSync } = fs;

  let error = handleMissingFile(existsSync, filePath);
  if (error.occured) {
    return error.message;
  }

  let result = readFileSync(filePath, "utf8").split("\n");
  result = result.slice(range[0], range[1]).join("\n");
  return result;
};

const sliceTopByCharacters = function(fs, range, filePath) {
  let { readFileSync, existsSync } = fs;

  let error = handleMissingFile(existsSync, filePath);
  if (error.occured) {
    return error.message;
  }

  let result = readFileSync(filePath, "utf8").substr(range[0], range[1]);
  return result;
};

const createReducer = function(fs, sliceTopContents, range) {
  let delimeter = "";
  return function(result, filePath) {
    let heading = "==> " + filePath + " <==\n";
    let slicedContents = sliceTopContents(fs, range, filePath);
    if (
      slicedContents ===
      "head: " + filePath + ": No such file or directory"
    ) {
      heading = "";
    }
    result = result + delimeter + heading;
    result = result + slicedContents;
    delimeter = "\n";
    return result;
  };
};

const optionExtractor = function(option) {
  let extractedOption = "-n";
  if (option.match(/^-c/)) {
    extractedOption = "-c";
  }
  return extractedOption;
};

module.exports = {
  createReducer,
  optionExtractor,
  sliceTopByLines,
  sliceTopByCharacters
};
