const {
  handleIllegalCount,
  handleMissingFile
} = require("../src/handleErrors.js");
const assert = require("assert");

const exists = function(fileName) {
  let files = ["file1"];
  return files.includes(fileName);
};

describe("handleIllegalCount", function() {
  it("should return error object with errorOccured set to 1 and an error message for line when given optionValue as 0 and option as -n", function() {
    let expectedOutput = {
      occured: 1,
      message: "head: illegal line count -- 0"
    };
    let actualOutput = handleIllegalCount(0, "-n");
    assert.deepEqual(expectedOutput, actualOutput);
  });

  it("should return error object with errorOccured set to 1 and an error message for byte when given optionValue as 0and option as -c", function() {
    let expectedOutput = {
      occured: 1,
      message: "head: illegal byte count -- 0"
    };
    let actualOutput = handleIllegalCount(0, "-c");
    assert.deepEqual(expectedOutput, actualOutput);
  });
});

describe("handleMissingFile", function() {
  it("should return error object with errorOccured set to 1 and an error message when given name of a missing file", function() {
    let expectedOutput = {
      occured: 1,
      message: "head: file2: No such file or directory"
    };
    let actualOutput = handleMissingFile(exists, "file2");
    assert.deepEqual(expectedOutput, actualOutput);
  });
});
