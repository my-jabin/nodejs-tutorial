const utils = require("./utils");

// read is as "it should add two numbers"
// 1. parameter is the description of what is the test doing
// it calls: "behavior drive development" or "BDD"
it('should add two numbers', () => {
  var res = utils.add(5, 3);
  if (res !== 8) {
    throw new Error(`Expected 8, but got ${res}`);
  }
});

// In package.json, change the "scripts" value to "mocha **/*.test.js"
// means we are going to test any files in any folder named end with test.js
