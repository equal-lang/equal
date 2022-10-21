const { ast } = require("./ast");

ast({
  "Binary": {"operator": "Token", "arg1": "Expression", "arg2": "Expression"},
  "Unary": {"operator": "Token", "arg1": "Expression"},
  "Literal": {"arg": "string | number | boolean"}
})