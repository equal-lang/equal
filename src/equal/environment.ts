import { EqualRuntimeError } from "./error";
import { EqualCallable } from "./callable";

class Environment {
  outerEnv: Environment | undefined;
  variables: Map<string, string | number | boolean>;
  functions: Map<string, EqualCallable>;

  constructor(outEnv?: Environment) {
    this.variables = new Map<string, string | number | boolean>();
    this.functions = new Map<string, EqualCallable>();
    this.outerEnv = outEnv;
  }

  public assign(key: string, val: string | number | boolean): void {
    this.variables.set(key, val);
  }
  public get(key: string): string | number | boolean {
    let val = this.variables.get(key);
    // precedence: id and href
    // TODO: get file name and line here
    if (val == undefined && this.outerEnv != undefined) {
      val = this.outerEnv.get(key);
    }
    if (val == undefined) throw new EqualRuntimeError("Undefined variable " + key);
    return val;
  }

  public declareFunc(key: string, func: EqualCallable) {
    this.functions.set(key, func);
  }

  public getFunc(key: string): EqualCallable {
    let func = this.functions.get(key);
    if (func == undefined) throw new EqualRuntimeError("Undeclared function " + key);
    return func;
  }
}

export { Environment };