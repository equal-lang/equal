import { equalMode } from "./utils";
import { Token } from "./token";
import { ErrorHandler } from "./error";
import { Statement } from "./statement";
import { BigToken } from "./big-lexer";
declare class Parser {
    mode: equalMode;
    errHandler: ErrorHandler;
    path: string;
    tokens: BigToken[];
    pointer: number;
    statements: Statement[];
    constructor(mode: equalMode, errHandler: ErrorHandler);
    parse(tokens: Token[], path: string): Statement[];
    private statement;
    private scope;
    private assignment;
    private functionDeclaration;
    private returnStatement;
    private loop;
    private conditionalStatement;
    private printStatement;
    private expressionStatement;
    private expression;
    private logic;
    private equality;
    private comparsion;
    private addition;
    private multiplication;
    private unary;
    private call;
    private primary;
    private retBinaryExpr;
    private retNestedExpr;
    private retNestedBinaryExpr;
    private retNestedLogicalExpr;
    private match;
    private matchStartForm;
    private matchStartLabel;
    private matchText;
    private matchEndLabel;
    private matchEndForm;
    private force;
    private retPrevAttr;
    private retPrevAttrE;
    private retOperator;
    private atEnd;
    private checkString;
    private throwError;
    private reportError;
}
export { Parser };
