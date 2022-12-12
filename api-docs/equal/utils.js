"use strict";
exports.__esModule = true;
exports.wrapValue = exports.equalMode = void 0;
var equalMode;
(function (equalMode) {
    equalMode["VERBOSE"] = "VERBOSE";
    equalMode["NORMAL"] = "NORMAL";
})(equalMode || (equalMode = {}));
exports.equalMode = equalMode;
function wrapValue(val) {
    if (!isNaN(Number(val)))
        return Number(val);
    else if (val === "true" || val == "false")
        return (val === "true");
    else
        return val;
}
exports.wrapValue = wrapValue;
//# sourceMappingURL=utils.js.map