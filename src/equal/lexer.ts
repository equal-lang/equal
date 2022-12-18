import { equalMode } from "./utils";
import { Token, tokenType } from "./token";
import { EqualSyntaxError, ErrorHandler } from "./error";


class Lexer {
  mode: equalMode;
  errHandler: ErrorHandler;
  path: string;

  source: string;

  line: number;
  tokens: Token[];
  leftPointer: number;
  rightPointer: number;

  constructor(mode: equalMode, errHandler: ErrorHandler) {
    this.mode = mode;
    this.errHandler = errHandler;
    this.source = "";
    this.line = 1;
    this.tokens = [];
    this.leftPointer = 0;
    this.rightPointer = 0;
  }

  public lex(source: string, path: string) {
    this.source = source;
    this.path = path;

    // how to deal with syntax errors?
    let inTag = false;

    while (!this.atEnd()) {
      let char: string = this.source[this.rightPointer];
      this.leftPointer = this.rightPointer;
      switch (char) {
        case "<": {
          if (this.condForward("!--", 3)) {
            this.rightPointer++;
            this.comment();
          }
          else {
            if (this.condForward("/")) {
              this.pushToken(tokenType.END_TAG_LEFT);
            } else {
              this.pushToken(tokenType.START_TAG_LEFT);
            }
            inTag = true;
            this.rightPointer++;
            this.tagname();
          }
          break;
        } case ">": {
          this.pushToken(tokenType.TAG_RIGHT);
          inTag = false;
          // this.rightPointer++;
          break;
        } case "=": {
          if (inTag) {
            this.pushToken(tokenType.EQUAL_SIGN);
            this.rightPointer++;
            this.value();
          }
          break;
        } case "/": {
          if (inTag && this.lookAhead() == ">") this.rightPointer++;
          break;
        } case "\n": {
          this.line++;
          break;
        } case " ":
          case "\t":
          case "\r": {
            break;
        }
        default: {
          if (inTag) this.pushToken(tokenType.ATTRIBUTE, (this.consumeWhile((char) => (char != "=" && !this.endOfTag(char) && !this.isWhitespace(char)))));
          else this.pushToken(tokenType.TEXT, this.consumeWhile((char) => (char != "<")).trim()); 
          break;
        }
      }
      this.rightPointer++;
    }

    this.pushToken(tokenType.EOF);

    return this.tokens;
  }

  private tagname(): void {
    this.pushToken(tokenType.TAGNAME, this.consumeWhile((char) => (!this.isWhitespace(char) && !this.endOfTag(char))));
  }

  // using pointers to slice off quotes
  private value(): void {
    let firstChar = this.source[this.rightPointer];
    let source: string;
    if (this.isWhitespace(firstChar)) {
      this.consumeWhile((char) => (this.isWhitespace(char)));
      this.rightPointer++;
      firstChar = this.source[this.rightPointer];
    }
    if (firstChar == "\"") {
      this.rightPointer++;
      source = this.consumeWhile((char) => (char != "\""));
      this.rightPointer++;
    }
    else if (firstChar == "'") {
      this.rightPointer++;
      source = this.consumeWhile((char) => (char != "'"));
      this.rightPointer++;
    } else {
      source = this.consumeWhile((char) => (!this.isWhitespace(char) && !this.endOfTag(char)));
    }
    this.pushToken(tokenType.VALUE, source);
    // this.numberOrString(source);
  }

  private comment(): void {
    // consumed
    this.consumeWhile((char) => {
      return (!(char == "-" && this.condForward("->", 2)));
    });
    // really consuming three characters
    this.rightPointer++;
  }

  private handleNewline(): void {
    let char: string = this.source[this.rightPointer];
    if (char == "\r") this.line++;
    if (char == "\n" && this.lookBehind() != "\r") this.line++;
  }

  // consume and return string while function returns true

  // rely on calling function to move pointer to start of string
  // pointer returned to the end of string to be advanced by the while loop above
  private consumeWhile(test: (char: string) => boolean): string {
    // this.rightPointer++;
    this.leftPointer = this.rightPointer;

    let char: string = this.source[this.rightPointer];
    let testResult = test(char);

    while (!this.atEnd() && testResult) {
      this.handleNewline();
      this.rightPointer++;
      char = this.source[this.rightPointer];
      testResult = test(char);
    }
    // if (testResult) this.reportError("Unexpected EOF");
    // multi-line string: use line number at the end of the string
    let ret = this.source.slice(this.leftPointer, this.rightPointer);
    this.rightPointer--;
    return ret;
  }

  private condForward(char: string, offset=1): boolean {
    if (!this.atEnd(offset) && char == this.source.slice(this.rightPointer + 1, this.rightPointer + offset + 1)) {
      this.rightPointer += offset;
      return true;
    } else return false;
  }

  private lookAhead(offset=1): string {
    if (!this.atEnd(offset)) return this.source.slice(this.rightPointer + 1, this.rightPointer + offset + 1);
    else return "";
  }

  private lookBehind(): string {
    if (!this.atEnd(-1)) return this.source[this.rightPointer-1];
    else return "";
  }

  private atEnd(offset=0): boolean {
    return (this.rightPointer + offset > this.source.length - 1);
  }

  private isWhitespace(char: string) {
    return (char == " " || char == "\t" || char == "\r");
  }

  private endOfTag(char: string) {
    return (char == ">" || (char == "/" && this.lookAhead() == ">"));
  }

  private pushToken(type: tokenType, value?: string): void {
    this.tokens.push(new Token(type, this.line, value));
  }

  private reportError(message: string) {
    const err = new EqualSyntaxError(message, this.path, this.line);
    this.errHandler.reportError(err);
  }
}

export { Lexer };
