const { extractUserInput } = require('../src/handleUserInput.js');
const assert = require('assert');

describe('extractUserInput', function() {
  it('should return an object of 1 filepath and 10 optionValue when given only one file', function() {
    let expectedOutput = {
      filePaths: ['file1'],
      optionValue: 10,
      option: '-n'
    };
    let actualOutput = extractUserInput(['file1']);
    assert.deepEqual(expectedOutput, actualOutput);
  });

  it('should return an object of 1 filepath and 5 optionValue when given only one file and -n5', function() {
    let expectedOutput = { filePaths: ['file1'], optionValue: 5, option: '-n' };
    let actualOutput = extractUserInput(['-n5', 'file1']);
    assert.deepEqual(expectedOutput, actualOutput);
  });

  it('should return an object of 2 filepath and 5 optionValue when given two files and -n5', function() {
    let expectedOutput = {
      filePaths: ['file1', 'file2'],
      optionValue: 5,
      option: '-n'
    };
    let actualOutput = extractUserInput(['-n5', 'file1', 'file2']);
    assert.deepEqual(expectedOutput, actualOutput);
  });

  it('should return an object of 2 filepath and 5 optionValue when given two files and -n 5', function() {
    let expectedOutput = {
      filePaths: ['file1', 'file2'],
      optionValue: 5,
      option: '-n'
    };
    let actualOutput = extractUserInput(['-n', '5', 'file1', 'file2']);
    assert.deepEqual(expectedOutput, actualOutput);
  });

  it('should return an object of 2 filepaths and 5 optionValue when given two files and -5', function() {
    let expectedOutput = {
      filePaths: ['file1', 'file2'],
      optionValue: 5,
      option: '-n'
    };
    let actualOutput = extractUserInput(['-5', 'file1', 'file2']);
    assert.deepEqual(expectedOutput, actualOutput);
  });

  it('should return an object of 2 filepaths and 10 optionValue when given two files', function() {
    let expectedOutput = {
      filePaths: ['file1', 'file2'],
      optionValue: 5,
      option: '-n'
    };
    let actualOutput = extractUserInput(['-5', 'file1', 'file2']);
    assert.deepEqual(expectedOutput, actualOutput);
  });

  it('should return an object of 1 filepath and 5 optionValue and option as -c when given one file and -c5', function() {
    let expectedOutput = { filePaths: ['file1'], optionValue: 5, option: '-c' };
    let actualOutput = extractUserInput(['-c5', 'file1']);
    assert.deepEqual(expectedOutput, actualOutput);
  });

  it('should return an object of 2 filepaths and 5 optionValue and option as -c when given two files and -c 5', function() {
    let expectedOutput = {
      filePaths: ['file1', 'file2'],
      optionValue: 5,
      option: '-c'
    };
    let actualOutput = extractUserInput(['-c', '5', 'file1', 'file2']);
    assert.deepEqual(expectedOutput, actualOutput);
  });
});
