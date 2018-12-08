const { getHeadContents } = require("../src/library.js");
const assert = require("assert");

const createReader = function(expectedFiles, expectedEncoding) {
  return function(actualFilePath, actualEncoding) {
    if(expectedEncoding === actualEncoding) {
      return expectedFiles[actualFilePath];
    }
  }
}

const existsSync = function(fileName) {
  let fileNames = ["./testData/testFile1", "./testData/testFile2"];
  return fileNames.includes(fileName);
};

const fs = {
  existsSync: existsSync
};

describe("getHeadContents", function() {
  it("should return a string of ten lines when given reader object and filename", function() {
    let headPrerequisites = {
      filePaths: ["./testData/testFile1"],
      optionValue: 10,
      option: "-n"
    };
    let expectedOutput =
      "Hello\nHello\nHello\nHello\nHello\nHello\nHello\nHello\nHello\nHello";
    let expectedFiles = {};
    expectedFiles['./testData/testFile1'] = expectedOutput;   
    fs.readFileSync = createReader(expectedFiles,'utf8');
    let actualOutput = getHeadContents(fs, headPrerequisites);
    assert.equal(actualOutput, expectedOutput);
  });

  it("should return a string of two lines when given reader object, filepath and 2 numberOfLines", function() {
    let headPrerequisites = {
      filePaths: ["./testData/testFile2"],
      optionValue: 2,
      option: "-n"
    };
    let expectedOutput = "Optimus Prime\nBumble Bee";
    let expectedFiles = {};
    expectedFiles['./testData/testFile2'] = expectedOutput;   
    fs.readFileSync = createReader(expectedFiles,'utf8',expectedOutput);
    let actualOutput = getHeadContents(fs, headPrerequisites);
    assert.equal(actualOutput, expectedOutput);
  });

  it("should return a string of 10 lines from testFile1 concatinatd with string of 10 lines from testFile2", function() {
    let headPrerequisites = {
      filePaths: ["./testData/testFile1", "./testData/testFile2"],
      optionValue: 10,
      option: "-n"
    };
    let expectedOutput =
      "==> ./testData/testFile1 <==\nHello\nHello\nHello\nHello\nHello\nHello\nHello\nHello\nHello\nHello\n==> ./testData/testFile2 <==\nOptimus Prime\nBumble Bee\nBulkhead\nArcee\nRatchet\nWheeljack\nUltramagnus\nSmoke Scream\nJack\nMico";
    let expectedFiles = {};
    expectedFiles['./testData/testFile1'] = 'Hello\nHello\nHello\nHello\nHello\nHello\nHello\nHello\nHello\nHello';   
    expectedFiles['./testData/testFile2'] = "Optimus Prime\nBumble Bee\nBulkhead\nArcee\nRatchet\nWheeljack\nUltramagnus\nSmoke Scream\nJack\nMico";
    fs.readFileSync = createReader(expectedFiles,'utf8',expectedOutput);
    let actualOutput = getHeadContents(fs, headPrerequisites);
    assert.equal(actualOutput, expectedOutput);
  });

  it("should return a string of 5 characters from testFile2 when give -c5 and filename", function() {
    let headPrerequisites = {
      filePaths: ["./testData/testFile2"],
      optionValue: 5,
      option: "-c"
    };
    let expectedOutput = "Optim";
    let expectedFiles = {};
    expectedFiles['./testData/testFile2'] = 'Optim'; 
    fs.readFileSync = createReader(expectedFiles,'utf8',expectedOutput);
    let actualOutput = getHeadContents(fs, headPrerequisites);
    assert.equal(actualOutput, expectedOutput);
  });

  it("should return a string of 10 characters from testFile2 when given -c10 and filename", function() {
    let headPrerequisites = {
      filePaths: ["./testData/testFile2"],
      optionValue: 10,
      option: "-c"
    };
    let expectedOutput = "Optimus Pr";
    let expectedFiles = {};
    expectedFiles['./testData/testFile2'] = 'Optimus Pr'; 
    fs.readFileSync = createReader(expectedFiles,'utf8',expectedOutput);
    let actualOutput = getHeadContents(fs, headPrerequisites);
    assert.equal(actualOutput, expectedOutput);
  });

  it("should return a string of 5 characters from testFile1 concatinated with testFile2 when given -c5 and filenames", function() {
    let headPrerequisites = {
      filePaths: ["./testData/testFile1", "./testData/testFile2"],
      optionValue: 5,
      option: "-c"
    };
    let expectedOutput =
      "==> ./testData/testFile1 <==\nHello\n==> ./testData/testFile2 <==\nOptim";
    let expectedFiles = {};
    expectedFiles['./testData/testFile1'] = 'Hello'; 
    expectedFiles['./testData/testFile2'] = 'Optim'; 
    fs.readFileSync = createReader(expectedFiles,'utf8',expectedOutput);
    let actualOutput = getHeadContents(fs, headPrerequisites);
    assert.equal(actualOutput, expectedOutput);
  });
});
