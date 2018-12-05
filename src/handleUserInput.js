const extractUserInput = function(userInputForHead) {
  let dataForSlicing = {};
  dataForSlicing.filePaths = [];
  let substrIndex = 1;
  let numberOfLines = 10;
  let fileReaderIndex = 0;

  if(userInputForHead[0].match(/^-n[0-9]/)) {
    substrIndex = 2;
    fileReaderIndex = 1;
  }

  if(userInputForHead[0].match(/^-/)) {
    numberOfLines = +userInputForHead[0].substr(substrIndex,);
  }
  
  dataForSlicing.numberOfLines = numberOfLines;

  if(userInputForHead[0] === '-n') {
    dataForSlicing.numberOfLines = +userInputForHead[1];
    fileReaderIndex = 3;
  }
  
  for(; fileReaderIndex <= userInputForHead.length-1; fileReaderIndex++) {
    dataForSlicing.filePaths.push(userInputForHead[fileReaderIndex]);
  }
  return dataForSlicing;
}

module.exports = {extractUserInput};
