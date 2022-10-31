import { EqualCallable } from "./callable";
import { EqualSyntaxError } from "./error";
import { Interpreter } from "./interpreter";
import { wrapValue } from "./utils";


class Input implements EqualCallable {
  public arity() {
    return 1;
  }
  public call(interpreter: Interpreter, args: (string | number | boolean)[]) {
    if (interpreter.input == undefined) throw new EqualSyntaxError("No input method provided", interpreter.path);
    else {
      if (args[0] == "string") {
        
      }
    }
    // "string" | "number" | "boolean" | "undefined"
    // if (args[0] == "string")
    // return 
    console.log("testing input");
  }
}

export {
  Input
}