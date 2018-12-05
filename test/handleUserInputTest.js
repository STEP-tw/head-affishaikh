const {extractUserInput} = require('../src/handleUserInput.js');
const assert = require('assert');

describe('extractUserInput', function() {
  it('should return an object of 1 filepath and 10 numberOfLines when given only one file', function() {
  let expectedOutput = {'filePaths' : ['file1'], 'numberOfLines' : 10}; 
  let actualOutput = extractUserInput(['file1']);
  assert.deepEqual(expectedOutput, actualOutput);
  });

  it('should return an object of 1 filepath and 5 numberOfLines when given only one file and -n5', function() {
  let expectedOutput = {'filePaths' : ['file1'], 'numberOfLines' : 5}; 
  let actualOutput = extractUserInput(['-n5','file1']);
  assert.deepEqual(expectedOutput, actualOutput);
  });

  it('should return an object of 2 filepath and 5 numberOfLines when given two files and -n5', function() {
  let expectedOutput = {'filePaths' : ['file1','file2'], 'numberOfLines' : 5}; 
  let actualOutput = extractUserInput(['-n5','file1','file2']);
  assert.deepEqual(expectedOutput, actualOutput);
  });

  it('should return an object of 2 filepath and 5 numberOfLines when given two files and -n 5', function() {
  let expectedOutput = {'filePaths' : ['file1','file2'], 'numberOfLines' : 5}; 
  let actualOutput = extractUserInput(['-n', '5','file1','file2']);
  assert.deepEqual(expectedOutput, actualOutput);
  });

  it('should return an object of 2 filepaths and 5 numberOfLines when given two files and -5', function() {
  let expectedOutput = {'filePaths' : ['file1','file2'], 'numberOfLines' : 5}; 
  let actualOutput = extractUserInput(['-5','file1','file2']);
  assert.deepEqual(expectedOutput, actualOutput);
  });

  it('should return an object of 2 filepaths and 10 numberOfLines when given two files', function() {
  let expectedOutput = {'filePaths' : ['file1','file2'], 'numberOfLines' : 5}; 
  let actualOutput = extractUserInput(['-5','file1','file2']);
  assert.deepEqual(expectedOutput, actualOutput);
  });
});
