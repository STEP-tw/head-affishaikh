const {
  handleHeadIllegalCount,
  handleMissingFile,
  handleTailIllegalOffset
} = require("../src/handleErrors.js");
const assert = require("assert");

const exists = function(fileName) {
  let files = ["file1"];
  return files.includes(fileName);
};

describe("handleHeadIllegalCount", function() {
  it("should return error object with errorOccured set to 1 and an error message for line when given optionValue as 0 and option as -n", function() {
    let expectedOutput = {
      occured: 1,
      message: "head: illegal line count -- 0"
    };
    let actualOutput = handleHeadIllegalCount(0, "-n");
    assert.deepEqual(expectedOutput, actualOutput);
  });

  it("should return error object with errorOccured set to 1 and an error message for byte when given optionValue as 0and option as -c", function() {
    let expectedOutput = {
      occured: 1,
      message: "head: illegal byte count -- 0"
    };
    let actualOutput = handleHeadIllegalCount(0, "-c");
    assert.deepEqual(expectedOutput, actualOutput);
  });
});

describe("handleMissingFile", function() {
  it("should return error object with errorOccured set to 1 and an error message when given name of a missing file", function() {
    let expectedOutput = {
      occured: 1,
      message: "head: file2: No such file or directory"
    };
    let prerequisites = {'action' : 'head'};
    let actualOutput = handleMissingFile(exists, "file2", prerequisites);
    assert.deepEqual(expectedOutput, actualOutput);
  });
});

describe("handleTailIllegalOffset", function() {
  it("should provide tail illegal offset error when given 5f", function() {
    let expectedOutput = {
      occured: 1,
      message: "tail: illegal offset -- 5f"
    };
    let actualOutput = handleTailIllegalOffset('5f');
    assert.deepEqual(expectedOutput, actualOutput);
  });
});