const fs = require("fs").promises;


function ast(obj) {
  const imports =
`import { Token } from "./token";
`
  const baseClass =
`
// abstract class
class Expression {
  constructor() {
    throw new Error("Abstract class cannot be directly instantiated");
  }
  public accept(visitor: Visitor) {
    throw new Error("Method in abstract class cannot be called");
  }
}
`
  let subclasses = "";
  let visitorMethods = "";  
  let exportStr = "";

  for (const cls in obj) {
    visitorMethods += 
  `public visit${cls}(host: ${cls}): any {
    throw new Error("Method in abstract class cannot be called");
  }
  `
    exportStr += (cls + ", ");

    let instanceStr = "";
    let constructArgs = "";
    let constructStr = "";
    for (const arg in obj[cls]) {
      let type = obj[cls][arg];
      instanceStr += 
  `${arg}: ${type}; 
  `
      constructArgs += `${arg}: ${type}, `
      constructStr += 
    `this.${arg} = ${arg};
    `
    }

    subclasses += 
`
class ${cls} extends Expression {
  ${instanceStr}
  constructor(${constructArgs}) {
    super();
    ${constructStr}
  }
  public accept(visitor: Visitor) {
    return visitor.visit${cls}(this);
  }
}
`
  }
  let visitor = 
`
// abstract class
class Visitor {
  ${visitorMethods}
}
`
  let exports = 
`
export {
  Visitor, Expression, ${exportStr}
}
`
  const path = "./src/equal/expression.ts";
  const data = imports + visitor + baseClass + subclasses + exports;

  fs.writeFile(path, data)
    .then(() => {
      console.info("Generated file at " + path);
    })
    .catch((err) => {
      console.error(err);
    })
}
module.exports = {
  ast
}