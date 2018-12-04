const {sliceContents} = require('../src/library.js');
const assert = require('assert');

const readFileSync = function(filePath, encoding) {
  return this[filePath];
}

const fs = {
  './testData/testFile1' : 'Hello\nHello\nHello\nHello\nHello\nHello\nHello\nHello\nHello\nHello',

  './testData/testFile2' : 'Optimus Prime\nBumble Bee\nBulkhead\nArcee\nRatchet\nWheeljack\nUltramagnus\nSmoke Scream\nJack\nMico\nRaff',

  readFileSync : readFileSync
}

describe('sliceContents', function() {
  it('should return a string of ten lines when given reader object and filename', function() {
    let expectedOutput = 'Hello\nHello\nHello\nHello\nHello\nHello\nHello\nHello\nHello\nHello'; 
    let actualOutput = sliceContents(fs, './testData/testFile1');
    assert.equal(actualOutput, expectedOutput);
  });

  it('should return a string of two lines when given reader object, filepath and 2 numberOfLines', function() {
    let expectedOutput = 'Optimus Prime\nBumble Bee'; 
    let actualOutput = sliceContents(fs, './testData/testFile2', 2);
    assert.equal(actualOutput, expectedOutput);
  });

  it('should return a string of 10 lines from testFile1 concatinatd with string of 10 lines from testFile2', function() {
    let expectedOutput = '==> ./testData/testFile1 <==\nHello\nHello\nHello\nHello\nHello\nHello\nHello\nHello\nHello\nHello\n\n==> ./testData/testFile2 <==\nOptimus Prime\nBumble Bee\nBulkhead\nArcee\nRatchet\nWheeljack\nUltramagnus\nSmoke Scream\nJack\nMico\nRaff';
    let actualOutput = sliceContents(fs, './testData/testFile1', './testData/testFile2');
    assert.equal(actualOutput, expectedOutput);
  });
});
