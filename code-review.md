--------- src/utilTest.js -----------

1.  lineNumber : 2
    description : Function optionExtractor does not look like a general purpose utility. It might be possible to extract it in parseUtility.js or something similar.

2.  lineNumber : 3, 4
    description : Function names - sliceContentsByLines and sliceContentsByCharacters should end with singular forms.

3.  lineNumber : 3, 4
    description : functions - sliceContentsByLines and sliceContentsByCharacters does not look like a general purpose utility. It might be in stringUtility.js.

4. lineNumber : 8
    description : The variable name expectedFiles does not specify that its an object. It creates confusion that its an array.

5.  lineNumber : 47
    description : Variable optionValue is redundant. It should be used only once.

6.  lineNumber : 35, 40
    Typo, Misleading Tests
    description : Passed arguments does not match description of the test.

7.  lineNumber : 44, 81
    description : The word Contents in sliceContentsByLines and sliceContentsByCharacters limits the functionality only for file contents.

8.  lineNumber : 44, 81
    Missing Tests
    description : Tests for multiple files are missing for functions sliceContentsByCharacters sliceContentsByCharacters.

9.  Missing Tests
    1. Tests for tail are missing for functions sliceContentsByCharacters and sliceContentsByLines.
    2. Tests for createReducer.

--------- src/util.js -----------

1.  lineNumber : 8, 26
    codeSmell : Long method 
    description : Function sliceContentsByLines and sliceContentsByCharacters is having many responsibilities. Responsibilities are :
    1.  Reading file
    2.  Handling errors
    3.  Splitting, slicing and joining strings.

2.  lineNumber : 8, other lines, files etc
   description : prerequisites as a name is too vague. Should try to make it more expressive. 

3.  isTailRangeZero : 17
    description : function at an unexpected place. i don't expect it to be handled in sliceContentsByLines.

4.  line : 21
    Unnecessary temp variable.

5.  line : 47
    Poor naming
    description : variable name filePath might be fileName.

--------- src/handleErrors.js -----------
1.  lineNumber : 38, 40
    description : error.occured should have a boolean value.

2.  lineNumber : 1, 10, 11
    Typo
    description : Missing semicolon

--------- test/handleErrorsTest.js -----------
1.  Missing test
    description : Tests for handleErrors function are missing.

2.  lineNumber : 2, 4
    description : Function names handleHeadIllegalCount and handleTailIllegalOffset can be made more implicit.

3.  lineNumber : 20, 29, 41, 52
    description : Argument order for deepEqual should follow a convention.

4.  lineNumber : 14, 23, 34
    Poor description of tests
    description : Description in it blocks can be nested.

5.  Missing tests
    description : Test cases for handleTailIllegalOffset are not sufficient.

--------- test/handleUserInputTest.js -----------

1.  lineNumber : 5
    poor description of tests
    description : option is not specified in the test description

2. lineNumber : 5, 15, 21, 31, 41, 51, 61, 67
    poor description of tests
    description : tests description can be nested to make it readable

3.  lineNumber : 51
    Misleading tests

4.  lineNumber : 62, 16
    Inconsistent identation

5.  Missing tests
    description : Missing test for default case of characters

--------- src/handleUserInput.js -----------

1.  lineNumber : 3, 14, 17
    Poor naming
    description : 1.    function name isOptionExplicit is not meaningful.
    2.  function isOptionSeparateFromValue
    3.  function isOptionValueGiven
    4.  variable name mixedOption
    5.  variable name mixedOptionAndValue
    6.  47, variable name fileReaderIndex is confusing.
    7.  45, variable name substrIndex does not specify which string it refers to.

--------- test/libTest.js -----------

1.  Poor naming of files
    description : library is library.js and its test is libTest.js that introduce inconsistency.

2.  Missing Tests
    description : tests for : 
    1. getContentsSlicer
    2. getRange
    3. headForMultipleFiles
    4. isOnlyOneFile are missing

3.  lineNumber : 21
    Poor description of test
    description : The input to the function is not specified completely.

4.  lineNumber : 29, 64
    description : small data for expectedOutput can be used. it makes it more readable

--------- test/libTest.js -----------

1.  lineNumber : 23
    description : variable name headForMultipleFiles specifies that it is only for head and not for tail.