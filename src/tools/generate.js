const { ast } = require("./ast");

const expressionPath = "./src/equal/expression.ts";
const expressionBase = "Expression"

ast(expressionPath, expressionBase, {
  "Binary": {"operator": "operatorType", "arg1": "Expression", "arg2": "Expression"},
  "Unary": {"operator": "operatorType", "arg1": "Expression"},
  "Literal": {"arg": "string | number | boolean"}
})