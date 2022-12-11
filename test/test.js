const assert = require("assert");
const path = require("path");
const { Equal } = require(path.resolve(__dirname, "../builds/equal/equal"));

describe("fibonacci numbers", function () {
  it("should return the first fifteen numbers", function () {
    const testPath = path.resolve(__dirname, "../examples/fib.eq");
    const res = new Equal({
      mode: "NORMAL",
      path: testPath,
      output: () => {}
    }).run();
    assert.equal(res, "0\n1\n1\n2\n3\n5\n8\n13\n21\n34\n55\n89\n144\n233\n377");
  });
});