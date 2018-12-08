const { optionExtractor } = require("./util.js");

const isOptionAndValueAttached = (option, regex) => option.match(regex);

const getSubstrIndex = function(option, regex) {
  let substrIndex = 1;
  if (isOptionAndValueAttached(option, regex)) {
    substrIndex = 2;
  }
  return substrIndex;
};

const isOptionValueGiven = option => option.match(/^-/);
const isOptionSeparateFromValue = (userArg, option) => userArg === option;

const getOptionValue = function(userArg, option, substrIndex) {
  let optionValue = 10;
  if (isOptionValueGiven(userArg[0])) {
    optionValue = userArg[0].substr(substrIndex);
  }
  if (isOptionSeparateFromValue(userArg[0], option)) {
    optionValue = userArg[1];
  }
  return optionValue;
};

const getFileReaderIndex = function(userArg, option) {
  let fileReaderIndex = 0;
  if (isOptionValueGiven(userArg[0])) {
    fileReaderIndex = 1;
  }
  if (isOptionSeparateFromValue(userArg[0], option)) {
    fileReaderIndex = 2;
  }
  return fileReaderIndex;
};

const extractUserInput = function(userInput) {
  let headPrerequisites = {};
  let filePaths = [];
  let option = optionExtractor(userInput[0]);
  let regex = "^" + option + "[0-9]";
  regex = new RegExp(regex);
  let substrIndex = getSubstrIndex(userInput[0], regex);
  let optionValue = getOptionValue(userInput, option, substrIndex);
  let fileReaderIndex = getFileReaderIndex(userInput, option);
  filePaths = userInput.slice(fileReaderIndex);
  headPrerequisites = { filePaths, optionValue, option };
  return headPrerequisites;
};

module.exports = { extractUserInput };
