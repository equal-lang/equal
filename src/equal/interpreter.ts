import { equalMode } from "./utils";
import { EqualRuntimeError, EqualSyntaxError, ErrorHandler } from "./error";
import { operatorType } from "./token";
import { Visitor, Expression, Binary, Unary, Literal } from "./expression";
// change name of visitor?

class Interpreter extends Visitor {
  mode: equalMode;
  errHandler: ErrorHandler;
  path: string;

  constructor(mode: equalMode, errHandler: ErrorHandler) {
    super();
    this.mode = mode;
    this.errHandler = errHandler;
  }

  public interpret(ast: Expression, path: string) {
    this.path = path;
    return this.eval(ast);
  }

  public visitBinary(host: Binary): string | number | boolean {
    // write custom operators for comparsion
    let arg1 = this.eval(host.arg1);
    let arg2 = this.eval(host.arg2);
    let operator = host.operator;
    switch (operator) {
      case operatorType.AND: {
        this.checkType(arg1, ["boolean"]);
        this.checkType(arg2, ["boolean"]);
        return (arg1 && arg2);
        break;
      }
      case operatorType.OR: {
        this.checkType(arg1, ["boolean"]);
        this.checkType(arg2, ["boolean"]);
        return (arg1 || arg2);
        break;
      }
      case operatorType.EQUAL: {
        return (arg1 === arg2);
        break;
      }
      case operatorType.NOT_EQUAL: {
        return (arg1 !== arg2);
        break;
      }
      case operatorType.GREATER_THAN: {
        this.checkType(arg1, ["number"]);
        this.checkType(arg2, ["number"]);
        return (this.greaterThan(arg1, arg2));
        break;
      }
      case operatorType.LESSER_THAN: {
        this.checkType(arg1, ["number"]);
        this.checkType(arg2, ["number"]);
        return (this.lesserThan(arg1, arg2));
        break;
      }
      case operatorType.PLUS: {
        this.checkType(arg1, ["number"]);
        this.checkType(arg2, ["number"]);
        return (arg1 + arg2);
        break;
      }
      case operatorType.MINUS: {
        this.checkType(arg1, ["number"]);
        this.checkType(arg2, ["number"]);
        return (arg1 - arg2);
        break;
      }
      case operatorType.MULTIPLY: {
        this.checkType(arg1, ["number"]);
        this.checkType(arg2, ["number"]);
        return (arg1 * arg2);
        break;
      }
      case operatorType.DIVIDE: {
        this.checkType(arg1, ["number"]);
        this.checkType(arg2, ["number"]);
        if (arg2 == 0) throw new EqualRuntimeError("Division by zero", this.path);
        return (arg1 / arg2);
        break;
      }
      default: {
        throw new EqualRuntimeError("Operator does not exist", this.path);
        break;
      }
    }
  }

  public visitUnary(host: Unary): boolean {
    let arg1: boolean = this.eval(host.arg1);
    let operator = host.operator;
    switch (operator) {
      case operatorType.NOT: {
        this.checkType(arg1, ["boolean"]);
        return (!(arg1));
        break;
      }
      default: {
        throw new EqualRuntimeError("Operator does not exist", this.path);
        // error
        break;
      }
    }
  }

  public visitLiteral(host: Literal): string | number | boolean {
    this.checkType(host.arg, ["string", "number", "boolean"]);
    return host.arg;
  }

  private eval(expr: Expression): any {
    return expr.accept(this);
  }

  private checkType(val: any, type: string[]) {
    for (let t of type) {
      if (typeof val == t) return true;
    }
    // need to find a way to get current line
    throw new EqualRuntimeError("Unexpected type " + (typeof val), this.path);
  }

  private greaterThan(a: number, b: number) {
    if (a > b) return a;
    else return b;
  }

  private lesserThan(a: number, b: number) {
    if (a < b) return a;
    else return b;
  }

}

export {
  Interpreter
}