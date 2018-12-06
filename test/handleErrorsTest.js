const {handleIllegalCount} = require('../src/handleErrors.js');
const assert = require('assert');

describe('handleIllegalCount', function() {
  it('should return error object with errorOccured set to 1 and an error message when given optionValue as 0', function() {
    let expectedOutput = {occured: 1, message:'head: illegal line count -- 0'};
    let actualOutput = handleIllegalCount(0, '-n');
    assert.deepEqual(expectedOutput, actualOutput);
  });
});
