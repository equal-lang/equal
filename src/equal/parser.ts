import { equalMode } from "./utils";
import { Token, operatorMap, operatorType } from "./token";
import { EqualSyntaxError, ErrorHandler } from "./error";
import { Expression, Binary, Logical, Unary, Literal, Variable, Call } from "./expression";
import { Statement, Scope, Assignment, ExpressionStatement, ConditionalStatement, PrintStatement, Loop, FunctionDeclaration, ReturnStatement } from "./statement";
import { bigLexer, BigToken, bigTokenType } from "./big-lexer";

class Parser {
  mode: equalMode;
  errHandler: ErrorHandler;
  path: string;
  tokens: BigToken[];
  pointer: number;
  statements: Statement[];

  constructor(mode: equalMode, errHandler: ErrorHandler) {
    this.mode = mode;
    this.errHandler = errHandler;
    this.pointer = 0;
    this.statements = [];
  }
  

  public parse(tokens: Token[], path: string) {
    this.path = path;
    this.tokens = bigLexer(tokens, this.path, this.errHandler);
    if (this.mode == equalMode.VERBOSE) console.debug("bigTokens", this.tokens);
    while (!this.atEnd()) {
      this.statements.push(this.statement());
      // this.pointer++;
    }
    return this.statements;
  }

  private statement(): Statement {
    return this.scope();
  }

  private scope(): Statement {
    if (this.match(bigTokenType.START_TAG, "div", {})) {
      let statements: Statement[] = [];
      while(!this.match(bigTokenType.END_TAG, "div", {})) {
        statements.push(this.statement());
      }
      return new Scope(statements);
      // this.force(() => this.match(bigTokenType.END_TAG, "div", {}));
    } else {
      return this.assignment();
    }

  }

  private assignment(): Statement {

    if (this.match(bigTokenType.START_TAG, "a", {})) {
      const name = this.retPrevAttrE("id");
      const scope = (this.retPrevAttr("class") == "global") ? "global" : undefined;
      this.checkString(name, "a id");
      let expr: Expression = this.expression();
      this.force(() => this.match(bigTokenType.END_TAG, "a", {}));
      return new Assignment(name as string, expr, scope);
    } else {
      return this.functionDeclaration();
    }
  }

  // add another function to avoid manipulating the pointer
  private functionDeclaration() {
    
    if (this.match(bigTokenType.START_TAG, "form", {"id": undefined})) {
      const name = this.retPrevAttrE("id");
      this.checkString(name, "function name");
      let params = [];
      while (this.match(bigTokenType.START_TAG, "input", {})) {
        let id = this.retPrevAttrE("id");
        this.checkString(id, "input id");
        params.push(id as string);
      }
      let statements: Statement[] = [];
      this.force(() => this.match(bigTokenType.START_TAG, "div", {}));
      while (!this.match(bigTokenType.END_TAG, "div", {})) {
        statements.push(this.statement());
      }
      this.force(() => this.match(bigTokenType.END_TAG, "form", {}))
      return new FunctionDeclaration(name as string, params, statements);

    }
    else return this.returnStatement();
  }

  private returnStatement() {
    if (this.match(bigTokenType.START_TAG, "input", {"type": ["submit"]})) {
      return new ReturnStatement(this.expression());
    }
    else return this.loop();
  }

  private loop(): Statement {
    if (this.match(bigTokenType.START_TAG, "p", {})) {
      let statements: Statement[] = [];
      let condition: Expression = this.expression();
      while(!this.match(bigTokenType.END_TAG, "p", {})) {
        statements.push(this.statement());
      }
      return new Loop(condition, statements);
    }
    else return this.conditionalStatement();
  }

  private conditionalStatement(): Statement {
    
    if (this.match(bigTokenType.START_TAG, "h1", {})) {
      let statements: Statement[][] = [];
      let conditions: Expression[] = [];
      let stmts: Statement[] = [];
      let expr: Expression = this.expression();

      while(!this.match(bigTokenType.END_TAG, "h1", {})) {
        stmts.push(this.statement());
      }
      statements.push(stmts);
      conditions.push(expr);
      // rewrite to avoid repeating?
      for (let i = 2; i <= 5; i++) {
        if (this.match(bigTokenType.START_TAG, "h" + i, {})) {
          expr = this.expression();
          stmts = [];
          while(!this.match(bigTokenType.END_TAG, "h" + i, {})) {
            stmts.push(this.statement());
          }
          statements.push(stmts);
          conditions.push(expr);
        }
      }
      if (this.match(bigTokenType.START_TAG, "h6", {})) {
        stmts = [];
        while(!this.match(bigTokenType.END_TAG, "h6", {})) {
          stmts.push(this.statement());
        }
        statements.push(stmts);
      }
      return new ConditionalStatement(conditions, statements);
    } else {
      return this.printStatement();
    }

  }

  private printStatement(): Statement {
    let expressions: Expression[] = [];
    if (this.match(bigTokenType.START_TAG, "span", {})) {
      while(!this.match(bigTokenType.END_TAG, "span", {})) {
        expressions.push(this.expression());
      }
      return new PrintStatement(expressions);
    } else return this.expressionStatement();
  }

  private expressionStatement(): Statement {
    return new ExpressionStatement(this.expression());
  }

  
  private expression(): Expression {
    return this.logic();
  }

  private logic(): Expression {
    return this.retNestedLogicalExpr(["&&", "||"], this.equality.bind(this));
  }

  private equality(): Expression {
    return this.retBinaryExpr(["==", "!="], this.comparsion.bind(this));
  }

  private comparsion(): Expression {
    return this.retBinaryExpr([">", "<"], this.addition.bind(this));
  }

  private addition(): Expression {
    return this.retNestedBinaryExpr(["+", "-"], this.multiplication.bind(this));
  }

  private multiplication(): Expression {
    return this.retNestedBinaryExpr(["*", "/"], this.unary.bind(this));
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
      return this.call();
    }
  }

  private call(): Expression {
    if (this.match(bigTokenType.START_TAG, "form", {})) {
      let calleeName = this.retPrevAttrE("title");
      this.checkString(calleeName, "callee name");
      let args: Expression[] = [];
      
      if (this.matchStartLabel()) {
        while (!this.matchEndLabel()) {
          let arg = this.expression();
          args.push(arg);
        }
      }

      this.force(this.matchEndForm);
      return new Call(calleeName as string, args);
    }
    else return this.primary();
  }

  private primary(): Expression {
    if (this.matchText()) return new Literal(this.retPrevAttrE("value"));
    else {
      this.force(() => this.match(bigTokenType.START_TAG, "a", {}));
      // if (this.retPrevAttr("id") !== undefined) this.throwError("Href and id cannot be used in the same a tag", this.tokens[this.pointer]["line"]);
      const name = this.retPrevAttrE("href");
      this.checkString(name, "a href");
      this.force(() => this.match(bigTokenType.END_TAG, "a", {}));
      return new Variable(name as string);
    }
  }


  private retBinaryExpr(operatorList: string[], next: () => Expression) {
    if (this.matchStartForm(operatorList)) {
      const operator = this.retOperator();

      this.force(this.matchStartLabel);
      let base1 = this.expression();
      this.force(this.matchEndLabel);

      this.force(this.matchStartLabel);
      let base2 = this.expression();
      this.force(this.matchEndLabel);
      this.force(this.matchEndForm);
      return new Binary(operator, base1, base2);

    } else {
      return next();
    }
    
  }


  private retNestedExpr(operatorList: string[], next: () => Expression, cls: any) {
    if (this.matchStartForm(operatorList)) {
      const operator = this.retOperator();

      this.force(this.matchStartLabel);
      let base1 = this.expression();
      this.force(this.matchEndLabel);

      this.force(this.matchStartLabel);
      let base2 = this.expression();
      this.force(this.matchEndLabel);

      let base = new cls(operator, base1, base2);
      while (this.matchStartLabel()) {
        let top = this.expression();
        base = new cls(operator, base, top);
        this.force(this.matchEndLabel);
      }

      this.force(this.matchEndForm);
      return base;

    } else {
      return next();
      // precedence only decide which order expressions are tested in 
    }
  }

  private retNestedBinaryExpr(operatorList: string[], next: () => Expression ) {
    return this.retNestedExpr(operatorList, next, Binary);
  }

  private retNestedLogicalExpr(operatorList: string[], next: () => Expression) {
    return this.retNestedExpr(operatorList, next, Logical);
  }

  private match(type: bigTokenType, name: string | undefined, attributeObj: { [k: string]: string[] | undefined }): boolean {
    let token: BigToken;
    if (!this.atEnd()) token = this.tokens[this.pointer];
    else {
      return false;
    }
    if (token!["type"] === type && token!["name"] === name) {
      for (let item in attributeObj) {
        if (attributeObj[item] == undefined) {
          if (!token!["attribute"][item]) return false; 
        }
        else if (!attributeObj[item]!.includes(token!["attribute"][item])) return false;
      }
      this.pointer++;
      return true;
    }
    // console.log(type, name, attributeObj);
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
      if (this.pointer > this.tokens.length - 1) this.throwError("Unexpected EOF", this.tokens[this.tokens.length - 1]["line"]);
      const token = this.tokens[this.pointer];
      // better to get what is trying to match from the match function somehow
      let text;
      if (token["type"] == bigTokenType.START_TAG) text = "start " + token["name"];
      else if (token["type"] == bigTokenType.END_TAG) text = "end " + token["name"];
      else text = "text";
      this.throwError("Unexpected " + text, this.tokens[this.pointer]["line"]);
    }
    return true;
  }


  private retPrevAttr(attribute: string): string | number | boolean | undefined {
    return this.tokens[this.pointer - 1]["attribute"][attribute];
  }

  private retPrevAttrE(attribute: string): string | number | boolean {
    const val = this.retPrevAttr(attribute);
    if (val === undefined) {
      this.throwError("Value of attribute " + attribute + " cannot be undefined", this.tokens[this.pointer - 1]["line"]);
    }
    return val as string | number | boolean;
  }

  private retOperator() {
    let operator = operatorMap.get(this.retPrevAttrE("title"));
    if (operator === undefined) this.throwError("Operator cannot be undefined", this.tokens[this.pointer]["line"]);
    return operator;
  }

  private atEnd(offset = 0) {
    return (this.pointer + offset > this.tokens.length - 1);
  }

  private checkString(val: any, name?: string) {
    if (typeof val != "string") this.throwError("String value expected for " + name, this.tokens[this.pointer]["line"]);
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
