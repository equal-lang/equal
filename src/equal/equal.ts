import * as fs from "fs";
import { Lexer } from "./lexer";
import { Parser } from "./parser";
import { equalMode } from "./utils";
import { errorHandler } from "./error";

class Equal {
  error: boolean;
  path: string;
  mode: keyof typeof equalMode;
  lexer: Lexer;
  parser: Parser;
  errHandler: errorHandler;

  constructor(path: string, mode: string) {
    try {
      if (mode == "VERBOSE") this.mode = equalMode.VERBOSE;
      else this.mode = equalMode.NORMAL;

      this.error = false;
      this.path = path;
      this.errHandler = new errorHandler(this.mode);
      this.lexer = new Lexer(this.mode, this.errHandler);
      this.parser = new Parser();
      this.run();

    } catch(err) {
      this.handleUnexpectedError(err);
    }
  }
  public run(): void {
    try {
      // is this line needed?
      if (this.error == false) {    
        if (this.mode == equalMode.VERBOSE) console.info("Running in verbose mode");
        const tokens = this.lexer.lex(this.loadFile(), this.path);
        console.log(tokens);
        this.error = this.errHandler.getErrorStatus();
        this.execute();
        // check for error here
      }

    } catch(err) {
      this.handleUnexpectedError(err);
    }
    
  }

  private loadFile() {
    if (this.mode == equalMode.VERBOSE) console.info("Loading file at " + this.path);
    return fs.readFileSync(this.path, "utf8");
  }

  private stdout(output: string): void {

  }

  private stderr(output: string): void {

  }

  private execute() {
    if (this.error == false) {
    } else {
      // delete later
      console.log(this.errHandler.errors);
    }
    // exit?    

  }

  // handle unexpected errors in interpreter code
  private handleUnexpectedError(err: Error): void {
    if (this.mode == equalMode.VERBOSE) console.info(err);
    console.error("Unexpected Error: " + ((err.message == "") ? "Unknown Error" : err.message));
  }

}

export { Equal };