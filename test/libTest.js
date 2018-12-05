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
    let dataForSlicing = {filePaths : ['./testData/testFile1'], numberOfLines: 10}
    let expectedOutput = 'Hello\nHello\nHello\nHello\nHello\nHello\nHello\nHello\nHello\nHello'; 
    let actualOutput = sliceContents(fs, dataForSlicing);
    assert.equal(actualOutput, expectedOutput);
  });

  it('should return a string of two lines when given reader object, filepath and 2 numberOfLines', function() {
    let dataForSlicing = {filePaths : ['./testData/testFile2'], numberOfLines: 2}
    let expectedOutput = 'Optimus Prime\nBumble Bee'; 
    let actualOutput = sliceContents(fs, dataForSlicing);
    assert.equal(actualOutput, expectedOutput);
  });

  it('should return a string of 10 lines from testFile1 concatinatd with string of 10 lines from testFile2', function() {
    let dataForSlicing = {filePaths : ['./testData/testFile1', './testData/testFile2'], numberOfLines: 10}
    let expectedOutput = '==> ./testData/testFile1 <==\nHello\nHello\nHello\nHello\nHello\nHello\nHello\nHello\nHello\nHello\n\n==> ./testData/testFile2 <==\nOptimus Prime\nBumble Bee\nBulkhead\nArcee\nRatchet\nWheeljack\nUltramagnus\nSmoke Scream\nJack\nMico';

    let actualOutput = sliceContents(fs, dataForSlicing);

    assert.equal(actualOutput, expectedOutput);
  });
});
