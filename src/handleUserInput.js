const { optionExtractor } = require('./parseUtility.js');

const isOptionAttachedWithValue = (unextractedOption, regex) => unextractedOption.match(regex);

const getSubstrIndex = function(unextractedOption, regex) {
  let substrIndex = 1;
  if (isOptionAttachedWithValue(unextractedOption, regex)) {
    substrIndex = 2;
  }
  return substrIndex;
};

const isOptionValueProvided = unextractedOption => unextractedOption.match(/^-/);
const isOptionSeparateFromValue = (unextractedOption, option) =>
  unextractedOption === option;

const getOptionValue = function(unextractedOption, option, substrIndex) {
  let optionValue = 10;
  if (isOptionValueProvided(unextractedOption[0])) {
    optionValue = unextractedOption[0].substr(substrIndex);
  }
  if (isOptionSeparateFromValue(unextractedOption[0], option)) {
    optionValue = unextractedOption[1];
  }
  return optionValue;
};

const getFileReaderIndex = function(unextractedOption, option) {
  let fileReaderIndex = 0;
  if (isOptionValueProvided(unextractedOption)) {
    fileReaderIndex = 1;
  }
  if (isOptionSeparateFromValue(unextractedOption, option)) {
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
