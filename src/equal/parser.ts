import { equalMode } from "./utils";
import { Token, tokenType, operatorType, operatorMap } from "./token";
import { EqualSyntaxError, EqualRuntimeError, EqualUnexpectedError, ErrorHandler } from "./error";
import { Visitor, Expression, Binary, Unary, Literal } from "./expression";

class Parser {
  mode: equalMode;
  errHandler: ErrorHandler;
  path: string;
  tokens: Token[];
  pointer: number;

  constructor(mode: equalMode, errHandler: ErrorHandler) {
    this.mode = mode;
    this.errHandler = errHandler;
    this.pointer = 0;
  }

  public parse(tokens: Token[], path: string) {
    this.tokens = tokens;
    this.path = path;
    while (!this.atEnd()) {
      // console.log(this.expression());
      if (this.checkType(tokenType.TEXT) !== null) {
        const expr = this.expression();
      }
      this.pointer++;
    }
  }

  private expression(): Expression {
    return this.logic();
  }

  private logic(): Expression {
    const token = this.tokens[this.pointer];
    // new Binary(operator, arg1, arg2);
    if (this.match(this.checkType(tokenType.START_TAG_LEFT), [])
    && this.match(this.checkType(tokenType.TAGNAME), ["form"])) {
      // pass 
    } else this.reportError("", this.tokens[this.pointer]["line"]);

    // if (testResult) this.reportError("Unexpected EOF");
    // && this.match(this.checkType(tokenType.ATTRIBUTE), ["title"])
    // && this.match(this.checkType(tokenType.VALUE), ["&&", "||"])) {
      // console.log(operatorMap.get(token["value"]));
    // } // then use token to construct
    return this.literal();
    return this.equality();
  }

  private equality(): Expression {
    return this.comparsion();
  }
  
  private comparsion(): Expression {
    return this.addition();
  }

  private addition(): Expression {
    return this.multiplication();
  }

  private multiplication(): Expression {
    return this.unary();
  }

  private unary(): Expression {
    return this.literal();
  }

  private literal(): Expression {
    // is text
    if (this.checkType(tokenType.TEXT) !== null) {
      return new Literal(this.wrapValue(this.tokens[this.pointer]));
    }
    // better error messages?
    else throw new EqualUnexpectedError("The expression is not a literal");
  }


  
  private checkType(type: tokenType): string | undefined | null {
    const token = this.tokens[this.pointer];
    if (!this.atEnd() && token["tokenType"] == type) {
      // if tokenType right, either string or undefined
      return token["value"];
    } else return null;
  }

  private match(val: string | undefined | null, check: string[]): boolean {
    // check if value matches; if empty list, check if value undefined
    if (check.length == 0 && val === undefined) {
      this.pointer++;
      return true;
    }
    else {
      for (let item of check) {
        if (val === item) {
          this.pointer++;
          return true;
        }
      }
    }
    return false;
  }
  
  private wrapValue(token: Token): string | number | boolean {
    const val = token["value"];
    // better error message?
    if (val === undefined) throw new EqualUnexpectedError("The value of a literal cannot be undefined");
    else if (!isNaN(Number(val))) return Number(val);
    else if (val === "true" || val == "false") return (val === "true");
    // val must be string
    else return val;
  }

  private atEnd(offset=0) {
    return (this.pointer + offset > this.tokens.length - 1);
  }

  private reportError(message: string, line?: number) {
    const err = new EqualSyntaxError(message, this.path, line);
    this.errHandler.reportError(err);
  }
}


export { Parser };
