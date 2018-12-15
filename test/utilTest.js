const {
  optionExtractor,
  sliceContentsByLines,
  sliceContentsByCharacters
} = require("../src/util.js");
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

describe("optionExtractor", function() {
  it("should return -n when given -n5", function() {
    let expectedOutput = "-n";
    assert.deepEqual(optionExtractor("-n5"), expectedOutput);
  });

  it("should return -n when given a file name", function() {
    let expectedOutput = "-n";
    assert.deepEqual(optionExtractor("file1"), expectedOutput);
  });

  it("should return -n when given a -56", function() {
    let expectedOutput = "-n";
    assert.deepEqual(optionExtractor("file1"), expectedOutput);
  });

  it("should return -c when given a -c5", function() {
    let expectedOutput = "-n";
    assert.deepEqual(optionExtractor("file1"), expectedOutput);
  });
});

describe("sliceContentsByLines", function() {
  let fs = {};
  it("should return top 10 lines", function() {
    let prerequisites = {
      filePaths: ["file1"],
      optionValue: 10,
      option: "-n",
      action: "head",
      range: [0, 10]
    };
    let expectedFiles = {};
    expectedFiles["file1"] = "1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12";
    fs.readFileSync = createReader(expectedFiles, "utf8");
    fs.existsSync = createExistsSync(["file1"]);
    let expectedOutput = "1\n2\n3\n4\n5\n6\n7\n8\n9\n10";
    let actualOutput = sliceContentsByLines(fs, "file1", prerequisites);
    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return top 2 lines", function() {
    let prerequisites = {
      filePaths: ["file1"],
      optionValue: 2,
      option: "-n",
      action: "head",
      range: [0, 2]
    };
    let expectedFiles = {};
    expectedFiles["file1"] = "1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12";
    fs.readFileSync = createReader(expectedFiles, "utf8");
    fs.existsSync = createExistsSync(["file1"]);
    let expectedOutput = "1\n2";
    let actualOutput = sliceContentsByLines(fs, "file1", prerequisites);
    assert.deepEqual(actualOutput, expectedOutput);
  });
});

describe("sliceContentsByCharacters", function() {
  let fs = {};
  it("should return top 10 characters", function() {
    let prerequisites = {
      filePaths: ["file1"],
      optionValue: 10,
      option: "-c",
      action: "head",
      range: [0, 10]
    };
    let expectedFiles = {};
    expectedFiles["file1"] = "1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12";
    fs.readFileSync = createReader(expectedFiles, "utf8");
    fs.existsSync = createExistsSync(["file1"]);
    let expectedOutput = "1\n2\n3\n4\n5\n";
    let actualOutput = sliceContentsByCharacters(fs, "file1", prerequisites);
    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return top 2 characters", function() {
    let prerequisites = {
      filePaths: ["file1"],
      optionValue: 2,
      option: "-c",
      action: "head",
      range: [0, 2]
    };
    let expectedFiles = {};
    expectedFiles["file1"] = "1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12";
    fs.readFileSync = createReader(expectedFiles, "utf8");
    fs.existsSync = createExistsSync(["file1"]);
    let expectedOutput = "1\n";
    let actualOutput = sliceContentsByCharacters(fs, "file1", prerequisites);
    assert.deepEqual(actualOutput, expectedOutput);
  });
});
