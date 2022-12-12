declare const enum tokenType {
    START_TAG_LEFT = "START_TAG_LEFT",
    END_TAG_LEFT = "END_TAG_LEFT",
    TAG_RIGHT = "TAG_RIGHT",
    EQUAL_SIGN = "EQUAL_SIGN",
    TAGNAME = "TAGNAME",
    ATTRIBUTE = "ATTRIBUTE",
    TEXT = "TEXT",
    VALUE = "VALUE",
    DOCTYPE = "DOCTYPE",
    EOF = "EOF"
}
declare class Token {
    tokenType: tokenType;
    value: string | undefined;
    line: number;
    constructor(type: tokenType, line: number, value?: string);
}
declare const enum operatorType {
    AND = "AND",
    OR = "OR",
    EQUAL = "EQUAL",
    NOT_EQUAL = "NOT_EQUAL",
    GREATER_THAN = "GREATER_THAN",
    LESSER_THAN = "LESSER_THAN",
    PLUS = "PLUS",
    MINUS = "MINUS",
    MULTIPLY = "MULTIPLY",
    DIVIDE = "DIVIDE",
    NOT = "NOT"
}
declare const operatorMap: Map<any, any>;
export { Token, tokenType, operatorType, operatorMap };
