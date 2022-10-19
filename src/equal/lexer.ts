import { equalMode } from "./utils";
import { Token, tokenType } from "./token";
import { errorHandler } from "./error";



class flags {

}

class Lexer {
  mode: keyof typeof equalMode;
  errHandler: errorHandler;
  path: string;
  
  content: string;

  line: number;
  tokens: Token[];
  leftPointer: number;
  rightPointer: number;

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
          else if (this.lookAhead() == "!") {
            // WORKING
            this.rightPointer++;
            this.comment();
          }
          else this.pushToken(tokenType.START_TAG_LEFT);
          this.rightPointer++;
          this.tagname();
          break;
        } case ">": {
          this.pushToken(tokenType.TAG_RIGHT);
          this.rightPointer++;
          this.text();
          break;
        } case "=": {
          // NEED IDENTIFER
          this.pushToken(tokenType.EQUAL_SIGN);
          this.rightPointer++;
          this.value();
          break;
        } case "\n": {
          this.line++;
          break;
        } case " ":6
          case "\t":
          case "\r": {
            break;
        }
        default: {
          // this.reportError("Invalid character");
          break;
        }
      }
      this.rightPointer++;
    }
    this.pushToken(tokenType.EOF);

    return this.tokens;

  }

  private tagname(): void {
    this.pushToken(tokenType.TAGNAME, this.consumeWhile((char) => (!this.isWhitespace(char) && !(char == ">"))));
  }

  private value(): void {
    let firstChar = this.content[this.rightPointer];
    let content: string;
    if (this.isWhitespace(firstChar)) {
      this.consumeWhile((char) => (this.isWhitespace(char)));
      this.rightPointer++;
      firstChar = this.content[this.rightPointer];
    }
    if (firstChar == "\"") {
      this.rightPointer++;
      content = this.consumeWhile((char) => (char != "\""));
      this.rightPointer++;
    }
    else if (firstChar == "'") {
      this.rightPointer++;
      content = this.consumeWhile((char) => (char != "'"));
      this.rightPointer++;
    } else {
      content = this.consumeWhile((char) => (!this.isWhitespace(char) && char != ">"));
    }
    this.pushToken(tokenType.VALUE, content);
    // this.numberOrString(content);
  }

  // private numberOrString(data: string) {
  //   if (!isNaN(Number(data))) {
  //     this.pushToken(tokenType.NUMBER, Number(data));
  //   }
  //   else this.pushToken(tokenType.STRING, String(data));
  // }

  

  private text(): void {
    let content: string = this.consumeWhile((char) => (char != "<"));
    if (content != "") this.pushToken(tokenType.TEXT, content);
  }

  private comment(): void {
    this.consumeWhile((char) => (char != ">"));

  }

  // consume and return string while function returns true
  private consumeWhile(test: (char: string) => boolean): string {
    // this.rightPointer++;
    this.leftPointer = this.rightPointer;

    let char: string = this.content[this.rightPointer];
    let testResult = test(char);

    while (!this.atEnd() && testResult) {
      this.handleNewline();
      this.rightPointer++;
      char = this.content[this.rightPointer];
      testResult = test(char);
    }

    if (testResult) this.reportError("Unexpected EOF");
    // multi-line string: use line number at the end of the string
    let ret = this.content.slice(this.leftPointer, this.rightPointer);
    this.rightPointer--;
    return ret;
  }

  private condForward(char: string): boolean {
    if (!this.lastChar() && char == this.content[this.rightPointer+1]) {
      this.rightPointer++;
      return true;
    } else return false;
  }

  private lookAhead(offset=1): string {
    if (!this.atEnd(offset)) return this.content.slice(this.rightPointer + 1, this.rightPointer + offset + 1);
    else return "";
  }

  private lookBehind(): string {
    if (!this.lastChar()) return this.content[this.rightPointer-1];
    else return "";
  }

  private handleNewline(): void {
    let char: string = this.content[this.rightPointer];
    if (char == "\r") this.line++;
    if (char == "\n" && this.lookBehind() != "\r") this.line++;
  }

  private isWhitespace(char: string) {
    return (char == " " || char == "\t" || char == "\r");
  }

  private atEnd(offset=0): boolean {
    return (this.rightPointer + offset > this.content.length - 1);
  }

  private lastChar(): boolean {
    return this.atEnd(1);
  }

  private pushToken(type: tokenType, value?: string | number): void {
    this.tokens.push(new Token(type, this.line, value));
  }

  private reportError(message: string) {
    this.errHandler.reportError(message, this.path, this.line);
  }
}

export { Lexer };
