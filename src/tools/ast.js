const fs = require("fs").promises;

function ast(path, baseName, obj) {
  const imports =
`import { operatorType } from "./token";
`
  const baseClass =
`
// abstract class
class ${baseName} {
  constructor() {
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
class ${cls} extends ${baseName} {
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