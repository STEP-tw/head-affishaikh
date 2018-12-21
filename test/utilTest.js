const { readFile } = require('../src/util.js');
const { createReader, createExistsSync } = require('./mockUtils');
const assert = require('assert');

describe('readFile', function() {
  const fs = {};
  it('should return the contents of file1 when given fs, file1 and prerequisites', function() {
    let prerequisites = {};
    prerequisites.action = 'head';
    let expectedFiles = {};
    expectedFiles['file1'] = '1\n2\n3\n4\n5\n6\n7\n8\n9\n10';
    fs.readFileSync = createReader(expectedFiles, 'utf8');
    let filNames = ['file1'];
    fs.existsSync = createExistsSync(filNames);
    let expectedOutput = '1\n2\n3\n4\n5\n6\n7\n8\n9\n10';
    let actualOutput = readFile(fs, 'file1', prerequisites);
    assert.deepEqual(actualOutput, expectedOutput);
  });

  it('should return an error message when given fs, file1 and prerequisites', function() {
    let prerequisites = {};
    prerequisites.action = 'head';
    fs.readFileSync = createReader({}, 'utf8');
    fs.existsSync = createExistsSync([]);
    let expectedOutput = 'head: file1: No such file or directory';
    let actualOutput = readFile(fs, 'file1', prerequisites);
    assert.deepEqual(actualOutput, expectedOutput);
  });
});
