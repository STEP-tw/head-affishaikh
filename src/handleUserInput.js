const extractUserInput = function(userInputForHead) {
  let dataForSlicing = {};
  dataForSlicing.filePaths = [];
  let substrIndex = 1;
  let numberOfLines = 10;
  let fileReaderIndex = 0;

  if(userInputForHead[0].match(/^-n[0-9]/)) {
    substrIndex = 2;
  }

  if(userInputForHead[0].match(/^-/)) {
    numberOfLines = +userInputForHead[0].substr(substrIndex);
    fileReaderIndex = 1;
  }
  
  if(userInputForHead[0] === '-n') {
    numberOfLines = +userInputForHead[1];
    fileReaderIndex = 2;
  }
  
  dataForSlicing.numberOfLines = numberOfLines;
  dataForSlicing.filePaths = userInputForHead.slice(fileReaderIndex);
  return dataForSlicing;
}

module.exports = {extractUserInput};
