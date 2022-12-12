"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.ErrorHandler = exports.EqualUnexpectedError = exports.EqualRuntimeError = exports.EqualSyntaxError = exports.EqualError = void 0;
function isErrorVisitor(cls) {
    return (cls.visitSyntaxError !== undefined && cls.visitRuntimeError !== undefined && cls.visitUnexpectedError !== undefined);
}
var ErrorPrinter = (function () {
    function ErrorPrinter() {
    }
    ErrorPrinter.prototype.print = function (err) {
        return err.accept(this);
    };
    ErrorPrinter.prototype.visitSyntaxError = function (host) {
        return "SyntaxError at " + this.toString(host);
    };
    ErrorPrinter.prototype.visitRuntimeError = function (host) {
        return "RuntimeError at " + this.toString(host);
    };
    ErrorPrinter.prototype.visitUnexpectedError = function (host) {
        return "Unexpected Error: " + host.message + "\nPlease report the bug at https://github.com/equal-lang/equal/issues\n(To view the stack trace, run the interpreter again in verbose mode)";
    };
    ErrorPrinter.prototype.toString = function (err) {
        return err.file + ":" + err.line + ": " + err.message;
    };
    return ErrorPrinter;
}());
var EqualError = (function (_super) {
    __extends(EqualError, _super);
    function EqualError(message, file, line) {
        var _this = _super.call(this, message) || this;
        Object.setPrototypeOf(_this, EqualError.prototype);
        _this.name = "EqualError";
        _this.message = message;
        _this.file = ((file == undefined) ? "Unknown" : file);
        _this.line = ((line == undefined) ? 0 : line);
        return _this;
    }
    EqualError.prototype.accept = function (visitor) {
        if (!isErrorVisitor(visitor))
            throw new Error("Invalid visitor type");
    };
    return EqualError;
}(Error));
exports.EqualError = EqualError;
var EqualSyntaxError = (function (_super) {
    __extends(EqualSyntaxError, _super);
    function EqualSyntaxError(message, file, line) {
        var _this = _super.call(this, message, file, line) || this;
        Object.setPrototypeOf(_this, EqualSyntaxError.prototype);
        _this.name = "EqualSyntaxError";
        return _this;
    }
    EqualSyntaxError.prototype.accept = function (visitor) {
        _super.prototype.accept.call(this, visitor);
        return visitor.visitSyntaxError(this);
    };
    return EqualSyntaxError;
}(EqualError));
exports.EqualSyntaxError = EqualSyntaxError;
var EqualRuntimeError = (function (_super) {
    __extends(EqualRuntimeError, _super);
    function EqualRuntimeError(message, file, line) {
        var _this = _super.call(this, message, file, line) || this;
        Object.setPrototypeOf(_this, EqualRuntimeError.prototype);
        _this.name = "EqualRuntimeError";
        return _this;
    }
    EqualRuntimeError.prototype.accept = function (visitor) {
        _super.prototype.accept.call(this, visitor);
        return visitor.visitRuntimeError(this);
    };
    return EqualRuntimeError;
}(EqualError));
exports.EqualRuntimeError = EqualRuntimeError;
var EqualUnexpectedError = (function (_super) {
    __extends(EqualUnexpectedError, _super);
    function EqualUnexpectedError(message, file, line) {
        var _this = _super.call(this, message, file, line) || this;
        Object.setPrototypeOf(_this, EqualUnexpectedError.prototype);
        _this.name = "EqualUnexpectedError";
        return _this;
    }
    EqualUnexpectedError.prototype.accept = function (visitor) {
        _super.prototype.accept.call(this, visitor);
        return visitor.visitUnexpectedError(this);
    };
    return EqualUnexpectedError;
}(EqualError));
exports.EqualUnexpectedError = EqualUnexpectedError;
var ErrorHandler = (function () {
    function ErrorHandler(mode) {
        this.mode = mode;
        this._hasError = false;
        this.errors = [];
    }
    ErrorHandler.prototype.getErrorStatus = function () {
        return this._hasError;
    };
    ErrorHandler.prototype.reportError = function (err) {
        console.error(new ErrorPrinter().print(err));
        this._hasError = true;
        this.errors.push(err);
    };
    ErrorHandler.prototype.handleError = function (err) {
        if (this.mode == "VERBOSE")
            console.debug("Error", err);
        var newErr;
        if (!(err instanceof EqualError))
            newErr = new EqualUnexpectedError(err.message);
        else
            newErr = err;
        console.error(new ErrorPrinter().print(newErr));
        this._hasError = true;
        this.errors.push(newErr);
    };
    return ErrorHandler;
}());
exports.ErrorHandler = ErrorHandler;
//# sourceMappingURL=error.js.map