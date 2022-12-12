"use strict";
exports.__esModule = true;
exports.Parser = void 0;
var token_1 = require("./token");
var error_1 = require("./error");
var expression_1 = require("./expression");
var statement_1 = require("./statement");
var big_lexer_1 = require("./big-lexer");
var Parser = (function () {
    function Parser(mode, errHandler) {
        this.mode = mode;
        this.errHandler = errHandler;
        this.pointer = 0;
        this.statements = [];
    }
    Parser.prototype.parse = function (tokens, path) {
        this.path = path;
        this.tokens = (0, big_lexer_1.bigLexer)(tokens, this.path, this.errHandler);
        if (this.mode == "VERBOSE")
            console.debug("bigTokens", this.tokens);
        while (!this.atEnd()) {
            this.statements.push(this.statement());
        }
        return this.statements;
    };
    Parser.prototype.statement = function () {
        return this.scope();
    };
    Parser.prototype.scope = function () {
        if (this.match("START_TAG", "div", {})) {
            var statements = [];
            while (!this.match("END_TAG", "div", {})) {
                statements.push(this.statement());
            }
            return new statement_1.Scope(statements);
        }
        else {
            return this.assignment();
        }
    };
    Parser.prototype.assignment = function () {
        var _this = this;
        if (this.match("START_TAG", "a", {})) {
            var name_1 = this.retPrevAttrE("id");
            var scope = (this.retPrevAttr("class") == "global") ? "global" : undefined;
            this.checkString(name_1, "a id");
            var expr = this.expression();
            this.force(function () { return _this.match("END_TAG", "a", {}); });
            return new statement_1.Assignment(name_1, expr, scope);
        }
        else {
            return this.functionDeclaration();
        }
    };
    Parser.prototype.functionDeclaration = function () {
        var _this = this;
        if (this.match("START_TAG", "form", { "id": undefined })) {
            var name_2 = this.retPrevAttrE("id");
            this.checkString(name_2, "function name");
            var params = [];
            while (this.match("START_TAG", "input", {})) {
                var id = this.retPrevAttrE("id");
                this.checkString(id, "input id");
                params.push(id);
            }
            var statements = [];
            this.force(function () { return _this.match("START_TAG", "div", {}); });
            while (!this.match("END_TAG", "div", {})) {
                statements.push(this.statement());
            }
            this.force(function () { return _this.match("END_TAG", "form", {}); });
            return new statement_1.FunctionDeclaration(name_2, params, statements);
        }
        else
            return this.returnStatement();
    };
    Parser.prototype.returnStatement = function () {
        if (this.match("START_TAG", "input", { "type": ["submit"] })) {
            return new statement_1.ReturnStatement(this.expression());
        }
        else
            return this.loop();
    };
    Parser.prototype.loop = function () {
        if (this.match("START_TAG", "p", {})) {
            var statements = [];
            var condition = this.expression();
            while (!this.match("END_TAG", "p", {})) {
                statements.push(this.statement());
            }
            return new statement_1.Loop(condition, statements);
        }
        else
            return this.conditionalStatement();
    };
    Parser.prototype.conditionalStatement = function () {
        if (this.match("START_TAG", "h1", {})) {
            var statements = [];
            var conditions = [];
            var stmts = [];
            var expr = this.expression();
            while (!this.match("END_TAG", "h1", {})) {
                stmts.push(this.statement());
            }
            statements.push(stmts);
            conditions.push(expr);
            for (var i = 2; i <= 5; i++) {
                if (this.match("START_TAG", "h" + i, {})) {
                    expr = this.expression();
                    stmts = [];
                    while (!this.match("END_TAG", "h" + i, {})) {
                        stmts.push(this.statement());
                    }
                    statements.push(stmts);
                    conditions.push(expr);
                }
            }
            if (this.match("START_TAG", "h6", {})) {
                stmts = [];
                while (!this.match("END_TAG", "h6", {})) {
                    stmts.push(this.statement());
                }
                statements.push(stmts);
            }
            return new statement_1.ConditionalStatement(conditions, statements);
        }
        else {
            return this.printStatement();
        }
    };
    Parser.prototype.printStatement = function () {
        var expressions = [];
        if (this.match("START_TAG", "span", {})) {
            while (!this.match("END_TAG", "span", {})) {
                expressions.push(this.expression());
            }
            return new statement_1.PrintStatement(expressions);
        }
        else
            return this.expressionStatement();
    };
    Parser.prototype.expressionStatement = function () {
        return new statement_1.ExpressionStatement(this.expression());
    };
    Parser.prototype.expression = function () {
        return this.logic();
    };
    Parser.prototype.logic = function () {
        return this.retNestedLogicalExpr(["&&", "||"], this.equality.bind(this));
    };
    Parser.prototype.equality = function () {
        return this.retBinaryExpr(["==", "!="], this.comparsion.bind(this));
    };
    Parser.prototype.comparsion = function () {
        return this.retBinaryExpr([">", "<"], this.addition.bind(this));
    };
    Parser.prototype.addition = function () {
        return this.retNestedBinaryExpr(["+", "-"], this.multiplication.bind(this));
    };
    Parser.prototype.multiplication = function () {
        return this.retNestedBinaryExpr(["*", "/"], this.unary.bind(this));
    };
    Parser.prototype.unary = function () {
        if (this.matchStartForm(["!"])) {
            var operator = this.retOperator();
            this.force(this.matchStartLabel);
            var base = this.expression();
            this.force(this.matchEndLabel);
            this.force(this.matchEndForm);
            return new expression_1.Unary(operator, base);
        }
        else {
            return this.call();
        }
    };
    Parser.prototype.call = function () {
        if (this.match("START_TAG", "form", {})) {
            var calleeName = this.retPrevAttrE("title");
            this.checkString(calleeName, "callee name");
            var args = [];
            if (this.matchStartLabel()) {
                while (!this.matchEndLabel()) {
                    var arg = this.expression();
                    args.push(arg);
                }
            }
            this.force(this.matchEndForm);
            return new expression_1.Call(calleeName, args);
        }
        else
            return this.primary();
    };
    Parser.prototype.primary = function () {
        var _this = this;
        if (this.matchText())
            return new expression_1.Literal(this.retPrevAttrE("value"));
        else {
            this.force(function () { return _this.match("START_TAG", "a", {}); });
            var name_3 = this.retPrevAttrE("href");
            this.checkString(name_3, "a href");
            this.force(function () { return _this.match("END_TAG", "a", {}); });
            return new expression_1.Variable(name_3);
        }
    };
    Parser.prototype.retBinaryExpr = function (operatorList, next) {
        if (this.matchStartForm(operatorList)) {
            var operator = this.retOperator();
            this.force(this.matchStartLabel);
            var base1 = this.expression();
            this.force(this.matchEndLabel);
            this.force(this.matchStartLabel);
            var base2 = this.expression();
            this.force(this.matchEndLabel);
            this.force(this.matchEndForm);
            return new expression_1.Binary(operator, base1, base2);
        }
        else {
            return next();
        }
    };
    Parser.prototype.retNestedExpr = function (operatorList, next, cls) {
        if (this.matchStartForm(operatorList)) {
            var operator = this.retOperator();
            this.force(this.matchStartLabel);
            var base1 = this.expression();
            this.force(this.matchEndLabel);
            this.force(this.matchStartLabel);
            var base2 = this.expression();
            this.force(this.matchEndLabel);
            var base = new cls(operator, base1, base2);
            while (this.matchStartLabel()) {
                var top_1 = this.expression();
                base = new cls(operator, base, top_1);
                this.force(this.matchEndLabel);
            }
            this.force(this.matchEndForm);
            return base;
        }
        else {
            return next();
        }
    };
    Parser.prototype.retNestedBinaryExpr = function (operatorList, next) {
        return this.retNestedExpr(operatorList, next, expression_1.Binary);
    };
    Parser.prototype.retNestedLogicalExpr = function (operatorList, next) {
        return this.retNestedExpr(operatorList, next, expression_1.Logical);
    };
    Parser.prototype.match = function (type, name, attributeObj) {
        var token;
        if (!this.atEnd())
            token = this.tokens[this.pointer];
        else {
            return false;
        }
        if (token["type"] === type && token["name"] === name) {
            for (var item in attributeObj) {
                if (attributeObj[item] == undefined) {
                    if (!token["attribute"][item])
                        return false;
                }
                else if (!attributeObj[item].includes(token["attribute"][item]))
                    return false;
            }
            this.pointer++;
            return true;
        }
        return false;
    };
    Parser.prototype.matchStartForm = function (title) {
        return this.match("START_TAG", "form", { "title": title });
    };
    Parser.prototype.matchStartLabel = function () {
        return this.match("START_TAG", "label", {});
    };
    Parser.prototype.matchText = function () {
        return this.match("TEXT", undefined, {});
    };
    Parser.prototype.matchEndLabel = function () {
        return this.match("END_TAG", "label", {});
    };
    Parser.prototype.matchEndForm = function () {
        return this.match("END_TAG", "form", {});
    };
    Parser.prototype.force = function (func) {
        if (!func.bind(this)()) {
            if (this.pointer > this.tokens.length - 1)
                this.throwError("Unexpected EOF", this.tokens[this.tokens.length - 1]["line"]);
            var token = this.tokens[this.pointer];
            var text = void 0;
            if (token["type"] == "START_TAG")
                text = "start " + token["name"];
            else if (token["type"] == "END_TAG")
                text = "end " + token["name"];
            else
                text = "text";
            this.throwError("Unexpected " + text, this.tokens[this.pointer]["line"]);
        }
        return true;
    };
    Parser.prototype.retPrevAttr = function (attribute) {
        return this.tokens[this.pointer - 1]["attribute"][attribute];
    };
    Parser.prototype.retPrevAttrE = function (attribute) {
        var val = this.retPrevAttr(attribute);
        if (val === undefined) {
            this.throwError("Value of attribute " + attribute + " cannot be undefined", this.tokens[this.pointer - 1]["line"]);
        }
        return val;
    };
    Parser.prototype.retOperator = function () {
        var operator = token_1.operatorMap.get(this.retPrevAttrE("title"));
        if (operator === undefined)
            this.throwError("Operator cannot be undefined", this.tokens[this.pointer]["line"]);
        return operator;
    };
    Parser.prototype.atEnd = function (offset) {
        if (offset === void 0) { offset = 0; }
        return (this.pointer + offset > this.tokens.length - 1);
    };
    Parser.prototype.checkString = function (val, name) {
        if (typeof val != "string")
            this.throwError("String value expected for " + name, this.tokens[this.pointer]["line"]);
    };
    Parser.prototype.throwError = function (message, line) {
        throw new error_1.EqualSyntaxError(message, this.path, line);
    };
    Parser.prototype.reportError = function (message, line) {
        this.errHandler.reportError(new error_1.EqualSyntaxError(message, this.path, line));
    };
    return Parser;
}());
exports.Parser = Parser;
//# sourceMappingURL=parser.js.map