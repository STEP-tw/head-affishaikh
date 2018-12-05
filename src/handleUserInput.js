const extractUserInput = function(userInputForHead) {
  let dataForSlicing = {};
  dataForSlicing.filePaths = [];
  let substrIndex = 1;
  let numberOfLines = 10;
  let fileReaderIndex = 0;

  if(userInputForHead[0].match(/^-n[0-9]/)) {
    substrIndex = 2;
    fileReaderIndex = 1;
    numberOfLines = +userInputForHead[0].substr(substrIndex,);
  }

  if(userInputForHead[0].match(/^-[0-9]/)) {
    numberOfLines = +userInputForHead[0].substr(substrIndex,);
    fileReaderIndex = 1;
  }
  
  dataForSlicing.numberOfLines = numberOfLines;

  if(userInputForHead[0] === '-n') {
    dataForSlicing.numberOfLines = +userInputForHead[1];
    fileReaderIndex = 2;
  }
  
  for(; fileReaderIndex <= userInputForHead.length-1; fileReaderIndex++) {
    dataForSlicing.filePaths.push(userInputForHead[fileReaderIndex]);
  }
  return dataForSlicing;
}

module.exports = {extractUserInput};
