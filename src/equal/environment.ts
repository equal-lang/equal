import { EqualRuntimeError } from "./error";

class Environment {
  outerEnv: Environment | undefined;
  keys: Map<string, string | number | boolean>;

  constructor(outEnv?: Environment) {
    this.keys = new Map<string, string | number | boolean>();
    this.outerEnv = outEnv;
  }
  public assign(key: string, val: string | number | boolean): void {
    this.keys.set(key, val);
  }
  public get(key: string): string | number | boolean {
    let val = this.keys.get(key);
    // precedence: id and href
    // TODO: get file name and line here
    if (val == undefined && this.outerEnv != undefined) {
      val = this.outerEnv.get(key);
    }
    if (val == undefined) throw new EqualRuntimeError("Undefined variable " + key);
    return val;
  }
}

export { Environment };