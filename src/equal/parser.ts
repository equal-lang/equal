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
    // console.log(this.tokens);
    // while (!this.atEnd()) {
      const expr = this.expression();
      console.dir(expr);
      // this.pointer++;
    // }
  }

  private expression(): Expression {
    return this.unary();
  }

  private logic(): Expression {

    // if (this.matchStartForm(["&&", "||"])) {
    //   if (!this.matchStartLabel()) this.throwError("Missing start label", this.tokens[this.pointer]["line"]);
    //   let left = this.literal();
    //   while(this.matchStartLabel()) {
    //     // if (!this.matchStartLabel()) this.throwError("Missing start label", this.tokens[this.pointer]["line"]);
    //     let operator = this.retPrevAttr("title");
    //     let right = this.literal();
    //     // expr = new Binary()
    //     console.log(left, right);
    //     if (!this.matchEndLabel()) this.throwError("Missing end label", this.tokens[this.pointer]["line"]);
    //     console.log("here")


    //   }
    //   if (!this.matchEndLabel()) this.throwError("Missing end label", this.tokens[this.pointer]["line"]);
    //   if (!this.matchEndForm()) this.throwError("Missing end form", this.tokens[this.pointer]["line"]);

      // return {left, right};

      // FORM
      // let expr = new Binary();

      return this.literal();
      // this.endExpression();

    // } else {
    //   // return this.equality();
    // }

    // return new Expression();
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
    if (this.matchStartForm(["!"])) {
      let operator = operatorMap.get(this.retPrevAttrE("title"));
      if (operator === undefined) throw new EqualUnexpectedError("Operator cannot be undefined", this.path, this.tokens[this.pointer]["line"]);
      this.force(this.matchStartLabel);
      let expr = this.literal();
      this.force(this.matchEndLabel);
      this.force(this.matchEndForm);
      return new Unary(operator, expr);

    } else {
      return this.literal();
    }
  }

  private literal(): Expression {
    this.force(this.matchText.bind(this));
    return new Literal(this.retPrevAttrE("value"));
  }
  
  
  private match(type: bigTokenType, name: string | undefined, attributeObj: {[k: string]: any}): boolean {
    let token;
    if (!this.atEnd()) token = this.tokens[this.pointer];
    else throw new EqualUnexpectedError("EOF reached", this.path, this.tokens[this.tokens.length-1]["line"]);
    if (token["type"] === type && token["name"] === name) {
      for (let item in attributeObj) {
        if (!attributeObj[item].includes(token["attribute"][item])) return false;
      }
      this.pointer++;
      return true;
    }

    return false;
  }

  private matchStartForm(title: string[]) {
    return this.match(bigTokenType.START_TAG, "form", {"title": title});
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
      const tokenName = this.tokens[this.pointer]["name"];
      this.throwError("Missing " + (tokenName ? tokenName : "tag"), this.tokens[this.pointer]["line"]);
    }
    return true;
  }


  private retPrevAttr(attribute: string): string | number | boolean | undefined {
    return this.tokens[this.pointer-1]["attribute"][attribute];
  }

  private retPrevAttrE(attribute: string): string | number | boolean {
    const val = this.retPrevAttr(attribute);
    if (val === undefined) throw new EqualUnexpectedError("Value of attribute cannot be undefined", this.path, this.tokens[this.pointer-1]["line"]);
    else return val;
  }

  // private endExpression() {
  //   if (!(this.matchEndLabel() && this.matchEndForm())) {
  //     throw new EqualSyntaxError("Missing end tags", this.path, this.tokens[this.pointer]["line"]);
  //   } 
  // }

  private atEnd(offset=0) {
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
