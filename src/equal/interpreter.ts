import { equalMode } from "./utils";
import { EqualRuntimeError, ErrorHandler } from "./error";
import { operatorType } from "./token";
import { ExpressionVisitor, Expression, Binary, Unary, Literal, Variable } from "./expression";
import { StatementVisitor, Statement, Assignment, ExpressionStatement, Scope } from "./statement";
import { Environment } from "./environment";
// change name of visitor?

class Interpreter implements ExpressionVisitor, StatementVisitor {
  mode: equalMode;
  errHandler: ErrorHandler;
  path: string;
  statements: Statement[];
  pointer: number;
  environment: Environment;

  constructor(mode: equalMode, errHandler: ErrorHandler) {
    this.mode = mode;
    this.errHandler = errHandler;
    this.pointer = 0;
    this.environment = new Environment();
  }

  public interpret(statements: Statement[], path: string) {
    this.path = path;
    this.statements = statements;
    if (this.mode == equalMode.VERBOSE) console.info(this.statements);
    while (!(this.pointer > this.statements.length - 1)) {
      const statement = this.statements[this.pointer];
      this.exec(statement);
      this.pointer++;
    }
    if (this.mode == equalMode.VERBOSE) console.info(this.environment);
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
        return (arg1 > arg2);
        break;
      }
      case operatorType.LESSER_THAN: {
        this.checkType(arg1, ["number"]);
        this.checkType(arg2, ["number"]);
        return (arg1 < arg2);
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

  public visitVariable(host: Variable) {
    return this.environment.get(host.name);
  }

  public visitScope(host: Scope) {
    this.execBlock(host.statements, new Environment(this.environment));
  }

  public visitAssignment(host: Assignment): void {
    this.environment.assign(host.name, this.eval(host.expression));
  }

  public visitExpressionStatement(host: ExpressionStatement): void {
    this.eval(host.expression);
  }

  
  private eval(expr: Expression): any {
    return expr.accept(this);
  }

  private exec(stmt: Statement): void {
    return stmt.accept(this);
  }

  private execBlock(stmts: Statement[], env: Environment): void {
    let prev: Environment = this.environment;
    this.environment = env;
    let pointer = 0;
    while(!(pointer > stmts.length-1)) {
      this.exec(stmts[pointer]);
      pointer++;
    }
    this.environment = prev;
  } 
  private checkType(val: any, type: string[]) {
    for (let t of type) {
      if (typeof val == t) return true;
    }
    // need to find a way to get current line
    throw new EqualRuntimeError("Unexpected type " + (typeof val), this.path);
  }

}

export {
  Interpreter
}