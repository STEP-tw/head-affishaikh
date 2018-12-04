const {sliceContents} = require('./src/library.js');

describe('sliceContents', function() {
  it('should return a string of ten lines when given reader object and filename', function() {
    let expectedOutput = fs.readFileSync('./testData/testFile1','utf8');
    let actualOutput = sliceContents(fs, './testData/testFile1');
    assert.equal(actualOutput, expectedOutput);
  });
});
