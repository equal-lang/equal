import { Token } from "./token";
import { ErrorHandler } from "./error";
declare function bigLexer(tokens: Token[], path: string, errHandler: ErrorHandler): BigToken[];
declare class BigToken {
    type: bigTokenType;
    name: string | undefined;
    attribute: {
        [k: string]: any;
    };
    line: number;
    constructor(type: bigTokenType, name: string | undefined, attribute: {
        [k: string]: any;
    }, line: number);
}
declare const enum bigTokenType {
    START_TAG = "START_TAG",
    END_TAG = "END_TAG",
    TEXT = "TEXT"
}
export { bigLexer, BigToken, bigTokenType };
