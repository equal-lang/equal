"use strict";
exports.__esModule = true;
exports.Equal = void 0;
var fs = require("fs");
var lexer_1 = require("./lexer");
var parser_1 = require("./parser");
var interpreter_1 = require("./interpreter");
var error_1 = require("./error");
var printer_1 = require("./printer");
var Equal = (function () {
    function Equal(_a) {
        var _b = _a.mode, mode = _b === void 0 ? "NORMAL" : _b, path = _a.path, source = _a.source, _c = _a.output, output = _c === void 0 ? console.log : _c, input = _a.input;
        try {
            if (mode == "VERBOSE")
                this.mode = "VERBOSE";
            else
                this.mode = "NORMAL";
            this.errHandler = new error_1.ErrorHandler(this.mode);
            this.error = false;
            this.printer = new printer_1.Printer(output);
            this.lexer = new lexer_1.Lexer(this.mode, this.errHandler);
            this.parser = new parser_1.Parser(this.mode, this.errHandler);
            this.interpreter = new interpreter_1.Interpreter(this.mode, this.errHandler, this.printer, input);
            if (!path && !source)
                throw new error_1.EqualRuntimeError("No source code found");
            else if (source) {
                this.source = source;
            }
            else if (path) {
                this.source = this.loadFile(path);
            }
            this.path = (path != undefined) ? path : "Unknown";
        }
        catch (err) {
            this.errHandler.handleError(err);
        }
    }
    Equal.prototype.run = function () {
        try {
            this.error = this.errHandler.getErrorStatus();
            if (this.error == false) {
                this.verbose("Running in verbose mode");
                var tokens = this.lexer.lex(this.source, this.path);
                this.verbose(tokens, "Tokens");
                var ast = this.parser.parse(tokens, this.path);
                this.execute(ast, this.path);
                this.verbose("Finished running script");
                return this.printer.allPrinted();
            }
        }
        catch (err) {
            this.errHandler.handleError(err);
        }
    };
    Equal.prototype.loadFile = function (path) {
        this.verbose("Loading file at " + this.path);
        if (!fs.existsSync(path))
            throw new error_1.EqualRuntimeError("Invalid path");
        var file = fs.readFileSync(path, "utf8");
        return file;
    };
    Equal.prototype.execute = function (ast, path) {
        try {
            this.error = this.errHandler.getErrorStatus();
            if (this.error == false) {
                this.interpreter.interpret(ast, path);
                this.printer.flushBuffer();
            }
            else {
                this.verbose(this.errHandler.errors, "Errors");
            }
        }
        catch (err) {
            this.errHandler.handleError(err);
        }
    };
    Equal.prototype.verbose = function (log, message) {
        if (this.mode == "VERBOSE") {
            if (message)
                console.debug(message, log);
            else
                console.debug(log);
        }
    };
    return Equal;
}());
exports.Equal = Equal;
//# sourceMappingURL=equal.js.map