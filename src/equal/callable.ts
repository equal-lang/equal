import { Interpreter } from "./interpreter";

interface EqualCallable {
  arity(): number;
  call(interpreter: Interpreter, args: (string | number | boolean)[]): any;
}

function isEqualCallable(cls: any): cls is EqualCallable {
  return cls.arity !== undefined && cls.call !== undefined;
} 

class EqualFunction implements EqualCallable {
  constructor() {

  }
  public arity(): number {
    return 0;
  }
  public call(interpreter: Interpreter, args: (string | number | boolean)[]) {
  }
}

export {
  EqualCallable, isEqualCallable
}