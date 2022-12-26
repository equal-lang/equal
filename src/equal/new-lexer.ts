import { equalMode } from "./utils";
import { Token, tokenType } from "./token";
import { EqualSyntaxError, ErrorHandler } from "./error";
import { readFileSync } from "fs-extra";

function test() {
  const mode = equalMode.NORMAL;
  const lexer = new Lexer(mode, new ErrorHandler(mode));

  const source = readFileSync("./examples/fib.eq", { encoding: "utf-8"});
  
  const tokens = lexer.lex(source, "random");
  // const test = readFileSync("./lexer-test/lexer-test.json", { encoding: "utf-8"});
  // console.log(JSON.stringify(tokens) == test);
}

class Lexer {
  mode: equalMode;
  errHandler: ErrorHandler;
  path: string;
  source: string;

  constructor(mode: equalMode, errHandler: ErrorHandler) {
    this.mode = mode;
    this.errHandler = errHandler;

  }

  public lex(source: string, path: string) {
    this.source = source;
    this.path = path;

    return "";

  }
}

test();