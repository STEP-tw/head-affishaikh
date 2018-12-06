const handleErrors = function(headPrerequisites) {
  let {filePaths, optionValue, option} = headPrerequisites;
  let illegalCountError = handleIllegalCount(optionValue, option);   
  if(illegalCountError.occured) {
    console.log(illegalCountError.message);
    process.exit(0);
  }
}

const handleIllegalCount = function(optionValue, option) {
  let error = {occured: 0}; 
  let errorOptions = {'-n' : 'line', '-c' : 'byte'};

  if(optionValue <= 0) {
    error.occured = 1;
    error.message = 'head: illegal '+ errorOptions[option] + ' count -- '+optionValue;
  }
  return error;
}

module.exports = {handleErrors, handleIllegalCount};
