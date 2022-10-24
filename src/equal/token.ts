const enum tokenType {
  START_TAG_LEFT = "START_TAG_LEFT",
  END_TAG_LEFT = "END_TAG_LEFT",
  TAG_RIGHT = "TAG_RIGHT",
  EQUAL_SIGN = "EQUAL_SIGN",

  TAGNAME = "TAGNAME",
  ATTRIBUTE = "ATTRIBUTE",
  TEXT = "TEXT",
  // COMMENT = "COMMENT",

  VALUE = "VALUE",
  // doctype
  DOCTYPE = "DOCTYPE",
  EOF = "EOF",
}

class Token {
  tokenType: tokenType;
  value: string | undefined;
  line: number;

  constructor(type: tokenType, line: number, value?: string) {
    this.tokenType = type;
    this.value = value;
    this.line = line;
  }
}

const enum operatorType {
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

const operatorMap = new Map()
.set("&&", operatorType.AND)
.set("||", operatorType.OR)
.set("==", operatorType.EQUAL)
.set("!=", operatorType.NOT_EQUAL)
.set(">", operatorType.GREATER_THAN)
.set("<", operatorType.LESSER_THAN)
.set("+", operatorType.PLUS)
.set("-", operatorType.MINUS)
.set("*", operatorType.MULTIPLY)
.set("/", operatorType.DIVIDE)
.set("!", operatorType.NOT)


export {
  Token, tokenType, operatorType, operatorMap
}