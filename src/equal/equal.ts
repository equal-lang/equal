import * as fs from "fs";
import { Lexer } from "./lexer";
import { Parser } from "./parser";
import { Interpreter } from "./interpreter";
import { equalMode } from "./utils";
import { EqualRuntimeError, ErrorHandler } from "./error";
import { Statement } from "./statement";
import { Printer } from "./printer";

class Equal {
  error: boolean;
  path: string;
  mode: equalMode;
  lexer: Lexer;
  parser: Parser;
  interpreter: Interpreter;
  errHandler: ErrorHandler;
  printer: Printer;

  constructor(path: string | undefined, mode: string, source?: string, output: (arg0: string) => void = console.log, input?: (arg0: string) => string) {
    // pass in undefined for path and pass in the source instead
    try {
      if (mode == "VERBOSE") this.mode = equalMode.VERBOSE;
      else this.mode = equalMode.NORMAL;

      this.error = false;
      this.path = (path != undefined) ? path : "Unknown";
      this.printer = new Printer(output);
      this.errHandler = new ErrorHandler(this.mode);
      this.lexer = new Lexer(this.mode, this.errHandler);
      this.parser = new Parser(this.mode, this.errHandler);
      this.interpreter = new Interpreter(this.mode, this.errHandler, this.printer, input);
      if (path == undefined) {
        if (source == undefined) throw new EqualRuntimeError("No source code found");
        else this.run(source);
      }
      this.run();

    } catch(err) {
      this.errHandler.handleError(err);
    }
  }

  public run(source?: string) {
    try {
      // is this line needed?
      if (this.error == false) {    
        this.verbose("Running in verbose mode");
        const src = (source != undefined) ? source : this.loadFile();
        const tokens = this.lexer.lex(src, this.path);
        this.verbose(tokens);
        const ast = this.parser.parse(tokens, this.path);
        this.error = this.errHandler.getErrorStatus();
        this.execute(ast, this.path);
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
        this.interpreter.interpret(ast, path);
        this.printer.flushBuffer();
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