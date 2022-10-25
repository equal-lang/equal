import { equalMode } from "./utils";
import { Token, tokenType, operatorType, operatorMap } from "./token";
import { EqualSyntaxError, EqualRuntimeError, EqualUnexpectedError, ErrorHandler } from "./error";
import { Visitor, Expression, Binary, Unary, Literal } from "./expression";
import { bigLexer, BigToken, bigTokenType } from "./big-lexer";
import { boolean } from "yargs";

class Parser {
  mode: equalMode;
  errHandler: ErrorHandler;
  path: string;
  tokens: BigToken[];
  pointer: number;

  constructor(mode: equalMode, errHandler: ErrorHandler) {
    this.mode = mode;
    this.errHandler = errHandler;
    this.pointer = 0;
  }

  public parse(tokens: Token[], path: string) {
    this.path = path;
    this.tokens = bigLexer(tokens, this.path, this.errHandler);
    // while (!this.atEnd()) {
    const expr = this.expression();
    console.dir(expr);
    // this.pointer++;
    // }
  }

  private expression(): Expression {
    return this.logic();
  }

  private logic(): Expression {
    return this.retBinaryExpr(["&&", "||"], this.equality.bind(this));
  }

  private equality(): Expression {
    return this.retBinaryExpr(["==", "!="], this.comparsion.bind(this));
  }

  private comparsion(): Expression {
    return this.retBinaryExpr([">", "<"], this.addition.bind(this));
  }

  private addition(): Expression {
    return this.retBinaryExpr(["+", "-"], this.multiplication.bind(this));
  }

  private multiplication(): Expression {
    return this.retBinaryExpr(["*", "/"], this.unary.bind(this));
  }

  private unary(): Expression {
    if (this.matchStartForm(["!"])) {
      const operator = this.retOperator();
      this.force(this.matchStartLabel);
      let base = this.expression();
      this.force(this.matchEndLabel);
      this.force(this.matchEndForm);
      return new Unary(operator, base);
    } else {
      return this.literal();
    }
  }

  private literal(): Expression {
    this.force(this.matchText);
    return new Literal(this.retPrevAttrE("value"));
  }

  private retBinaryExpr(operatorList: string[], next: () => Expression) {
    if (this.matchStartForm(operatorList)) {
      const operator = this.retOperator();

      this.force(this.matchStartLabel);
      let base1 = this.expression();
      // next();
      this.force(this.matchEndLabel);

      this.force(this.matchStartLabel);
      let base2 = this.expression();
      // next();
      this.force(this.matchEndLabel);

      let base = new Binary(operator, base1, base2);
      while (this.matchStartLabel()) {
        let top = this.expression();
        base = new Binary(operator, base, top);
        this.force(this.matchEndLabel);
      }

      this.force(this.matchEndForm);
      return base;

    } else {
      return next();
      // precedence only decide which order expressions are tested in 
    }
  }



  private match(type: bigTokenType, name: string | undefined, attributeObj: { [k: string]: any }): boolean {
    let token;
    if (!this.atEnd()) token = this.tokens[this.pointer];
    else throw new EqualUnexpectedError("EOF reached", this.path, this.tokens[this.tokens.length - 1]["line"]);
    if (token["type"] === type && token["name"] === name) {
      for (let item in attributeObj) {
        if (!attributeObj[item].includes(token["attribute"][item])) return false;
      }
      this.pointer++;
      return true;
    }
    console.log(type, name, attributeObj);
    return false;
  }

  private matchStartForm(title: string[]) {
    return this.match(bigTokenType.START_TAG, "form", { "title": title });
  }

  private matchStartLabel() {
    return this.match(bigTokenType.START_TAG, "label", {});
  }

  private matchText(): boolean {
    return this.match(bigTokenType.TEXT, undefined, {});
  }

  private matchEndLabel() {
    return this.match(bigTokenType.END_TAG, "label", {});
  }

  private matchEndForm() {
    return this.match(bigTokenType.END_TAG, "form", {});
  }

  private force(func: () => boolean) {
    if (!func.bind(this)()) {
      const token = this.tokens[this.pointer];
      // better to get what is trying to match from the match function somehow
      let text;
      if (token["type"] == bigTokenType.START_TAG) text = "start " + token["name"];
      else if (token["type"] == bigTokenType.END_TAG) text = "end " + token["name"];
      else text = "text";
      this.throwError("Wrong " + text, this.tokens[this.pointer]["line"]);
    }
    return true;
  }


  private retPrevAttr(attribute: string): string | number | boolean | undefined {
    return this.tokens[this.pointer - 1]["attribute"][attribute];
  }

  private retPrevAttrE(attribute: string): string | number | boolean {
    const val = this.retPrevAttr(attribute);
    if (val === undefined) throw new EqualUnexpectedError("Value of attribute cannot be undefined", this.path, this.tokens[this.pointer - 1]["line"]);
    else return val;
  }

  private retOperator() {
    let operator = operatorMap.get(this.retPrevAttrE("title"));
    if (operator === undefined) throw new EqualUnexpectedError("Operator cannot be undefined", this.path, this.tokens[this.pointer]["line"]);
    return operator;
  }

  private atEnd(offset = 0) {
    return (this.pointer + offset > this.tokens.length - 1);
  }

  // local error methods
  private throwError(message: string, line?: number) {
    throw new EqualSyntaxError(message, this.path, line);
  }

  private reportError(message: string, line?: number) {
    this.errHandler.reportError(new EqualSyntaxError(message, this.path, line));
  }
}


export { Parser };
