const enum tokenType {
  START_TAG_LEFT = "START_TAG_LEFT",
  END_TAG_LEFT = "END_TAG_LEFT",
  TAG_RIGHT = "TAG_RIGHT",
  EQUAL_SIGN = "EQUAL_SIGN",
  EOF = "EOF",

  TAGNAME = "TAGNAME",
  INNERTEXT = "INNERTEXT",
  ATTRIBUTE = "ATTRIBUTE",
  VALUE = "VALUE",

  STRING = "STRING",
  NUMBER = "NUMBER"
}

class Token {
  tokenType: tokenType;
  value: object | undefined;
  line: number;

  constructor(type: tokenType, line: number, value?: object) {
    this.tokenType = type;
    this.value = value;
    this.line = line;
  }
}

export {
  Token, tokenType
}