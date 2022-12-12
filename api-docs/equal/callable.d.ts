import { Interpreter } from "./interpreter";
import { FunctionDeclaration } from "./statement";
interface EqualCallable {
    arity(): number;
    call(interpreter: Interpreter, args: (string | number | boolean)[]): any;
}
declare function isEqualCallable(cls: any): cls is EqualCallable;
declare class EqualFunction implements EqualCallable {
    declaration: FunctionDeclaration;
    constructor(declaration: FunctionDeclaration);
    arity(): number;
    call(interpreter: Interpreter, args: (string | number | boolean)[]): any;
}
declare class returnVal extends Error {
    val: any;
    constructor(val: any);
}
export { EqualCallable, isEqualCallable, EqualFunction, returnVal };
