import { EqualCallable } from "./callable";
import { Interpreter } from "./interpreter";
import { wrapValue } from "./utils";


class Input implements EqualCallable {
  public arity() {
    return 1;
  }
  public call(interpreter: Interpreter, args: (string | number | boolean)[]) {
    // "string" | "number" | "boolean" | "undefined"
    // if (args[0] == "string")
    console.log("testing input");
  }
}

export {
  Input
}