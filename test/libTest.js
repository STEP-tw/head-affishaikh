const {sliceContents} = require('../src/library.js');
const assert = require('assert');

const readFileSync = function(filePath, encoding) {
  return this[filePath];
}

const fs = {
  './testData/testFile1' : 'Hello\nHello\nHello\nHello\nHello\nHello\nHello\nHello\nHello\nHello',
  readFileSync : readFileSync
}

describe('sliceContents', function() {
  it('should return a string of ten lines when given reader object and filename', function() {
    let expectedOutput = fs.readFileSync('./testData/testFile1','utf8');
    let actualOutput = sliceContents(fs, './testData/testFile1');
    assert.equal(actualOutput, expectedOutput);
  });
});
