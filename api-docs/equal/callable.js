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
exports.returnVal = exports.EqualFunction = exports.isEqualCallable = void 0;
var environment_1 = require("./environment");
function isEqualCallable(cls) {
    return cls.arity !== undefined && cls.call !== undefined;
}
exports.isEqualCallable = isEqualCallable;
var EqualFunction = (function () {
    function EqualFunction(declaration) {
        this.declaration = declaration;
    }
    EqualFunction.prototype.arity = function () {
        return this.declaration.params.length;
    };
    EqualFunction.prototype.call = function (interpreter, args) {
        var env = new environment_1.Environment(interpreter.environment);
        for (var pointer = 0; pointer <= args.length - 1; pointer++) {
            env.assign(this.declaration.params[pointer], args[pointer]);
        }
        try {
            interpreter.publicExecBlock(this.declaration.body, env);
        }
        catch (ret) {
            return ret.val;
        }
        return 0;
    };
    return EqualFunction;
}());
exports.EqualFunction = EqualFunction;
var returnVal = (function (_super) {
    __extends(returnVal, _super);
    function returnVal(val) {
        var _this = _super.call(this) || this;
        Object.setPrototypeOf(_this, returnVal.prototype);
        _this.name = "returnVal";
        _this.val = val;
        return _this;
    }
    return returnVal;
}(Error));
exports.returnVal = returnVal;
//# sourceMappingURL=callable.js.map