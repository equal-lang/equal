"use strict";
exports.__esModule = true;
exports.Input = void 0;
var error_1 = require("./error");
var Input = (function () {
    function Input() {
    }
    Input.prototype.arity = function () {
        return 1;
    };
    Input.prototype.call = function (interpreter, args) {
        if (interpreter.input == undefined)
            throw new error_1.EqualSyntaxError("No input method provided", interpreter.path);
        else {
            if (args[0] == "string") {
            }
        }
        console.log("testing input");
    };
    return Input;
}());
exports.Input = Input;
//# sourceMappingURL=foreign.js.map