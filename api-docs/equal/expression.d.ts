import { operatorType } from "./token";
interface ExpressionVisitor {
    visitBinary(host: Binary): any;
    visitLogical(host: Logical): any;
    visitUnary(host: Unary): any;
    visitLiteral(host: Literal): any;
    visitVariable(host: Variable): any;
    visitCall(host: Call): any;
}
declare function isExpressionVisitor(cls: any): cls is ExpressionVisitor;
declare class Expression {
    constructor();
    accept(visitor: ExpressionVisitor): void;
}
declare class Binary extends Expression {
    operator: operatorType;
    arg1: Expression;
    arg2: Expression;
    constructor(operator: operatorType, arg1: Expression, arg2: Expression);
    accept(visitor: ExpressionVisitor): any;
}
declare class Logical extends Expression {
    operator: operatorType;
    arg1: Expression;
    arg2: Expression;
    constructor(operator: operatorType, arg1: Expression, arg2: Expression);
    accept(visitor: ExpressionVisitor): any;
}
declare class Unary extends Expression {
    operator: operatorType;
    arg1: Expression;
    constructor(operator: operatorType, arg1: Expression);
    accept(visitor: ExpressionVisitor): any;
}
declare class Literal extends Expression {
    arg: string | number | boolean;
    constructor(arg: string | number | boolean);
    accept(visitor: ExpressionVisitor): any;
}
declare class Variable extends Expression {
    name: string;
    constructor(name: string);
    accept(visitor: ExpressionVisitor): any;
}
declare class Call extends Expression {
    calleeName: string;
    args: Expression[];
    constructor(calleeName: string, args: Expression[]);
    accept(visitor: ExpressionVisitor): any;
}
export { ExpressionVisitor, isExpressionVisitor, Expression, Binary, Logical, Unary, Literal, Variable, Call, };
