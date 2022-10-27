import { EqualRuntimeError } from "./error";

class Environment {
  keys: Map<string, string | number | boolean>;
  constructor() {
    this.keys = new Map<string, string | number | boolean>();
  }
  public define(key: string, val: string | number | boolean): void {
    this.keys.set(key, val);
  }
  public get(key: string) {
    const val = this.keys.get(key);
    // TODO: get file name and line here?
    if (val == undefined) throw new EqualRuntimeError("Undefined variable " + key);
    return val;
  }
}

export { Environment };