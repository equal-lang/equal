const enum tokenType {
  START_TAG_LEFT = "START_TAG_LEFT",
  END_TAG_LEFT = "END_TAG_LEFT",
  TAG_RIGHT = "TAG_RIGHT",
  EQUAL_SIGN = "EQUAL_SIGN",

  TAGNAME = "TAGNAME",
  ATTRIBUTE = "ATTRIBUTE",
  TEXT = "TEXT",
  COMMENT = "COMMENT",

  VALUE = "VALUE",
  // COMMENT
  // self closing tag?
  // space in string
  // new line
  // doctype
  DOCTYPE = "DOCTYPE",
  EOF = "EOF",

  // STRING = "STRING",
  // NUMBER = "NUMBER"
}

class Token {
  tokenType: tokenType;
  value: string | number | undefined;
  line: number;

  constructor(type: tokenType, line: number, value?: string | number) {
    this.tokenType = type;
    this.value = value;
    this.line = line;
  }
}

export {
  Token, tokenType
}