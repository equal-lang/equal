import { equalMode } from "./utils";
import { Token, tokenType } from "./token";
import { EqualRuntimeError, EqualUnexpectedError, ErrorHandler } from "./error";
import * as Expression from "./expression";

class Parser {
  mode: keyof typeof equalMode;
  errHandler: ErrorHandler;
  path: string;
  tokens: Token[];
  pointer: number;

  constructor(mode: keyof typeof equalMode, errHandler: ErrorHandler) {
    this.mode = mode;
    this.errHandler = errHandler;
    this.pointer = 0;
  }

  public parse(tokens: Token[], path: string) {
    this.tokens = tokens;
    this.path = path;
    while (!this.atEnd()) {
      // different from implementation in lexer, incrementing the pointer at the start instead
      const t: Token = this.consumeToken();
    }
  }

  private expression(): Expression.Expression {
    return this.logic();
  }

  private logic(): Expression.Expression {
    return this.equality();
  }

  private equality(): Expression.Expression {
    return this.comparsion();
  }
  
  private comparsion(): Expression.Expression {
    return this.addition();
  }

  private addition(): Expression.Expression {
    return this.multiplication();
  }

  private multiplication(): Expression.Expression {
    return this.unary();
  }

  private unary(): Expression.Expression {
    return this.literal();
  }

  private literal(): Expression.Expression {
    return new Expression.Literal(true);
  }

  private checkTagname(token: Token) {
    if (token["tokenType"] == tokenType.TAGNAME) {
      return this.checkString(token["value"]);
    }
    else throw new Error("The token is not a tagname");
  }

  private checkAttribute(token: Token): string {
    if (token["tokenType"] == tokenType.ATTRIBUTE) {
      return this.checkString(token["value"]);
    }
    else throw new Error("The token is not an attribute");
  }

  private wrapValue(token: Token): number | boolean | string {
    if (token["tokenType"] == tokenType.VALUE) {
      const val = this.checkString(token["value"]);
      if (!isNaN(Number(val))) return Number(val);
      else if (val === "true" || val == "false") return (val === "true");
      // val must be string
      else return val;
    }
    else throw new Error("The token is not a value");
  }

  private checkString(val: string | number | undefined): string {
    if (val != undefined && typeof val != "number") return String(val);
    else throw new Error(val + "is not a string");
  }


  // possible function that return arrays?
  private consumeToken(): Token {
    if (!this.atEnd()) this.pointer++;
    return this.tokens[this.pointer - 1];
  }


  private atEnd(offset=0) {
    return (this.pointer + offset > this.tokens.length - 1);
  }

  // what if value is undefined?
  // private tagname(token: Token): tagnameType | undefined {
  //   if (token["tokenType"] == tokenType.TAGNAME) {
  //     return tagnameMap.get(token["value"]);
  //   }
  //   else return undefined;
  // }

  
}


export { Parser };
