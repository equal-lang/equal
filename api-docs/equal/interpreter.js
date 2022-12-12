"use strict";
exports.__esModule = true;
exports.Interpreter = void 0;
var error_1 = require("./error");
var environment_1 = require("./environment");
var callable_1 = require("./callable");
var Interpreter = (function () {
    function Interpreter(mode, errHandler, printer, input) {
        this.mode = mode;
        this.errHandler = errHandler;
        this.pointer = 0;
        var globalEnv = new environment_1.Environment();
        this.environment = globalEnv;
        this.global = globalEnv;
        this.printer = printer;
        this.input = input;
    }
    Interpreter.prototype.interpret = function (statements, path) {
        this.path = path;
        this.statements = statements;
        if (this.mode == "VERBOSE")
            console.debug("Statements", this.statements);
        while (!(this.pointer > this.statements.length - 1)) {
            var statement = this.statements[this.pointer];
            this.exec(statement);
            this.pointer++;
        }
        if (this.mode == "VERBOSE")
            console.debug("GlobalEnvironment", this.environment);
    };
    Interpreter.prototype.visitBinary = function (host) {
        var arg1 = this.eval(host.arg1);
        var arg2 = this.eval(host.arg2);
        var operator = host.operator;
        switch (operator) {
            case "EQUAL": {
                return (arg1 === arg2);
                break;
            }
            case "NOT_EQUAL": {
                return (arg1 !== arg2);
                break;
            }
            case "GREATER_THAN": {
                this.checkType(arg1, ["number"]);
                this.checkType(arg2, ["number"]);
                return (arg1 > arg2);
                break;
            }
            case "LESSER_THAN": {
                this.checkType(arg1, ["number"]);
                this.checkType(arg2, ["number"]);
                return (arg1 < arg2);
                break;
            }
            case "PLUS": {
                this.checkType(arg1, ["number"]);
                this.checkType(arg2, ["number"]);
                return (arg1 + arg2);
                break;
            }
            case "MINUS": {
                this.checkType(arg1, ["number"]);
                this.checkType(arg2, ["number"]);
                return (arg1 - arg2);
                break;
            }
            case "MULTIPLY": {
                this.checkType(arg1, ["number"]);
                this.checkType(arg2, ["number"]);
                return (arg1 * arg2);
                break;
            }
            case "DIVIDE": {
                this.checkType(arg1, ["number"]);
                this.checkType(arg2, ["number"]);
                if (arg2 == 0)
                    throw new error_1.EqualRuntimeError("Division by zero", this.path);
                return (arg1 / arg2);
                break;
            }
            default: {
                throw new error_1.EqualRuntimeError("Binary operator does not exist", this.path);
                break;
            }
        }
    };
    Interpreter.prototype.visitLogical = function (host) {
        var arg1 = this.eval(host.arg1);
        var arg2;
        var operator = host.operator;
        switch (operator) {
            case "AND": {
                this.checkType(arg1, ["boolean"]);
                if (arg1 === true) {
                    arg2 = this.eval(host.arg2);
                    this.checkType(arg2, ["boolean"]);
                    return arg2;
                }
                else
                    return false;
                break;
            }
            case "OR": {
                this.checkType(arg1, ["boolean"]);
                if (arg1 === false) {
                    arg2 = this.eval(host.arg2);
                    this.checkType(arg2, ["boolean"]);
                    return arg2;
                }
                else
                    return true;
                break;
            }
            default: {
                throw new error_1.EqualRuntimeError("Logical operator does not exist", this.path);
                break;
            }
        }
    };
    Interpreter.prototype.visitUnary = function (host) {
        var arg1 = this.eval(host.arg1);
        var operator = host.operator;
        switch (operator) {
            case "NOT": {
                this.checkType(arg1, ["boolean"]);
                return (!(arg1));
                break;
            }
            default: {
                throw new error_1.EqualRuntimeError("Operator does not exist", this.path);
                break;
            }
        }
    };
    Interpreter.prototype.visitCall = function (host) {
        var func = this.global.getFunc(host.calleeName);
        if (!(0, callable_1.isEqualCallable)(func))
            throw new error_1.EqualRuntimeError("Object is not callable", this.path);
        var argList = [];
        for (var pointer = 0; pointer <= host.args.length - 1; pointer++) {
            var arg = this.eval(host.args[pointer]);
            this.checkType(arg, ["string", "number", "boolean"]);
            argList.push(arg);
        }
        if (argList.length != func.arity())
            throw new error_1.EqualRuntimeError("Expected " + func.arity() + " arguments, got " + argList.length);
        return func.call(this, argList);
    };
    Interpreter.prototype.visitLiteral = function (host) {
        this.checkType(host.arg, ["string", "number", "boolean"]);
        return host.arg;
    };
    Interpreter.prototype.visitVariable = function (host) {
        return this.environment.get(host.name);
    };
    Interpreter.prototype.visitScope = function (host) {
        this.execBlock(host.statements, new environment_1.Environment(this.environment));
    };
    Interpreter.prototype.visitAssignment = function (host) {
        if (host.scope == "global")
            this.global.assign(host.name, this.eval(host.expression));
        else
            this.environment.assign(host.name, this.eval(host.expression));
    };
    Interpreter.prototype.visitFunctionDeclaration = function (host) {
        var func = new callable_1.EqualFunction(host);
        this.global.declareFunc(host.name, func);
    };
    Interpreter.prototype.visitReturnStatement = function (host) {
        if (this.environment == this.global)
            throw new error_1.EqualRuntimeError("No return statement allowed in global scope", this.path);
        throw new callable_1.returnVal(this.eval(host.expression));
    };
    Interpreter.prototype.visitExpressionStatement = function (host) {
        this.eval(host.expression);
    };
    Interpreter.prototype.visitConditionalStatement = function (host) {
        var correctNum = -1;
        for (var c = 0; c < host.conditions.length; c++) {
            if (this.eval(host.conditions[c]) === true) {
                correctNum = c;
                break;
            }
        }
        if (correctNum == -1 && (host.statements.length == host.conditions.length + 1)) {
            correctNum = host.statements.length - 1;
        }
        if (correctNum != -1) {
            for (var pointer = 0; pointer <= host.statements[correctNum].length - 1; pointer++) {
                this.exec(host.statements[correctNum][pointer]);
            }
        }
    };
    Interpreter.prototype.visitLoop = function (host) {
        var cond = this.eval(host.condition);
        while (cond === true) {
            for (var pointer = 0; pointer <= host.statements.length - 1; pointer++) {
                this.exec(host.statements[pointer]);
            }
            cond = this.eval(host.condition);
        }
    };
    Interpreter.prototype.visitPrintStatement = function (host) {
        for (var pointer = 0; pointer <= host.expressions.length - 1; pointer++) {
            this.printer.print(this.eval(host.expressions[pointer]));
        }
    };
    Interpreter.prototype.eval = function (expr) {
        return expr.accept(this);
    };
    Interpreter.prototype.exec = function (stmt) {
        return stmt.accept(this);
    };
    Interpreter.prototype.execBlock = function (stmts, env) {
        var prev = this.environment;
        this.environment = env;
        try {
            for (var pointer = 0; pointer <= stmts.length - 1; pointer++) {
                this.exec(stmts[pointer]);
            }
        }
        catch (err) {
            throw err;
        }
        finally {
            this.environment = prev;
        }
    };
    Interpreter.prototype.checkType = function (val, type) {
        for (var _i = 0, type_1 = type; _i < type_1.length; _i++) {
            var t = type_1[_i];
            if (typeof val == t)
                return true;
        }
        throw new error_1.EqualRuntimeError("Unexpected type " + (typeof val), this.path);
    };
    Interpreter.prototype.publicExecBlock = function (stmts, env) {
        return this.execBlock(stmts, env);
    };
    return Interpreter;
}());
exports.Interpreter = Interpreter;
//# sourceMappingURL=interpreter.js.map