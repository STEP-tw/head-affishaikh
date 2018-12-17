const { handleMissingFile } = require("./handleErrors.js");

const isRangeZero = range => range[0] === 0;
const isActionTail = action => action === "tail";
const isTailRangeZero = (range, action) =>
  isRangeZero(range) && isActionTail(action);

const readFile = function(fs, filePath, prerequisites) {
  let { readFileSync, existsSync } = fs;

  let error = handleMissingFile(existsSync, filePath, prerequisites);
  if (error.occured) {
    return error.message;
  }

  let result = readFileSync(filePath, "utf8");
  return result;
};

const sliceContentsByLines = function(fs, filePath, prerequisites) {
  let { readFileSync, existsSync } = fs;
  let { range, action } = prerequisites;

  let error = handleMissingFile(existsSync, filePath, prerequisites);
  if (error.occured) {
    return error.message;
  }

  if (isTailRangeZero(range, action)) {
    return "";
  }

  let result = readFileSync(filePath, "utf8").split("\n");
  result = result.slice(range[0], range[1]).join("\n");
  return result;
};

const sliceContentsByCharacters = function(fs, filePath, prerequisites) {
  let { readFileSync, existsSync } = fs;
  let { range, action } = prerequisites;

  let error = handleMissingFile(existsSync, filePath, prerequisites);
  if (error.occured) {
    return error.message;
  }

  if (isTailRangeZero(range, action)) {
    return "";
  }

  let result = readFileSync(filePath, "utf8").substr(range[0], range[1]);
  return result;
};

const createReducer = function(fs, sliceContents, prerequisites) {
  let delimeter = "";
  return function(result, filePath) {
    let { action } = prerequisites;
    let heading = "==> " + filePath + " <==\n";
    let slicedContents = sliceContents(fs, filePath, prerequisites);
    if (
      slicedContents ===
      action + ": " + filePath + ": No such file or directory"
    ) {
      heading = "";
    }
    result = result + delimeter + heading;
    result = result + slicedContents;
    delimeter = "\n";
    return result;
  };
};

module.exports = {
  createReducer,
  sliceContentsByLines,
  sliceContentsByCharacters,
  readFile
};
