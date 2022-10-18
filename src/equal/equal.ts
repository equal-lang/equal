import * as fs from "fs";
import { Lexer } from "./lexer";
import { Parser } from "./parser";
import { equalMode } from "./utils";

class Equal {
  error: boolean;
  path: string;
  mode: keyof typeof equalMode;
  lexer: Lexer;
  parser: Parser;

  constructor(path: string, mode: string) {
    try {
      this.error = false;
      this.path = path;
  
      if (mode == "VERBOSE") this.mode = equalMode.VERBOSE;
      else this.mode = equalMode.NORMAL;
  
      this.lexer = new Lexer(this.mode);
      this.parser = new Parser();
      this.run();

    } catch(err) {
      this.handleUnexpectedError(err);
    }
  }
  public run(): void {
    try {
      if (this.error == false) {    
        if (this.mode == equalMode.VERBOSE) console.info("Running in verbose mode");
        const tokens = this.lexer.lex(this.loadFile());
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

  
  private handleUnexpectedError(err: Error): void {
    if (this.mode == equalMode.VERBOSE) console.info(err);
    console.error("Unexpected Error: " + ((err.message == "") ? "Unknown Error" : err.message));
  }

}

export { Equal };