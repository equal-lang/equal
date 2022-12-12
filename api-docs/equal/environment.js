"use strict";
exports.__esModule = true;
exports.Environment = void 0;
var error_1 = require("./error");
var Environment = (function () {
    function Environment(outEnv) {
        this.variables = new Map();
        this.functions = new Map();
        this.outerEnv = outEnv;
    }
    Environment.prototype.assign = function (key, val) {
        this.variables.set(key, val);
    };
    Environment.prototype.get = function (key) {
        var val = this.variables.get(key);
        if (val == undefined && this.outerEnv != undefined) {
            val = this.outerEnv.get(key);
        }
        if (val == undefined)
            throw new error_1.EqualRuntimeError("Undefined variable " + key);
        return val;
    };
    Environment.prototype.declareFunc = function (key, func) {
        this.functions.set(key, func);
    };
    Environment.prototype.getFunc = function (key) {
        var func = this.functions.get(key);
        if (func == undefined)
            throw new error_1.EqualRuntimeError("Undeclared function " + key);
        return func;
    };
    return Environment;
}());
exports.Environment = Environment;
//# sourceMappingURL=environment.js.map