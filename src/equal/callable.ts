import { Environment } from "./environment";
import { Interpreter } from "./interpreter";
import { FunctionDeclaration } from "./statement";

interface EqualCallable {
  arity(): number;
  call(interpreter: Interpreter, args: (string | number | boolean)[]): any;
}

function isEqualCallable(cls: any): cls is EqualCallable {
  return cls.arity !== undefined && cls.call !== undefined;
} 

class EqualFunction implements EqualCallable {
  declaration: FunctionDeclaration;
  constructor(declaration: FunctionDeclaration) {
    this.declaration = declaration;
  }
  public arity(): number {
    return this.declaration.params.length;
  }
  public call(interpreter: Interpreter, args: (string | number | boolean)[]) {
    // global functions
    let env: Environment = new Environment(interpreter.environment);
    for (let pointer = 0; pointer <= args.length-1; pointer++) {
      env.assign(this.declaration.params[pointer], args[pointer]);
    }
    try {
      interpreter.publicExecBlock(this.declaration.body, env);
    } catch(ret) {
      return ret.val;
    }
    return 0;
  }
}

class returnVal extends Error {
  val: any;
  constructor(val: any) {
    super();
    Object.setPrototypeOf(this, returnVal.prototype);
    this.name = "returnVal";
    this.val = val;
  }
}

export {
  EqualCallable, isEqualCallable, EqualFunction, returnVal
}