const { ast } = require("./ast");

const expressionPath = "./src/equal/expression.ts";
const expressionBase = "Expression";

const statementPath = "./src/equal/statement.ts";
const statementBase = "Statement";

ast(expressionPath, expressionBase, {
  "Binary": {"operator": "operatorType", "arg1": "Expression", "arg2": "Expression"},
  "Unary": {"operator": "operatorType", "arg1": "Expression"},
  "Literal": {"arg": "string | number | boolean"},
  "Variable": {"name": "string"},
}, `import { operatorType } from "./token";
`);

ast(statementPath, statementBase, {
  "Assignment": {"name": "string", "expression": "Expression"},
  "ExpressionStatement": {"expression": "Expression"}
}, `import { Expression } from "./expression";
`);
