const {handleIllegalCount} = require('../src/handleErrors.js');
const assert = require('assert');

describe('handleIllegalCount', function() {
  it('should return error object with errorOccured set to 1 and an error message for line when given optionValue as 0 and option as -n', function() {
    let expectedOutput = {occured: 1, message:'head: illegal line count -- 0'};
    let actualOutput = handleIllegalCount(0, '-n');
    assert.deepEqual(expectedOutput, actualOutput);
  });

  it('should return error object with errorOccured set to 1 and an error message for byte when given optionValue as 0and option as -c', function() {
    let expectedOutput = {occured: 1, message:'head: illegal byte count -- 0'};
    let actualOutput = handleIllegalCount(0, '-c');
    assert.deepEqual(expectedOutput, actualOutput);
  });
});
