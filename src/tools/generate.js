const { ast } = require("./ast");

const expressionPath = "./src/equal/expression.ts";
const expressionBase = "Expression";

const statementPath = "./src/equal/statement.ts";
const statementBase = "Statement";

ast(expressionPath, expressionBase, {
  "Binary": {"operator": "operatorType", "arg1": "Expression", "arg2": "Expression"},
  "Logical": {"operator": "operatorType", "arg1": "Expression", "arg2": "Expression"},
  "Unary": {"operator": "operatorType", "arg1": "Expression"},
  "Literal": {"arg": "string | number | boolean"},
  "Variable": {"name": "string"},
}, 
`import { operatorType } from "./token";
`);

ast(statementPath, statementBase, {
  "Scope": {"statements": "Statement[]"},
  "Assignment": {"name": "string", "expression": "Expression", "scope": "string | undefined"},
  "Loop": {"condition": "Expression", "statements": "Statement[]"},
  "ConditionalStatement": {"conditions": "Expression[]", "statements": "Statement[][]"},
  "ExpressionStatement": {"expression": "Expression"},
  "PrintStatement": {"expressions": "Expression[]"}
}, 
`import { Expression } from "./expression";
import { Environment } from "./environment";
`);
