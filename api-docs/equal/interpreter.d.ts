import { equalMode } from "./utils";
import { ErrorHandler } from "./error";
import { ExpressionVisitor, Binary, Unary, Literal, Variable, Logical, Call } from "./expression";
import { StatementVisitor, Statement, Assignment, ExpressionStatement, Scope, ConditionalStatement, Loop, PrintStatement, FunctionDeclaration, ReturnStatement } from "./statement";
import { Environment } from "./environment";
import { Printer } from "./printer";
declare class Interpreter implements ExpressionVisitor, StatementVisitor {
    mode: equalMode;
    errHandler: ErrorHandler;
    path: string;
    statements: Statement[];
    pointer: number;
    environment: Environment;
    global: Environment;
    printer: Printer;
    input: undefined | ((arg0: string) => string);
    constructor(mode: equalMode, errHandler: ErrorHandler, printer: Printer, input?: (arg0: string) => string);
    interpret(statements: Statement[], path: string): void;
    visitBinary(host: Binary): string | number | boolean;
    visitLogical(host: Logical): any;
    visitUnary(host: Unary): boolean;
    visitCall(host: Call): any;
    visitLiteral(host: Literal): string | number | boolean;
    visitVariable(host: Variable): string | number | boolean;
    visitScope(host: Scope): void;
    visitAssignment(host: Assignment): void;
    visitFunctionDeclaration(host: FunctionDeclaration): void;
    visitReturnStatement(host: ReturnStatement): void;
    visitExpressionStatement(host: ExpressionStatement): void;
    visitConditionalStatement(host: ConditionalStatement): void;
    visitLoop(host: Loop): void;
    visitPrintStatement(host: PrintStatement): void;
    private eval;
    private exec;
    private execBlock;
    private checkType;
    publicExecBlock(stmts: Statement[], env: Environment): void;
}
export { Interpreter };
