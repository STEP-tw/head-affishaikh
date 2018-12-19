const {
  sliceDataByLine,
  sliceDataByCharacter
} = require('../src/stringUtility.js');
const assert = require('assert');

describe('sliceDataByLine', function() {
  it('should return 5 sliced lines of given string when given string and prerequisites', function() {
    let data = '1\n2\n3\n4\n5\n6\n7\n8\n9\n10';
    let prerequisites = {};
    prerequisites.range = [0, 5];
    let expectedOutput = '1\n2\n3\n4\n5';
    let actualOutput = sliceDataByLine(data, prerequisites.range);
    assert.deepEqual(actualOutput, expectedOutput);
  });
});
describe('sliceDataByCharacter', function() {
  it('should return 5 sliced characters of given string when given string and prerequisites', function() {
    let data = '1\n2\n3\n4\n5\n6\n7\n8\n9\n10';
    let prerequisites = {};
    prerequisites.range = [0, 5];
    let expectedOutput = '1\n2\n3';
    let actualOutput = sliceDataByCharacter(data, prerequisites.range);
    assert.deepEqual(actualOutput, expectedOutput);
  });
});
