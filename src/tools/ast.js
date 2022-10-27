const fs = require("fs").promises;

function ast(path, baseName, obj, importClass) {
  const imports = importClass;

  const baseClass =
`
// abstract class
class ${baseName} {
  constructor() {
  }
  public accept(visitor: ${baseName}Visitor) {
    if (!is${baseName}Visitor(visitor)) throw new Error("Invalid visitor type");
  }
}
`
  let subclasses = "";
  let visitorMethods = "";
  let visitorCheck = "";
  let exportStr = "";

  for (const cls in obj) {
    visitorMethods += 
  `visit${cls}(host: ${cls}): any;
  `
    visitorCheck += (`cls.visit${cls} !== undefined &&`);
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
  public accept(visitor: ${baseName}Visitor) {
    super.accept(visitor);
    return visitor.visit${cls}(this);
  }
}
`

  }
  visitorCheck = visitorCheck.slice(0, visitorCheck.length-2);
  let visitor = 
`
interface ${baseName}Visitor {
  ${visitorMethods}
}

function is${baseName}Visitor(cls: any): cls is ${baseName}Visitor {
  return ${visitorCheck};
} 
`
  let exports = 
`
export {
  ${baseName}Visitor, is${baseName}Visitor, ${baseName}, ${exportStr}
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