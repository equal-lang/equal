import { Expression } from "./expression";
interface StatementVisitor {
    visitScope(host: Scope): any;
    visitAssignment(host: Assignment): any;
    visitLoop(host: Loop): any;
    visitConditionalStatement(host: ConditionalStatement): any;
    visitExpressionStatement(host: ExpressionStatement): any;
    visitPrintStatement(host: PrintStatement): any;
    visitFunctionDeclaration(host: FunctionDeclaration): any;
    visitReturnStatement(host: ReturnStatement): any;
}
declare function isStatementVisitor(cls: any): cls is StatementVisitor;
declare class Statement {
    constructor();
    accept(visitor: StatementVisitor): void;
}
declare class Scope extends Statement {
    statements: Statement[];
    constructor(statements: Statement[]);
    accept(visitor: StatementVisitor): any;
}
declare class Assignment extends Statement {
    name: string;
    expression: Expression;
    scope: string | undefined;
    constructor(name: string, expression: Expression, scope: string | undefined);
    accept(visitor: StatementVisitor): any;
}
declare class Loop extends Statement {
    condition: Expression;
    statements: Statement[];
    constructor(condition: Expression, statements: Statement[]);
    accept(visitor: StatementVisitor): any;
}
declare class ConditionalStatement extends Statement {
    conditions: Expression[];
    statements: Statement[][];
    constructor(conditions: Expression[], statements: Statement[][]);
    accept(visitor: StatementVisitor): any;
}
declare class ExpressionStatement extends Statement {
    expression: Expression;
    constructor(expression: Expression);
    accept(visitor: StatementVisitor): any;
}
declare class PrintStatement extends Statement {
    expressions: Expression[];
    constructor(expressions: Expression[]);
    accept(visitor: StatementVisitor): any;
}
declare class FunctionDeclaration extends Statement {
    name: string;
    params: string[];
    body: Statement[];
    constructor(name: string, params: string[], body: Statement[]);
    accept(visitor: StatementVisitor): any;
}
declare class ReturnStatement extends Statement {
    expression: Expression;
    constructor(expression: Expression);
    accept(visitor: StatementVisitor): any;
}
export { StatementVisitor, isStatementVisitor, Statement, Scope, Assignment, Loop, ConditionalStatement, ExpressionStatement, PrintStatement, FunctionDeclaration, ReturnStatement, };
