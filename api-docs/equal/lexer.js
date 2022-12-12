"use strict";
exports.__esModule = true;
exports.Lexer = void 0;
var token_1 = require("./token");
var error_1 = require("./error");
var Lexer = (function () {
    function Lexer(mode, errHandler) {
        this.mode = mode;
        this.errHandler = errHandler;
        this.source = "";
        this.line = 1;
        this.tokens = [];
        this.leftPointer = 0;
        this.rightPointer = 0;
    }
    Lexer.prototype.lex = function (source, path) {
        var _this = this;
        this.source = source;
        this.path = path;
        var inTag = false;
        while (!this.atEnd()) {
            var char = this.source[this.rightPointer];
            this.leftPointer = this.rightPointer;
            switch (char) {
                case "<": {
                    if (this.condForward("!--", 3)) {
                        this.rightPointer++;
                        this.comment();
                    }
                    else {
                        if (this.condForward("/")) {
                            this.pushToken("END_TAG_LEFT");
                        }
                        else {
                            this.pushToken("START_TAG_LEFT");
                        }
                        inTag = true;
                        this.rightPointer++;
                        this.tagname();
                    }
                    break;
                }
                case ">": {
                    this.pushToken("TAG_RIGHT");
                    inTag = false;
                    break;
                }
                case "=": {
                    if (inTag) {
                        this.pushToken("EQUAL_SIGN");
                        this.rightPointer++;
                        this.value();
                    }
                    break;
                }
                case "/": {
                    if (inTag && this.lookAhead() == ">")
                        this.rightPointer++;
                    break;
                }
                case "\n": {
                    this.line++;
                    break;
                }
                case " ":
                case "\t":
                case "\r": {
                    break;
                }
                default: {
                    if (inTag)
                        this.pushToken("ATTRIBUTE", (this.consumeWhile(function (char) { return (char != "=" && !_this.endOfTag(char) && !_this.isWhitespace(char)); })));
                    else
                        this.pushToken("TEXT", this.consumeWhile(function (char) { return (char != "<"); }).trim());
                    break;
                }
            }
            this.rightPointer++;
        }
        this.pushToken("EOF");
        return this.tokens;
    };
    Lexer.prototype.tagname = function () {
        var _this = this;
        this.pushToken("TAGNAME", this.consumeWhile(function (char) { return (!_this.isWhitespace(char) && !_this.endOfTag(char)); }));
    };
    Lexer.prototype.value = function () {
        var _this = this;
        var firstChar = this.source[this.rightPointer];
        var source;
        if (this.isWhitespace(firstChar)) {
            this.consumeWhile(function (char) { return (_this.isWhitespace(char)); });
            this.rightPointer++;
            firstChar = this.source[this.rightPointer];
        }
        if (firstChar == "\"") {
            this.rightPointer++;
            source = this.consumeWhile(function (char) { return (char != "\""); });
            this.rightPointer++;
        }
        else if (firstChar == "'") {
            this.rightPointer++;
            source = this.consumeWhile(function (char) { return (char != "'"); });
            this.rightPointer++;
        }
        else {
            source = this.consumeWhile(function (char) { return (!_this.isWhitespace(char) && !_this.endOfTag(char)); });
        }
        this.pushToken("VALUE", source);
    };
    Lexer.prototype.comment = function () {
        var _this = this;
        this.consumeWhile(function (char) {
            return (!(char == "-" && _this.condForward("->", 2)));
        });
        this.rightPointer++;
    };
    Lexer.prototype.handleNewline = function () {
        var char = this.source[this.rightPointer];
        if (char == "\r")
            this.line++;
        if (char == "\n" && this.lookBehind() != "\r")
            this.line++;
    };
    Lexer.prototype.consumeWhile = function (test) {
        this.leftPointer = this.rightPointer;
        var char = this.source[this.rightPointer];
        var testResult = test(char);
        while (!this.atEnd() && testResult) {
            this.handleNewline();
            this.rightPointer++;
            char = this.source[this.rightPointer];
            testResult = test(char);
        }
        var ret = this.source.slice(this.leftPointer, this.rightPointer);
        this.rightPointer--;
        return ret;
    };
    Lexer.prototype.condForward = function (char, offset) {
        if (offset === void 0) { offset = 1; }
        if (!this.atEnd(offset) && char == this.source.slice(this.rightPointer + 1, this.rightPointer + offset + 1)) {
            this.rightPointer += offset;
            return true;
        }
        else
            return false;
    };
    Lexer.prototype.lookAhead = function (offset) {
        if (offset === void 0) { offset = 1; }
        if (!this.atEnd(offset))
            return this.source.slice(this.rightPointer + 1, this.rightPointer + offset + 1);
        else
            return "";
    };
    Lexer.prototype.lookBehind = function () {
        if (!this.atEnd(-1))
            return this.source[this.rightPointer - 1];
        else
            return "";
    };
    Lexer.prototype.atEnd = function (offset) {
        if (offset === void 0) { offset = 0; }
        return (this.rightPointer + offset > this.source.length - 1);
    };
    Lexer.prototype.isWhitespace = function (char) {
        return (char == " " || char == "\t" || char == "\r");
    };
    Lexer.prototype.endOfTag = function (char) {
        return (char == ">" || (char == "/" && this.lookAhead() == ">"));
    };
    Lexer.prototype.pushToken = function (type, value) {
        this.tokens.push(new token_1.Token(type, this.line, value));
    };
    Lexer.prototype.reportError = function (message) {
        var err = new error_1.EqualSyntaxError(message, this.path, this.line);
        this.errHandler.reportError(err);
    };
    return Lexer;
}());
exports.Lexer = Lexer;
//# sourceMappingURL=lexer.js.map