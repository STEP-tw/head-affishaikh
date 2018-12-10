const { getContents } = require("../src/library.js");
const assert = require("assert");

const createReader = function(expectedFiles, expectedEncoding) {
  return function(actualFilePath, actualEncoding) {
    if (expectedEncoding === actualEncoding) {
      return expectedFiles[actualFilePath];
    }
  };
};

const createExistsSync = function(fileNames) {
  return function(fileName) {
    return fileNames.includes(fileName);
  };
};

describe("getContents", function() {
  const fs = {};

  it("should return a string of ten lines when given reader object and filename", function() {
    let prerequisites = {
      filePaths: ["./testData/testFile1"],
      optionValue: 10,
      option: "-n",
      action: 'head'
    };
    let expectedOutput =
      "Hello\nHello\nHello\nHello\nHello\nHello\nHello\nHello\nHello\nHello";
    let expectedFiles = {};
    expectedFiles["./testData/testFile1"] =
      "Hello\nHello\nHello\nHello\nHello\nHello\nHello\nHello\nHello\nHello\n";
    fs.readFileSync = createReader(expectedFiles, "utf8");
    fs.existsSync = createExistsSync(["./testData/testFile1"]);
    let actualOutput = getContents(fs, prerequisites);
    assert.equal(actualOutput, expectedOutput);
  });

  it("should return a string of two lines when given reader object, filepath and 2 numberOfLines", function() {
    let prerequisites = {
      filePaths: ["./testData/testFile2"],
      optionValue: 2,
      option: "-n",
      action: 'head'
    };
    let expectedOutput = "Optimus Prime\nBumble Bee";
    let expectedFiles = {};
    expectedFiles["./testData/testFile2"] =
      "Optimus Prime\nBumble Bee\nBulkhead\n";
    fs.readFileSync = createReader(expectedFiles, "utf8");
    fs.existsSync = createExistsSync(["./testData/testFile2"]);
    let actualOutput = getContents(fs, prerequisites);
    assert.equal(actualOutput, expectedOutput);
  });

  it("should return a string of 10 lines from testFile1 concatinatd with string of 10 lines from testFile2", function() {
    let prerequisites = {
      filePaths: ["./testData/testFile1", "./testData/testFile2"],
      optionValue: 10,
      option: "-n",
      action: 'head'
    };
    let expectedOutput =
      "==> ./testData/testFile1 <==\nHello\nHello\nHello\nHello\nHello\nHello\nHello\nHello\nHello\nHello\n==> ./testData/testFile2 <==\nOptimus Prime\nBumble Bee\nBulkhead\nArcee\nRatchet\nWheeljack\nUltramagnus\nSmoke Scream\nJack\nMico";
    let expectedFiles = {};
    expectedFiles["./testData/testFile1"] =
      "Hello\nHello\nHello\nHello\nHello\nHello\nHello\nHello\nHello\nHello\n";
    expectedFiles["./testData/testFile2"] =
      "Optimus Prime\nBumble Bee\nBulkhead\nArcee\nRatchet\nWheeljack\nUltramagnus\nSmoke Scream\nJack\nMico\n";
    fs.readFileSync = createReader(expectedFiles, "utf8");
    fs.existsSync = createExistsSync([
      "./testData/testFile1",
      "./testData/testFile2"
    ]);
    let actualOutput = getContents(fs, prerequisites);
    assert.equal(actualOutput, expectedOutput);
  });

  it("should return a string of 5 characters from testFile2 when give -c5 and filename", function() {
    let prerequisites = {
      filePaths: ["./testData/testFile2"],
      optionValue: 5,
      option: "-c",
      action: 'head'
    };
    let expectedOutput = "Optim";
    let expectedFiles = {};
    expectedFiles["./testData/testFile2"] = "Optim\n";
    fs.readFileSync = createReader(expectedFiles, "utf8");
    fs.existsSync = createExistsSync(["./testData/testFile2"]);
    let actualOutput = getContents(fs, prerequisites);
    assert.equal(actualOutput, expectedOutput);
  });

  it("should return a string of 10 characters from testFile2 when given -c10 and filename", function() {
    let prerequisites = {
      filePaths: ["./testData/testFile2"],
      optionValue: 10,
      option: "-c",
      action: 'head'
    };
    let expectedOutput = "Optimus Pr";
    let expectedFiles = {};
    expectedFiles["./testData/testFile2"] = "Optimus Pr\n";
    fs.readFileSync = createReader(expectedFiles, "utf8");
    fs.existsSync = createExistsSync(["./testData/testFile2"]);
    let actualOutput = getContents(fs, prerequisites);
    assert.equal(actualOutput, expectedOutput);
  });

  it("should return a string of 5 characters from testFile1 concatinated with testFile2 when given -c5 and filenames", function() {
    let prerequisites = {
      filePaths: ["./testData/testFile1", "./testData/testFile2"],
      optionValue: 5,
      option: "-c",
      action: 'head'
    };
    let expectedOutput =
      "==> ./testData/testFile1 <==\nHello\n==> ./testData/testFile2 <==\nOptim";
    let expectedFiles = {};
    expectedFiles["./testData/testFile1"] = "Hello\n";
    expectedFiles["./testData/testFile2"] = "Optim\n";
    fs.readFileSync = createReader(expectedFiles, "utf8");
    fs.existsSync = createExistsSync([
      "./testData/testFile1",
      "./testData/testFile2"
    ]);
    let actualOutput = getContents(fs, prerequisites);
    assert.equal(actualOutput, expectedOutput);
  });

  it("should return an missing file error when given a missing file name", function() {
    let prerequisites = {
      filePaths: ["file1"],
      optionValue: 5,
      option: "-n",
      action: 'head'
    };
    let expectedOutput = "head: file1: No such file or directory";
    let expectedFiles = {};
    fs.readFileSync = createReader(expectedFiles, "utf8");
    fs.existsSync = createExistsSync([]);
    let actualOutput = getContents(fs, prerequisites);
    assert.equal(actualOutput, expectedOutput);
  });

  it("should return an missing file error when given a missing file name and -c option", function() {
    let prerequisites = {
      filePaths: ["file1"],
      optionValue: 5,
      option: "-c",
      action: 'head'
    };
    let expectedOutput = "head: file1: No such file or directory";
    let expectedFiles = {};
    fs.readFileSync = createReader(expectedFiles, "utf8");
    fs.existsSync = createExistsSync([]);
    let actualOutput = getContents(fs, prerequisites);
    assert.equal(actualOutput, expectedOutput);
  });

  it("should return an missing file error and contents of other when given a missing file and one present name and -c option", function() {
    let prerequisites = {
      filePaths: ['file1','./testData/testFile1'],
      optionValue: 5,
      option: "-n",
      action: 'head'
    };
    let expectedOutput = "head: file1: No such file or directory\n==> ./testData/testFile1 <==\nHello\nHello\nHello\nHello\nHello";
    let expectedFiles = {};
    expectedFiles['./testData/testFile1'] = 'Hello\nHello\nHello\nHello\nHello\nHello\nHello\n';
    fs.readFileSync = createReader(expectedFiles, "utf8");
    fs.existsSync = createExistsSync(['./testData/testFile1']);
    let actualOutput = getContents(fs, prerequisites);
    assert.equal(actualOutput, expectedOutput);
  });

  it("should return illegal count error when given an illegal count", function() {
    let prerequisites = {
      filePaths: ["file1"],
      optionValue: -5,
      option: "-n",
      action: 'head'
    };
    let expectedOutput = "head: illegal line count -- -5";
    let expectedFiles = {};
    fs.readFileSync = createReader(expectedFiles, "utf8");
    fs.existsSync = createExistsSync([]);
    let actualOutput = getContents(fs, prerequisites);
    assert.equal(actualOutput, expectedOutput);
  });

  it("should return last two lines of file", function() {
    let prerequisites = {
      filePaths: ["./data.txt"],
      optionValue: 2,
      option: "-n",
      action : 'tail'
    };
    let expectedOutput = "9\n10";
    let expectedFiles = {};
    expectedFiles['./data.txt'] = '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n';
    fs.readFileSync = createReader(expectedFiles, "utf8");
    fs.existsSync = createExistsSync(['./data.txt']);
    let actualOutput = getContents(fs, prerequisites);
    assert.equal(actualOutput, expectedOutput);
  })
  it("should return last ten characters of file", function() {
    let prerequisites = {
      filePaths: ["./data.txt"],
      optionValue: 10,
      option: "-c",
      action : 'tail'
    };
    let expectedOutput = "\n7\n8\n9\n10\n";
    let expectedFiles = {};
    expectedFiles['./data.txt'] = '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n';
    fs.readFileSync = createReader(expectedFiles, "utf8");
    fs.existsSync = createExistsSync(['./data.txt']);
    let actualOutput = getContents(fs, prerequisites);
    assert.equal(actualOutput, expectedOutput);
  })
});
