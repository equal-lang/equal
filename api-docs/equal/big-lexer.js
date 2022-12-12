"use strict";
exports.__esModule = true;
exports.bigTokenType = exports.BigToken = exports.bigLexer = void 0;
var error_1 = require("./error");
var utils_1 = require("./utils");
function bigLexer(tokens, path, errHandler) {
    var bigTokens = [];
    var pointer = 0;
    var startTag = [], text = [], endTag = [];
    var inStartTag = false, inEndTag = false;
    while (pointer <= tokens.length - 1) {
        var token = tokens[pointer];
        if (token["tokenType"] == "START_TAG_LEFT") {
            evalText(text);
            if (inStartTag)
                throwError("Unterminated start tag", token["line"]);
            inStartTag = true;
        }
        else if (token["tokenType"] == "END_TAG_LEFT") {
            evalText(text);
            if (inEndTag)
                throwError("Unterminated end tag", token["line"]);
            inEndTag = true;
        }
        else if (token["tokenType"] == "TAG_RIGHT") {
            if (inStartTag && inEndTag)
                throwError("Missing right tag", token["line"]);
            else if (!inStartTag && !inEndTag)
                throwError("Extra right tag", token["line"]);
            else if (inStartTag) {
                evalStartTag(startTag);
                inStartTag = false;
            }
            else if (inEndTag) {
                evalEndTag(endTag);
                inEndTag = false;
            }
        }
        else if (token["tokenType"] == "EOF") {
            evalText(text);
        }
        else {
            if (inStartTag)
                startTag.push(token);
            else if (inEndTag)
                endTag.push(token);
            else
                text.push(token);
        }
        pointer++;
    }
    if (inStartTag || inEndTag)
        reportError("Unclosed tag", tokens[tokens.length - 1]["line"]);
    return bigTokens;
    function evalStartTag(arr) {
        if (arr.length == 0)
            return;
        startTag = [];
        var tagName = arr[0]["value"];
        if (!tagName)
            throwError("Missing tagname", arr[0]["line"]);
        var attributeList = tagMap.get(tagName);
        if (attributeList == undefined)
            return;
        var attribute = {};
        var pos = 1;
        var currentAttr = "", currentVal = "";
        while (pos < arr.length) {
            if (arr[pos] && arr[pos]["tokenType"] == "ATTRIBUTE" && attributeList.includes(arr[pos]["value"])) {
                currentAttr = arr[pos]["value"];
                pos++;
                if (arr[pos] && arr[pos]["tokenType"] == "EQUAL_SIGN")
                    pos++;
                else
                    throwError("Missing equal sign", arr[pos - 1]["line"]);
                if (arr[pos] && arr[pos]["tokenType"] == "VALUE") {
                    if (arr[pos]["value"] == undefined)
                        throwError("Undefined value", arr[pos]["line"]);
                    else
                        currentVal = arr[pos]["value"];
                    pos++;
                }
                attribute[currentAttr] = currentVal;
                currentAttr = "", currentVal = "";
            }
        }
        bigTokens.push(new BigToken("START_TAG", tagName, attribute, arr[arr.length - 1]["line"]));
    }
    function evalEndTag(arr) {
        if (arr.length == 0)
            return;
        endTag = [];
        if (arr.length > 1)
            reportError("Extra attributes in end tag", arr[0]["line"]);
        var tagName = arr[0]["value"];
        if (!tagName)
            throwError("Missing tagname", arr[0]["line"]);
        bigTokens.push(new BigToken("END_TAG", tagName, {}, arr[0]["line"]));
    }
    function evalText(arr) {
        if (arr.length == 0)
            return;
        text = [];
        if (arr.length > 1)
            reportError("Extra attributes in text", arr[0]["line"]);
        var val = arr[0]["value"];
        if (val === undefined)
            throwError("The value of a literal cannot be undefined", arr[0]["line"]);
        bigTokens.push(new BigToken("TEXT", undefined, { "value": (0, utils_1.wrapValue)(val) }, arr[0]["line"]));
    }
    function throwError(message, line) {
        throw new error_1.EqualSyntaxError(message, path, line);
    }
    function reportError(message, line) {
        var err = new error_1.EqualSyntaxError(message, path, line);
        errHandler.reportError(err);
    }
}
exports.bigLexer = bigLexer;
var tagMap = new Map()
    .set("div", [])
    .set("h1", ["class"])
    .set("h2", ["class"])
    .set("h3", ["class"])
    .set("h4", ["class"])
    .set("h5", ["class"])
    .set("h6", ["class"])
    .set("p", ["class"])
    .set("a", ["id", "href", "class"])
    .set("input", ["type", "value", "id"])
    .set("form", ["title", "id"])
    .set("label", ["for"])
    .set("link", ["rel", "href", "type"])
    .set("span", []);
var BigToken = (function () {
    function BigToken(type, name, attribute, line) {
        this.type = type;
        this.name = name;
        this.attribute = attribute;
        this.line = line;
    }
    return BigToken;
}());
exports.BigToken = BigToken;
var bigTokenType;
(function (bigTokenType) {
    bigTokenType["START_TAG"] = "START_TAG";
    bigTokenType["END_TAG"] = "END_TAG";
    bigTokenType["TEXT"] = "TEXT";
})(bigTokenType || (bigTokenType = {}));
exports.bigTokenType = bigTokenType;
//# sourceMappingURL=big-lexer.js.map