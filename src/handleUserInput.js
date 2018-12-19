const { optionExtractor } = require('./parseUtility.js');

const isOptionAttachedWithValue = (option, regex) => option.match(regex);

const getSubstrIndex = function(option, regex) {
  let substrIndex = 1;
  if (isOptionAttachedWithValue(option, regex)) {
    substrIndex = 2;
  }
  return substrIndex;
};

const isOptionValueGiven = option => option.match(/^-/);
const isOptionSeparateFromValue = (mixedOption, option) =>
  mixedOption === option;

const getOptionValue = function(mixedOptionAndValue, option, substrIndex) {
  let optionValue = 10;
  if (isOptionValueGiven(mixedOptionAndValue[0])) {
    optionValue = mixedOptionAndValue[0].substr(substrIndex);
  }
  if (isOptionSeparateFromValue(mixedOptionAndValue[0], option)) {
    optionValue = mixedOptionAndValue[1];
  }
  return optionValue;
};

const getFileReaderIndex = function(mixedOption, option) {
  let fileReaderIndex = 0;
  if (isOptionValueGiven(mixedOption)) {
    fileReaderIndex = 1;
  }
  if (isOptionSeparateFromValue(mixedOption, option)) {
    fileReaderIndex = 2;
  }
  return fileReaderIndex;
};

const extractUserInput = function(userInput) {
  let prerequisites = {};
  let filePaths = [];
  let option = optionExtractor(userInput[0]);
  let regex = '^' + option + '[-0-9]';
  regex = new RegExp(regex);
  let substrIndex = getSubstrIndex(userInput[0], regex);
  let optionValue = getOptionValue(userInput.slice(0, 2), option, substrIndex);
  let fileReaderIndex = getFileReaderIndex(userInput[0], option);
  filePaths = userInput.slice(fileReaderIndex);
  prerequisites = { filePaths, optionValue, option };
  return prerequisites;
};

module.exports = { extractUserInput };
