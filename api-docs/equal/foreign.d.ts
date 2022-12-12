import { EqualCallable } from "./callable";
import { Interpreter } from "./interpreter";
declare class Input implements EqualCallable {
    arity(): number;
    call(interpreter: Interpreter, args: (string | number | boolean)[]): void;
}
export { Input };
