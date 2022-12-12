"use strict";
exports.__esModule = true;
exports.operatorMap = exports.operatorType = exports.tokenType = exports.Token = void 0;
var tokenType;
(function (tokenType) {
    tokenType["START_TAG_LEFT"] = "START_TAG_LEFT";
    tokenType["END_TAG_LEFT"] = "END_TAG_LEFT";
    tokenType["TAG_RIGHT"] = "TAG_RIGHT";
    tokenType["EQUAL_SIGN"] = "EQUAL_SIGN";
    tokenType["TAGNAME"] = "TAGNAME";
    tokenType["ATTRIBUTE"] = "ATTRIBUTE";
    tokenType["TEXT"] = "TEXT";
    tokenType["VALUE"] = "VALUE";
    tokenType["DOCTYPE"] = "DOCTYPE";
    tokenType["EOF"] = "EOF";
})(tokenType || (tokenType = {}));
exports.tokenType = tokenType;
var Token = (function () {
    function Token(type, line, value) {
        this.tokenType = type;
        this.value = value;
        this.line = line;
    }
    return Token;
}());
exports.Token = Token;
var operatorType;
(function (operatorType) {
    operatorType["AND"] = "AND";
    operatorType["OR"] = "OR";
    operatorType["EQUAL"] = "EQUAL";
    operatorType["NOT_EQUAL"] = "NOT_EQUAL";
    operatorType["GREATER_THAN"] = "GREATER_THAN";
    operatorType["LESSER_THAN"] = "LESSER_THAN";
    operatorType["PLUS"] = "PLUS";
    operatorType["MINUS"] = "MINUS";
    operatorType["MULTIPLY"] = "MULTIPLY";
    operatorType["DIVIDE"] = "DIVIDE";
    operatorType["NOT"] = "NOT";
})(operatorType || (operatorType = {}));
exports.operatorType = operatorType;
var operatorMap = new Map()
    .set("&&", "AND")
    .set("||", "OR")
    .set("==", "EQUAL")
    .set("!=", "NOT_EQUAL")
    .set(">", "GREATER_THAN")
    .set("<", "LESSER_THAN")
    .set("+", "PLUS")
    .set("-", "MINUS")
    .set("*", "MULTIPLY")
    .set("/", "DIVIDE")
    .set("!", "NOT");
exports.operatorMap = operatorMap;
//# sourceMappingURL=token.js.map