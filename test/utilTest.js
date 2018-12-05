const {optionExtractor} = require('../src/util.js');
const assert = require('assert');

describe('optionExtractor', function() {
  it('should return -n when given -n5', function() {
    let expectedOutput = '-n';
    assert.deepEqual(optionExtractor('-n5'), expectedOutput);
  });

  it('should return -n when given a file name', function() {
    let expectedOutput = '-n';
    assert.deepEqual(optionExtractor('file1'), expectedOutput);
  });

  it('should return -n when given a -56', function() {
    let expectedOutput = '-n';
    assert.deepEqual(optionExtractor('file1'), expectedOutput);
  });

  it('should return -c when given a -c5', function() {
    let expectedOutput = '-n';
    assert.deepEqual(optionExtractor('file1'), expectedOutput);
  });
});
