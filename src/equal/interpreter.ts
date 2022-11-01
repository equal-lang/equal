import { equalMode } from "./utils";
import { EqualRuntimeError, ErrorHandler } from "./error";
import { operatorType } from "./token";
import { ExpressionVisitor, Expression, Binary, Unary, Literal, Variable, Logical, Call } from "./expression";
import { StatementVisitor, Statement, Assignment, ExpressionStatement, Scope, ConditionalStatement, Loop, PrintStatement, FunctionDeclaration, ReturnStatement } from "./statement";
import { Environment } from "./environment";
import { isEqualCallable, EqualFunction, returnVal } from "./callable";
// import { Input } from "./foreign";
import { Printer } from "./printer";


class Interpreter implements ExpressionVisitor, StatementVisitor {
  mode: equalMode;
  errHandler: ErrorHandler;
  path: string;
  statements: Statement[];
  pointer: number;
  environment: Environment;
  global: Environment;
  printer: Printer;
  input: undefined | ((arg0: string) => string);

  constructor(mode: equalMode, errHandler: ErrorHandler, printer: Printer, input?: (arg0: string) => string,) {
    this.mode = mode;
    this.errHandler = errHandler;
    this.pointer = 0;
    const globalEnv = new Environment();
    this.environment = globalEnv;
    this.global = globalEnv;
    this.printer = printer;
    this.input = input;
  }

  public interpret(statements: Statement[], path: string) {
    this.path = path;
    this.statements = statements;
    // this.global.declareFunc("input", new Input());
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
        throw new EqualRuntimeError("Binary operator does not exist", this.path);
        break;
      }
    }
  }

  public visitLogical(host: Logical) {
    let arg1 = this.eval(host.arg1);
    let arg2;
    let operator = host.operator;
    switch (operator) {
      case operatorType.AND: {
        this.checkType(arg1, ["boolean"]);
        if (arg1 === true) {
          arg2 = this.eval(host.arg2);
          this.checkType(arg2, ["boolean"]);
          return arg2;
        } else return false;
        break;
      }
      case operatorType.OR: {
        this.checkType(arg1, ["boolean"]);
        if (arg1 === false) {
          arg2 = this.eval(host.arg2);
          this.checkType(arg2, ["boolean"]);
          return arg2;
        }
        else return true;
        break;
      }

      default: {
        throw new EqualRuntimeError("Logical operator does not exist", this.path);
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
        break;
      }
    }
  }

  public visitCall(host: Call) {
    // global function
    const func = this.global.getFunc(host.calleeName);
    if (!isEqualCallable(func)) throw new EqualRuntimeError("Object is not callable", this.path);
    const argList: (string | number | boolean)[] = [];
    for (let pointer = 0; pointer <= host.args.length - 1; pointer++) {
      let arg = this.eval(host.args[pointer]);
      this.checkType(arg, ["string", "number", "boolean"]);
      argList.push(arg);
    }
    if (argList.length != func.arity()) throw new EqualRuntimeError("Expected " + func.arity() + " arguments, got " + argList.length);
    return func.call(this, argList);
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
    if (host.scope == "global") this.global.assign(host.name, this.eval(host.expression));
    else this.environment.assign(host.name, this.eval(host.expression));
  }

  public visitFunctionDeclaration(host: FunctionDeclaration) {
    const func = new EqualFunction(host);
    // global functions
    this.global.declareFunc(host.name, func);
  }

  public visitReturnStatement(host: ReturnStatement) {
    if (this.environment == this.global) throw new EqualRuntimeError("No return statement allowed in global scope", this.path);
    throw new returnVal(this.eval(host.expression));
  }


  public visitExpressionStatement(host: ExpressionStatement) {
    this.eval(host.expression);
  }

  public visitConditionalStatement(host: ConditionalStatement) {
    let correctNum = -1;
    for (let c = 0; c < host.conditions.length; c++) {
      if (this.eval(host.conditions[c]) === true) {
        correctNum = c;
        break;
      }
    }
    // else statement available
    if (correctNum == -1 && (host.statements.length == host.conditions.length + 1)) {
      correctNum = host.statements.length - 1;
    }
    if (correctNum != -1) {
      for (let pointer = 0; pointer <= host.statements[correctNum].length - 1; pointer++) {
        this.exec(host.statements[correctNum][pointer]);
      }
    }
  }

  public visitLoop(host: Loop) {
    let cond = this.eval(host.condition);
    while(cond === true) {
      for (let pointer = 0; pointer <= host.statements.length - 1; pointer++) {
        this.exec(host.statements[pointer]);
      }
      cond = this.eval(host.condition);
    }
    
  }

  public visitPrintStatement(host: PrintStatement) {
    for (let pointer = 0; pointer <= host.expressions.length - 1; pointer++) {
      this.printer.print(this.eval(host.expressions[pointer]));
    }
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
    try {
      for (let pointer = 0; pointer <= stmts.length - 1; pointer++) {
        this.exec(stmts[pointer]);
      }

    } catch(err) {
      throw err;
    } finally {
      this.environment = prev;
    }
    
    // because thrown in the middle, never reached this statement
  }
  
  private checkType(val: any, type: string[]) {
    for (let t of type) {
      if (typeof val == t) return true;
    }
    throw new EqualRuntimeError("Unexpected type " + (typeof val), this.path);
  }

  public publicExecBlock(stmts: Statement[], env: Environment) {
    return this.execBlock(stmts, env);
  }
}

export {
  Interpreter
}