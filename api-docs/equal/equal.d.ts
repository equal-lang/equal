import { Lexer } from "./lexer";
import { Parser } from "./parser";
import { Interpreter } from "./interpreter";
import { equalMode, equalOptions } from "./utils";
import { ErrorHandler } from "./error";
import { Printer } from "./printer";
declare class Equal {
    error: boolean;
    path: string;
    source: string;
    mode: equalMode;
    lexer: Lexer;
    parser: Parser;
    interpreter: Interpreter;
    errHandler: ErrorHandler;
    printer: Printer;
    constructor({ mode, path, source, output, input }: equalOptions);
    run(): string | undefined;
    private loadFile;
    private execute;
    private verbose;
}
export { Equal };
