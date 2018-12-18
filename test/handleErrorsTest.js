const {
  handleHeadIllegalCount,
  handleMissingFile,
  handleTailIllegalOffset
} = require('../src/handleErrors.js');
const assert = require('assert');

const exists = function(fileName) {
  let files = ['file1'];
  return files.includes(fileName);
};

describe('handleHeadIllegalCount', function() {
  describe('should return an error object when optionValue is not a natural number', function() {
    it('for lines', function() {
      let expectedOutput = {
        occured: true,
        message: 'head: illegal line count -- 0'
      };
      let actualOutput = handleHeadIllegalCount(0, '-n');
      assert.deepEqual(actualOutput, expectedOutput);
    });

    it('for bytes', function() {
      let expectedOutput = {
        occured: true,
        message: 'head: illegal byte count -- 0'
      };
      let actualOutput = handleHeadIllegalCount(0, '-c');
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
});

describe('handleMissingFile', function() {
  it('should return error object when given a missing file', function() {
    let expectedOutput = {
      occured: true,
      message: 'head: file2: No such file or directory'
    };
    let prerequisites = { action: 'head' };
    let actualOutput = handleMissingFile(exists, 'file2', prerequisites);
    assert.deepEqual(actualOutput, expectedOutput);
  });
});

describe('handleTailIllegalOffset', function() {
  it('should provide tail illegal offset error when given an illegal offset', function() {
    let expectedOutput = {
      occured: true,
      message: 'tail: illegal offset -- 5f'
    };
    let actualOutput = handleTailIllegalOffset('5f');
    assert.deepEqual(actualOutput, expectedOutput);
  });
});
