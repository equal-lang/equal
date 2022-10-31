import * as fs from "fs";
import { Lexer } from "./lexer";
import { Parser } from "./parser";
import { Interpreter } from "./interpreter";
import { equalMode } from "./utils";
import { EqualRuntimeError, ErrorHandler } from "./error";
import { Statement } from "./statement";


class Equal {
  error: boolean;
  path: string;
  mode: equalMode;
  lexer: Lexer;
  parser: Parser;
  interpreter: Interpreter;
  errHandler: ErrorHandler;

  constructor(path: string, mode: string) {
    try {
      if (mode == "VERBOSE") this.mode = equalMode.VERBOSE;
      else this.mode = equalMode.NORMAL;

      this.error = false;
      this.path = path;
      this.errHandler = new ErrorHandler(this.mode);
      this.lexer = new Lexer(this.mode, this.errHandler);
      this.parser = new Parser(this.mode, this.errHandler);
      this.interpreter = new Interpreter(this.mode, this.errHandler);

    } catch(err) {
      this.errHandler.handleError(err);
    }
  }
  public run() {
    try {
      // is this line needed?
      if (this.error == false) {    
        this.verbose("Running in verbose mode");
        const tokens = this.lexer.lex(this.loadFile(), this.path);
        this.verbose(tokens);
        const ast = this.parser.parse(tokens, this.path);
        this.error = this.errHandler.getErrorStatus();
        return this.execute(ast, this.path);
        // check for error here
      }

    } catch(err) {
      this.errHandler.handleError(err);
    }
    
  }

  // new Equal(content, inputFunc, outputFunc).run()
  // always inside another function's try block
  private loadFile(): string {
    this.verbose("Loading file at " + this.path);
    if (!fs.existsSync(this.path)) throw new EqualRuntimeError("Invalid path");
    const file = fs.readFileSync(this.path, "utf8");
    // undefined?
    return file as string;
  }


  private execute(ast: Statement[], path: string) {
    try {
      if (this.error == false) {
        return this.interpreter.interpret(ast, path);
      } else {
        this.verbose(this.errHandler.errors);
      }
    } catch(err) {
      this.errHandler.handleError(err);
    }
     
  }

  private verbose(log: any): void {
    if (this.mode == equalMode.VERBOSE) console.info(log);
  }

}

export { Equal };