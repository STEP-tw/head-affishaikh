const handleIllegalCount = function(optionValue, option) {
  let error = {occured: 0}; 
  if(optionValue <= 0) {
    error.occured = 1;
    error.message = 'head: illegal line count -- '+optionValue;
  }
  return error;
}

module.exports = {handleIllegalCount};
