const enum tokenType {
  LEFT_ANGLE_BRACKET = "LEFT_ANGLE_BRACKET",
  RIGHT_ANGLE_BRACKET = "RIGHT_ANGLE_BRACKET",
  QUOTATION_MARK = "QUOTATION_MARK",
  EQUAL_SIGN = "EQUAL_SIGN",
  SLASH = "SLASH",

  TAGNAME = "TAGNAME",
  INNERTEXT = "INNERTEXT",
  ATTRIBUTE = "ATTRIBUTE",
  VALUE = "VALUE"
}

class Token {
  tokenType: tokenType;
  value: object;
  line: number;

  constructor(type: tokenType, value: object, line: number) {
    this.tokenType = type;
    this.value = value;
    this.line = line;
  }

  // type, value, line?
}

export {
  Token, tokenType
}