import * as fs from "fs";
import { Lexer } from "./lexer";
import { Parser } from "./parser";
import { Interpreter } from "./interpreter";
import { equalMode, equalOptions } from "./utils";
import { EqualRuntimeError, ErrorHandler } from "./error";
import { Statement } from "./statement";
import { Printer } from "./printer";
import { bigLexer } from "./big-lexer";

class Equal {
  error: boolean;
  path: string;
  source: string;
  mode: equalMode;
  lexer: Lexer;
  bigLexer: bigLexer;
  parser: Parser;
  interpreter: Interpreter;
  errHandler: ErrorHandler;
  printer: Printer;

  constructor({mode="NORMAL", path, source, output=console.log, input}: equalOptions) {
    // either path or source is required
    // source takes precedence
    try {
      if (mode == "VERBOSE") this.mode = equalMode.VERBOSE;
      else this.mode = equalMode.NORMAL;
      this.errHandler = new ErrorHandler(this.mode);
      this.error = false;
      this.printer = new Printer(output);
      this.lexer = new Lexer(this.mode, this.errHandler);
      this.bigLexer = new bigLexer(this.mode, this.errHandler);
      this.parser = new Parser(this.mode, this.errHandler);
      this.interpreter = new Interpreter(this.mode, this.errHandler, this.printer, input);

      if (!path && !source) throw new EqualRuntimeError("No source code found");
      else if (source) {
        this.source = source;
      } else if (path) {
        this.source = this.loadFile(path);
      }
      this.path = (path != undefined) ? path : "Unknown";

    } catch(err) {
      this.errHandler.handleError(err);
    }
  }

  public run() { 
    try {
      this.error = this.errHandler.getErrorStatus();
      if (this.error == false) {
        this.verbose("Running in verbose mode");
        const tokens = this.lexer.lex(this.source, this.path);
        this.verbose(tokens, "Tokens");
        const bigTokens = this.bigLexer.bigLex(tokens, this.path);
        this.verbose(bigTokens, "bigTokens");
        const ast = this.parser.parse(bigTokens, this.path);
        this.verbose(ast, "Statements");
        this.execute(ast, this.path);
        this.verbose(this.errHandler.errors, "Errors")
        this.verbose("Finished running script");
        return this.printer.allPrinted();
      }
    } catch(err) {
      this.errHandler.handleError(err);
    }
  }

  // always inside another function's try block
  private loadFile(path: string): string {
    this.verbose("Loading file at " + path);
    if (!fs.existsSync(path)) throw new EqualRuntimeError("Invalid path");
    const file = fs.readFileSync(path, "utf8");
    // undefined?
    return file as string;
  }


  private execute(ast: Statement[], path: string) {
    try {
      this.error = this.errHandler.getErrorStatus();
      if (this.error == false) {
        this.interpreter.interpret(ast, path);
      } else {
        this.verbose(this.errHandler.errors, "Errors");
      }
    } catch(err) {
      this.errHandler.handleError(err);
    }
     
  }

  private verbose(log: any, message?: string): void {
    if (this.mode == equalMode.VERBOSE) {
      if (message) this.printer.debug(message, log);
      // misc?
      else this.printer.debug("Process", log);
    }
  }
}

export { Equal };