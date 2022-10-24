import * as fs from "fs";
import { Lexer } from "./lexer";
import { Parser } from "./parser";
import { equalMode } from "./utils";
import { EqualRuntimeError, EqualUnexpectedError, ErrorHandler } from "./error";

class Equal {
  error: boolean;
  path: string;
  mode: equalMode;
  lexer: Lexer;
  parser: Parser;
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
      this.run();

    } catch(err) {
      this.errHandler.handleError(err);
    }
  }
  public run(): void {
    try {
      // is this line needed?
      if (this.error == false) {    
        this.verbose("Running in verbose mode");
        const tokens = this.lexer.lex(this.loadFile(), this.path);
        this.verbose(tokens);
        this.parser.parse(tokens, this.path);
        this.error = this.errHandler.getErrorStatus();
        this.execute();
        // check for error here
      }

    } catch(err) {
      this.errHandler.handleError(err);
    }
    
  }

  // always inside another function's try block
  private loadFile(): string {
    this.verbose("Loading file at " + this.path);
    const file = fs.readFileSync(this.path, "utf8");
    if (file == undefined) throw new EqualRuntimeError("Invalid path");
    else return file as string;
  }

  private stdout(output: string): void {

  }

  private stderr(output: string): void {

  }

  private execute() {
    try {
      if (this.error == false) {
      } else {
        // delete later
        this.verbose(this.errHandler.errors);
      }
      // exit?   

    } catch(err) {
      this.errHandler.handleError(err);
    }
     
  }

  private verbose(log: any): void {
    if (this.mode == equalMode.VERBOSE) console.info(log);
  }

}

export { Equal };