import { equalMode } from "./utils";
import { Token } from "./token";
import { ErrorHandler } from "./error";
declare class Lexer {
    mode: equalMode;
    errHandler: ErrorHandler;
    path: string;
    source: string;
    line: number;
    tokens: Token[];
    leftPointer: number;
    rightPointer: number;
    constructor(mode: equalMode, errHandler: ErrorHandler);
    lex(source: string, path: string): Token[];
    private tagname;
    private value;
    private comment;
    private handleNewline;
    private consumeWhile;
    private condForward;
    private lookAhead;
    private lookBehind;
    private atEnd;
    private isWhitespace;
    private endOfTag;
    private pushToken;
    private reportError;
}
export { Lexer };
