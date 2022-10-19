import { equalMode } from "./utils";
import { Token, tokenType } from "./token";
import { errorHandler } from "./error";



class Lexer {
  mode: keyof typeof equalMode;
  errHandler: errorHandler;
  leftPointer: number;
  rightPointer: number;
  line: number;
  content: string;
  path: string;
  tokens: Token[];

  constructor(mode: keyof typeof equalMode, errHandler: errorHandler) {
    this.mode = mode;
    this.errHandler = errHandler;
    this.content = "";
    this.leftPointer = 0;
    this.rightPointer = 0;
    this.line = 1;
    this.tokens = []
  }

  public lex(content: string, path: string) {
    this.content = content;
    this.path = path;
    while (!this.atEnd()) {
      let char: string = this.content[this.rightPointer];
      this.leftPointer = this.rightPointer;
      switch (char) {
        case "<": {
          if (this.condForward("/")) this.pushToken(tokenType.END_TAG_LEFT);
          else this.pushToken(tokenType.START_TAG_LEFT);
          break;
        } case ">": {
          this.pushToken(tokenType.TAG_RIGHT);
          break;
        } case "=": {
          this.pushToken(tokenType.EQUAL_SIGN);
          break;
        } case "\n": {
          this.line++;
          break;
        } default: {
          this.reportError("Invalid character");

          break;
        }

        
      }


      this.rightPointer++;
    }
    this.pushToken(tokenType.EOF);

    return this.tokens;

  }

  private atEnd(offset=0): boolean {
    return (this.rightPointer + offset > this.content.length - 1);
  }

  private lastChar(): boolean {
    return this.atEnd(1);
  }

  private pushToken(type: tokenType): void {
    this.tokens.push(new Token(type, this.line));
  }

  private condForward(char: string): boolean {
    if (!this.lastChar() && char == this.content[this.rightPointer+1]) {
      this.rightPointer++;
      return true;
    } else return false;
  }

  private reportError(message: string) {
    this.errHandler.reportError(message, this.path, this.line);
  }
}

export { Lexer };
