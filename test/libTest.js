const {getHeadContents} = require('../src/library.js');
const assert = require('assert');

const readFileSync = function(filePath, encoding) {
  let fileContents = [];
  fileContents['./testData/testFile1'] = 'Hello\nHello\nHello\nHello\nHello\nHello\nHello\nHello\nHello\nHello';
  fileContents['./testData/testFile2'] = 'Optimus Prime\nBumble Bee\nBulkhead\nArcee\nRatchet\nWheeljack\nUltramagnus\nSmoke Scream\nJack\nMico\nRaff';
  return fileContents[filePath];
}

describe('getHeadContents', function() {
  it('should return a string of ten lines when given reader object and filename', function() {
    let headPrerequisites = {filePaths : ['./testData/testFile1'], numberOfLines: 10}
    let expectedOutput = 'Hello\nHello\nHello\nHello\nHello\nHello\nHello\nHello\nHello\nHello'; 
    let actualOutput = getHeadContents(readFileSync, headPrerequisites);
    assert.equal(actualOutput, expectedOutput);
  });

  it('should return a string of two lines when given reader object, filepath and 2 numberOfLines', function() {
    let headPrerequisites = {filePaths : ['./testData/testFile2'], numberOfLines: 2}
    let expectedOutput = 'Optimus Prime\nBumble Bee'; 
    let actualOutput = getHeadContents(readFileSync, headPrerequisites);
    assert.equal(actualOutput, expectedOutput);
  });

  it('should return a string of 10 lines from testFile1 concatinatd with string of 10 lines from testFile2', function() {
    let headPrerequisites = {filePaths : ['./testData/testFile1', './testData/testFile2'], numberOfLines: 10}
    let expectedOutput = '==> ./testData/testFile1 <==\nHello\nHello\nHello\nHello\nHello\nHello\nHello\nHello\nHello\nHello\n\n==> ./testData/testFile2 <==\nOptimus Prime\nBumble Bee\nBulkhead\nArcee\nRatchet\nWheeljack\nUltramagnus\nSmoke Scream\nJack\nMico';

    let actualOutput = getHeadContents(readFileSync, headPrerequisites);

    assert.equal(actualOutput, expectedOutput);
  });
});
